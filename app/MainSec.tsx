import H2 from "./H2"

export type MainSecProps = {
  bgColor: string;
  textColor: string;
  title: string;
  text: string;
  imageUrl: string;
  imageAlt: string;
}

const MainSec = ({bgColor, textColor, title, text, imageUrl, imageAlt}: MainSecProps) => {
  return (
    <section style={{ backgroundColor: bgColor, color: textColor }} className={`p-5 md:p-0 md:px-10 lg:px-20 xl:px-40 md:grid md:grid-cols-2 md:max-h-150 md:gap-5`}>
      <H2 className="md:order-1">{title}</H2>
      <img className="m-auto py-5 md:row-span-3 w-full md:max-w-160 h-auto md:m-0  md:justify-self-end md:order-1" src={imageUrl} alt={imageAlt} />
      <p className="text-xl md:px-5 md:pb-5 md:order-2">{text}</p>
    </section>
  )
}

export default MainSec