export type ButtonProps = {
  bgColor?: string;
  textColor?: string;
  text?: string;
  href?: string;
}

const Button = ({
  bgColor,
  textColor,
  text,
  href,
}: ButtonProps) => {
  return (
    <a
      className="mt-4 block w-fit px-6 py-2 rounded-md text-lg"
      style={{backgroundColor: bgColor, color: textColor}}
      href={href}
    >
      {text}
    </a>
  );
};

export default Button;