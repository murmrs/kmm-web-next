"use client";

import Paragraph from "@/components/typography/paragraph";
import { useState } from "react";

interface Faq {
  question: string;
  answer: string | React.ReactNode;
}

export function Faqs({
  faqs,
  openItems,
  openAll,
}: {
  faqs: Faq[];
  openItems?: number[];
  openAll?: boolean;
}) {
  const [items, setItems] = useState<number[]>(openItems || []);

  return (
    <div className="w-full">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border-b last:border-b-0">
          <details
            className="group py-4 transition-colors"
            open={items.includes(idx) || openAll}
            onToggle={() => {
              if (openAll) {
                setItems([idx]);
              } else {
                setItems((prev) => [...prev, idx]);
              }
            }}
          >
            <summary className="flex items-center cursor-pointer list-none outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
              <span className="mr-2 flex-shrink-0 transition-transform group-open:rotate-90">
                {/* Chevron indicator */}
                <svg
                  className="w-4 h-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="font-medium text-base">{faq.question}</span>
            </summary>
            <div className="mt-2 text-muted-foreground pl-6">
              {typeof faq.answer === "string" ? (
                <Paragraph>{faq.answer}</Paragraph>
              ) : (
                faq.answer
              )}
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}
