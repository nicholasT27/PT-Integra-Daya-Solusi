"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DrawLine } from "@/components/quinn/Interactive";
import FlowLines from "./FlowLines";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// The service list. The row nearest the middle of the screen lights up and opens as you scroll past it.
export function ServiceScroll({ services }) {
  const refs = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    function update() {
      const mid = window.innerHeight * 0.5;
      let best = 0, bestD = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      setActive(best);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <ol>
      {services.map((s, i) => {
        const on = active === i;
        return (
          <li key={s.slug} ref={(el) => (refs.current[i] = el)} className="relative">
            <DrawLine className="bg-navy-900/20" delay={i * 70} />
            <Link href={`/services/${s.slug}`} className="grid items-center gap-3 py-9 md:grid-cols-12 md:gap-6">
              <span className={`text-xl font-semibold transition-colors duration-500 md:col-span-1 ${on ? "text-navy-600" : "text-navy-900/25"}`}>{i + 1}</span>
              <h3 className={`text-3xl font-bold leading-tight transition-all duration-500 sm:text-5xl md:col-span-6 ${on ? "translate-x-3 text-navy-900" : "text-navy-900/20"}`}>{s.title}</h3>
              <p className={`text-sm leading-relaxed text-muted transition-all duration-500 md:col-span-4 ${on ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>{s.short}</p>
              <span className={`hidden text-3xl text-navy-600 transition-all duration-500 md:col-span-1 md:block md:justify-self-end ${on ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}`}>→</span>
            </Link>
            {i === services.length - 1 && <DrawLine className="bg-navy-900/20" delay={500} />}
          </li>
        );
      })}
    </ol>
  );
}

// A tall scene: a huge logo outline draws itself as you scroll, while a card stays in view over it.
export function AboutScene({ paths, viewBox, children }) {
  const ref = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    function update() {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setP(clamp(-r.top / (r.height - window.innerHeight)));
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const draw = clamp(p * 1.5);
  return (
    <section ref={ref} className="relative h-[230vh] bg-ice-50">
      <div className="mesh sticky top-0 isolate h-screen overflow-hidden">
        <FlowLines className="-z-10" color="#003af2" opacity={0.25} />
        <svg viewBox={viewBox} className="absolute left-1/2 top-1/2 w-[min(92%,1150px)] -translate-x-1/2 -translate-y-1/2" style={{ transform: `translate(-50%, -50%) scale(${0.9 + 0.12 * p})` }} fill="#003af2" stroke="#003af2" aria-hidden="true">
          {paths.map((d, i) => (
            <path key={i} d={d} pathLength="1" strokeWidth="2" strokeOpacity="0.55" vectorEffect="non-scaling-stroke" strokeLinejoin="round" style={{ strokeDasharray: 1, strokeDashoffset: 1 - draw, fillOpacity: clamp((p - 0.5) * 2.4) * 0.1 }} />
          ))}
        </svg>
        <div className="relative mx-auto flex h-full max-w-6xl items-center px-5 sm:px-8">
          <div className="max-w-xl rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur-md sm:p-12" style={{ opacity: clamp(p * 6), transform: `translateY(${(1 - clamp(p * 6)) * 50}px)` }}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

// Moves its content up or down slower than the page as you scroll, for a feeling of depth.
export function ScrollShift({ speed = 0.15, children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    function update() {
      const el = ref.current;
      if (!el) return;
      const r = el.parentElement.getBoundingClientRect();
      el.style.transform = `translateY(${(r.top + r.height / 2 - window.innerHeight / 2) * -speed}px)`;
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [speed]);
  return <div ref={ref} className={className}>{children}</div>;
}
