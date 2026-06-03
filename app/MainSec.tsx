import H2 from "./H2"

const MainSec = () => {
  return (
    <section className="bg-[#656D4A] text-white p-5 md:p-0 md:px-10 lg:px-20 xl:px-40 md:grid md:grid-cols-2 md:max-h-150 md:gap-5">
      <H2 className="md:order-1">Lorem Ipsum</H2>
      <img className="m-auto py-5 md:row-span-3 w-full md:max-w-160 h-auto md:m-0  md:justify-self-end md:order-1" src="images/IMG_0243 1.png" alt="" />
      <p className="text-xl md:px-5 md:pb-5 md:order-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit cum natus repellendus quibusdam error laudantium atque corporis minus at distinctio. Illum ut possimus tempora commodi blanditiis. Eligendi pariatur molestias neque?</p>
    </section>
  )
}

export default MainSec