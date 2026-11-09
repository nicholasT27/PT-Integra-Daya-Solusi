"use client";

import { useEffect, useState } from "react";
import { DetailTab } from "@/components/quinn/Bits";
import { Reveal } from "@/components/quinn/Interactive";
import { testimonials } from "@/lib/site";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";

// Turns a name like "Operations Manager" into round-avatar initials ("OM").
const initials = (n) => n.split(" ").map((w) => w[0]).join("").slice(0, 2);

// A small tag in the corner naming each option.
function Tag({ children }) {
  return <span className="absolute left-4 top-24 z-20 rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-white shadow">{children}</span>;
}

// The round avatar with initials, since we have no photos of the clients.
function Avatar({ name, size = "h-14 w-14", dark = false }) {
  return <span className={`flex ${size} shrink-0 items-center justify-center rounded-full text-sm font-bold ${dark ? "bg-white/15 text-white" : "bg-navy-600 text-white"}`}>{initials(name)}</span>;
}

// A quote whose words appear one after another. A new "key" restarts it.
function WordQuote({ text, className = "" }) {
  return (
    <blockquote className={className}>
      &ldquo;{text.split(" ").map((w, i, all) => <span key={i} className="animate-rise inline-block" style={{ animationDelay: `${i * 45}ms`, marginRight: i < all.length - 1 ? "0.26em" : 0 }}>{w}</span>)}&rdquo;
    </blockquote>
  );
}

