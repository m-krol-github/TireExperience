import clsx from "clsx";
import { VariantProps, tv } from "tailwind-variants";

const heading = tv({
  base: "",
  variants: {
    size: {
      h3: "text-mobile-h3 md:text-h3 font-michelin font-bold text-white italic mb-6 md:mb-2",
      h4: "text-mobile-h4 md:text-h4 font-michelin font-bold text-yellow italic",
      h5: "text-mobile-h4 md:text-h5 font-michelin font-bold text-yellow italic",
    },
  },
});

export type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  level: "h3" | "h4" | "h5";
  className?: string;
} & VariantProps<typeof heading>;

export const Heading = ({
  level,
  children,
  size,
  className,
  ...rest
}: Props) => {
  const Component = level;

  return (
    <Component className={clsx(heading({ size }), className)} {...rest}>
      {children}
    </Component>
  );
};

export const SharedParagraph = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <p className={clsx("text-white font-openSans", className)}>{children}</p>;

export const SharedSubText = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p className={clsx("text-h6 text-white/80 font-openSans mb-10", className)}>
    {children}
  </p>
);
