import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CtaBlockProps {
  className?: string;
  heading: string;
  text: string;
  buttonText: string;
  buttonLink: string;
}

export function CtaBlock(props?: CtaBlockProps) {
  const { className, heading, text, buttonText, buttonLink } = {
    ...defaultProps,
    ...props,
  };

  return (
    <section
      className={cn(
        "w-full bg-primary text-white py-20 flex items-center justify-center",
        className
      )}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Section */}
        <div className="flex-1 flex flex-col items-start md:items-start">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-left">
            {heading}
          </h2>
          <p className="text-lg md:text-xl mb-8 text-left max-w-xl">{text}</p>
          <Link href={buttonLink} passHref>
            <Button size="lg" variant="secondary">
              {buttonText}
            </Button>
          </Link>
        </div>
        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center w-full">
          {/* You can place an image, illustration, or any visual here */}
          <img
            src="/restaurant-illustration.svg"
            alt="Discover restaurants"
            className="max-w-xs md:max-w-md w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

const defaultProps: CtaBlockProps = {
  className: "",
  heading: "Ready to discover your next favorite restaurant?",
  text: "Sign up now to personalize your experience, save your preferences, and get the most out of Know My Menu!",
  buttonText: "Get Started",
  buttonLink: "/signup",
};
