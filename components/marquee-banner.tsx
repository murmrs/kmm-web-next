"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  headings: string[];
};

export type MarqueeBannerProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const MarqueeBanner = (props: MarqueeBannerProps) => {
  const { headings } = {
    ...MarqueeBannerDefaults,
    ...props,
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const xPartOne = useTransform(scrollYProgress, [0, 1], ["-12%", "0%"]);
  // Make part two move a greater distance, so it appears to move faster
  const xPartTwo = useTransform(scrollYProgress, [0, 1], ["18%", "0%"]);

  return (
    <section
      id="relume"
      ref={sectionRef}
      className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28"
    >
      <div className="flex flex-col whitespace-nowrap">
        {headings.map((heading, index) => (
          <motion.h1
            key={index}
            style={index % 2 === 0 ? { x: xPartOne } : { x: xPartTwo }}
            className={cn(
              "text-4xl lg:text-7xl font-bold leading-12 lg:leading-22",
              {
                "self-end": index % 2 !== 0,
              },
            )}
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        ))}
      </div>
    </section>
  );
};

export const MarqueeBannerDefaults: Props = {
  headings: [
    'more than a pretty menu&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-primary">&middot;</span>&nbsp;&nbsp;&nbsp;&nbsp;more than a pretty menu&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-primary">&middot;</span>&nbsp;&nbsp;&nbsp;&nbsp;more than a pretty menu',
    'a tool for living&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-primary">&middot;</span>&nbsp;&nbsp;&nbsp;&nbsp;a tool for living&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-primary">&middot;</span>&nbsp;&nbsp;&nbsp;&nbsp;a tool for living&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-primary">&middot;</span>&nbsp;&nbsp;&nbsp;&nbsp;a tool for living',
  ],
};
