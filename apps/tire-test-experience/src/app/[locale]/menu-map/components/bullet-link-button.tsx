import Link from "next/link";

interface BulletLinkButtonProps {
  text: string;
  href: string;
}

const BulletLinkButton = ({ text, href }: BulletLinkButtonProps) => (
  <Link
    href={href}
    className="font-michelin italic font-bold h-[54px] rounded-[27px] flex justify-items-center items-center text-[22px] px-4 md:px-12 bg-yellow border border-yellow hover:bg-transparent hover:text-yellow"
  >
    {text}
  </Link>
);

export default BulletLinkButton;
