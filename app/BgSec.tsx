export type BgSecProps = {
  bgImageUrl: string;
  title: string;
  text: string;
  textColor: string;
  showBorder?: boolean; // Optional prop to toggle the border
}

const BgSec = ({bgImageUrl, title, text, textColor, showBorder}: BgSecProps) => {
  return (
    <section style={{ color: textColor, backgroundImage: `url(${bgImageUrl})` }} className={`bg-cover md:px-10 lg:px-20 xl:px-40 py-40`}>
    <h2 className={`text-center h-15 lg:h-20 2xl:h-27 text-[32px] lg:text-[48px] 2xl:text-[64px]`}>
      {title}
                      {showBorder && (
              <div className={`w-full h-0.5 bg-[currentColor] mx-auto mt-2`} />
            )}
    </h2>
        <p className="text-center mt-4">{text}</p>
    </section>
  )
}

export default BgSec