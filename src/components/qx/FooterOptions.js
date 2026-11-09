"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import FlowLines from "./FlowLines";
import { ArrowButton } from "@/components/quinn/Bits";
import { company, navLinks, services } from "@/lib/site";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Menara+MTH+Jl.+Letjen+M.T.+Haryono+Kav.+23+Tebet+Jakarta+Selatan";

// A small tag in the corner naming each option.
function Tag({ children, dark = false }) {
  return <span className={`absolute left-4 top-4 z-20 rounded-full px-3 py-1 text-xs font-semibold shadow ${dark ? "bg-white text-navy-900" : "bg-navy-900 text-white"}`}>{children}</span>;
}

// A live clock showing the time in Jakarta.
function JakartaTime({ className = "" }) {
  const [t, setT] = useState(null);
  useEffect(() => { const f = () => setT(new Date()); f(); const i = setInterval(f, 1000); return () => clearInterval(i); }, []);
  const time = t ? new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hour12: false }).format(t) : "--:--";
  return <span className={`tabular-nums ${className}`}>{time} <span className="text-xs font-semibold uppercase tracking-widest opacity-60">WIB</span></span>;
}

// A round "back to top" button with the words turning around the arrow.
function ToTop({ dark = true }) {
  return (
    <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" className={`group relative flex h-28 w-28 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105 ${dark ? "bg-white/10 text-white hover:bg-white/15" : "bg-navy-600 text-white"}`}>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" style={{ animation: "qxSpin 18s linear infinite" }} aria-hidden="true">
        <defs><path id="toTopCircle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" /></defs>
        <text fontSize="10.5" fontWeight="700" letterSpacing="2.8" fill="currentColor"><textPath href="#toTopCircle">BACK TO TOP • BACK TO TOP • </textPath></text>
      </svg>
      <span className="relative text-2xl transition-transform duration-300 group-hover:-translate-y-1">↑</span>
    </button>
  );
}

// The columns of links shared by the designs.
function Columns({ light = false }) {
  const head = `text-xs font-semibold uppercase tracking-[0.22em] ${light ? "text-navy-600" : "text-sky-300"}`;
  const link = light ? "text-navy-900/80 hover:text-navy-600" : "text-white/75 hover:text-white";
  return (
    <>
      <div>
        <h3 className={head}>Services</h3>
        <ul className="mt-4 space-y-2.5 text-sm">{services.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className={`transition-colors ${link}`}>{s.title}</Link></li>)}</ul>
      </div>
      <div>
        <h3 className={head}>Company</h3>
        <ul className="mt-4 space-y-2.5 text-sm">{navLinks.filter((l) => l.href !== "/services").map((l) => <li key={l.href}><Link href={l.href} className={`transition-colors ${link}`}>{l.label}</Link></li>)}</ul>
      </div>
    </>
  );
}

// Footer A: the giant slogan is only an outline until your cursor passes over it, where it lights up solid.
export function FooterSpotlight() {
  const ref = useRef(null);
  function move(e) {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--px", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--py", `${e.clientY - r.top}px`);
  }
  const slogan = "text-[13vw] font-bold leading-[0.9] tracking-tight lg:text-[9rem]";
  return (
    <footer ref={ref} onMouseMove={move} onMouseLeave={() => { ref.current.style.setProperty("--px", "-400px"); }} className="relative overflow-hidden bg-navy-950 pb-8 pt-28 text-white">
      <Tag dark>Footer A · Spotlight</Tag>
      <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: "radial-gradient(520px circle at var(--px, -400px) var(--py, -400px), rgba(0,58,242,0.22), transparent 65%)" }} />
      <div className={`${wrap} relative`}>
        <div className="relative">
          <p className={`${slogan} text-transparent`} style={{ WebkitTextStroke: "2px rgba(0,58,242,0.7)" }}>Integrated.<br />Trusted.</p>
          <p aria-hidden="true" className={`${slogan} spot-fill absolute inset-0 text-navy-600`}>Integrated.<br />Trusted.</p>
        </div>
        <div className="mt-16 grid gap-10 border-t border-white/15 pt-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image src="/brand/ids-mark-white.svg" alt="IDS" width={160} height={54} className="w-28" />
            <p className="mt-5 text-sm leading-relaxed text-white/65">{company.tagline}</p>
            <p className="mt-5 text-3xl font-semibold"><JakartaTime /></p>
            <p className="text-xs text-white/50">Jakarta, now</p>
          </div>
          <Columns />
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">Visit &amp; call</h3>
            <address className="mt-4 text-sm not-italic leading-relaxed text-white/75">{company.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
            <p className="mt-4 text-sm">{company.phones.map((p) => <a key={p.href} href={p.href} className="block text-white/90 hover:text-white">{p.label}</a>)}</p>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-between gap-6 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <ToTop />
        </div>
      </div>
    </footer>
  );
}

