"use client";

import { useState, FormEvent } from "react";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function validate(form: FormData): FieldErrors {
    const errs: FieldErrors = {};
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const message = form.get("message") as string;

    if (!name?.trim()) errs.name = "Name is required";
    if (!email?.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Please enter a valid email";
    if (!message?.trim()) errs.message = "Please tell us about your project";
    return errs;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const errs = validate(form);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTouched({ name: true, email: true, message: true });
      return;
    }

    setStatus("sending");
    setErrors({});

    // Simulate send (replace with real API call)
    setTimeout(() => {
      setStatus("sent");
    }, 1500);
  }

  function handleBlur(field: string) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  const inputBase = "w-full bg-white border px-4 py-3.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none transition-colors";
  const inputOk = "border-stone-200 focus:border-terra/50";
  const inputErr = "border-red-300 focus:border-red-400 bg-red-50/30";

  if (status === "sent") {
    return (
      <div className="bg-white border border-stone-200 p-10 text-center space-y-4">
        <div className="w-14 h-14 bg-terra/10 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-7 h-7 text-terra" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-light tracking-tight">
          Message <span className="italic font-medium">Sent</span>
        </h3>
        <p className="text-sm text-stone-500 max-w-sm mx-auto">
          Thank you for reaching out. We typically respond within one business day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-terra hover:text-terra-dark transition-colors mt-2"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-semibold tracking-wider uppercase text-stone-400 block mb-2">
            Name <span className="text-terra">*</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="Your full name"
            className={`${inputBase} ${touched.name && errors.name ? inputErr : inputOk}`}
            onBlur={() => handleBlur("name")}
          />
          {touched.name && errors.name && (
            <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="text-xs font-semibold tracking-wider uppercase text-stone-400 block mb-2">
            Email <span className="text-terra">*</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="you@company.com"
            className={`${inputBase} ${touched.email && errors.email ? inputErr : inputOk}`}
            onBlur={() => handleBlur("email")}
          />
          {touched.email && errors.email && (
            <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>
          )}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-semibold tracking-wider uppercase text-stone-400 block mb-2">Phone</label>
          <input
            name="phone"
            type="tel"
            placeholder="(555) 000-0000"
            className={`${inputBase} ${inputOk}`}
          />
        </div>
        <div>
          <label className="text-xs font-semibold tracking-wider uppercase text-stone-400 block mb-2">Project Type</label>
          <select
            name="type"
            className={`${inputBase} ${inputOk} appearance-none cursor-pointer`}
          >
            <option>Select a discipline</option>
            <option>Architecture</option>
            <option>Construction</option>
            <option>Engineering</option>
            <option>Integrated (Multiple)</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold tracking-wider uppercase text-stone-400 block mb-2">
          Message <span className="text-terra">*</span>
        </label>
        <textarea
          name="message"
          rows={6}
          placeholder="Tell us about your project, timeline, and any specific requirements..."
          className={`${inputBase} resize-none ${touched.message && errors.message ? inputErr : inputOk}`}
          onBlur={() => handleBlur("message")}
        />
        {touched.message && errors.message && (
          <p className="text-xs text-red-500 mt-1.5">{errors.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="px-8 py-4 bg-stone-900 text-stone-50 text-sm font-semibold tracking-wide hover:bg-terra transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-3"
      >
        {status === "sending" ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
