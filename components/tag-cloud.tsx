"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";

type TagCloudProps = {
  tags?: {
    name: string;
    href: string;
  }[];
  className?: string;
  tagline?: string;
  heading?: string;
  description?: string;
  button?: ButtonProps;
};

export const TagCloud = React.forwardRef<HTMLDivElement, TagCloudProps>(
  ({ className, ...props }, ref) => {
    const { tags, tagline, heading, description, button } = {
      ...TagCloudDefaults,
      ...props,
    };
    return (
      <div className="container">
        <div className="mb-4 grid grid-cols-1 items-end gap-12 md:grid-cols-[1fr_max-content] lg:gap-20">
          <div className="max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h1 className="mb-3 text-5xl font-bold md:mb-4 ">{heading}</h1>
            <p className="md:text-md">{description}</p>
          </div>
          {button && (
            <Button {...button} className="hidden md:flex">
              {button.title}
            </Button>
          )}
        </div>
        <div
          ref={ref}
          className={cn("flex flex-wrap gap-2", className)}
          {...props}
        >
          {tags?.map((tag) => (
            <a
              key={tag.name}
              href={tag.href}
              className="no-underline hover:no-underline"
            >
              <Badge
                variant="secondary"
                className="hover:bg-secondary/80 text-2xl"
              >
                {tag.name}
              </Badge>
            </a>
          ))}
        </div>
      </div>
    );
  }
);

export const TagCloudDefaults: TagCloudProps = {
  tags: [
    { name: "Tag 1", href: "#" },
    { name: "Tag 2", href: "#" },
    { name: "Tag 3", href: "#" },
  ],
  tagline: "Tagline",
  heading: "Popular Searches",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

TagCloud.displayName = "TagCloud";
