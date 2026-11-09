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
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);

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

// Hero A: six glass cards in 3D that tilt towards your mouse and lift up when you point at one.
export function HeroA() {
  const ref = useRef(null);
  function move(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--rx", String(-((e.clientY - r.top) / r.height - 0.5) * 16));
    el.style.setProperty("--ry", String(((e.clientX - r.left) / r.width - 0.5) * 22));
  }
  function leave() {
    ref.current?.style.setProperty("--rx", "0");
    ref.current?.style.setProperty("--ry", "0");
  }
  return (
    <section id="hero-a" ref={ref} onMouseMove={move} onMouseLeave={leave} className={`${base} mesh flex items-center`} style={{ "--rx": 0, "--ry": 0 }}>
      <FlowLines className="-z-10" color="#003af2" opacity={0.3} />
      <div className={`${wrap} grid items-center gap-14 pb-16 pt-32 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-navy-600"><span className="h-2 w-2 animate-pulse rounded-full bg-navy-600" /> Integrated solutions.</p>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.04] text-navy-900 sm:text-6xl">Everything your business needs to <span className="shine-text">stay protected.</span></h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">Six specialist services from one Jakarta team. Point at a card to explore.</p>
          <Buttons />
        </div>
        <div className="lg:col-span-7" style={{ perspective: "1400px" }}>
          <div className="grid grid-cols-2 gap-4 sm:gap-5" style={{ transformStyle: "preserve-3d", transform: "rotateX(calc(var(--rx) * 1deg)) rotateY(calc(var(--ry) * 1deg))", transition: "transform 0.25s ease-out" }}>
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group block"
                style={{ transform: `translateZ(${20 + (i % 3) * 22}px) translateY(${i % 2 ? 22 : 0}px)`, transformStyle: "preserve-3d", transition: "transform 0.3s ease-out" }}
              >
                <span className="bob block rounded-3xl border border-white/80 bg-white/65 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.04] group-hover:bg-white group-hover:shadow-2xl" style={{ animationDelay: `-${i * 0.8}s` }}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-600 text-white transition-transform duration-300 group-hover:rotate-6"><Icon name={s.icon} /></span>
                  <span className="mt-4 block text-lg font-bold leading-tight text-navy-900">{s.title}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted">{s.short}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Tag>Hero A · 3D tilt cards</Tag>
    </section>
  );
}

// Hero B: the hero is a service navigator. Point at a service and the whole panel changes.
export function HeroB() {
  const [a, setA] = useState(0);
  const s = services[a];
  return (
    <section id="hero-b" className={`${base} flex items-center bg-ice-50`}>
      <div className="mesh absolute inset-0 -z-10 transition-[filter] duration-700" style={{ filter: `hue-rotate(${a * 9 - 20}deg)` }} />
      <FlowLines className="-z-10" color="#003af2" opacity={0.25} />
      <div className={`${wrap} grid items-center gap-12 pb-16 pt-32 lg:grid-cols-12`}>
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-navy-600"><span className="h-2 w-2 animate-pulse rounded-full bg-navy-600" /> Six disciplines. One team.</p>
          <h1 className="sr-only">PT Integra Daya Solusi services</h1>
          <ul className="mt-6" role="tablist" aria-label="Services">
            {services.map((x, i) => (
              <li key={x.slug}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={a === i}
                  onMouseEnter={() => setA(i)}
                  onFocus={() => setA(i)}
                  onClick={() => setA(i)}
                  className={`group flex w-full items-center gap-4 py-1.5 text-left text-3xl font-bold leading-tight transition-all duration-300 sm:text-4xl lg:text-[2.7rem] ${a === i ? "translate-x-3 text-navy-900" : "text-navy-900/25 hover:text-navy-900/60"}`}
                >
                  <span className={`h-[3px] rounded-full bg-navy-600 transition-all duration-500 ${a === i ? "w-14" : "w-0"}`} />
                  {x.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5">
          <div key={a} className="animate-rise relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/75 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
            <span className="orbit absolute -right-16 -top-16 h-56 w-56 rounded-full border border-dashed border-navy-600/25" />
            <span className="orbit-slow absolute -right-6 -top-6 h-36 w-36 rounded-full border border-navy-600/15" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-600 text-white shadow-lg"><Icon name={s.icon} className="h-8 w-8" /></span>
            <h2 className="relative mt-6 text-3xl font-bold leading-tight text-navy-900">{s.title}</h2>
            <p className="relative mt-3 leading-relaxed text-muted">{s.intro}</p>
            <ul className="relative mt-5 space-y-2 text-sm text-navy-900">
              {s.offerings.slice(0, 3).map((o) => (
                <li key={o} className="flex gap-2"><span className="text-navy-600">●</span> {o}</li>
              ))}
            </ul>
            <div className="relative mt-7"><ArrowButton href={`/services/${s.slug}`}>Explore {s.title.split(" ")[0]}</ArrowButton></div>
          </div>
        </div>
      </div>
      <Tag>Hero B · Service navigator</Tag>
    </section>
  );
}

// Hero C: as you scroll, the six services fly in from every corner and snap together around the logo.
export function HeroC() {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    function update() {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setP(clamp(-r.top / (r.height - window.innerHeight)));
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const e = smooth(clamp(p / 0.68));
  const stage = p < 0.26 ? 0 : p < 0.62 ? 1 : 2;
  const scatter = [[6, 14], [90, 8], [10, 84], [94, 74], [52, 2], [46, 98]];
  const nodes = services.map((s, i) => {
    const ang = ((-90 + i * 60) * Math.PI) / 180;
    return { s, x: lerp(scatter[i][0], 50 + 35 * Math.cos(ang), e), y: lerp(scatter[i][1], 50 + 35 * Math.sin(ang), e) };
  });
  const texts = [
    ["Risk never arrives in one piece.", "Insurance, contracts, tax and operations are all affected at once."],
    ["So the advice should not come in pieces either.", "Specialists who talk to each other, from the very first conversation."],
    ["Six disciplines. One integrated team.", "PT Integra Daya Solusi, Menara MTH, Jakarta."],
  ];

  return (
    <section id="hero-c" ref={ref} className="relative h-[340vh] bg-white">
      <div className="mesh sticky top-0 isolate flex h-screen items-center overflow-hidden">
        <FlowLines className="-z-10" color="#003af2" opacity={0.22} />
        <div className={`${wrap} grid items-center gap-6 pt-20 lg:grid-cols-2`}>
          <div className="relative min-h-[260px] sm:min-h-[300px]">
            {texts.map(([h, t], i) => (
              <div key={i} className="absolute inset-0 flex flex-col justify-center transition-all duration-700" style={{ opacity: stage === i ? 1 : 0, transform: `translateY(${stage === i ? 0 : stage > i ? -30 : 30}px)`, pointerEvents: stage === i ? "auto" : "none" }}>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-navy-600">0{i + 1} / 03</p>
                <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.05] text-navy-900 sm:text-6xl">{h}</h1>
                <p className="mt-4 max-w-md text-lg text-muted">{t}</p>
                {i === 2 && <Buttons />}
              </div>
            ))}
          </div>
          <div className="relative mx-auto aspect-square w-[min(80vw,46vh,560px)] lg:w-[min(46vw,72vh,560px)]">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
              {nodes.map((n, i) => (
                <line key={i} x1="50" y1="50" x2={n.x} y2={n.y} stroke="#003af2" strokeOpacity={0.08 + 0.55 * e} strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeDasharray="4 5" />
              ))}
            </svg>
            <span className="absolute inset-[15%] rounded-full border border-dashed border-navy-600/30 transition-opacity" style={{ opacity: e }} />
            {nodes.map((n, i) => (
              <Link key={n.s.slug} href={`/services/${n.s.slug}`} aria-label={n.s.title} className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
                <span className="flex h-[3.8rem] w-[3.8rem] items-center justify-center rounded-full bg-white text-navy-600 shadow-xl ring-1 ring-navy-600/15 transition-transform group-hover:scale-110" style={{ transform: `rotate(${(1 - e) * 220}deg)` }}><Icon name={n.s.icon} className="h-7 w-7" /></span>
                <span className="absolute top-full mt-2 whitespace-nowrap rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-white transition-opacity" style={{ opacity: clamp((e - 0.8) * 5) }}>{n.s.title}</span>
              </Link>
            ))}
            <div className="absolute left-1/2 top-1/2 flex h-[27%] w-[27%] items-center justify-center rounded-full bg-white shadow-2xl ring-1 ring-navy-600/10" style={{ transform: `translate(-50%, -50%) scale(${0.55 + 0.45 * e})`, opacity: 0.3 + 0.7 * e }}>
              <Image src="/brand/ids-mark-blue.svg" alt="IDS" width={160} height={54} className="w-[64%]" priority />
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-navy-600 transition-opacity" style={{ opacity: p < 0.05 ? 1 : 0 }}>
          Scroll <span className="nudge text-lg">↓</span>
        </div>
        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-2 lg:flex" aria-hidden="true">
          {[0, 1, 2].map((i) => <span key={i} className={`w-1.5 rounded-full bg-navy-600 transition-all duration-500 ${stage === i ? "h-8" : "h-1.5 opacity-30"}`} />)}
        </div>
        <Tag>Hero C · Scroll assembly</Tag>
      </div>
    </section>
  );
}

// Hero D: a living network of points that drifts forever and reaches out to your cursor.
export function HeroD() {
  const secRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const sec = secRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const labels = ["Risk", "Insurance", "Retirement", "Legal", "Tax", "Industrial"];
    let w = 0, h = 0, raf = 0, pts = [];
    const mouse = { x: -999, y: -999 };

    function resize() {
      const r = sec.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(clamp((w * h) / 13000, 40, 120));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 }));
    }

    function frame(t) {
      ctx.clearRect(0, 0, w, h);
      const wide = w > 900;
      const cx = wide ? w * 0.72 : w * 0.5, cy = wide ? h * 0.5 : h * 0.74;
      const rx = wide ? w * 0.18 : w * 0.34, ry = wide ? h * 0.3 : h * 0.16;
      const hubs = labels.map((l, i) => ({ l, x: cx + rx * Math.cos(t * 0.00028 + i * 1.047), y: cy + ry * Math.sin(t * 0.00038 + i * 1.047) }));

      for (const p of pts) {
        if (!reduce) {
          p.x += p.vx; p.y += p.vy;
          const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
          if (d < 200 && d > 1) { p.x += (dx / d) * 0.5; p.y += (dy / d) * 0.5; }
          if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
        }
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 130) { ctx.strokeStyle = `rgba(0,58,242,${(1 - d / 130) * 0.28})`; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
        }
        const dm = Math.hypot(pts[i].x - mouse.x, pts[i].y - mouse.y);
        if (dm < 200) { ctx.strokeStyle = `rgba(0,58,242,${(1 - dm / 200) * 0.6})`; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
        for (const hb of hubs) {
          const dh = Math.hypot(pts[i].x - hb.x, pts[i].y - hb.y);
          if (dh < 170) { ctx.strokeStyle = `rgba(0,58,242,${(1 - dh / 170) * 0.5})`; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(hb.x, hb.y); ctx.stroke(); }
        }
        ctx.fillStyle = "rgba(0,58,242,0.55)"; ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, 1.8, 0, 6.2832); ctx.fill();
      }
      ctx.font = "600 13px system-ui, sans-serif";
      for (const hb of hubs) {
        const glow = ctx.createRadialGradient(hb.x, hb.y, 2, hb.x, hb.y, 34);
        glow.addColorStop(0, "rgba(0,58,242,0.35)"); glow.addColorStop(1, "rgba(0,58,242,0)");
        ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(hb.x, hb.y, 34, 0, 6.2832); ctx.fill();
        ctx.fillStyle = "#003af2"; ctx.beginPath(); ctx.arc(hb.x, hb.y, 8, 0, 6.2832); ctx.fill();
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 3; ctx.stroke(); ctx.lineWidth = 1;
        const tw = ctx.measureText(hb.l).width + 22;
        ctx.fillStyle = "#002070"; ctx.beginPath(); ctx.roundRect(hb.x - tw / 2, hb.y + 16, tw, 24, 12); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.fillText(hb.l, hb.x, hb.y + 32);
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    }

    function onMove(e) { const r = sec.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; }
    function onLeave() { mouse.x = -999; mouse.y = -999; }
    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    sec.addEventListener("mousemove", onMove);
    sec.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      sec.removeEventListener("mousemove", onMove);
      sec.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="hero-d" ref={secRef} className={`${base} flex items-center bg-gradient-to-br from-white via-ice-50 to-ice-100`}>
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" aria-hidden="true" />
      <div className={`${wrap} pb-24 pt-32`}>
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-navy-600"><span className="h-2 w-2 animate-pulse rounded-full bg-navy-600" /> Integrasi · Kolaborasi · Kesinambungan</p>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.04] text-navy-900 sm:text-6xl">Everything is <span className="shine-text">connected.</span> Your advice should be too.</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">Risk, insurance, legal, tax and engineering expertise, linked into one team. Move your mouse and reach out.</p>
          <Buttons />
        </div>
      </div>
      <Tag>Hero D · Living constellation</Tag>
    </section>
  );
}
