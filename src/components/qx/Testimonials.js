"use client";

import { useEffect, useState } from "react";
import { DetailTab } from "@/components/quinn/Bits";
import { Reveal } from "@/components/quinn/Interactive";
import { testimonials } from "@/lib/site";

const SECONDS = 7;
const initials = (n) => n.split(" ").map((w) => w[0]).join("").slice(0, 2);

// The round avatar with initials, since we have no photos of the clients.
function Avatar({ name, size = "h-12 w-12", active = true }) {
  return <span className={`flex ${size} shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${active ? "bg-navy-600 text-white" : "bg-ice-100 text-navy-600"}`}>{initials(name)}</span>;
}

// A quote whose words appear one after another. A new "key" restarts it.
function WordQuote({ text, className = "" }) {
  return (
    <blockquote className={className}>
      &ldquo;{text.split(" ").map((w, i, all) => <span key={i} className="animate-rise inline-block" style={{ animationDelay: `${i * 45}ms`, marginRight: i < all.length - 1 ? "0.26em" : 0 }}>{w}</span>)}&rdquo;
    </blockquote>
  );
}

// The Testimonials section: the clients are listed on the left and their quote fills a large stage on the right.
// The quotes move on by themselves (a bar under the current client shows the time left) and pause while you point at
// the section. The arrows and the names let you jump to a quote yourself.
export default function Testimonials() {
  const [a, setA] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  const t = testimonials[a];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => setA((v) => (v + 1) % n), SECONDS * 1000);
    return () => clearTimeout(timer);
  }, [a, paused, n]);

  return (
    <section className="relative py-28" data-tone="#eaf0ff" data-glow="1">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal><DetailTab className="text-navy-600">Testimonials</DetailTab></Reveal>
            <Reveal><h2 className="mt-6 text-5xl font-bold leading-[1.05] text-navy-900 sm:text-6xl">Voices <span className="shine-text">of clients.</span></h2></Reveal>
            <div className="mt-10 space-y-2" role="tablist" aria-label="Clients">
              {testimonials.map((x, i) => (
                <button key={x.quote} type="button" role="tab" aria-selected={a === i} onMouseEnter={() => setA(i)} onFocus={() => setA(i)} onClick={() => setA(i)} className={`relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${a === i ? "translate-x-2 border-white bg-white shadow-xl" : "border-transparent hover:bg-white/60"}`}>
                  <Avatar name={x.name} active={a === i} />
                  <span className="text-sm text-muted"><strong className="block text-base text-navy-900">{x.name}</strong>{x.company}</span>
                  {a === i && <span key={`${a}-${paused}`} className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-navy-600" style={{ animation: paused ? "none" : `grow7 ${SECONDS}s linear both`, transform: paused ? "scaleX(1)" : undefined }} />}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="relative flex min-h-[440px] flex-col justify-between overflow-hidden rounded-[2rem] bg-navy-900 p-8 text-white shadow-2xl sm:p-14">
              <span className="orbit-slow pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-dashed border-white/20" />
              <span className="pointer-events-none absolute -bottom-32 -left-10 h-72 w-72 rounded-full bg-navy-600/40 blur-3xl" />
              <span className="relative text-8xl font-bold leading-none text-sky-300">&ldquo;</span>
              <div key={a} className="relative">
                <WordQuote text={t.quote} className="text-3xl font-semibold leading-snug sm:text-4xl" />
                <p className="animate-rise mt-8 text-sm text-white/70" style={{ animationDelay: "450ms" }}><strong className="text-white">{t.name}</strong>, {t.company}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-4">
                <button type="button" onClick={() => setA((a - 1 + n) % n)} aria-label="Previous testimonial" className="h-11 w-11 rounded-full border border-white/30 transition-colors hover:bg-white/10">←</button>
                <button type="button" onClick={() => setA((a + 1) % n)} aria-label="Next testimonial" className="h-11 w-11 rounded-full border border-white/30 transition-colors hover:bg-white/10">→</button>
                <div className="ml-2 flex gap-2" aria-hidden="true">{testimonials.map((_, i) => <span key={i} className={`h-1.5 rounded-full bg-sky-300 transition-all duration-500 ${a === i ? "w-12" : "w-3 opacity-30"}`} />)}</div>
                <span className="ml-auto text-sm font-semibold tabular-nums text-sky-300">0{a + 1} / 0{n}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
