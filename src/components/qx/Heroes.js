import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { ArrowButton } from "@/components/quinn/Bits";
import FlowLines from "./FlowLines";
import { services } from "@/lib/site";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const base = "relative isolate overflow-hidden bg-navy-600 text-white min-h-[max(100vh,800px)]";

// A small tag in the corner naming each design, so they are easy to refer to.
function Tag({ children }) {
  return <span className="absolute bottom-4 left-4 z-20 rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy-900 shadow">{children}</span>;
}

// The brand photo, shown at or below its real size (736 px wide) so it stays sharp.
function Photo({ className = "", width = 560, rounded = "rounded-3xl" }) {
  return (
    <div className={`relative aspect-[736/437] w-full overflow-hidden shadow-2xl ring-1 ring-white/30 ${rounded} ${className}`} style={{ maxWidth: width }}>
      <Image src="/brand/skyscrapers.jpg" alt="Glass office towers seen from below" fill unoptimized sizes={`${width}px`} className="object-cover" />
    </div>
  );
}

// Hero 1: text on the left, photo with an offset outline on the right, and a service ticker that never stops.
export function Hero1() {
  const items = [...services, ...services];
  return (
    <section id="hero-1" className={`${base} flex flex-col`}>
      <FlowLines />
      <div className={`${wrap} flex flex-1 items-center pb-28 pt-32`}>
        <div className="grid w-full items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-300"><span className="h-2 w-2 rounded-full bg-sky-300" /> Integrated solutions.</p>
            <h1 className="mt-6 text-5xl font-bold leading-[1.02] sm:text-7xl">Risk, insurance and business advice, brought together.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">A Jakarta consultancy of insurance, risk, legal, finance and engineering specialists, simplifying complexity so you can focus on what matters most.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ArrowButton href="/contact" tone="white">Contact us</ArrowButton>
              <Link href="/services" className="inline-flex items-center rounded-full border border-white/40 px-7 py-3 text-sm font-semibold hover:bg-white/10">Our services</Link>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <span className="absolute -bottom-5 -right-5 hidden h-full w-full rounded-3xl border border-white/40 sm:block" />
            <Photo />
            <span className="float absolute -left-6 bottom-8 rounded-2xl bg-white px-5 py-4 text-navy-900 shadow-xl">
              <span className="block text-3xl font-bold leading-none text-navy-600">6</span>
              <span className="text-xs font-semibold">Specialist services</span>
            </span>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/25 bg-navy-900/30 py-4 backdrop-blur-sm">
        <div className="marquee flex gap-12 text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
          {items.map((s, i) => (
            <span key={i} className="flex items-center gap-12">{s.title} <span className="text-sky-300">◆</span></span>
          ))}
        </div>
      </div>
      <Tag>Hero 1 · Split + ticker</Tag>
    </section>
  );
}

// Hero 2: a giant headline on the blue, with the folder card below holding the text and the photo.
export function Hero2() {
  return (
    <section id="hero-2" className={`${base} flex items-end`}>
      <FlowLines />
      <div className={`${wrap} pt-32`}>
        <h1 className="max-w-5xl text-6xl font-bold leading-[0.95] sm:text-8xl lg:text-[9.5rem]">
          Integrated<br /><span className="text-sky-300">solutions.</span>
        </h1>
        <div className="mt-12" style={{ "--folder-color": "var(--color-ice-50)" }}>
          <div className="folder-tab inline-flex items-center gap-2 rounded-t-2xl bg-ice-50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy-600">
            <span className="h-2 w-2 rounded-full bg-navy-600" /> Insurance · Risk · Engineering
          </div>
          <div className="grid items-center gap-8 rounded-tr-3xl bg-ice-50 p-8 text-navy-900 sm:p-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Risk, insurance and business advice, brought together.</h2>
              <p className="mt-4 max-w-md leading-relaxed text-muted">We simplify complexity so you can focus on what matters most.</p>
              <div className="mt-6"><ArrowButton href="/contact">Contact us</ArrowButton></div>
            </div>
            <Photo width={520} rounded="rounded-2xl" className="lg:ml-auto" />
          </div>
        </div>
      </div>
      <Tag>Hero 2 · Giant type + folder</Tag>
    </section>
  );
}

