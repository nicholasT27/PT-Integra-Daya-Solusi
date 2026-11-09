"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { ArrowButton, DetailTab } from "@/components/quinn/Bits";
import { Reveal } from "@/components/quinn/Interactive";
import RevealText from "@/components/quinn/RevealText";
import FlowLines from "./FlowLines";
import { services } from "@/lib/site";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const keys = ["Risk", "Insurance", "Retirement", "Legal", "Tax", "Industrial"];
const statement = "Sophisticated enough for high-stakes decisions. Nimble enough for everyday clarity. Our complete range of services is tailored to your goals to reduce risk, cut friction and give you confidence in every decision.";

// The background every design shares with the hero: drifting glows, flowing lines, and a glow plus
// dot pattern that follow the cursor. It makes the second section feel like a continuation of the first.
export function Shell({ tag, id, children }) {
  const ref = useRef(null);
  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--px", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--py", `${e.clientY - r.top}px`);
  }
  const mask = (r) => `radial-gradient(${r}px circle at var(--px) var(--py), black, transparent 70%)`;
  return (
    <section id={id} ref={ref} onMouseMove={onMove} className="relative isolate overflow-clip bg-white" style={{ "--px": "70%", "--py": "20%" }}>
      <div className="absolute inset-0 -z-10">
        <span className="drift absolute -right-24 top-10 h-[460px] w-[460px] rounded-full bg-navy-600/20 blur-3xl" />
        <span className="drift absolute -left-32 top-1/2 h-[420px] w-[420px] rounded-full bg-sky-300/60 blur-3xl" style={{ animationDelay: "-6s" }} />
        <span className="drift absolute bottom-0 right-1/4 h-[380px] w-[380px] rounded-full bg-ice-100 blur-3xl" style={{ animationDelay: "-11s" }} />
      </div>
      <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(520px circle at var(--px) var(--py), rgba(0,58,242,0.13), transparent 65%)" }} />
      <div className="absolute inset-0 -z-10 opacity-50" style={{ backgroundImage: "radial-gradient(#003af2 1.2px, transparent 1.2px)", backgroundSize: "26px 26px", maskImage: mask(320), WebkitMaskImage: mask(320) }} />
      <FlowLines className="-z-10" color="#003af2" opacity={0.28} />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-white to-transparent" />
      <span className="absolute left-4 top-4 z-20 rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-white shadow">{tag}</span>
      {children}
    </section>
  );
}

