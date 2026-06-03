import type { RefObject } from "react";

export type HeroProps = {
  heroRef?: RefObject<HTMLElement | null>;
  bgHeroUrl?: string;
  textColor?: string;
  buttonTextColor?: string;
  title?: string;
  subtitle?: string;
};


export const Hero = ({ heroRef }: HeroProps) => {
    return (
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden bg-[url('/hero.jpg')] bg-center bg-cover text-white text-xl"
      >
        <div className="backdrop-brightness-50 absolute inset-0 flex flex-col items-center justify-center text-center gap-4">
          <h1 className="text-4xl font-bold sm:text-6xl">Gnist</h1>
          <h2 className="text-2xl sm:text-3xl">
            Et sted for ro, natur, vand og havet
          </h2>
          <div className="flex flex-col text-center gap-6 mt-4">
            <a
              href="#"
              className="flex items-center gap-2 text-white text-lg max-w-62.5 sm:max-w-125"
            >
              Læs mere om Light up forløb
              <svg
                className="program-chevron h-16 w-16 shrink-0 transition-transform duration-300 rotate-270"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-white rounded-full text-lg max-w-62.5 sm:max-w-125"
            >
              Læs mere om 1:1 coaching
              <svg
                className="program-chevron h-16 w-16 shrink-0 transition-transform duration-300 rotate-270"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <svg
            className="program-chevron h-16 w-16 shrink-0 transition-transform duration-300"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>
    )
}