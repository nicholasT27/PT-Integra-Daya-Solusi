"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import { DetailTab } from "@/components/quinn/Bits";
import { Reveal } from "@/components/quinn/Interactive";
import { Shell, keys } from "./Sections2";
import { BigLearn, Core, Orbit, useCycle } from "./Glance";
import Cta from "./Cta";
import { services } from "@/lib/site";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const ang = (i) => ((-90 + i * 60) * Math.PI) / 180;
const curve = (x, y) => `M50 50 Q ${50 + (x - 50) / 2 + (y - 50) * 0.14} ${50 + (y - 50) / 2 - (x - 50) * 0.14} ${x} ${y}`;

// Keeps track of the highlighted service: it moves on by itself, and stops while the visitor is pointing at something.
function useHighlight(ms) {
  const [paused, setPaused] = useState(false);
  const [a, setA] = useCycle(paused, ms);
  return { a, setA, hover: (i) => { setPaused(true); setA(i); }, resume: () => setPaused(false), pause: () => setPaused(true) };
}

// The list of all six services with their descriptions. The highlighted row slides across.
function List({ a, hover }) {
  return (
    <ol className="space-y-2">
      {services.map((s, i) => (
        <li key={s.slug}>
          <Link href={`/services/${s.slug}`} onMouseEnter={() => hover(i)} onFocus={() => hover(i)} className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300 ${a === i ? "translate-x-2 border-white bg-white shadow-xl" : "border-transparent hover:bg-white/60"}`}>
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${a === i ? "bg-navy-600 text-white" : "bg-ice-100 text-navy-600"}`}><Icon name={s.icon} /></span>
            <span className="flex-1">
              <span className="block text-lg font-bold leading-tight text-navy-900">{s.title}</span>
              <span className="mt-0.5 block text-sm leading-snug text-muted">{s.short}</span>
            </span>
            <span className={`text-xl text-navy-600 transition-all duration-300 ${a === i ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}>→</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

// The big Learn more button for the highlighted service, plus a link to everything.
function Actions({ a }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-5">
      <BigLearn href={`/services/${services[a].slug}`}>Learn more</BigLearn>
      <Link href="/services" className="text-sm font-semibold text-navy-600 hover:underline">All services →</Link>
    </div>
  );
}

// The heading used by the designs that put the list on the left.
function Head({ accent }) {
  return (
    <>
      <Reveal><DetailTab className="text-navy-600">What we offer.</DetailTab></Reveal>
      <h2 className="mt-6 text-balance text-4xl font-bold leading-[1.05] text-navy-900 sm:text-5xl">Six disciplines, <span className="shine-text">{accent}</span></h2>
    </>
  );
}

// Design A: the list, with fixed nodes wired to the logo. Light pulses travel along the lines.
export function GlanceA() {
  const h = useHighlight(3600);
  const nodes = services.map((s, i) => ({ s, x: 50 + 37 * Math.cos(ang(i)), y: 50 + 37 * Math.sin(ang(i)) }));
  return (
    <Shell id="g2-a" tag="Glance A · Network and list">
      <div className={`${wrap} grid items-center gap-12 py-28 lg:grid-cols-12`} onMouseLeave={h.resume}>
        <div className="lg:col-span-6">
          <Head accent="wired together." />
          <div className="mt-8"><List a={h.a} hover={h.hover} /></div>
          <Actions a={h.a} />
        </div>
        <div className="relative mx-auto aspect-square w-[min(90vw,540px)] lg:col-span-6">
          <span className="orbit-slow absolute inset-[2%] rounded-full border border-dashed border-navy-600/25" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
            {nodes.map((n, i) => {
              const m = nodes[(i + 1) % 6];
              return <path key={`r${i}`} d={`M${n.x} ${n.y} L${m.x} ${m.y}`} stroke="#003af2" strokeOpacity="0.1" strokeWidth="1" vectorEffect="non-scaling-stroke" />;
            })}
            {nodes.map((n, i) => {
              const on = h.a === i;
              return (
                <g key={i}>
                  <path d={curve(n.x, n.y)} stroke="#003af2" strokeOpacity={on ? 0.95 : 0.22} strokeWidth={on ? 3 : 1.3} vectorEffect="non-scaling-stroke" style={{ transition: "all 400ms" }} />
                  <circle r={on ? 1.8 : 1.1} fill="#003af2" opacity={on ? 1 : 0.6}>
                    <animateMotion dur={on ? "1.6s" : "3.4s"} begin={`-${(i * 0.57).toFixed(2)}s`} repeatCount="indefinite" path={curve(n.x, n.y)} />
                  </circle>
                </g>
              );
            })}
          </svg>
          {nodes.map((n, i) => {
            const on = h.a === i;
            return (
              <Link key={n.s.slug} href={`/services/${n.s.slug}`} aria-label={n.s.title} onMouseEnter={() => h.hover(i)} onFocus={() => h.hover(i)} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
                {on && <span className="absolute top-0 h-[4.2rem] w-[4.2rem] animate-ping rounded-full bg-navy-600/25" />}
                <span className={`relative flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-full shadow-xl ring-1 transition-all duration-500 ${on ? "bg-navy-600 text-white ring-navy-600 shadow-[0_0_0_8px_rgba(0,58,242,0.12),0_18px_40px_rgba(0,58,242,0.35)]" : "bg-white text-navy-600 ring-navy-600/15"}`} style={{ transform: `scale(${on ? 1.15 : 1})` }}><Icon name={n.s.icon} className="h-7 w-7" /></span>
                <span className={`absolute top-full mt-2 whitespace-nowrap text-xs font-semibold transition-colors ${on ? "text-navy-900" : "text-navy-900/55"}`}>{keys[i]}</span>
              </Link>
            );
          })}
          <div className="absolute left-1/2 top-1/2 flex h-[27%] w-[27%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl ring-1 ring-navy-600/10">
            <span className="absolute inset-0 animate-ping rounded-full bg-navy-600/10" style={{ animationDuration: "3s" }} />
            <Image src="/brand/ids-mark-blue.svg" alt="IDS" width={160} height={54} className="relative w-[64%]" />
          </div>
        </div>
      </div>
    </Shell>
  );
}

// Design B: the list, with six hexagon cells around a hexagonal logo, like one honeycomb.
export function GlanceB() {
  const h = useHighlight(3600);
  const W = 30;
  const d = W * 0.866 + 1.2;
  const hex = "polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)";
  return (
    <Shell id="g2-b" tag="Glance B · Honeycomb and list">
      <div className={`${wrap} grid items-center gap-12 py-28 lg:grid-cols-12`} onMouseLeave={h.resume}>
        <div className="lg:col-span-6">
          <Head accent="one honeycomb." />
          <div className="mt-8"><List a={h.a} hover={h.hover} /></div>
          <Actions a={h.a} />
        </div>
        <div className="relative mx-auto aspect-square w-[min(90vw,540px)] lg:col-span-6">
          <span className="orbit-slow absolute inset-[1%] rounded-full border border-dashed border-navy-600/20" />
          <span className="orbit absolute inset-[9%] rounded-full border border-navy-600/10" style={{ borderTopColor: "rgba(0,58,242,0.5)" }} />
          {services.map((s, i) => {
            const on = h.a === i;
            return (
              <Link key={s.slug} href={`/services/${s.slug}`} aria-label={s.title} onMouseEnter={() => h.hover(i)} onFocus={() => h.hover(i)} className="absolute transition-transform duration-500" style={{ left: `${50 + d * Math.cos(ang(i))}%`, top: `${50 + d * Math.sin(ang(i))}%`, width: `${W}%`, aspectRatio: "1 / 0.866", transform: `translate(-50%, -50%) scale(${on ? 1.07 : 1})`, zIndex: on ? 5 : 1 }}>
                <span className={`absolute inset-0 transition-all duration-500 ${on ? "bg-navy-600" : "bg-navy-600/25"}`} style={{ clipPath: hex, filter: on ? "drop-shadow(0 16px 26px rgba(0,58,242,0.4))" : "none" }} />
                <span className={`absolute inset-[2.5px] flex flex-col items-center justify-center gap-1 transition-all duration-500 ${on ? "bg-navy-600 text-white" : "bg-white/90 text-navy-900"}`} style={{ clipPath: hex }}>
                  <Icon name={s.icon} className={`h-6 w-6 ${on ? "" : "text-navy-600"}`} />
                  <span className="text-[11px] font-bold leading-none sm:text-xs">{keys[i]}</span>
                </span>
              </Link>
            );
          })}
          <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white shadow-xl" style={{ width: `${W}%`, aspectRatio: "1 / 0.866", clipPath: hex }}>
            <Image src="/brand/ids-mark-blue.svg" alt="IDS" width={160} height={54} className="w-[58%]" />
          </div>
        </div>
      </div>
    </Shell>
  );
}

// One small card in the centred design, showing a service with its own Learn more link.
function SideCard({ s, i, a, hover }) {
  const on = a === i;
  return (
    <Link href={`/services/${s.slug}`} onMouseEnter={() => hover(i)} onFocus={() => hover(i)} className={`group block rounded-3xl border p-5 transition-all duration-300 ${on ? "border-navy-600 bg-white shadow-2xl lg:-translate-y-1" : "border-white bg-white/65 shadow-md backdrop-blur-xl hover:bg-white"}`}>
      <span className="flex items-center justify-between">
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 ${on ? "bg-navy-600 text-white" : "bg-ice-100 text-navy-600"}`}><Icon name={s.icon} /></span>
        <span className="text-sm font-semibold text-navy-600/50">0{i + 1}</span>
      </span>
      <span className="mt-4 block text-lg font-bold leading-tight text-navy-900">{s.title}</span>
      <span className="mt-1.5 block text-sm leading-snug text-muted">{s.short}</span>
      <span className="mt-3 block text-sm font-semibold text-navy-600">Learn more <span className="inline-block transition-transform group-hover:translate-x-1.5">→</span></span>
    </Link>
  );
}

// Design C: the orbit sits in the middle with three service cards on each side, so everything is in view at once.
export function GlanceC() {
  const h = useHighlight(3600);
  return (
    <Shell id="g2-c" tag="Glance C · Centred stage">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-28 sm:px-8" onMouseLeave={h.resume}>
        <div className="text-center">
          <Reveal><DetailTab className="text-navy-600">What we offer.</DetailTab></Reveal>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-[1.05] text-navy-900 sm:text-6xl">Every angle, <span className="shine-text">in view.</span></h2>
        </div>
        <div className="mt-14 grid items-center gap-6 lg:grid-cols-[1fr_500px_1fr]">
          <div className="order-2 space-y-4 lg:order-1">
            {services.slice(0, 3).map((s, i) => <SideCard key={s.slug} s={s} i={i} a={h.a} hover={h.hover} />)}
          </div>
          <div className="order-1 lg:order-2"><div className="scale-[0.92] sm:scale-100"><Orbit a={h.a} onHover={h.hover} onLeave={h.resume} /></div></div>
          <div className="order-3 space-y-4">
            {services.slice(3).map((s, i) => <SideCard key={s.slug} s={s} i={i + 3} a={h.a} hover={h.hover} />)}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center gap-4">
          <BigLearn href={`/services/${services[h.a].slug}`}>Learn more</BigLearn>
          <Link href="/services" className="text-sm font-semibold text-navy-600 hover:underline">All services →</Link>
        </div>
      </div>
    </Shell>
  );
}

// Design D: the list with an accordion. The current row opens inline to show what it covers and its own Learn more button.
export function GlanceD() {
  const h = useHighlight(4800);
  return (
    <Shell id="g2-d" tag="Glance D · Accordion and orbit">
      <div className={`${wrap} grid items-start gap-12 py-28 lg:grid-cols-12`} onMouseLeave={h.resume}>
        <div className="lg:col-span-6">
          <Head accent="one by one." />
          <ol className="mt-8 border-t border-navy-900/15">
            {services.map((s, i) => {
              const on = h.a === i;
              return (
                <li key={s.slug} className="border-b border-navy-900/15">
                  <button type="button" aria-expanded={on} onClick={() => { h.pause(); h.setA(i); }} className="flex w-full items-center gap-4 py-5 text-left">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${on ? "bg-navy-600 text-white" : "bg-ice-100 text-navy-600"}`}><Icon name={s.icon} /></span>
                    <span className={`flex-1 text-xl font-bold leading-tight transition-colors duration-300 ${on ? "text-navy-900" : "text-navy-900/45"}`}>{s.title}</span>
                    <span className={`flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/15 text-xl text-navy-600 transition-transform duration-300 ${on ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <div className="pb-6 pl-[3.75rem]">
                        <p className="max-w-md text-sm leading-relaxed text-muted">{s.intro}</p>
                        <ul className="mt-3 space-y-1.5 text-sm text-navy-900">
                          {s.offerings.slice(0, 3).map((o) => <li key={o} className="flex gap-2"><span className="text-navy-600">●</span> {o}</li>)}
                        </ul>
                        <div className="mt-5"><BigLearn href={`/services/${s.slug}`}>Learn more</BigLearn></div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <Link href="/services" className="mt-6 inline-block text-sm font-semibold text-navy-600 hover:underline">All services →</Link>
        </div>
        <div className="lg:sticky lg:top-28 lg:col-span-6"><Orbit a={h.a} onHover={h.hover} onLeave={h.resume} /></div>
      </div>
    </Shell>
  );
}

// A service card for the wired layout. A small dot on its inner edge marks where the line from the logo arrives.
function NetCard({ s, i, a, hover, side }) {
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

// Design E: the centred stage with the wired network from design A. Each service node is connected to the logo
// and its line carries light pulses on to the matching card, so the network points straight at each section.
export function GlanceE({ cta = 1 }) {
  const h = useHighlight(3600);
  const ys = [100 / 6, 50, 500 / 6];
  const pos = (i) => ({ x: i < 3 ? 17 : 83, y: ys[i % 3] });
  const route = (i) => {
    const { x, y } = pos(i);
    return i < 3 ? `M50 50 C 38 50, 30 ${y}, ${x} ${y} L 0 ${y}` : `M50 50 C 62 50, 70 ${y}, ${x} ${y} L 100 ${y}`;
  };
  const leftRows = ["lg:col-start-1 lg:row-start-1", "lg:col-start-1 lg:row-start-2", "lg:col-start-1 lg:row-start-3"];
  const rightRows = ["lg:col-start-3 lg:row-start-1", "lg:col-start-3 lg:row-start-2", "lg:col-start-3 lg:row-start-3"];

  return (
    <Shell id="g3-e" tag="Glance E · Wired stage">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-28 sm:px-8" onMouseLeave={h.resume}>
        <div className="text-center">
          <Reveal><DetailTab className="text-navy-600">What we offer.</DetailTab></Reveal>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-[1.05] text-navy-900 sm:text-6xl">Every angle, <span className="shine-text">wired together.</span></h2>
        </div>

        <div className="mt-14 grid gap-0 lg:auto-rows-fr lg:grid-cols-[1fr_580px_1fr]">
          <div className="mb-6 flex justify-center lg:hidden">
            <span className="flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-2xl ring-1 ring-navy-600/10"><Image src="/brand/ids-mark-blue.svg" alt="IDS" width={160} height={54} className="w-[64%]" /></span>
          </div>

          {services.slice(0, 3).map((s, i) => <div key={s.slug} className={leftRows[i]}><NetCard s={s} i={i} a={h.a} hover={h.hover} side="left" /></div>)}

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

          {services.slice(3).map((s, i) => <div key={s.slug} className={rightRows[i]}><NetCard s={s} i={i + 3} a={h.a} hover={h.hover} side="right" /></div>)}
        </div>

        <div className="mt-14 flex min-h-[9rem] items-center justify-center"><Cta variant={cta} href={`/services/${services[h.a].slug}`} /></div>
      </div>
    </Shell>
  );
}
