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

  const xPartOne = useTransform(scrollYProgress, [0, 1], ["-10%", "0%"]);
  const xPartTwo = useTransform(scrollYProgress, [0, 1], ["10%", "0%"]);

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
            className={cn("text-7xl font-bold leading-22", {
              "self-end": index % 2 !== 0,
            })}
          >
            {heading}
          </motion.h1>
        ))}
      </div>
    </section>
  );
};

export const MarqueeBannerDefaults: Props = {
  headings: [
    "Medium length banner heading goes here",
    "Medium length banner heading goes here",
  ],
};
