"use client";

import { useState } from "react";

// 1. Define the component's Puck-compatible Props
export type ContactSecProps = {
  // Placeholders
  namePlaceholder?: string;
  emailPlaceholder?: string;
  phonePlaceholder?: string;
  messagePlaceholder?: string;

  // Custom Colors (Matching your project's styling convention)
  primaryBgColor?: string;     // Section background (e.g., "#0f172a")
  accentBgColor?: string;      // The main CTA button color (e.g., "#f7b801")
  accentBgHoverColor?: string; // Accent button hover color (e.g., "#ffd24d")
  accentFocusColor?: string;   // Input border focus rings (e.g., "#f7b801")
};

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialFormState: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const Contact = ({
  namePlaceholder,
  emailPlaceholder,
  phonePlaceholder,
  messagePlaceholder,
  primaryBgColor = "#0f172a", // Fallback color provided for standard block viewing
  accentBgColor,
  accentBgHoverColor,
  accentFocusColor,
}: ContactSecProps) => {
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Hover states managed via JS to cleanly handle random hex colors from Puck
  const [isAccentHovered, setIsAccentHovered] = useState(false);

  const updateField = (field: keyof ContactFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;

        throw new Error(errorData?.error ?? "Noget gik galt under afsendelsen.");
      }

      setFeedback("Dine oplysninger er sendt! Vi vender tilbage hurtigst muligt.");
      setForm(initialFormState);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Kunne ikke sende beskeden.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Focus style variable setup
  const inputStyle = {
    "--tw-focus-color": accentFocusColor,
  } as React.CSSProperties;

  return (
    <section
      style={{ backgroundColor: primaryBgColor }}
      className="w-full text-white py-16 px-4"
      aria-labelledby="contact-title"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 id="contact-title" className="text-3xl font-semibold">
            Kontakt
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-white/80">Navn</span>
              <input
                style={inputStyle}
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:bg-white/10 focus:border-[var(--tw-focus-color)]"
                type="text"
                name="name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder={namePlaceholder}
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-white/80">Email</span>
              <input
                style={inputStyle}
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:bg-white/10 focus:border-[var(--tw-focus-color)]"
                type="email"
                name="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder={emailPlaceholder}
                required
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-white/80">Telefon</span>
            <input
              style={inputStyle}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:bg-white/10 focus:border-[var(--tw-focus-color)]"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder={phonePlaceholder}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-white/80">Besked</span>
            <textarea
              style={inputStyle}
              className="min-h-40 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:bg-white/10 focus:border-[var(--tw-focus-color)]"
              name="message"
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder={messagePlaceholder}
              required
            />
          </label>

          {feedback ? (
            <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
              {feedback}
            </p>
          ) : null}

          <div className="flex justify-end">
            <button
              onMouseEnter={() => setIsAccentHovered(true)}
              onMouseLeave={() => setIsAccentHovered(false)}
              style={{ backgroundColor: isAccentHovered ? accentBgHoverColor : accentBgColor }}
              className="w-full sm:w-auto rounded-xl px-6 py-3 text-sm font-semibold text-black transition disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sender..." : "Send besked"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;