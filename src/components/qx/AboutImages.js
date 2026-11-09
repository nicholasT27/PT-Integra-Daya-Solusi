"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowButton, DetailTab } from "@/components/quinn/Bits";
import { Reveal, CountUp } from "@/components/quinn/Interactive";
import { company } from "@/lib/site";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// A small tag in the corner naming each option.
function Tag({ children }) {
  return <span className="absolute left-4 top-24 z-20 rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-white shadow">{children}</span>;
}

// A piece of the brand photo. "zoom" and "pos" choose which part to show. The photo is only 736 px wide, so every
// piece is shown small enough to stay sharp.
function Crop({ className = "", zoom = 1, pos = "50% 50%", sizes = "400px" }) {
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <Image src="/brand/skyscrapers.jpg" alt="Glass office towers seen from below" fill unoptimized sizes={sizes} className="object-cover" style={{ objectPosition: pos, transform: `scale(${zoom})`, transformOrigin: pos }} />
    </span>
  );
}

// The company information shown on the left in every option.
function Info() {
  return (
    <div>
      <Reveal><DetailTab className="text-navy-600">About IDS</DetailTab></Reveal>
      <Reveal delay={80}><h2 className="mt-6 text-balance text-4xl font-bold leading-[1.05] text-navy-900 sm:text-5xl">The only partner you need to look at <span className="shine-text">every angle of your risk.</span></h2></Reveal>
      <Reveal delay={160}>
        <p className="mt-6 max-w-lg indent-10 leading-relaxed text-muted">
          PT Integra Daya Solusi is a Jakarta consultancy of insurance, risk, legal, finance and engineering specialists. Most firms split these into separate advisers. At IDS they are integrated from the start, which means fewer people, faster answers and strategies that fit together.
        </p>
      </Reveal>
      <Reveal delay={240}>
        <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-navy-900/15 pt-6">
          <div><dd className="text-4xl font-bold text-navy-600"><CountUp to={6} /></dd><dt className="mt-1 text-xs text-muted">Specialist services</dt></div>
          <div><dd className="text-4xl font-bold text-navy-600"><CountUp to={1} /></dd><dt className="mt-1 text-xs text-muted">Integrated team</dt></div>
          <div><dd className="text-4xl font-bold text-navy-600"><CountUp to={3} /></dd><dt className="mt-1 text-xs text-muted">Core pillars</dt></div>
        </dl>
        <p className="mt-6 text-sm leading-relaxed text-muted"><strong className="text-navy-900">Our office.</strong> {company.addressLines[0]}, {company.addressLines[1].split(",")[0]}, {company.addressLines[2]}.</p>
        <div className="mt-8"><ArrowButton href="/about">About us</ArrowButton></div>
      </Reveal>
    </div>
  );
}

// Option 1: one framed photo with an outline that keeps tracing around it, a logo badge and a floating fact card.
// The whole frame tilts a little towards the cursor.
export function ImgFrame() {
  const ref = useRef(null);
  function move(e) {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--ry", String(((e.clientX - r.left) / r.width - 0.5) * 12));
    ref.current.style.setProperty("--rx", String(-((e.clientY - r.top) / r.height - 0.5) * 9));
  }
  return (
    <section className="relative py-32" data-tone="#e4ecff" data-glow="1.1">
      <Tag>Image 1 · Framed photo</Tag>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Info />
        <Reveal delay={150}>
          <div ref={ref} onMouseMove={move} onMouseLeave={() => { ref.current.style.setProperty("--ry", "0"); ref.current.style.setProperty("--rx", "0"); }} className="relative mx-auto w-full max-w-[560px] py-8" style={{ perspective: "1200px", "--rx": 0, "--ry": 0 }}>
            <div className="relative" style={{ transform: "rotateX(calc(var(--rx) * 1deg)) rotateY(calc(var(--ry) * 1deg))", transition: "transform 0.3s ease-out", transformStyle: "preserve-3d" }}>
              <svg viewBox="0 0 100 62" preserveAspectRatio="none" className="pointer-events-none absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)]" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="98" height="60" rx="6" pathLength="1" className="flow-line" stroke="#003af2" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ "--d": "8s" }} />
                <rect x="1" y="1" width="98" height="60" rx="6" stroke="#003af2" strokeOpacity="0.15" vectorEffect="non-scaling-stroke" />
              </svg>
              <Crop className="aspect-[736/437] w-full rounded-[1.6rem] shadow-2xl ring-1 ring-white" sizes="560px" />
              <span className="float absolute -bottom-8 -left-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-xl" style={{ transform: "translateZ(40px)" }}>
                <Image src="/brand/ids-mark-blue.svg" alt="IDS" width={120} height={41} className="w-14" />
                <span className="border-l border-navy-900/15 pl-3 text-xs leading-tight text-muted"><strong className="block text-sm text-navy-900">Jakarta</strong>Menara MTH, Tebet</span>
              </span>
              <span className="tilt absolute -right-4 top-6 rounded-full bg-navy-600 px-4 py-2 text-xs font-bold text-white shadow-xl" style={{ transform: "translateZ(50px)" }}>Integrated team</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Option 2: a collage of three different pieces of the photo, each a different shape, floating at different speeds.
