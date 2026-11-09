"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { DetailTab } from "@/components/quinn/Bits";
import { Reveal } from "@/components/quinn/Interactive";
import FlowLines from "./FlowLines";
import { services } from "@/lib/site";

// The same soft background as the hero: drifting glows, flowing lines, and a glow plus dot pattern that follow the cursor.
function Backdrop({ id, children }) {
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
      {children}
    </section>
  );
}

// Keeps track of the highlighted service. It moves on by itself every few seconds and stops while the visitor points at something.
function useHighlight(ms = 3600) {
  const [paused, setPaused] = useState(false);
  const [a, setA] = useState(0);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setA((v) => (v + 1) % services.length), ms);
    return () => clearInterval(t);
  }, [paused, ms]);
  return { a, hover: (i) => { setPaused(true); setA(i); }, resume: () => setPaused(false) };
}

// The angle of each line and node is worked out from where it sits: three on the left, three on the right.
const ys = [100 / 6, 50, 500 / 6];
const pos = (i) => ({ x: i < 3 ? 17 : 83, y: ys[i % 3] });

// The path of a line: from the logo, out to the node, and on to the edge of its card.
function route(i) {
  const { x, y } = pos(i);
  return i < 3 ? `M50 50 C 38 50, 30 ${y}, ${x} ${y} L 0 ${y}` : `M50 50 C 62 50, 70 ${y}, ${x} ${y} L 100 ${y}`;
}

// One service card. A small dot on its inner edge marks where the line from the logo arrives.
function ServiceCard({ s, i, a, hover, side }) {
  const on = a === i;
  return (
    <div className="py-2 lg:h-full">
      <Link href={`/services/${s.slug}`} onMouseEnter={() => hover(i)} onFocus={() => hover(i)} className={`group relative block h-full rounded-3xl border p-5 transition-all duration-300 ${on ? "border-navy-600 bg-white shadow-2xl" : "border-white bg-white/65 shadow-md backdrop-blur-xl hover:bg-white"}`}>
        <span className={`absolute top-1/2 hidden h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-white transition-all duration-300 lg:block ${side === "left" ? "-right-[7px]" : "-left-[7px]"} ${on ? "scale-125 bg-navy-600 shadow-[0_0_0_5px_rgba(0,58,242,0.2)]" : "bg-navy-600/40"}`} />
        <span className="flex items-center justify-between">
          <span className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 ${on ? "bg-navy-600 text-white" : "bg-ice-100 text-navy-600"}`}><Icon name={s.icon} /></span>
          <span className="text-sm font-semibold text-navy-600/50">0{i + 1}</span>
        </span>
        <span className="mt-4 block text-lg font-bold leading-tight text-navy-900">{s.title}</span>
        <span className="mt-1.5 block text-sm leading-snug text-muted">{s.short}</span>
      </Link>
    </div>
  );
}

// The second section of the home page: the six services around the logo, each wired to its own card,
// with one big "Learn more" button that goes to the highlighted service.
export default function ServicesWired() {
  const h = useHighlight();
  const leftRows = ["lg:col-start-1 lg:row-start-1", "lg:col-start-1 lg:row-start-2", "lg:col-start-1 lg:row-start-3"];
  const rightRows = ["lg:col-start-3 lg:row-start-1", "lg:col-start-3 lg:row-start-2", "lg:col-start-3 lg:row-start-3"];

  return (
    <Backdrop id="services">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-28 sm:px-8" onMouseLeave={h.resume}>
        <div className="text-center">
          <Reveal><DetailTab className="text-navy-600">What we offer.</DetailTab></Reveal>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-[1.05] text-navy-900 sm:text-6xl">Every angle, <span className="shine-text">wired together.</span></h2>
        </div>

        <div className="mt-14 grid gap-0 lg:auto-rows-fr lg:grid-cols-[1fr_580px_1fr]">
          <div className="mb-6 flex justify-center lg:hidden">
            <span className="flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-2xl ring-1 ring-navy-600/10"><Image src="/brand/ids-mark-blue.svg" alt="IDS" width={160} height={54} className="w-[64%]" /></span>
          </div>

          {services.slice(0, 3).map((s, i) => <div key={s.slug} className={leftRows[i]}><ServiceCard s={s} i={i} a={h.a} hover={h.hover} side="left" /></div>)}

          <div className="relative hidden lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:block">
            <span className="orbit-slow absolute left-1/2 top-1/2 aspect-square h-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-navy-600/25" />
            <span className="absolute left-1/2 top-1/2 aspect-square h-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-navy-600/10" />
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
              {services.map((_, i) => {
                const on = h.a === i;
                return (
                  <g key={i}>
                    <path d={route(i)} stroke="#003af2" strokeOpacity={on ? 0.45 : 0.16} strokeWidth={on ? 2 : 1.2} vectorEffect="non-scaling-stroke" style={{ transition: "all 400ms" }} />
                    <path d={route(i)} pathLength="1" className="flow-line" stroke="#003af2" strokeOpacity={on ? 1 : 0.55} strokeWidth={on ? 3.2 : 1.8} strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ "--d": on ? "2.2s" : "5s", animationDelay: `-${i * 0.7}s` }} />
                  </g>
                );
              })}
            </svg>
            {services.map((s, i) => {
              const { x, y } = pos(i);
              const on = h.a === i;
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} aria-label={s.title} onMouseEnter={() => h.hover(i)} onFocus={() => h.hover(i)} className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={{ left: `${x}%`, top: `${y}%` }}>
                  {on && <span className="absolute top-0 h-[4.2rem] w-[4.2rem] animate-ping rounded-full bg-navy-600/25" />}
                  <span className={`relative flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-full shadow-xl ring-1 transition-all duration-500 ${on ? "bg-navy-600 text-white ring-navy-600 shadow-[0_0_0_8px_rgba(0,58,242,0.12),0_18px_40px_rgba(0,58,242,0.35)]" : "bg-white text-navy-600 ring-navy-600/15"}`} style={{ transform: `scale(${on ? 1.15 : 1})` }}><Icon name={s.icon} className="h-7 w-7" /></span>
                </Link>
              );
            })}
            <div className="absolute left-1/2 top-1/2 flex aspect-square h-[34%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl ring-1 ring-navy-600/10">
              <span className="absolute inset-0 animate-ping rounded-full bg-navy-600/10" style={{ animationDuration: "3s" }} />
              <Image src="/brand/ids-mark-blue.svg" alt="IDS" width={160} height={54} className="relative w-[64%]" />
            </div>
          </div>

          {services.slice(3).map((s, i) => <div key={s.slug} className={rightRows[i]}><ServiceCard s={s} i={i + 3} a={h.a} hover={h.hover} side="right" /></div>)}
        </div>

        <div className="mt-14 flex justify-center">
          <Link href={`/services/${services[h.a].slug}`} className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-navy-600 py-2.5 pl-8 pr-2.5 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-2xl">
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 transition-transform duration-700 group-hover:translate-x-[450%]" aria-hidden="true" />
            <span className="relative">Learn more</span>
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </Backdrop>
  );
}
