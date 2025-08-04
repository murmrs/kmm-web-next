"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import type { CarouselApi } from "@/components/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/carousel";
import { Button, ButtonProps, buttonVariants } from "./ui/button";
import { Hits, InstantSearch, useHits } from "react-instantsearch";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { RestaurantCard } from "./restaurants/restaurant-card";
import { Restaurant } from "@/config/typesense";
import { MoveRight } from "lucide-react";

type ImageProps = {
  src: string;
  alt?: string;
};

type ProductCardProps = {
  url: string;
  image: ImageProps;
  title: string;
  price: string;
  variant: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  button: ButtonProps;
  products: ProductCardProps[];
  className?: string;
};

export type RestaurantListProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const RestaurantList = (props: RestaurantListProps) => {
  const { tagline, heading, description, button, products, className } = {
    ...RestaurantListDefaults,
    ...props,
  };

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const { items } = useHits<Restaurant>();

  return (
    <section id="relume" className={cn("overflow-hidden px-[5%]", className)}>
      <div className="container">
        <div className="mb-8 grid grid-cols-1 items-end gap-8 md:mb-18 md:grid-cols-[1fr_max-content] lg:mb-20 lg:gap-20">
          <div className="max-w-xl">
            <p className="mb-3 font-semibold md:mb-4 flex items-center">
              <span className="h-1 w-4 bg-primary block mr-2" />
              {tagline}
            </p>
            <h1 className="mb-3 text-5xl font-bold md:mb-4 ">{heading}</h1>
            <p className="md:text-md">{description}</p>
          </div>
          {/* <Link
            href="/restaurants"
            className={cn(
              "hidden md:flex",
              buttonVariants({ variant: "default" })
            )}
          >
            {button.title}
          </Link> */}
          <Link
            href="/restaurants"
            className={
              cn(
                "group relative flex pr-16 py-4 pl-4 overflow-hidden rounded-md hover:text-white transition-all duration-300 text-white sm:text-foreground",
              )
              // "hidden md:flex",
              // buttonVariants({ variant: "default" })
            }
          >
            {button.title}
            <MoveRight className="absolute right-3 text-white z-10" />
            <span className="bg-primary block absolute right-0 top-1/2 -translate-y-1/2 z-[-1] rounded-full transition-all duration-300 group-hover:w-[110%] group-hover:size-52 group-hover:translate-x-[5%] w-[110%] sm:w-12 h-full sm:h-12 translate-x-[5%] sm:translate-x-[0] " />
          </Link>
        </div>
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: "start",
          }}
        >
          <div className="relative pb-24">
            {/* {JSON.stringify(items, null, 2)} */}
            <CarouselContent className="ml-0">
              {/* <Hits
                hitComponent={ProductCard}
                classNames={{
                  root: "",
                  list: "grid grid-cols-1 gap-6",
                }}
              /> */}
              {items.map((location, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[95%] pl-0 pr-6 sm:basis-4/5 md:basis-1/2 md:pr-8 lg:basis-1/4"
                >
                  <RestaurantCard key={index} location={location} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-0 flex w-full items-end justify-between">
              <div className="flex h-7 pt-[10px]">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={clsx(
                      "mx-[3px] size-2 rounded-full",
                      current === index + 1 ? "bg-primary" : "bg-primary/10",
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-2 md:gap-4">
                <CarouselPrevious className="static size-12 -translate-y-0" />
                <CarouselNext className="static size-12 -translate-y-0" />
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

const productData = {
  url: "#",
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
    alt: "Relume placeholder image",
  },
  title: "Restaurant name",
  price: "$$",
  variant: "Variant",
};

export const RestaurantListDefaults: Props = {
  tagline: "Explore",
  heading: "Popular restaurants",
  description:
    "Discover the best restaurants commited to providing the best experience for you and your family.",
  button: {
    variant: "secondary",
    size: "lg",
    title: "View all",
  },
  products: [
    productData,
    productData,
    productData,
    productData,
    productData,
    productData,
    productData,
  ],
};
