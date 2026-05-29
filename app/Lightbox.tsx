
const Lightbox = () => {
  return (
    <section className="bg-[#v] text-black p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
            src="https://picsum.photos/300/300"
            alt="Placeholder 1"
            className="cursor-pointer w-full h-auto"
            />
            <img
            src="https://picsum.photos/300/300"
            alt="Placeholder 2"
            className="cursor-pointer w-full h-auto"
            />
            <img
            src="https://picsum.photos/300/300"
            alt="Placeholder 3"
            className="cursor-pointer w-full h-auto"
            />
            <img
            src="https://picsum.photos/300/300"
            alt="Placeholder 4"
            className="cursor-pointer w-full h-auto"
            />
        </div>
        <p className="mt-5 text-xl lg:text-[28px] xl:text-4xl 2xl:text-[40px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            quos, deleniti tempora quod ut iure, accusantium at animi magnam
            possimus labore, aliquid eveniet quam ullam. Deleniti voluptas ipsa
            corporis nulla accusantium, aliquam est, eius nostrum nam quod
            reiciendis nisi explicabo.
        </p>
    </section>
  )
}

export default Lightbox