"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DetailTab } from "@/components/quinn/Bits";
import { Reveal, CountUp } from "@/components/quinn/Interactive";
import Icon from "@/components/Icon";
import { services } from "@/lib/site";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const intro = "Complex issues merit careful time and strategy; simpler ones, efficient execution. At IDS you get specialist rigour from a single, coordinated team, with advice you can act on.";
const stats = [
  { n: 6, big: "6", label: "Services", text: "Specialist disciplines under one roof" },
  { n: 1, big: "1", label: "Team", text: "Insurance, legal, finance and engineering working together" },
  { n: 3, big: "3", label: "Pillars", text: "Integration, collaboration and continuity" },
  { n: null, big: "JKT", label: "Based", text: "Menara MTH, Tebet, South Jakarta" },
];

// A small tag in the corner naming each option.
function Tag({ children }) {
  return <span className="absolute left-4 top-24 z-20 rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-white shadow">{children}</span>;
}

// The big "Real value." heading and its paragraph, shared by most options.
function Heading({ center = false }) {
  return (
    <div className={`grid gap-10 lg:grid-cols-10 ${center ? "text-center" : ""}`}>
      <Reveal className="lg:col-span-6"><h2 className="text-6xl font-bold leading-none text-navy-900 sm:text-8xl">Real <span className="shine-text">value.</span></h2></Reveal>
      <Reveal className="lg:col-span-4" delay={120}><p className="indent-10 leading-relaxed text-muted">{intro}</p></Reveal>
    </div>
  );
}

