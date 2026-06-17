"use client";

import { useEffect, useState } from "react";

// 1. Define the component's Puck-compatible Props
export type ContactProps = {
  editorPreviewOpen?: boolean
  
  // Placeholders
  namePlaceholder?: string;
  emailPlaceholder?: string;
  phonePlaceholder?: string;
  messagePlaceholder?: string;

  // Custom Colors (Matching your project's styling convention)
  primaryBgColor?: string;     // Modals and floating buttons (e.g., "#0f172a")
  primaryBgHoverColor?: string;// Hover states for dark buttons (e.g., "#1e293b")
  buttonStrokeColor?: string;  // Border color for buttons (e.g., "#ffffff80")
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
  editorPreviewOpen = false, // Default to false if not explicitly provided
  namePlaceholder,
  emailPlaceholder,
  phonePlaceholder,
  messagePlaceholder,
  primaryBgColor,
  primaryBgHoverColor,
  buttonStrokeColor,
  accentBgColor,
  accentBgHoverColor,
  accentFocusColor,
}: ContactProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Hover states managed via JS to cleanly handle random hex colors from Puck
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [isAccentHovered, setIsAccentHovered] = useState(false);

  // Determine if the form should be displayed (either site visitor clicked open OR forced via editor)
  const shouldShowForm = isOpen || editorPreviewOpen;

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
    <>
      {/* 1. The Trigger Button - Hidden in the workspace when the editor toggle forces the form open */}
      {!shouldShowForm && (
        <div style={{ color: buttonStrokeColor ?? "#ffffff80" }} className="fixed bottom-4 left-4 z-50">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setIsPrimaryHovered(true)}
            onMouseLeave={() => setIsPrimaryHovered(false)}
            style={{ backgroundColor: isPrimaryHovered ? primaryBgHoverColor : primaryBgColor }}
            className="rounded-full px-2 py-2 flex h-10 w-10 items-center justify-center border-2 shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 md:bottom-6 md:right-6 md:h-12 md:w-12"
          >
            <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 640 640" className="h-10 w-10 fill-current">
              <path d="M125.4 128C91.5 128 64 155.5 64 189.4C64 190.3 64 191.1 64.1 192L64 192L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 192L575.9 192C575.9 191.1 576 190.3 576 189.4C576 155.5 548.5 128 514.6 128L125.4 128zM528 256.3L528 448C528 456.8 520.8 464 512 464L128 464C119.2 464 112 456.8 112 448L112 256.3L266.8 373.7C298.2 397.6 341.7 397.6 373.2 373.7L528 256.3zM112 189.4C112 182 118 176 125.4 176L514.6 176C522 176 528 182 528 189.4C528 193.6 526 197.6 522.7 200.1L344.2 335.5C329.9 346.3 310.1 346.3 295.8 335.5L117.3 200.1C114 197.6 112 193.6 112 189.4z"/>
            </svg>
          </button>
        </div>
      )}

      {/* 2. The Form Modal - Displayed when shouldShowForm is true */}
      {shouldShowForm && (
        <section
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-8 text-white backdrop-blur-sm"
          aria-labelledby="contact-title"
          role="dialog"
          aria-modal="true"
          onClick={(event) => {
            // Disable backdrop closing if it's forced open in editor
            if (event.target === event.currentTarget && !editorPreviewOpen) {
              setIsOpen(false);
            }
          }}
        >
          <div 
            style={{ backgroundColor: `${primaryBgColor}f2` }} 
            className="relative w-full max-w-2xl overflow-hidden rounded-4xl border border-white/15 shadow-2xl shadow-black/50"
          >
            <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
              <div>
                <h2 id="contact-title" className="mt-2 text-3xl font-semibold">
                  Kontakt
                </h2>
              </div>
              <button
                type="button"
                onClick={() => !editorPreviewOpen && setIsOpen(false)}
                disabled={editorPreviewOpen}
                className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/80 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
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
                  onClick={() => !editorPreviewOpen && setIsOpen(false)}
                  disabled={editorPreviewOpen}
                  className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Annuller
                </button>
                <button
                  onMouseEnter={() => setIsAccentHovered(true)}
                  onMouseLeave={() => setIsAccentHovered(false)}
                  style={{ backgroundColor: isAccentHovered ? accentBgHoverColor : accentBgColor }}
                  className="rounded-xl px-6 py-3 text-sm font-semibold text-black transition disabled:cursor-not-allowed disabled:opacity-60"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sender..." : "Send besked"}
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Contact;