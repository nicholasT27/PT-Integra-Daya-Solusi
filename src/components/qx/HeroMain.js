"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowButton } from "@/components/quinn/Bits";
import HeroPhoto from "./HeroPhoto";

// Keeps the headline word and the picture in step: moves to the next word every few seconds, and loops back to the
// start without a visible jump. "i" is the position (it goes one past the end before wrapping), "anim" says whether to animate.
function useWordCycle(count) {
  const [i, setI] = useState(0);
  const [anim, setAnim] = useState(true);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => {
      if (i === count) {
        setAnim(false);
        setI(0);
        requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
      } else {
        setI(i + 1);
      }
    }, anim ? 2600 : 50);
    return () => clearTimeout(t);
  }, [i, anim, count]);
  return { i, anim };
}

// A word that swaps for the next service word. The old word slides up and out, the new one slides in,
// and the box resizes smoothly so the rest of the sentence only shifts gently.
function WordSwap({ words, i, anim }) {
  const [widths, setWidths] = useState(null);
  const measureRef = useRef(null);
  const list = [...words, words[0]];

  useEffect(() => {
    const measure = () => {
      const kids = measureRef.current?.children;
      if (kids) setWidths([...kids].map((k) => k.getBoundingClientRect().width));
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const ease = "cubic-bezier(0.7, 0, 0.2, 1)";
  const width = widths ? widths[i % words.length] : undefined;
  return (
    <span className="relative inline-block overflow-hidden align-bottom" style={{ width, height: "1.2em", transition: anim ? `width 650ms ${ease}` : "none" }}>
      <span ref={measureRef} className="invisible absolute left-0 top-0 flex flex-col items-start whitespace-nowrap" aria-hidden="true">
        {words.map((w) => <span key={w}>{w}</span>)}
      </span>
      <span className="block" style={{ transform: `translateY(${-i * 1.2}em)`, transition: anim ? `transform 650ms ${ease}` : "none" }}>
        {list.map((w, n) => <span key={n} className="shine-text block h-[1.2em] whitespace-nowrap leading-[1.2]">{w}</span>)}
      </span>
    </span>
  );
}

// The main hero. Its background (glows, lines, cursor glow) is the page-wide backdrop, so this only holds the
// headline, whose words drift a little as the mouse moves. On touch screens the drift wanders by itself.
export default function HeroMain() {
  const ref = useRef(null);

  function setPointer(x, y) {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", String((x - 0.5) * 2));
    el.style.setProperty("--my", String((y - 0.5) * 2));
  }

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    setPointer((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
  }

  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf;
    const loop = (t) => {
      setPointer(0.5 + 0.32 * Math.sin(t / 2600), 0.45 + 0.25 * Math.cos(t / 3300));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const swapWords = ["insurance", "retirement", "legal", "tax", "engineering"];
  const cycle = useWordCycle(swapWords.length);
  // Each word is its own box with a margin after it (not a trailing space, which some browsers drop).
  const word = (node, i, cls = "") => (
    <span key={i} className={`mr-[0.26em] inline-block ${cls}`} style={{ transform: `translate(calc(var(--mx, 0) * ${((i % 3) - 1) * 6}px), calc(var(--my, 0) * ${((i % 2) - 0.5) * 6}px))`, transition: "transform 0.5s ease-out" }}>
      {node}
    </span>
  );

  return (
    <section
      id="hero-main"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[max(100vh,800px)] items-center overflow-x-clip"
      data-tone="#ffffff"
      data-glow="1"
      style={{ "--mx": 0, "--my": 0 }}
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-24 pt-36 sm:px-8 lg:grid-cols-12">
        <div className="max-lg:-mx-2 max-lg:rounded-[2rem] max-lg:bg-white/60 max-lg:p-6 max-lg:shadow-lg max-lg:ring-1 max-lg:ring-white max-lg:backdrop-blur-md lg:col-span-7">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-navy-600">
          <span className="h-2 w-2 animate-pulse rounded-full bg-navy-600" /> PT Integra Daya Solusi
        </p>

        {/* The real headline sits on top of hidden copies using the widest words, so the space below never jumps. */}
        <div className="mt-6 grid">
          <h1 aria-label="Risk, insurance and business advice, brought together." className="[grid-area:1/1] text-5xl max-[359px]:text-[2.5rem] font-bold leading-[1.1] text-navy-900 sm:text-6xl">
            <span aria-hidden="true">
              {word("Risk,", 0)}
              {word(<WordSwap words={swapWords} i={cycle.i} anim={cycle.anim} />, 1)}
              {word("and", 2)}
              {word("business", 3)}
              {word("advice,", 4)}
              {word("brought", 5, "text-navy-600")}
              {word("together.", 6, "text-navy-600")}
            </span>
          </h1>
          {["retirement", "engineering"].map((w) => (
            <p key={w} aria-hidden="true" className="invisible [grid-area:1/1] text-5xl max-[359px]:text-[2.5rem] font-bold leading-[1.1] text-navy-900 sm:text-6xl">
              Risk, {w} and business advice, brought together.
            </p>
          ))}
        </div>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-navy-900/80">
          A Jakarta consultancy of insurance, risk, legal, finance and engineering specialists, simplifying complexity so you can focus on what matters most.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <ArrowButton href="/contact">Contact us</ArrowButton>
          <Link href="/services" className="inline-flex items-center rounded-full border border-navy-900/20 bg-white/60 px-7 py-3 text-sm font-semibold text-navy-900 hover:bg-white">Our services</Link>
        </div>
        </div>
        <div className="pb-6 lg:col-span-5"><HeroPhoto active={cycle.i % swapWords.length} /></div>
      </div>
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-navy-600" aria-hidden="true">
        Scroll <span className="nudge text-base">↓</span>
      </div>
    </section>
  );
}
