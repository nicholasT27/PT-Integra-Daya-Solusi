"use client";

import { useEffect, useRef, useState } from "react";

// Makes its content fade and slide up the first time it scrolls into view.
export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [state, setState] = useState("init");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    setState("hidden");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = state === "hidden" ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100";
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${cls} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// A number that counts up from zero when it scrolls into view.
export function CountUp({ to, className = "" }) {
  const ref = useRef(null);
  const [n, setN] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t) => {
        const k = Math.min(1, (t - start) / 1300);
        setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return <span ref={ref} className={className}>{n}</span>;
}

// A testimonial slider with arrows and dots. It also moves on by itself every few seconds.
export function TestimonialSlider({ items, dark = false }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const accent = dark ? "text-sky-300" : "text-navy-600";
  const btn = dark ? "border-white/30 hover:bg-white/10" : "border-navy-900/20 hover:bg-ice-50";

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [paused, items.length]);

  const go = (d) => setI((v) => (v + d + items.length) % items.length);
  const t = items[i];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div key={i} className="animate-rise min-h-[220px]">
        <blockquote className="text-2xl font-semibold leading-snug sm:text-4xl">&ldquo;{t.quote}&rdquo;</blockquote>
        <p className="mt-8 text-sm opacity-70"><strong>{t.name}</strong>, {t.company}</p>
      </div>
      <div className="mt-8 flex items-center gap-3">
        <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className={`h-11 w-11 rounded-full border ${btn}`}>←</button>
        <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className={`h-11 w-11 rounded-full border ${btn}`}>→</button>
        <div className="ml-4 flex gap-2">
          {items.map((_, n) => (
            <button key={n} type="button" onClick={() => setI(n)} aria-label={`Show testimonial ${n + 1}`} className={`h-2 rounded-full transition-all ${n === i ? `w-8 ${dark ? "bg-sky-300" : "bg-navy-600"}` : "w-2 bg-current opacity-30"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

// A thin line that draws itself from left to right when it scrolls into view.
export function DrawLine({ className = "bg-current", delay = 0 }) {
  const ref = useRef(null);
  const [on, setOn] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;
    setOn(false);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setOn(true);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`block h-px w-full origin-left transition-transform duration-[1400ms] ease-out ${on ? "scale-x-100" : "scale-x-0"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    />
  );
}
