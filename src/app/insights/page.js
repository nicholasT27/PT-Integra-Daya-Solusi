import Link from "next/link";
import { PageHeader, Container, Section, SectionTitle, Glass, CallToAction, EmptyNote } from "@/components/Ui";
import { Reveal } from "@/components/quinn/Interactive";
import { Arrow } from "@/components/quinn/Bits";
import { posts } from "@/lib/site";

export const metadata = { title: "Insights" };

// Formats a date like 2026-10-01 into "1 October 2026".
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

// The Insights page: the latest article large, the others beside it, and a place for guides and reports.
export default function Insights() {
  const [first, ...rest] = posts;
  return (
    <>
      <PageHeader eyebrow="Blog" title="Insights from" accent="our consultants." text="Articles, news and industry trends on risk, insurance and business." />
      <Section>
        <Container className="grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Link href={`/insights/${first.slug}`} className="group flex h-full min-h-[360px] flex-col justify-between rounded-3xl bg-navy-900 p-8 text-white shadow-2xl transition-all duration-300 hover:-translate-y-2 sm:p-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Latest · {first.category}</p>
                <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">{first.title}</h2>
                <p className="mt-4 max-w-md text-white/75">{first.summary}</p>
              </div>
              <p className="mt-10 text-sm font-semibold text-sky-300">{formatDate(first.date)} · <span className="inline-flex items-center gap-2">Read article <Arrow /></span></p>
            </Link>
          </Reveal>
          <div className="grid gap-5 lg:col-span-5">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i + 1) * 100}>
                <Link href={`/insights/${p.slug}`} className="group block h-full">
                  <Glass className="flex h-full flex-col justify-between p-7 transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-white group-hover:shadow-2xl">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-600">{p.category}</p>
                      <h3 className="mt-3 text-xl font-bold leading-snug text-navy-900">{p.title}</h3>
                      <p className="mt-2 text-sm text-muted">{p.summary}</p>
                    </div>
                    <p className="mt-5 text-xs text-muted">{formatDate(p.date)} · <span className="font-semibold text-navy-600"><span className="inline-flex items-center gap-1.5">Read <Arrow className="h-3 w-3" /></span></span></p>
                  </Glass>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="ice">
        <Container>
          <SectionTitle eyebrow="Resources" title="Guides and" accent="reports." />
          <div className="mt-8"><EmptyNote>Downloadable guides and reports will be available here.</EmptyNote></div>
        </Container>
      </Section>
      <CallToAction />
    </>
  );
}
