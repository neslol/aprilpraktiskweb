export type ButtonProps = {
  bgClass?: string;
  textClass?: string;
  text?: string;
  href?: string;
}

const Button = ({

    // midlertidigt info fra f.eks. API
  bgClass = "bg-[#D7CEB2]",
  textClass = "text-black",
  text = "Se Light up forløb",
  href = "#",
}: ButtonProps) => {
  return (
    <a
      className={`mt-4 block w-fit ${bgClass} ${textClass} px-6 py-2 rounded-md text-lg`}
      href={href}
    >
      {text}
    </a>
  );
};

export default Button;