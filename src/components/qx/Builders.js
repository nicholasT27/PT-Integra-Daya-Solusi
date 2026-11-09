"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { ArrowButton, DetailTab } from "@/components/quinn/Bits";
import { Reveal } from "@/components/quinn/Interactive";
import { Shell, keys } from "./Sections2";
import { services } from "@/lib/site";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const ang = (i) => ((-90 + i * 60) * Math.PI) / 180;
const curve = (x, y) => `M50 50 Q ${50 + (x - 50) / 2 + (y - 50) * 0.14} ${50 + (y - 50) / 2 - (x - 50) * 0.14} ${x} ${y}`;

// The pill buttons for choosing services, shared by the designs.
function Chips({ sel, toggle }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {services.map((s, i) => {
        const on = sel.includes(i);
        return (
          <button key={s.slug} type="button" aria-pressed={on} onClick={() => toggle(i)} className={`flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300 ${on ? "border-navy-600 bg-navy-600 text-white shadow-lg" : "border-navy-900/15 bg-white/70 text-navy-900 hover:border-navy-600"}`}>
            <Icon name={s.icon} className="h-4 w-4" /> {keys[i]} <span className={`ml-1 transition-transform ${on ? "rotate-45" : ""}`}>+</span>
          </button>
        );
      })}
    </div>
  );
}

// The result box: how many disciplines are picked, a sentence about them, and the contact button.
function Summary({ sel, setSel, children }) {
  const n = sel.length;
  return (
    <div className="mt-6 rounded-3xl border border-white bg-white/75 p-6 shadow-lg backdrop-blur-xl" aria-live="polite">
      <p className="text-3xl font-bold text-navy-900"><span className="shine-text">{n}</span> of 6 disciplines</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {children ?? (
          <>
            {n === 0 && "Pick at least one to begin."}
            {n > 0 && n < 6 && `Your team: ${sel.slice().sort().map((i) => keys[i]).join(", ")}. One conversation covers all of it.`}
            {n === 6 && "The whole team. This is what integrated looks like: every angle covered by people who work together."}
          </>
        )}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-5">
        <ArrowButton href="/contact">{n === 0 ? "Talk to us" : `Discuss these ${n}`}</ArrowButton>
        {setSel && <button type="button" onClick={() => setSel(n === 6 ? [] : [0, 1, 2, 3, 4, 5])} className="text-sm font-semibold text-navy-600 hover:underline">{n === 6 ? "Clear all" : "Select all six"}</button>}
      </div>
    </div>
  );
}

// The logo disc in the middle of every visual, which swells a little with each service added.
function Core({ n, size = "27%" }) {
  return (
    <div className="absolute left-1/2 top-1/2 z-10 flex items-center justify-center rounded-full bg-white shadow-2xl ring-1 ring-navy-600/10 transition-transform duration-500" style={{ width: size, height: size, transform: `translate(-50%, -50%) scale(${1 + n * 0.035})` }}>
      <span className="absolute inset-0 animate-ping rounded-full bg-navy-600/10" style={{ animationDuration: "3s" }} />
      <Image src="/brand/ids-mark-blue.svg" alt="IDS" width={160} height={54} className="relative w-[64%]" />
    </div>
  );
}

