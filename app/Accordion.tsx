export type AccordionProps = {
  title: string;
  description: string;
  items: {
    title: string;
    heading: string;
    text: string;
  }[],
  openAll?: boolean;
  showTitleBorder?: boolean;  // Title underline toggle
  showTopBorder?: boolean;    // First accordion item top line toggle
  showItemBorders?: boolean;  // Inside separator lines toggle
  bgColor: string;
  textColor: string;
}

const Accordion = ({
  title, 
  description, 
  items, 
  openAll, 
  showTitleBorder, 
  showTopBorder,
  showItemBorders, 
  bgColor, 
  textColor
}: AccordionProps) => {
  return (
    <section 
      style={{backgroundColor: bgColor, color: textColor}}
      className="p-5 md:px-10 lg:px-20 xl:px-40"
    >
        <div className="mx-auto py-4">
            <h2 className="text-center h-15 lg:h-20 2xl:h-27 text-[32px] lg:text-[48px] 2xl:text-[64px]">
              {title}
            </h2>
            
            {/* 1. Title Line */}
            {showTitleBorder && (
              <div className={`w-full h-0.5 bg-white mx-auto mt-2`} />
            )}

            <p className="text-center leading-tight pt-5 text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px]">
              {description}
            </p>

            <div className="mt-6">
              {items.map((item, index) => (
                <div key={index}>
                  {/* 2. Top Frame Line: Displays only above item 0 */}
                  {showTopBorder && index === 0 && (
                    <div className={`w-full h-[2px] bg-white opacity-40 mx-auto`} />
                  )}

                  <details className="program-accordion group" open={openAll}>
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4">
                      <span className="text-2xl lg:text-[28px] xl:text-[32px] 2xl:text-[36px]">{item.title}</span>
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
                    <div className="pb-6 text-center text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px]">
                      <p className="font-semibold">{item.heading}</p>
                      <p className="mx-auto mt-3 leading-snug ">
                        {item.text}
                      </p>
                    </div>
                  </details>

                  {/* 3. Item Separator Line: Separates content entries */}
                  {showItemBorders && (
                    <div className={`w-full h-[2px] bg-white opacity-40 mx-auto`} />
                  )}
                </div>
              ))}
            </div>
        </div>
    </section>
  )
}

export default Accordion