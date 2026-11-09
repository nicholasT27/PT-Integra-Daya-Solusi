"use client";

import { useEffect, useRef, useState } from "react";

// A large sentence whose words light up one by one as you scroll down the page.
export default function RevealText({ text, className = "" }) {
  const ref = useRef(null);
  const [lit, setLit] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    function update() {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.45 + r.height * 0.6)));
      setLit(Math.round(p * words.length));
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [words.length]);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="transition-opacity duration-300" style={{ opacity: i < lit ? 1 : 0.22 }}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
