export type H2Props = {
  children: React.ReactNode;
  className?: string;
}

const H2 = ( {children, className=""}: H2Props ) => {
  return (
    <h2 className={`text-center h-15 lg:h-20 2xl:h-27 text-[32px] lg:text-[48px] 2xl:text-[64px] border-b-2 border-white ${className}`}>
        { children }
    </h2>
  )
}

export default H2