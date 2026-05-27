import H2 from "./H2"

const CtaSec = () => {
  return (
    <section className="bg-[#7F4F24] text-white p-5 md:grid md:max-h-139 md:gap-5">
        <H2>Lorem Ipsum</H2>
        <ul className="list-decimal list-inside mt-4 text-2xl lg:text-[32px] xl:text-[38px] 2xl:text-[42px] sm:py-10">
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Consectetur adipiscing elit.</li>
            <li>Sed do eiusmod tempor incididunt.</li>
        </ul>
        <div className="flex justify-center mt-6">
            <button className="bg-[#414833] px-12 py-2 rounded-md text-[16px] lg:text-2xl">Kontakt</button>
        </div>
    </section>
  )
}

export default CtaSec