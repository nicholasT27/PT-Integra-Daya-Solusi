import Link from "next/link";
import { DetailTab, ArrowButton } from "@/components/quinn/Bits";
import { Reveal, CountUp } from "@/components/quinn/Interactive";
import Testimonials from "./Testimonials";
import HeroMain from "./HeroMain";
import ValueGrid from "./ValueGrid";
import ServicesWired from "./ServicesWired";
import AboutSection from "./AboutSection";
import PageBackdrop from "./PageBackdrop";
import { posts } from "@/lib/site";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";

// The homepage: an airy hero that follows the mouse, then sections that come alive as you scroll.
export default function AiryHome() {
  const stats = [
    { big: <CountUp to={6} />, small: "Services", text: "Specialist disciplines under one roof", color: "bg-navy-600", fill: "bg-navy-600", light: true, more: ["Risk", "Insurance", "Retirement", "Legal", "Tax", "Industrial"] },
    { big: <CountUp to={1} />, small: "Team", text: "Insurance, legal, finance and engineering working together", color: "bg-sky-300", fill: "bg-navy-900", light: true, more: ["Insurance", "Legal", "Finance", "Engineering"] },
    { big: <CountUp to={3} />, small: "Pillars", text: "Integration, collaboration and continuity", color: "bg-navy-900", fill: "bg-sky-300", light: false, more: ["Integrasi", "Kolaborasi", "Kesinambungan"] },
    { big: "JKT", small: "Based", text: "Menara MTH, Tebet, South Jakarta", color: "bg-ice-100", fill: "bg-navy-600", light: true, more: ["Lantai 15, Suite 1508", "Tebet Timur"], clock: true },
  ];

  return (
    <div className="relative isolate text-ink">
      {/* One background for the whole page. Sections are transparent and only say what tone they want. */}
      <PageBackdrop />

      <HeroMain />

      {/* What we offer: the six services wired to the logo */}
      <ServicesWired />

      {/* About: company information and a framed photo */}
      <AboutSection />

      {/* Real value */}
      <section className="py-28" data-tone="#f5f8ff" data-glow="0.85">
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

      {/* Testimonials: voices list, quote stage and a strip of quote cards */}
      <Testimonials />

      {/* Insights */}
      <section className="py-28" data-tone="#f1f5ff" data-glow="0.9">
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
      <section className="py-40 text-center" data-tone="#dde7ff" data-glow="1.2">
        <div className={wrap}>
          <Reveal>
            <DetailTab className="text-navy-600">Contact PT Integra Daya Solusi</DetailTab>
            <h2 className="mx-auto mt-6 max-w-4xl text-balance text-5xl font-bold leading-[1.02] text-navy-900 sm:text-7xl">Every angle, one integrated team.</h2>
            <div className="mt-10"><ArrowButton href="/contact">Contact us</ArrowButton></div>
          </Reveal>
        </div>
      </section>

      {/* A long soft fade, so the page eases into the dark footer instead of ending on a hard edge */}
      <div aria-hidden="true" className="h-56 bg-gradient-to-b from-transparent to-navy-950" />
    </div>
  );
}
