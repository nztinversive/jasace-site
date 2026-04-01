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
      <div className="flex flex-col gap-4 border-b border-stone-800/60 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1.5">
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-stone-50 uppercase">{title}</h1>
          <p className="max-w-2xl text-sm text-stone-500">{description}</p>
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
    <section className={`border border-stone-800/60 bg-stone-900/40 p-5 sm:p-6 ${className}`}>
      {title || description ? (
        <div className="mb-5 space-y-1 border-b border-stone-800/40 pb-4">
          {title ? <h2 className="text-base font-bold text-stone-100 uppercase tracking-wide">{title}</h2> : null}
          {description ? <p className="text-sm text-stone-500">{description}</p> : null}
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
    <label className="block space-y-1.5">
      <span className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-stone-600">{hint}</span> : null}
    </label>
  );
}

export function AdminInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full border border-stone-700/60 bg-stone-950 px-4 py-3 text-sm text-stone-100 placeholder:text-stone-600 focus:border-terra/50 focus:outline-none focus:ring-1 focus:ring-terra/20 transition-colors ${props.className ?? ""}`}
    />
  );
}

export function AdminTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-[120px] w-full border border-stone-700/60 bg-stone-950 px-4 py-3 text-sm text-stone-100 placeholder:text-stone-600 focus:border-terra/50 focus:outline-none focus:ring-1 focus:ring-terra/20 transition-colors ${props.className ?? ""}`}
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
    primary: "bg-terra text-stone-50 hover:bg-terra-light shadow-sm shadow-terra/10",
    secondary: "border border-stone-700/60 bg-stone-950 text-stone-300 hover:border-stone-600 hover:text-stone-100",
    danger: "bg-red-600/90 text-white hover:bg-red-500",
  };

  return (
    <button
      {...props}
      className={`px-5 py-2.5 text-sm font-semibold tracking-wide uppercase transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${tones[tone]} ${className}`}
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
    <label className="flex items-center gap-3 border border-stone-800/60 bg-stone-950 px-4 py-3 text-sm text-stone-300 cursor-pointer hover:border-stone-700 transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 border-stone-600 bg-stone-950 text-terra focus:ring-terra/40 accent-terra"
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
  tone?: "default" | "warning" | "success";
}) {
  const styles = {
    default: "border-stone-800/60 bg-stone-900/40 text-stone-400",
    warning: "border-terra/30 bg-terra/[0.06] text-stone-200",
    success: "border-green-600/30 bg-green-600/[0.06] text-green-300",
  };

  return (
    <div className={`border px-4 py-3 text-sm ${styles[tone]}`}>
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
    <div className="border border-stone-800/60 bg-stone-900/40 p-5 relative overflow-hidden group hover:border-terra/20 transition-colors">
      {/* Subtle glow on hover */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-terra/[0.04] rounded-full blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-500">{label}</div>
      <div className="mt-2 font-display text-3xl font-bold tracking-tight text-stone-50">{value}</div>
    </div>
  );
}
