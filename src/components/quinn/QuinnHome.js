import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Ui";
import { DetailTab, TileBand, ArrowButton } from "./Bits";
import RevealText from "./RevealText";
import { services, posts, testimonials } from "@/lib/site";

// A homepage in the style of a modern law and tax firm site: folder-style hero, tile bands,
// big statements and a numbered service list. Pass theme "light" or "dark".
export default function QuinnHome({ theme = "light" }) {
  const dark = theme === "dark";
  const page = dark ? "bg-navy-950 text-white" : "bg-ice-50 text-ink";
  const alt = dark ? "bg-navy-900 text-white" : "bg-white text-ink";
  const folder = dark ? "bg-navy-600 text-white" : "bg-ice-50 text-navy-900";
  const folderColor = dark ? "var(--color-navy-600)" : "var(--color-ice-50)";
  const accent = dark ? "text-sky-300" : "text-navy-600";
  const line = dark ? "border-white/15" : "border-navy-900/15";
  const soft = dark ? "text-white/70" : "text-muted";

  return (
    <div className={page}>
      {/* Hero: big photo with the folder card sitting on the bottom */}
      <section className="relative isolate flex min-h-[760px] items-end overflow-hidden bg-navy-900 pt-24">
        <Image src="/brand/skyscrapers.jpg" alt="" fill priority className="-z-20 object-cover" />
        <div className={`absolute inset-0 -z-10 ${dark ? "bg-navy-950/60" : "bg-navy-900/35"}`} />
        <div className="w-full pl-5 sm:pl-8 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">
          <div className="max-w-5xl" style={{ "--folder-color": folderColor }}>
            <div className={`folder-tab inline-flex items-center gap-2 rounded-t-2xl px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] ${folder}`}>
              <span className={`h-2 w-2 rounded-full ${dark ? "bg-white" : "bg-navy-600"}`} /> Integrated solutions
            </div>
            <div className={`rounded-tr-3xl p-8 pr-5 sm:p-12 ${folder}`}>
              <h1 className={`max-w-3xl text-4xl font-bold leading-[1.05] sm:text-6xl ${dark ? "text-white" : "text-navy-600"}`}>
                Risk, insurance and business advice, brought together.
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

      <TileBand />

      {/* What we offer */}
      <section className="py-24">
        <Container>
          <DetailTab className={accent}>What we offer.</DetailTab>
          <RevealText
            className="mt-6 max-w-4xl text-2xl font-semibold leading-snug sm:text-4xl"
            text="Sophisticated enough for high-stakes decisions. Nimble enough for everyday clarity. Six specialist services, tailored to your goals, to reduce risk and give you confidence."
          />
          <ol className={`mt-16 border-t ${line}`}>
            {services.map((s, i) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className={`group grid items-center gap-4 border-b py-7 transition-colors md:grid-cols-12 md:px-4 ${line} ${dark ? "hover:bg-white/5" : "hover:bg-white"}`}>
                  <span className={`text-lg font-semibold md:col-span-1 ${accent}`}>{i + 1}</span>
                  <h3 className="text-2xl font-semibold sm:text-3xl md:col-span-5">{s.title}</h3>
                  <p className={`text-sm leading-relaxed md:col-span-5 ${soft}`}>{s.short}</p>
                  <span className={`hidden text-2xl transition-transform group-hover:translate-x-2 md:col-span-1 md:block md:justify-self-end ${accent}`}>→</span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-10"><ArrowButton href="/services" tone={dark ? "white" : "blue"}>Explore services</ArrowButton></div>
        </Container>
      </section>

      <TileBand />

      {/* About */}
      <section className={`py-24 ${alt}`}>
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src="/brand/skyscrapers.jpg" alt="Glass office towers" fill className="object-cover" />
            <div className="absolute inset-0 bg-navy-600/25 mix-blend-multiply" />
          </div>
          <div>
            <DetailTab className={accent}>About IDS</DetailTab>
            <h2 className={`mt-6 text-3xl font-semibold leading-snug sm:text-4xl ${dark ? "text-sky-300" : "text-navy-600"}`}>
              Most firms split insurance, legal, tax and operations into separate advisers. At IDS they are integrated from the start.
            </h2>
            <p className={`mt-6 leading-relaxed ${soft}`}>
              That means fewer handovers, faster answers and strategies that fit together.
            </p>
            <div className="mt-8"><ArrowButton href="/about" tone={dark ? "white" : "blue"}>About us</ArrowButton></div>
          </div>
        </Container>
      </section>

      {/* Value and numbers */}
      <section className="py-24">
        <Container>
          <DetailTab className={accent}>Why IDS</DetailTab>
          <h2 className={`mt-6 max-w-4xl text-3xl font-semibold leading-snug sm:text-5xl ${dark ? "text-white" : "text-navy-600"}`}>
            Careful time and strategy for complex issues. Efficient execution for simpler ones.
          </h2>
          <dl className={`mt-16 grid gap-10 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4 ${line}`}>
            {[
              ["6", "Specialist services"],
              ["1", "Integrated team"],
              ["3", "Pillars: integration, collaboration, continuity"],
              ["JKT", "Based in South Jakarta"],
            ].map(([n, l]) => (
              <div key={l}>
                <dd className={`text-6xl font-bold sm:text-7xl ${accent}`}>{n}</dd>
                <dt className={`mt-3 text-sm ${soft}`}>{l}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Testimonial */}
      <section className={`py-24 ${alt}`}>
        <Container className="max-w-4xl">
          <DetailTab className={accent}>Testimonial</DetailTab>
          <blockquote className="mt-6 text-2xl font-semibold leading-snug sm:text-4xl">
            &ldquo;{testimonials[1].quote}&rdquo;
          </blockquote>
          <p className={`mt-8 text-sm ${soft}`}>
            <strong className={dark ? "text-white" : "text-ink"}>{testimonials[1].name}</strong>, {testimonials[1].company}
          </p>
        </Container>
      </section>

      {/* Featured insight */}
      <section className="bg-navy-900 py-24 text-white">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <DetailTab className="text-sky-300">Insights</DetailTab>
            <h2 className="mt-6 text-3xl font-semibold leading-snug sm:text-4xl">
              Relevant, ready-to-apply guidance on the issues shaping risk, insurance and business.
            </h2>
            <div className="mt-8"><ArrowButton href="/insights" tone="white">Go to insights</ArrowButton></div>
          </div>
          <Link href={`/insights/${posts[0].slug}`} className="group rounded-3xl bg-navy-600 p-8 transition hover:bg-navy-700">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Featured · {posts[0].category}</p>
            <h3 className="mt-6 text-2xl font-semibold leading-snug">{posts[0].title}</h3>
            <p className="mt-4 text-white/80">{posts[0].summary}</p>
            <p className="mt-8 text-sm font-semibold">Read article <span className="inline-block transition-transform group-hover:translate-x-2">→</span></p>
          </Link>
        </Container>
      </section>

      <TileBand />

      {/* Closing call to action */}
      <section className="py-28 text-center">
        <Container>
          <DetailTab className={accent}>Contact PT Integra Daya Solusi</DetailTab>
          <h2 className={`mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.05] sm:text-6xl ${dark ? "text-white" : "text-navy-600"}`}>
            Every risk, every angle, one integrated team.
          </h2>
          <div className="mt-10"><ArrowButton href="/contact" tone={dark ? "white" : "blue"}>Contact us</ArrowButton></div>
        </Container>
      </section>
    </div>
  );
}
