import H2 from "./H2"

const BgSec = () => {
  return (
    <section className="bg-[url(https://picsum.photos/1080/1080)] bg-cover text-white p-4 pb-10 text-xl">
        <H2>Lorem Ipsum</H2>
        <div className="flex flex-col gap-5 pt-10 text-xl lg:text-[28px] xl:text-4xl 2xl:text-[40px]">
            <p>Lorem ipsum dolor sit amet?</p>
            <p>Lorem ipsum dolor sit!</p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                impedit cumque quam optio aliquid praesentium soluta modi deleniti
                tempore deserunt.
            </p>
        </div>
        
    </section>
  )
}

export default BgSec