// Moves a list of numbers smoothly towards new target values, so shapes grow and shrink instead of jumping.
function useEased(target) {
  const key = target.join(",");
  const [v, setV] = useState(target);
  const cur = useRef(target);
  useEffect(() => {
    const t = key.split(",").map(Number);
    let raf;
    const tick = () => {
      let done = true;
      cur.current = cur.current.map((c, i) => {
        const d = t[i] - c;
        if (Math.abs(d) > 0.05) { done = false; return c + d * 0.14; }
        return t[i];
      });
      setV(cur.current);
      if (!done) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [key]);
  return v;
}

// A shared hook for the "which services are picked" list.
function useSel(initial) {
  const [sel, setSel] = useState(initial);
  const toggle = (i) => setSel((v) => (v.includes(i) ? v.filter((x) => x !== i) : [...v, i]));
  return { sel, setSel, toggle };
}

// The left-hand heading and text shared by the designs.
function Head({ title, accent, text }) {
  return (
    <>
      <Reveal><DetailTab className="text-navy-600">What we offer.</DetailTab></Reveal>
      <h2 className="mt-6 text-balance text-4xl font-bold leading-[1.05] text-navy-900 sm:text-6xl">{title} <span className="shine-text">{accent}</span></h2>
      <p className="mt-5 max-w-md text-lg text-muted">{text}</p>
    </>
  );
}

// Design 1: the six services orbit the logo on three rings. The ones you pick light up and show their name.
export function Orbit() {
  const { sel, setSel, toggle } = useSel([0, 2]);
  const rings = [{ r: 0.22, dur: 46, rev: false }, { r: 0.33, dur: 64, rev: true }, { r: 0.44, dur: 84, rev: false }];
  return (
    <Shell id="bld-1" tag="Build 1 · Orbit">
      <div className={`${wrap} grid items-center gap-12 py-28 lg:grid-cols-12`}>
        <div className="lg:col-span-6">
          <Head title="Put your team" accent="in orbit." text="Switch on the disciplines you need and watch them join the orbit around your business." />
          <Chips sel={sel} toggle={toggle} />
          <Summary sel={sel} setSel={setSel} />
        </div>
        <div className="relative mx-auto aspect-square w-[min(90vw,560px)] lg:col-span-6" style={{ "--s": "min(90vw, 560px)" }}>
          {rings.map((ring, k) => (
            <span key={k} className="absolute rounded-full border border-navy-600/20" style={{ inset: `${(0.5 - ring.r) * 100}%`, borderStyle: k === 1 ? "dashed" : "solid" }} />
          ))}
          {rings.map((ring, k) => (
            <div key={k} className="absolute inset-0" style={{ animation: `qxSpin ${ring.dur}s linear infinite ${ring.rev ? "reverse" : ""}` }}>
              {services.map((s, i) => {
                if (i % 3 !== k) return null;
                const a = Math.floor(i / 3) * 180 + i * 37;
                const on = sel.includes(i);
                return (
                  <div key={s.slug} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${a}deg) translateY(calc(var(--s) * -${ring.r}))` }}>
                    <div style={{ transform: `rotate(${-a}deg)` }}>
                      <div style={{ animation: `qxSpin ${ring.dur}s linear infinite ${ring.rev ? "" : "reverse"}` }}>
                        <button type="button" aria-label={`${on ? "Remove" : "Add"} ${s.title}`} onClick={() => toggle(i)} className="-ml-8 -mt-8 flex w-16 flex-col items-center">
                          <span className={`flex h-16 w-16 items-center justify-center rounded-full ring-1 transition-all duration-500 ${on ? "scale-100 bg-navy-600 text-white shadow-[0_0_0_8px_rgba(0,58,242,0.12),0_18px_40px_rgba(0,58,242,0.35)] ring-navy-600" : "scale-[0.55] bg-white text-navy-600/60 opacity-60 shadow-md ring-navy-600/20 hover:opacity-100"}`}><Icon name={s.icon} className="h-7 w-7" /></span>
                          <span className={`mt-1 whitespace-nowrap text-xs font-semibold text-navy-900 transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"}`}>{keys[i]}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          <Core n={sel.length} size="24%" />
        </div>
      </div>
    </Shell>
  );
}

// Design 2: six hexagon tiles around the logo. Each one you pick fills in and clicks into the honeycomb.
export function Honeycomb() {
  const { sel, setSel, toggle } = useSel([1, 4]);
  const W = 30;
  const d = W * 0.866 + 1.2;
  const hex = "polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)";
  const n = sel.length;
  return (
    <Shell id="bld-2" tag="Build 2 · Honeycomb">
      <div className={`${wrap} grid items-center gap-12 py-28 lg:grid-cols-12`}>
        <div className="lg:col-span-6">
          <Head title="Click the pieces" accent="together." text="Each discipline is one cell of the same honeycomb. Fill in the ones you need." />
          <Chips sel={sel} toggle={toggle} />
          <Summary sel={sel} setSel={setSel} />
        </div>
        <div className="relative mx-auto aspect-square w-[min(90vw,540px)] lg:col-span-6">
          <span className="orbit-slow absolute inset-[1%] rounded-full border border-dashed border-navy-600/20" />
          {n === 6 && <span className="absolute inset-[10%] animate-ping rounded-full bg-navy-600/10" style={{ animationDuration: "2.4s" }} />}
          {services.map((s, i) => {
            const on = sel.includes(i);
            const x = 50 + d * Math.cos(ang(i) + Math.PI / 6 * 0) * 1;
            const y = 50 + d * Math.sin(ang(i));
            return (
              <button key={s.slug} type="button" aria-label={`${on ? "Remove" : "Add"} ${s.title}`} aria-pressed={on} onClick={() => toggle(i)} className="group absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%`, width: `${W}%`, aspectRatio: "1 / 0.866" }}>
                <span className={`absolute inset-0 transition-all duration-500 ${on ? "bg-navy-600" : "bg-navy-600/25"}`} style={{ clipPath: hex, filter: on ? "drop-shadow(0 14px 22px rgba(0,58,242,0.35))" : "none" }} />
                <span className={`absolute inset-[2.5px] flex flex-col items-center justify-center gap-1 transition-all duration-500 ${on ? "bg-navy-600 text-white" : "bg-white/90 text-navy-900 group-hover:bg-ice-50"}`} style={{ clipPath: hex }}>
                  <Icon name={s.icon} className={`h-6 w-6 transition-transform duration-500 ${on ? "scale-110" : "text-navy-600"}`} />
                  <span className="text-[11px] font-bold leading-none sm:text-xs">{keys[i]}</span>
                </span>
              </button>
            );
          })}
          <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white shadow-xl transition-all duration-500" style={{ width: `${W}%`, aspectRatio: "1 / 0.866", clipPath: hex, filter: n === 6 ? "drop-shadow(0 0 20px rgba(0,58,242,0.5))" : "none" }}>
            <Image src="/brand/ids-mark-blue.svg" alt="IDS" width={160} height={54} className="w-[58%]" />
          </div>
        </div>
      </div>
    </Shell>
  );
}

const goals = [
  { t: "Protect my property and assets", to: [0, 1] },
  { t: "Look after my employees' future", to: [2, 1] },
  { t: "Stay on the right side of regulations", to: [3, 4] },
  { t: "Reduce tax and tidy my books", to: [4] },
  { t: "Make operations safer and smoother", to: [5, 0] },
  { t: "Sign or review an important contract", to: [3] },
];

// Design 3: choose what you want to achieve, and the right disciplines connect to the logo automatically.
export function Goals() {
  const [g, setG] = useState([0]);
  const toggle = (i) => setG((v) => (v.includes(i) ? v.filter((x) => x !== i) : [...v, i]));
  const sel = [...new Set(g.flatMap((i) => goals[i].to))].sort();
  const nodes = services.map((s, i) => ({ s, x: 50 + 37 * Math.cos(ang(i)), y: 50 + 37 * Math.sin(ang(i)) }));
  return (
    <Shell id="bld-3" tag="Build 3 · Goals">
      <div className={`${wrap} grid items-center gap-12 py-28 lg:grid-cols-12`}>
        <div className="lg:col-span-6">
          <Head title="Start with your" accent="goal." text="Tell us what you want to achieve. We will connect the specialists who make it happen." />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {goals.map((x, i) => {
              const on = g.includes(i);
              return (
                <button key={x.t} type="button" aria-pressed={on} onClick={() => toggle(i)} className={`flex items-center gap-3 rounded-2xl border p-4 text-left text-sm font-semibold transition-all duration-300 ${on ? "border-navy-600 bg-navy-600 text-white shadow-lg" : "border-navy-900/15 bg-white/70 text-navy-900 hover:border-navy-600"}`}>
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs ${on ? "border-white bg-white text-navy-600" : "border-navy-600/40"}`}>{on ? "✓" : ""}</span>
                  {x.t}
                </button>
              );
            })}
          </div>
          <Summary sel={sel}>
            {sel.length === 0 ? "Choose a goal to see who would help." : (
              <>
                {sel.map((i) => (
                  <span key={i} className="mt-1 block"><strong className="text-navy-900">{keys[i]}</strong> · {g.filter((k) => goals[k].to.includes(i)).map((k) => goals[k].t).join("; ")}</span>
                ))}
              </>
            )}
          </Summary>
        </div>
        <div className="relative mx-auto aspect-square w-[min(90vw,540px)] lg:col-span-6">
          <span className="orbit-slow absolute inset-[2%] rounded-full border border-dashed border-navy-600/25" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
            {nodes.map((nd, i) => {
              const on = sel.includes(i);
              return (
                <g key={i}>
                  <path d={curve(nd.x, nd.y)} stroke="#003af2" strokeOpacity={on ? 0.85 : 0.1} strokeWidth={on ? 2.2 : 1.2} strokeDasharray={on ? "none" : "3 4"} vectorEffect="non-scaling-stroke" style={{ transition: "all 400ms" }} />
                  {on && <circle r="1.4" fill="#003af2"><animateMotion dur="2.6s" begin={`-${(i * 0.43).toFixed(2)}s`} repeatCount="indefinite" path={curve(nd.x, nd.y)} /></circle>}
                </g>
              );
            })}
          </svg>
          {nodes.map((nd, i) => {
            const on = sel.includes(i);
            return (
              <span key={nd.s.slug} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={{ left: `${nd.x}%`, top: `${nd.y}%` }}>
                <span className={`flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-full shadow-xl ring-1 transition-all duration-500 ${on ? "scale-110 bg-navy-600 text-white ring-navy-600" : "bg-white text-navy-600/50 ring-navy-600/15"}`}><Icon name={nd.s.icon} className="h-7 w-7" /></span>
                <span className={`absolute top-full mt-2 whitespace-nowrap text-xs font-semibold transition-colors ${on ? "text-navy-900" : "text-navy-900/35"}`}>{keys[i]}</span>
              </span>
            );
          })}
          <Core n={sel.length} />
        </div>
      </div>
    </Shell>
  );
}

// Design 4: your choices draw a coverage shape on a radar. A scanning beam sweeps round it all the time.
export function Radar() {
  const { sel, setSel, toggle } = useSel([0, 3, 4]);
  const v = useEased(services.map((_, i) => (sel.includes(i) ? 40 : 7)));
  const pts = v.map((r, i) => `${50 + r * Math.cos(ang(i))},${50 + r * Math.sin(ang(i))}`).join(" ");
  const hexAt = (r) => services.map((_, i) => `${50 + r * Math.cos(ang(i))},${50 + r * Math.sin(ang(i))}`).join(" ");
  const cover = Math.round((sel.length / 6) * 100);
  return (
    <Shell id="bld-4" tag="Build 4 · Radar">
      <div className={`${wrap} grid items-center gap-12 py-28 lg:grid-cols-12`}>
        <div className="lg:col-span-6">
          <Head title="See your" accent="coverage." text="Every discipline you add stretches the shape. Full coverage is a complete hexagon." />
          <Chips sel={sel} toggle={toggle} />
          <Summary sel={sel} setSel={setSel}>
            Coverage <strong className="text-navy-900">{cover}%</strong>. {sel.length === 6 ? "Nothing falls between the gaps." : sel.length === 0 ? "Pick a discipline to start the shape." : `${6 - sel.length} more would close the gaps.`}
          </Summary>
        </div>
        <div className="relative mx-auto aspect-square w-[min(90vw,540px)] lg:col-span-6">
          <div className="absolute inset-[12%] overflow-hidden rounded-full" aria-hidden="true">
            <div className="absolute inset-0" style={{ background: "conic-gradient(from 0deg, rgba(0,58,242,0) 0deg, rgba(0,58,242,0) 250deg, rgba(0,58,242,0.28) 360deg)", animation: "qxSpin 5s linear infinite" }} />
          </div>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
            {[13, 26, 40].map((r) => <polygon key={r} points={hexAt(r)} stroke="#003af2" strokeOpacity="0.18" strokeWidth="1" vectorEffect="non-scaling-stroke" />)}
            {services.map((_, i) => <line key={i} x1="50" y1="50" x2={50 + 40 * Math.cos(ang(i))} y2={50 + 40 * Math.sin(ang(i))} stroke="#003af2" strokeOpacity="0.15" vectorEffect="non-scaling-stroke" />)}
            <defs><radialGradient id="radarFill"><stop offset="0" stopColor="#003af2" stopOpacity="0.55" /><stop offset="1" stopColor="#6f93ff" stopOpacity="0.3" /></radialGradient></defs>
            <polygon points={pts} fill="url(#radarFill)" stroke="#003af2" strokeWidth="2.2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            {v.map((r, i) => <circle key={i} cx={50 + r * Math.cos(ang(i))} cy={50 + r * Math.sin(ang(i))} r={sel.includes(i) ? 1.7 : 0.9} fill="#003af2" />)}
          </svg>
          {services.map((s, i) => {
            const on = sel.includes(i);
            return (
              <button key={s.slug} type="button" aria-label={`${on ? "Remove" : "Add"} ${s.title}`} onClick={() => toggle(i)} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={{ left: `${50 + 45 * Math.cos(ang(i))}%`, top: `${50 + 45 * Math.sin(ang(i))}%` }}>
                <span className={`flex h-14 w-14 items-center justify-center rounded-full shadow-xl ring-1 transition-all duration-500 ${on ? "scale-110 bg-navy-600 text-white ring-navy-600" : "bg-white text-navy-600/50 ring-navy-600/15"}`}><Icon name={s.icon} className="h-6 w-6" /></span>
                <span className={`mt-1 whitespace-nowrap text-xs font-semibold ${on ? "text-navy-900" : "text-navy-900/35"}`}>{keys[i]}</span>
              </button>
            );
          })}
          <div className="absolute left-1/2 top-1/2 z-10 flex h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white shadow-2xl ring-1 ring-navy-600/10">
            <span className="text-3xl font-bold leading-none text-navy-600 tabular-nums">{Math.round((v.reduce((a, b) => a + b, 0) / 6 - 7) / 33 * 100)}%</span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted">covered</span>
          </div>
        </div>
      </div>
    </Shell>
  );
}
