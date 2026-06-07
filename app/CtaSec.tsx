import H2 from "./H2"

const CtaSec = () => {
  return (
    <section className="bg-[#656D4A] text-white p-5 md:p-0 md:px-10 lg:px-20 xl:px-40 md:grid md:grid-cols-2 md:max-h-150 md:gap-5">
      <H2 className="md:order-1">Lorem Ipsum</H2>
      <img className="m-auto py-5 md:row-span-3 w-full md:max-w-160 h-auto md:m-0  md:justify-self-end md:order-1" src="images/IMG_0243 1.png" alt="" />
      <div className="order-2">
        <ul className="list-decimal list-inside mt-4 text-2xl lg:text-[28px] xl:text-[32px] 2xl:text-[36px] sm:py-10">
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Consectetur adipiscing elit.</li>
          <li>Sed do eiusmod tempor incididunt.</li>
        </ul>
        <div className="flex justify-center mt-6">
          <button className="bg-[#414833] px-12 py-2 rounded-md text-[16px] lg:text-xl">Kontakt</button>
        </div>
      </div>
    </section>
  )
}

export default CtaSec