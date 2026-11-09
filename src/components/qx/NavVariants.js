"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { company, navLinks } from "@/lib/site";

const links = navLinks.filter((l) => l.href !== "/contact");

// True for the link that matches the page being shown.
const isCurrent = (href, path) => (href === "/" ? path === "/" : path.startsWith(href));

// Whether the page has been scrolled down a little, so the bar can change its look.
function useScrolled() {
  const [s, setS] = useState(false);
  useEffect(() => {
    const on = () => setS(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return s;
}

// The solid "Contact us" button used by all the menus: always clearly a button, in the brand blue.
function ContactButton({ className = "" }) {
  return (
    <span className={className}>
      <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-navy-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-navy-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-700">
        Contact us <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </span>
  );
}

// The full-screen menu opened by the Menu button: big numbered links, plus the phone numbers and address.
function Overlay({ open, close, path }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return (
    <div className={`fixed inset-0 z-40 overflow-y-auto bg-navy-950 text-white transition-all duration-500 ${open ? "visible opacity-100" : "invisible opacity-0"}`} aria-hidden={!open}>
      <div className="mx-auto grid min-h-full max-w-6xl gap-10 px-5 pb-12 pt-32 sm:px-8 lg:grid-cols-12">
        <nav className="lg:col-span-7" aria-label="Full menu">
          {navLinks.map((l, i) => (
            <Link key={l.href} href={l.href} onClick={close} tabIndex={open ? 0 : -1} className="group flex items-baseline gap-5 border-b border-white/10 py-3" style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}>
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

// The "Menu" button used on phones (and everywhere in the minimal design).
function MenuButton({ open, setOpen, className = "" }) {
  return (
    <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} className={`rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 ${open ? "!bg-white !text-navy-900" : ""} ${className}`}>
      {open ? "Close" : "Menu"}
    </button>
  );
}

// Four ideas for the top navigation, picked with the "variant" setting (1 to 4). "current" lets a preview page pretend to be on a given page.
export default function NavBar({ variant = 1, current }) {
  const livePath = usePathname();
  const path = current ?? livePath;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const logoLink = (light = false) => <Link href="/" onClick={() => setOpen(false)} aria-label="Home"><Logo light={light} /></Link>;

  // Idea 1: a frosted glass pill that always has its own background, with a solid Contact button on the right.
  if (variant === 1) {
    return (
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
        <div className={`relative z-50 mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white ${open ? "bg-white" : "bg-white/75"} py-2.5 pl-6 pr-2.5 backdrop-blur-xl transition-shadow duration-300 ${scrolled ? "shadow-xl" : "shadow-md"}`}>
          {logoLink()}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={`relative px-4 py-2 text-sm font-semibold transition-colors ${isCurrent(l.href, path) ? "text-navy-600" : "text-navy-900/80 hover:text-navy-600"}`}>
                {l.label}
                <span className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-navy-600 transition-transform duration-300 ${isCurrent(l.href, path) ? "scale-x-100" : "scale-x-0"}`} />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ContactButton className="hidden lg:block" />
            <MenuButton open={open} setOpen={setOpen} className="lg:hidden" />
          </div>
        </div>
        <Overlay open={open} close={() => setOpen(false)} path={path} />
      </header>
    );
  }

  // Idea 2: an edge-to-edge bar that sits clean and tall at the top, then becomes slimmer with a hairline once you scroll.
  if (variant === 2) {
    return (
      <header className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${scrolled ? "border-navy-900/10 bg-white/90 py-2.5 shadow-sm" : "border-transparent bg-white/55 py-5"}`}>
        <div className="relative z-50 mx-auto flex w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          {logoLink()}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={`group relative py-1 text-sm font-semibold transition-colors ${isCurrent(l.href, path) ? "text-navy-600" : "text-navy-900 hover:text-navy-600"}`}>
                {l.label}
                <span className={`absolute inset-x-0 -bottom-1 h-[2px] origin-left rounded-full bg-navy-600 transition-transform duration-300 group-hover:scale-x-100 ${isCurrent(l.href, path) ? "scale-x-100" : "scale-x-0"}`} />
              </Link>
            ))}
            <ContactButton />
          </nav>
          <MenuButton open={open} setOpen={setOpen} className="lg:hidden" />
        </div>
        <Overlay open={open} close={() => setOpen(false)} path={path} />
      </header>
    );
  }

  // Idea 4: minimal. Only the logo, a Contact button and a Menu button. The full menu opens on every screen size.
  if (variant === 4) {
    return (
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
        <div className={`relative z-50 mx-auto flex max-w-6xl items-center justify-between rounded-full py-2.5 pl-6 pr-2.5 transition-all duration-300 ${open ? "border border-transparent bg-transparent" : scrolled ? "border border-white bg-white/80 shadow-xl backdrop-blur-xl" : "border border-transparent bg-transparent"}`}>
          <Link href="/" onClick={() => setOpen(false)} aria-label="Home"><Logo light={open} /></Link>
          <div className="flex items-center gap-2">
            <ContactButton className="hidden sm:block" />
            <MenuButton open={open} setOpen={setOpen} />
          </div>
        </div>
        <Overlay open={open} close={() => setOpen(false)} path={path} />
      </header>
    );
  }

  return <SlidingDock path={path} scrolled={scrolled} open={open} setOpen={setOpen} logoLink={logoLink} />;
}

// Idea 3: the logo in a round badge, a pill of links whose highlight glides to the link you point at, and a separate Contact button.
function SlidingDock({ path, scrolled, open, setOpen, logoLink }) {
  const box = useRef(null);
  const refs = useRef([]);
  const [hl, setHl] = useState(null);
  const [lit, setLit] = useState(-1);
  const activeIndex = links.findIndex((l) => isCurrent(l.href, path));

  // Slides the dark highlight under link number i (or hides it when there is none).
  function moveTo(i) {
    const el = refs.current[i];
    if (!el || !box.current) { setHl(null); setLit(-1); return; }
    const b = box.current.getBoundingClientRect(), r = el.getBoundingClientRect();
    setHl({ left: r.left - b.left, width: r.width });
    setLit(i);
  }
  useEffect(() => { moveTo(activeIndex); }, [activeIndex, path]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <div className="relative z-50 mx-auto flex max-w-6xl items-center justify-between gap-3">
        <span className={`rounded-full border border-white bg-white/80 px-5 py-3 backdrop-blur-xl transition-shadow duration-300 ${scrolled ? "shadow-xl" : "shadow-md"}`}>{logoLink()}</span>
        <nav ref={box} onMouseLeave={() => moveTo(activeIndex)} className={`relative hidden items-center rounded-full border border-white bg-white/80 p-1.5 backdrop-blur-xl transition-shadow duration-300 lg:flex ${scrolled ? "shadow-xl" : "shadow-md"}`} aria-label="Main">
          {hl && <span className="pointer-events-none absolute top-1.5 h-[calc(100%-0.75rem)] rounded-full bg-navy-900 transition-all duration-300 ease-[cubic-bezier(0.7,0,0.2,1)]" style={{ left: hl.left, width: hl.width }} />}
          {links.map((l, i) => (
            <Link key={l.href} href={l.href} ref={(el) => (refs.current[i] = el)} onMouseEnter={() => moveTo(i)} onFocus={() => moveTo(i)} className={`relative z-10 px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${lit === i ? "text-white" : "text-navy-900"}`}>{l.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ContactButton className="hidden lg:block" />
          <MenuButton open={open} setOpen={setOpen} className="lg:hidden" />
        </div>
      </div>
      <Overlay open={open} close={() => setOpen(false)} path={path} />
    </header>
  );
}
