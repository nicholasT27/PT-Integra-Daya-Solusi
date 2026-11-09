"use client";

import { usePathname } from "next/navigation";

// Hides its content on certain pages (used so a design concept can bring its own menu and footer).
export default function HideOn({ paths, children }) {
  const pathname = usePathname();
  if (paths.some((p) => pathname.startsWith(p))) return null;
  return children;
}
