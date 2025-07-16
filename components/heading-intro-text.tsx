"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const words = ["breakfast", "lunch", "dinner", "me"];

export default function HeadingIntroText({
  className,
}: {
  className?: string;
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isBackspacing, setIsBackspacing] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (!isTyping && !isBackspacing) {
      // Check if we've reached the last word ("me")
      if (currentWordIndex === words.length - 1) {
        // Stop the cycle - don't loop back
        return;
      }

      // Wait before starting to backspace
      const timeout = setTimeout(() => {
        setIsBackspacing(true);
      }, 1000); // Wait 1 second before backspacing

      return () => clearTimeout(timeout);
    }

    if (isBackspacing) {
      // Backspace the current word character by character
      const backspaceInterval = setInterval(() => {
        if (currentCharIndex > 0) {
          setCurrentCharIndex((prev) => prev - 1);
        } else {
          // Finished backspacing, move to next word
          setIsBackspacing(false);
          setCurrentWordIndex((prev) => prev + 1);
          setIsTyping(true);
        }
      }, 75); // Backspace each character every 100ms

      return () => clearInterval(backspaceInterval);
    }

    if (isTyping) {
      // Type the current word character by character
      const typingInterval = setInterval(() => {
        const currentWord = words[currentWordIndex];

        if (currentCharIndex < currentWord.length) {
          setCurrentCharIndex((prev) => prev + 1);
        } else {
          // Finished typing current word
          setIsTyping(false);
        }
      }, 75); // Type each character every 150ms

      return () => clearInterval(typingInterval);
    }
  }, [currentWordIndex, currentCharIndex, isTyping, isBackspacing]);

  const currentWord = words[currentWordIndex];
  const displayedText = currentWord.slice(0, currentCharIndex);
  const isLastWord = currentWordIndex === words.length - 1;
  const punctuation = "?";

  return (
    <h1
      className={cn(
        "text-4xl sm:text-7xl font-semibold text-center leading-tight text-white whitespace-nowrap",
        className
      )}
    >
      What's for{" "}
      <span className="text-left">
        {displayedText}
        {showCursor && (isTyping || isBackspacing) && (
          <span className="animate-pulse">|</span>
        )}
        {!isTyping && !isBackspacing && punctuation}
      </span>
    </h1>
  );
}
