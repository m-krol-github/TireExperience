import { VariantProps, tv } from "tailwind-variants";

const paragraph = tv({
  base: "",
  variants: {
    size: {
      sm: "text-sm",
      lg: "text-sm md:text-lg",
      xl: "text-xl",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

type Props = React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof paragraph> & {
    forwardRef?: React.Ref<HTMLParagraphElement>;
  };

export const Paragraph = ({
  children,
  className,
  size,
  forwardRef,
  ...rest
}: Props) => {
  return (
    <p
      ref={forwardRef}
      className={paragraph({ size, className })}
      {...rest}
      role="paragraph"
    >
      {children}
    </p>
  );
};
