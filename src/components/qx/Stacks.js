"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { DetailTab } from "@/components/quinn/Bits";
import { Reveal } from "@/components/quinn/Interactive";
import RevealText from "@/components/quinn/RevealText";
import { Shell, keys } from "./Sections2";
import { services } from "@/lib/site";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const statement = "Sophisticated enough for high-stakes decisions. Nimble enough for everyday clarity. Our complete range of services is tailored to your goals to reduce risk, cut friction and give you confidence in every decision.";

// The look of each card, going from white to deep navy as the disciplines combine into one team.
const looks = [
  { bg: "bg-white", hex: "#ffffff", ink: "text-navy-900", sub: "text-muted", acc: "text-navy-600", dark: false },
  { bg: "bg-ice-50", hex: "#f4f7ff", ink: "text-navy-900", sub: "text-muted", acc: "text-navy-600", dark: false },
  { bg: "bg-ice-100", hex: "#e5ecff", ink: "text-navy-900", sub: "text-navy-900/70", acc: "text-navy-600", dark: false },
  { bg: "bg-sky-300", hex: "#a9bfff", ink: "text-navy-900", sub: "text-navy-900/75", acc: "text-navy-900", dark: false },
  { bg: "bg-navy-600", hex: "#003af2", ink: "text-white", sub: "text-white/80", acc: "text-sky-300", dark: true },
  { bg: "bg-navy-900", hex: "#002070", ink: "text-white", sub: "text-white/75", acc: "text-sky-300", dark: true },
];

// Watches the page scroll and reports, for every card: how much the next card has covered it (0 to 1),
// how far it still has to travel before it lands (0 to 1), and which card is currently on top.
function useStack(tops) {
  const refs = useRef([]);
  const [st, setSt] = useState({ cover: Array(6).fill(0), arrive: Array(6).fill(0), active: 0 });
  useEffect(() => {
    function update() {
      const vh = window.innerHeight;
      const cover = [], arrive = [];
      let active = 0;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const nx = refs.current[i + 1];
        const gap = tops[1] - tops[0];
        cover.push(nx ? clamp(1 - (nx.getBoundingClientRect().top - r.top - gap) / (r.height * 0.95)) : 0);
        arrive.push(clamp((r.top - tops[i]) / (vh * 0.55)));
        if (r.top <= tops[i] + 40) active = i;
      });
      setSt({ cover, arrive, active });
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [tops]);
  return { refs, ...st };
}

