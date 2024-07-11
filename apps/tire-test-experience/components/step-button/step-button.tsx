const StepButton = ({
  onClick,
  text,
  disabled,
}: {
  onClick: () => void;
  text: string;
  disabled?: boolean;
}) => (
  <button
    className={`bg-yellow text-black font-michelin font-bold text-[1.375rem] leading-[1.5rem] whitespace-nowrap py-[0.9375rem] w-56 rounded-full transition-all ${
      disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default StepButton;
