import { Button, ButtonProps } from "./ui/button";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  image: ImageProps;
};

export type PageHeroProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const PageHero = (props: PageHeroProps) => {
  const { heading, description, image } = {
    ...PageHeroDefaults,
    ...props,
  };
  return (
    <section className="-mt-56">
      <div className="relative w-full h-[420px] lg:h-[500px] overflow-hidden">
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <clipPath id="page-hero-clip" clipPathUnits="objectBoundingBox">
              <path
                d="
                  M0,0 
                  H1 
                  V0.85 
                  C0.85,0.95 0.7,1 0.5,1 
                  C0.3,1 0.15,0.95 0,0.85 
                  Z
                "
              />
            </clipPath>
          </defs>
        </svg>
        <img
          src={image.src}
          className="w-full h-full object-cover absolute inset-0 object-[center_80%]"
          alt={image.alt}
          style={{
            clipPath: "url(#page-hero-clip)",
            WebkitClipPath: "url(#page-hero-clip)",
          }}
        />
      </div>
      <div className="container ">
        <div className="relative z-10 -mt-24 mb-12 grid grid-cols-1 items-start gap-x-12 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-y-8 lg:mb-20 lg:gap-x-20 lg:gap-y-16">
          <h1 className="text-6xl font-bold -mt-24 dark text-foreground flex items-center gap-2">
            {heading}
          </h1>
          <div>
            <p className="md:text-md dark text-foreground -mt-8">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const PageHeroDefaults: Props = {
  heading: "Medium length hero heading goes here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  image: {
    src: "/heroplate.jpg",
    alt: "Relume placeholder image",
  },
};
