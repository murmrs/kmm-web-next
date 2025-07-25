import { InstantSearchProvider } from "@/providers/instant-search-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Know My Menu",
  description: "Generated by create next app",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen gap-y-12`}
      >
        <InstantSearchProvider>
          {sheet}
          {children}
        </InstantSearchProvider>
      </body>
    </html>
  );
}