// Section A: a big word on the left keeps changing as you scroll through the services on the right,
// the same idea as the switching word in the hero headline.
export function SectionA() {
  const refs = useRef([]);
  const [a, setA] = useState(0);
  useEffect(() => {
    function update() {
      const mid = window.innerHeight * 0.5;
      let best = 0, bd = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bd) { bd = d; best = i; }
      });
      setA(best);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  return (
    <Shell id="sec-a" tag="Section A · Sticky word">
      <div className={`${wrap} grid gap-10 py-28 lg:grid-cols-12`}>
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <DetailTab className="text-navy-600">What we offer.</DetailTab>
          <p className="mt-8 text-lg text-muted">Expert advice on</p>
          <div className="h-[1.15em] overflow-hidden text-6xl font-bold leading-[1.15] sm:text-7xl" aria-hidden="true">
            <div style={{ transform: `translateY(${-a * 1.15}em)`, transition: "transform 650ms cubic-bezier(0.7, 0, 0.2, 1)" }}>
              {keys.map((k) => <div key={k} className="shine-text h-[1.15em]">{k}</div>)}
            </div>
          </div>
          <p className="mt-2 text-lg text-muted">and five other disciplines, from one team.</p>
          <p className="mt-10 text-sm font-semibold tabular-nums text-navy-600">0{a + 1} / 06</p>
          <div className="mt-6 hidden lg:block"><ArrowButton href="/services">Explore services</ArrowButton></div>
        </div>
        <ol className="lg:col-span-7">
          {services.map((s, i) => (
            <li key={s.slug} ref={(el) => (refs.current[i] = el)} className="flex min-h-[64vh] items-center py-4">
              <div className={`w-full rounded-3xl border border-white bg-white/75 p-8 backdrop-blur-xl transition-all duration-500 sm:p-10 ${a === i ? "scale-100 opacity-100 shadow-2xl" : "scale-[0.96] opacity-40 shadow-md"}`}>
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-600 text-white"><Icon name={s.icon} className="h-7 w-7" /></span>
                  <span className="text-5xl font-bold text-navy-600/20">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-3xl font-bold leading-tight text-navy-900">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.intro}</p>
                <ul className="mt-5 grid gap-2 text-sm text-navy-900 sm:grid-cols-2">
                  {s.offerings.map((o) => <li key={o} className="flex gap-2"><span className="text-navy-600">●</span> {o}</li>)}
                </ul>
                <Link href={`/services/${s.slug}`} className="mt-6 inline-block text-sm font-semibold text-navy-600 hover:underline">View service →</Link>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Shell>
  );
}

// Section B: scrolling down slides the services sideways, like a rail of cards.
export function SectionB() {
  const sec = useRef(null);
  const track = useRef(null);
  const max = useRef(0);
  const [h, setH] = useState(null);
  const [x, setX] = useState(0);

  useEffect(() => {
    function update() {
      const el = sec.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setX(-clamp(-r.top / Math.max(1, el.offsetHeight - window.innerHeight)) * max.current);
    }
    function measure() {
      max.current = Math.max(0, track.current.scrollWidth - window.innerWidth);
      setH(window.innerHeight + max.current);
      update();
    }
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", measure); };
  }, []);

  const pad = "px-[max(1.25rem,calc((100vw-72rem)/2+2rem))]";
  return (
    <Shell id="sec-b" tag="Section B · Sideways rail">
      <div ref={sec} style={{ height: h ?? "320vh" }} className="relative">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div ref={track} className={`flex gap-6 ${pad}`} style={{ transform: `translateX(${x}px)`, willChange: "transform" }}>
            <div className="flex w-[min(86vw,480px)] shrink-0 flex-col justify-center pr-6">
              <DetailTab className="text-navy-600">What we offer.</DetailTab>
              <h2 className="mt-6 text-balance text-5xl font-bold leading-[1.04] text-navy-900 sm:text-6xl">Six disciplines, <span className="shine-text">one rail.</span></h2>
              <p className="mt-5 text-lg text-muted">Keep scrolling and the team comes to you.</p>
              <p className="nudge mt-8 text-2xl text-navy-600" style={{ animationName: "none" }}>→</p>
            </div>
            {services.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group relative flex h-[min(68vh,500px)] w-[min(82vw,390px)] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] border border-white bg-white/75 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-2xl">
                <span className="pointer-events-none absolute -right-2 -top-6 text-[9rem] font-bold leading-none text-transparent" style={{ WebkitTextStroke: "2px rgba(0,58,242,0.18)" }}>{i + 1}</span>
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-600 text-white transition-transform duration-300 group-hover:rotate-6"><Icon name={s.icon} className="h-7 w-7" /></span>
                <div className="relative">
                  <h3 className="text-2xl font-bold leading-tight text-navy-900">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.short}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-navy-900">
                    {s.offerings.slice(0, 3).map((o) => <li key={o} className="flex gap-2"><span className="text-navy-600">●</span> {o}</li>)}
                  </ul>
                  <p className="mt-5 text-sm font-semibold text-navy-600">View service <span className="inline-block transition-transform group-hover:translate-x-2">→</span></p>
                </div>
              </Link>
            ))}
            <div className="flex w-[min(80vw,360px)] shrink-0 flex-col justify-center pl-4 pr-10">
              <p className="text-3xl font-bold leading-tight text-navy-900">Not sure which one you need?</p>
              <div className="mt-6"><ArrowButton href="/contact">Talk to us</ArrowButton></div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

// Section C: the services are cards that stack on top of each other as you scroll, getting bluer as they combine.
export function SectionC() {
  const looks = [
    ["bg-white", "text-navy-900", "text-muted", "text-navy-600"],
    ["bg-ice-50", "text-navy-900", "text-muted", "text-navy-600"],
    ["bg-ice-100", "text-navy-900", "text-navy-900/70", "text-navy-600"],
    ["bg-sky-300", "text-navy-900", "text-navy-900/75", "text-navy-900"],
    ["bg-navy-600", "text-white", "text-white/80", "text-sky-300"],
    ["bg-navy-900", "text-white", "text-white/75", "text-sky-300"],
  ];
  return (
    <Shell id="sec-c" tag="Section C · Stacking cards">
      <div className={`${wrap} pb-[22vh] pt-28`}>
        <Reveal><DetailTab className="text-navy-600">What we offer.</DetailTab></Reveal>
        <RevealText className="mt-8 max-w-4xl indent-16 text-2xl font-semibold leading-snug text-navy-900 sm:text-4xl" text={statement} />
        <ol className="mx-auto mt-24 max-w-4xl">
          {services.map((s, i) => {
            const [bg, ink, sub, acc] = looks[i];
            return (
              <li key={s.slug} className="sticky" style={{ top: `${104 + i * 20}px`, marginBottom: i < 5 ? "9vh" : 0 }}>
                <Link href={`/services/${s.slug}`} className={`group relative grid min-h-[340px] gap-6 overflow-hidden rounded-[2rem] p-8 shadow-2xl ring-1 ring-navy-900/5 sm:p-12 md:grid-cols-12 ${bg} ${ink}`}>
                  <span className="pointer-events-none absolute -bottom-10 right-4 text-[12rem] font-bold leading-none text-transparent" style={{ WebkitTextStroke: `2px ${i > 3 ? "rgba(255,255,255,0.2)" : "rgba(0,58,242,0.16)"}` }}>{i + 1}</span>
                  <div className="relative md:col-span-7">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${i > 3 ? "bg-white/15" : "bg-navy-600 text-white"}`}><Icon name={s.icon} /></span>
                    <h3 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">{s.title}</h3>
                    <p className={`mt-3 max-w-md leading-relaxed ${sub}`}>{s.intro}</p>
                    <p className={`mt-6 text-sm font-semibold ${acc}`}>View service <span className="inline-block transition-transform group-hover:translate-x-2">→</span></p>
                  </div>
                  <ul className={`relative space-y-2 self-end text-sm md:col-span-5 ${ink}`}>
                    {s.offerings.slice(0, 4).map((o) => <li key={o} className="flex gap-2"><span className={acc}>●</span> {o}</li>)}
                  </ul>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </Shell>
  );
}

// One tile of the spotlight grid: a light follows the cursor inside it, and it opens to show what it covers.
function Tile({ s, i }) {
  const ref = useRef(null);
  function move(e) {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--tx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--ty", `${e.clientY - r.top}px`);
  }
  return (
    <Reveal delay={(i % 3) * 100} className="h-full">
      <Link ref={ref} href={`/services/${s.slug}`} onMouseMove={move} className="group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-3xl border border-white bg-white/70 p-7 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl" style={{ "--tx": "50%", "--ty": "0%" }}>
        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(280px circle at var(--tx) var(--ty), rgba(0,58,242,0.16), transparent 70%)" }} />
        <span className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ border: "1.5px solid rgba(0,58,242,0.55)", maskImage: "radial-gradient(220px circle at var(--tx) var(--ty), black, transparent 70%)", WebkitMaskImage: "radial-gradient(220px circle at var(--tx) var(--ty), black, transparent 70%)" }} />
        <div className="relative flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-600 text-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"><Icon name={s.icon} /></span>
          <span className="text-sm font-semibold text-navy-600/60">0{i + 1}</span>
        </div>
        <h3 className="relative mt-6 text-2xl font-bold leading-tight text-navy-900">{s.title}</h3>
        <p className="relative mt-2 text-sm leading-relaxed text-muted">{s.short}</p>
        <div className="relative grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
          <ul className="space-y-1.5 overflow-hidden pt-4 text-sm text-navy-900">
            {s.offerings.slice(0, 3).map((o) => <li key={o} className="flex gap-2"><span className="text-navy-600">●</span> {o}</li>)}
          </ul>
        </div>
        <p className="relative mt-auto pt-5 text-sm font-semibold text-navy-600">View service <span className="inline-block transition-transform group-hover:translate-x-2">→</span></p>
      </Link>
    </Reveal>
  );
}

// Section D: a grid of glass tiles. Move the cursor over them and a light follows it, then each tile opens up.
export function SectionD() {
  return (
    <Shell id="sec-d" tag="Section D · Spotlight grid">
      <div className={`${wrap} py-28`}>
        <Reveal><DetailTab className="text-navy-600">What we offer.</DetailTab></Reveal>
        <RevealText className="mt-8 max-w-4xl indent-16 text-2xl font-semibold leading-snug text-navy-900 sm:text-4xl" text={statement} />
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <Tile key={s.slug} s={s} i={i} />)}
        </div>
        <Reveal className="mt-12"><ArrowButton href="/services">Explore services</ArrowButton></Reveal>
      </div>
    </Shell>
  );
}
