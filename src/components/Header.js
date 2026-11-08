"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import Icon from "./Icon";
import { navLinks, services, company } from "@/lib/site";

// Shows the top bar and main menu, including a dropdown for services and a phone-friendly menu.
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-navy-900/10 bg-white/95 backdrop-blur">
      <div className="hidden bg-navy-900 text-xs text-sky-300 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-2">
          <span className="flex items-center gap-2">
            <Icon name="pin" className="h-3.5 w-3.5" /> Menara MTH, 15th Floor, Tebet, Jakarta Selatan
          </span>
          <span className="flex items-center gap-4">
            {company.phones.map((p) => (
              <a key={p.href} href={p.href} className="flex items-center gap-1.5 hover:text-white">
                <Icon name="phone" className="h-3.5 w-3.5" /> {p.label}
              </a>
            ))}
          </span>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" aria-label="PT Integra Daya Solusi home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((l) => (
            <div key={l.href} className="group relative">
              <Link
                href={l.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-navy-500 ${
                  isActive(l.href) ? "text-navy-600" : "text-ink"
                }`}
              >
                {l.label}
              </Link>
              {l.children && (
                <div className="invisible absolute left-0 top-full w-72 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="rounded-lg border border-navy-900/10 bg-white py-2 shadow-xl">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} className="block px-4 py-2 text-sm text-ink hover:bg-ice-50 hover:text-navy-600">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-navy-900 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>

      {open && (
        <nav className="max-h-[75vh] overflow-y-auto border-t border-navy-900/10 bg-white px-5 pb-5 lg:hidden" aria-label="Mobile">
          {navLinks.map((l) => (
            <div key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)} className="block border-b border-navy-900/5 py-3 text-base font-medium text-ink">
                {l.label}
              </Link>
              {l.children &&
                services.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setOpen(false)} className="block py-2 pl-4 text-sm text-muted">
                    {s.title}
                  </Link>
                ))}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
