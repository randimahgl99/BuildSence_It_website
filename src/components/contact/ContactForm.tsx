"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  CONTACT_FUTURE_CAPABILITIES,
  CONTACT_FUTURE_NOTE,
  CONTACT_INDUSTRIES,
  CONTACT_INTERESTS,
  CONTACT_MESSAGE_PLACEHOLDER,
  CONTACT_PAGE,
  contactSubmitLabel,
} from "@/data/contact";
import { toast } from "sonner";
import {
  FIELD_ORDER,
  sendEnquiry,
  validateEnquiry,
  type FieldErrors,
  type FieldKey,
  type FormValues,
} from "@/lib/contactForm";

const TOAST_SUCCESS_MS = 6000;
const TOAST_ERROR_MS = 9000;

function readValues(form: HTMLFormElement): FormValues {
  const data = new FormData(form);
  const text = (key: string) => String(data.get(key) ?? "");
  return {
    name: text("name"),
    business: text("business"),
    email: text("email"),
    phone: text("phone"),
    industry: text("industry"),
    interest: text("interest"),
    // a disabled select is left out of FormData, so this is "" unless interest = future
    futureCapability: text("futureCapability"),
    message: text("message"),
    botcheck: data.get("botcheck") !== null,
  };
}

/**
 * Demo request form (mockup `#contactV2Form` L15852, script L15944; AUDIT 7.1).
 * Ported from the mockup:
 *  - choosing "Future BuildSense Services" reveals the capability select (it is
 *    enabled and exposed to assistive tech only then; its value is cleared otherwise),
 *  - the submit label follows the selected interest,
 *  - validation with the mockup's rules and messages, `aria-invalid` + the error under
 *    each field, errors cleared when the field changes, focus to the first invalid field.
 *
 * Phase 6 adds what the mockup lacked (it never sent anything): the submission to
 * Web3Forms (`@/lib/contactForm`) and its idle / submitting / success / error states.
 * The result is a Sonner toast (host: `AppToaster`, mounted by the contact page). Success
 * is shown only after the request is confirmed, and only then is the form reset; a failure
 * shows the error toast and keeps every entered value. While a request is in flight the
 * button is `aria-disabled` (kept focusable so focus is not lost) and a ref lock rejects
 * a second submit synchronously; no "sending" toast, the button label is the feedback.
 *
 * Only `interest` (and the dependent capability select), the errors and `isSubmitting` are
 * React state; the other fields are uncontrolled and read from FormData on submit. The
 * one side effect, the in-flight request, is aborted on unmount (Strict Mode safe: the
 * ref is empty when the simulated unmount runs). No listeners or observers are created
 * here; the request's timeout timer lives and is cleared inside `sendEnquiry`.
 */
