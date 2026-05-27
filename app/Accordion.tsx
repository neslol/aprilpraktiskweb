import H2 from "./H2"

const Accordion = () => {
  return (
    <section className="bg-[#936639] text-white p-5">
        <div className="mx-auto px-2 py-4">
            <H2>Program</H2>
            <p className="text-center leading-tight text-xl lg:text-[28px] xl:text-4xl 2xl:text-[40px]">
              Lorem ipsum dolor sit amet,
              <br />
              <span className="font-semibold ">20.-24. december</span>
              <br />
              consectetur adipiscing elit.
            </p>

            <div className="mt-6">
              <details className="program-accordion border-y-2 border-white" open>
                <summary className="flex cursor-pointer list-none items-center justify-between py-4">
                  <span className="text-xl lg:text-[28px] xl:text-4xl 2xl:text-[40px]">Dag 1 - Lorem Ipsum</span>
                  <svg
                    className="program-chevron h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14 shrink-0 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="pb-6 text-center text-xl lg:text-[28px] xl:text-4xl 2xl:text-[40px]">
                  <p className="font-semibold">Lorem Ipsum</p>
                  <p className="mx-auto mt-3 leading-snug ">
                    Lorem ipsum dolor sit amet,
                    <br />
                    consectetur adipiscing elit.
                  </p>
                </div>
              </details>

              <details className="program-accordion border-b-2 border-white">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4">
                  <span className="text-xl lg:text-[28px] xl:text-4xl 2xl:text-[40px]">Dag 2 - Lorem Ipsum</span>
                  <svg
                    className="program-chevron h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14 shrink-0 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="pb-6 text-center text-xl lg:text-[28px] xl:text-4xl 2xl:text-[40px]">
                  <p className="font-semibold">Lorem Ipsum</p>
                  <p className="mx-auto mt-3 leading-snug">
                    Lorem ipsum dolor sit amet,
                    <br />
                    consectetur adipiscing elit.
                  </p>
                </div>
              </details>

              <details className="program-accordion border-b-2 border-white">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4">
                  <span className="text-xl lg:text-[28px] xl:text-4xl 2xl:text-[40px]">Dag 3 - Lorem Ipsum</span>
                  <svg
                    className="program-chevron h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14 shrink-0 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="pb-6 text-center text-xl lg:text-[28px] xl:text-4xl 2xl:text-[40px]">
                  <p className="font-semibold">Lorem Ipsum</p>
                  <p className="mx-auto mt-3 leading-snug">
                    Lorem ipsum dolor sit amet,
                    <br />
                    consectetur adipiscing elit.
                  </p>
                </div>
              </details>

              <details className="program-accordion border-b-2 border-white">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4">
                  <span className="text-xl lg:text-[28px] xl:text-4xl 2xl:text-[40px]">Dag 4 - Lorem Ipsum</span>
                  <svg
                    className="program-chevron h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14 shrink-0 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="pb-6 text-center text-xl lg:text-[28px] xl:text-4xl 2xl:text-[40px]">
                  <p className="font-semibold">Lorem Ipsum</p>
                  <p className="mx-auto mt-3 leading-snug">
                    Lorem ipsum dolor sit amet,
                    <br />
                    consectetur adipiscing elit.
                  </p>
                </div>
              </details>
            </div>
        </div>
    </section>
  )
}

export default Accordion