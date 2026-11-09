"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowButton, DetailTab } from "@/components/quinn/Bits";
import { Reveal } from "@/components/quinn/Interactive";
import { history } from "@/lib/site";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// Scroll progress (0 to 1) through a tall section whose inner content stays pinned on screen.
function useProgress() {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    function update() {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setP(clamp(-r.top / Math.max(1, r.height - window.innerHeight)));
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return [ref, p];
}

// A small tag in the corner naming each option.
function Tag({ children }) {
  return <span className="absolute left-4 top-24 z-20 rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-white shadow">{children}</span>;
}

// The logo as a thin outline that draws itself. "draw" is 0 to 1, "fill" is how much it is filled in.
function LogoLine({ logo, draw, fill = 0, className = "", width = 2 }) {
  return (
    <svg viewBox={logo.viewBox} className={className} fill="#003af2" stroke="#003af2" aria-hidden="true">
      {logo.paths.map((d, i) => (
        <path key={i} d={d} pathLength="1" strokeWidth={width} strokeOpacity="0.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" style={{ strokeDasharray: 1, strokeDashoffset: 1 - draw, fillOpacity: fill * 0.12 }} />
      ))}
    </svg>
  );
}

const pillars = [
  { word: "Integrasi", en: "Integration", text: "Insurance, legal, tax and operations are handled together from the first conversation, so nothing falls between the gaps." },
  { word: "Kolaborasi", en: "Collaboration", text: "Our specialists work as one team with you, sharing what they learn so every recommendation fits with the rest." },
  { word: "Kesinambungan", en: "Continuity", text: "We stay involved after the report is delivered, reviewing and adjusting as your business and its risks change." },
];

// Option 1: the logo draws itself while a single card changes through the three brand pillars as you scroll.
export function AboutDraw({ logo }) {
  const [ref, p] = useProgress();
  const stage = Math.min(2, Math.floor(clamp(p) * 3));
  const t = pillars[stage];
  return (
    <section ref={ref} className="relative h-[330vh]" data-tone="#dce7ff" data-glow="1.25">
      <Tag>About 1 · Logo + pillars</Tag>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <LogoLine logo={logo} draw={clamp(p * 1.6)} fill={clamp((p - 0.45) * 2)} width={2} className="absolute left-1/2 top-1/2 w-[min(94%,1200px)] -translate-x-1/2 -translate-y-1/2" />
        <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="max-w-xl rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur-md sm:p-12">
            <DetailTab className="text-navy-600">About IDS</DetailTab>
            <div key={stage} className="animate-rise mt-6 min-h-[250px]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-navy-600">0{stage + 1} · {t.en}</p>
              <h2 className="mt-3 text-4xl font-bold leading-tight text-navy-900 sm:text-5xl">{t.word}</h2>
              <p className="mt-4 leading-relaxed text-muted">{t.text}</p>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex gap-2" aria-hidden="true">{pillars.map((_, i) => <span key={i} className={`h-2 rounded-full bg-navy-600 transition-all duration-500 ${stage === i ? "w-10" : "w-2 opacity-25"}`} />)}</div>
              <ArrowButton href="/about">About us</ArrowButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const names = [
  { w: "Integra", t: "Integration. Many fields of expertise, joined into one connected team." },
  { w: "Daya", t: "Capability. Real depth in risk, insurance, law, finance and engineering." },
  { w: "Solusi", t: "Solutions. Practical, sustainable answers you can act on, not just reports." },
];

// Option 2: the three words of the company name fill in one by one as you scroll, each with its meaning.
export function AboutName({ logo }) {
  const [ref, p] = useProgress();
  const k = clamp(p) * 3;
  return (
    <section ref={ref} className="relative h-[320vh]" data-tone="#e4ecff" data-glow="1.15">
      <Tag>About 2 · Name in three words</Tag>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pt-16 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <DetailTab className="text-navy-600">About IDS</DetailTab>
            <ol className="mt-6">
              {names.map((n, i) => {
                const lit = clamp(k - i);
                return (
                  <li key={n.w} className="relative">
                    <span className="block text-[clamp(3.2rem,11vw,9rem)] font-bold leading-[0.95] tracking-tight text-transparent" style={{ WebkitTextStroke: "2px rgba(0,58,242,0.3)" }}>{n.w}</span>
                    <span aria-hidden="true" className="absolute left-0 top-0 block overflow-hidden whitespace-nowrap text-[clamp(3.2rem,11vw,9rem)] font-bold leading-[0.95] tracking-tight text-navy-900" style={{ clipPath: `inset(0 ${(1 - lit) * 100}% 0 0)` }}>{n.w}</span>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white/85 p-8 shadow-2xl backdrop-blur-md">
              <LogoLine logo={logo} draw={1} fill={clamp(p * 2)} width={1.5} className="w-40" />
              <ul className="mt-6 space-y-4">
                {names.map((n, i) => (
                  <li key={n.w} className="transition-all duration-500" style={{ opacity: 0.25 + 0.75 * clamp(k - i), transform: `translateX(${(1 - clamp(k - i)) * 14}px)` }}>
                    <p className="text-sm leading-relaxed text-muted"><strong className="text-navy-900">{n.w}.</strong> {n.t.split(". ").slice(1).join(". ") || n.t}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6"><ArrowButton href="/about">About us</ArrowButton></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Option 3: a vertical timeline. A line draws down the page and the company milestones appear along it.
export function AboutJourney() {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    function update() {
      const r = ref.current.getBoundingClientRect();
      setP(clamp((window.innerHeight * 0.6 - r.top) / r.height));
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return (
    <section className="relative py-32" data-tone="#eaf0ff" data-glow="1">
      <Tag>About 3 · Journey line</Tag>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal><DetailTab className="text-navy-600">About IDS</DetailTab></Reveal>
        <Reveal><h2 className="mt-6 max-w-3xl text-balance text-4xl font-bold leading-[1.05] text-navy-900 sm:text-6xl">Built one discipline at a time, <span className="shine-text">joined into one team.</span></h2></Reveal>
        <div ref={ref} className="relative mt-20">
          <span className="absolute bottom-0 left-4 top-0 w-px bg-navy-600/15 lg:left-1/2" />
          <span className="absolute left-4 top-0 w-[3px] -translate-x-px origin-top rounded-full bg-navy-600 lg:left-1/2" style={{ height: "100%", transform: `scaleY(${p})` }} />
          <ol className="space-y-14">
            {history.map((h, i) => {
              const on = p * history.length + 0.4 > i + 0.5;
              const right = i % 2 === 0;
              return (
                <li key={h.year} className="relative grid lg:grid-cols-2">
                  <span className={`absolute left-4 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white transition-all duration-500 lg:left-1/2 ${on ? "scale-125 bg-navy-600 shadow-[0_0_0_6px_rgba(0,58,242,0.18)]" : "bg-navy-600/30"}`} />
                  <div className={`pl-12 transition-all duration-700 lg:pl-0 ${right ? "lg:col-start-2 lg:pl-14" : "lg:col-start-1 lg:pr-14 lg:text-right"} ${on ? "translate-y-0 opacity-100" : "translate-y-6 opacity-20"}`}>
                    <span className="text-5xl font-bold text-navy-600/25 sm:text-6xl">{h.year}</span>
                    <h3 className="mt-1 text-2xl font-bold text-navy-900">{h.title}</h3>
                    <p className={`mt-2 max-w-md text-muted ${right ? "" : "lg:ml-auto"}`}>{h.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="mt-16 flex justify-center"><ArrowButton href="/about">About us</ArrowButton></div>
      </div>
    </section>
  );
}

// Option 4: the three pillars as big tabs around a calm logo. Pick one and the text and a highlight on the logo change.
export function AboutPillars({ logo }) {
  const [a, setA] = useState(0);
  const t = pillars[a];
  return (
    <section className="relative py-32" data-tone="#dde7ff" data-glow="1.1">
      <Tag>About 4 · Pillar explorer</Tag>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal><DetailTab className="text-navy-600">About IDS</DetailTab></Reveal>
          <h2 className="mt-6 text-balance text-4xl font-bold leading-[1.05] text-navy-900 sm:text-5xl">Three ideas behind <span className="shine-text">every engagement.</span></h2>
          <div className="mt-8 space-y-3" role="tablist" aria-label="Pillars">
            {pillars.map((x, i) => (
              <button key={x.word} type="button" role="tab" aria-selected={a === i} onMouseEnter={() => setA(i)} onFocus={() => setA(i)} onClick={() => setA(i)} className={`flex w-full items-center gap-5 rounded-2xl border p-5 text-left transition-all duration-300 ${a === i ? "translate-x-2 border-white bg-white shadow-xl" : "border-transparent hover:bg-white/60"}`}>
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold transition-colors ${a === i ? "bg-navy-600 text-white" : "bg-ice-100 text-navy-600"}`}>{i + 1}</span>
                <span>
                  <span className="block text-2xl font-bold text-navy-900">{x.word}</span>
                  <span className="block text-sm text-muted">{x.en}</span>
                </span>
              </button>
            ))}
          </div>
          <div key={a} className="animate-rise mt-6 max-w-md">
            <p className="leading-relaxed text-muted">{t.text}</p>
          </div>
          <div className="mt-8"><ArrowButton href="/about">About us</ArrowButton></div>
        </div>
        <div className="relative mx-auto flex aspect-square w-[min(90vw,520px)] items-center justify-center lg:col-span-6">
          {[0, 1, 2].map((i) => <span key={i} className="absolute rounded-full border transition-all duration-700" style={{ inset: `${i * 11}%`, borderColor: a === i ? "rgba(0,58,242,0.65)" : "rgba(0,58,242,0.15)", borderStyle: i === 1 ? "dashed" : "solid", transform: `scale(${a === i ? 1.03 : 1})` }} />)}
          <span className="orbit-slow absolute inset-[5%] rounded-full border border-dashed border-navy-600/20" />
          <div className="relative flex aspect-square w-[52%] items-center justify-center rounded-full bg-white p-[9%] shadow-2xl ring-1 ring-navy-600/10">
            <Image src="/brand/ids-mark-blue.svg" alt="IDS" width={160} height={54} className="w-full" />
          </div>
          {pillars.map((x, i) => {
            const ang = ((-90 + i * 120) * Math.PI) / 180;
            return <span key={x.word} className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold shadow-lg transition-all duration-500 ${a === i ? "scale-110 bg-navy-600 text-white" : "bg-white text-navy-600"}`} style={{ left: `${50 + 47 * Math.cos(ang)}%`, top: `${50 + 47 * Math.sin(ang)}%` }}>{x.word}</span>;
          })}
        </div>
      </div>
    </section>
  );
}
