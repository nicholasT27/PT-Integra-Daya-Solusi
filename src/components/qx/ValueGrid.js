"use client";

import { useEffect, useRef, useState } from "react";

// How tall each card is on wide screens. The bottoms line up and the tops step down, like a staircase.
const heights = ["lg:min-h-[480px]", "lg:min-h-[400px]", "lg:min-h-[320px]", "lg:min-h-[260px]"];

// One statistic card: a coloured bar draws itself down the left edge, the big figure sits at the top,
// the caption at the bottom, and a small corner mark at the top right.
function ValueCard({ big, small, text, color, tall }) {
  const ref = useRef(null);
  const [p, setP] = useState(1);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const el = ref.current;
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

  return (
    <div ref={ref} className={`group relative flex min-h-[240px] flex-col justify-between bg-white p-7 pl-10 shadow-[0_20px_50px_-20px_rgba(0,32,112,0.25)] transition-all duration-700 hover:-translate-y-2 ${tall} ${shown ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
      <span className={`absolute inset-y-0 left-0 w-2 origin-top ${color}`} style={{ transform: `scaleY(${p})` }} />
      <span className="absolute right-6 top-6 h-6 w-6 rounded-tr-lg border-r border-t border-navy-900/20 transition-colors duration-300 group-hover:border-navy-600" aria-hidden="true" />
      <div className="text-5xl font-semibold leading-[1.1] tracking-tight text-navy-900 sm:text-6xl">
        {big}<br />{small}
      </div>
      <p className="text-sm text-navy-900/75">{text}</p>
    </div>
  );
}

// The row of four statistic cards, stepping down in height from left to right.
export default function ValueGrid({ items }) {
  return (
    <div className="grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, i) => <ValueCard key={it.text} {...it} tall={heights[i] ?? ""} />)}
    </div>
  );
}
