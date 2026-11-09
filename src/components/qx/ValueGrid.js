"use client";

import { useEffect, useRef, useState } from "react";

// How tall each card is on wide screens. The bottoms line up and the tops step down, like a staircase.
const heights = ["lg:min-h-[480px]", "lg:min-h-[400px]", "lg:min-h-[320px]", "lg:min-h-[260px]"];

// A live clock for Jakarta time, shown inside the Jakarta card when it opens.
function JakartaClock() {
  const [t, setT] = useState(null);
  useEffect(() => {
    const f = () => setT(new Date());
    f();
    const i = setInterval(f, 1000);
    return () => clearInterval(i);
  }, []);
  const time = t ? new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hour12: false }).format(t) : "--:--";
  return <p className="text-3xl font-semibold tabular-nums">{time}<span className="ml-2 text-xs font-semibold uppercase tracking-widest opacity-70">Jakarta now</span></p>;
}

// One statistic card. It tilts in 3D towards the cursor with a light that follows it. When opened (by pointing,
// tapping or keyboard focus) a blue fill rises from the bottom, the text turns light and extra detail unfolds.
function ValueCard({ big, small, text, color, tall, fill, light, more, clock, open, setOpen, dim }) {
  const outer = useRef(null);
  const card = useRef(null);
  const [p, setP] = useState(1);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const el = outer.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    function update() {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setP(Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.3 + r.height * 0.5))));
      if (r.top < vh * 0.9) setShown(true);
    }
    setShown(el.getBoundingClientRect().top < window.innerHeight * 0.9);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  function move(e) {
    const r = card.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.current.style.setProperty("--ry", String((x - 0.5) * 10));
    card.current.style.setProperty("--rx", String(-(y - 0.5) * 8));
    card.current.style.setProperty("--gx", `${x * 100}%`);
    card.current.style.setProperty("--gy", `${y * 100}%`);
  }
  function leave() {
    card.current.style.setProperty("--rx", "0");
    card.current.style.setProperty("--ry", "0");
  }

  const ink = open && light ? "text-white" : "text-navy-900";
  return (
    <div ref={outer} className={`relative flex min-h-[240px] flex-col transition-all duration-700 ${tall} ${shown ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`} style={{ opacity: shown ? (dim ? 0.55 : 1) : 0, perspective: "1000px" }}>
      <div
        ref={card}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setOpen(true)}
        onMouseMove={move}
        onMouseLeave={() => { leave(); window.matchMedia("(hover: hover)").matches && setOpen(false); }}
        onFocus={(e) => e.target.matches(":focus-visible") && setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => !window.matchMedia("(hover: hover)").matches && setOpen(!open)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(!open); } }}
        className="relative flex flex-1 cursor-pointer flex-col justify-between overflow-hidden bg-white p-7 pl-10 outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
        style={{ "--rx": 0, "--ry": 0, "--gx": "50%", "--gy": "30%", transform: `translateY(${open ? -8 : 0}px) rotateX(calc(var(--rx) * 1deg)) rotateY(calc(var(--ry) * 1deg))`, transition: "transform 0.25s ease-out, box-shadow 0.4s", boxShadow: open ? "0 40px 70px -24px rgba(0,32,112,0.5)" : "0 20px 50px -20px rgba(0,32,112,0.25)" }}
      >
        {/* The blue fill that rises from the bottom */}
        <span className={`pointer-events-none absolute inset-0 origin-bottom transition-transform duration-[650ms] ease-[cubic-bezier(0.7,0,0.2,1)] ${fill}`} style={{ transform: `scaleY(${open ? 1 : 0})` }} />
        {/* A light that follows the cursor */}
        <span className="pointer-events-none absolute inset-0 transition-opacity duration-300" style={{ opacity: open ? 1 : 0, background: `radial-gradient(260px circle at var(--gx) var(--gy), ${light ? "rgba(255,255,255,0.28)" : "rgba(0,58,242,0.14)"}, transparent 70%)` }} />
        <span className={`absolute inset-y-0 left-0 z-10 origin-top transition-[width] duration-500 ${open ? "w-3" : "w-2"} ${color}`} style={{ transform: `scaleY(${p})`, transformOrigin: "top" }} />
        <span className={`absolute right-6 top-6 z-10 flex h-7 w-7 items-center justify-center rounded-tr-lg border-r border-t text-sm transition-all duration-500 ${open ? `rotate-0 ${light ? "border-white/60 text-white" : "border-navy-600 text-navy-600"}` : "border-navy-900/20 text-transparent"}`} aria-hidden="true">{open ? "↗" : ""}</span>

        <div className={`relative z-10 text-5xl font-semibold leading-[1.1] tracking-tight transition-colors duration-500 sm:text-6xl lg:text-[2.7rem] ${ink}`}>
          {big}<br />{small}
        </div>

        <div className={`relative z-10 transition-colors duration-500 ${open && light ? "text-white/85" : "text-navy-900/75"}`}>
          <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden">
              <div className="pb-5">
                {clock && <div className={`mb-3 ${ink}`}><JakartaClock /></div>}
                <ul className="flex flex-wrap gap-2">
                  {more.map((m) => <li key={m} className={`rounded-full border px-3 py-1 text-xs font-semibold ${light ? "border-white/40 bg-white/10 text-white" : "border-navy-600/30 bg-white/60 text-navy-900"}`}>{m}</li>)}
                </ul>
              </div>
            </div>
          </div>
          <p className="text-sm">{text}</p>
        </div>
      </div>
    </div>
  );
}

// The row of four statistic cards, stepping down in height from left to right. Only one is open at a time.
export default function ValueGrid({ items }) {
  const [open, setOpen] = useState(-1);
  return (
    <div className="grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, i) => (
        <ValueCard key={it.text} {...it} tall={heights[i] ?? ""} open={open === i} dim={open !== -1 && open !== i} setOpen={(v) => setOpen(v ? i : open === i ? -1 : open)} />
      ))}
    </div>
  );
}