// Option 1: one big quote at a time. It advances by itself, with a bar showing the time left, and can be moved by hand.
export function TestiSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((v) => (v + 1) % n), 7000);
    return () => clearTimeout(t);
  }, [i, paused, n]);
  const t = testimonials[i];
  return (
    <section className="relative py-32" data-tone="#eaf0ff" data-glow="1">
      <Tag>Testimonials 1 · Big quote</Tag>
      <div className={wrap} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <Reveal><DetailTab className="text-navy-600">Testimonials</DetailTab></Reveal>
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <span className="text-[10rem] font-bold leading-[0.7] text-navy-600 lg:col-span-2" aria-hidden="true">&ldquo;</span>
          <div className="lg:col-span-10">
            <div key={i} className="min-h-[230px]">
              <WordQuote text={t.quote} className="text-3xl font-semibold leading-snug text-navy-900 sm:text-5xl" />
              <div className="animate-rise mt-8 flex items-center gap-4" style={{ animationDelay: "500ms" }}>
                <Avatar name={t.name} />
                <p className="text-sm text-muted"><strong className="block text-base text-navy-900">{t.name}</strong>{t.company}</p>
              </div>
            </div>
            <div className="mt-10 flex items-center gap-5">
              <button type="button" onClick={() => setI((i - 1 + n) % n)} aria-label="Previous testimonial" className="h-12 w-12 rounded-full border border-navy-900/20 hover:bg-white">←</button>
              <button type="button" onClick={() => setI((i + 1) % n)} aria-label="Next testimonial" className="h-12 w-12 rounded-full border border-navy-900/20 hover:bg-white">→</button>
              <div className="flex flex-1 gap-2">
                {testimonials.map((_, k) => (
                  <button key={k} type="button" onClick={() => setI(k)} aria-label={`Show testimonial ${k + 1}`} className="h-1.5 flex-1 overflow-hidden rounded-full bg-navy-600/15">
                    <span key={`${k}-${i}`} className="block h-full origin-left rounded-full bg-navy-600" style={k < i ? { transform: "scaleX(1)" } : k === i ? { animation: paused ? "none" : "grow7 7s linear both", transform: paused ? "scaleX(1)" : undefined } : { transform: "scaleX(0)" }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes grow7 { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
    </section>
  );
}

// Option 2: a deck of cards. The front card is read, and the next one comes forward when you click or press the arrow.
export function TestiDeck() {
  const [a, setA] = useState(0);
  const n = testimonials.length;
  const next = () => setA((v) => (v + 1) % n);
  return (
    <section className="relative overflow-x-clip py-32" data-tone="#dde7ff" data-glow="1.1">
      <Tag>Testimonials 2 · Card deck</Tag>
      <div className={`${wrap} grid items-center gap-14 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <Reveal><DetailTab className="text-navy-600">Testimonials</DetailTab></Reveal>
          <Reveal><h2 className="mt-6 text-balance text-5xl font-bold leading-[1.05] text-navy-900 sm:text-6xl">What our clients <span className="shine-text">say.</span></h2></Reveal>
          <Reveal delay={120}><p className="mt-5 max-w-sm text-muted">Click the card, or use the arrow, to bring the next one forward.</p></Reveal>
          <div className="mt-8 flex items-center gap-4">
            <button type="button" onClick={next} aria-label="Next testimonial" className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-600 text-xl text-white shadow-xl transition-transform hover:scale-105">→</button>
            <span className="text-sm font-semibold tabular-nums text-navy-600">0{a + 1} / 0{n}</span>
          </div>
        </div>
        <div className="relative mx-auto h-[440px] w-full max-w-[520px] [--dx:10px] sm:[--dx:26px] lg:col-span-7" style={{ perspective: "1200px" }}>
          {testimonials.map((t, i) => {
            const rank = (i - a + n) % n;
            return (
              <button key={t.quote} type="button" onClick={next} aria-hidden={rank !== 0} tabIndex={rank === 0 ? 0 : -1} className="absolute inset-x-0 top-0 block w-full rounded-[2rem] border border-white bg-white p-8 text-left shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] sm:p-10" style={{ transform: `translate(calc(${rank} * var(--dx)), ${rank * 34}px) rotate(${rank * 3}deg) scale(${1 - rank * 0.05})`, opacity: 1 - rank * 0.25, zIndex: n - rank, background: rank === 0 ? "#ffffff" : rank === 1 ? "#eef3ff" : "#dce7ff" }}>
                <span className="text-7xl font-bold leading-none text-navy-600">&ldquo;</span>
                <p className="mt-2 text-2xl font-semibold leading-snug text-navy-900">{t.quote}</p>
                <span className="mt-8 flex items-center gap-4"><Avatar name={t.name} /><span className="text-sm text-muted"><strong className="block text-base text-navy-900">{t.name}</strong>{t.company}</span></span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Option 3: two rows of quote cards drift past in opposite directions all the time. They pause when you point at them.
export function TestiWall() {
  const row = [...testimonials, ...testimonials, ...testimonials, ...testimonials];
  const card = (t, i) => (
    <figure key={i} className="w-[380px] shrink-0 rounded-3xl border border-white bg-white/75 p-7 shadow-lg backdrop-blur-xl transition-transform duration-300 hover:-translate-y-2">
      <span className="text-5xl font-bold leading-none text-navy-600">&ldquo;</span>
      <blockquote className="mt-1 text-lg font-semibold leading-snug text-navy-900">{t.quote}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3"><Avatar name={t.name} size="h-10 w-10" /><span className="text-xs text-muted"><strong className="block text-sm text-navy-900">{t.name}</strong>{t.company}</span></figcaption>
    </figure>
  );
  return (
    <section className="relative overflow-hidden py-32" data-tone="#e4ecff" data-glow="1.05">
      <Tag>Testimonials 3 · Quote wall</Tag>
      <div className={wrap}>
        <Reveal><DetailTab className="text-navy-600">Testimonials</DetailTab></Reveal>
        <Reveal><h2 className="mt-6 max-w-2xl text-balance text-5xl font-bold leading-[1.05] text-navy-900 sm:text-6xl">Trusted by teams <span className="shine-text">across Jakarta.</span></h2></Reveal>
      </div>
      <div className="mt-14 space-y-5" style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
        <div className="marquee flex gap-5" style={{ animationDuration: "55s" }}>{row.map(card)}</div>
        <div className="marquee flex gap-5" style={{ animationDuration: "70s", animationDirection: "reverse" }}>{[...row].reverse().map(card)}</div>
      </div>
    </section>
  );
}

// Option 4: the people on the left, the quote on a large stage on the right. Point at a name and the quote changes.
export function TestiStage() {
  const [a, setA] = useState(0);
  const t = testimonials[a];
  return (
    <section className="relative py-32" data-tone="#dce7ff" data-glow="1.15">
      <Tag>Testimonials 4 · Voices</Tag>
      <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
        <div className="lg:col-span-4">
          <Reveal><DetailTab className="text-navy-600">Testimonials</DetailTab></Reveal>
          <Reveal><h2 className="mt-6 text-5xl font-bold leading-[1.05] text-navy-900 sm:text-6xl">Voices <span className="shine-text">of clients.</span></h2></Reveal>
          <div className="mt-10 space-y-2" role="tablist" aria-label="Clients">
            {testimonials.map((x, i) => (
              <button key={x.quote} type="button" role="tab" aria-selected={a === i} onMouseEnter={() => setA(i)} onFocus={() => setA(i)} onClick={() => setA(i)} className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${a === i ? "translate-x-2 border-white bg-white shadow-xl" : "border-transparent hover:bg-white/60"}`}>
                <Avatar name={x.name} size="h-12 w-12" dark={a !== i} />
                <span className="text-sm text-muted"><strong className="block text-base text-navy-900">{x.name}</strong>{x.company}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="relative lg:col-span-8">
          <div className="relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[2rem] bg-navy-900 p-8 text-white shadow-2xl sm:p-14">
            <span className="orbit-slow pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-dashed border-white/20" />
            <span className="pointer-events-none absolute -bottom-32 -left-10 h-72 w-72 rounded-full bg-navy-600/40 blur-3xl" />
            <span className="relative text-8xl font-bold leading-none text-sky-300">&ldquo;</span>
            <div key={a} className="relative">
              <WordQuote text={t.quote} className="text-3xl font-semibold leading-snug sm:text-4xl" />
              <p className="animate-rise mt-8 text-sm text-white/70" style={{ animationDelay: "450ms" }}><strong className="text-white">{t.name}</strong>, {t.company}</p>
            </div>
            <div className="relative mt-8 flex gap-2" aria-hidden="true">{testimonials.map((_, i) => <span key={i} className={`h-1.5 rounded-full bg-sky-300 transition-all duration-500 ${a === i ? "w-12" : "w-3 opacity-30"}`} />)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
