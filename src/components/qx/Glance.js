"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { DetailTab } from "@/components/quinn/Bits";
import { Reveal } from "@/components/quinn/Interactive";
import { Shell, keys } from "./Sections2";
import { services } from "@/lib/site";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";

// A large rounded button with a circular arrow, used for the "Learn more" actions.
export function BigLearn({ href, children, tone = "blue" }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-4 rounded-full py-2.5 pl-8 pr-2.5 text-lg font-semibold shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl ${tone === "blue" ? "bg-navy-600 text-white hover:bg-navy-700" : "bg-white text-navy-900 hover:bg-ice-100"}`}>
      {children}
      <span className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 ${tone === "blue" ? "bg-white/20" : "bg-navy-600 text-white"}`}>→</span>
    </Link>
  );
}

// Moves the highlight on to the next service every few seconds, unless the visitor is pointing at something.
export function useCycle(paused, ms = 3400) {
  const [a, setA] = useState(0);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setA((v) => (v + 1) % services.length), ms);
    return () => clearInterval(t);
  }, [paused, ms]);
  return [a, setA];
}

// The logo disc in the middle of the orbit.
export function Core() {
  return (
    <div className="absolute left-1/2 top-1/2 z-10 flex h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl ring-1 ring-navy-600/10">
      <span className="absolute inset-0 animate-ping rounded-full bg-navy-600/10" style={{ animationDuration: "3s" }} />
      <Image src="/brand/ids-mark-blue.svg" alt="IDS" width={160} height={54} className="relative w-[64%]" />
    </div>
  );
}

