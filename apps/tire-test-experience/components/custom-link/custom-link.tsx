import Link from "next/link";

type CustomLinkProps = {
  text: string;
  href: string;
  className?: string;
};

const CustomLink = ({ text, href, className }: CustomLinkProps) => (
  <Link href={href}>
    <span className={className}>{text}</span>
  </Link>
);

export default CustomLink;
