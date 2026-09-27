"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, CornerDownLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { services } from "@/lib/services";
import { contact } from "@/lib/site";

type Step = {
  id: string;
  group: string;
  question: string;
  type: "text" | "email" | "tel" | "date" | "textarea" | "choice";
  placeholder?: string;
  required?: boolean;
  options?: string[];
};

const steps: Step[] = [
  { id: "name", group: "Let's start with you", question: "So, what's your name?", type: "text", placeholder: "Jane Doe", required: true },
  { id: "email", group: "Let's start with you", question: "What's your email address?", type: "email", placeholder: "jane@example.com", required: true },
  { id: "phone", group: "Let's start with you", question: "And your phone number?", type: "tel", placeholder: "+234 800 000 0000", required: true },
  { id: "service", group: "Your trip", question: "How can we help you?", type: "choice", options: services.map((s) => s.title), required: true },
  { id: "destination", group: "Your trip", question: "Where would you like to go?", type: "text", placeholder: "Dubai, London, Lagos…" },
  { id: "date", group: "Your trip", question: "When are you planning to travel?", type: "date" },
  { id: "message", group: "Almost done", question: "Anything else we should know?", type: "textarea", placeholder: "Tell us about your trip…" },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const moved = useRef(false);

  const step = steps[index];
  const value = answers[step.id] ?? "";
  const isLast = index === steps.length - 1;

  // Focus the input when moving between questions (not on first load, so the page doesn't jump).
  useEffect(() => {
    if (moved.current) inputRef.current?.focus({ preventScroll: true });
  }, [index]);

  function validate() {
    if (step.required && !value.trim()) return "Please answer this question to continue.";
    if (step.type === "email" && value && !EMAIL.test(value)) return "Please enter a valid email address.";
    return "";
  }

  function next(e?: FormEvent) {
    e?.preventDefault();
    const problem = validate();
    if (problem) return setError(problem);
    setError("");
    if (isLast) return send();
    moved.current = true;
    setIndex((i) => i + 1);
  }

  function back() {
    setError("");
    moved.current = true;
    setIndex((i) => Math.max(0, i - 1));
  }

  // No backend yet: open the visitor's email app with their answers filled in.
  // TODO: replace with a form service / API route so messages arrive without an email app.
  function send() {
    const body = steps.map((s) => `${s.question}\n${answers[s.id] || "-"}`).join("\n\n");
    const subject = `Enquiry from ${answers.name}${answers.service ? ` (${answers.service})` : ""}`;
    const mail = document.createElement("a");
    mail.href = `${contact.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    mail.click();
    setSent(true);
  }

  function set(v: string) {
    setAnswers((a) => ({ ...a, [step.id]: v }));
    if (error) setError("");
  }

  function onTextareaKey(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      next();
    }
  }

  const inputClass =
    "w-full border-b-2 border-ink/15 bg-transparent pb-3 font-heading text-xl text-ink placeholder:text-ink/30 focus:border-brand focus:outline-none sm:text-3xl";

  return (
    <Section id="enquiry">
      <Container className="max-w-5xl">
        {/* Progress */}
        <div className="h-1 overflow-hidden rounded-full bg-ink/5">
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-500"
            style={{ width: `${((sent ? steps.length : index) / steps.length) * 100}%` }}
          />
        </div>

        {sent ? (
          <div className="mt-12 sm:mt-16">
            <p className="inline-flex items-center gap-2 text-sm text-muted">
              <span aria-hidden className="size-1.5 bg-brand" />
              All done
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-5xl">
              Thank you, {answers.name?.split(" ")[0]}!
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Your email app should have opened with your answers. Just press send. If it didn&apos;t open, email us at{" "}
              <a href={contact.emailHref} className="font-semibold text-ink hover:text-brand">
                {contact.email}
              </a>{" "}
              or call{" "}
              <a href={contact.phoneHref} className="font-semibold text-ink hover:text-brand">
                {contact.phone}
              </a>
              .
            </p>
          </div>
        ) : (
          <form onSubmit={next} noValidate className="mt-12 sm:mt-16" aria-live="polite">
            <p className="inline-flex items-center gap-2 text-sm text-muted sm:text-base">
              <span aria-hidden className="size-1.5 bg-brand" />
              {step.group}
              <span className="text-ink/30">
                {index + 1} / {steps.length}
              </span>
            </p>

            <label htmlFor={`q-${step.id}`} className="mt-4 block">
              <span className="font-heading text-3xl leading-tight font-bold tracking-tight text-ink sm:text-5xl">
                {step.question}
              </span>
              {step.required && <span className="ml-2 text-3xl font-bold text-brand sm:text-5xl">*</span>}
            </label>

            <div className="mt-8 sm:mt-10">
              {step.type === "choice" ? (
                <div role="radiogroup" aria-labelledby={`q-${step.id}`} className="flex flex-wrap gap-3">
                  {step.options!.map((option) => (
                    <button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={value === option}
                      onClick={() => set(option)}
                      className={cn(
                        "rounded-full border px-5 py-3 font-heading text-base font-semibold transition-colors sm:text-lg",
                        value === option
                          ? "border-brand bg-brand text-white"
                          : "border-black/10 bg-white text-ink hover:border-brand hover:text-brand",
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : step.type === "textarea" ? (
                <textarea
                  ref={inputRef}
                  id={`q-${step.id}`}
                  rows={3}
                  value={value}
                  placeholder={step.placeholder}
                  onChange={(e) => set(e.target.value)}
                  onKeyDown={onTextareaKey}
                  className={cn(inputClass, "resize-none")}
                />
              ) : (
                <input
                  ref={inputRef}
                  id={`q-${step.id}`}
                  type={step.type}
                  value={value}
                  placeholder={step.placeholder}
                  autoComplete={step.id === "name" ? "name" : step.id === "email" ? "email" : step.id === "phone" ? "tel" : "off"}
                  onChange={(e) => set(e.target.value)}
                  className={inputClass}
                />
              )}
              {error && (
                <p role="alert" className="mt-3 text-sm font-medium text-brand">
                  {error}
                </p>
              )}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {index > 0 && (
                  <Button type="button" variant="white" size="lg" onClick={back} icon={<ArrowLeft size={18} />}>
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  size="lg"
                  className={cn(step.required && !value.trim() && "opacity-50")}
                  icon={isLast ? <Send size={18} /> : <ArrowRight size={18} />}
                >
                  {isLast ? "Send" : "Continue"}
                </Button>
              </div>
              <p className="hidden items-center gap-1.5 text-sm text-muted sm:inline-flex">
                Press Enter <CornerDownLeft size={14} />
              </p>
            </div>
          </form>
        )}
      </Container>
    </Section>
  );
}
