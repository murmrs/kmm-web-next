import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const headingVariants = cva("font-bold text-foreground", {
  variants: {
    size: {
      h1: "text-4xl leading-[1.2] font-semibold ",
      h2: "text-2xl",
      h3: "text-xl md:text-2xl",
      h4: "text-xl font-semibold tracking-wide",
      normal: "text-base font-normal",
      pageTitle: "text-4xl sm:text-7xl",
      pageTitleNoUnderline: "text-4xl sm:text-7xl lg:text-8xl",
    },
    variant: {
      default: "",
      tagline: `font-light relative font-semibold text-white before:content-[''] before:mr-2 before:inline-block before:h-[2px] before:w-8 before:bg-brandSecondary before:absolute before:top-[60%] before:-translate-y-1/2 pl-10 before:left-0`,
      taglinePrimary: `font-light text-brandPrimary relative font-semibold text-white before:content-[''] before:mr-2 before:inline-block before:h-[2px] before:w-8 before:bg-brandPrimary before:absolute before:top-[60%] before:-translate-y-1/2 pl-10 before:left-0`,
      animated:
        " [--bg-size:300%] inline animate-gradient bg-gradient-to-r from-brandPrimary via-[#9c40ff] to-brandSecondary bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent tracking-wide",
      light: "font-light",
    },
  },
  defaultVariants: {
    size: "h1",
    variant: "default",
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  children?: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
}

type HeadingComponent = React.ForwardRefExoticComponent<
  HeadingProps & React.RefAttributes<HTMLHeadingElement>
> & {
  h2: React.ForwardRefExoticComponent<
    HeadingProps & React.RefAttributes<HTMLHeadingElement>
  >;
  h3: React.ForwardRefExoticComponent<
    HeadingProps & React.RefAttributes<HTMLHeadingElement>
  >;
  h4: React.ForwardRefExoticComponent<
    HeadingProps & React.RefAttributes<HTMLHeadingElement>
  >;
  tagline: React.ForwardRefExoticComponent<
    HeadingProps & React.RefAttributes<HTMLHeadingElement>
  >;
};

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      children,
      size = "h1",
      variant = "default",
      as = "h1",
      className,
      ...props
    },
    ref
  ) => {
    const Component = as;
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ size, variant }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
) as HeadingComponent;

Heading.h2 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => (
    <Heading as="h2" size="h2" ref={ref} {...props}>
      {props.children}
    </Heading>
  )
);

Heading.h3 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => (
    <Heading as="h3" size="h3" ref={ref} {...props}>
      {props.children}
    </Heading>
  )
);

Heading.h4 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => (
    <Heading as="h4" size="h4" ref={ref} {...props}>
      {props.children}
    </Heading>
  )
);

Heading.tagline = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => (
    <Heading as="h2" size="h3" variant="tagline" ref={ref} {...props}>
      {props.children}
    </Heading>
  )
);

Heading.displayName = "Heading";
Heading.h2.displayName = "Heading.h2";
Heading.h3.displayName = "Heading.h3";
Heading.h4.displayName = "Heading.h4";
Heading.tagline.displayName = "Heading.tagline";

export default Heading;
