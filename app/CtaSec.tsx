import H2 from "./H2"
import Button from "./Button"

export type CtaSecProps = {
    title?: string;
    points?: string[];
    bgColor?: string;
    textColor?: string;
}

const CtaSec = (
  {
    title = "Lorem Ipsum",
    points = ["Lorem ipsum dolor sit amet.", "Consectetur adipiscing elit.", "Sed do eiusmod tempor incididunt."],
    bgColor = "bg-[#7F4F24]",
    textColor = "text-white"
  }: CtaSecProps
) => {
  return (
    <section className={`${bgColor} ${textColor} p-5 md:grid md:max-h-139 md:gap-5`}>
        <H2>{title}</H2>
        <ul className="list-decimal list-inside mt-4 text-2xl lg:text-[32px] xl:text-[38px] 2xl:text-[42px] sm:py-10">
            {points.map((point, index) => (
                <li key={index}>{point}</li>
            ))}
        </ul>
        <div className="flex justify-center mt-6">
            <Button text="Kontakt" bgClass="bg-[#D7CEB2]" textClass="text-white" href="#" />
        </div>
    </section>
  )
}

export default CtaSec