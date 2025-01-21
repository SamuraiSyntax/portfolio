"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // Use 'instant' instead of 'smooth' to avoid visual conflicts with page transitions
    });
  }, [pathname]);

  return null;
}