export function ContactForm() {
  const [interest, setInterest] = useState("");
  const [capability, setCapability] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isFuture = interest === "future";

  const sendingRef = useRef(false);
  const requestRef = useRef<AbortController | null>(null);
  const toastIdRef = useRef<string | number | null>(null);

  useEffect(
    () => () => {
      requestRef.current?.abort();
    },
    [],
  );

  // mockup: an edit to a validated field clears its error
  function handleChange(event: FormEvent<HTMLFormElement>) {
    const key = (event.target as HTMLInputElement).name as FieldKey;
    if (!FIELD_ORDER.includes(key)) return;
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;

    const form = event.currentTarget;
    const values = readValues(form);
    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);
    // one result toast at a time. Each toast keeps its own id: re-using one id right after
    // a dismiss makes Sonner "update" the toast that is still being removed, which hides it.
    if (toastIdRef.current !== null) toast.dismiss(toastIdRef.current);
    toastIdRef.current = null;

    const firstInvalid = FIELD_ORDER.find((key) => nextErrors[key]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    sendingRef.current = true;
    const request = new AbortController();
    requestRef.current = request;
    setIsSubmitting(true);

    const outcome = await sendEnquiry(values, request.signal);

    sendingRef.current = false;
    requestRef.current = null;
    if (request.signal.aborted) return; // unmounted while sending
    setIsSubmitting(false);

    if (outcome.ok) {
      form.reset();
      setInterest("");
      setCapability("");
      toastIdRef.current = toast.success("Demo Request Sent Successfully!", {
        description: "Thank you! Our team will contact you soon.",
        duration: TOAST_SUCCESS_MS,
      });
    } else {
      toastIdRef.current = toast.error("Unable to Send Request", {
        description: "Something went wrong. Please try again.",
        duration: TOAST_ERROR_MS,
      });
    }
  }

  return (
    <form
      className="bs-contact-form"
      id="contactV2Form"
      noValidate
      aria-busy={isSubmitting}
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      {/* Honeypot (Web3Forms `botcheck`): hidden from people and assistive tech; a bot may tick it. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />

      <div className="bs-contact-field">
        <label htmlFor="contactV2Name">
          Your name <span>*</span>
        </label>
        <input
          className="bs-contact-input"
          id="contactV2Name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          maxLength={100}
          aria-describedby="contactV2NameError"
          aria-invalid={errors.name ? "true" : undefined}
        />
        <small className="bs-contact-error" id="contactV2NameError">
          {errors.name}
        </small>
      </div>

      <div className="bs-contact-field">
        <label htmlFor="contactV2Business">Business / organization</label>
        <input
          className="bs-contact-input"
          id="contactV2Business"
          name="business"
          type="text"
          autoComplete="organization"
          placeholder="Business / organization"
          maxLength={150}
        />
      </div>

      <div className="bs-contact-field bs-contact-half">
        <label htmlFor="contactV2Email">
          Email <span>*</span>
        </label>
        <input
          className="bs-contact-input"
          id="contactV2Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@business.com"
          maxLength={254}
          aria-describedby="contactV2EmailError"
          aria-invalid={errors.email ? "true" : undefined}
        />
        <small className="bs-contact-error" id="contactV2EmailError">
          {errors.email}
        </small>
      </div>

      <div className="bs-contact-field bs-contact-half">
        <label htmlFor="contactV2Phone">
          Phone number <span>*</span>
        </label>
        <input
          className="bs-contact-input"
          id="contactV2Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+94 7X XXX XXXX"
          maxLength={30}
          aria-describedby="contactV2PhoneError"
          aria-invalid={errors.phone ? "true" : undefined}
        />
        <small className="bs-contact-error" id="contactV2PhoneError">
          {errors.phone}
        </small>
      </div>

      <div className="bs-contact-field bs-contact-half">
        <label htmlFor="contactV2Industry">
          Industry <span>*</span>
        </label>
        <select
          className="bs-contact-input bs-contact-select"
          id="contactV2Industry"
          name="industry"
          defaultValue=""
          aria-describedby="contactV2IndustryError"
          aria-invalid={errors.industry ? "true" : undefined}
        >
          <option value="">Select your industry</option>
          {CONTACT_INDUSTRIES.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
        <small className="bs-contact-error" id="contactV2IndustryError">
          {errors.industry}
        </small>
      </div>

      <div className="bs-contact-field bs-contact-half">
        <label htmlFor="contactV2Interest">
          What are you interested in? <span>*</span>
        </label>
        <select
          className="bs-contact-input bs-contact-select"
          id="contactV2Interest"
          name="interest"
          value={interest}
          onChange={(event) => {
            const next = event.target.value;
            setInterest(next);
            if (next !== "future") setCapability("");
          }}
          aria-describedby="contactV2InterestError"
          aria-invalid={errors.interest ? "true" : undefined}
        >
          <option value="">Select an option</option>
          {CONTACT_INTERESTS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <small className="bs-contact-error" id="contactV2InterestError">
          {errors.interest}
        </small>
      </div>

      <div
        className="bs-contact-future"
        id="contactV2FutureWrap"
        data-visible={isFuture ? "true" : "false"}
        aria-hidden={isFuture ? "false" : "true"}
      >
        <div className="bs-contact-future-note">{CONTACT_FUTURE_NOTE}</div>
        <div className="bs-contact-field">
          <label htmlFor="contactV2Future">Which future capability interests you?</label>
          <select
            className="bs-contact-input bs-contact-select"
            id="contactV2Future"
            name="futureCapability"
            value={capability}
            disabled={!isFuture}
            onChange={(event) => setCapability(event.target.value)}
          >
            <option value="">Select a future capability</option>
            {CONTACT_FUTURE_CAPABILITIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bs-contact-field bs-contact-full">
        <label htmlFor="contactV2Message">
          Tell us about your business <span>*</span>
        </label>
        <textarea
          className="bs-contact-input bs-contact-textarea"
          id="contactV2Message"
          name="message"
          placeholder={CONTACT_MESSAGE_PLACEHOLDER}
          maxLength={5000}
          aria-describedby="contactV2MessageError"
          aria-invalid={errors.message ? "true" : undefined}
        />
        <small className="bs-contact-error" id="contactV2MessageError">
          {errors.message}
        </small>
      </div>

      <div className="bs-contact-actions bs-contact-full">
        <button
          className="bs-contact-submit"
          id="contactV2Submit"
          type="submit"
          aria-disabled={isSubmitting ? "true" : undefined}
        >
          {isSubmitting ? "Sending…" : contactSubmitLabel(interest)}
        </button>
        <p className="bs-contact-reassurance">{CONTACT_PAGE.reassurance}</p>
        {/* The mockup's inline success line, kept only so the spacing is unchanged. The
            result is now a toast (Sonner's own aria-live region announces it), so this
            is no longer a live region and never holds text: no double announcement. */}
        <div className="bs-contact-success" id="contactV2Success" />
      </div>
    </form>
  );
}
