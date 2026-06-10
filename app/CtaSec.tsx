import H2 from "./H2"

export type CtaSecProps = {
  title: string;
  points?: Array<string | { point?: string }>;
  buttonColor: string;
  buttonText: string;
  bgColor: string;
  textColor: string;
  imageUrl: string;
  imageAlt: string;
}

const CtaSec = ({title, points, buttonText, buttonColor, bgColor, textColor, imageUrl, imageAlt}: CtaSecProps) => {
  const pointList = (points ?? [])
    .map((point) => (typeof point === "string" ? point : point?.point))
    .filter((point): point is string => Boolean(point));

  return (
    <section style={{ backgroundColor: bgColor, color: textColor }} className={`p-5 md:p-0 md:px-10 lg:px-20 xl:px-40 md:grid md:grid-cols-2 md:max-h-150 md:gap-5`}>
      <H2 className="md:order-1">{title}</H2>
      <img className="m-auto py-5 md:row-span-3 w-full md:max-w-160 h-auto md:m-0  md:justify-self-end md:order-1" src={imageUrl} alt={imageAlt} />
      <div className="order-2">
        <ul className="list-decimal list-inside mt-4 text-2xl lg:text-[28px] xl:text-[32px] 2xl:text-[36px] sm:py-10">
          {pointList.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
        <div className="flex justify-center mt-6">
          <button style={{ backgroundColor: buttonColor }} className="px-12 py-2 rounded-md text-[16px] lg:text-xl">
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  )
}

export default CtaSec