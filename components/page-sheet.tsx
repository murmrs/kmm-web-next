"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function PageSheet({
  children,
  hideCloseButton = false,
}: {
  children: React.ReactNode;
  hideCloseButton?: boolean;
}) {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const handleOnOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        router.back();
      }
    },
    [router],
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
