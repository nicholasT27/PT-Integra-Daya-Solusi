import Link from "next/link";
import Logo from "./Logo";
import { company, services, navLinks } from "@/lib/site";

// Shows the bottom of every page: company address, phone numbers and quick links.
export default function Footer() {
  return (
    <footer className="bg-navy-950 text-sky-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-sky-300/80">{company.tagline}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">Services</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-white">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">Company</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.filter((l) => l.href !== "/services").map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">Visit &amp; call</h3>
          <address className="mt-4 text-sm not-italic leading-relaxed">
            {company.addressLines.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </address>
          <p className="mt-4 space-y-1 text-sm">
            {company.phones.map((p) => (
              <a key={p.href} href={p.href} className="block hover:text-white">{p.label}</a>
            ))}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-sky-300/70">
        © {new Date().getFullYear()} {company.name}. All rights reserved.
      </div>
    </footer>
  );
}
