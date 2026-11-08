import { PageHeader, Container, Section, SectionTitle, CallToAction } from "@/components/Ui";
import { projects, testimonials } from "@/lib/site";

export const metadata = { title: "Portfolio" };

// The Portfolio page: sample projects and client testimonials.
export default function Portfolio() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Selected projects"
        text="A sample of the work we do for clients across industries."
      />
      <Section>
        <Container>
          <SectionTitle eyebrow="Projects" title="Our work" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article key={p.title} className="overflow-hidden rounded-xl border border-navy-900/10">
                <div className="bg-grid flex h-32 items-end bg-navy-800 p-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-sky-300">{p.category}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg font-semibold text-navy-900">{p.title}</h3>
                  <p className="mt-1 text-xs text-navy-500">{p.place}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="ice">
        <Container>
          <SectionTitle eyebrow="Testimonials" title="What clients say" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.quote} className="rounded-xl bg-white p-7">
                <blockquote className="font-serif text-lg leading-relaxed text-navy-900">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 text-sm text-muted">
                  <strong className="text-ink">{t.name}</strong>, {t.company}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>
      <CallToAction />
    </>
  );
}
