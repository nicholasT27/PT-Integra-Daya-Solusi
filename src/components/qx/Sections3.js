"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { ArrowButton, DetailTab } from "@/components/quinn/Bits";
import { Reveal } from "@/components/quinn/Interactive";
import RevealText from "@/components/quinn/RevealText";
import FlowLines from "./FlowLines";
import { Shell, keys } from "./Sections2";
import { services } from "@/lib/site";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const statement = "Sophisticated enough for high-stakes decisions. Nimble enough for everyday clarity. Our complete range of services is tailored to your goals to reduce risk, cut friction and give you confidence in every decision.";

// The heading shared by the designs that start with a statement.
function Intro() {
  return (
    <>
      <Reveal><DetailTab className="text-navy-600">What we offer.</DetailTab></Reveal>
      <RevealText className="mt-8 max-w-4xl indent-16 text-2xl font-semibold leading-snug text-navy-900 sm:text-4xl" text={statement} />
    </>
  );
}

// Design 1: six vertical panels. Point at one (or tap it) and it opens wide while the others slim down.
export function Panels() {
  const [a, setA] = useState(0);
  return (
    <Shell id="sec3-1" tag="Design 1 · Expanding panels">
      <div className={`${wrap} py-28`}>
        <Intro />
        <div className="mt-16 flex h-[940px] flex-col gap-3 md:h-[590px] md:flex-row">
          {services.map((s, i) => {
            const on = a === i;
            return (
              <div
                key={s.slug}
                tabIndex={0}
                onMouseEnter={() => setA(i)}
                onFocus={() => setA(i)}
                onClick={() => setA(i)}
                className={`relative cursor-pointer overflow-hidden rounded-3xl border outline-none transition-colors duration-500 ${on ? "border-navy-600 bg-navy-600 text-white shadow-2xl" : "border-white bg-white/70 text-navy-900 shadow-md backdrop-blur-xl hover:bg-white"}`}
                style={{ flex: on ? "5 1 0%" : "1 1 0%", transition: "flex 700ms cubic-bezier(0.7, 0, 0.2, 1), background-color 500ms" }}
              >
                {on && <FlowLines color="white" opacity={0.35} />}
                {/* Slim state: number, icon and the title written sideways */}
                <div className={`absolute inset-0 flex items-center gap-4 px-5 transition-opacity duration-300 md:flex-col md:justify-between md:px-0 md:py-6 ${on ? "pointer-events-none opacity-0" : "opacity-100 delay-300"}`}>
                  <span className="text-sm font-semibold text-navy-600">0{i + 1}</span>
                  <span className="text-lg font-bold md:rotate-180 md:text-xl md:[writing-mode:vertical-rl]">{keys[i]}</span>
                  <span className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-navy-600 text-white md:ml-0"><Icon name={s.icon} className="h-5 w-5" /></span>
                </div>
                {/* Open state: the full description */}
                <div className={`absolute inset-y-0 left-0 flex w-full flex-col justify-between p-7 transition-opacity duration-500 md:w-[470px] md:p-9 ${on ? "opacity-100 delay-300" : "pointer-events-none opacity-0"}`}>
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15"><Icon name={s.icon} className="h-7 w-7" /></span>
                    <span className="text-6xl font-bold text-white/20">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold leading-tight">{s.title}</h3>
                    <p className="mt-3 max-w-sm leading-relaxed text-white/80">{s.intro}</p>
                    <ul className="mt-5 space-y-1.5 text-sm">
                      {s.offerings.slice(0, 3).map((o) => <li key={o} className="flex gap-2"><span className="text-sky-300">●</span> {o}</li>)}
                    </ul>
                    <Link href={`/services/${s.slug}`} className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-ice-100">View service →</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}

// Design 2: the six services sit on a 3D ring. Scrolling turns the ring so each one comes to the front.
export function Ring() {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    function update() {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setP(clamp(-r.top / Math.max(1, r.height - window.innerHeight)));
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  const R = 440;
  const raw = p * 300;
  const snapped = Math.round(raw / 60) * 60;
  const rot = raw + (snapped - raw) * 0.6;
  const active = ((Math.round(rot / 60) % 6) + 6) % 6;

  return (
    <Shell id="sec3-2" tag="Design 2 · 3D ring">
      <div ref={ref} className="relative h-[430vh]">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
          <div className="px-5 text-center">
            <DetailTab className="text-navy-600">What we offer.</DetailTab>
            <h2 className="mt-4 text-balance text-4xl font-bold leading-tight text-navy-900 sm:text-6xl">Six disciplines. <span className="shine-text">One ring.</span></h2>
          </div>
          <div className="relative mt-8 h-[440px] w-full" style={{ perspective: "1800px" }}>
            <div className="absolute left-1/2 top-0 -ml-[170px] h-full w-[340px]" style={{ transformStyle: "preserve-3d", transform: `translateZ(-${R}px) rotateY(${-rot}deg)` }}>
              {services.map((s, i) => {
                const d = ((((i * 60 - rot) % 360) + 540) % 360) - 180;
                const vis = clamp(1 - Math.abs(d) / 105);
                return (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    tabIndex={Math.abs(d) < 30 ? 0 : -1}
                    className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white bg-white/85 p-7 shadow-2xl backdrop-blur-xl"
                    style={{ transform: `rotateY(${i * 60}deg) translateZ(${R}px)`, opacity: 0.1 + 0.9 * vis, backfaceVisibility: "hidden", pointerEvents: Math.abs(d) < 30 ? "auto" : "none" }}
                  >
                    <span className="pointer-events-none absolute -right-2 -top-6 text-[9rem] font-bold leading-none text-transparent" style={{ WebkitTextStroke: "2px rgba(0,58,242,0.16)" }}>{i + 1}</span>
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-600 text-white"><Icon name={s.icon} className="h-7 w-7" /></span>
                    <div className="relative">
                      <h3 className="text-2xl font-bold leading-tight text-navy-900">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{s.short}</p>
                      <ul className="mt-4 space-y-1 text-sm text-navy-900">
                        {s.offerings.slice(0, 3).map((o) => <li key={o} className="flex gap-2"><span className="text-navy-600">●</span> {o}</li>)}
                      </ul>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3" aria-hidden="true">
            {services.map((_, i) => <span key={i} className={`h-2 rounded-full bg-navy-600 transition-all duration-500 ${active === i ? "w-10" : "w-2 opacity-25"}`} />)}
          </div>
          <p className="mt-3 text-sm font-semibold tabular-nums text-navy-600">0{active + 1} / 06 · {keys[active]}</p>
        </div>
      </div>
    </Shell>
  );
}

// Design 3: a big list of services. A card with the details floats after your cursor.
export function Preview() {
  const box = useRef(null);
  const card = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  const [h, setH] = useState(-1);

  useEffect(() => {
    let raf;
    const loop = () => {
      cur.current.x += (target.current.x - cur.current.x) * 0.14;
      cur.current.y += (target.current.y - cur.current.y) * 0.14;
      if (card.current) card.current.style.transform = `translate(${cur.current.x}px, ${cur.current.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  function move(e) {
    const r = box.current.getBoundingClientRect();
    target.current = { x: clamp(e.clientX - r.left + 30, 0, r.width - 330), y: clamp(e.clientY - r.top + 34, 0, r.height - 270) };
  }

  const s = services[h] ?? services[0];
  return (
    <Shell id="sec3-3" tag="Design 3 · Cursor preview">
      <div className={`${wrap} py-28`}>
        <Intro />
        <div ref={box} onMouseMove={move} onMouseLeave={() => setH(-1)} className="relative mt-16">
          <ol>
            {services.map((x, i) => (
              <li key={x.slug} onMouseEnter={() => setH(i)}>
                <Link href={`/services/${x.slug}`} className={`group block border-t border-navy-900/15 py-7 transition-all duration-300 last:border-b ${h !== -1 && h !== i ? "opacity-25" : ""}`}>
                  <span className="flex items-baseline gap-6">
                    <span className="w-8 text-lg font-semibold text-navy-600">{i + 1}</span>
                    <span className={`text-4xl font-bold leading-tight text-navy-900 transition-transform duration-300 sm:text-6xl ${h === i ? "translate-x-4 text-navy-600" : ""}`}>{x.title}</span>
                  </span>
                  <span className="mt-3 hidden pl-14 text-sm text-muted [@media(hover:none)]:block">{x.short}</span>
                </Link>
              </li>
            ))}
          </ol>
          <div ref={card} className="pointer-events-none absolute left-0 top-0 z-20 hidden w-[310px] [@media(hover:hover)]:block">
            <div className="rounded-3xl border border-white bg-white/90 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300" style={{ opacity: h === -1 ? 0 : 1, transform: `scale(${h === -1 ? 0.85 : 1})` }}>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-600 text-white"><Icon name={s.icon} /></span>
              <p className="mt-4 text-sm leading-relaxed text-muted">{s.short}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-navy-900">
                {s.offerings.slice(0, 3).map((o) => <li key={o} className="flex gap-2"><span className="text-navy-600">●</span> {o}</li>)}
              </ul>
              <p className="mt-4 text-sm font-semibold text-navy-600">View service →</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

// Design 4: choose the services you need and watch them link up around the IDS logo.
export function Builder() {
  const [sel, setSel] = useState([0, 1]);
  const toggle = (i) => setSel((v) => (v.includes(i) ? v.filter((x) => x !== i) : [...v, i]));
  const r = 37;
  const nodes = services.map((s, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    return { s, x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) };
  });
  const curve = (x, y) => `M50 50 Q ${50 + (x - 50) / 2 + (y - 50) * 0.14} ${50 + (y - 50) / 2 - (x - 50) * 0.14} ${x} ${y}`;
  const n = sel.length;

  return (
    <Shell id="sec3-4" tag="Design 4 · Build your team">
      <div className={`${wrap} grid items-center gap-12 py-28 lg:grid-cols-12`}>
        <div className="lg:col-span-6">
          <Reveal><DetailTab className="text-navy-600">What we offer.</DetailTab></Reveal>
          <h2 className="mt-6 text-balance text-4xl font-bold leading-[1.05] text-navy-900 sm:text-6xl">Build the team <span className="shine-text">you need.</span></h2>
          <p className="mt-5 max-w-md text-lg text-muted">Choose what matters to you. Watch the specialists connect around your business.</p>
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
          <button type="button" onClick={() => setSel(n === 6 ? [] : [0, 1, 2, 3, 4, 5])} className="mt-4 text-sm font-semibold text-navy-600 hover:underline">{n === 6 ? "Clear all" : "Select all six"}</button>
          <div className="mt-8 rounded-3xl border border-white bg-white/75 p-6 shadow-lg backdrop-blur-xl" aria-live="polite">
            <p className="text-3xl font-bold text-navy-900"><span className="shine-text">{n}</span> of 6 disciplines</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {n === 0 && "Pick at least one to begin."}
              {n > 0 && n < 6 && `Your team: ${sel.slice().sort().map((i) => keys[i]).join(", ")}. One conversation covers all of it.`}
              {n === 6 && "The whole team. This is what integrated looks like: every angle covered by people who work together."}
            </p>
            <div className="mt-5"><ArrowButton href="/contact">{n === 0 ? "Talk to us" : `Discuss these ${n}`}</ArrowButton></div>
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-[min(90vw,540px)] lg:col-span-6">
          <span className="orbit-slow absolute inset-[2%] rounded-full border border-dashed border-navy-600/25" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
            {nodes.map((nd, i) => {
              const on = sel.includes(i);
              return (
                <g key={i}>
                  <path d={curve(nd.x, nd.y)} stroke="#003af2" strokeOpacity={on ? 0.85 : 0.12} strokeWidth={on ? 2.2 : 1.2} strokeDasharray={on ? "none" : "3 4"} vectorEffect="non-scaling-stroke" style={{ transition: "all 400ms" }} />
                  {on && (
                    <circle r="1.4" fill="#003af2">
                      <animateMotion dur="2.6s" begin={`-${(i * 0.43).toFixed(2)}s`} repeatCount="indefinite" path={curve(nd.x, nd.y)} />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>
          {nodes.map((nd, i) => {
            const on = sel.includes(i);
            return (
              <button key={nd.s.slug} type="button" onClick={() => toggle(i)} aria-label={`${on ? "Remove" : "Add"} ${nd.s.title}`} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={{ left: `${nd.x}%`, top: `${nd.y}%` }}>
                <span className={`flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-full shadow-xl ring-1 transition-all duration-300 ${on ? "scale-110 bg-navy-600 text-white ring-navy-600" : "bg-white text-navy-600/60 ring-navy-600/15"}`}><Icon name={nd.s.icon} className="h-7 w-7" /></span>
                <span className={`absolute top-full mt-2 whitespace-nowrap text-xs font-semibold transition-colors ${on ? "text-navy-900" : "text-navy-900/40"}`}>{keys[i]}</span>
              </button>
            );
          })}
          <div className="absolute left-1/2 top-1/2 flex h-[27%] w-[27%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl ring-1 ring-navy-600/10 transition-transform duration-500" style={{ transform: `translate(-50%, -50%) scale(${1 + n * 0.03})` }}>
            <span className="absolute inset-0 animate-ping rounded-full bg-navy-600/10" style={{ animationDuration: "3s" }} />
            <Image src="/brand/ids-mark-blue.svg" alt="IDS" width={160} height={54} className="relative w-[64%]" />
          </div>
        </div>
      </div>
    </Shell>
  );
}
