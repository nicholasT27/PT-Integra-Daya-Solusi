"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowButton } from "@/components/quinn/Bits";
import FlowLines from "./FlowLines";

// The cursor-position styles used by several layers: how far to slide each layer as the mouse moves.
const shift = (k) => ({ transform: `translate(calc(var(--mx, 0) * ${k * 28}px), calc(var(--my, 0) * ${k * 20}px))`, transition: "transform 0.45s ease-out" });
const cursorMask = (r) => `radial-gradient(${r}px circle at var(--px) var(--py), black, transparent 70%)`;

// The main hero: a bright, airy page that reacts to the mouse. A glow and a dot pattern follow the cursor,
// the lines brighten near it, layers drift at different speeds, and the small photo tilts towards it.
// On touch screens, where there is no mouse, a soft glow wanders by itself.
export default function HeroMain() {
  const ref = useRef(null);

  function setPointer(x, y) {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--px", `${x * 100}%`);
    el.style.setProperty("--py", `${y * 100}%`);
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

  const lead = ["Risk,"];
  const rest = ["insurance", "and", "business", "advice,"];
  const accent = ["brought", "together."];
  const word = (w, i, cls = "") => (
    <span key={w} className={`inline-block ${cls}`} style={{ transform: `translate(calc(var(--mx, 0) * ${((i % 3) - 1) * 6}px), calc(var(--my, 0) * ${((i % 2) - 0.5) * 6}px))`, transition: "transform 0.5s ease-out" }}>
      {w}&nbsp;
    </span>
  );

  return (
    <section
      id="hero-main"
      ref={ref}
      onMouseMove={onMove}
      className="relative isolate flex min-h-[max(100vh,800px)] items-center overflow-hidden bg-white"
      style={{ "--px": "72%", "--py": "38%", "--mx": 0, "--my": 0 }}
    >
      {/* Soft colour glows that drift on their own and slide a little with the mouse */}
      <div className="absolute inset-0 -z-10" style={shift(0.8)}>
        <span className="drift absolute -right-20 -top-10 h-[480px] w-[480px] rounded-full bg-navy-600/30 blur-3xl" />
        <span className="drift absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-sky-300/70 blur-3xl" style={{ animationDelay: "-6s" }} />
        <span className="drift absolute bottom-[-120px] right-1/4 h-[380px] w-[380px] rounded-full bg-ice-100 blur-3xl" style={{ animationDelay: "-11s" }} />
      </div>

      {/* A glow that follows the cursor */}
      <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(560px circle at var(--px) var(--py), rgba(0,58,242,0.16), transparent 65%)" }} />

      {/* A dot pattern that is only visible around the cursor */}
      <div className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: "radial-gradient(#003af2 1.2px, transparent 1.2px)", backgroundSize: "26px 26px", maskImage: cursorMask(340), WebkitMaskImage: cursorMask(340) }} />

      {/* Two layers of flowing lines that drift in opposite directions as you move */}
      <div className="absolute inset-0 -z-10" style={shift(1)}><FlowLines color="#003af2" opacity={0.4} /></div>
      <div className="absolute inset-0 -z-10 scale-110" style={shift(-1.6)}><FlowLines color="#6f93ff" opacity={0.45} /></div>

      {/* The same lines again, drawn strongly but only visible near the cursor */}
      <div className="absolute inset-0 -z-10" style={{ ...shift(1), maskImage: cursorMask(300), WebkitMaskImage: cursorMask(300) }}><FlowLines color="#002070" opacity={0.9} /></div>

      <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-36 sm:px-8">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-navy-600">
          <span className="h-2 w-2 animate-pulse rounded-full bg-navy-600" /> PT Integra Daya Solusi
        </p>

        <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[1.1] text-navy-900 sm:text-7xl">
          {lead.map((w, i) => word(w, i))}
          {/* The small photo, shown well below its real size so it stays sharp. It tilts towards the cursor. */}
          <span className="mx-1 inline-block align-middle" style={{ transform: "perspective(500px) rotateY(calc(var(--mx, 0) * 16deg)) rotateX(calc(var(--my, 0) * -12deg))", transition: "transform 0.35s ease-out" }}>
            <span className="tilt relative block h-[0.9em] w-[1.7em] overflow-hidden rounded-full shadow-xl ring-4 ring-white">
              <Image src="/brand/skyscrapers.jpg" alt="" fill unoptimized sizes="140px" className="object-cover" />
            </span>
          </span>{" "}
          {rest.map((w, i) => word(w, i + 1))}
          {accent.map((w, i) => word(w, i + 5, "text-navy-600"))}
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
          A Jakarta consultancy of insurance, risk, legal, finance and engineering specialists, simplifying complexity so you can focus on what matters most.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <ArrowButton href="/contact">Contact us</ArrowButton>
          <Link href="/services" className="inline-flex items-center rounded-full border border-navy-900/20 bg-white/60 px-7 py-3 text-sm font-semibold text-navy-900 hover:bg-white">Our services</Link>
        </div>
      </div>
    </section>
  );
}
