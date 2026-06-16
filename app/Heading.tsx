"use client";
import { useEffect, useState } from "react";

export type HeadingProps = {
  title: string;
  logo: string;
  logoAlt: string;
  backgroundColor: string;
  textColor: string;
  menuItems: {
    label: string;
    href: string;
  }[];
};
const Heading = ({ title, logo, logoAlt, backgroundColor, textColor, menuItems }: HeadingProps) => {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        className="fixed inset-x-0 top-0 z-50 p-5 md:px-10 lg:px-20 xl:px-40 transition-colors duration-300"
        style={{
          backgroundColor: isPastHero ? backgroundColor : "transparent",
          color: textColor,
        }}
      >
        <div className="flex flex-row items-center justify-between text-2xl">
          <div className="flex gap-5">
            <img className="w-full h-10" src={logo} alt={logoAlt} />
            <p style={{ opacity: isPastHero ? 1 : 0 }}>{title}</p>
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
    </>
  );
};

export default Heading;