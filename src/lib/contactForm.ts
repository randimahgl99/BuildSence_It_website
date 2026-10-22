import { CONTACT_INTERESTS } from "@/data/contact";

/**
 * Demo request form logic: validation (mockup `initContactV2`, index.html
 * L16013-16048, AUDIT 7.1) and the Web3Forms submission (Phase 6).
 *
 * Web3Forms (docs.web3forms.com, checked for this phase): browser-side
 * `POST https://api.web3forms.com/submit` with a JSON body and `Accept:
 * application/json`. `access_key` is the only required field; `subject`,
 * `from_name`, `email` (also the reply-to) and `botcheck` are reserved names and any
 * other field is forwarded to the email as-is. A success is HTTP 200 with
 * `{ success: true }`; failures are `{ success: false, message }` (400, 429) or a
 * `{ statusCode: 500, error }` body. The access key is public by design.
 */

const ENDPOINT = "https://api.web3forms.com/submit";
const REQUEST_TIMEOUT_MS = 15000;

/** Email subject / sender name. Set per submission (Web3Forms has no dashboard field for them). */
const EMAIL_SUBJECT = "New Demo Request — BuildSense IT";
const EMAIL_FROM_NAME = "BuildSense IT";

export type FieldKey = "name" | "email" | "phone" | "industry" | "interest" | "message";
export type FieldErrors = Partial<Record<FieldKey, string>>;

export type FormValues = {
  name: string;
  business: string;
  email: string;
  phone: string;
  industry: string;
  interest: string;
  futureCapability: string;
  message: string;
  /** Honeypot checkbox; a human never ticks it (it is `display: none`). */
  botcheck: boolean;
};

/** Order matters: the first invalid field takes focus. */
export const FIELD_ORDER: readonly FieldKey[] = [
  "name",
  "email",
  "phone",
  "industry",
  "interest",
  "message",
];

/** Mirrors the mockup's checks and messages verbatim. */
export function validateEnquiry(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!/^\+?\d{8,15}$/.test(values.phone.replace(/[^\d+]/g, ""))) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!values.industry) errors.industry = "Please select your industry.";
  if (!values.interest) errors.interest = "Please select what you are interested in.";
  if (!values.message.trim()) errors.message = "Please tell us a little about your business.";

  return errors;
}

export type SubmitOutcome =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "rate-limited" | "network" | "rejected" };

/**
 * Sends the enquiry. Resolves with an outcome and never throws; it reports `ok`
 * only when both the HTTP status and the Web3Forms JSON confirm success. `signal`
 * lets the caller cancel (unmount); the request also times out on its own.
 */
export async function sendEnquiry(values: FormValues, signal: AbortSignal): Promise<SubmitOutcome> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim();
  if (!accessKey) return { ok: false, reason: "not-configured" };

  const interestLabel =
    CONTACT_INTERESTS.find((option) => option.value === values.interest)?.label ?? values.interest;

  const payload: Record<string, string | boolean> = {
    access_key: accessKey,
    subject: EMAIL_SUBJECT,
    from_name: EMAIL_FROM_NAME,
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    business: values.business.trim(),
    industry: values.industry,
    interest: interestLabel,
    message: values.message.trim(),
    botcheck: values.botcheck,
  };
  if (values.interest === "future" && values.futureCapability) {
    payload.futureCapability = values.futureCapability;
  }

  // Own timeout on top of the caller's signal; cleared in `finally`.
  const timeout = new AbortController();
  const timer = setTimeout(() => timeout.abort(), REQUEST_TIMEOUT_MS);
  const onCallerAbort = () => timeout.abort();
  signal.addEventListener("abort", onCallerAbort, { once: true });

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: timeout.signal,
    });

    let result: { success?: unknown } | null = null;
    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (response.status === 200 && result?.success === true) return { ok: true };
    if (response.status === 429) return { ok: false, reason: "rate-limited" };
    return { ok: false, reason: "rejected" };
  } catch {
    return { ok: false, reason: "network" };
  } finally {
    clearTimeout(timer);
    signal.removeEventListener("abort", onCallerAbort);
  }
}
