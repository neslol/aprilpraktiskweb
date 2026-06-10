import CtaSec from "../CtaSec";
import { Hero } from "../Hero";
import Lightbox from "../Lightbox";
import {Heading} from "../Heading";

export default function Home() {
  return (
    <main>
            <Heading></Heading>
      <Hero></Hero>
      The components...
      <div>
        {/* Footer */}
        <p>Footer</p>
        <footer className="bg-[#582F0E] text-white p-4 text-center text-xl flex gap-2 justify-center">
          <p>© Lorem Ipsum 2026</p>
          <p>in loremipsum</p>
        </footer>
        <footer className="bg-[#FAEDCD] text-[#284B63] p-4 text-center text-xl flex gap-2 justify-center">
          <p>© Lorem Ipsum 2026</p>
          <p>in loremipsum</p>
        </footer>
        <footer className="bg-[#003049] text-white p-4 text-center text-xl flex gap-2 justify-center">
          <p>© Lorem Ipsum 2026</p>
          <p>in loremipsum</p>
        </footer>

        {/* Section with picture as background, heading and text */}
        <p>Section with picture as background, heading and text</p>
        <section className="bg-[#F28482] text-white p-4 pb-10 text-xl flex flex-col gap-6 ">
          <h2 className="text-center">Lorem Ipsum</h2>
          <p>Lorem ipsum dolor sit amet?</p>
          <p>Lorem ipsum dolor sit!</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            impedit cumque quam optio aliquid praesentium soluta modi deleniti
            tempore deserunt.
          </p>
        </section>
        <section className="bg-[url(https://picsum.photos/1080/1080)] bg-cover text-black p-4 pb-10 text-xl flex flex-col gap-6">
          <h2 className="text-center">Lorem Ipsum</h2>
          <p>Lorem ipsum dolor sit amet?</p>
          <p>Lorem ipsum dolor sit!</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            impedit cumque quam optio aliquid praesentium soluta modi deleniti
            tempore deserunt.
          </p>
        </section>

        {/* Image Grid */}
        <p>
          Section with four pictures in a 2x2 grid, with lightbox functionality.
        </p>
        <section className="bg-[#F7B801] text-black p-4 text-xl">
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://picsum.photos/300/300"
              alt="Placeholder 1"
              className="cursor-pointer"
            />
            <img
              src="https://picsum.photos/300/300"
              alt="Placeholder 2"
              className="cursor-pointer"
            />
            <img
              src="https://picsum.photos/300/300"
              alt="Placeholder 3"
              className="cursor-pointer"
            />
            <img
              src="https://picsum.photos/300/300"
              alt="Placeholder 4"
              className="cursor-pointer"
            />
          </div>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            quos, deleniti tempora quod ut iure, accusantium at animi magnam
            possimus labore, aliquid eveniet quam ullam. Deleniti voluptas ipsa
            corporis nulla accusantium, aliquam est, eius nostrum nam quod
            reiciendis nisi explicabo.
          </p>
        </section>

        {/* Header */}
        <p>Header</p>
        <header className="bg-[#000000] text-white p-4 text-center text-2xl flex flex-row justify-between">
          <p>Lorem Ipsum</p>
          <p>☰</p>
        </header>
        <header className="bg-[#ffffff] text-black p-4 text-center text-2xl flex flex-row justify-between">
          <p>Lorem Ipsum</p>
          <p>☰</p>
        </header>

        {/* Hero sub-site */}
        <p>
          Hero background, with heading 1 and down arrow. Hero fills the whole
          phone screen.
        </p>
        <section className="relative h-screen overflow-hidden bg-[url('/heroCoaching.png')] bg-cover text-white text-xl">
          <h1 className="absolute inset-0 flex items-center justify-center text-center text-4xl">
            Lorem Ipsum
          </h1>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                                        <svg
                    className="program-chevron h-16 w-16 shrink-0 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
          </div>
        </section>

        {/* Quotes */}
        <p>Section with quotes and author name, left + right arrow buttons</p>
        <section className="bg-[#2A9D8F] text-white p-4 text-xl">
          <div className="flex items-center justify-between">
            <button className="text-2xl bg-[#F7B801] text-black pl-2.5 pr-2.5 pt-1 pb-1 rounded-full">←</button>
            <blockquote className="mx-4 text-center italic">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua."
            </blockquote>
            <button className="text-2xl bg-[#F7B801] text-black pl-2.5 pr-2.5 pt-1 pb-1 rounded-full">→</button>
          </div>
          <p className="text-center mt-4">
            Navne Navnesen
          </p>
        </section>
        
        {/* List with cta button */}
        <p>Section with a title and a list with a cta button</p>
        <section className="bg-[#E76F51] text-white p-4 text-xl">
          <h2 className="text-center">Lorem Ipsum</h2>
          <ul className="list-decimal list-inside mt-4">
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Consectetur adipiscing elit.</li>
            <li>Sed do eiusmod tempor incididunt.</li>
          </ul>
          <div className="flex justify-center mt-6">
            <button className="bg-[#F7B801] text-black px-12 py-2 rounded-md text-lg">Kontakt</button>
          </div>
        </section>

        {/* Program */}
        <p>Section with a title, hr tags to separate, text about when the course starts, then 4 accordions.</p>
        <section className="bg-[#986B3D] text-[#F7EBD8] p-4 text-xl">
          <div className="mx-auto max-w-md px-2 py-4">
            <h2 className="text-center text-4xl font-normal">Program</h2>
            <hr className="my-5 border-[#E8D9C8]" />

            <p className="text-center leading-tight">
              Lorem ipsum dolor sit amet,
              <br />
              <span className="font-semibold">20.-24. december</span>
              <br />
              consectetur adipiscing elit.
            </p>

            <div className="mt-6">
              <details className="program-accordion border-y border-[#E8D9C8]" open>
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-4xl">
                  <span className="text-2xl">Dag 1 - Lorem Ipsum</span>
                  <svg
                    className="program-chevron h-6 w-6 shrink-0 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="pb-6 text-center">
                  <h3 className="text-3xl font-semibold">Lorem Ipsum</h3>
                  <p className="mx-auto mt-3 max-w-xs leading-snug">
                    Lorem ipsum dolor sit amet,
                    <br />
                    consectetur adipiscing elit.
                  </p>
                </div>
              </details>

              <details className="program-accordion border-b border-[#E8D9C8]">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-4xl">
                  <span className="text-2xl">Dag 2 - Lorem Ipsum</span>
                  <svg
                    className="program-chevron h-6 w-6 shrink-0 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="pb-6 text-center">
                  <h3 className="text-3xl font-semibold">Lorem Ipsum</h3>
                  <p className="mx-auto mt-3 max-w-xs leading-snug">
                    Lorem ipsum dolor sit amet,
                    <br />
                    consectetur adipiscing elit.
                  </p>
                </div>
              </details>

              <details className="program-accordion border-b border-[#E8D9C8]">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-4xl">
                  <span className="text-2xl">Dag 3 - Lorem Ipsum</span>
                  <svg
                    className="program-chevron h-6 w-6 shrink-0 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="pb-6 text-center">
                  <h3 className="text-3xl font-semibold">Lorem Ipsum</h3>
                  <p className="mx-auto mt-3 max-w-xs leading-snug">
                    Lorem ipsum dolor sit amet,
                    <br />
                    consectetur adipiscing elit.
                  </p>
                </div>
              </details>

              <details className="program-accordion border-b border-[#E8D9C8]">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-4xl">
                  <span className="text-2xl">Dag 4 - Lorem Ipsum</span>
                  <svg
                    className="program-chevron h-6 w-6 shrink-0 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="pb-6 text-center">
                  <h3 className="text-3xl font-semibold">Lorem Ipsum</h3>
                  <p className="mx-auto mt-3 max-w-xs leading-snug">
                    Lorem ipsum dolor sit amet,
                    <br />
                    consectetur adipiscing elit.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Main Hero */}
      <p>Hero background, with heading 1, heading 2 and two clickable texts with right arrows, down arrow at the bottom of the screen. Hero background fills the whole screen.</p>
      <section className="relative h-screen overflow-hidden bg-[url('/hero.png')] bg-center bg-cover  text-white text-xl">
        <div className="backdrop-brightness-50 absolute inset-0 flex flex-col items-center justify-center text-center gap-4">
          <h1 className="text-4xl font-bold sm:text-6xl">Gnist</h1>
          <h2 className="text-2xl sm:text-3xl">Et sted for ro, natur, vand og havet</h2>
          <div className="flex flex-col text-center gap-6 mt-4">
            <a href="youtube.com"className="flex items-center gap-2 text-white text-lg max-w-[250px] sm:max-w-[500px]">
              Læs mere om Light up forløb
              <svg
                    className="program-chevron h-16 w-16 shrink-0 transition-transform duration-300 rotate-270"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
            </a>
<a href="youtube.com" className="flex items-center gap-2 text-white rounded-full text-lg max-w-62.5 sm:max-w-125">
  Læs mere om 1:1 coaching
              <svg
                    className="program-chevron h-16 w-16 shrink-0 transition-transform duration-300 rotate-270"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
        </div>
      </section> 
      {/* Lightbox */}
      <Lightbox
                images={[
                    "https://picsum.photos/200/300",
                    "https://picsum.photos/201/301",
                    "https://picsum.photos/202/302",
                    "https://picsum.photos/203/303",
                ]}
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
      </div>
    </main>
  );
}