// Option 1: no cards. Four huge outlined numbers separated by lines that draw themselves. A number fills in when you point at it.
export function ValueNumbers() {
  const [h, setH] = useState(-1);
  return (
    <section className="relative py-32" data-tone="#f5f8ff" data-glow="0.9">
      <Tag>Value 1 · Giant numbers</Tag>
      <div className={wrap}>
        <Heading />
        <div className="mt-20 grid border-t border-navy-900/15 lg:grid-cols-4" onMouseLeave={() => setH(-1)}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 120}>
              <div onMouseEnter={() => setH(i)} className={`h-full border-b border-navy-900/15 px-2 py-10 transition-opacity duration-300 lg:border-b-0 lg:px-6 ${i ? "lg:border-l" : ""} ${h !== -1 && h !== i ? "opacity-35" : ""}`}>
                <span className="block text-[clamp(5rem,13vw,10rem)] font-bold leading-[0.9] tracking-tight transition-all duration-500" style={h === i ? { color: "#003af2", WebkitTextStroke: "0px" } : { color: "transparent", WebkitTextStroke: "2px #003af2" }}>{s.n ? <CountUp to={s.n} /> : s.big}</span>
                <p className="mt-4 text-xl font-bold text-navy-900">{s.label}</p>
                <p className="mt-1 max-w-[16rem] text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Option 2: a bento grid. Each tile has its own small moving picture that explains the number.
export function ValueBento() {
  const tile = "relative overflow-hidden rounded-3xl border border-white bg-white/70 p-7 shadow-lg backdrop-blur-xl";
  return (
    <section className="relative py-32" data-tone="#eaf0ff" data-glow="1">
      <Tag>Value 2 · Bento tiles</Tag>
      <div className={wrap}>
        <Heading />
        <div className="mt-16 grid gap-4 lg:grid-cols-6">
          <Reveal className="lg:col-span-3"><div className={`${tile} h-full min-h-[300px]`}>
            <p className="text-7xl font-bold text-navy-600"><CountUp to={6} /></p>
            <p className="text-xl font-bold text-navy-900">Services</p>
            <p className="mt-1 max-w-[14rem] text-sm text-muted">Specialist disciplines under one roof</p>
            <div className="absolute -bottom-10 -right-10 h-56 w-56">
              <span className="absolute inset-0 rounded-full border border-dashed border-navy-600/30" />
              <div className="orbit absolute inset-0">{services.map((s, i) => <span key={s.slug} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${i * 60}deg) translateY(-6.5rem)` }}><span className="orbit-rev -ml-4 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-navy-600 text-white" style={{ transform: `rotate(${-i * 60}deg)` }}><Icon name={s.icon} className="h-4 w-4" /></span></span>)}</div>
            </div>
          </div></Reveal>
          <Reveal className="lg:col-span-3" delay={100}><div className={`${tile} h-full min-h-[300px] !bg-navy-900 !text-white`}>
            <p className="text-7xl font-bold text-sky-300"><CountUp to={1} /></p>
            <p className="text-xl font-bold">Team</p>
            <p className="mt-1 max-w-[16rem] text-sm text-white/75">Insurance, legal, finance and engineering working together</p>
            <Image src="/brand/ids-mark-white.svg" alt="" width={200} height={68} className="absolute bottom-6 right-6 w-40 opacity-90" />
          </div></Reveal>
          <Reveal className="lg:col-span-2" delay={200}><div className={`${tile} h-full min-h-[260px] !bg-sky-300`}>
            <p className="text-7xl font-bold text-navy-900"><CountUp to={3} /></p>
            <p className="text-xl font-bold text-navy-900">Pillars</p>
            <p className="mt-6 space-y-1 text-sm font-semibold text-navy-900"><span className="block">Integrasi</span><span className="block">Kolaborasi</span><span className="block">Kesinambungan</span></p>
          </div></Reveal>
          <Reveal className="lg:col-span-4" delay={300}><div className={`${tile} flex h-full min-h-[260px] items-end justify-between !bg-navy-600 !text-white`}>
            <div>
              <p className="text-7xl font-bold">JKT</p>
              <p className="text-xl font-bold">Based</p>
              <p className="mt-1 text-sm text-white/80">Menara MTH, Tebet, South Jakarta</p>
            </div>
            <Clock />
          </div></Reveal>
        </div>
      </div>
    </section>
  );
}

// A live clock for Jakarta time, used inside the bento tile.
function Clock() {
  const [t, setT] = useState(null);
  useEffect(() => { const f = () => setT(new Date()); f(); const i = setInterval(f, 1000); return () => clearInterval(i); }, []);
  const part = (o) => (t ? new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jakarta", ...o }).format(t) : "--:--");
  return <div className="text-right"><p className="text-xs font-semibold uppercase tracking-widest text-sky-300">Jakarta · now</p><p className="text-5xl font-bold tabular-nums">{part({ hour: "2-digit", minute: "2-digit", hour12: false })}</p></div>;
}

// Option 3: the section stays pinned and one giant figure swaps for the next as you scroll, each with its own sentence.
export function ValuePinned() {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    function update() { const r = ref.current.getBoundingClientRect(); setP(clamp(-r.top / Math.max(1, r.height - window.innerHeight))); }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  const a = Math.min(3, Math.floor(p * 4));
  return (
    <section ref={ref} className="relative h-[340vh]" data-tone="#e4ecff" data-glow="1.1">
      <Tag>Value 3 · Pinned figures</Tag>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className={`${wrap} grid items-center gap-10 pt-16 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <DetailTab className="text-navy-600">Why IDS</DetailTab>
            <h2 className="mt-6 text-6xl font-bold leading-none text-navy-900 sm:text-7xl">Real <span className="shine-text">value.</span></h2>
            <p className="mt-6 max-w-sm leading-relaxed text-muted">{intro}</p>
            <div className="mt-8 flex gap-2" aria-hidden="true">{stats.map((_, i) => <span key={i} className={`h-2 rounded-full bg-navy-600 transition-all duration-500 ${a === i ? "w-10" : "w-2 opacity-25"}`} />)}</div>
          </div>
          <div className="relative lg:col-span-7">
            <div key={a} className="animate-rise rounded-[2rem] border border-white bg-white/75 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-14">
              <p className="text-[clamp(7rem,22vw,15rem)] font-bold leading-[0.85] tracking-tight text-navy-600">{stats[a].big}</p>
              <p className="mt-4 text-3xl font-bold text-navy-900">{stats[a].label}</p>
              <p className="mx-auto mt-2 max-w-sm text-muted">{stats[a].text}</p>
            </div>
            <span className="absolute -right-3 top-8 hidden rounded-full bg-navy-900 px-4 py-2 text-xs font-bold text-white shadow-xl sm:block">0{a + 1} / 04</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const claims = [
  { t: "Careful time for complex issues", d: "Hard problems get proper strategy, not a quick answer.", w: 92 },
  { t: "Efficient execution for simpler ones", d: "Routine matters are handled quickly and cleanly.", w: 78 },
  { t: "Specialist rigour, one team", d: "Every discipline works from the same facts.", w: 100 },
  { t: "Advice you can act on", d: "Clear, prioritised next steps, not just reports.", w: 86 },
];

// Option 4: the statement on the left stays in view while four value claims on the right fill in with drawn bars.
export function ValueClaims() {
  return (
    <section className="relative py-32" data-tone="#dde7ff" data-glow="1.05">
      <Tag>Value 4 · Claims list</Tag>
      <div className={`${wrap} grid gap-14 lg:grid-cols-12`}>
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <Reveal><DetailTab className="text-navy-600">Why IDS</DetailTab></Reveal>
          <Reveal><h2 className="mt-6 text-6xl font-bold leading-none text-navy-900 sm:text-8xl">Real <span className="shine-text">value.</span></h2></Reveal>
          <Reveal delay={120}><p className="mt-6 max-w-sm indent-10 leading-relaxed text-muted">{intro}</p></Reveal>
          <Reveal delay={200}>
            <div className="mt-8 flex gap-8">{stats.slice(0, 3).map((s) => <div key={s.label}><p className="text-4xl font-bold text-navy-600"><CountUp to={s.n} /></p><p className="text-xs text-muted">{s.label}</p></div>)}</div>
          </Reveal>
        </div>
        <ol className="lg:col-span-7">
          {claims.map((c, i) => (
            <Reveal key={c.t} delay={i * 100}>
              <li className="border-t border-navy-900/15 py-8 last:border-b">
                <div className="flex items-baseline gap-5">
                  <span className="text-lg font-semibold text-navy-600">0{i + 1}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-navy-900 sm:text-3xl">{c.t}</h3>
                    <p className="mt-1 text-sm text-muted">{c.d}</p>
                    <Bar w={c.w} />
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

// A thin bar that grows to its width when it scrolls into view.
function Bar({ w }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-navy-600/10"><div className="h-full rounded-full bg-gradient-to-r from-navy-600 to-sky-300 transition-all duration-[1400ms] ease-out" style={{ width: on ? `${w}%` : "0%" }} /></div>;
}
