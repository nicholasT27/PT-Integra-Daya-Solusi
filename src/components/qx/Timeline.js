"use client";

import { useEffect, useRef, useState } from "react";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// A vertical timeline. A blue line draws itself down the page as you scroll, and each milestone lights up when the line reaches it.
export default function Timeline({ items }) {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    function update() {
      const r = ref.current.getBoundingClientRect();
      setP(clamp((window.innerHeight * 0.65 - r.top) / r.height));
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return (
    <div ref={ref} className="relative">
      <span className="absolute bottom-0 left-4 top-0 w-px bg-navy-600/15 lg:left-1/2" />
      <span className="absolute left-4 top-0 h-full w-[3px] -translate-x-px origin-top rounded-full bg-navy-600 lg:left-1/2" style={{ transform: `scaleY(${p})` }} />
      <ol className="space-y-14">
        {items.map((h, i) => {
          const on = p * items.length + 0.4 > i + 0.5;
          const right = i % 2 === 0;
          return (
            <li key={h.year} className="relative grid lg:grid-cols-2">
              <span className={`absolute left-4 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white transition-all duration-500 lg:left-1/2 ${on ? "scale-125 bg-navy-600 shadow-[0_0_0_6px_rgba(0,58,242,0.18)]" : "bg-navy-600/30"}`} />
              <div className={`pl-12 transition-all duration-700 lg:pl-0 ${right ? "lg:col-start-2 lg:pl-14" : "lg:col-start-1 lg:pr-14 lg:text-right"} ${on ? "translate-y-0 opacity-100" : "translate-y-6 opacity-25"}`}>
                <span className="text-5xl font-bold text-navy-600/25 sm:text-6xl">{h.year}</span>
                <h3 className="mt-1 text-2xl font-bold text-navy-900">{h.title}</h3>
                <p className={`mt-2 max-w-md text-muted ${right ? "" : "lg:ml-auto"}`}>{h.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
