"use client";

export type HeadingProps = {
  isPastHero?: boolean;
  
};

export const Heading = ({ isPastHero = false }: HeadingProps) => {
    return (
        <>
        <header
        className={`fixed inset-x-0 top-0 z-50 px-4 py-4 text-white transition-colors duration-300 ${
          isPastHero ? "bg-black" : "bg-transparent"
        }`}
      >
        <div className="flex flex-row items-center justify-between text-2xl">
          <p>Gnist</p>
          <a href="#">
            ☰
          </a>
        </div>
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
    )
}

