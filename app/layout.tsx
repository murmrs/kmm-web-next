import { InstantSearchProvider } from "@/providers/instant-search-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Know My Menu",
    default: "Know My Menu",
  },
  description: "For people who eat.",
};

export default function RootLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode;
  sheet: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen gap-y-12 sm:gap-y-12`}
      >
        <InstantSearchProvider>
          {sheet}
          {children}
        </InstantSearchProvider>

        <Script
          src="//js.hs-scripts.com/46321310.js"
          id="hs-script-loader"
          async
          defer
        />
      </body>
    </html>
  );
}
