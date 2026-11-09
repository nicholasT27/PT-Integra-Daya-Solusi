"use client";

import Image from "next/image";
import Icon from "@/components/Icon";
import { heroPhotos } from "@/lib/site";

// One caption for each picture, in the same order as the headline words (insurance, retirement, legal, tax, engineering).
const captions = ["Protecting what you have built", "Planning for the long term", "Staying on the right side of the rules", "Clear books and smart planning", "Safer, smoother operations"];
const icons = ["shield", "clock", "scales", "calculator", "factory"];
const words = ["Insurance", "Retirement", "Legal", "Tax", "Engineering"];

// The five pictures stacked, with only the active one showing. They cross-fade with a slow zoom.
// The pictures come from "heroPhotos" in site.js.
function Fader({ active }) {
  return heroPhotos.map((p, i) => (
    <span key={p.alt} className="absolute inset-0 block overflow-hidden transition-all duration-[900ms]" style={{ opacity: active === i ? 1 : 0, transform: active === i ? "scale(1)" : "scale(1.08)" }} aria-hidden={active !== i}>
      <Image src={p.src} alt={p.alt} fill unoptimized sizes="400px" className="object-cover" style={{ objectPosition: p.pos, transform: `scale(${p.zoom})`, transformOrigin: p.pos }} />
    </span>
  ));
}

// The picture beside the headline: a tall arch-shaped photo that changes with the headline word, with a glass card on
// its corner naming the word, small dots showing which of the five is on, and a dashed ring turning behind it.
export default function HeroPhoto({ active = 0 }) {
  return (
    <div className="relative mx-auto w-full max-w-[400px] pb-8 pt-4">
      <span className="orbit-slow absolute right-0 top-0 h-48 w-48 rounded-full border border-dashed border-navy-600/30 sm:-right-6" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] shadow-2xl ring-4 ring-white">
        <Fader active={active} />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/35 via-transparent to-transparent" />
      </div>
      <div key={active} className="animate-rise absolute bottom-0 left-0 flex items-center gap-3 rounded-2xl border border-white bg-white/90 py-3 pl-3 pr-5 shadow-xl backdrop-blur-xl sm:-left-12">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-600 text-white"><Icon name={icons[active]} /></span>
        <span className="text-sm leading-tight text-muted"><strong className="block text-base text-navy-900">{words[active]}</strong>{captions[active]}</span>
      </div>
      <div className="absolute right-1 top-1/2 flex flex-col gap-2 sm:-right-2" aria-hidden="true">
        {words.map((w, i) => <span key={w} className={`w-1.5 rounded-full bg-navy-600 transition-all duration-500 ${active === i ? "h-9" : "h-2 opacity-25"}`} />)}
      </div>
    </div>
  );
}
