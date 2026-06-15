import H2 from "./H2"
import Button from "./Button"

export type MainSecProps = {
  bgColor: string;
  textColor: string;
  title: string;
  text: string;
  imageUrl: string;
  imageAlt: string;
  reverseLayout: boolean;
  buttonToggle?: boolean;
  buttonText?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  buttonHref?: string;

}

const MainSec = ({bgColor, textColor, title, text, imageUrl, imageAlt, reverseLayout, buttonToggle, buttonText, buttonBgColor, buttonTextColor, buttonHref}: MainSecProps) => {
  const textColumnOrder = reverseLayout ? "md:order-2" : "md:order-1";
  const imageColumnOrder = reverseLayout ? "md:order-1" : "md:order-2";
  const imageAlignment = reverseLayout ? "md:justify-self-start" : "md:justify-self-end";
  const textAlignment = reverseLayout ? "md:text-right" : "md:text-left";

  return (
    <section style={{ backgroundColor: bgColor, color: textColor }} className={`p-5 md:p-0 md:px-10 lg:px-20 xl:px-40 md:grid md:grid-cols-2 md:max-h-150 md:gap-5`}>
      <img className={`m-auto py-5 w-full md:max-w-160 h-auto md:m-0 ${imageColumnOrder} ${imageAlignment}`} src={imageUrl} alt={imageAlt} />
      <div className={`flex flex-col justify-center ${textColumnOrder} ${textAlignment} `}>
        <H2>{title}</H2>
        <p className="text-xl md:px-5 md:pb-5">{text}</p>
        <div className={`flex ${reverseLayout ? "md:justify-end" : "md:justify-start"}`}>
        {buttonToggle && (
          <Button
            bgColor={buttonBgColor}
            textColor={buttonTextColor}
            text={buttonText}
            href={buttonHref}
          />
        )}
        </div>
      </div>
    </section>
  )
}

export default MainSec