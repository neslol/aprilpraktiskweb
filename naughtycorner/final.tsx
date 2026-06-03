"use client";

import { useEffect, useRef, useState } from "react";

export default function Final() {
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
      <section className="bg-[#656D4A] text-[#EFE6DD] p-5 md:px-6 md:py-10 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2 md:items-start md:gap-8 lg:gap-12">
          <h2 className="block text-center md:hidden text-[32px] border-b-2 border-[#EFE6DD] pb-2 w-full">
            Light up forløb
          </h2>
          <img
            className="w-full h-auto md:max-w-none md:justify-self-start md:order-2"
            src="/IMG_0243 1.png"
            alt=""
          />
          <div className="flex flex-col items-start gap-4 text-left md:items-start md:text-left md:pt-2 md:justify-between md:order-1">
            <h2 className="hidden md:block text-[32px] lg:text-[48px] 2xl:text-[64px] border-b-2 border-[#EFE6DD] pb-2 w-full md:max-w-88">
              Light up forløb
            </h2>
            <p className="text-xl lg:text-[28px] xl:text-4xl 2xl:text-[40px] max-w-none">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit cum natus repellendus quibusdam error laudantium
              atque corporis minus at distinctio. Illum ut possimus tempora
              commodi blanditiis.
            </p>
            <a
              className="mt-4 block w-fit bg-[#D7CEB2] text-black px-6 py-2 rounded-md text-lg"
              href="#"
            >
              Se Light up forløb
            </a>
          </div>
        </div>
      </section>
      <section className="bg-[#D7CEB2] text-[#333D29] p-5 md:px-6 md:py-10 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2 md:items-start md:gap-8 lg:gap-12">
          <h2 className="block text-center md:hidden text-[32px] border-b-2 border-[#EFE6DD] pb-2 w-full">
            1:1 coaching
          </h2>
          <img
            className="w-full h-auto md:max-w-none md:justify-self-start"
            src="/IMG_0203 2(1).png"
            alt=""
          />
          <div className="flex flex-col items-start gap-4 text-left md:items-end md:text-right md:pt-2 md:justify-between">
            <h2 className="hidden md:block text-[32px] lg:text-[48px] 2xl:text-[64px] border-b-2 border-[#EFE6DD] pb-2 w-full md:max-w-88">
              1:1 coaching
            </h2>
            <p className="text-xl lg:text-[28px] xl:text-4xl 2xl:text-[40px] max-w-none">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit cum natus repellendus quibusdam error laudantium
              atque corporis minus at distinctio. Illum ut possimus tempora
              commodi blanditiis.
            </p>
            <a
              className="mt-4 block w-fit bg-[#656D4A] text-[#EFE6DD] px-6 py-2 rounded-md text-lg"
              href="#"
            >
              Se 1:1 coaching
            </a>
          </div>
        </div>
      </section>
      <section className="bg-[url(/waterpillars.png)] bg-cover bg-center text-white text-shadow-lg/70 p-4 pb-10 text-xl flex flex-col gap-6">
        <h2 className="text-center text-[32px] h-15 lg:h-20 2xl:h-27 lg:text-[48px] 2xl:text-[64px] border-b-2 border-[#EFE6DD]">
          Lorem Ipsum
        </h2>
        <p>Lorem ipsum dolor sit amet?</p>
        <p>Lorem ipsum dolor sit!</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
          impedit cumque quam optio aliquid praesentium soluta modi deleniti
          tempore deserunt.
        </p>
      </section>
      <footer className="bg-[#003049] text-white p-4 text-center text-xl flex gap-2 justify-center">
        <p>© Lorem Ipsum 2026</p>
        <p>in loremipsum</p>
      </footer>
    </>
  );
}