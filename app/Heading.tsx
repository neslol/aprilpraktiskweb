"use client";
import { useEffect, useState } from "react";

export const Heading = () => {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Light Up Forløb", href: "#light-up" },
    { label: "1:1 Coaching", href: "#coaching" },
  ];

  useEffect(() => {
    const updateHeaderState = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight ?? 0;
      setIsPastHero(window.scrollY >= heroHeight - 1);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState);

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50  p-5 md:px-10 lg:px-20 xl:px-40 text-white transition-colors duration-300 ${
          isPastHero ? "bg-black" : "bg-transparent"
        }`}
      >
        <div className="flex flex-row items-center justify-between text-2xl">
          <div className="flex gap-5">
            <img className="w-full h-10" src="IMG_0203 2.png" alt="" />
            <p>Gnist</p>
          </div>
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-label="Open menu"
            className="rounded-full text-3xl leading-none transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            ☰
          </button>
        </div>
        {isMenuOpen ? (
          <div className="mt-4 overflow-hidden rounded-3xl border border-white/15 bg-black/90 shadow-2xl backdrop-blur-md">
            <nav aria-label="Primary" className="flex flex-col p-2">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-2xl px-4 py-4 text-lg font-medium transition-colors duration-200 hover:bg-white/10"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        ) : null}
      </header>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className="fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#EFE6DD] bg-[#2F5B78] text-[#EFE6DD] shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 md:bottom-6 md:right-6 md:h-12 md:w-12"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="h-10 w-10"
        >
          <path
            d="M12 19V6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M6.5 11.5L12 6L17.5 11.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
};
