"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { company, navLinks } from "@/lib/site";

// The pages shown as links in the bar. Contact has its own button.
const links = navLinks.filter((l) => l.href !== "/contact");

// True for the link that matches the page being shown.
const isCurrent = (href, path) => (href === "/" ? path === "/" : path.startsWith(href));

// The solid "Contact us" button: always clearly a button, in the brand blue.
function ContactButton() {
  return (
    <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-navy-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-navy-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-700">
      Contact us <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

// The full-screen menu opened by the Menu button on phones and tablets: big numbered links, plus the address and phone numbers.
function Overlay({ open, close, path }) {
  return (
    <div className={`fixed inset-0 z-40 overflow-y-auto bg-navy-950 text-white transition-all duration-500 ${open ? "visible opacity-100" : "invisible opacity-0"}`} aria-hidden={!open}>
      <div className="mx-auto grid min-h-full max-w-6xl gap-10 px-5 pb-12 pt-28 sm:px-8 lg:grid-cols-12">
        <nav className="lg:col-span-7" aria-label="Full menu">
          {navLinks.map((l, i) => (
            <Link key={l.href} href={l.href} onClick={close} tabIndex={open ? 0 : -1} className="group flex items-baseline gap-5 border-b border-white/10 py-3">
              <span className="w-6 text-sm font-semibold text-sky-300">0{i + 1}</span>
              <span className={`text-4xl font-bold transition-all duration-300 group-hover:translate-x-3 sm:text-5xl ${isCurrent(l.href, path) ? "text-sky-300" : ""}`}>{l.label}</span>
            </Link>
          ))}
        </nav>
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Visit &amp; call</p>
          <address className="mt-4 text-sm not-italic leading-relaxed text-white/75">{company.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
          <p className="mt-5 text-xl font-semibold">{company.phones.map((p) => <a key={p.href} href={p.href} className="block hover:text-sky-300">{p.label}</a>)}</p>
        </div>
      </div>
    </div>
  );
}

// The top menu: a full-width frosted bar. It is tall and airy at the top of the page and becomes slimmer with a thin
// line underneath once you scroll. The current page has an underline, and the others get one when you point at them.
// On smaller screens the links move into a full-screen menu opened by the Menu button.
export default function QxHeader() {
  const path = usePathname();
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

  // While the full-screen menu is open the bar turns clear, so the logo and Close button sit directly on the navy menu.
  const barStyle = open ? "border-transparent bg-transparent py-5" : scrolled ? "border-navy-900/10 bg-white/90 py-2.5 shadow-sm backdrop-blur-xl" : "border-transparent bg-white/55 py-5 backdrop-blur-xl";

  return (
    <>
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${barStyle}`}>
      <div className="relative z-50 mx-auto flex w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" onClick={() => setOpen(false)} aria-label="Home"><Logo light={open} /></Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`group relative py-1 text-sm font-semibold transition-colors ${isCurrent(l.href, path) ? "text-navy-600" : "text-navy-900 hover:text-navy-600"}`}>
              {l.label}
              <span className={`absolute inset-x-0 -bottom-1 h-[2px] origin-left rounded-full bg-navy-600 transition-transform duration-300 group-hover:scale-x-100 ${isCurrent(l.href, path) ? "scale-x-100" : "scale-x-0"}`} />
            </Link>
          ))}
          <ContactButton />
        </nav>
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors lg:hidden ${open ? "bg-white text-navy-900" : "bg-navy-900 text-white hover:bg-navy-700"}`}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
    {/* The menu sits outside the bar, because the bar's frosted effect would otherwise make it only as big as the bar. */}
    <Overlay open={open} close={() => setOpen(false)} path={path} />
    </>
  );
}
