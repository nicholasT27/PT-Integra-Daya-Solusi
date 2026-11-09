"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowButton, DetailTab } from "@/components/quinn/Bits";
import { Reveal, CountUp } from "@/components/quinn/Interactive";
import { company } from "@/lib/site";

// The brand photo. It is only 736 px wide, so it is always shown smaller than that to stay sharp.
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

// The third section of the home page: company information on the left, one framed photo with an outline that keeps tracing around it, a logo badge and a floating fact card.
// The whole frame tilts a little towards the cursor.
export default function AboutSection() {
  const ref = useRef(null);
  function move(e) {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--ry", String(((e.clientX - r.left) / r.width - 0.5) * 12));
    ref.current.style.setProperty("--rx", String(-((e.clientY - r.top) / r.height - 0.5) * 9));
  }
  return (
    <section id="about" className="relative py-32" data-tone="#e4ecff" data-glow="1.1">
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
              <span className="float absolute -bottom-8 -left-1 flex sm:-left-6 items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-xl" style={{ transform: "translateZ(40px)" }}>
                <Image src="/brand/ids-mark-blue.svg" alt="IDS" width={120} height={41} className="w-14" />
                <span className="border-l border-navy-900/15 pl-3 text-xs leading-tight text-muted"><strong className="block text-sm text-navy-900">Jakarta</strong>Menara MTH, Tebet</span>
              </span>
              <span className="tilt absolute -right-1 top-6 rounded-full sm:-right-4 bg-navy-600 px-4 py-2 text-xs font-bold text-white shadow-xl" style={{ transform: "translateZ(50px)" }}>Integrated team</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
