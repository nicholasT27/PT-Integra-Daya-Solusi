import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { ArrowButton } from "@/components/quinn/Bits";
import FlowLines from "./FlowLines";
import { services } from "@/lib/site";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const base = "relative isolate overflow-hidden min-h-[max(100vh,800px)]";

// A small tag in the corner naming each design.
function Tag({ children }) {
  return <span className="absolute bottom-4 left-4 z-20 rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-white shadow">{children}</span>;
}

// A small round or shaped piece of the brand photo, used as a finishing touch (never enlarged).
function Cherry({ size = 120, className = "", shape = "rounded-full" }) {
  return (
    <span className={`relative block shrink-0 overflow-hidden shadow-xl ring-4 ring-white ${shape} ${className}`} style={{ width: size, height: size }}>
      <Image src="/brand/skyscrapers.jpg" alt="" fill unoptimized sizes={`${size}px`} className="object-cover" />
    </span>
  );
}

// A soft blurred colour glow that drifts slowly.
function Glow({ className, delay = 0 }) {
  return <span className={`drift absolute -z-10 rounded-full blur-3xl ${className}`} style={{ animationDelay: `-${delay}s` }} />;
}

// Hero A: bright and airy, with a small photo pill sitting inside the headline.
export function HeroA() {
  return (
    <section id="hero-a" className={`${base} flex items-center bg-white`}>
      <Glow className="-right-20 -top-10 h-[480px] w-[480px] bg-navy-600/30" />
      <Glow className="-left-32 top-1/3 h-[420px] w-[420px] bg-sky-300/70" delay={6} />
      <Glow className="bottom-[-120px] right-1/4 h-[380px] w-[380px] bg-ice-100" delay={11} />
      <FlowLines className="-z-10" color="#003af2" opacity={0.5} />
      <div className={`${wrap} pb-20 pt-36`}>
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-navy-600"><span className="h-2 w-2 rounded-full bg-navy-600" /> PT Integra Daya Solusi</p>
        <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[1.08] text-navy-900 sm:text-7xl">
          Risk,{" "}
          <Cherry size={84} shape="rounded-full" className="tilt mx-1 inline-block align-middle !h-[0.9em] !w-[1.7em] sm:!h-[0.95em]" />{" "}
          insurance and business advice, <span className="text-navy-600">brought together.</span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">A Jakarta consultancy of insurance, risk, legal, finance and engineering specialists, simplifying complexity so you can focus on what matters most.</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <ArrowButton href="/contact">Contact us</ArrowButton>
          <Link href="/services" className="inline-flex items-center rounded-full border border-navy-900/20 px-7 py-3 text-sm font-semibold text-navy-900 hover:bg-ice-50">Our services</Link>
        </div>
      </div>
      <Tag>Hero A · Airy + photo pill</Tag>
    </section>
  );
}

