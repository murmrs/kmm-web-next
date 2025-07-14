"use client";
import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "./search-bar";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const HeaderV2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header
      className={cn(
        "px-12 bg-muted/30 flex items-center py-4 border-b border-border gap-12 relative z-20"
        // "bg-transparent border-b-0"
        // "[&]:supports-[backdrop-filter]:backdrop-blur-md"
      )}
    >
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="/kmm-logo.svg"
            alt="Know My Menu"
            width={100}
            height={100}
          />
        </Link>
      </div>
      <div className="flex-1">
        <div className="max-w-3xl mx-auto">
          <SearchBar condensed={true} />
        </div>
      </div>
      <div>
        <Link
          href="/restaurants"
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
                      hover:text-primary hover:bg-muted
                      focus:outline-none focus:ring-2 focus:ring-primary/40
                      data-[active=true]:text-primary data-[active=true]:bg-muted
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

export default HeaderV2;
