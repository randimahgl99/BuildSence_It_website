import { AI_ASSISTANT } from "@/data/aiAssistant";
import { flag, hook, hooks, noop, prefersReducedMotion } from "./dom";

// Home AI chat demo. Port of mockup/index.html L14073-14508
// (`initHomeAiAssistant`). The timeline is kept as is: every wait is
// `delay(ms, signal)`, every frame loop is `animateValue(duration, onUpdate,
// signal)`, both reject with AbortError and clear their timer / rAF on abort,
// one AbortController per run, `isAiDemoRunning` prevents duplicate runs.
//
// Differences from the mockup are mechanical: state lives in data attributes
// instead of classes (the markup is React-owned), ring/connector progress is
// kept in closure variables instead of `dataset`, and the page-active checks are
// gone (routes unmount, and cleanup aborts).
//
// Nothing here touches React state; every frame writes style directly.

const TIMING = {
  step1: 2600,
  step2: 3000,
  step3: 3200,
  step4: 2600,
  connector: 300,
  completionPause: 100,
  checkTransition: 240,
  completedHold: 1500,
  reset: 700,
  restartPause: 250,
  entranceDelay: 600,
};

const IO_OPTIONS = { threshold: 0.22, rootMargin: "80px 0px 80px 0px" };

export function startAiDemo(section: HTMLElement): () => void {
  const chatBody = hook(section, "chat-body");
  const insights = hook(section, "insights");
  const userQuestion = hook(section, "question");
  const analysis = hook(section, "analysis");
  const analysisHead = hook(section, "analysis-title");
  const analysisLines = hooks(section, "analysis-line");
  const results = hook(section, "results");
  const resultRows = hooks(section, "row");
  const recommendation = hook(section, "recommendation");
  const confirmation = hook(section, "confirmation");
  const inputText = hook(section, "input-text");
  const sendButton = hook(section, "send");
  const actionButton = hook(section, "action");
  const stepsRoot = hook(section, "steps");
  const progressFill = hook(section, "progress-fill");
  const steps = hooks(section, "step");
  const circles = hooks(section, "ring");
  const tabs = hooks(section, "tab");
  if (
    !chatBody || !insights || !userQuestion || !analysis || !analysisHead || !results ||
    !recommendation || !confirmation || !inputText || !sendButton || !actionButton ||
    !stepsRoot || !progressFill || steps.length === 0 || circles.length !== steps.length
  ) {
    return noop;
  }

  const question = AI_ASSISTANT.question;
  const placeholder = AI_ASSISTANT.input.placeholder;
  const initialActionText = AI_ASSISTANT.results.recommendation.actionLabel;
  const doneActionText = AI_ASSISTANT.results.recommendation.actionDoneLabel;
  const initialAnalysisTitle = AI_ASSISTANT.analysis.title;
  const reduceMotion = prefersReducedMotion();

  let isAiDemoRunning = false;
  let isAiInView = false;
  let activeController: AbortController | null = null;
  let connectorProgress = 0;

  const ringState = circles.map((circle) => {
    const radius = Number(circle.getAttribute("r"));
    return { circle, circumference: 2 * Math.PI * radius, progress: 0 };
  });

  function createAbortError() {
    try {
      return new DOMException("AI demo aborted", "AbortError");
    } catch {
      const error = new Error("AI demo aborted");
      error.name = "AbortError";
      return error;
    }
  }

  function ensureActive(signal: AbortSignal) {
    if (signal.aborted) throw createAbortError();
  }

  function delay(ms: number, signal: AbortSignal) {
    return new Promise<void>((resolve, reject) => {
      if (signal.aborted) {
        reject(createAbortError());
        return;
      }
      const timer = setTimeout(() => {
        signal.removeEventListener("abort", onAbort);
        resolve();
      }, ms);
      function onAbort() {
        clearTimeout(timer);
        reject(createAbortError());
      }
      signal.addEventListener("abort", onAbort, { once: true });
    });
  }

  function animateValue(
    duration: number,
    onUpdate: (value: number) => void,
    signal: AbortSignal,
    easing: (t: number) => number = (t) => t,
  ) {
    return new Promise<void>((resolve, reject) => {
      if (signal.aborted) {
        reject(createAbortError());
        return;
      }
      let raf = 0;
      let startTime: number | null = null;
      function onAbort() {
        cancelAnimationFrame(raf);
        reject(createAbortError());
      }
      signal.addEventListener("abort", onAbort, { once: true });
      function frame(now: number) {
        if (startTime === null) startTime = now;
        const raw = Math.min(1, (now - startTime) / duration);
        onUpdate(easing(raw));
        if (raw < 1 && !signal.aborted) {
          raf = requestAnimationFrame(frame);
        } else if (!signal.aborted) {
          signal.removeEventListener("abort", onAbort);
          resolve();
        }
      }
      raf = requestAnimationFrame(frame);
    });
  }

  function setAriaVisible(element: HTMLElement, visible: boolean) {
    element.setAttribute("aria-hidden", visible ? "false" : "true");
  }

  function setHomeAiTab(name: string) {
    tabs.forEach((tab) => {
      const active = tab.dataset.aiTab === name;
      flag(tab, "active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function setRingProgress(index: number, progress: number) {
    const state = ringState[index];
    const bounded = Math.max(0, Math.min(1, progress));
    state.circle.style.strokeDashoffset = String(state.circumference * (1 - bounded));
    state.progress = bounded;
  }

  function animateRing(index: number, duration: number, signal: AbortSignal, from = 0, to = 1) {
    setRingProgress(index, from);
    return animateValue(duration, (p) => setRingProgress(index, from + (to - from) * p), signal);
  }

  function setConnectorProgress(progress: number) {
    connectorProgress = progress;
    progressFill!.style.height = Math.max(0, Math.min(1, progress)) * 100 + "%";
  }

  function animateConnector(from: number, to: number, duration: number, signal: AbortSignal) {
    return animateValue(duration, (p) => setConnectorProgress(from + (to - from) * p), signal);
  }

  function setActiveStep(index: number) {
    steps.forEach((step, i) => flag(step, "active", i === index));
  }

  function clearCompletedSteps() {
    steps.forEach((step) => flag(step, "completed", false));
  }

  async function completeStep(index: number, signal: AbortSignal) {
    ensureActive(signal);
    setRingProgress(index, 1);
    await delay(TIMING.completionPause, signal);
    flag(steps[index], "active", false);
    flag(steps[index], "completed", true);
    await delay(TIMING.checkTransition, signal);
  }

  async function connectToNext(index: number, signal: AbortSignal) {
    await animateConnector(index / 3, (index + 1) / 3, TIMING.connector, signal);
  }

  function showPlaceholder() {
    const span = document.createElement("span");
    span.className = "bs-ai-placeholder";
    span.textContent = placeholder;
    inputText!.replaceChildren(span);
  }

  /** Start-of-demo state: insights showing, nothing answered yet. */
  function resetChatContentImmediate() {
    flag(chatBody!, "resetting", false);
    flag(stepsRoot!, "resetting", false);
    flag(insights!, "hidden", false);
    flag(userQuestion!, "visible", false);
    flag(analysis!, "visible", false);
    flag(results!, "visible", false);
    flag(recommendation!, "visible", false);
    flag(confirmation!, "visible", false);
    analysisLines.forEach((line) => flag(line, "done", false));
    resultRows.forEach((row) => flag(row, "revealed", false));
    flag(sendButton!, "sending", false);
    ["pressed", "hovering", "processing", "ready"].forEach((name) => flag(actionButton!, name, false));
    actionButton!.textContent = initialActionText;
    flag(inputText!, "typing", false);
    showPlaceholder();
    analysisHead!.textContent = initialAnalysisTitle;
    setAriaVisible(userQuestion!, false);
    setAriaVisible(analysis!, false);
    setAriaVisible(results!, false);
    setAriaVisible(recommendation!, false);
    setAriaVisible(confirmation!, false);
    setHomeAiTab("sales");
    clearCompletedSteps();
    setActiveStep(-1);
    ringState.forEach((_, index) => setRingProgress(index, 0));
    setConnectorProgress(0);
  }

  /**
   * The completed demo (mockup `showReducedMotionState`). This is also exactly
   * what the server renders, so cleanup returns the section to it.
   */
  function showFinalState() {
    resetChatContentImmediate();
    flag(insights!, "hidden", true);
    flag(userQuestion!, "visible", true);
    flag(results!, "visible", true);
    flag(recommendation!, "visible", true);
    flag(confirmation!, "visible", true);
    resultRows.forEach((row) => flag(row, "revealed", true));
    flag(actionButton!, "ready", true);
    actionButton!.textContent = doneActionText;
    setAriaVisible(userQuestion!, true);
    setAriaVisible(results!, true);
    setAriaVisible(recommendation!, true);
    setAriaVisible(confirmation!, true);
    setHomeAiTab(AI_ASSISTANT.finalTab);
    steps.forEach((step, index) => {
      setRingProgress(index, 1);
      flag(step, "active", false);
      flag(step, "completed", true);
    });
    setConnectorProgress(1);
  }

  function prepareStepOne() {
    setActiveStep(0);
    setHomeAiTab("sales");
  }

  function typeQuestion(duration: number, signal: AbortSignal) {
    inputText!.textContent = "";
    flag(inputText!, "typing", true);
    let lastCount = -1;
    return animateValue(
      duration,
      (p) => {
        const count = Math.min(question.length, Math.floor(question.length * p));
        if (count !== lastCount) {
          inputText!.textContent = question.slice(0, count);
          lastCount = count;
        }
      },
      signal,
    ).then(() => {
      inputText!.textContent = question;
      flag(inputText!, "typing", false);
    });
  }

  async function runStep1Content(signal: AbortSignal) {
    await delay(120, signal);
    await typeQuestion(1350, signal);
    await delay(300, signal);
    flag(sendButton!, "sending", true);
    await delay(220, signal);
    flag(sendButton!, "sending", false);
    showPlaceholder();
    flag(insights!, "hidden", true);
    flag(userQuestion!, "visible", true);
    setAriaVisible(userQuestion!, true);
    await delay(380, signal);
  }

  async function runStep2Content(signal: AbortSignal) {
    setHomeAiTab("inventory");
    flag(analysis!, "visible", true);
    setAriaVisible(analysis!, true);
    analysisHead!.textContent = "Analyzing...";
    await delay(360, signal);
    for (const line of analysisLines) {
      ensureActive(signal);
      flag(line, "done", true);
      await delay(500, signal);
    }
    analysisHead!.textContent = "Analysis complete";
    await delay(300, signal);
  }

  async function runStep3Content(signal: AbortSignal) {
    flag(analysis!, "visible", false);
    setAriaVisible(analysis!, false);
    await delay(180, signal);
    flag(results!, "visible", true);
    setAriaVisible(results!, true);
    await delay(260, signal);
    for (const row of resultRows) {
      ensureActive(signal);
      flag(row, "revealed", true);
      await delay(410, signal);
    }
    await delay(260, signal);
    flag(recommendation!, "visible", true);
    setAriaVisible(recommendation!, true);
    await delay(300, signal);
    flag(actionButton!, "ready", true);
    await delay(240, signal);
  }

  async function runStep4Content(signal: AbortSignal) {
    flag(actionButton!, "hovering", true);
    await delay(280, signal);
    flag(actionButton!, "hovering", false);
    flag(actionButton!, "pressed", true);
    await delay(220, signal);
    flag(actionButton!, "pressed", false);
    flag(actionButton!, "processing", true);
    actionButton!.textContent = "Preparing plan...";
    await delay(1050, signal);
    actionButton!.textContent = doneActionText;
    flag(actionButton!, "processing", false);
    flag(confirmation!, "visible", true);
    setAriaVisible(confirmation!, true);
    await delay(560, signal);
  }

  async function runSynchronizedStep(
    index: number,
    duration: number,
    contentRunner: (signal: AbortSignal) => Promise<void>,
    signal: AbortSignal,
  ) {
    setActiveStep(index);
    await Promise.all([animateRing(index, duration, signal, 0, 1), contentRunner(signal)]);
    await completeStep(index, signal);
  }

  async function gracefulReset(signal: AbortSignal) {
    flag(chatBody!, "resetting", true);
    flag(stepsRoot!, "resetting", true);
    await delay(180, signal);

    // Reset the shared vertical progress and the four rings while faded.
    const ringResets = ringState.map((state, index) => animateRing(index, TIMING.reset, signal, state.progress, 0));
    await Promise.all([animateConnector(connectorProgress, 0, TIMING.reset, signal), ...ringResets]);

    clearCompletedSteps();
    setActiveStep(-1);
    flag(insights!, "hidden", false);
    flag(userQuestion!, "visible", false);
    flag(analysis!, "visible", false);
    flag(results!, "visible", false);
    flag(recommendation!, "visible", false);
    flag(confirmation!, "visible", false);
    analysisLines.forEach((line) => flag(line, "done", false));
    resultRows.forEach((row) => flag(row, "revealed", false));
    ["pressed", "hovering", "processing", "ready"].forEach((name) => flag(actionButton!, name, false));
    actionButton!.textContent = initialActionText;
    flag(inputText!, "typing", false);
    showPlaceholder();
    analysisHead!.textContent = initialAnalysisTitle;
    setAriaVisible(userQuestion!, false);
    setAriaVisible(analysis!, false);
    setAriaVisible(results!, false);
    setAriaVisible(recommendation!, false);
    setAriaVisible(confirmation!, false);
    setHomeAiTab("sales");

    await delay(120, signal);
    flag(chatBody!, "resetting", false);
    flag(stepsRoot!, "resetting", false);
    await delay(TIMING.restartPause, signal);
  }

  async function runHomeAiLoop(controller: AbortController) {
    const signal = controller.signal;
    isAiDemoRunning = true;
    try {
      resetChatContentImmediate();
      await delay(TIMING.entranceDelay, signal);

      while (isAiInView && !signal.aborted) {
        prepareStepOne();
        await runSynchronizedStep(0, TIMING.step1, runStep1Content, signal);
        await connectToNext(0, signal);

        await runSynchronizedStep(1, TIMING.step2, runStep2Content, signal);
        await connectToNext(1, signal);

        await runSynchronizedStep(2, TIMING.step3, runStep3Content, signal);
        await connectToNext(2, signal);

        await runSynchronizedStep(3, TIMING.step4, runStep4Content, signal);
        setConnectorProgress(1);

        await delay(TIMING.completedHold, signal);
        await gracefulReset(signal);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") console.error("BuildSense AI demo:", error);
    } finally {
      if (activeController === controller) {
        activeController = null;
        isAiDemoRunning = false;
      }
    }
  }

  function startHomeAiDemo() {
    if (reduceMotion || !isAiInView || document.hidden || isAiDemoRunning) return;
    const controller = new AbortController();
    activeController = controller;
    void runHomeAiLoop(controller);
  }

  /** Stopping = abort + immediate reset, so re-entering restarts from step 1. */
  function stopHomeAiDemo() {
    if (activeController) {
      activeController.abort();
      activeController = null;
    }
    isAiDemoRunning = false;
    resetChatContentImmediate();
  }

  // Reduced motion: show the completed state, no observers at all.
  if (reduceMotion) {
    showFinalState();
    return noop;
  }

  // The markup ships complete; a running demo starts from the beginning.
  resetChatContentImmediate();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isAiInView = true;
        startHomeAiDemo();
      } else {
        isAiInView = false;
        stopHomeAiDemo();
      }
    });
  }, IO_OPTIONS);
  observer.observe(section);

  const syncDemo = () => {
    if (document.hidden) stopHomeAiDemo();
    else if (isAiInView) startHomeAiDemo();
  };
  document.addEventListener("visibilitychange", syncDemo);

  return () => {
    observer.disconnect();
    document.removeEventListener("visibilitychange", syncDemo);
    isAiInView = false;
    if (activeController) {
      activeController.abort();
      activeController = null;
    }
    isAiDemoRunning = false;
    showFinalState();
  };
}