// Footer B: it keeps the airy look of the page. A glass panel holds a call to action and the links,
// a giant faint logo sits behind, and a ticker of the six services keeps moving along the bottom.
export function FooterGlass() {
  const items = [...services, ...services];
  return (
    <footer className="relative isolate overflow-hidden bg-gradient-to-b from-ice-50 to-ice-100 pt-24 text-navy-900">
      <Tag>Footer B · Light glass</Tag>
      <span className="drift absolute -right-24 top-0 -z-10 h-[420px] w-[420px] rounded-full bg-navy-600/20 blur-3xl" />
      <span className="drift absolute -left-24 bottom-0 -z-10 h-[360px] w-[360px] rounded-full bg-sky-300/60 blur-3xl" style={{ animationDelay: "-7s" }} />
      <FlowLines className="-z-10" color="#003af2" opacity={0.25} />
      <Image src="/brand/ids-mark-blue.svg" alt="" width={900} height={306} aria-hidden="true" className="pointer-events-none absolute -bottom-10 left-1/2 -z-10 w-[1000px] max-w-none -translate-x-1/2 opacity-[0.06]" />
      <div className={wrap}>
        <div className="rounded-[2rem] border border-white bg-white/70 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Image src="/brand/ids-mark-blue.svg" alt="IDS" width={160} height={54} className="w-28" />
              <h2 className="mt-6 text-balance text-4xl font-bold leading-[1.05] sm:text-5xl">Ready to talk? <span className="shine-text">We are a call away.</span></h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{company.tagline}. Menara MTH, Tebet, Jakarta Selatan.</p>
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <ArrowButton href="/contact">Contact us</ArrowButton>
                <span className="text-sm text-muted">{company.phones.map((p, i) => <a key={p.href} href={p.href} className="font-semibold text-navy-900 hover:text-navy-600">{i ? " · " : ""}{p.label}</a>)}</span>
              </div>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7"><Columns light /></div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 pb-8 text-xs text-muted">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-navy-600" /> Jakarta · <JakartaTime className="font-semibold text-navy-900" /></p>
        </div>
      </div>
      <div className="overflow-hidden border-t border-navy-900/10 bg-navy-600 py-4 text-white">
        <div className="marquee flex gap-10 text-xs font-semibold uppercase tracking-[0.2em]" style={{ animationDuration: "40s" }}>
          {[...items, ...items].map((s, i) => <span key={i} className="flex items-center gap-10"><Icon name={s.icon} className="h-4 w-4" /> {s.title} <span className="text-sky-300">◆</span></span>)}
        </div>
      </div>
    </footer>
  );
}

// Footer C: built around the Jakarta office. A pulsing map pin, the full address and a "Get directions" button
// lead, with the links beside them and a smaller slogan below.
export function FooterVisit() {
  return (
    <footer className="relative isolate overflow-hidden bg-navy-950 pt-24 text-white">
      <Tag dark>Footer C · Visit us</Tag>
      <FlowLines className="-z-10" color="#ffffff" opacity={0.12} />
      <span className="absolute -left-20 top-10 -z-10 h-80 w-80 rounded-full bg-navy-600/30 blur-3xl" />
      <div className={wrap}>
        <div className="grid items-stretch gap-6 lg:grid-cols-12">
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-[2rem] bg-navy-900 p-8 ring-1 ring-white/10 transition-all duration-300 hover:ring-sky-300/50 sm:p-10 lg:col-span-6">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(169,191,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(169,191,255,0.25) 1px, transparent 1px)", backgroundSize: "36px 36px", maskImage: "radial-gradient(circle at 88% 20%, black, transparent 70%)", WebkitMaskImage: "radial-gradient(circle at 88% 20%, black, transparent 70%)" }} />
            <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true"><path d="M0 150 C 80 120, 120 160, 200 110 S 280 60, 300 70" stroke="#a9bfff" strokeOpacity="0.35" strokeWidth="3" /><path d="M120 0 C 130 60, 170 90, 175 200" stroke="#a9bfff" strokeOpacity="0.25" strokeWidth="2" /></svg>
            <span className="absolute right-[9%] top-[13%] flex h-4 w-4"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300/70" /><span className="relative inline-flex h-4 w-4 rounded-full bg-navy-600 ring-4 ring-white" /></span>
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">Visit us</p>
              <address className="mt-4 text-xl font-semibold not-italic leading-snug sm:text-2xl">{company.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
              <span className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-900 transition-transform duration-300 group-hover:translate-x-1">Get directions →</span>
            </div>
          </a>
          <div className="flex flex-col justify-between rounded-[2rem] bg-navy-600 p-8 sm:p-10 lg:col-span-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">Call us</p>
              <p className="mt-4 space-y-1 text-3xl font-semibold sm:text-4xl">{company.phones.map((p) => <a key={p.href} href={p.href} className="block hover:text-sky-200">{p.label}</a>)}</p>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <ArrowButton href="/contact" tone="white">Send a message</ArrowButton>
              <p className="text-sm text-white/80">Jakarta · <JakartaTime className="font-semibold text-white" /></p>
            </div>
          </div>
        </div>
        <div className="mt-14 grid gap-10 border-t border-white/15 pt-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Image src="/brand/ids-mark-white.svg" alt="IDS" width={160} height={54} className="w-28" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">{company.tagline}</p>
          </div>
          <Columns />
        </div>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 pb-8">
          <p className="text-5xl font-bold leading-none tracking-tight text-navy-600 sm:text-6xl">Integrated. Trusted.</p>
          <p className="text-xs text-white/50">© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
