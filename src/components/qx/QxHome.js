import Image from "next/image";
import Link from "next/link";
import { ArrowButton, DetailTab } from "@/components/quinn/Bits";
import RevealText from "@/components/quinn/RevealText";
import { Reveal, ParallaxBg, TestimonialSlider } from "@/components/quinn/Interactive";
import QxHeader from "./QxHeader";
import QxFooter from "./QxFooter";
import ValueGrid from "./ValueGrid";
import { services, posts, testimonials } from "@/lib/site";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";

// The full homepage laid out like the reference site: folder hero, numbered services, pinned about
// card, big "value" statement with stat cards, testimonial folder, featured insight and closing call to action.
export default function QxHome() {
  const stats = [
    { big: "6", small: "Services", text: "Specialist disciplines under one roof", color: "bg-navy-600" },
    { big: "1", small: "Team", text: "Insurance, legal, finance and engineering working together", color: "bg-sky-300" },
    { big: "3", small: "Pillars", text: "Integration, collaboration and continuity", color: "bg-navy-900" },
    { big: "JKT", small: "Based", text: "Menara MTH, Tebet, South Jakarta", color: "bg-ice-100" },
  ];

  return (
    <div className="bg-ice-50 text-ink">
      <QxHeader />

      {/* 1. Hero */}
      <section className="relative isolate flex min-h-screen items-end overflow-hidden bg-navy-900">
        <div className="qx-bg absolute inset-0 -z-20"><ParallaxBg src="/brand/skyscrapers.jpg" /></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/60 via-navy-900/20 to-navy-900/40" />
        <div className={`${wrap} pb-0`}>
          <div className="qx-folder" style={{ "--folder-color": "var(--color-ice-50)" }}>
            <div className="folder-tab inline-flex items-center gap-2 rounded-t-2xl bg-ice-50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy-600">
              <span className="h-2 w-2 rounded-full bg-navy-600" /> Integrated solutions.
            </div>
            <div className="grid gap-8 rounded-tr-3xl bg-ice-50 p-8 sm:p-12 lg:grid-cols-10">
              <h1 className="qx-1 text-4xl font-bold leading-[1.02] text-navy-900 sm:text-6xl lg:col-span-6 lg:text-7xl">
                Risk, insurance and business advice, brought together.
              </h1>
              <div className="flex flex-col justify-end gap-8 lg:col-span-4">
                <p className="qx-2 indent-10 leading-relaxed text-muted">
                  We are a Jakarta consultancy of insurance, risk, legal, finance and engineering specialists, simplifying complexity so you can focus on what matters most.
                </p>
                <div className="qx-3"><ArrowButton href="/contact">Contact us</ArrowButton></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What we offer */}
      <section className="py-28">
        <div className={wrap}>
          <Reveal><DetailTab className="text-navy-600">What we offer.</DetailTab></Reveal>
          <RevealText
            className="mt-8 max-w-4xl indent-16 text-2xl font-semibold leading-snug text-navy-900 sm:text-4xl"
            text="Sophisticated enough for high-stakes decisions. Nimble enough for everyday clarity. Our complete range of services is tailored to your goals to reduce risk, cut friction and give you confidence in every decision."
          />
        </div>
        <div className={`${wrap} mt-20`}>
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <Link href={`/services/${s.slug}`} className="group flex items-baseline gap-6 border-t border-navy-900/20 py-8 last:border-b sm:gap-12">
                <span className="w-8 text-xl font-semibold text-navy-600">{i + 1}</span>
                <h2 className="flex-1 text-3xl font-bold leading-tight text-navy-900 transition-all duration-300 group-hover:translate-x-3 group-hover:text-navy-600 sm:text-5xl">{s.title}</h2>
                <span className="hidden text-3xl text-navy-600 opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100 sm:block">→</span>
              </Link>
            </Reveal>
          ))}
          <Reveal className="mt-12"><ArrowButton href="/services">Explore services</ArrowButton></Reveal>
        </div>
      </section>

      {/* 3. About: photo stays in place while the card scrolls over it */}
      <section className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          <Image src="/brand/skyscrapers.jpg" alt="Glass office towers" fill className="object-cover" />
          <div className="absolute inset-0 bg-navy-900/40" />
        </div>
        <div className="relative -mt-[100vh] min-h-[170vh] px-5 py-[20vh] sm:px-8">
          <div className="sticky top-[18vh] ml-auto max-w-xl rounded-3xl bg-ice-50 p-8 shadow-2xl sm:p-12">
            <DetailTab className="text-navy-600">About IDS</DetailTab>
            <h2 className="mt-6 text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
              The only partner you need to look at every angle of your risk.
            </h2>
            <p className="mt-6 indent-10 leading-relaxed text-muted">
              Most firms split insurance, legal, tax and operations into separate advisers. At IDS they are integrated from the start. That means fewer people, faster answers and strategies that actually fit together.
            </p>
            <div className="mt-8"><ArrowButton href="/about">About us</ArrowButton></div>
          </div>
        </div>
      </section>

      {/* 4. Value */}
      <section className="py-28">
        <div className={wrap}>
          <div className="grid gap-10 lg:grid-cols-10">
            <Reveal className="lg:col-span-6">
              <h2 className="text-6xl font-bold leading-none text-navy-900 sm:text-8xl">Real value.</h2>
            </Reveal>
            <Reveal className="lg:col-span-4" delay={120}>
              <p className="indent-10 leading-relaxed text-muted">
                Complex issues merit careful time and strategy; simpler ones, efficient execution. At IDS you get specialist rigour from a single, coordinated team, with advice you can act on.
              </p>
            </Reveal>
          </div>
          <div className="mt-16"><ValueGrid items={stats} /></div>
        </div>
      </section>

      {/* 5. Testimonial folder */}
      <section className="px-5 pb-28 sm:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div style={{ "--folder-color": "var(--color-navy-900)" }}>
            <div className="folder-tab inline-flex items-center gap-2 rounded-t-2xl bg-navy-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              <span className="h-2 w-2 rounded-full bg-sky-300" /> Testimonials
            </div>
            <div className="grid gap-10 rounded-tr-3xl bg-navy-900 p-8 text-white sm:p-14 lg:grid-cols-10">
              <span className="text-8xl font-bold leading-none text-navy-600 lg:col-span-2">&ldquo;</span>
              <div className="lg:col-span-8"><TestimonialSlider items={testimonials} dark /></div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 6. Featured insight */}
      <section className="bg-navy-950 py-28 text-white">
        <div className={wrap}>
          <div className="grid gap-8 lg:grid-cols-10">
            <Reveal className="lg:col-span-6"><h2 className="text-4xl font-bold sm:text-6xl">Featured insight</h2></Reveal>
            <Reveal className="space-y-6 lg:col-span-4" delay={120}>
              <p className="indent-10 text-white/75">Relevant, ready-to-apply guidance on the issues shaping risk, insurance and business.</p>
              <ArrowButton href="/insights" tone="white">Go to insights</ArrowButton>
            </Reveal>
          </div>
          <Reveal className="mt-16">
            <Link href={`/insights/${posts[0].slug}`} className="group grid overflow-hidden rounded-3xl bg-navy-900 lg:grid-cols-10">
              <div className="flex flex-col justify-between gap-12 p-8 sm:p-12 lg:col-span-6">
                <DetailTab className="text-sky-300">{posts[0].category}</DetailTab>
                <h3 className="text-3xl font-bold leading-tight sm:text-5xl">{posts[0].title}</h3>
                <p className="text-sm font-semibold text-sky-300">Read article <span className="inline-block transition-transform group-hover:translate-x-2">→</span></p>
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
      <section className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-16 px-5 py-24 sm:px-12 lg:px-[max(3rem,calc((100vw-72rem)/2+2rem))]">
          <Reveal>
            <DetailTab className="text-navy-600">Contact PT Integra Daya Solusi</DetailTab>
            <h2 className="mt-6 text-5xl font-bold leading-[1.02] text-navy-900 sm:text-7xl">Every angle, one integrated team.</h2>
          </Reveal>
          <Reveal><ArrowButton href="/contact">Contact us</ArrowButton></Reveal>
        </div>
        <div className="relative min-h-[420px]">
          <Image src="/brand/skyscrapers.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-navy-600/30 mix-blend-multiply" />
        </div>
      </section>

      <QxFooter />
    </div>
  );
}
