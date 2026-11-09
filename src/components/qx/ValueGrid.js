"use client";

import { useEffect, useRef, useState } from "react";

// One statistic card with a coloured vertical line that draws itself down as you scroll.
function ValueCard({ big, small, text, color }) {
  const ref = useRef(null);
  const [p, setP] = useState(1);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    function update() {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setP(Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (vh * 0.3 + r.height * 0.5))));
      if (r.top < vh * 0.88) setShown(true);
    }
    setShown(el.getBoundingClientRect().top < window.innerHeight * 0.88);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div ref={ref} className={`relative flex min-h-[320px] flex-col justify-between bg-white p-7 pl-9 transition-all duration-700 ${shown ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
      <span className={`absolute inset-y-0 left-0 w-1.5 origin-top ${color}`} style={{ transform: `scaleY(${p})` }} />
      <div className="break-words text-4xl font-bold leading-[1.1] text-navy-900 sm:text-5xl lg:text-4xl">
        {big}<br />{small}
      </div>
      <p className="text-sm text-muted">{text}</p>
    </div>
  );
}

// The row of four statistic cards.
export default function ValueGrid({ items }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => <ValueCard key={it.text} {...it} />)}
    </div>
  );
}
