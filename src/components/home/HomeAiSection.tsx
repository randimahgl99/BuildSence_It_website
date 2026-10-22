import Link from "next/link";
import { AI_ASSISTANT } from "@/data/aiAssistant";
import { HomeAiController } from "./HomeAiController";
import {
  AttachIcon,
  InsightIcon,
  PanelIcon,
  SendIcon,
  SparkleIcon,
  StepCheck,
  StepRing,
  TickIcon,
} from "./ai/AiIcons";

/**
 * Home AI assistant (mockup `#home-ai-assistant`). The markup is rendered in the
 * completed final state (no JS, reduced motion, SSR); HomeAiController (client,
 * renders nothing) adds the entrance scene, sparkle gating and chat demo on top.
 * This component itself stays a Server Component.
 *
 * ---- Contract for HomeAiController (lib/homeAi/*) ----
 * Elements are found by `data-ai="<name>"` hooks (no ids/classes needed):
 *   title, chat-wrap, right                    entrance scene targets
 *   chat-body, insights, question, analysis, analysis-title, analysis-line (x4),
 *   results, row (x4), recommendation, action, confirmation, input-text, send,
 *   tab (+ data-ai-tab), steps, progress-fill, step (+ data-step), ring (x4)
 * The title's letters are `.bs-ai-char` spans (server-rendered, aria-hidden;
 * the <h2> carries the aria-label).
 *
 * State is attributes, never classes, so React cannot clobber it. PRESENT =
 * ON; this markup ships in the demo's end state:
 *   insights        data-hidden        (demo start: absent)
 *   question / analysis / results / recommendation / confirmation
 *                   data-visible       (analysis ships WITHOUT it)
 *   analysis-line   data-done          (ships without)
 *   row             data-revealed      (ships with)
 *   action          data-ready         (+ data-hovering / data-pressed / data-processing)
 *   tab             data-active + aria-selected  (ships on "inventory")
 *   step            data-completed / data-active (ships all completed)
 *   send            data-sending;  input-text data-typing
 *   chat-body, steps  data-resetting
 * aria-hidden="true"/"false" is toggled on question, analysis, results,
 * recommendation and confirmation like the mockup's setAriaVisible().
 * Imperative values the controller owns: ring `style.strokeDashoffset`
 * (ships 0 = full, dasharray = circumference), progress-fill `style.height`
 * (ships 100%), the --ai-* custom properties on title / chat-wrap / right
 * (unset = final values), `inert` on right, and the text of analysis-title,
 * action and input-text. The controllers restore this shipped state on cleanup.
 * The section also gets data-running (sparkle) and data-ai-sequence-state.
 *
 * The chat is a decorative simulation: its tabs, action, attach and send buttons
 * do nothing, so all six carry tabIndex -1 (they were invisible tab stops while
 * the entrance scene had the chat hidden).
 */
