"use client";

import { useState } from "react";
import HeroMain from "./HeroMain";
import { PhotoArch, PhotoDeck, PhotoRing } from "./PhotoVisuals";

// The real hero with a switcher at the bottom to try each photo layout beside the headline.
export default function HeroPhotoPreview() {
  const [v, setV] = useState(0);
  const options = [["Arch", PhotoArch], ["Deck", PhotoDeck], ["Ring", PhotoRing]];
  return (
    <>
      <HeroMain key={v} Visual={options[v][1]} />
      <div className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full bg-navy-900 px-3 py-2 text-white shadow-2xl">
        <span className="hidden px-2 text-xs font-semibold uppercase tracking-widest text-sky-300 sm:inline">Photo layout</span>
        {options.map(([n], i) => <button key={n} type="button" onClick={() => setV(i)} aria-pressed={v === i} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${v === i ? "bg-white text-navy-900" : "hover:bg-white/15"}`}>{i + 1} · {n}</button>)}
      </div>
    </>
  );
}
