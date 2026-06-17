"use client";

import { useEffect, useState } from "react";

// 1. Define the component's Puck-compatible Props
export type ContactProps = {
  // Localization & Texts
  title?: string;
  buttonCancelText?: string;
  buttonSubmitText?: string;
  buttonSubmittingText?: string;
  
  // Placeholders
  namePlaceholder?: string;
  emailPlaceholder?: string;
  phonePlaceholder?: string;
  messagePlaceholder?: string;

  // Custom Colors (Matching your project's styling convention)
  primaryBgColor?: string;     // Modals and floating buttons (e.g., "#0f172a")
  primaryBgHoverColor?: string;// Hover states for dark buttons (e.g., "#1e293b")
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
  title = "Kontakt",
  buttonCancelText = "Annuller",
  buttonSubmitText = "Send besked",
  buttonSubmittingText = "Sender...",
  namePlaceholder = "Dit navn",
  emailPlaceholder = "din@email.dk",
  phonePlaceholder = "Valgfrit",
  messagePlaceholder = "Skriv din besked her...",
  primaryBgColor = "#0f172a",
  primaryBgHoverColor = "#1e293b",
  accentBgColor = "#f7b801",
  accentBgHoverColor = "#ffd24d",
  accentFocusColor = "#f7b801",
}: ContactProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Hover states managed via JS to cleanly handle random hex colors from Puck
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [isAccentHovered, setIsAccentHovered] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const updateField = (field: keyof ContactFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
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

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsPrimaryHovered(true)}
          onMouseLeave={() => setIsPrimaryHovered(false)}
          style={{ backgroundColor: isPrimaryHovered ? primaryBgHoverColor : primaryBgColor }}
          className="rounded-full px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-black/30 ring-1 ring-white/20 transition"
        >
          Åbn Kontaktformular
        </button>
      </div>
    );
  }

  return (
    <section
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-8 text-white backdrop-blur-sm"
      aria-labelledby="contact-title"
      role="dialog"
      aria-modal="true"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <div 
        style={{ backgroundColor: `${primaryBgColor}f2` }} // Adds minor transparency (95%) matching your original bg-[#0f172a]/95
        className="relative w-full max-w-2xl overflow-hidden rounded-4xl border border-white/15 shadow-2xl shadow-black/50"
      >
        <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h2 id="contact-title" className="mt-2 text-3xl font-semibold">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="Luk kontaktformular"
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 px-6 py-6">
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

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {buttonCancelText}
            </button>
            <button
              onMouseEnter={() => setIsAccentHovered(true)}
              onMouseLeave={() => setIsAccentHovered(false)}
              style={{ backgroundColor: isAccentHovered ? accentBgHoverColor : accentBgColor }}
              className="rounded-xl px-6 py-3 text-sm font-semibold text-black transition disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? buttonSubmittingText : buttonSubmitText}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;