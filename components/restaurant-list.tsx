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
import { Button, ButtonProps } from "./ui/button";
import { Hits, InstantSearch, useHits } from "react-instantsearch";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { RestaurantCard } from "./restaurants/restaurant-card";
import { Restaurant } from "@/config/typesense";

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
        <div className="mb-12 grid grid-cols-1 items-end gap-12 md:mb-18 md:grid-cols-[1fr_max-content] lg:mb-20 lg:gap-20">
          <div className="max-w-xl">
            <p className="mb-3 font-semibold md:mb-4 flex items-center">
              <span className="h-1 w-4 bg-primary block mr-2" />
              {tagline}
            </p>
            <h1 className="mb-3 text-5xl font-bold md:mb-4 ">{heading}</h1>
            <p className="md:text-md">{description}</p>
          </div>
          <Button className="hidden md:flex">{button.title}</Button>
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
                      current === index + 1 ? "bg-primary" : "bg-primary/10"
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
