import Link from "next/link";
import Logo from "@/components/Logo";
import { company, navLinks } from "@/lib/site";

// The bottom of this design: a giant slogan, the logo, links and contact details.
export default function QxFooter() {
  return (
    <footer className="relative z-10 bg-navy-950 px-5 pb-8 pt-24 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-[13vw] font-bold leading-[0.9] tracking-tight text-navy-600 lg:text-[9rem]">
          Integrated.<br />Trusted.
        </p>
        <div className="mt-16 grid gap-10 border-t border-white/15 pt-10 md:grid-cols-3">
          <Logo light />
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold" aria-label="Footer">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-sky-300">{l.label}</Link>
            ))}
          </nav>
          <div className="text-sm leading-relaxed text-white/70">
            {company.addressLines.map((l) => <span key={l} className="block">{l}</span>)}
            <span className="mt-3 block">{company.phones.map((p) => p.label).join("  ·  ")}</span>
          </div>
        </div>
        <p className="mt-12 text-xs text-white/50">© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
