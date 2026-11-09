"use client";

import { useState } from "react";
import { GlanceE } from "./Glance2";

// Shows the wired section with a small switcher at the bottom of the screen to try each button design.
export default function CtaPreview() {
  const [v, setV] = useState(1);
  const names = ["Pill + shine", "Glow gradient", "Magnetic outline", "Round badge"];
  return (
    <>
      <GlanceE cta={v} />
      <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-navy-900 px-3 py-2 text-white shadow-2xl">
        <span className="hidden px-2 text-xs font-semibold uppercase tracking-widest text-sky-300 sm:inline">CTA style</span>
        {names.map((n, i) => (
          <button key={n} type="button" onClick={() => setV(i + 1)} aria-pressed={v === i + 1} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${v === i + 1 ? "bg-white text-navy-900" : "hover:bg-white/15"}`}>
            {i + 1} · {n}
          </button>
        ))}
      </div>
    </>
  );
}
