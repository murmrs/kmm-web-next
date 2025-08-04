"use client";
import { ChevronLeft, ChevronRight, MapPin, Quote } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import Heading from "./typography/heading";
import Paragraph from "./typography/paragraph";
import { buttonVariants } from "./ui/button";

const quotes = [
  {
    id: 1,
    name: "Fred",
    review:
      "I don't like mayonnaise. Now, instead of getting my wife to ask for me... I just know.",
    location: "Ventura, CA",
  },
  {
    id: 2,
    review:
      "My son has severe allergies to dairy and egg—this makes it easier when he comes in.",
    location: "Ventura, CA",
  },
  {
    id: 3,
    name: "Karla",
    review:
      "I want to visit with my friends, not spend the night asking questions about the food.",
    location: "Yosemite, CA",
  },
  {
    id: 4,
    name: "Martha",
    review:
      "I skip the meltdowns with my 7-year-old by only showing her what she can have on the menu.",
    location: "Camarillo, CA",
  },
  {
    id: 5,
    name: "Jared",
    review: "I love seeing what I'm going to eat. This is great!",
    location: "Dallas, TX",
  },
];

export default function QuoteCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlying, setIsFlying] = useState(false);
  const [flyDirection, setFlyDirection] = useState<"left" | "right">("right");

  const nextCard = useCallback(() => {
    setFlyDirection("right");
    setIsFlying(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
      setIsFlying(false);
    }, 300);
  }, []);

  const prevCard = useCallback(() => {
    setFlyDirection("left");
    setIsFlying(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
      setIsFlying(false);
    }, 300);
  }, []);

  const visibleCards = 5; // Show more cards to create the pile effect
  const getCardIndex = (offset: number) => {
    return (currentIndex + offset + quotes.length) % quotes.length;
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden py-20">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side content */}
        <div className="space-y-6 text-white overflow-hidden relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
              <span className="text-sm font-medium">
                Trusted by eaters everywhere
              </span>
            </div>
            <Heading className="text-5xl lg:text-5xl font-bold leading-tight text-white">
              Don&apos;t take our word for it
            </Heading>
            <Paragraph className="text-lg text-white/90 max-w-md">
              See what our users have to say about their experience with our
              platform.
            </Paragraph>
            <Link
              href="/list-your-restaurant"
              className={buttonVariants({ variant: "secondary" })}
            >
              Upgrade your Menu
            </Link>
          </div>
        </div>

        {/* Right side - Card Stack */}
        <div className="relative h-[400px] flex items-center justify-center">
          <div className="relative w-full max-w-md h-[200px]">
            {Array.from({ length: visibleCards }, (_, offset) => {
              const cardIndex = getCardIndex(offset);
              const quote = quotes[cardIndex];
              const isTop = offset === 0;
              const isSecond = offset === 1;
              const isThird = offset === 2;
              const isFourth = offset === 3;
              const isBottom = offset === 4;

              // Calculate positioning for stack effect
              const getCardStyle = () => {
                if (isTop) {
                  const flyTransform =
                    flyDirection === "right"
                      ? "translateY(-100px) translateX(100px) scale(0.8) rotate(15deg)"
                      : "translateY(-100px) translateX(-100px) scale(0.8) rotate(-15deg)";

                  return {
                    transform: isFlying
                      ? flyTransform
                      : "translateY(0px) scale(1) rotate(0deg)",
                    filter: "brightness(1)",
                    zIndex: 50,
                    opacity: isFlying ? 0 : 1,
                  };
                } else if (isSecond) {
                  return {
                    transform:
                      "translateY(-15px) translateX(8px) scale(0.95) rotate(2deg)",
                    filter: "brightness(0.95)",
                    zIndex: 40,
                  };
                } else if (isThird) {
                  return {
                    transform:
                      "translateY(-30px) translateX(-16px) scale(0.9) rotate(-4deg)",
                    filter: "brightness(0.9)",
                    zIndex: 30,
                  };
                } else if (isFourth) {
                  return {
                    transform:
                      "translateY(-45px) translateX(24px) scale(0.85) rotate(6deg)",
                    filter: "brightness(0.8)",
                    zIndex: 20,
                  };
                } else if (isBottom) {
                  return {
                    transform:
                      "translateY(-60px) translateX(-32px) scale(0.8) rotate(-8deg)",
                    filter: "brightness(0.75)",
                    zIndex: 10,
                  };
                }
              };

              return (
                <div
                  key={quote.id} // Use stable quote ID instead of changing key
                  className="absolute inset-0 transition-all duration-300 ease-out"
                  style={getCardStyle()}
                >
                  <div className="relative group w-full h-full">
                    {/* Quote Card */}
                    <div className="w-full bg-white backdrop-blur-sm rounded-2xl border border-white/20 p-6 h-full flex flex-col justify-between shadow-lg">
                      {/* Quote icon */}
                      <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-orange-300 to-primary rounded-full flex items-center justify-center shadow-lg">
                        <Quote className="w-5 h-5 text-white" />
                      </div>

                      {/* Quote text */}
                      <p className="text-gray-800 text-base mb-4 leading-relaxed font-medium mt-2">
                        &quot;{quote.review}&quot;
                      </p>

                      {/* Author and location */}
                      <div className="flex items-center justify-between mt-auto">
                        <div>
                          {quote.name && (
                            <p className="text-gray-900 font-semibold text-base">
                              {quote.name}
                            </p>
                          )}
                          <div className="text-gray-600 text-sm flex items-center mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {quote.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Navigation buttons */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
              <button
                onClick={prevCard}
                disabled={isFlying}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Dots indicator */}
              <div className="flex space-x-2">
                {quotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    disabled={isFlying}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? "bg-white" : "bg-white/40"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                ))}
              </div>

              <button
                onClick={nextCard}
                disabled={isFlying}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent"></div>
    </div>
  );
}
