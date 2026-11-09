import Image from "next/image";
import Link from "next/link";
import { ArrowButton, DetailTab } from "@/components/quinn/Bits";
import RevealText from "@/components/quinn/RevealText";
import { Reveal, ParallaxBg, TestimonialSlider, DrawLine } from "@/components/quinn/Interactive";
import LogoDraw from "./LogoDraw";
import QxHeader from "./QxHeader";
import QxFooter from "./QxFooter";
import ValueGrid from "./ValueGrid";
import Pattern from "./Pattern";
import { services, posts, testimonials } from "@/lib/site";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";

// The look of each variant: colours and options for every section.
const themes = {
  // J: bright, Blue Integrity hero and colour-block stat cards
  j: {
    page: "bg-white text-ink", accent: "text-navy-600", soft: "text-muted", line: "border-navy-900/15", title: "text-navy-900",
    draw: true,
    heroBg: "photo", heroOverlay: "bg-navy-600/55", folder: "bg-navy-600", folderVar: "var(--color-navy-600)", folderText: "text-white", tabText: "text-white", dot: "bg-white",
    h1: "text-white", p: "text-white/85", btn: "white",
    services: "rows", hoverRow: "hover:bg-ice-50",
    aboutBg: "photo", aboutCard: "bg-navy-900 text-white", aboutHead: "text-white", aboutP: "text-white/80", aboutTab: "text-sky-300", aboutBtn: "white",
    valueHead: "text-navy-900", valueP: "text-muted",
    cards: [
      { color: "bg-sky-300", card: "bg-navy-600", ink: "text-white", sub: "text-white/80" },
      { color: "bg-white", card: "bg-navy-900", ink: "text-white", sub: "text-white/80" },
      { color: "bg-navy-600", card: "bg-sky-300", ink: "text-navy-900", sub: "text-navy-900/80" },
      { color: "bg-navy-600", card: "bg-ice-100", ink: "text-navy-900", sub: "text-navy-900/70" },
    ],
    testiFolder: "bg-ice-100", testiVar: "var(--color-ice-100)", testiText: "text-navy-900", testiTab: "text-navy-600", testiDot: "bg-navy-600", testiDark: false, quote: "text-navy-600",
    insight: "bg-ice-50 text-ink", insightP: "text-muted", insightTone: "blue", insightCard: "bg-navy-900 text-white", insightTab: "text-sky-300",
    cta: "bg-navy-600 text-white", ctaTab: "text-sky-300", ctaBtn: "white", ctaPattern: false,
  },
  // K: fully dark, sticky statement beside the service list
  k: {
    page: "bg-navy-950 text-white", accent: "text-sky-300", soft: "text-white/70", line: "border-white/15", title: "text-white",
    heroBg: "photo", heroOverlay: "bg-navy-950/65", folder: "bg-navy-900", folderVar: "var(--color-navy-900)", folderText: "text-white", tabText: "text-white", dot: "bg-sky-300",
    h1: "text-white", p: "text-white/75", btn: "blue",
    services: "split", hoverRow: "hover:bg-white/5",
    aboutBg: "photo", aboutCard: "bg-navy-600 text-white", aboutHead: "text-white", aboutP: "text-white/85", aboutTab: "text-white", aboutBtn: "white",
    valueHead: "text-white", valueP: "text-white/70",
    cards: [0, 1, 2, 3].map((i) => ({ color: ["bg-navy-600", "bg-sky-300", "bg-white", "bg-navy-500"][i], card: "bg-white/5 ring-1 ring-white/15", ink: "text-white", sub: "text-white/65" })),
    testiFolder: "bg-navy-600", testiVar: "var(--color-navy-600)", testiText: "text-white", testiTab: "text-white", testiDot: "bg-white", testiDark: true, quote: "text-white/70",
    insight: "bg-navy-900 text-white", insightP: "text-white/75", insightTone: "white", insightCard: "bg-navy-950 text-white", insightTab: "text-sky-300",
    cta: "bg-navy-950 text-white", ctaTab: "text-sky-300", ctaBtn: "blue", ctaPattern: false,
  },
  // L: built on the logo pattern from the brand guide
  l: {
    page: "bg-ice-50 text-ink", accent: "text-navy-600", soft: "text-muted", line: "border-navy-900/20", title: "text-navy-900",
    heroBg: "pattern", heroOverlay: "", folder: "bg-white", folderVar: "#ffffff", folderText: "text-navy-900", tabText: "text-navy-600", dot: "bg-navy-600",
    h1: "text-navy-900", p: "text-muted", btn: "blue",
    services: "fill", hoverRow: "",
    aboutBg: "pattern", aboutCard: "bg-white", aboutHead: "text-navy-900", aboutP: "text-muted", aboutTab: "text-navy-600", aboutBtn: "blue",
    valueHead: "text-navy-900", valueP: "text-muted",
    cards: [0, 1, 2, 3].map((i) => ({ color: ["bg-navy-600", "bg-sky-300", "bg-navy-900", "bg-ice-100"][i], card: "bg-white", ink: "text-navy-900", sub: "text-muted" })),
    testiFolder: "bg-navy-600", testiVar: "var(--color-navy-600)", testiText: "text-white", testiTab: "text-white", testiDot: "bg-white", testiDark: true, quote: "text-white/70",
    insight: "bg-navy-950 text-white", insightP: "text-white/75", insightTone: "white", insightCard: "bg-navy-900 text-white", insightTab: "text-sky-300",
    cta: "bg-navy-600 text-white", ctaTab: "text-sky-300", ctaBtn: "white", ctaPattern: true,
  },
};