export function ImgCollage() {
  return (
    <section className="relative py-32" data-tone="#dde7ff" data-glow="1.15">
      <Tag>Image 2 · Collage</Tag>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Info />
        <Reveal delay={150}>
          <div className="relative mx-auto h-[500px] w-full max-w-[540px]">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
              <path d="M12 88 C 30 60, 20 40, 48 38 S 80 30, 90 8" pathLength="1" className="flow-line" stroke="#003af2" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ "--d": "7s" }} />
              <path d="M12 88 C 30 60, 20 40, 48 38 S 80 30, 90 8" stroke="#003af2" strokeOpacity="0.15" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="float absolute right-0 top-0 block" style={{ animationDuration: "6s" }}><Crop zoom={1.15} pos="50% 40%" sizes="420px" className="h-[250px] w-[330px] rounded-[2rem] shadow-2xl ring-4 ring-white" /></span>
            <span className="float absolute bottom-0 left-0 block" style={{ animationDuration: "7.5s", animationDelay: "-2s" }}><Crop zoom={1.6} pos="12% 60%" sizes="220px" className="h-[290px] w-[200px] rounded-t-full shadow-2xl ring-4 ring-white" /></span>
            <span className="float absolute bottom-6 right-6 block" style={{ animationDuration: "5.5s", animationDelay: "-4s" }}><Crop zoom={1.9} pos="85% 30%" sizes="170px" className="h-[170px] w-[170px] rounded-full shadow-2xl ring-4 ring-white" /></span>
            <span className="tilt absolute left-6 top-8 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl"><Image src="/brand/ids-mark-blue.svg" alt="IDS" width={120} height={41} className="w-14" /></span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Option 3: scroll-driven. The photo starts as a small circle and opens into a wide frame as you scroll,
// while the logo outline around it draws itself. It stays pinned for about two screens.
export function ImgReveal() {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    function update() {
      const r = ref.current.getBoundingClientRect();
      setP(clamp(-r.top / Math.max(1, r.height - window.innerHeight)));
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  const e = clamp(p * 1.5);
  const radius = 50 - 44 * e;
  return (
    <section ref={ref} className="relative h-[240vh]" data-tone="#dce7ff" data-glow="1.2">
      <Tag>Image 3 · Opening frame</Tag>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pt-16 sm:px-8 lg:grid-cols-2">
          <Info />
          <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center">
            <div className="relative aspect-[736/437] w-full">
              <span className="absolute left-1/2 top-1/2 block overflow-hidden shadow-2xl ring-4 ring-white" style={{ width: `${30 + 70 * e}%`, height: `${51 + 49 * e}%`, transform: "translate(-50%, -50%)", borderRadius: `${radius}%/${radius * (0.6 + 0.4 * (1 - e))}%` }}>
                <Image src="/brand/skyscrapers.jpg" alt="Glass office towers seen from below" fill unoptimized sizes="560px" className="object-cover" style={{ transform: `scale(${1.5 - 0.5 * e})` }} />
              </span>
              {[0, 1, 2].map((i) => <span key={i} className="absolute left-1/2 top-1/2 rounded-full border border-navy-600/25" style={{ width: `${46 + i * 22}%`, aspectRatio: "1", transform: `translate(-50%, -50%) scale(${1 + (1 - e) * 0.15})`, opacity: 1 - e * 0.8, borderStyle: i === 1 ? "dashed" : "solid" }} />)}
              <span className="absolute -bottom-6 right-3 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-navy-900 shadow-xl transition-opacity duration-500" style={{ opacity: clamp((p - 0.5) * 4) }}>Six disciplines. <span className="text-navy-600">One team.</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
