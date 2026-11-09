"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { ArrowButton } from "@/components/quinn/Bits";
import FlowLines from "./FlowLines";
import { services } from "@/lib/site";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const base = "relative isolate overflow-hidden min-h-[max(100vh,820px)]";

// A small tag in the corner naming each design.
function Tag({ children }) {
  return <span className="absolute bottom-4 left-4 z-20 rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-white shadow">{children}</span>;
}

// The two buttons used in every hero.
function Buttons() {
  return (
    <div className="mt-9 flex flex-wrap gap-4">
      <ArrowButton href="/contact">Contact us</ArrowButton>
      <Link href="/services" className="inline-flex items-center rounded-full border border-navy-900/20 bg-white/60 px-7 py-3 text-sm font-semibold text-navy-900 hover:bg-white">Our services</Link>
    </div>
  );
}

// Hero N: the six services connected to the IDS logo by lines with pulses that travel along them.
export function HeroN() {
  const [hover, setHover] = useState(-1);
  const r = 36;
  const nodes = services.map((s, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    return { s, x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) };
  });
  const curve = (x, y) => `M50 50 Q ${50 + (x - 50) / 2 + (y - 50) * 0.14} ${50 + (y - 50) / 2 - (x - 50) * 0.14} ${x} ${y}`;

  return (
    <section id="hero-n" className={`${base} flex items-center bg-gradient-to-br from-white via-ice-50 to-ice-100`}>
      <div className="absolute inset-0 -z-10 opacity-50" style={{ backgroundImage: "radial-gradient(#003af2 1px, transparent 1px)", backgroundSize: "30px 30px", maskImage: "radial-gradient(ellipse at 72% 50%, black, transparent 68%)", WebkitMaskImage: "radial-gradient(ellipse at 72% 50%, black, transparent 68%)" }} />
      <div className={`${wrap} grid items-center gap-10 pb-16 pt-32 lg:grid-cols-12`}>
        <div className="lg:col-span-6">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-navy-600"><span className="h-2 w-2 animate-pulse rounded-full bg-navy-600" /> Integrated solutions.</p>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.04] text-navy-900 sm:text-6xl">Six disciplines, <span className="shine-text">connected</span> into one team.</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">Insurance, risk, retirement, legal, tax and industrial expertise, working as one so nothing falls between the gaps.</p>
          <Buttons />
        </div>
        <div className="relative mx-auto aspect-square w-[min(90vw,580px)] lg:col-span-6">
          <span className="orbit-slow absolute inset-[3%] rounded-full border border-dashed border-navy-600/25" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
            {nodes.map((n, i) => {
              const m = nodes[(i + 1) % nodes.length];
              return <path key={`ring-${i}`} d={`M${n.x} ${n.y} L${m.x} ${m.y}`} pathLength="1" className="flow-line" stroke="#003af2" strokeOpacity="0.5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" style={{ "--d": `${7 + i}s`, animationDelay: `-${i * 1.3}s` }} />;
            })}
            {nodes.map((n, i) => (
              <g key={i}>
                <path d={curve(n.x, n.y)} stroke="#003af2" strokeOpacity={hover === i ? 0.9 : 0.25} strokeWidth={hover === i ? 2.5 : 1.5} vectorEffect="non-scaling-stroke" />
                <circle r="1.3" fill="#003af2">
                  <animateMotion dur="3.4s" begin={`-${(i * 0.57).toFixed(2)}s`} repeatCount="indefinite" path={curve(n.x, n.y)} />
                </circle>
                <circle r="1.3" fill="#003af2" opacity="0.6">
                  <animateMotion dur="3.4s" begin={`-${(i * 0.57 + 1.7).toFixed(2)}s`} repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" path={curve(n.x, n.y)} />
                </circle>
              </g>
            ))}
          </svg>
          {nodes.map((n, i) => (
            <Link
              key={n.s.slug}
              href={`/services/${n.s.slug}`}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(-1)}
              className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              aria-label={n.s.title}
            >
              <span className={`flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-full bg-white shadow-xl ring-1 transition-all duration-300 ${hover === i ? "scale-110 text-white ring-navy-600 !bg-navy-600" : "text-navy-600 ring-navy-600/15"}`}>
                <Icon name={n.s.icon} className="h-7 w-7" />
              </span>
              <span className={`absolute top-full mt-2 whitespace-nowrap rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-white transition-all duration-300 ${hover === i ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}>{n.s.title}</span>
            </Link>
          ))}
          <div className="absolute left-1/2 top-1/2 flex h-[27%] w-[27%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl ring-1 ring-navy-600/10">
            <span className="absolute inset-0 animate-ping rounded-full bg-navy-600/10" style={{ animationDuration: "3s" }} />
            <Image src="/brand/ids-mark-blue.svg" alt="IDS" width={160} height={54} className="relative w-[64%]" priority />
          </div>
        </div>
      </div>
      <Tag>Hero N · Network</Tag>
    </section>
  );
}

// Hero W: a headline whose key word keeps cycling through the six areas of expertise.
export function HeroW() {
  const words = ["risk.", "insurance.", "retirement.", "legal.", "tax.", "engineering."];
  const [i, setI] = useState(0);
  const [anim, setAnim] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      if (i === words.length) {
        setAnim(false);
        setI(0);
        requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
      } else {
        setI(i + 1);
      }
    }, anim ? 2100 : 50);
    return () => clearTimeout(t);
  }, [i, anim, words.length]);

  const list = [...words, words[0]];
  return (
    <section id="hero-w" className={`${base} mesh flex items-center`}>
      <FlowLines className="-z-10" color="#003af2" opacity={0.35} />
      <div className={`${wrap} pb-16 pt-32`}>
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-navy-600"><span className="h-2 w-2 animate-pulse rounded-full bg-navy-600" /> PT Integra Daya Solusi</p>
        <h1 className="mt-6 text-6xl font-bold leading-[1.05] text-navy-900 sm:text-8xl lg:text-[8.5rem]">
          One team for
          <span className="block h-[1.1em] overflow-hidden">
            <span className="block" style={{ transform: `translateY(${-i * 1.1}em)`, transition: anim ? "transform 700ms cubic-bezier(0.7, 0, 0.2, 1)" : "none" }}>
              {list.map((w, n) => <span key={n} className="shine-text block h-[1.1em]">{w}</span>)}
            </span>
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-xl leading-relaxed text-muted">And everything in between. Specialists in one place, advising you from every angle.</p>
        <Buttons />
      </div>
      <Tag>Hero W · Cycling words</Tag>
    </section>
  );
}

// Hero B: a grid of live, moving tiles: headline, logo, Jakarta clock, service ticker and a chart that draws itself.
export function HeroB() {
  const [time, setTime] = useState(null);
  useEffect(() => {
    const tick = () => setTime(new Date());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  const part = (o) => (time ? new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jakarta", ...o }).format(time) : "--");
  const items = [...services, ...services];
  const tile = "relative overflow-hidden rounded-3xl";

  return (
    <section id="hero-b" className={`${base} bg-ice-50`}>
      <div className={`${wrap} pb-16 pt-28`}>
        <div className="grid gap-4 lg:grid-cols-6">
          <div className={`${tile} bg-white p-8 shadow-sm ring-1 ring-navy-900/5 sm:p-12 lg:col-span-4 lg:row-span-2`}>
            <FlowLines className="-z-0" color="#003af2" opacity={0.25} />
            <div className="relative">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-navy-600"><span className="h-2 w-2 animate-pulse rounded-full bg-navy-600" /> Integrated solutions.</p>
              <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] text-navy-900 sm:text-6xl">Risk, insurance and business advice, <span className="shine-text">brought together.</span></h1>
              <p className="mt-6 max-w-md leading-relaxed text-muted">A Jakarta consultancy simplifying complexity so you can focus on what matters most.</p>
              <Buttons />
            </div>
          </div>
          <div className={`${tile} flex min-h-[200px] items-center justify-center bg-gradient-to-br from-navy-600 to-navy-900 lg:col-span-2`}>
            <span className="orbit absolute h-[130%] w-[78%] rounded-full border border-dashed border-white/30" />
            <span className="orbit-slow absolute h-[90%] w-[56%] rounded-full border border-white/20" />
            <Image src="/brand/ids-mark-white.svg" alt="IDS" width={200} height={68} className="relative w-[52%]" />
          </div>
          <div className={`${tile} flex min-h-[170px] flex-col justify-between bg-navy-900 p-7 text-white lg:col-span-2`}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">Jakarta · now</p>
            <p className="text-6xl font-bold tabular-nums leading-none sm:text-7xl">{part({ hour: "2-digit", minute: "2-digit", hour12: false }).split(":")[0]}<span className="blink">:</span>{part({ hour: "2-digit", minute: "2-digit", hour12: false }).split(":")[1] ?? "--"}</p>
            <p className="text-sm text-white/70">{part({ weekday: "long", day: "numeric", month: "long" })} · Menara MTH, Tebet</p>
          </div>
          <div className={`${tile} flex flex-col justify-center bg-white p-4 ring-1 ring-navy-900/5 lg:col-span-3`}>
            <div className="marquee flex gap-3" style={{ animationDuration: "35s" }}>
              {items.map((s, n) => (
                <span key={n} className="flex items-center gap-3 whitespace-nowrap rounded-full bg-ice-50 px-5 py-3 text-sm font-semibold text-navy-900">
                  <Icon name={s.icon} className="h-5 w-5 text-navy-600" /> {s.title}
                </span>
              ))}
            </div>
            <p className="mt-4 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Six services, one team</p>
          </div>
          <div className={`${tile} relative flex min-h-[150px] items-center bg-gradient-to-br from-sky-300/60 to-ice-100 lg:col-span-3`}>
            <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
              <path d="M0 85 C 40 70, 60 92, 100 62 S 160 70, 200 38 S 260 48, 300 10" pathLength="1" className="draw-loop" stroke="#003af2" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <path d="M0 95 C 50 85, 80 98, 120 78 S 190 84, 230 58 S 280 62, 300 40" pathLength="1" className="draw-loop" stroke="#002070" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ animationDelay: "0.4s" }} />
            </svg>
            <p className="relative max-w-[12rem] px-7 text-2xl font-bold leading-tight text-navy-900">Risk, managed.</p>
            <svg viewBox="0 0 200 200" className="orbit absolute -right-10 -top-10 h-40 w-40" aria-hidden="true">
              <defs><path id="circ" d="M100 100 m-70 0 a70 70 0 1 1 140 0 a70 70 0 1 1 -140 0" /></defs>
              <text fontSize="15" fontWeight="700" letterSpacing="4" fill="#002070" opacity="0.7"><textPath href="#circ">INTEGRASI • KOLABORASI • KESINAMBUNGAN •</textPath></text>
            </svg>
          </div>
        </div>
      </div>
      <Tag>Hero B · Bento</Tag>
    </section>
  );
}

// Hero M: a glow follows your mouse, and layers of lines drift at different speeds as you move.
export function HeroM() {
  const ref = useRef(null);
  function move(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--px", `${x * 100}%`);
    el.style.setProperty("--py", `${y * 100}%`);
    el.style.setProperty("--mx", String((x - 0.5) * 2));
    el.style.setProperty("--my", String((y - 0.5) * 2));
  }
  const layer = (k) => ({ transform: `translate(calc(var(--mx, 0) * ${k * 26}px), calc(var(--my, 0) * ${k * 18}px))`, transition: "transform 0.4s ease-out" });
  const words = ["Integrated.", "Collaborative.", "Continuous."];

  return (
    <section id="hero-m" ref={ref} onMouseMove={move} className={`${base} flex items-center bg-white`} style={{ "--px": "70%", "--py": "40%" }}>
      <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(520px circle at var(--px) var(--py), rgba(0,58,242,0.16), transparent 65%)" }} />
      <div className="absolute inset-0 -z-10" style={{ backgroundImage: "radial-gradient(#003af2 1.2px, transparent 1.2px)", backgroundSize: "26px 26px", maskImage: "radial-gradient(340px circle at var(--px) var(--py), black, transparent 70%)", WebkitMaskImage: "radial-gradient(340px circle at var(--px) var(--py), black, transparent 70%)", opacity: 0.55 }} />
      <div className="absolute inset-0 -z-10" style={layer(1)}><FlowLines color="#003af2" opacity={0.35} /></div>
      <div className="absolute inset-0 -z-10 scale-110" style={layer(-1.6)}><FlowLines color="#6f93ff" opacity={0.45} className="" /></div>
      <span className="orbit absolute -right-40 -top-40 -z-10 h-[620px] w-[620px] rounded-full" style={{ background: "conic-gradient(from 0deg, rgba(0,58,242,0.18), rgba(169,191,255,0.05), rgba(0,58,242,0.18))", filter: "blur(30px)" }} />
      <div className={`${wrap} pb-16 pt-32`}>
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-navy-600"><span className="h-2 w-2 animate-pulse rounded-full bg-navy-600" /> Integrasi · Kolaborasi · Kesinambungan</p>
        <h1 className="mt-6 text-6xl font-bold leading-[0.98] sm:text-8xl lg:text-[8rem]">
          {words.map((w, n) => (
            <span key={w} className={`block ${n === 1 ? "shine-text" : "text-navy-900"}`} style={{ transform: `translateX(calc(var(--mx, 0) * ${(n - 1) * 14}px))`, transition: "transform 0.4s ease-out" }}>{w}</span>
          ))}
        </h1>
        <p className="mt-7 max-w-xl text-xl leading-relaxed text-muted">Risk, insurance and business advice, brought together by one team in Jakarta.</p>
        <Buttons />
      </div>
      <Tag>Hero M · Mouse aurora</Tag>
    </section>
  );
}
