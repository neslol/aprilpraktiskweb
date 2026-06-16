import type { RefObject } from "react";

export type HeroButton = {
  title?: string;
  url?: string;
  buttonTextColor?: string;
};

export type LaunchHeroProps = {
  heroRef?: RefObject<HTMLElement | null>;
  bgHeroUrl?: string;
  bgHeroUrl2?: string;
  textColor?: string;
  items?: HeroButton[];
};


const LaunchHero = ({ heroRef, bgHeroUrl, bgHeroUrl2, textColor, items = [] }: LaunchHeroProps) => {
    return (
        <section className="grid grid-cols-2">
            <section
                ref={heroRef}
                id="hero"
                style={{ backgroundImage: `url(${bgHeroUrl})`, color: textColor }}
                className="relative h-screen overflow-hidden bg-center bg-cover text-xl"
            >
                <div className="backdrop-brightness-50 absolute inset-0 flex flex-col items-center justify-center text-center gap-4">
                    <div className="flex flex-col text-center gap-6 mt-4">
                        {(items.length > 0 ? items : [
                        ]).map((item, index) => (
                        <a
                            key={`${item.title ?? "hero-link"}-${index}`}
                            href={item.url ?? "#"}
                            style={{ color: item.buttonTextColor }}
                            className={`flex items-center gap-2 text-6xl font-bold max-w-62.5 sm:max-w-125`}
                        >
                            {item.title}
                        </a>
                        ))}
                    </div>
                </div>    
            </section>
            <section
                ref={heroRef}
                id="hero"
                style={{ backgroundImage: `url(${bgHeroUrl2})`, color: textColor }}
                className="relative h-screen overflow-hidden bg-center bg-cover text-xl"
            >
                <div className="backdrop-brightness-50 absolute inset-0 flex flex-col items-center justify-center text-center gap-4">
                    <div className="flex flex-col text-center gap-6 mt-4">
                        {(items.length > 0 ? items : [
                        ]).map((item, index) => (
                        <a
                            key={`${item.title ?? "hero-link"}-${index}`}
                            href={item.url ?? "#"}
                            style={{ color: item.buttonTextColor }}
                            className={`flex items-center gap-2 text-6xl font-bold max-w-62.5 sm:max-w-125`}
                        >
                            {item.title}
                        </a>
                        ))}
                    </div>
                </div>    
            </section>
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

export default LaunchHero;