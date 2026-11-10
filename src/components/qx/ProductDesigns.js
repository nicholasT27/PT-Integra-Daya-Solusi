"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container, Section, Glass } from "@/components/Ui";
import { Reveal } from "@/components/quinn/Interactive";
import { ArrowButton } from "@/components/quinn/Bits";
import ProductArt from "./ProductArt";
import { products } from "@/lib/site";

const pad = (i) => `0${i + 1}`;

// Idea 1: three big tabs. Pick a product (or tap it) and the large panel below changes to show it.
export function ProductsTabs() {
  const [a, setA] = useState(0);
  const p = products[a];
  return (
    <Section>
      <Container>
        <div className="flex flex-wrap gap-3" role="tablist" aria-label="Products">
          {products.map((x, i) => (
            <button key={x.slug} type="button" role="tab" aria-selected={a === i} onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setA(i)} onClick={() => setA(i)} className={`flex items-center gap-3 rounded-full border px-5 py-3 text-left text-sm font-bold transition-all duration-300 ${a === i ? "border-navy-600 bg-navy-600 text-white shadow-xl" : "border-navy-900/15 bg-white/70 text-navy-900 hover:border-navy-600"}`}>
              <span className={`text-xs ${a === i ? "text-sky-300" : "text-navy-600"}`}>{pad(i)}</span>{x.title}
            </button>
          ))}
        </div>
        <Glass className="mt-8 overflow-hidden p-6 sm:p-10">
          <div key={a} className="animate-rise grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="text-balance text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">{p.title}</h2>
              <p className="mt-4 max-w-lg leading-relaxed text-muted">{p.intro}</p>
              <ul className="mt-6 space-y-3 text-sm text-navy-900">
                {p.covers.map((c) => <li key={c} className="flex gap-3"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-navy-600" />{c}</li>)}
              </ul>
              <div className="mt-8"><ArrowButton href={`/products/${p.slug}`}>View product</ArrowButton></div>
            </div>
            <div className="relative lg:col-span-6">
              <span className="orbit-slow absolute -right-6 -top-6 h-40 w-40 rounded-full border border-dashed border-navy-600/30" />
              <div className="relative rounded-[2rem] bg-ice-50 p-6 ring-1 ring-white sm:p-8"><ProductArt kind={p.art} className="h-auto w-full" /></div>
            </div>
          </div>
        </Glass>
      </Container>
    </Section>
  );
}

// Idea 2: three tall panels side by side. Point at one (or tap it) and it opens wide with its details while the others slim down.
export function ProductsPanels() {
  const [a, setA] = useState(0);
  const tints = ["bg-navy-600", "bg-navy-900", "bg-navy-800"];
  return (
    <Section>
      <Container>
        <div className="flex h-[1050px] flex-col gap-4 md:h-[560px] md:flex-row">
          {products.map((p, i) => {
            const on = a === i;
            return (
              <div key={p.slug} tabIndex={0} onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setA(i)} onFocus={() => setA(i)} onClick={() => setA(i)} className={`relative cursor-pointer overflow-hidden rounded-3xl text-white shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-navy-600 ${tints[i]}`} style={{ flex: on ? "5 1 0%" : "1 1 0%", transition: "flex 700ms cubic-bezier(0.7, 0, 0.2, 1)" }}>
                <div className={`absolute inset-0 flex items-start justify-center px-6 pt-8 transition-all duration-700 ${on ? "scale-100 opacity-100" : "scale-90 opacity-20"}`}><div className="w-full max-w-[19rem] rounded-3xl bg-white/95 p-4 shadow-xl"><ProductArt kind={p.art} className="h-auto w-full" /></div></div>
                <span className={`absolute inset-0 transition-opacity duration-500 ${on ? "bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent" : "bg-navy-950/40"}`} />
                <div className={`absolute inset-0 flex items-center gap-4 px-6 transition-opacity duration-300 md:flex-col md:justify-between md:px-0 md:py-8 ${on ? "pointer-events-none opacity-0" : "opacity-100 delay-300"}`}>
                  <span className="text-sm font-semibold text-sky-300">{pad(i)}</span>
                  <span className="text-xl font-bold md:rotate-180 md:[writing-mode:vertical-rl]">{p.title}</span>
                  <span className="ml-auto text-2xl text-sky-300 md:ml-0">+</span>
                </div>
                <div className={`absolute inset-x-0 bottom-0 p-7 transition-all duration-500 md:p-9 ${on ? "translate-y-0 opacity-100 delay-300" : "pointer-events-none translate-y-6 opacity-0"}`}>
                  <h2 className="text-3xl font-bold leading-tight">{p.title}</h2>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">{p.short}</p>
                  <Link href={`/products/${p.slug}`} className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-ice-100">View product →</Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

// Idea 3: the picture stays in place on the left while the three products scroll past on the right. The picture changes
// to match the product nearest the middle of the screen. On phones each product shows its own picture instead.
export function ProductsSticky() {
  const refs = useRef([]);
  const [a, setA] = useState(0);
  useEffect(() => {
    function update() {
      const mid = window.innerHeight * 0.5; let best = 0, bd = Infinity;
      refs.current.forEach((el, i) => { if (!el) return; const r = el.getBoundingClientRect(); const d = Math.abs(r.top + r.height / 2 - mid); if (d < bd) { bd = d; best = i; } });
      setA(best);
    }
    update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-28">
            <Glass className="relative overflow-hidden p-10">
              <div className="relative aspect-[4/3]">
                {products.map((p, i) => <div key={p.slug} className="absolute inset-0 transition-all duration-700" style={{ opacity: a === i ? 1 : 0, transform: a === i ? "scale(1)" : "scale(0.92)" }} aria-hidden={a !== i}><ProductArt kind={p.art} className="h-full w-full" /></div>)}
              </div>
              <div className="mt-6 flex items-center justify-between"><span className="text-sm font-semibold text-navy-600">{pad(a)} / 0{products.length}</span><div className="flex gap-2" aria-hidden="true">{products.map((_, i) => <span key={i} className={`h-1.5 rounded-full bg-navy-600 transition-all duration-500 ${a === i ? "w-10" : "w-2 opacity-25"}`} />)}</div></div>
            </Glass>
          </div>
        </div>
        <div className="lg:col-span-6">
          {products.map((p, i) => (
            <div key={p.slug} ref={(el) => (refs.current[i] = el)} className="flex min-h-[70vh] items-center py-8">
              <div className={`transition-all duration-500 ${a === i ? "opacity-100" : "opacity-40 lg:opacity-30"}`}>
                <Glass className="mb-6 p-5 lg:hidden"><ProductArt kind={p.art} className="h-auto w-full" /></Glass>
                <span className="text-7xl font-bold leading-none text-transparent" style={{ WebkitTextStroke: "2px rgba(0,58,242,0.3)" }}>{pad(i)}</span>
                <h2 className="mt-2 text-balance text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">{p.title}</h2>
                <p className="mt-4 max-w-lg leading-relaxed text-muted">{p.intro}</p>
                <ul className="mt-5 space-y-2 text-sm text-navy-900">{p.covers.slice(0, 4).map((c) => <li key={c} className="flex gap-3"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-navy-600" />{c}</li>)}</ul>
                <div className="mt-7"><ArrowButton href={`/products/${p.slug}`}>View product</ArrowButton></div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// Idea 4: three tall feature cards. Each has its picture on top and the title below. Pointing at a card lifts it and
// slides open what it covers (on touch screens that list is always shown).
export function ProductsCards() {
  return (
    <Section>
      <Container className="grid gap-6 lg:grid-cols-3">
        {products.map((p, i) => (
          <Reveal key={p.slug} delay={i * 120} className="h-full">
            <Link href={`/products/${p.slug}`} className="group block h-full">
              <Glass className="flex h-full flex-col overflow-hidden transition-all duration-300 group-hover:-translate-y-3 group-hover:bg-white group-hover:shadow-2xl">
                <div className="relative bg-gradient-to-b from-ice-100 to-white p-8">
                  <span className="absolute left-6 top-5 text-5xl font-bold leading-none text-transparent" style={{ WebkitTextStroke: "2px rgba(0,58,242,0.25)" }}>{pad(i)}</span>
                  <div className="transition-transform duration-700 group-hover:scale-105"><ProductArt kind={p.art} className="h-auto w-full" /></div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h2 className="text-2xl font-bold leading-tight text-navy-900">{p.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.short}</p>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                    <ul className="space-y-2 overflow-hidden pt-4 text-sm text-navy-900">{p.covers.slice(0, 4).map((c) => <li key={c} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-600" />{c}</li>)}</ul>
                  </div>
                  <p className="mt-auto pt-6 text-sm font-semibold text-navy-600">View product <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span></p>
                </div>
              </Glass>
            </Link>
          </Reveal>
        ))}
      </Container>
    </Section>
  );
}
