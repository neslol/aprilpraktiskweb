import H2 from "./H2"

export type MainSecProps = {
  bgColor: string;
  textColor: string;
  title: string;
  text: string;
  imageUrl: string;
  imageAlt: string;
  reverseLayout: boolean;
}

const MainSec = ({bgColor, textColor, title, text, imageUrl, imageAlt, reverseLayout}: MainSecProps) => {
  const textColumnOrder = reverseLayout ? "md:order-2" : "md:order-1";
  const imageColumnOrder = reverseLayout ? "md:order-1" : "md:order-2";
  const textAlignment = reverseLayout ? "md:text-right" : "md:text-left";

  return (
    <section style={{ backgroundColor: bgColor, color: textColor }} className={`p-5 md:p-0 md:px-10 lg:px-20 xl:px-40 md:grid md:grid-cols-2 md:max-h-150 md:gap-5`}>
      <div className={`flex flex-col justify-center ${textColumnOrder} ${textAlignment}`}>
        <H2>{title}</H2>
        <p className="text-xl md:px-5 md:pb-5">{text}</p>
      </div>
      <img className={`m-auto py-5 w-full md:max-w-160 h-auto md:m-0 md:justify-self-end ${imageColumnOrder}`} src={imageUrl} alt={imageAlt} />
    </section>
  )
}

export default MainSec