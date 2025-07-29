"use client";
import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "./search-bar";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const Header = ({
  showSearchBar = true,
  expanded = false,
  centerComponent,
  className,
  backgroundImage,
}: {
  showSearchBar?: boolean;
  expanded?: boolean;
  centerComponent?: React.ReactNode;
  className?: string;
  backgroundImage?: string;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const Center = () => {
    if (centerComponent) {
      return centerComponent;
    }

    if (!showSearchBar) return null;

    return (
      <div className="flex-1">
        <div className="max-w-3xl mx-auto">
          <SearchBar condensed={true} />
        </div>
      </div>
    );
  };

  return (
    <header
      className={cn(
        "px-12 bg-muted/30 flex items-center justify-between py-4 border-b border-border gap-12 z-20 relative ",
        centerComponent && "items-start",
        backgroundImage &&
          "border-b-0 dark bg-transparent grid grid-cols-1 sm:grid-cols-[200px_1fr_200px]",
        !backgroundImage && "sticky top-0",
        className
        // "bg-transparent border-b-0"
        // "[&]:supports-[backdrop-filter]:backdrop-blur-md"
      )}
    >
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none bg-white"></div>
      {backgroundImage && (
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

      <div className="flex items-center justify-between">
        <Link href="/">
          <Image
            src={
              backgroundImage ? "/kmm-logo-tagline-orange.svg" : "/kmm-logo.svg"
            }
            className={cn(
              backgroundImage && "absolute top-0 left-12 w-52 sm:w-84"
            )}
            alt="Know My Menu"
            width={100}
            height={100}
          />
        </Link>
      </div>

      <Center />

      <div className="hidden sm:block">
        <Link
          href="/list-your-restaurant"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          List your restaurant
        </Link>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full"
              aria-label="Main menu"
            >
              <Menu className="h-5 w-5 " />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="sr-only">Main menu</SheetTitle>
            <nav className="flex flex-col gap-2 pb-4 px-4 w-full min-h-screen pt-10">
              {[
                { href: "/", label: "Home" },
                { href: "/restaurants", label: "Restaurants" },
                { href: "/about", label: "About" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                      text-base font-normal rounded-md px-4 py-3
                      transition-colors
                      text-muted-foreground
                       hover:bg-muted
                      focus:outline-none focus:ring-2 focus:ring-primary/40
                      data-[active=true]:tex-black data-[active=true]:bg-muted
                    `}
                  data-active={
                    typeof window !== "undefined" &&
                    window.location.pathname === item.href
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-6 mt-auto">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                      inline-flex items-center justify-center w-full
                      px-4 py-3 rounded-md
                      bg-primary text-white font-semibold
                      transition-colors
                      hover:bg-primary/90
                      focus:outline-none focus:ring-2 focus:ring-primary/40
                    `}
                >
                  Log In
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>{" "}
      </div>
    </header>
  );
};

export default Header;
