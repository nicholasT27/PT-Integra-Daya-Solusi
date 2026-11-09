import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { DetailTab, ArrowButton } from "@/components/quinn/Bits";
import RevealText from "@/components/quinn/RevealText";
import { Reveal, CountUp, TestimonialSlider } from "@/components/quinn/Interactive";
import HeroMain from "./HeroMain";
import ValueGrid from "./ValueGrid";
import FlowLines from "./FlowLines";
import { ServiceScroll, AboutScene, ScrollShift } from "./ScrollBits";
import { services, posts, testimonials } from "@/lib/site";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";

// Reads the logo outline from the brand file, so it can be drawn as a line while scrolling.
function logoOutline() {
  const svg = fs.readFileSync(path.join(process.cwd(), "public/brand/ids-mark-blue.svg"), "utf8");
  return { viewBox: svg.match(/viewBox="([^"]+)"/)[1], paths: [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]) };
}

// The homepage: an airy hero that follows the mouse, then sections that come alive as you scroll.
export default function AiryHome() {
  const logo = logoOutline();
  const stats = [
    { big: <CountUp to={6} />, small: "Services", text: "Specialist disciplines under one roof", color: "bg-navy-600", card: "bg-navy-600", ink: "text-white", sub: "text-white/80" },
    { big: <CountUp to={1} />, small: "Team", text: "Insurance, legal, finance and engineering working together", color: "bg-white", card: "bg-navy-900", ink: "text-white", sub: "text-white/80" },
    { big: <CountUp to={3} />, small: "Pillars", text: "Integration, collaboration and continuity", color: "bg-navy-600", card: "bg-sky-300", ink: "text-navy-900", sub: "text-navy-900/80" },
    { big: "JKT", small: "Based", text: "Menara MTH, Tebet, South Jakarta", color: "bg-navy-600", card: "bg-ice-100", ink: "text-navy-900", sub: "text-navy-900/70" },
  ];

  return (
    <div className="bg-white text-ink">
      <HeroMain />

      {/* What we offer */}
      <section className="py-28">
        <div className={wrap}>
          <Reveal><DetailTab className="text-navy-600">What we offer.</DetailTab></Reveal>
          <RevealText
            className="mt-8 max-w-4xl indent-16 text-2xl font-semibold leading-snug text-navy-900 sm:text-4xl"
            text="Sophisticated enough for high-stakes decisions. Nimble enough for everyday clarity. Our complete range of services is tailored to your goals to reduce risk, cut friction and give you confidence in every decision."
          />
          <div className="mt-20"><ServiceScroll services={services} /></div>
          <Reveal className="mt-12"><ArrowButton href="/services">Explore services</ArrowButton></Reveal>
        </div>
      </section>

      {/* About: the logo draws itself while you scroll */}
      <AboutScene paths={logo.paths} viewBox={logo.viewBox}>
        <DetailTab className="text-navy-600">About IDS</DetailTab>
        <h2 className="mt-6 text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">The only partner you need to look at every angle of your risk.</h2>
        <p className="mt-6 indent-10 leading-relaxed text-muted">
          Most firms split insurance, legal, tax and operations into separate advisers. At IDS they are integrated from the start. That means fewer people, faster answers and strategies that actually fit together.
        </p>
        <div className="mt-8"><ArrowButton href="/about">About us</ArrowButton></div>
      </AboutScene>

      {/* Real value */}
      <section className="py-28">
        <div className={wrap}>
          <div className="grid gap-10 lg:grid-cols-10">
            <Reveal className="lg:col-span-6"><h2 className="text-6xl font-bold leading-none text-navy-900 sm:text-8xl">Real value.</h2></Reveal>
            <Reveal className="lg:col-span-4" delay={120}>
              <p className="indent-10 leading-relaxed text-muted">
                Complex issues merit careful time and strategy; simpler ones, efficient execution. At IDS you get specialist rigour from a single, coordinated team, with advice you can act on.
              </p>
            </Reveal>
          </div>
          <div className="mt-16"><ValueGrid items={stats} /></div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-5 pb-28 sm:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div style={{ "--folder-color": "var(--color-ice-100)" }}>
            <div className="folder-tab inline-flex items-center gap-2 rounded-t-2xl bg-ice-100 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy-600">
              <span className="h-2 w-2 rounded-full bg-navy-600" /> Testimonials
            </div>
            <div className="grid gap-10 rounded-tr-3xl bg-ice-100 p-8 text-navy-900 sm:p-14 lg:grid-cols-10">
              <span className="text-8xl font-bold leading-none text-navy-600 lg:col-span-2">&ldquo;</span>
              <div className="lg:col-span-8"><TestimonialSlider items={testimonials} /></div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Insights */}
      <section className="bg-ice-50 py-28">
        <div className={wrap}>
          <div className="grid gap-8 lg:grid-cols-10">
            <Reveal className="lg:col-span-6"><h2 className="text-4xl font-bold text-navy-900 sm:text-6xl">Insights</h2></Reveal>
            <Reveal className="space-y-6 lg:col-span-4" delay={120}>
              <p className="indent-10 text-muted">Relevant, ready-to-apply guidance on the issues shaping risk, insurance and business.</p>
              <ArrowButton href="/insights">Go to insights</ArrowButton>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 120}>
                <Link href={`/insights/${p.slug}`} className={`group flex h-full flex-col justify-between rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${i === 0 ? "bg-navy-900 text-white" : "bg-white text-navy-900"}`}>
                  <div>
                    <DetailTab className={i === 0 ? "text-sky-300" : "text-navy-600"}>{p.category}</DetailTab>
                    <h3 className="mt-6 text-2xl font-bold leading-snug">{p.title}</h3>
                    <p className={`mt-3 text-sm ${i === 0 ? "text-white/75" : "text-muted"}`}>{p.summary}</p>
                  </div>
                  <p className={`mt-10 text-sm font-semibold ${i === 0 ? "text-sky-300" : "text-navy-600"}`}>Read article <span className="inline-block transition-transform group-hover:translate-x-2">→</span></p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="mesh relative isolate overflow-hidden py-40 text-center">
        <ScrollShift speed={0.2} className="absolute inset-0 -z-10">
          <span className="drift absolute -left-24 top-10 h-[420px] w-[420px] rounded-full bg-navy-600/25 blur-3xl" />
          <span className="drift absolute -right-24 bottom-0 h-[460px] w-[460px] rounded-full bg-sky-300/60 blur-3xl" style={{ animationDelay: "-7s" }} />
        </ScrollShift>
        <FlowLines className="-z-10" color="#003af2" opacity={0.35} />
        <div className={wrap}>
          <Reveal>
            <DetailTab className="text-navy-600">Contact PT Integra Daya Solusi</DetailTab>
            <h2 className="mx-auto mt-6 max-w-4xl text-balance text-5xl font-bold leading-[1.02] text-navy-900 sm:text-7xl">Every angle, one integrated team.</h2>
            <div className="mt-10"><ArrowButton href="/contact">Contact us</ArrowButton></div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
