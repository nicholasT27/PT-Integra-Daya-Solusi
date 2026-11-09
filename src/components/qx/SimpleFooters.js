import Image from "next/image";
import Link from "next/link";
import { company, navLinks, services } from "@/lib/site";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const year = new Date().getFullYear();

// A small tag in the corner naming each option, so they are easy to refer to.
function Tag({ children, dark = false }) {
  return <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow ${dark ? "bg-white text-navy-900" : "bg-navy-900 text-white"}`}>{children}</span>;
}

// The phone numbers as links, one under the other.
function Phones({ className = "" }) {
  return <p className={className}>{company.phones.map((p) => <a key={p.href} href={p.href} className="block hover:underline">{p.label}</a>)}</p>;
}

// Footer 1: dark navy with four columns: the company, the services, the pages and how to reach us.
export function Footer1() {
  const head = "text-xs font-semibold uppercase tracking-[0.2em] text-sky-300";
  const link = "text-white/75 transition-colors hover:text-white";
  return (
    <footer className="relative bg-navy-950 pt-16 text-white">
      <Tag dark>Footer 1 · Dark, four columns</Tag>
      <div className={`${wrap} grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4`}>
        <div>
          <Image src="/brand/ids-mark-white.svg" alt="PT Integra Daya Solusi" width={160} height={54} className="w-24" />
          <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-white/65">{company.tagline}</p>
        </div>
        <div>
          <h3 className={head}>Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">{services.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className={link}>{s.title}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className={head}>Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">{navLinks.filter((l) => l.href !== "/services").map((l) => <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className={head}>Contact</h3>
          <address className="mt-4 text-sm not-italic leading-relaxed text-white/75">{company.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
          <Phones className="mt-4 text-sm text-white/90" />
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <p className={`${wrap} text-xs text-white/50`}>© {year} {company.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}

// Footer 2: light, on a pale background with a thin top line. Same information, a calmer look.
export function Footer2() {
  const head = "text-xs font-semibold uppercase tracking-[0.2em] text-navy-600";
  const link = "text-navy-900/75 transition-colors hover:text-navy-600";
  return (
    <footer className="relative border-t border-navy-900/10 bg-ice-50 pt-16 text-navy-900">
      <Tag>Footer 2 · Light, four columns</Tag>
      <div className={`${wrap} grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4`}>
        <div>
          <Image src="/brand/ids-mark-blue.svg" alt="PT Integra Daya Solusi" width={160} height={54} className="w-24" />
          <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-muted">{company.tagline}</p>
        </div>
        <div>
          <h3 className={head}>Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">{services.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className={link}>{s.title}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className={head}>Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">{navLinks.filter((l) => l.href !== "/services").map((l) => <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className={head}>Contact</h3>
          <address className="mt-4 text-sm not-italic leading-relaxed text-navy-900/75">{company.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
          <Phones className="mt-4 text-sm font-semibold" />
        </div>
      </div>
      <div className="border-t border-navy-900/10 py-6">
        <p className={`${wrap} text-xs text-muted`}>© {year} {company.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}

// Footer 3: compact. One row with the logo, the page links and the phone numbers, and one row with the address and copyright.
export function Footer3() {
  return (
    <footer className="relative bg-navy-900 py-10 text-white">
      <Tag dark>Footer 3 · Compact two rows</Tag>
      <div className={wrap}>
        <div className="flex flex-col gap-6 pt-4 lg:flex-row lg:items-center lg:justify-between">
          <Image src="/brand/ids-mark-white.svg" alt="PT Integra Daya Solusi" width={160} height={54} className="w-24" />
          <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-white/80">
            {navLinks.map((l) => <Link key={l.href} href={l.href} className="transition-colors hover:text-white">{l.label}</Link>)}
          </nav>
          <p className="text-sm font-semibold">{company.phones.map((p, i) => <a key={p.href} href={p.href} className="hover:underline">{i ? "  ·  " : ""}{p.label}</a>)}</p>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/55 lg:flex-row lg:justify-between">
          <address className="not-italic">{company.addressLines.join(", ")}</address>
          <p>© {year} {company.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Footer 4: centred and minimal. The logo, the page links, the address and the phones, all in the middle.
export function Footer4() {
  return (
    <footer className="relative border-t border-navy-900/10 bg-white py-14 text-center text-navy-900">
      <Tag>Footer 4 · Centred</Tag>
      <div className={`${wrap} flex flex-col items-center`}>
        <Image src="/brand/ids-mark-blue.svg" alt="PT Integra Daya Solusi" width={160} height={54} className="w-24" />
        <p className="mt-3 text-sm text-muted">{company.tagline}</p>
        <nav aria-label="Footer" className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm font-medium">
          {navLinks.map((l) => <Link key={l.href} href={l.href} className="text-navy-900/80 transition-colors hover:text-navy-600">{l.label}</Link>)}
        </nav>
        <address className="mt-7 text-sm not-italic leading-relaxed text-muted">{company.addressLines.join(", ")}</address>
        <p className="mt-2 text-sm font-semibold">{company.phones.map((p, i) => <a key={p.href} href={p.href} className="hover:text-navy-600">{i ? "  ·  " : ""}{p.label}</a>)}</p>
        <p className="mt-8 border-t border-navy-900/10 pt-6 text-xs text-muted">© {year} {company.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
