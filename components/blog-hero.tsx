import { Calendar, User } from "lucide-react";
import Image from "next/image";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  published_by: string;
  published_date: string;
  image: ImageProps;
};

export type BlogHeroProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const BlogHero = (props: BlogHeroProps) => {
  const { heading, published_by, published_date, image } = {
    ...BlogHeroDefaults,
    ...props,
  };
  return (
    <section className="-mt-12 relative">
      <div className="relative w-full aspect-video overflow-hidden">
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
        {/* Image and overlay are both clipped */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            clipPath: "url(#page-hero-clip)",
            WebkitClipPath: "url(#page-hero-clip)",
          }}
        >
          <Image
            src={image.src}
            className="w-full h-full object-cover object-[center_80%]"
            fill
            alt={image.alt || ""}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.25) 90%, rgba(0,0,0,0.05) 100%)",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
      <div className="absolute top-0 md:top-12 left-0 w-full flex flex-col justify-end p-8 z-10 pointer-events-none">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white flex items-center gap-2">
          {heading}
        </h1>
        <div className="flex items-center gap-4 text-white/90 text-sm">
          {published_by && (
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {published_by}
            </span>
          )}
          {published_by && published_date && <span className="mx-2">·</span>}
          {published_date && (
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(published_date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export const BlogHeroDefaults: Props = {
  heading: "Medium length hero heading goes here",
  published_by: "John Doe",
  published_date: "2021-01-01",
  image: {
    src: "/heroplate.jpg",
    alt: "Relume placeholder image",
  },
};
