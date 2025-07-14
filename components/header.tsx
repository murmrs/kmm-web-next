"use client";

import { useState } from "react";
import Link from "next/link";
import { Filter, Menu, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchBar } from "./search-bar";
import Image from "next/image";

interface HeaderProps {
  searchIntroText?: string;
  condensed?: boolean;
  className?: string;
}

export function Header({
  searchIntroText,
  condensed = false,
  className,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "relative top-0 z-50 w-full",
        condensed && "mb-12",
        className
        // !condensed && "min-h-[500px]"
      )}
    >
      {!condensed && (
        <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
          <Image
            src="/hero.jpg"
            alt="Logo"
            fill
            className="object-cover object-[center_40%]"
            style={{ clipPath: "url(#header-blob-clip)" }}
            priority
          />
          <svg
            width="0"
            height="0"
            style={{ position: "absolute" }}
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <clipPath id="header-blob-clip" clipPathUnits="objectBoundingBox">
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
        </div>
      )}
      <div className="grid grid-cols-[max-content_1fr_max-content] items-start">
        {/* Logo */}
        <div className={cn("flex", condensed && "my-auto")}>
          <Link href="/" className="flex items-center">
            <Image
              src={
                // condensed
                // ? "/kmm-tagline-orange.svg"
                // :
                "/kmm-logo-tagline-orange.svg"
              }
              // className={cn(condensed && "h-14")}
              alt="Know My Menu Logo"
              width={300}
              height={80}
            />
            <span className="sr-only">Know My Menu - For People Who Eat</span>
          </Link>
        </div>

        {/* Search Bar */}

        <div className="w-full px-8 py-4 flex gap-4">
          <SearchBar
            className={cn("", !condensed && "mx-auto")}
            condensed={condensed}
            introText={searchIntroText}
          />
        </div>
        {/* Navigation */}
        <div
          className={cn("flex items-center justify-end space-x-2 pr-10 pt-5")}
        >
          {/* <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            aria-label="User menu"
          >
            <User className="h-5 w-5 text-white" />
          </Button> */}
          <Button variant="ghost" className="dark text-foreground">
            List your Restaurant
          </Button>
        </div>
      </div>
    </header>
  );
}