// Hero 3: everything centred, with the photo in the middle and small labels floating around it.
export function Hero3() {
  return (
    <section id="hero-3" className={`${base} flex items-center`}>
      <FlowLines />
      <div className={`${wrap} pb-20 pt-32 text-center`}>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">PT Integra Daya Solusi</p>
        <h1 className="mx-auto mt-6 max-w-4xl text-balance text-5xl font-bold leading-[1.03] sm:text-7xl">Every angle of risk, handled by one integrated team.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">Insurance, legal, finance and engineering advice working together.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ArrowButton href="/contact" tone="white">Contact us</ArrowButton>
          <Link href="/services" className="inline-flex items-center rounded-full border border-white/40 px-7 py-3 text-sm font-semibold hover:bg-white/10">Our services</Link>
        </div>
        <div className="relative mx-auto mt-14 max-w-[736px]">
          <Photo width={736} />
          <span className="float absolute -left-4 top-8 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy-900 shadow-xl sm:-left-14">Insurance &amp; Risk</span>
          <span className="float absolute -right-4 top-1/2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold shadow-xl sm:-right-14" style={{ animationDelay: "-1.6s" }}>Legal &amp; Tax</span>
          <span className="float absolute -bottom-4 left-1/4 rounded-full bg-sky-300 px-5 py-2.5 text-sm font-semibold text-navy-900 shadow-xl" style={{ animationDelay: "-3.2s" }}>Engineering</span>
        </div>
      </div>
      <Tag>Hero 3 · Centred</Tag>
    </section>
  );
}

// Hero 4: the six services orbit the photo forever, showing everything working together.
export function Hero4() {
  const n = services.length;
  return (
    <section id="hero-4" className={`${base} flex items-center`}>
      <FlowLines opacity={0.7} />
      <div className={`${wrap} grid items-center gap-12 pb-16 pt-32 lg:grid-cols-2`}>
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-300"><span className="h-2 w-2 rounded-full bg-sky-300" /> Integrasi · Kolaborasi · Kesinambungan</p>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.02] sm:text-6xl">Six services.<br />One connected team.</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">Risk, insurance, retirement, legal, tax and industrial expertise, moving together around your business.</p>
          <div className="mt-9"><ArrowButton href="/contact" tone="white">Contact us</ArrowButton></div>
        </div>
        <div className="relative mx-auto aspect-square w-[min(88vw,540px)]" style={{ "--s": "min(88vw, 540px)" }}>
          <span className="absolute inset-0 rounded-full border border-white/25" />
          <span className="absolute inset-[16%] rounded-full border border-dashed border-white/25" />
          <div className="orbit absolute inset-0">
            {services.map((s, i) => {
              const a = (360 / n) * i;
              return (
                <div key={s.slug} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${a}deg) translateY(calc(var(--s) / -2))` }}>
                  <div style={{ transform: `rotate(${-a}deg)` }}>
                    <Link href={`/services/${s.slug}`} title={s.title} aria-label={s.title} className="orbit-rev -ml-7 -mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-white text-navy-600 shadow-xl transition-transform hover:scale-110">
                      <Icon name={s.icon} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="orbit-slow absolute inset-[16%]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-sky-300" style={{ transform: `rotate(${i * 120}deg) translateY(calc(var(--s) * -0.34)) translate(-50%, -50%)` }} />
            ))}
          </div>
          <div className="absolute inset-[27%] overflow-hidden rounded-full shadow-2xl ring-4 ring-white/40">
            <Image src="/brand/skyscrapers.jpg" alt="Glass office towers seen from below" fill unoptimized sizes="300px" className="object-cover" />
          </div>
        </div>
      </div>
      <Tag>Hero 4 · Orbit</Tag>
    </section>
  );
}
