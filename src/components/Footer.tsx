"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { convexEnabled } from "@/lib/convex-config";

const footerLinks = {
  Services: [
    { label: "Architecture", href: "/services#architecture" },
    { label: "Construction", href: "/services#construction" },
    { label: "Engineering", href: "/services#engineering" },
    { label: "Consulting", href: "/contact" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/contact" },
    { label: "News", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Case Studies", href: "/#work" },
    { label: "Insights", href: "/blog" },
    { label: "Sustainability", href: "/services" },
    { label: "Partners", href: "/about" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/privacy" },
    { label: "Licenses", href: "/terms" },
  ],
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function FooterContent({
  email,
  onEmailChange,
  onSubmit,
  isSubmitting,
  statusMessage,
  statusTone,
}: {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  statusMessage: string | null;
  statusTone: "success" | "error" | null;
}) {
  return (
    <footer className="bg-stone-950 text-stone-400 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-stone-800">
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl font-semibold text-stone-50 tracking-tight">
                <span className="text-terra">J</span>asace
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Architecture, construction, and engineering consulting -
              delivering results since 2015.
            </p>
            <div className="pt-2 space-y-3">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-stone-500">Stay Updated</p>
              <form className="space-y-3" onSubmit={onSubmit}>
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => onEmailChange(event.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-stone-900 border border-stone-800 px-4 py-3 text-sm text-stone-300 placeholder:text-stone-600 focus:outline-none focus:border-terra/50 transition-colors"
                  />
                  <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-terra text-stone-50 text-sm font-medium hover:bg-terra-light transition-colors disabled:cursor-not-allowed disabled:opacity-70">
                    {isSubmitting ? "Submitting..." : "Subscribe"}
                  </button>
                </div>
                {statusMessage ? (
                  <p className={`text-xs ${statusTone === "error" ? "text-red-400" : "text-stone-300"}`}>
                    {statusMessage}
                  </p>
                ) : null}
              </form>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-stone-500 mb-4">{section}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-stone-500 hover:text-stone-300 transition-colors py-1 block">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-600">&copy; {new Date().getFullYear()} Jasace ACE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-stone-400 transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-stone-400 transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-stone-400 transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ConvexFooter() {
  const subscribe = useMutation(api.newsletterSubscribers.subscribe);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!emailPattern.test(normalizedEmail)) {
      setStatusTone("error");
      setStatusMessage("Enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);
    setStatusTone(null);

    try {
      const result = await subscribe({ email: normalizedEmail });
      setStatusTone("success");
      setStatusMessage(result.duplicate ? "You are already subscribed." : "Thanks for subscribing.");
      setEmail("");
    } catch {
      setStatusTone("error");
      setStatusMessage("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FooterContent
      email={email}
      onEmailChange={(value) => {
        setEmail(value);
        setStatusMessage(null);
        setStatusTone(null);
      }}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      statusMessage={statusMessage}
      statusTone={statusTone}
    />
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<"success" | "error" | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!emailPattern.test(normalizedEmail)) {
      setStatusTone("error");
      setStatusMessage("Enter a valid email address.");
      return;
    }

    setStatusTone("error");
    setStatusMessage("Newsletter signup is unavailable until Convex is connected.");
  };

  if (!convexEnabled) {
    return (
      <FooterContent
        email={email}
        onEmailChange={(value) => {
          setEmail(value);
          setStatusMessage(null);
          setStatusTone(null);
        }}
        onSubmit={handleSubmit}
        isSubmitting={false}
        statusMessage={statusMessage}
        statusTone={statusTone}
      />
    );
  }

  return <ConvexFooter />;
}
