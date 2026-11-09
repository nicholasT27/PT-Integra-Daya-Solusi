import Image from "next/image";
import Link from "next/link";
import { company, navLinks, services } from "@/lib/site";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";

// The bottom of every page: the company, the services, the pages and how to reach us, on a dark navy panel with rounded top corners.
// It sits above the home page's soft background (relative z-10) so the background never paints over it.
export default function QxFooter() {
  const head = "text-xs font-semibold uppercase tracking-[0.2em] text-sky-300";
  const link = "text-white/75 transition-colors hover:text-white";
  return (
    <footer className="relative z-10 rounded-t-[2.5rem] bg-navy-950 pt-16 text-white shadow-[0_-30px_60px_-30px_rgba(0,32,112,0.35)]">
      <div className={`${wrap} grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4`}>
        <div>
          <Image src="/brand/ids-mark-white.svg" alt="PT Integra Daya Solusi" width={160} height={54} className="w-24" />
          <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-white/65">{company.tagline}</p>
        </div>
        <div>
          <h3 className={head}>Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className={link}>{s.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className={head}>Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.filter((l) => l.href !== "/services").map((l) => <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className={head}>Contact</h3>
          <address className="mt-4 text-sm not-italic leading-relaxed text-white/75">
            {company.addressLines.map((l) => <span key={l} className="block">{l}</span>)}
          </address>
          <p className="mt-4 text-sm text-white/90">
            {company.phones.map((p) => <a key={p.href} href={p.href} className="block hover:underline">{p.label}</a>)}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <p className={`${wrap} text-xs text-white/50`}>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
