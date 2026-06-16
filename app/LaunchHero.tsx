import type { RefObject } from "react";

export type LaunchHeroProps = {
  heroRef?: RefObject<HTMLElement | null>;
  bgHeroUrl?: string;
  bgHeroUrl2?: string;
  textColor?: string;
  buttonTitle1?: string;
  buttonurl1?: string;
  buttonTextColor1?: string;
    buttonTitle2?: string;
  buttonurl2?: string;
  buttonTextColor2?: string;
};


const LaunchHero = ({ heroRef, bgHeroUrl, bgHeroUrl2, textColor, buttonTitle1, buttonurl1, buttonTextColor1, buttonTitle2, buttonurl2, buttonTextColor2 }: LaunchHeroProps) => {
    return (
        <section style={{ color: textColor }} 
        className="grid grid-cols-2">
            <section
                ref={heroRef}
                id="hero"
                style={{ backgroundImage: `url(${bgHeroUrl})`}}
                className="relative h-screen overflow-hidden bg-center bg-cover text-xl"
            >
                <a href={buttonurl1 ?? "#"}>
                <div className="backdrop-brightness-50 absolute inset-0 flex flex-col items-center justify-center text-center gap-4">
                    <div className="flex flex-col text-center gap-6 mt-4">
                        <p
                            style={{ color: buttonTextColor1 }}
                            className={`flex items-center gap-2 text-4xl font-bold max-w-62.5 sm:max-w-125`}
                        >
                            {buttonTitle1}
                        </p>
                    </div>
                </div>   
                </a>
            </section>
            <section
                ref={heroRef}
                id="hero"
                style={{ backgroundImage: `url(${bgHeroUrl2})`}}
                className="relative h-screen overflow-hidden bg-center bg-cover text-xl"
            >
                <a href={buttonurl2 ?? "#"}>
                <div className="backdrop-brightness-50 absolute inset-0 flex flex-col items-center justify-center text-center gap-4">
                    <div className="flex flex-col text-center gap-6 mt-4">
                        <p
                            style={{ color: buttonTextColor2 }}
                            className={`flex items-center gap-2 text-4xl font-bold max-w-62.5 sm:max-w-125`}
                        >
                            {buttonTitle2}
                        </p>
                    </div>
                </div>   
                </a> 
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