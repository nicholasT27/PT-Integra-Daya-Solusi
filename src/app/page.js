import Link from "next/link";
import Icon from "@/components/Icon";
import { Container, Section, SectionTitle, Button, CallToAction } from "@/components/Ui";
import { services, approach, values, posts, company } from "@/lib/site";

// The home page: introduction, services, how we work, latest insights and a contact prompt.
export default function Home() {
  return (
    <>
      <section className="bg-grid bg-navy-900 text-white">
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-5 lg:py-28">
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              Insurance, Risk and Engineering Consultant
            </p>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Clear advice for a more secure business.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-sky-300">
              {company.name} brings risk, insurance, legal, financial and industrial expertise together, so you can
              make decisions with confidence.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/services">Our services</Button>
              <Button href="/contact" variant="outline">Contact us</Button>
            </div>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Six disciplines, one team</p>
            <ul className="mt-4 divide-y divide-white/10">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="flex items-center gap-3 py-3 text-sm hover:text-sky-300">
                    <Icon name={s.icon} className="h-5 w-5 text-sky-300" /> {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <SectionTitle
            eyebrow="Who we are"
            title="An integrated advisory partner based in Jakarta"
          />
          <div className="space-y-4 leading-relaxed text-muted">
            <p>
              Businesses rarely face risk in one form. A single event can touch insurance, contracts, tax and daily
              operations at the same time.
            </p>
            <p>
              That is why we combine insurance risk assessment, insurance agency, retirement fund, legal, accounting
              and tax, and industrial management consulting under one roof.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 font-semibold text-navy-600 hover:text-navy-500">
              More about us <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </Section>

      <Section tone="ice">
        <Container>
          <SectionTitle eyebrow="What we do" title="Our services" text="Choose a single specialist service or combine several in one engagement." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-xl border border-navy-900/10 bg-white p-7 transition hover:-translate-y-1 hover:border-navy-500/40 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-ice-100 text-navy-600">
                  <Icon name={s.icon} />
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.short}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-600">
                  Learn more <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle eyebrow="How we work" title="A simple, transparent approach" center />
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((a) => (
              <li key={a.step} className="border-t-2 border-navy-600 pt-5">
                <span className="font-serif text-3xl text-navy-500">{a.step}</span>
                <h3 className="mt-2 text-lg font-semibold text-navy-900">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="ice">
        <Container>
          <SectionTitle eyebrow="Our values" title="What you can expect from us" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl bg-white p-6">
                <Icon name="check" className="h-5 w-5 text-navy-500" />
                <h3 className="mt-3 font-serif text-lg font-semibold text-navy-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex items-end justify-between gap-4">
            <SectionTitle eyebrow="Insights" title="Latest from our team" />
            <Link href="/insights" className="hidden items-center gap-2 text-sm font-semibold text-navy-600 sm:inline-flex">
              All articles <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.slug} href={`/insights/${p.slug}`} className="rounded-xl border border-navy-900/10 p-6 transition hover:border-navy-500/40 hover:shadow-lg">
                <span className="text-xs font-semibold uppercase tracking-widest text-navy-500">{p.category}</span>
                <h3 className="mt-3 font-serif text-lg font-semibold text-navy-900">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CallToAction />
    </>
  );
}
