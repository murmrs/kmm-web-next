"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function PageSheet({
  children,
  hideCloseButton = false,
}: {
  children: React.ReactNode;
  hideCloseButton?: boolean;
}) {
  const [open] = useState(true);
  const router = useRouter();

  const handleOnOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        router.back();
      }
    },
    [router]
  );

  return (
    <Sheet open={open} onOpenChange={handleOnOpenChange}>
      <SheetContent
        side="right"
        className="sm:max-w-3xl"
        hideCloseButton={hideCloseButton}
      >
        <SheetTitle className="sr-only">Main menu</SheetTitle>
        {children}
      </SheetContent>
    </Sheet>
  );
}
