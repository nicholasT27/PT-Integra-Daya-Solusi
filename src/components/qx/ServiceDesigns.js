"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import { Container, Section, Glass } from "@/components/Ui";
import { Reveal } from "@/components/quinn/Interactive";
import { ArrowButton } from "@/components/quinn/Bits";
import { services, servicePhotos } from "@/lib/site";

// A service's photo, filling its parent. It is only ever shown near its real size, so it stays sharp.
function Pic({ slug, sizes = "420px", className = "" }) {
  const p = servicePhotos[slug];
  return <Image src={p.src} alt="" fill unoptimized sizes={sizes} className={`object-cover ${className}`} style={{ objectPosition: p.pos, transform: `scale(${p.zoom})`, transformOrigin: p.pos }} />;
}

// Design 1: a grid of cards. Each has its photo on top, an icon badge on the edge, the title and a short line.
export function ServicesCards() {
  return (
    <Section>
      <Container className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 3) * 100} className="h-full">
            <Link href={`/services/${s.slug}`} className="group block h-full">
              <Glass className="h-full overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-white group-hover:shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <span className="absolute inset-0 block transition-transform duration-700 group-hover:scale-110"><Pic slug={s.slug} /></span>
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-navy-600">0{i + 1}</span>
                </div>
                <div className="relative p-7 pt-9">
                  <span className="absolute -top-7 left-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-600 text-white shadow-xl transition-transform duration-300 group-hover:rotate-6"><Icon name={s.icon} className="h-7 w-7" /></span>
                  <h2 className="text-2xl font-bold leading-tight text-navy-900">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-600">View details <span className="transition-transform duration-300 group-hover:translate-x-2">→</span></span>
                </div>
              </Glass>
            </Link>
          </Reveal>
        ))}
      </Container>
    </Section>
  );
}

// Design 2: one service per row, with a large photo on one side and the details on the other. The sides alternate.
export function ServicesRows() {
  return (
    <Section>
      <Container className="space-y-24">
        {services.map((s, i) => (
          <div key={s.slug} className="grid items-center gap-10 lg:grid-cols-12">
            <Reveal className={`lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
              <Link href={`/services/${s.slug}`} className="group relative block">
                <span className={`absolute -bottom-4 ${i % 2 ? "-left-4" : "-right-4"} hidden h-full w-full rounded-[2rem] border border-navy-600/30 sm:block`} />
                <div className={`relative aspect-[5/4] overflow-hidden shadow-2xl ring-4 ring-white ${i % 2 ? "rounded-[2rem] rounded-tr-[7rem]" : "rounded-[2rem] rounded-tl-[7rem]"}`}>
                  <span className="absolute inset-0 block transition-transform duration-700 group-hover:scale-105"><Pic slug={s.slug} sizes="520px" /></span>
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-900/25 to-transparent" />
                </div>
                <span className={`float absolute -bottom-6 ${i % 2 ? "right-6" : "left-6"} flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-600 text-white shadow-xl`}><Icon name={s.icon} className="h-8 w-8" /></span>
              </Link>
            </Reveal>
            <Reveal delay={150} className="lg:col-span-6">
              <span className="text-7xl font-bold leading-none text-transparent" style={{ WebkitTextStroke: "2px rgba(0,58,242,0.3)" }}>0{i + 1}</span>
              <h2 className="mt-2 text-balance text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">{s.title}</h2>
              <p className="mt-4 max-w-lg leading-relaxed text-muted">{s.intro}</p>
              <ul className="mt-5 space-y-2 text-sm text-navy-900">{s.offerings.slice(0, 3).map((o) => <li key={o} className="flex gap-3"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-navy-600" />{o}</li>)}</ul>
              <div className="mt-7"><ArrowButton href={`/services/${s.slug}`}>View details</ArrowButton></div>
            </Reveal>
          </div>
        ))}
      </Container>
    </Section>
  );
}

// Design 3: six photo panels side by side. Point at one (or tap it) and it opens wide with its details, while the others slim down.
export function ServicesPanels() {
  const [a, setA] = useState(0);
  return (
    <Section>
      <Container>
        <div className="flex h-[1000px] flex-col gap-3 md:h-[600px] md:flex-row">
          {services.map((s, i) => {
            const on = a === i;
            return (
              <div key={s.slug} tabIndex={0} onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setA(i)} onFocus={() => setA(i)} onClick={() => setA(i)} className="relative cursor-pointer overflow-hidden rounded-3xl text-white shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-navy-600" style={{ flex: on ? "6 1 0%" : "1 1 0%", transition: "flex 700ms cubic-bezier(0.7, 0, 0.2, 1)" }}>
                <span className="absolute inset-0 block transition-transform duration-700" style={{ transform: on ? "scale(1)" : "scale(1.08)" }}><Pic slug={s.slug} sizes="560px" /></span>
                <span className={`absolute inset-0 transition-opacity duration-500 ${on ? "bg-gradient-to-t from-navy-950/85 via-navy-900/20 to-transparent" : "bg-navy-900/55"}`} />
                <div className={`absolute inset-0 flex items-center gap-4 px-5 transition-opacity duration-300 md:flex-col md:justify-between md:px-0 md:py-6 ${on ? "pointer-events-none opacity-0" : "opacity-100 delay-300"}`}>
                  <span className="text-sm font-semibold text-sky-300">0{i + 1}</span>
                  <span className="text-lg font-bold md:rotate-180 md:[writing-mode:vertical-rl]">{s.title.split(" ").slice(0, 2).join(" ")}</span>
                  <span className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/20 md:ml-0"><Icon name={s.icon} className="h-5 w-5" /></span>
                </div>
                <div className={`absolute inset-x-0 bottom-0 p-7 transition-all duration-500 md:w-[480px] md:p-9 ${on ? "translate-y-0 opacity-100 delay-300" : "pointer-events-none translate-y-6 opacity-0"}`}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-600"><Icon name={s.icon} className="h-6 w-6" /></span>
                  <h2 className="mt-4 text-3xl font-bold leading-tight">{s.title}</h2>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/85">{s.short}</p>
                  <Link href={`/services/${s.slug}`} className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-ice-100">View details →</Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

// Design 4: tall photo cards. The title sits on the photo, and pointing at a card slides up its description and what it covers.
export function ServicesTall() {
  return (
    <Section>
      <Container className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 3) * 100}>
            <Link href={`/services/${s.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-3xl text-white shadow-xl">
              <span className="absolute inset-0 block transition-transform duration-700 group-hover:scale-110"><Pic slug={s.slug} sizes="400px" /></span>
              <span className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-900/25 to-transparent transition-colors duration-500 group-hover:from-navy-950/95 group-hover:via-navy-900/60" />
              <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-navy-600"><Icon name={s.icon} /></span>
              <span className="absolute right-5 top-6 text-sm font-semibold text-white/90">0{i + 1}</span>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h2 className="text-2xl font-bold leading-tight">{s.title}</h2>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="pt-3 text-sm leading-relaxed text-white/85">{s.short}</p>
                    <ul className="mt-3 space-y-1.5 text-xs text-white/80">{s.offerings.slice(0, 3).map((o) => <li key={o} className="flex gap-2"><span className="text-sky-300">●</span>{o}</li>)}</ul>
                  </div>
                </div>
                <p className="mt-4 text-sm font-semibold text-sky-300">View details <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span></p>
              </div>
            </Link>
          </Reveal>
        ))}
      </Container>
    </Section>
  );
}
