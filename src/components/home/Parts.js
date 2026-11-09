import Link from "next/link";
import Icon from "@/components/Icon";
import { Container, Section, SectionTitle } from "@/components/Ui";
import { services, approach, values, posts } from "@/lib/site";

// The short "who we are" introduction block.
export function WhoWeAre() {
  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-2">
        <SectionTitle eyebrow="Who we are" title="An integrated advisory partner based in Jakarta" />
        <div className="space-y-4 leading-relaxed text-muted">
          <p>
            Businesses rarely face risk in one form. A single event can touch insurance, contracts, tax and daily
            operations at the same time.
          </p>
          <p>
            That is why we combine insurance risk assessment, insurance agency, retirement fund, legal, accounting and
            tax, and industrial management consulting under one roof.
          </p>
          <Link href="/about" className="inline-flex items-center gap-2 font-semibold text-navy-600 hover:text-navy-500">
            More about us <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}

// The six services shown as a grid of cards.
export function ServicesGrid() {
  return (
    <Section tone="ice">
      <Container>
        <SectionTitle eyebrow="What we do" title="Our services" text="Choose a single specialist service or combine several in one engagement." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-2xl border border-navy-900/10 bg-white p-7 transition hover:-translate-y-1 hover:border-navy-600/40 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ice-100 text-navy-600">
                <Icon name={s.icon} />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-navy-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.short}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-600">
                Learn more <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// The four-step "how we work" row.
export function Approach() {
  return (
    <Section>
      <Container>
        <SectionTitle eyebrow="How we work" title="A simple, transparent approach" center />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((a) => (
            <li key={a.step} className="border-t-2 border-navy-600 pt-5">
              <span className="text-3xl font-semibold text-navy-600">{a.step}</span>
              <h3 className="mt-2 text-lg font-semibold text-navy-900">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

// The four company values in small cards.
export function Values() {
  return (
    <Section tone="ice">
      <Container>
        <SectionTitle eyebrow="Our values" title="What you can expect from us" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl bg-white p-6">
              <Icon name="check" className="h-5 w-5 text-navy-600" />
              <h3 className="mt-3 text-lg font-semibold text-navy-900">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// The three latest articles.
export function LatestInsights() {
  return (
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
            <Link key={p.slug} href={`/insights/${p.slug}`} className="rounded-2xl border border-navy-900/10 p-6 transition hover:border-navy-600/40 hover:shadow-lg">
              <span className="text-xs font-semibold uppercase tracking-widest text-navy-600">{p.category}</span>
              <h3 className="mt-3 text-lg font-semibold text-navy-900">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.summary}</p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
