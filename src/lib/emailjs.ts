import emailjs from "@emailjs/browser";
import type { Need } from "./needStore";

/** Three values from the EmailJS dashboard, set in .env as VITE_EMAILJS_*. */
export const EMAILJS = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined,
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined,
};

export const emailConfigured = Boolean(EMAILJS.publicKey && EMAILJS.serviceId && EMAILJS.templateId);

export type ContactPayload = {
  need: Need;
  name: string;
  email: string;
  phone: string;
  detail: string;
  message: string;
};

const NEED_LABEL: Record<Need, string> = { project: "Project", tutoring: "Tutoring" };

/**
 * Sends the form through EmailJS. Template variables (use these names in the
 * EmailJS template): need, from_name, reply_to, phone, detail, message,
 * submitted_at, page_url.
 */
export async function sendContact(payload: ContactPayload): Promise<void> {
  if (!emailConfigured) throw new Error("EmailJS is not configured");
  await emailjs.send(
    EMAILJS.serviceId!,
    EMAILJS.templateId!,
    {
      need: NEED_LABEL[payload.need],
      from_name: payload.name,
      reply_to: payload.email,
      phone: payload.phone || "not given",
      detail: payload.detail || "not given",
      message: payload.message,
      submitted_at: new Date().toLocaleString("en-GB", { timeZone: "Africa/Tunis", dateStyle: "medium", timeStyle: "short" }) + " (Tunis)",
      page_url: window.location.href,
    },
    { publicKey: EMAILJS.publicKey! },
  );
}
