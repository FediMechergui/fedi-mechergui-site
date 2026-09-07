import { useId, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { useReduce } from "../motion/useReduce";
import { SPRING } from "../motion/reveal";
import { setNeed, useNeed, type Need } from "../lib/needStore";
import { emailConfigured, sendContact } from "../lib/emailjs";
import { EMAIL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "../data/facts";

type Status = "idle" | "sending" | "sent" | "error";

const NEEDS: { value: Need; label: string; hint: string }[] = [
  { value: "project", label: "A project", hint: "Web app, ERP, mobile app, DevSecOps or AI work." },
  { value: "tutoring", label: "Tutoring", hint: "Live online sessions, one-to-one or for a small group." },
];

const DETAIL: Record<Need, { label: string; placeholder: string }> = {
  project: { label: "Company or project name", placeholder: "Optional" },
  tutoring: { label: "Who is the session for", placeholder: "For example: my son, 15, beginner in Python" },
};

const MESSAGE: Record<Need, { label: string; placeholder: string }> = {
  project: { label: "What do you need built", placeholder: "A rough idea is enough: what it should do, who uses it, any deadline." },
  tutoring: { label: "What would you like to learn", placeholder: "Topic, current level, preferred days and language." },
};

const FIELD =
  "w-full rounded-plate border border-line bg-surface px-4 text-[1rem] leading-[1.5] text-ink placeholder:text-muted/70 transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] focus:border-accent";
const LABEL = "block text-[0.875rem] font-medium leading-[1.45] text-ink";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/**
 * One form for both offers. The need switch changes two labels and the
 * email subject; everything else is shared so the visitor never fills a
 * second form.
 */
export function ContactForm() {
  const reduce = useReduce();
  const need = useNeed();
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      need,
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      detail: String(data.get("detail") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };
    const honeypot = String(data.get("website") ?? "");

    const next: Record<string, string> = {};
    if (payload.name.length < 2) next.name = "Please add your name.";
    if (!isEmail(payload.email)) next.email = "Please add an email address I can reply to.";
    if (payload.message.length < 10) next.message = "A sentence or two is enough, but this is too short.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    if (honeypot) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      await sendContact(payload);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="rounded-plate bg-surface p-6">
        <div className="flex items-start gap-3">
          <CheckCircle size={24} weight="regular" aria-hidden className="mt-0.5 shrink-0 text-accent" />
          <div>
            <p className="font-display wdth-112 text-[1.25rem] font-semibold leading-[1.2] tracking-[-0.01em] text-ink">Sent. Thank you.</p>
            <p className="mt-2 max-w-[48ch] text-[1.0625rem] leading-[1.55] text-muted">
              {need === "tutoring"
                ? "I will reply by email with available slots and a short plan for the first session."
                : "I will reply by email with questions or a written scope."}
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-5 text-[0.9375rem] font-medium text-accent underline-offset-4 hover:underline"
            >
              Send another message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-plate bg-surface p-6" aria-labelledby={`${id}-legend`}>
      <fieldset>
        <legend id={`${id}-legend`} className={LABEL}>
          What do you need
        </legend>
        <div role="radiogroup" aria-label="What do you need" className="mt-3 grid grid-cols-2 gap-3">
          {NEEDS.map((option) => {
            const selected = option.value === need;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setNeed(option.value)}
                className={`rounded-plate px-4 py-3 text-left transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  selected ? "bg-accent text-accent-ink" : "bg-surface-2 text-ink hover:brightness-95"
                }`}
              >
                <span className="block text-[0.9375rem] font-medium leading-none">{option.label}</span>
                <span className={`mt-1.5 block text-[0.8125rem] leading-[1.4] ${selected ? "text-accent-ink/85" : "text-muted"}`}>{option.hint}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={LABEL}>
            Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
            className={`${FIELD} mt-2 h-12`}
          />
          {errors.name && (
            <p id={`${id}-name-error`} className="mt-1.5 text-[0.8125rem] leading-[1.4] text-accent">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={LABEL}>
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
            className={`${FIELD} mt-2 h-12`}
          />
          {errors.email && (
            <p id={`${id}-email-error`} className="mt-1.5 text-[0.8125rem] leading-[1.4] text-accent">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className={LABEL}>
            WhatsApp or phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" inputMode="tel" className={`${FIELD} mt-2 h-12`} />
        </div>
        <div>
          <label htmlFor={`${id}-detail`} className={LABEL}>
            {DETAIL[need].label}
          </label>
          <input id={`${id}-detail`} name="detail" type="text" placeholder={DETAIL[need].placeholder} className={`${FIELD} mt-2 h-12`} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={`${id}-message`} className={LABEL}>
          {MESSAGE[need].label}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          required
          placeholder={MESSAGE[need].placeholder}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${id}-message-error` : undefined}
          className={`${FIELD} mt-2 resize-y py-3`}
        />
        {errors.message && (
          <p id={`${id}-message-error`} className="mt-1.5 text-[0.8125rem] leading-[1.4] text-accent">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people, filled by bots. */}
      <div className="sr-only" aria-hidden>
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-pill bg-accent px-5 text-[0.9375rem] font-medium leading-none text-accent-ink transition-[filter] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:brightness-95 disabled:opacity-60"
          whileHover={reduce ? undefined : { y: -1 }}
          whileTap={reduce ? undefined : { scale: 0.98 }}
          transition={SPRING}
        >
          {status === "sending" ? "Sending" : need === "tutoring" ? "Request a session" : "Send the brief"}
          <ArrowRight size={16} weight="regular" aria-hidden />
        </motion.button>
        <p className="text-[0.8125rem] leading-[1.45] text-muted">Goes straight to my inbox. I reply from {EMAIL}.</p>
      </div>

      <div aria-live="polite" className="mt-4">
        {status === "error" && (
          <p className="flex items-start gap-2 text-[0.9375rem] leading-[1.45] text-ink">
            <WarningCircle size={20} weight="regular" aria-hidden className="mt-0.5 shrink-0 text-accent" />
            <span>
              {emailConfigured ? "The message did not go through." : "The form is not connected yet."} Write to{" "}
              <a href={`mailto:${EMAIL}`} className="text-accent underline-offset-4 hover:underline">
                {EMAIL}
              </a>{" "}
              or on{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="text-accent underline-offset-4 hover:underline">
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
              .
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
