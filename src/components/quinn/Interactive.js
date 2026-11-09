"use client";

import Image from "next/image";
import Link from "next/link";
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

// A thin bar at the very top of the page that fills as you scroll down.
export function ScrollProgress({ dark = false }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1" aria-hidden="true">
      <div className={`h-full origin-left ${dark ? "bg-sky-300" : "bg-navy-600"}`} style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}

// A background photo that moves slower than the page, giving a sense of depth.
export function ParallaxBg({ src }) {
  const ref = useRef(null);
  useEffect(() => {
    function update() {
      if (ref.current) ref.current.style.transform = `translateY(${Math.min(window.scrollY, 900) * 0.25}px) scale(1.12)`;
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div ref={ref} className="absolute inset-0 -z-20 will-change-transform">
      <Image src={src} alt="" fill priority className="object-cover" />
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

// The numbered service list. Click or tap a row to open it and see what it covers.
export function ServiceAccordion({ services, dark = false }) {
  const [open, setOpen] = useState(0);
  const line = dark ? "border-white/15" : "border-navy-900/15";
  const accent = dark ? "text-sky-300" : "text-navy-600";
  const soft = dark ? "text-white/70" : "text-muted";

  return (
    <ol className={`mt-16 border-t ${line}`}>
      {services.map((s, i) => {
        const isOpen = open === i;
        return (
          <li key={s.slug} className={`border-b ${line}`}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center gap-4 py-6 text-left md:gap-8"
            >
              <span className={`w-8 text-lg font-semibold ${accent}`}>{i + 1}</span>
              <span className={`flex-1 text-2xl font-semibold transition-all duration-300 group-hover:translate-x-2 sm:text-3xl ${isOpen ? `translate-x-2 ${accent}` : ""}`}>{s.title}</span>
              <span className={`flex h-10 w-10 items-center justify-center rounded-full border text-xl transition-transform duration-300 ${line} ${accent} ${isOpen ? "rotate-45" : ""}`}>+</span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <div className="grid gap-8 pb-8 pl-12 md:grid-cols-2 md:pl-16">
                  <p className={`max-w-md leading-relaxed ${soft}`}>{s.intro}</p>
                  <div>
                    <ul className="space-y-2 text-sm">
                      {s.offerings.slice(0, 4).map((o) => (
                        <li key={o} className="flex gap-2"><span className={accent}>•</span> {o}</li>
                      ))}
                    </ul>
                    <Link href={`/services/${s.slug}`} className={`mt-5 inline-block text-sm font-semibold ${accent} hover:underline`}>
                      View service →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
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

// A list of articles. Hover or tap one to preview it in the big card on the right.
export function InsightPicker({ posts }) {
  const [a, setA] = useState(0);
  const p = posts[a];
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <ul className="divide-y divide-white/15 border-y border-white/15">
        {posts.map((x, n) => (
          <li key={x.slug}>
            <button
              type="button"
              onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setA(n)}
              onClick={() => setA(n)}
              className={`flex w-full items-center justify-between gap-4 py-5 text-left transition-all duration-300 ${n === a ? "translate-x-2 text-white" : "text-white/55"}`}
            >
              <span className="text-lg font-semibold">{x.title}</span>
              <span className="text-sky-300">{n === a ? "●" : "○"}</span>
            </button>
          </li>
        ))}
      </ul>
      <Link key={p.slug} href={`/insights/${p.slug}`} className="animate-rise group flex flex-col justify-between rounded-3xl bg-navy-600 p-8 transition hover:bg-navy-700">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Featured · {p.category}</p>
          <h3 className="mt-6 text-2xl font-semibold leading-snug">{p.title}</h3>
          <p className="mt-4 text-white/80">{p.summary}</p>
        </div>
        <p className="mt-10 text-sm font-semibold">Read article <span className="inline-block transition-transform group-hover:translate-x-2">→</span></p>
      </Link>
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

// A thin line down the left edge of the screen that fills as you scroll down the page.
export function ScrollLine() {
  const [p, setP] = useState(0);
  useEffect(() => {
    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="pointer-events-none fixed bottom-0 left-4 top-0 z-40 hidden w-px bg-sky-300/25 xl:block" aria-hidden="true">
      <div className="h-full w-full origin-top bg-sky-300" style={{ transform: `scaleY(${p})` }} />
      <span className="absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-white shadow" style={{ top: `calc(${p * 100}% - 4px)` }} />
    </div>
  );
}
