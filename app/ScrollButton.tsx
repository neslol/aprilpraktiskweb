export type ScrollButtonProps = {
  scrollButtonColor: string;
  scrollButtonArrowColor: string;
};

const ScrollButton = ({scrollButtonColor, scrollButtonArrowColor }: ScrollButtonProps) => {
    return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      style={{ backgroundColor: scrollButtonColor ?? "#2F5B78", color: scrollButtonArrowColor ?? "#EFE6DD", borderColor: scrollButtonArrowColor ?? "#EFE6DD" }}
      className="fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border-2  shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 md:bottom-6 md:right-6 md:h-12 md:w-12"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-10 w-10"
      >
        <path
          d="M12 19V6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6.5 11.5L12 6L17.5 11.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
)
}

export default ScrollButton;