// Hero B: the logo in the middle of turning rings, with a tiny photo circling it like a cherry on top.
export function HeroB() {
  return (
    <section id="hero-b" className={`${base} flex items-center bg-gradient-to-br from-ice-50 via-white to-ice-100`}>
      <div className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: "radial-gradient(#003af2 1px, transparent 1px)", backgroundSize: "28px 28px", maskImage: "radial-gradient(ellipse at 70% 50%, black, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at 70% 50%, black, transparent 70%)" }} />
      <FlowLines className="-z-10" color="#003af2" opacity={0.35} />
      <div className={`${wrap} grid items-center gap-12 pb-16 pt-32 lg:grid-cols-2`}>
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-navy-600"><span className="h-2 w-2 rounded-full bg-navy-600" /> Integrasi · Kolaborasi · Kesinambungan</p>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.04] text-navy-900 sm:text-6xl">Six services.<br />One connected team.</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">Risk, insurance, retirement, legal, tax and industrial expertise, moving together around your business.</p>
          <div className="mt-9"><ArrowButton href="/contact">Contact us</ArrowButton></div>
        </div>
        <div className="relative mx-auto aspect-square w-[min(86vw,500px)]" style={{ "--s": "min(86vw, 500px)" }}>
          <span className="absolute inset-0 rounded-full border border-navy-600/25" />
          <span className="absolute inset-[14%] rounded-full border border-dashed border-navy-600/30" />
          <span className="absolute inset-[28%] rounded-full border border-navy-600/20" />
          <div className="orbit absolute inset-0">
            <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"><Cherry size={78} className="orbit-rev" /></span>
          </div>
          <div className="orbit-slow absolute inset-[14%]">
            {services.map((s, i) => {
              const a = (360 / services.length) * i;
              return (
                <div key={s.slug} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${a}deg) translateY(calc(var(--s) * -0.36))` }}>
                  <div style={{ transform: `rotate(${-a}deg)` }}>
                    <Link href={`/services/${s.slug}`} title={s.title} aria-label={s.title} className="orbit -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-600 shadow-lg ring-1 ring-navy-600/15 hover:scale-110">
                      <Icon name={s.icon} className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute inset-[34%] flex items-center justify-center rounded-full bg-white shadow-2xl ring-1 ring-navy-600/10">
            <Image src="/brand/ids-mark-blue.svg" alt="IDS" width={160} height={54} className="w-[62%]" priority />
          </div>
        </div>
      </div>
      <Tag>Hero B · Logo rings + cherry</Tag>
    </section>
  );
}

// Hero C: a soft gradient with a glass card, and the photo sitting on its corner like a cherry on a cake.
export function HeroC() {
  return (
    <section id="hero-c" className={`${base} flex items-center`} style={{ background: "linear-gradient(135deg, #ffffff 0%, #e4edff 35%, #9db8ff 70%, #2f5ff5 100%)" }}>
      <Glow className="-left-24 -top-24 h-[420px] w-[420px] bg-white/80" />
      <Glow className="bottom-0 right-0 h-[460px] w-[460px] bg-navy-600/40" delay={8} />
      <FlowLines className="-z-10" color="#ffffff" opacity={0.8} />
      <div className={`${wrap} pb-16 pt-36`}>
        <div className="relative mx-auto max-w-4xl rounded-[2.5rem] border border-white/70 bg-white/55 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-16">
          <span className="absolute -right-4 -top-10 sm:-right-8 sm:-top-14"><Cherry size={128} className="tilt" /></span>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-navy-600">Insurance · Risk · Engineering</p>
          <h1 className="mt-5 text-balance text-5xl font-bold leading-[1.04] text-navy-900 sm:text-7xl">Every angle of risk, handled by one team.</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">Insurance, legal, finance and engineering advice working together, so you can focus on what matters.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <ArrowButton href="/contact">Contact us</ArrowButton>
            <Link href="/services" className="inline-flex items-center rounded-full border border-navy-900/20 bg-white/60 px-7 py-3 text-sm font-semibold text-navy-900 hover:bg-white">Our services</Link>
          </div>
        </div>
      </div>
      <Tag>Hero C · Glass + cherry on top</Tag>
    </section>
  );
}

// Hero D: giant outlined words scroll across the background forever, with a small arch-shaped photo as the accent.
export function HeroD() {
  const words = ["Integrated", "Collaborative", "Continuous", "Trusted"];
  const row = [...words, ...words];
  const outline = { color: "transparent", WebkitTextStroke: "2px rgba(0,58,242,0.28)" };
  return (
    <section id="hero-d" className={`${base} flex items-center bg-gradient-to-b from-white to-ice-100`}>
      <div className="absolute inset-x-0 top-24 -z-10 overflow-hidden">
        <div className="marquee flex gap-16 text-[11rem] font-bold leading-none sm:text-[15rem]" style={{ ...outline, animationDuration: "70s" }}>
          {row.map((w, i) => <span key={i}>{w}</span>)}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-20 -z-10 overflow-hidden">
        <div className="marquee flex gap-16 text-[7rem] font-bold leading-none" style={{ ...outline, animationDuration: "90s", animationDirection: "reverse", WebkitTextStroke: "2px rgba(0,58,242,0.16)" }}>
          {row.map((w, i) => <span key={i}>{w}</span>)}
        </div>
      </div>
      <div className={`${wrap} grid items-center gap-10 pb-16 pt-32 lg:grid-cols-12`}>
        <div className="rounded-[2rem] bg-white/80 p-8 shadow-xl backdrop-blur-md sm:p-12 lg:col-span-8">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-navy-600"><span className="h-2 w-2 rounded-full bg-navy-600" /> Integrated solutions.</p>
          <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.05] text-navy-900 sm:text-6xl">Risk, insurance and business advice, brought together.</h1>
          <p className="mt-5 max-w-lg text-lg text-muted">We simplify complexity so you can focus on what matters most.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ArrowButton href="/contact">Contact us</ArrowButton>
            <Link href="/services" className="inline-flex items-center rounded-full border border-navy-900/20 px-7 py-3 text-sm font-semibold text-navy-900 hover:bg-ice-50">Our services</Link>
          </div>
        </div>
        <div className="hidden justify-center lg:col-span-4 lg:flex">
          <span className="float relative block h-[300px] w-[200px] overflow-hidden rounded-t-full shadow-2xl ring-4 ring-white">
            <Image src="/brand/skyscrapers.jpg" alt="Glass office towers seen from below" fill unoptimized sizes="200px" className="object-cover" />
          </span>
        </div>
      </div>
      <Tag>Hero D · Outline words + arch</Tag>
    </section>
  );
}
