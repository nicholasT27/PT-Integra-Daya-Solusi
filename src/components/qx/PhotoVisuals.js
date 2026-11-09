"use client";

import Image from "next/image";
import Icon from "@/components/Icon";
import { heroPhotos, services } from "@/lib/site";

// One caption for each picture, in the same order as the headline words.
export const captions = ["Protecting what you have built", "Planning for the long term", "Staying on the right side of the rules", "Clear books and smart planning", "Safer, smoother operations"];
const icons = ["shield", "clock", "scales", "calculator", "factory"];
const words = ["Insurance", "Retirement", "Legal", "Tax", "Engineering"];

// One of the pictures, filling its parent. The photo is only shown at or below its real size, so it stays sharp.
function Photo({ i, sizes = "460px", className = "" }) {
  const p = heroPhotos[i];
  return <Image src={p.src} alt={p.alt} fill unoptimized sizes={sizes} className={`object-cover ${className}`} style={{ objectPosition: p.pos, transform: `scale(${p.zoom})`, transformOrigin: p.pos }} />;
}

// All five pictures stacked, with only the active one showing. They cross-fade and slowly drift, as in a gentle zoom.
function Fader({ active, sizes }) {
  return heroPhotos.map((_, i) => (
    <span key={i} className="absolute inset-0 block overflow-hidden transition-all duration-[900ms]" style={{ opacity: active === i ? 1 : 0, transform: active === i ? "scale(1)" : "scale(1.08)" }} aria-hidden={active !== i}>
      <Photo i={i} sizes={sizes} />
    </span>
  ));
}

// A small glass card with the word's icon and caption, floated over a corner of the picture.
function CaptionCard({ active, className = "" }) {
  return (
    <div key={active} className={`animate-rise flex items-center gap-3 rounded-2xl border border-white bg-white/90 py-3 pl-3 pr-5 shadow-xl backdrop-blur-xl ${className}`}>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-600 text-white"><Icon name={icons[active]} /></span>
      <span className="text-sm leading-tight text-muted"><strong className="block text-base text-navy-900">{words[active]}</strong>{captions[active]}</span>
    </div>
  );
}

// Small dots showing which of the five pictures is on.
function Dots({ active, className = "" }) {
  return <div className={`flex gap-2 ${className}`} aria-hidden="true">{words.map((_, i) => <span key={i} className={`h-1.5 rounded-full bg-navy-600 transition-all duration-500 ${active === i ? "w-9" : "w-2 opacity-25"}`} />)}</div>;
}

// Design A: a tall arch-shaped photo with a caption card on its corner and a turning ring behind it.
export function PhotoArch({ active }) {
  return (
    <div className="relative mx-auto w-full max-w-[400px] pb-8 pt-4">
      <span className="orbit-slow absolute right-0 top-0 h-48 w-48 sm:-right-6 rounded-full border border-dashed border-navy-600/30" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] shadow-2xl ring-4 ring-white">
        <Fader active={active} sizes="400px" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/35 via-transparent to-transparent" />
      </div>
      <CaptionCard active={active} className="absolute bottom-0 left-0 sm:-left-12" />
      <Dots active={active} className="absolute right-1 top-1/2 flex-col sm:-right-2" />
    </div>
  );
}

// Design B: two photos overlapping like a deck. The big one is the current picture, the small one peeks out as the next.
export function PhotoDeck({ active }) {
  const next = (active + 1) % heroPhotos.length;
  return (
    <div className="relative mx-auto w-full max-w-[460px] pb-10">
      <div className="relative ml-auto aspect-[5/4] w-[78%] overflow-hidden rounded-[2rem] shadow-2xl ring-4 ring-white">
        <Fader active={active} sizes="360px" />
      </div>
      <div className="relative -mt-16 aspect-[4/3] w-[52%] overflow-hidden rounded-[1.6rem] opacity-90 shadow-2xl ring-4 ring-white" style={{ transform: "rotate(-4deg)" }}>
        <span key={next} className="animate-rise absolute inset-0 block"><Photo i={next} sizes="240px" /></span>
        <span className="absolute inset-0 bg-navy-600/25 mix-blend-multiply" />
        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-navy-600">Next · {words[next]}</span>
      </div>
      <CaptionCard active={active} className="absolute bottom-0 right-0" />
    </div>
  );
}

// Design C: a round photo inside turning rings, with the five words sitting around it like a clock face.
export function PhotoRing({ active }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px] [--rr:36] sm:[--rr:46]">
      <span className="orbit-slow absolute inset-0 rounded-full border border-dashed border-navy-600/30" />
      <span className="orbit absolute inset-[7%] rounded-full border border-navy-600/15" style={{ borderTopColor: "rgba(0,58,242,0.6)" }} />
      <div className="absolute inset-[16%] overflow-hidden rounded-full shadow-2xl ring-4 ring-white">
        <Fader active={active} sizes="320px" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/30 to-transparent" />
      </div>
      {words.map((w, i) => {
        const a = ((-90 + i * 72) * Math.PI) / 180;
        const on = active === i;
        return (
          <span key={w} className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold sm:px-3 sm:py-1.5 sm:text-xs shadow-lg transition-all duration-500 ${on ? "scale-110 bg-navy-600 text-white" : "bg-white text-navy-600"}`} style={{ left: `calc(50% + ${Math.cos(a).toFixed(3)} * var(--rr) * 1%)`, top: `calc(50% + ${Math.sin(a).toFixed(3)} * var(--rr) * 1%)` }}>
            <Icon name={icons[i]} className="h-3.5 w-3.5" /> {w}
          </span>
        );
      })}
      <p key={active} className="animate-rise absolute inset-x-0 -bottom-4 mx-auto w-fit max-w-[92%] rounded-full bg-navy-900 px-5 py-2 text-center text-xs font-semibold text-white shadow-xl">{captions[active]}</p>
    </div>
  );
}
