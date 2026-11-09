"use client";

import { useEffect, useRef } from "react";
import FlowLines from "./FlowLines";

// Turns "#aabbcc" into three numbers so two colours can be blended.
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const smooth = (t) => t * t * (3 - 2 * t);

// The one background behind the whole home page. Instead of every section painting its own backdrop, this single
// fixed layer holds the drifting glows, flowing lines and the cursor glow. Its colour shifts gently as you scroll:
// each section says what tone it wants (data-tone) and the layer blends between them, so there are no seams.
export default function PageBackdrop() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;
    let pending = false;
    let raf = 0;
    let wander = 0;

    // Works out the blended colour and glow strength for the middle of the screen.
    function paint() {
      pending = false;
      const secs = [...document.querySelectorAll("[data-tone]")];
      if (!secs.length) return;
      const mid = window.innerHeight * 0.5;
      const centers = secs.map((s) => { const r = s.getBoundingClientRect(); return r.top + r.height / 2; });
      let i = centers.findIndex((c) => c > mid) - 1;
      if (i === -2) i = secs.length - 1;
      const a = secs[Math.max(i, 0)];
      const b = secs[Math.min(i + 1, secs.length - 1)];
      let t = 0;
      if (i >= 0 && i < secs.length - 1) t = smooth((mid - centers[i]) / (centers[i + 1] - centers[i]));
      const ca = rgb(a.dataset.tone), cb = rgb(b.dataset.tone);
      const c = ca.map((v, k) => Math.round(v + (cb[k] - v) * t));
      const g = Number(a.dataset.glow ?? 1) + (Number(b.dataset.glow ?? 1) - Number(a.dataset.glow ?? 1)) * t;
      el.style.setProperty("--bg", `rgb(${c[0]}, ${c[1]}, ${c[2]})`);
      el.style.setProperty("--g", String(g));
      el.style.setProperty("--sy", String(Math.sin(window.scrollY / 1100) * 160));
    }
    function onScroll() {
      if (!pending) { pending = true; raf = requestAnimationFrame(paint); }
    }
    function onMove(e) {
      el.style.setProperty("--px", `${e.clientX}px`);
      el.style.setProperty("--py", `${e.clientY}px`);
    }

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    if (!touch) window.addEventListener("mousemove", onMove);
    // Touch screens have no mouse, so the glow wanders by itself.
    if (touch && !reduce) {
      const loop = (t) => {
        el.style.setProperty("--px", `${window.innerWidth * (0.5 + 0.32 * Math.sin(t / 2600))}px`);
        el.style.setProperty("--py", `${window.innerHeight * (0.45 + 0.25 * Math.cos(t / 3300))}px`);
        wander = requestAnimationFrame(loop);
      };
      wander = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(wander);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const mask = (r) => `radial-gradient(${r}px circle at var(--px) var(--py), black, transparent 70%)`;
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" style={{ "--bg": "#ffffff", "--g": 1, "--sy": 0, "--px": "72vw", "--py": "30vh", backgroundColor: "var(--bg)" }}>
      {/* Soft colour glows that drift on their own and sway a little as you scroll */}
      <div className="absolute inset-0" style={{ opacity: "var(--g)", transform: "translate3d(0, calc(var(--sy) * 1px), 0)" }}>
        <span className="drift absolute -right-24 top-[4%] h-[520px] w-[520px] rounded-full bg-navy-600/25 blur-3xl" />
        <span className="drift absolute -left-32 top-[38%] h-[460px] w-[460px] rounded-full bg-sky-300/60 blur-3xl" style={{ animationDelay: "-6s" }} />
        <span className="drift absolute bottom-[-60px] right-[22%] h-[420px] w-[420px] rounded-full bg-sky-300/40 blur-3xl" style={{ animationDelay: "-11s" }} />
        <span className="drift absolute -bottom-20 -left-20 h-[360px] w-[360px] rounded-full bg-navy-600/15 blur-3xl" style={{ animationDelay: "-3s" }} />
      </div>

      {/* A glow that follows the cursor, and a dot pattern that only shows around it */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(560px circle at var(--px) var(--py), rgba(0,58,242,0.15), transparent 65%)" }} />
      <div className="absolute inset-0 opacity-55" style={{ backgroundImage: "radial-gradient(#003af2 1.2px, transparent 1.2px)", backgroundSize: "26px 26px", maskImage: mask(340), WebkitMaskImage: mask(340) }} />

      {/* Flowing lines, and the same lines drawn strongly only near the cursor */}
      <FlowLines color="#003af2" opacity={0.35} />
      <div className="absolute inset-0" style={{ maskImage: mask(300), WebkitMaskImage: mask(300) }}><FlowLines color="#002070" opacity={0.85} /></div>
    </div>
  );
}
