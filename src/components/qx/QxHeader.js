"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";
import { navLinks } from "@/lib/site";

// The top menu for this design: clear over the photo at first, then a white bar with a filled
// "current page" pill once you scroll. On phones it opens a full-screen menu.
export default function QxHeader() {
  const pathname = usePathname();
  const onLight = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const solid = (scrolled || onLight) && !open;
  const links = navLinks;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <div className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-300 ${scrolled && !open ? "bg-white shadow-lg" : "bg-transparent"}`}>
        <Link href="/" onClick={() => setOpen(false)} aria-label="Home"><Logo light={!solid} /></Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) => {
            const current = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
            <Link
              key={l.href}
              href={l.href}
              className={`group flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                current
                  ? solid ? "bg-navy-900 text-white" : "bg-white text-navy-900"
                  : solid ? "text-navy-900 hover:bg-ice-100" : "text-white hover:bg-white/15"
              }`}
            >
              {l.label}
              <Icon name="arrow" className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
            );
          })}
        </nav>
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} className={`rounded-full px-5 py-2 text-sm font-semibold lg:hidden ${solid ? "bg-navy-900 text-white" : "bg-white text-navy-900"}`}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav className="fixed inset-0 -z-10 flex flex-col justify-center gap-2 bg-navy-900 px-8" aria-label="Mobile">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-4xl font-bold text-white">{l.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