// One homepage design. The "v" setting picks the look: "j", "k" or "l".
export default function QxVariant({ v = "j" }) {
  const t = themes[v];
  const stats = [
    { big: "6", small: "Services", text: "Specialist disciplines under one roof" },
    { big: "1", small: "Team", text: "Insurance, legal, finance and engineering working together" },
    { big: "3", small: "Pillars", text: "Integration, collaboration and continuity" },
    { big: "JKT", small: "Based", text: "Menara MTH, Tebet, South Jakarta" },
  ].map((s, i) => ({ ...s, ...t.cards[i] }));

  const serviceRow = (s, i) => (
    <Reveal key={s.slug} delay={i * 60}>
      <Link
        href={`/services/${s.slug}`}
        className={`group relative flex flex-col gap-3 py-8 transition-colors sm:flex-row sm:items-baseline sm:gap-10 ${t.draw ? "" : `border-t last:border-b ${t.line}`} ${
          t.services === "fill" ? "hover:border-navy-600 hover:bg-navy-600 hover:px-6 hover:text-white" : `${t.hoverRow} sm:px-2`
        }`}
      >
        {t.draw && (
          <>
            <span className="absolute inset-x-0 top-0"><DrawLine className="bg-navy-900/25" delay={i * 80} /></span>
            {i === services.length - 1 && <span className="absolute inset-x-0 bottom-0"><DrawLine className="bg-navy-900/25" delay={400} /></span>}
          </>
        )}
        <span className={`w-10 text-xl font-semibold ${t.services === "fill" ? "text-navy-600 group-hover:text-sky-300" : t.accent}`}>{i + 1}</span>
        <div className="flex-1">
          <h2 className="text-3xl font-bold leading-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">{s.title}</h2>
          {t.services === "split" && <p className={`mt-2 max-w-md text-sm leading-relaxed ${t.soft}`}>{s.short}</p>}
        </div>
        {t.services === "rows" && <p className={`max-w-xs text-sm leading-relaxed ${t.soft}`}>{s.short}</p>}
        <span className={`hidden text-3xl opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100 sm:block ${t.services === "fill" ? "text-white" : t.accent}`}>→</span>
      </Link>
    </Reveal>
  );

  const statement = (
    <RevealText
      className={`mt-8 indent-16 text-2xl font-semibold leading-snug sm:text-4xl ${t.title}`}
      text="Sophisticated enough for high-stakes decisions. Nimble enough for everyday clarity. Our complete range of services is tailored to your goals to reduce risk, cut friction and give you confidence in every decision."
    />
  );

  return (
    <div className={t.page}>
      <QxHeader />

      {/* 1. Hero */}
      <section className={`relative isolate flex min-h-screen items-end overflow-hidden ${t.heroBg === "pattern" ? "bg-navy-600" : "bg-navy-900"}`}>
        {t.heroBg === "photo" ? (
          <>
            <div className="qx-bg absolute inset-0 -z-20"><ParallaxBg src="/brand/skyscrapers.jpg" /></div>
            <div className={`absolute inset-0 -z-10 ${t.heroOverlay}`} />
            {t.draw && (
              <div className="pointer-events-none absolute inset-x-0 top-[12vh] -z-10 mx-auto w-[min(92%,1100px)]">
                <LogoDraw className="w-full" />
              </div>
            )}
          </>
        ) : (
          <div className="qx-bg absolute inset-0 -z-10"><Pattern opacity={0.16} /></div>
        )}
        <div className={wrap}>
          <div className="qx-folder" style={{ "--folder-color": t.folderVar }}>
            <div className={`folder-tab inline-flex items-center gap-2 rounded-t-2xl px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] ${t.folder} ${t.tabText}`}>
              <span className={`h-2 w-2 rounded-full ${t.dot}`} /> Integrated solutions.
            </div>
            <div className={`grid gap-8 rounded-tr-3xl p-8 sm:p-12 lg:grid-cols-10 ${t.folder}`}>
              <h1 className={`qx-1 text-4xl font-bold leading-[1.02] sm:text-6xl lg:col-span-6 lg:text-7xl ${t.h1}`}>
                Risk, insurance and business advice, brought together.
              </h1>
              <div className="flex flex-col justify-end gap-8 lg:col-span-4">
                <p className={`qx-2 indent-10 leading-relaxed ${t.p}`}>
                  We are a Jakarta consultancy of insurance, risk, legal, finance and engineering specialists, simplifying complexity so you can focus on what matters most.
                </p>
                <div className="qx-3"><ArrowButton href="/contact" tone={t.btn}>Contact us</ArrowButton></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What we offer */}
      <section className="py-28">
        {t.services === "split" ? (
          <div className={`${wrap} grid gap-16 lg:grid-cols-2`}>
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal><DetailTab className={t.accent}>What we offer.</DetailTab></Reveal>
              {statement}
              <Reveal className="mt-10"><ArrowButton href="/services" tone="blue">Explore services</ArrowButton></Reveal>
            </div>
            <div>{services.map(serviceRow)}</div>
          </div>
        ) : (
          <>
            <div className={wrap}>
              <Reveal><DetailTab className={t.accent}>What we offer.</DetailTab></Reveal>
              <div className="max-w-4xl">{statement}</div>
            </div>
            <div className={`${wrap} mt-20`}>
              {services.map(serviceRow)}
              <Reveal className="mt-12"><ArrowButton href="/services">Explore services</ArrowButton></Reveal>
            </div>
          </>
        )}
      </section>

      {/* 3. About: background stays in place while the card scrolls over it */}
      <section className="relative">
        <div className={`sticky top-0 h-screen overflow-hidden ${t.aboutBg === "pattern" ? "bg-navy-900" : ""}`}>
          {t.aboutBg === "photo" ? (
            <>
              <Image src="/brand/skyscrapers.jpg" alt="Glass office towers" fill className="object-cover" />
              <div className="absolute inset-0 bg-navy-900/40" />
            </>
          ) : (
            <Pattern opacity={0.22} />
          )}
        </div>
        <div className="relative -mt-[100vh] min-h-[170vh] px-5 py-[20vh] sm:px-8">
          <div className={`sticky top-[18vh] max-w-xl rounded-3xl p-8 shadow-2xl sm:p-12 ${v === "k" ? "" : "ml-auto"} ${t.aboutCard}`}>
            <DetailTab className={t.aboutTab}>About IDS</DetailTab>
            <h2 className={`mt-6 text-3xl font-bold leading-tight sm:text-4xl ${t.aboutHead}`}>The only partner you need to look at every angle of your risk.</h2>
            <p className={`mt-6 indent-10 leading-relaxed ${t.aboutP}`}>
              Most firms split insurance, legal, tax and operations into separate advisers. At IDS they are integrated from the start. That means fewer people, faster answers and strategies that actually fit together.
            </p>
            <div className="mt-8"><ArrowButton href="/about" tone={t.aboutBtn}>About us</ArrowButton></div>
          </div>
        </div>
      </section>

      {/* 4. Value */}
      <section className="py-28">
        <div className={wrap}>
          <div className="grid gap-10 lg:grid-cols-10">
            <Reveal className="lg:col-span-6"><h2 className={`text-6xl font-bold leading-none sm:text-8xl ${t.valueHead}`}>Real value.</h2></Reveal>
            <Reveal className="lg:col-span-4" delay={120}>
              <p className={`indent-10 leading-relaxed ${t.valueP}`}>
                Complex issues merit careful time and strategy; simpler ones, efficient execution. At IDS you get specialist rigour from a single, coordinated team, with advice you can act on.
              </p>
            </Reveal>
          </div>
          {t.draw && <div className="mt-16"><DrawLine className="bg-navy-900/25" /></div>}
          <div className="mt-10"><ValueGrid items={stats} /></div>
        </div>
      </section>

      {/* 5. Testimonial folder */}
      <section className="px-5 pb-28 sm:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div style={{ "--folder-color": t.testiVar }}>
            <div className={`folder-tab inline-flex items-center gap-2 rounded-t-2xl px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] ${t.testiFolder} ${t.testiTab}`}>
              <span className={`h-2 w-2 rounded-full ${t.testiDot}`} /> Testimonials
            </div>
            <div className={`grid gap-10 rounded-tr-3xl p-8 sm:p-14 lg:grid-cols-10 ${t.testiFolder} ${t.testiText}`}>
              <span className={`text-8xl font-bold leading-none lg:col-span-2 ${t.quote}`}>&ldquo;</span>
              <div className="lg:col-span-8"><TestimonialSlider items={testimonials} dark={t.testiDark} /></div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 6. Featured insight */}
      <section className={`py-28 ${t.insight}`}>
        <div className={wrap}>
          <div className="grid gap-8 lg:grid-cols-10">
            <Reveal className="lg:col-span-6"><h2 className="text-4xl font-bold sm:text-6xl">Featured insight</h2></Reveal>
            <Reveal className="space-y-6 lg:col-span-4" delay={120}>
              <p className={`indent-10 ${t.insightP}`}>Relevant, ready-to-apply guidance on the issues shaping risk, insurance and business.</p>
              <ArrowButton href="/insights" tone={t.insightTone}>Go to insights</ArrowButton>
            </Reveal>
          </div>
          <Reveal className="mt-16">
            <Link href={`/insights/${posts[0].slug}`} className={`group grid overflow-hidden rounded-3xl lg:grid-cols-10 ${t.insightCard}`}>
              <div className="flex flex-col justify-between gap-12 p-8 sm:p-12 lg:col-span-6">
                <DetailTab className={t.insightTab}>{posts[0].category}</DetailTab>
                <h3 className="text-3xl font-bold leading-tight sm:text-5xl">{posts[0].title}</h3>
                <p className={`text-sm font-semibold ${t.insightTab}`}>Read article <span className="inline-block transition-transform group-hover:translate-x-2">→</span></p>
              </div>
              <div className="relative min-h-[260px] overflow-hidden lg:col-span-4">
                <Image src="/brand/skyscrapers.jpg" alt="" fill className="object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-navy-600/30 mix-blend-multiply" />
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 7. Closing call to action */}
      <section className={`relative isolate overflow-hidden ${t.cta}`}>
        {t.ctaPattern && <Pattern opacity={0.14} />}
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-between gap-16 px-5 py-24 sm:px-12 lg:px-[max(3rem,calc((100vw-72rem)/2+2rem))]">
            <Reveal>
              <DetailTab className={t.ctaTab}>Contact PT Integra Daya Solusi</DetailTab>
              <h2 className="mt-6 text-5xl font-bold leading-[1.02] sm:text-7xl">Every angle, one integrated team.</h2>
            </Reveal>
            <Reveal><ArrowButton href="/contact" tone={t.ctaBtn}>Contact us</ArrowButton></Reveal>
          </div>
          <div className="relative min-h-[420px]">
            <Image src="/brand/skyscrapers.jpg" alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-navy-600/30 mix-blend-multiply" />
          </div>
        </div>
      </section>

      <QxFooter />
    </div>
  );
}
