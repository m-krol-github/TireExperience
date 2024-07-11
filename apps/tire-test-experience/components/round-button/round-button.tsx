import Link from "next/link";

interface RoundButtonProps {
  text: string;
  href: string;
}

const RoundButton = ({ text, href }: RoundButtonProps) => {
  return (
    <Link
      href={href}
      className="flex justify-center items-center font-michelin italic text-white font-semibold rounded-full w-[150px] h-[150px] md:w-[170px] md:h-[170px] border-2 border-yellow text-xl hover:bg-yellow hover:text-blue"
    >
      {text}
    </Link>
  );
};

export default RoundButton;