// The card showing the highlighted service, with the big Learn more button.
function Info({ i }) {
  const s = services[i];
  return (
    <div key={i} className="animate-rise min-h-[330px] rounded-3xl border border-white bg-white/80 p-7 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-600 text-white"><Icon name={s.icon} className="h-7 w-7" /></span>
        <span className="text-5xl font-bold text-navy-600/20">0{i + 1}</span>
      </div>
      <h3 className="mt-5 text-2xl font-bold leading-tight text-navy-900">{s.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{s.short}</p>
      <ul className="mt-4 space-y-1.5 text-sm text-navy-900">
        {s.offerings.slice(0, 3).map((o) => <li key={o} className="flex gap-2"><span className="text-navy-600">●</span> {o}</li>)}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-5">
        <BigLearn href={`/services/${s.slug}`}>Learn more</BigLearn>
        <Link href="/services" className="text-sm font-semibold text-navy-600 hover:underline">All services →</Link>
      </div>
    </div>
  );
}

// The small bars showing which of the six is highlighted. They can be clicked too.
function Dots({ a, setA }) {
  return (
    <div className="mt-5 flex items-center gap-2">
      {services.map((s, i) => (
        <button key={s.slug} type="button" aria-label={`Show ${s.title}`} onClick={() => setA(i)} className={`h-2 rounded-full bg-navy-600 transition-all duration-500 ${a === i ? "w-10" : "w-2 opacity-25 hover:opacity-60"}`} />
      ))}
    </div>
  );
}

// The orbit with all six services always visible on three turning rings. The highlighted one is larger and glowing.
export function Orbit({ a, onHover, onLeave }) {
  const rings = [{ r: 0.22, dur: 46, rev: false }, { r: 0.33, dur: 64, rev: true }, { r: 0.44, dur: 84, rev: false }];
  return (
    <div className="relative mx-auto aspect-square w-[min(90vw,560px)]" style={{ "--s": "min(90vw, 560px)" }} onMouseLeave={onLeave}>
      {rings.map((ring, k) => <span key={k} className="absolute rounded-full border border-navy-600/20" style={{ inset: `${(0.5 - ring.r) * 100}%`, borderStyle: k === 1 ? "dashed" : "solid" }} />)}
      {rings.map((ring, k) => (
        <div key={k} className="absolute inset-0" style={{ animation: `qxSpin ${ring.dur}s linear infinite ${ring.rev ? "reverse" : ""}` }}>
          {services.map((s, i) => {
            if (i % 3 !== k) return null;
            const deg = Math.floor(i / 3) * 180 + i * 37;
            const on = a === i;
            return (
              <div key={s.slug} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${deg}deg) translateY(calc(var(--s) * -${ring.r}))` }}>
                <div style={{ transform: `rotate(${-deg}deg)` }}>
                  <div style={{ animation: `qxSpin ${ring.dur}s linear infinite ${ring.rev ? "" : "reverse"}` }}>
                    <Link href={`/services/${s.slug}`} aria-label={s.title} onMouseEnter={() => onHover(i)} onFocus={() => onHover(i)} className="relative -ml-10 -mt-9 flex w-20 flex-col items-center">
                      {on && <span className="absolute left-1/2 top-0 h-[3.6rem] w-[3.6rem] -translate-x-1/2 animate-ping rounded-full bg-navy-600/25" />}
                      <span className={`relative flex h-14 w-14 items-center justify-center rounded-full ring-1 transition-all duration-500 ${on ? "scale-125 bg-navy-600 text-white shadow-[0_0_0_8px_rgba(0,58,242,0.12),0_18px_40px_rgba(0,58,242,0.35)] ring-navy-600" : "bg-white text-navy-600 shadow-lg ring-navy-600/20 hover:scale-110"}`}><Icon name={s.icon} className="h-6 w-6" /></span>
                      <span className={`mt-2 whitespace-nowrap text-xs font-semibold transition-colors duration-300 ${on ? "text-navy-900" : "text-navy-900/60"}`}>{keys[i]}</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <Core />
    </div>
  );
}

// Design 1: all six services orbit the logo. The highlight moves round by itself, and the card beside it follows.
export function Glance1() {
  const [paused, setPaused] = useState(false);
  const [a, setA] = useCycle(paused);
  const hover = (i) => { setPaused(true); setA(i); };
  return (
    <Shell id="gl-1" tag="Glance 1 · Auto-spotlight">
      <div className={`${wrap} grid items-center gap-12 py-28 lg:grid-cols-12`} onMouseLeave={() => setPaused(false)}>
        <div className="lg:col-span-6">
          <Reveal><DetailTab className="text-navy-600">What we offer.</DetailTab></Reveal>
          <h2 className="mt-6 text-balance text-4xl font-bold leading-[1.05] text-navy-900 sm:text-6xl">Everything you need, <span className="shine-text">in one orbit.</span></h2>
          <p className="mt-5 max-w-md text-lg text-muted">Six disciplines working around your business. Watch them in turn, or point at one.</p>
          <div className="mt-8"><Info i={a} /></div>
          <Dots a={a} setA={hover} />
        </div>
        <div className="lg:col-span-6"><Orbit a={a} onHover={hover} onLeave={() => setPaused(false)} /></div>
      </div>
    </Shell>
  );
}

// Design 2: one ring turns slowly. Whichever service passes the top gets the spotlight and its details.
export function Glance2() {
  const group = useRef(null);
  const nodes = useRef([]);
  const labels = useRef([]);
  const pausedRef = useRef(false);
  const angle = useRef(0);
  const [a, setA] = useState(0);
  const lastA = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf, prev = performance.now();
    function frame(t) {
      const dt = t - prev; prev = t;
      if (!pausedRef.current && !reduce) angle.current = (angle.current - dt * 0.011 + 360) % 360;
      if (group.current) group.current.style.transform = `rotate(${angle.current}deg)`;
      let best = 0, bestD = 999;
      services.forEach((_, i) => {
        // How many degrees this service is away from the top of the ring (0 means exactly at the top).
        const off = Math.abs((((i * 60 + angle.current) % 360) + 540) % 360 - 180);
        if (off < bestD) { bestD = off; best = i; }
        const k = Math.max(0, 1 - off / 45);
        if (nodes.current[i]) nodes.current[i].style.transform = `rotate(${-(i * 60 + angle.current)}deg) scale(${1 + 0.35 * k})`;
        if (labels.current[i]) labels.current[i].style.opacity = String(0.55 + 0.45 * k);
      });
      if (!pausedRef.current && best !== lastA.current) { lastA.current = best; setA(best); }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  function hover(i) {
    pausedRef.current = true;
    lastA.current = i;
    setA(i);
  }
  function leave() { pausedRef.current = false; }

  return (
    <Shell id="gl-2" tag="Glance 2 · Rotating ring">
      <div className={`${wrap} grid items-center gap-12 py-28 lg:grid-cols-12`}>
        <div className="lg:order-2 lg:col-span-6">
          <Reveal><DetailTab className="text-navy-600">What we offer.</DetailTab></Reveal>
          <h2 className="mt-6 text-balance text-4xl font-bold leading-[1.05] text-navy-900 sm:text-6xl">One ring. <span className="shine-text">Six specialists.</span></h2>
          <p className="mt-5 max-w-md text-lg text-muted">The ring keeps turning, and each discipline takes its moment at the top.</p>
          <div className="mt-8"><Info i={a} /></div>
        </div>
        <div className="lg:order-1 lg:col-span-6" onMouseLeave={leave}>
          <div className="relative mx-auto aspect-square w-[min(90vw,560px)]" style={{ "--s": "min(90vw, 560px)" }}>
            <span className="absolute inset-[7%] rounded-full border border-navy-600/20" />
            <span className="absolute inset-[22%] rounded-full border border-dashed border-navy-600/20" />
            <span className="pointer-events-none absolute left-1/2 top-[1%] z-20 -translate-x-1/2 text-xs font-bold text-navy-600" aria-hidden="true">▼</span>
            <div ref={group} className="absolute inset-0" style={{ willChange: "transform" }}>
              {services.map((s, i) => (
                <div key={s.slug} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${i * 60}deg) translateY(calc(var(--s) * -0.43))` }}>
                  <div ref={(el) => (nodes.current[i] = el)}>
                    <Link href={`/services/${s.slug}`} aria-label={s.title} onMouseEnter={() => hover(i)} onFocus={() => hover(i)} className="-ml-10 -mt-9 flex w-20 flex-col items-center">
                      <span className={`flex h-14 w-14 items-center justify-center rounded-full shadow-xl ring-1 transition-colors duration-300 ${a === i ? "bg-navy-600 text-white ring-navy-600 shadow-[0_0_0_8px_rgba(0,58,242,0.12),0_18px_40px_rgba(0,58,242,0.35)]" : "bg-white text-navy-600 ring-navy-600/20"}`}><Icon name={s.icon} className="h-6 w-6" /></span>
                      <span ref={(el) => (labels.current[i] = el)} className="mt-2 whitespace-nowrap text-xs font-semibold text-navy-900">{keys[i]}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <Core />
          </div>
        </div>
      </div>
    </Shell>
  );
}

// Design 3: the orbit on one side and a list of all six on the other, so every description is visible at once.
export function Glance3() {
  const [paused, setPaused] = useState(false);
  const [a, setA] = useCycle(paused, 3800);
  const hover = (i) => { setPaused(true); setA(i); };
  return (
    <Shell id="gl-3" tag="Glance 3 · Orbit and list">
      <div className={`${wrap} grid items-center gap-12 py-28 lg:grid-cols-12`} onMouseLeave={() => setPaused(false)}>
        <div className="lg:col-span-6">
          <Reveal><DetailTab className="text-navy-600">What we offer.</DetailTab></Reveal>
          <h2 className="mt-6 text-balance text-4xl font-bold leading-[1.05] text-navy-900 sm:text-5xl">Six disciplines, <span className="shine-text">at a glance.</span></h2>
          <ol className="mt-8 space-y-2">
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
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <BigLearn href={`/services/${services[a].slug}`}>Learn more</BigLearn>
            <Link href="/services" className="text-sm font-semibold text-navy-600 hover:underline">All services →</Link>
          </div>
        </div>
        <div className="lg:col-span-6"><Orbit a={a} onHover={hover} onLeave={() => setPaused(false)} /></div>
      </div>
    </Shell>
  );
}