export function HomeAiSection() {
  const { tabs, insights, results, analysis, input, right } = AI_ASSISTANT;
  const { recommendation } = results;

  return (
    <section id="home-ai-assistant" className="bs-ai" aria-labelledby="home-ai-title">
      <div className="container-site bs-ai-shell">
        <div className="bs-ai-header">
          <div className="bs-ai-spark" aria-hidden="true">
            <SparkleIcon />
          </div>
          <h2 id="home-ai-title" className="bs-ai-title" data-ai="title" aria-label={AI_ASSISTANT.title}>
            {Array.from(AI_ASSISTANT.title).map((char, index) =>
              /\s/.test(char) ? (
                char
              ) : (
                <span key={index} className="bs-ai-char" aria-hidden="true">
                  {char}
                </span>
              ),
            )}
          </h2>
        </div>

        <div className="bs-ai-layout">
          <div className="bs-ai-chat-wrap" data-ai="chat-wrap">
            <div className="bs-ai-chat">
              <div className="bs-ai-tabs" role="tablist" aria-label={AI_ASSISTANT.tabsLabel}>
                {tabs.map((tab) => {
                  const active = tab.id === AI_ASSISTANT.finalTab;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      tabIndex={-1}
                      className="bs-ai-tab"
                      data-ai="tab"
                      data-ai-tab={tab.id}
                      data-active={active ? "" : undefined}
                      aria-selected={active}
                    >
                      <PanelIcon name={tab.id} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="bs-ai-body" data-ai="chat-body">
                <div className="bs-ai-insights" data-ai="insights" data-hidden="">
                  {insights.map((insight) => (
                    <article key={insight.label} className="bs-ai-insight">
                      <div className="bs-ai-insight-icon">
                        <InsightIcon name={insight.icon} />
                      </div>
                      <div>
                        <span>{insight.label}</span>
                        <p>{insight.text}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="bs-ai-question" data-ai="question" data-visible="" aria-hidden="false">
                  <span>{AI_ASSISTANT.question}</span>
                </div>

                <div className="bs-ai-analysis" data-ai="analysis" aria-hidden="true">
                  <div className="bs-ai-analysis-head">
                    <div className="bs-ai-mini-spark" aria-hidden="true">
                      ✦
                    </div>
                    <div>
                      <strong data-ai="analysis-title">{analysis.title}</strong>
                      <span>{analysis.subtitle}</span>
                    </div>
                    <div className="bs-ai-dots" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                  <div className="bs-ai-analysis-lines">
                    {analysis.lines.map((line) => (
                      <div key={line} className="bs-ai-analysis-line" data-ai="analysis-line">
                        <b aria-hidden="true">
                          <TickIcon />
                        </b>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bs-ai-results" data-ai="results" data-visible="" aria-hidden="false">
                  <div className="bs-ai-result-title">
                    <span>{results.label}</span>
                    <strong>{results.title}</strong>
                  </div>
                  <div className="bs-ai-table" role="table" aria-label={results.tableLabel}>
                    <div className="bs-ai-tr bs-ai-th" role="row">
                      {results.columns.map((column) => (
                        <span key={column} role="columnheader">
                          {column}
                        </span>
                      ))}
                    </div>
                    {results.rows.map((row) => (
                      <div key={row[0]} className="bs-ai-tr" role="row" data-ai="row" data-revealed="">
                        {row.map((cell, index) => (
                          <span key={index} role="cell">
                            {cell}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div
                    className="bs-ai-recommendation"
                    data-ai="recommendation"
                    data-visible=""
                    aria-hidden="false"
                  >
                    <div>
                      <span>{recommendation.label}</span>
                      <p>{recommendation.text}</p>
                    </div>
                    <button type="button" tabIndex={-1} className="bs-ai-action" data-ai="action" data-ready="">
                      {recommendation.actionDoneLabel}
                    </button>
                  </div>

                  <div className="bs-ai-confirmation" data-ai="confirmation" data-visible="" aria-hidden="false">
                    <span aria-hidden="true">
                      <TickIcon />
                    </span>
                    <strong>{results.confirmation}</strong>
                  </div>
                </div>
              </div>

              <div className="bs-ai-input-row">
                <button type="button" tabIndex={-1} className="bs-ai-attach" aria-label={input.attachLabel}>
                  <AttachIcon />
                </button>
                <div className="bs-ai-input-text" data-ai="input-text" aria-live="off">
                  <span className="bs-ai-placeholder">{input.placeholder}</span>
                </div>
                <button type="button" tabIndex={-1} className="bs-ai-send" data-ai="send" aria-label={input.sendLabel}>
                  <SendIcon />
                </button>
              </div>
            </div>
          </div>

          <div className="bs-ai-right" data-ai="right">
            <h3 className="bs-ai-right-title">
              {right.titleLines[0]}
              <br />
              {right.titleLines[1]}
            </h3>

            <div className="bs-ai-steps" data-ai="steps">
              <div className="bs-ai-progress" aria-hidden="true">
                <span className="bs-ai-progress-fill" data-ai="progress-fill" style={{ height: "100%" }} />
              </div>
              {right.steps.map((step, index) => (
                <div key={step} className="bs-ai-step" data-ai="step" data-step={index} data-completed="">
                  <span className="bs-ai-step-number" aria-hidden="true">
                    <StepRing />
                    <span className="bs-ai-step-label">{String(index + 1).padStart(2, "0")}</span>
                    <StepCheck />
                  </span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>

            <Link href={right.cta.href} className="cta-ref bs-ai-cta">
              {right.cta.label}
            </Link>
          </div>
        </div>
      </div>
      <HomeAiController />
    </section>
  );
}