// The text inside a card: icon, title, description, what it covers and a link.
function CardBody({ s, i, l, wide = true }) {
  return (
    <>
      <span className="pointer-events-none absolute -bottom-10 right-4 text-[12rem] font-bold leading-none text-transparent" style={{ WebkitTextStroke: `2px ${l.dark ? "rgba(255,255,255,0.2)" : "rgba(0,58,242,0.16)"}` }}>{i + 1}</span>
      <div className={`relative ${wide ? "md:col-span-7" : ""}`}>
        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${l.dark ? "bg-white/15" : "bg-navy-600 text-white"}`}><Icon name={s.icon} /></span>
        <h3 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">{s.title}</h3>
        <p className={`mt-3 max-w-md leading-relaxed ${l.sub}`}>{s.intro}</p>
        <p className={`mt-6 text-sm font-semibold ${l.acc}`}>View service <span className="inline-block transition-transform group-hover:translate-x-2">→</span></p>
      </div>
      <ul className="relative space-y-2 self-end text-sm md:col-span-5">
        {s.offerings.slice(0, 4).map((o) => <li key={o} className="flex gap-2"><span className={l.acc}>●</span> {o}</li>)}
      </ul>
    </>
  );
}

// The heading shared by all four variations.
function Intro() {
  return (
    <>
      <Reveal><DetailTab className="text-navy-600">What we offer.</DetailTab></Reveal>
      <RevealText className="mt-8 max-w-4xl indent-16 text-2xl font-semibold leading-snug text-navy-900 sm:text-4xl" text={statement} />
    </>
  );
}

const tops1 = [0, 1, 2, 3, 4, 5].map((i) => 104 + i * 20);

// Variation 1: cards stack, and each one shrinks and dims a little as the next lands on top of it.
export function Stack1() {
  const { refs, cover } = useStack(tops1);
  return (
    <Shell id="stack-1" tag="Stack 1 · Depth">
      <div className={`${wrap} pb-[22vh] pt-28`}>
        <Intro />
        <ol className="mx-auto mt-24 max-w-4xl">
          {services.map((s, i) => {
            const l = looks[i];
            return (
              <li key={s.slug} ref={(el) => (refs.current[i] = el)} className="sticky" style={{ top: tops1[i], marginBottom: i < 5 ? "9vh" : 0 }}>
                <Link href={`/services/${s.slug}`} className={`group relative grid min-h-[340px] gap-6 overflow-hidden rounded-[2rem] p-8 shadow-2xl ring-1 ring-navy-900/5 sm:p-12 md:grid-cols-12 ${l.bg} ${l.ink}`} style={{ transform: `scale(${1 - cover[i] * 0.07}) translateY(${cover[i] * -12}px)`, filter: `brightness(${1 - cover[i] * 0.14})`, transformOrigin: "50% 0%" }}>
                  <CardBody s={s} i={i} l={l} />
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </Shell>
  );
}

// Variation 2: a numbered index stays on the left and follows the card that is currently on top.
export function Stack2() {
  const { refs, cover, active } = useStack(tops1);
  return (
    <Shell id="stack-2" tag="Stack 2 · Index">
      <div className={`${wrap} pb-[22vh] pt-28`}>
        <Intro />
        <div className="mt-24 grid gap-10 lg:grid-cols-12">
          <div className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-navy-600">Six disciplines</p>
              <ol className="relative mt-6 border-l border-navy-900/15 pl-6">
                <span className="absolute -left-px top-0 w-px bg-navy-600 transition-all duration-500" style={{ height: `${((active + 1) / 6) * 100}%` }} />
                {services.map((s, i) => (
                  <li key={s.slug} className={`py-3 transition-all duration-500 ${active === i ? "translate-x-2" : ""}`}>
                    <span className={`block text-xs font-semibold tabular-nums transition-colors ${active === i ? "text-navy-600" : "text-navy-900/30"}`}>0{i + 1}</span>
                    <span className={`block text-xl font-bold transition-colors duration-500 ${active === i ? "text-navy-900" : "text-navy-900/25"}`}>{keys[i]}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <ol className="lg:col-span-9">
            {services.map((s, i) => {
              const l = looks[i];
              return (
                <li key={s.slug} ref={(el) => (refs.current[i] = el)} className="sticky" style={{ top: tops1[i], marginBottom: i < 5 ? "9vh" : 0 }}>
                  <Link href={`/services/${s.slug}`} className={`group relative grid min-h-[340px] gap-6 overflow-hidden rounded-[2rem] p-8 shadow-2xl ring-1 ring-navy-900/5 sm:p-12 md:grid-cols-12 ${l.bg} ${l.ink}`} style={{ transform: `scale(${1 - cover[i] * 0.05})`, transformOrigin: "50% 0%" }}>
                    <CardBody s={s} i={i} l={l} />
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Shell>
  );
}

// Variation 3: cards arrive slightly tilted and sideways, then straighten as they land, like sheets of paper.
export function Stack3() {
  const { refs, cover, arrive } = useStack(tops1);
  return (
    <Shell id="stack-3" tag="Stack 3 · Paper fan">
      <div className={`${wrap} pb-[22vh] pt-28`}>
        <Intro />
        <ol className="mx-auto mt-24 max-w-4xl">
          {services.map((s, i) => {
            const l = looks[i];
            const sign = i % 2 ? 1 : -1;
            const t = arrive[i];
            return (
              <li key={s.slug} ref={(el) => (refs.current[i] = el)} className="sticky" style={{ top: tops1[i], marginBottom: i < 5 ? "9vh" : 0 }}>
                <Link href={`/services/${s.slug}`} className={`group relative grid min-h-[340px] gap-6 overflow-hidden rounded-[2rem] p-8 shadow-2xl ring-1 ring-navy-900/5 sm:p-12 md:grid-cols-12 ${l.bg} ${l.ink}`} style={{ transform: `translateX(${sign * t * 70}px) rotate(${sign * t * 5 + sign * cover[i] * 1.6}deg) scale(${1 - cover[i] * 0.04})`, transformOrigin: "50% 100%" }}>
                  <CardBody s={s} i={i} l={l} />
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </Shell>
  );
}

const tops4 = [0, 1, 2, 3, 4, 5].map((i) => 104 + i * 46);

// Variation 4: the cards are stacked folders. Each tab stays visible at the top, like files in a drawer.
export function Stack4() {
  const { refs } = useStack(tops4);
  return (
    <Shell id="stack-4" tag="Stack 4 · Folder tabs">
      <div className={`${wrap} pb-[26vh] pt-28`}>
        <Intro />
        <ol className="mx-auto mt-24 max-w-5xl">
          {services.map((s, i) => {
            const l = looks[i];
            return (
              <li key={s.slug} ref={(el) => (refs.current[i] = el)} className="sticky" style={{ top: tops4[i], marginBottom: i < 5 ? "8vh" : 0, "--folder-color": l.hex }}>
                <div className={`folder-tab inline-flex h-[46px] items-center gap-2 rounded-t-2xl px-6 text-xs font-semibold uppercase tracking-[0.2em] ${l.bg} ${l.dark ? "text-white" : "text-navy-600"}`} style={{ marginLeft: `${i * 9}%` }}>
                  <span className={`h-2 w-2 rounded-full ${l.dark ? "bg-sky-300" : "bg-navy-600"}`} /> 0{i + 1} · {keys[i]}
                </div>
                <Link href={`/services/${s.slug}`} className={`group relative grid min-h-[330px] gap-6 overflow-hidden rounded-3xl rounded-tl-none p-8 shadow-2xl ring-1 ring-navy-900/5 sm:p-12 md:grid-cols-12 ${l.bg} ${l.ink}`}>
                  <CardBody s={s} i={i} l={l} />
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </Shell>
  );
}
