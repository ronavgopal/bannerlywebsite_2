"use server";

export type FormKind =
  | "nonprofit-application"
  | "volunteer-signup"
  | "sponsor-inquiry"
  | "newsletter";

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const REQUIRED: Record<FormKind, string[]> = {
  "nonprofit-application": [
    "organization",
    "name",
    "email",
    "mission",
    "audience",
    "goals",
    "package",
  ],
  "volunteer-signup": ["name", "email", "background", "skills"],
  "sponsor-inquiry": ["organization", "name", "email", "interest"],
  newsletter: ["email"],
};

const SUCCESS: Record<FormKind, string> = {
  "nonprofit-application": "Thanks! Your application is in. We'll be in touch about next steps.",
  "volunteer-signup":
    "Thanks for signing up! We'll reach out when we have a nonprofit match for you.",
  "sponsor-inquiry": "Thank you! We'll get back to you about partnering with Bannerly.",
  newsletter: "You're subscribed. Thanks for following along!",
};

/**
 * Receives every form on the site.
 *
 * Submissions are sent as JSON to FORMS_WEBHOOK_URL, which can point at an
 * Airtable automation, a Supabase edge function, Zapier or Make. Until that
 * variable is set, forms show a friendly "not connected yet" message instead
 * of silently dropping submissions.
 */
export async function submitForm(
  kind: FormKind,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  // Hidden honeypot field: real visitors never fill it in.
  if (formData.get("company_website")) {
    return { status: "success", message: SUCCESS[kind] };
  }

  const fields: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("$") || key === "company_website") continue;
    if (typeof value === "string") fields[key] = value.trim();
  }

  const missing = REQUIRED[kind].filter((key) => !fields[key]);
  if (missing.length > 0) {
    return { status: "error", message: "Please fill in all the required fields." };
  }

  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const webhook = process.env.FORMS_WEBHOOK_URL;
  if (!webhook) {
    return {
      status: "error",
      message:
        "This form isn't connected yet. Please check back soon, we're getting everything set up.",
    };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form: kind, submittedAt: new Date().toISOString(), fields }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (error) {
    console.error("Form submission failed", error);
    return {
      status: "error",
      message: "Something went wrong sending your form. Please try again in a moment.",
    };
  }

  return { status: "success", message: SUCCESS[kind] };
}
