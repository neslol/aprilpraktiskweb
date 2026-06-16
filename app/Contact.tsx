"use client";

import { useEffect, useState } from "react";

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

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

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

      setFeedback("Beskeden blev sendt og gemt i databasen.");
      setForm(initialFormState);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Kunne ikke sende beskeden.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-black/30 ring-1 ring-white/20 transition hover:bg-[#1e293b]"
        >
          Åbn kontaktformular
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
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#0f172a]/95 shadow-2xl shadow-black/50">
        <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h2 id="contact-title" className="mt-2 text-3xl font-semibold">
              Kontakt
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
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#f7b801] focus:bg-white/10"
                type="text"
                name="name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Dit navn"
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-white/80">Email</span>
              <input
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#f7b801] focus:bg-white/10"
                type="email"
                name="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="din@email.dk"
                required
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-white/80">Telefon</span>
            <input
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#f7b801] focus:bg-white/10"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="Valgfrit"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-white/80">Besked</span>
            <textarea
              className="min-h-40 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#f7b801] focus:bg-white/10"
              name="message"
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Skriv din besked her..."
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
              Annuller
            </button>
            <button
              className="rounded-xl bg-[#f7b801] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#ffd24d] disabled:cursor-not-allowed disabled:opacity-60"
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