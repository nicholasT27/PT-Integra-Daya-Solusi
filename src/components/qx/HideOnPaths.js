"use client";

import { usePathname } from "next/navigation";

// Hides its content on certain pages. Used so a design preview page can show its own footers instead of the usual one.
export default function HideOnPaths({ paths, children }) {
  const pathname = usePathname();
  return paths.some((p) => pathname.startsWith(p)) ? null : children;
}
