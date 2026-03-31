"use client";

import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

export function AdminPage({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-stone-800 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-terra">Admin Panel</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-stone-50">{title}</h1>
          <p className="max-w-2xl text-sm text-stone-400">{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
      {children}
    </div>
  );
}

export function AdminCard({
  title,
  description,
  children,
  className = "",
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-3xl border border-stone-800 bg-stone-900/70 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] ${className}`}>
      {title || description ? (
        <div className="mb-5 space-y-1">
          {title ? <h2 className="text-lg font-semibold text-stone-50">{title}</h2> : null}
          {description ? <p className="text-sm text-stone-400">{description}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function AdminField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="block text-sm font-medium text-stone-200">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-stone-500">{hint}</span> : null}
    </label>
  );
}

export function AdminInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-sm text-stone-100 placeholder:text-stone-500 focus:border-terra/60 focus:outline-none ${props.className ?? ""}`}
    />
  );
}

export function AdminTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-[120px] w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-sm text-stone-100 placeholder:text-stone-500 focus:border-terra/60 focus:outline-none ${props.className ?? ""}`}
    />
  );
}

export function AdminButton({
  children,
  tone = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  tone?: "primary" | "secondary" | "danger";
}) {
  const tones = {
    primary: "bg-terra text-stone-50 hover:bg-terra-light",
    secondary: "border border-stone-700 bg-stone-950 text-stone-200 hover:border-stone-600 hover:bg-stone-900",
    danger: "bg-red-600 text-white hover:bg-red-500",
  };

  return (
    <button
      {...props}
      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${tones[tone]} ${className}`}
    >
      {children}
    </button>
  );
}

export function AdminCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-stone-800 bg-stone-950 px-4 py-3 text-sm text-stone-200">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-stone-600 bg-stone-950 text-terra focus:ring-terra/40"
      />
      <span>{label}</span>
    </label>
  );
}

export function AdminNotice({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "warning";
}) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm ${
        tone === "warning"
          ? "border-terra/40 bg-terra/10 text-stone-100"
          : "border-stone-800 bg-stone-950 text-stone-400"
      }`}
    >
      {children}
    </div>
  );
}

export function AdminStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-stone-800 bg-stone-900/70 p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">{label}</div>
      <div className="mt-3 font-display text-4xl font-semibold tracking-tight text-stone-50">{value}</div>
    </div>
  );
}
