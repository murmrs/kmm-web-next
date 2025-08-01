"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { LocationResult } from "@/types/location-result";
import {
  Clock,
  CreditCard,
  DollarSign,
  Globe,
  Info,
  MapPin,
  Menu as MenuIcon,
  MoveLeft,
  Phone,
  Shirt,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import { Button } from "../ui/button";
import Link from "next/link";
import { env } from "@/env";

const formatTime = (hour: number, minute: number) => {
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

const dayNames: Record<
  "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat",
  string
> = {
  sun: "Sunday",
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
};

const paymentCardIcons = {
  Visa: "💳",
  MasterCard: "💳",
  "American Express": "💳",
  Discover: "💳",
  Cash: "💵",
};

export default function Details({
  className,
  location,
  displayBackButton = false,
}: {
  className?: string;
  location?: LocationResult;
  displayBackButton?: boolean;
}) {
  const [restaurant, setRestaurant] = useState<LocationResult | null>(
    location || null
  );
  const [openAccordions, setOpenAccordions] = useState<string[]>([
    "menus",
    "hours",
  ]);

  useEffect(() => {
    console.log(openAccordions);
  }, [openAccordions]);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  if (!restaurant) {
    router.back();
    return null;
  }

  return (
    <div className={cn(className)}>
      {/* <pre>{JSON.stringify(location, null, 2)}</pre> */}
      {/* Hero Section with Image */}
      <div className="relative h-64 md:h-80 lg:h-96">
        {restaurant.image && (
          <Image
            src={restaurant.image.url}
            alt={restaurant.name}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {restaurant.name}
          </h1>
          <div className="flex items-center gap-2 text-sm md:text-base max-w-prose">
            {/* <span className="flex items-center gap-1">
              ⭐ {restaurant.rating}
            </span>
            <span>•</span> */}
            <span>{restaurant.categories.join(", ")}</span>
          </div>
        </div>
        {displayBackButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 z-20 text-white"
            onClick={handleBack}
          >
            <MoveLeft className="size-8" />
          </Button>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Key Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Description */}
          <div className="bg-muted/60 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-3 text-gray-900">About</h2>
            <p className="text-gray-700 leading-relaxed">
              {restaurant.description}
            </p>
          </div>

          {/* Contact & Address */}
          <div className="bg-muted/60 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-3 text-gray-900">
              Contact & Location
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 font-medium">
                    {restaurant.address1}
                  </p>
                  {restaurant.address2 && (
                    <p className="text-gray-600">{restaurant.address2}</p>
                  )}
                  <p className="text-gray-600">
                    {restaurant.city}, {restaurant.state}{" "}
                    {restaurant.postalCode}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <a
                  href={`tel:${restaurant.phoneNumber}`}
                  className="text-blue-600 hover:underline"
                >
                  {restaurant.phoneNumber}
                </a>
              </div>

              {restaurant.website && (
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <a
                    href={restaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="bg-muted/60 rounded-lg overflow-hidden">
          <Accordion
            type="multiple"
            className="w-full"
            onValueChange={setOpenAccordions}
            value={openAccordions}
          >
            {/* Menus Section */}
            <AccordionItem value="menus">
              <AccordionTrigger className="px-6 py-4 text-left">
                <div className="flex items-center gap-3">
                  <MenuIcon className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-900">Menus</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pt-3 bg-white">
                <div className="space-y-3">
                  {restaurant.menus.map(
                    (menu: {
                      id: number;
                      name: string;
                      isPrimary: boolean;
                    }) => (
                      <div
                        key={menu.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {menu.name}
                          </h4>
                        </div>
                        <Link
                          href={`${env.NEXT_PUBLIC_APP_URL}/menu/${restaurant.id}/${menu.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View Menu →
                        </Link>
                      </div>
                    )
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Hours of Operation */}
            <AccordionItem value="hours">
              <AccordionTrigger className="px-6 py-4 text-left">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-900">
                    Hours of Operation
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pt-3 bg-white">
                <div className="space-y-2">
                  {restaurant.hoursOfOperation.map(
                    (
                      hours: {
                        day:
                          | "sun"
                          | "mon"
                          | "tue"
                          | "wed"
                          | "thu"
                          | "fri"
                          | "sat";
                        open: { hour: number; minute: number };
                        closed: { hour: number; minute: number };
                      },
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <span className="font-medium text-gray-900">
                          {dayNames[hours.day]}
                        </span>
                        <span className="text-gray-600">
                          {formatTime(hours.open.hour, hours.open.minute)} -{" "}
                          {formatTime(hours.closed.hour, hours.closed.minute)}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* About Section */}
            <AccordionItem value="about">
              <AccordionTrigger className="px-6 py-4 text-left">
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-gray-600 text-lg" />
                  <span className="font-semibold text-gray-900">About</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pt-3 bg-white">
                <div className="space-y-4">
                  {/* <p className="text-gray-700 leading-relaxed">
                    {restaurant.description}
                  </p> */}

                  {restaurant.kitchenAttributes.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Kitchen Highlights
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {restaurant.kitchenAttributes.map(
                          (attr: string, index: number) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-sm"
                            >
                              {attr}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {restaurant.needToKnow && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Need to Know
                      </h4>
                      <p className="text-gray-700">{restaurant.needToKnow}</p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Price Range */}
            <AccordionItem value="price">
              <AccordionTrigger className="px-6 py-4 text-left">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-gray-600 text-lg" />
                  <span className="font-semibold text-gray-900">
                    Price Range
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pt-3 bg-white">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">
                      Price Range
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      ${restaurant.priceRangeResponse.min} - $
                      {restaurant.priceRangeResponse.max}
                    </span>
                  </div>

                  {restaurant.gratuity.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Gratuity
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {restaurant.gratuity.map(
                          (tip: string, index: number) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-sm"
                            >
                              {tip}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {restaurant.corkageFee && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">
                        Corkage Fee
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        ${restaurant.corkageFeeAmmount}
                      </span>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Payment Options */}
            <AccordionItem value="payment">
              <AccordionTrigger className="px-6 py-4 text-left">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-900">
                    Payment Options
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pt-3 bg-white">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {restaurant.paymentOptions.map(
                    (payment: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-2xl">
                          {paymentCardIcons[
                            payment as keyof typeof paymentCardIcons
                          ] || "💳"}
                        </span>
                        <span className="font-medium text-gray-900">
                          {payment}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Dress Code */}
            <AccordionItem value="dress" className="border-none">
              <AccordionTrigger className="px-6 py-4 text-left">
                <div className="flex items-center gap-3">
                  <Shirt className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-900">
                    Dress Code
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pt-3 bg-white border-none">
                <div className="space-y-3">
                  {restaurant.dressCode.map((dress: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-2xl">👔</span>
                      <span className="font-medium text-gray-900">{dress}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Parking & Accessibility */}
          {(restaurant.parking.length > 0 ||
            restaurant.accessibility.length > 0) && (
            <div className="bg-muted/60 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Amenities
              </h3>

              {restaurant.parking.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Parking</h4>
                  <div className="space-y-1">
                    {restaurant.parking.map(
                      (parking: string, index: number) => (
                        <p key={index} className="text-gray-600 text-sm">
                          • {parking}
                        </p>
                      )
                    )}
                  </div>
                </div>
              )}

              {restaurant.accessibility.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Accessibility
                  </h4>
                  <div className="space-y-1">
                    {restaurant.accessibility.map(
                      (access: string, index: number) => (
                        <p key={index} className="text-gray-600 text-sm">
                          • {access}
                        </p>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Services & Events */}
          {(restaurant.services.length > 0 || restaurant.events.length > 0) && (
            <div className="bg-muted/60  rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Services & Events
              </h3>

              {restaurant.services.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.services.map(
                      (service: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-sm bg-white"
                        >
                          {service}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              )}

              {restaurant.events.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Events</h4>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.events.map((event: string, index: number) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-sm bg-white"
                      >
                        {event}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
