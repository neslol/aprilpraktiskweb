"use client";

import { useEffect, useRef, useState } from "react";


export default function Forloeb() {
      const heroRef = useRef<HTMLElement | null>(null);
      const [isPastHero, setIsPastHero] = useState(false);
    
      useEffect(() => {
        const updateHeaderState = () => {
          const heroHeight = heroRef.current?.offsetHeight ?? 0;
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
      </section>
        </>
    )
}