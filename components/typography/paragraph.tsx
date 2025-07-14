import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const paragraphVariants = cva("", {
  variants: {
    size: {
      normal: "text-base leading-8 mb-4",
    },
    style: {
      animated:
        "inline animate-gradient bg-gradient-to-r from-brandPrimary via-brandSecondary to-brandPrimary bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent",
    },
    variant: {
      default: "",
      light: "text-secondary/60",
    },
  },
  defaultVariants: {
    size: "normal",
    variant: "default",
  },
});

export interface ParagraphProps extends VariantProps<typeof paragraphVariants> {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
}

const Paragraph = ({
  children,
  size = "normal",
  style,
  variant,
  as = "p",
  className,
}: ParagraphProps) => {
  const Component = as;
  return (
    <Component
      className={cn(paragraphVariants({ size, style, variant }), className)}
    >
      {children}
    </Component>
  );
};

export default Paragraph;
