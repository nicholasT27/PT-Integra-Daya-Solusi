import Link from "next/link";
import { PageHeader, Container, Section, SectionTitle, CallToAction, EmptyNote } from "@/components/Ui";
import { posts } from "@/lib/site";

export const metadata = { title: "Insights" };

// Formats a date like 2026-10-01 into "1 October 2026".
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

// The Insights page: articles and news, with a place for guides and reports.
export default function Insights() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Insights"
        text="Articles, news and industry trends from our consultants."
      />
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.slug} href={`/insights/${p.slug}`} className="rounded-xl border border-navy-900/10 p-6 transition hover:border-navy-500/40 hover:shadow-lg">
                <span className="text-xs font-semibold uppercase tracking-widest text-navy-500">{p.category}</span>
                <h2 className="mt-3 font-serif text-xl font-semibold text-navy-900">{p.title}</h2>
                <p className="mt-2 text-sm text-muted">{p.summary}</p>
                <p className="mt-4 text-xs text-muted">{formatDate(p.date)}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="ice">
        <Container>
          <SectionTitle eyebrow="Resources" title="Guides and reports" />
          <div className="mt-6"><EmptyNote>Downloadable guides and reports will be available here.</EmptyNote></div>
        </Container>
      </Section>
      <CallToAction />
    </>
  );
}
