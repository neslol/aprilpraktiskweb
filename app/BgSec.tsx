import H2 from "./H2"

export type BgSecProps = {
  bgImageUrl: string;
  title: string;
  text: string;
  textColor: string;
}

const BgSec = ({bgImageUrl, title, text, textColor}: BgSecProps) => {
  return (
    <section className={`bg-[url(${bgImageUrl})] bg-cover ${textColor} md:px-10 lg:px-20 xl:px-40 py-40`}>
        <H2 className="text-center">{title}</H2>
        <p className="text-center mt-4">{text}</p>
    </section>
  )
}

export default BgSec