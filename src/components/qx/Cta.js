"use client";

import Link from "next/link";
import { useRef } from "react";

// The big "Learn more" button. Four designs, chosen with the "variant" setting:
// 1 pill with a shine, 2 glowing gradient, 3 magnetic outline, 4 round badge with turning text.
export default function Cta({ variant = 1, href, children = "Learn more" }) {
  const ref = useRef(null);

  // Variant 3: the button drifts a little towards the cursor when it gets close.
  function move(e) {
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    ref.current.style.transform = `translate(${dx * 0.22}px, ${dy * 0.32}px)`;
  }
  function leave() {
    if (ref.current) ref.current.style.transform = "";
  }

  if (variant === 2) {
    return (
      <span className="relative inline-flex">
        <span className="cta-breathe absolute inset-0 rounded-full bg-navy-600/40" style={{ animation: "qxBreathe 2.6s ease-out infinite" }} aria-hidden="true" />
        <Link href={href} className="group relative inline-flex items-center gap-4 rounded-full py-2.5 pl-9 pr-2.5 text-lg font-semibold text-white shadow-[0_18px_40px_rgba(0,58,242,0.4)] transition-transform duration-300 hover:-translate-y-1" style={{ backgroundImage: "linear-gradient(110deg, #003af2, #5b86ff, #003af2, #002070)", backgroundSize: "250% 100%", animation: "qxShine 5s linear infinite" }}>
          {children}
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-navy-600">
            <span className="cta-nudge inline-block" style={{ animation: "qxNudgeX 1.4s ease-in-out infinite" }}>→</span>
          </span>
        </Link>
      </span>
    );
  }

  if (variant === 3) {
    return (
      <span className="-m-10 inline-block p-10" onMouseMove={move} onMouseLeave={leave}>
        <span ref={ref} className="inline-block transition-transform duration-200 ease-out">
          <Link href={href} className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border-2 border-navy-600 bg-white/60 px-10 py-4 text-lg font-semibold text-navy-600 backdrop-blur transition-colors duration-300 hover:text-white">
            <span className="absolute inset-0 origin-left scale-x-0 rounded-full bg-navy-600 transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden="true" />
            <span className="relative">{children}</span>
            <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
          </Link>
        </span>
      </span>
    );
  }

  if (variant === 4) {
    return (
      <Link href={href} aria-label={String(children)} className="group relative flex h-36 w-36 items-center justify-center rounded-full bg-navy-600 text-white shadow-[0_20px_50px_rgba(0,58,242,0.4)] transition-transform duration-300 hover:scale-105">
        <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" style={{ animation: "qxSpin 16s linear infinite" }} aria-hidden="true">
          <defs><path id="ctaCircle" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" /></defs>
          <text fontSize="11" fontWeight="700" letterSpacing="3.1" fill="white"><textPath href="#ctaCircle">LEARN MORE • LEARN MORE • </textPath></text>
        </svg>
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-navy-600 transition-transform duration-300 group-hover:-rotate-45">→</span>
      </Link>
    );
  }

  return (
    <Link href={href} className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-navy-600 py-2.5 pl-8 pr-2.5 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-2xl">
      <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 transition-transform duration-700 group-hover:translate-x-[450%]" aria-hidden="true" />
      <span className="relative">{children}</span>
      <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}
