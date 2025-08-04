"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const words = ["breakfast", "lunch", "dinner", "me"];

// Cookie utility functions
// const getCookie = (name: string): string | null => {
//   if (typeof document === 'undefined') return null;
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
//   return null;
// };

// const setCookie = (name: string, value: string, days: number = 365) => {
//   if (typeof document === 'undefined') return;
//   const expires = new Date();
//   expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
//   document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
// };

export default function HeadingIntroText({
  className,
}: {
  className?: string;
}) {
  // const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // const [currentCharIndex, setCurrentCharIndex] = useState(0);
  // const [isTyping, setIsTyping] = useState(true);
  // const [isBackspacing, setIsBackspacing] = useState(false);
  // const [showCursor, setShowCursor] = useState(true);
  // const [hasSeenAnimation, setHasSeenAnimation] = useState(false);
  // const [isInitialized, setIsInitialized] = useState(false);

  // useEffect(() => {
  //   // Check if user has seen the animation before
  //   const animationSeen = getCookie('heading-animation-seen');
  //   if (animationSeen === 'true') {
  //     setHasSeenAnimation(true);
  //     setCurrentWordIndex(words.length - 1); // Set to last word
  //     setCurrentCharIndex(words[words.length - 1].length); // Show full last word
  //     setIsTyping(false);
  //     setIsBackspacing(false);
  //     setShowCursor(false);
  //   }
  //   setIsInitialized(true);
  // }, []);

  // useEffect(() => {
  //   // Cursor blink effect - only while animation is active
  //   const isAnimationComplete = currentWordIndex === words.length - 1 && !isTyping && !isBackspacing;

  //   if (isAnimationComplete) {
  //     setShowCursor(false);
  //     // Set cookie when animation completes
  //     setCookie('heading-animation-seen', 'true');
  //     return;
  //   }

  //   const cursorInterval = setInterval(() => {
  //     setShowCursor((prev) => !prev);
  //   }, 500);

  //   return () => clearInterval(cursorInterval);
  // }, [currentWordIndex, isTyping, isBackspacing]);

  // useEffect(() => {
  //   // Don't run animation if user has already seen it
  //   if (hasSeenAnimation || !isInitialized) {
  //     return;
  //   }

  //   if (!isTyping && !isBackspacing) {
  //     // Check if we've reached the last word ("me")
  //     if (currentWordIndex === words.length - 1) {
  //       // Stop the entire animation - don't loop back and stop cursor blinking
  //       setShowCursor(false);
  //       return;
  //     }

  //     // Wait before starting to backspace
  //     const timeout = setTimeout(() => {
  //       setIsBackspacing(true);
  //     }, 1000); // Wait 1 second before backspacing

  //     return () => clearTimeout(timeout);
  //   }

  //   if (isBackspacing) {
  //     // Backspace the current word character by character
  //     const backspaceInterval = setInterval(() => {
  //       if (currentCharIndex > 0) {
  //         setCurrentCharIndex((prev) => prev - 1);
  //       } else {
  //         // Finished backspacing, move to next word
  //         setIsBackspacing(false);
  //         setCurrentWordIndex((prev) => prev + 1);
  //         setIsTyping(true);
  //       }
  //     }, 75); // Backspace each character every 100ms

  //     return () => clearInterval(backspaceInterval);
  //   }

  //   if (isTyping) {
  //     // Type the current word character by character
  //     const typingInterval = setInterval(() => {
  //       const currentWord = words[currentWordIndex];

  //       if (currentCharIndex < currentWord.length) {
  //         setCurrentCharIndex((prev) => prev + 1);
  //       } else {
  //         // Finished typing current word
  //         setIsTyping(false);
  //       }
  //     }, 75); // Type each character every 150ms

  //     return () => clearInterval(typingInterval);
  //   }
  // }, [currentWordIndex, currentCharIndex, isTyping, isBackspacing]);

  // const currentWord = words[currentWordIndex];
  // const displayedText = currentWord.slice(0, currentCharIndex);
  // const isLastWord = currentWordIndex === words.length - 1;
  // const punctuation = "?";

  return (
    <h1
      className={cn(
        "text-4xl sm:text-7xl font-semibold text-center leading-tight text-white whitespace-nowrap",
        className,
      )}
    >
      What's for me?
    </h1>
  );
}
