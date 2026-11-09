import Image from "next/image";
import { Container } from "@/components/Ui";
import { DetailTab, ArrowButton } from "./Bits";
import RevealText from "./RevealText";
import { Reveal, ScrollProgress, ParallaxBg, CountUp, ServiceAccordion, TestimonialSlider, InsightPicker } from "./Interactive";
import { services, posts, testimonials } from "@/lib/site";

// A homepage with a folder-style hero and lots of movement: parallax photo, scroll reveals,
// expanding service rows, counting numbers, a testimonial slider and an article picker.
// Pass theme "light" or "dark".
export default function QuinnHome({ theme = "light" }) {
  const dark = theme === "dark";
  const page = dark ? "bg-navy-950 text-white" : "bg-ice-50 text-ink";
  const alt = dark ? "bg-navy-900 text-white" : "bg-white text-ink";
  const folder = dark ? "bg-navy-600 text-white" : "bg-ice-50 text-navy-900";
  const folderColor = dark ? "var(--color-navy-600)" : "var(--color-ice-50)";
  const accent = dark ? "text-sky-300" : "text-navy-600";
  const line = dark ? "border-white/15" : "border-navy-900/15";
  const soft = dark ? "text-white/70" : "text-muted";
  const headline = "Risk, insurance and business advice, brought together.".split(" ");

  return (
    <div className={page}>
      <ScrollProgress dark={dark} />

      <section className="relative isolate flex min-h-[760px] items-end overflow-hidden bg-navy-900 pt-24">
        <ParallaxBg src="/brand/skyscrapers.jpg" />
        <div className={`absolute inset-0 -z-10 ${dark ? "bg-navy-950/60" : "bg-navy-900/35"}`} />
        <div className="w-full pl-5 sm:pl-8 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">
          <div className="animate-rise max-w-5xl" style={{ "--folder-color": folderColor }}>
            <div className={`folder-tab inline-flex items-center gap-2 rounded-t-2xl px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] ${folder}`}>
              <span className={`h-2 w-2 animate-pulse rounded-full ${dark ? "bg-white" : "bg-navy-600"}`} /> Integrated solutions
            </div>
            <div className={`rounded-tr-3xl p-8 pr-5 sm:p-12 ${folder}`}>
              <h1 className={`max-w-3xl text-4xl font-bold leading-[1.05] sm:text-6xl ${dark ? "text-white" : "text-navy-600"}`}>
                {headline.map((w, i) => (
                  <span key={i} className="animate-rise inline-block" style={{ animationDelay: `${300 + i * 90}ms` }}>{w}&nbsp;</span>
                ))}
              </h1>
              <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <p className={`max-w-md leading-relaxed ${dark ? "text-white/85" : "text-muted"}`}>
                  PT Integra Daya Solusi is a Jakarta consultancy that simplifies complexity so you can focus on what matters most.
                </p>
                <ArrowButton href="/contact" tone={dark ? "white" : "blue"}>Contact us</ArrowButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <Container>
          <Reveal><DetailTab className={accent}>What we offer.</DetailTab></Reveal>
          <RevealText
            className="mt-6 max-w-4xl text-2xl font-semibold leading-snug sm:text-4xl"
            text="Sophisticated enough for high-stakes decisions. Nimble enough for everyday clarity. Six specialist services, tailored to your goals, to reduce risk and give you confidence."
          />
          <Reveal><ServiceAccordion services={services} dark={dark} /></Reveal>
          <Reveal className="mt-10"><ArrowButton href="/services" tone={dark ? "white" : "blue"}>Explore services</ArrowButton></Reveal>
        </Container>
      </section>

      <section className={`py-24 ${alt}`}>
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src="/brand/skyscrapers.jpg" alt="Glass office towers" fill className="object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-navy-600/25 mix-blend-multiply" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <DetailTab className={accent}>About IDS</DetailTab>
            <h2 className={`mt-6 text-3xl font-semibold leading-snug sm:text-4xl ${dark ? "text-sky-300" : "text-navy-600"}`}>
              Most firms split insurance, legal, tax and operations into separate advisers. At IDS they are integrated from the start.
            </h2>
            <p className={`mt-6 leading-relaxed ${soft}`}>That means fewer handovers, faster answers and strategies that fit together.</p>
            <div className="mt-8"><ArrowButton href="/about" tone={dark ? "white" : "blue"}>About us</ArrowButton></div>
          </Reveal>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <Reveal>
            <DetailTab className={accent}>Why IDS</DetailTab>
            <h2 className={`mt-6 max-w-4xl text-3xl font-semibold leading-snug sm:text-5xl ${dark ? "text-white" : "text-navy-600"}`}>
              Careful time and strategy for complex issues. Efficient execution for simpler ones.
            </h2>
          </Reveal>
          <dl className={`mt-16 grid gap-10 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4 ${line}`}>
            {[
              [<CountUp key="a" to={6} />, "Specialist services"],
              [<CountUp key="b" to={1} />, "Integrated team"],
              [<CountUp key="c" to={3} />, "Pillars: integration, collaboration, continuity"],
              ["JKT", "Based in South Jakarta"],
            ].map(([n, l], i) => (
              <Reveal key={l} delay={i * 120}>
                <dd className={`text-6xl font-bold sm:text-7xl ${accent}`}>{n}</dd>
                <dt className={`mt-3 text-sm ${soft}`}>{l}</dt>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <section className={`py-24 ${alt}`}>
        <Container className="max-w-4xl">
          <Reveal>
            <DetailTab className={accent}>Testimonials</DetailTab>
            <div className="mt-6"><TestimonialSlider items={testimonials} dark={dark} /></div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-900 py-24 text-white">
        <Container>
          <Reveal>
            <DetailTab className="text-sky-300">Insights</DetailTab>
            <h2 className="mt-6 max-w-3xl text-3xl font-semibold leading-snug sm:text-4xl">
              Relevant, ready-to-apply guidance on the issues shaping risk, insurance and business.
            </h2>
          </Reveal>
          <Reveal className="mt-12" delay={100}><InsightPicker posts={posts} /></Reveal>
          <Reveal className="mt-10"><ArrowButton href="/insights" tone="white">Go to insights</ArrowButton></Reveal>
        </Container>
      </section>

      <section className="py-28 text-center">
        <Container>
          <Reveal>
            <DetailTab className={accent}>Contact PT Integra Daya Solusi</DetailTab>
            <h2 className={`mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.05] sm:text-6xl ${dark ? "text-white" : "text-navy-600"}`}>
              Every risk, every angle, one integrated team.
            </h2>
            <div className="mt-10"><ArrowButton href="/contact" tone={dark ? "white" : "blue"}>Contact us</ArrowButton></div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
