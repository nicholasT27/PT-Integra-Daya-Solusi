import Link from "next/link";
import Icon from "@/components/Icon";
import { PageHeader, Container, Section, SectionTitle } from "@/components/Ui";
import { jobs, benefits, employeeStories } from "@/lib/site";

export const metadata = { title: "Careers" };

// The Careers page: job openings, culture and benefits, and employee stories.
export default function Careers() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Build a career with us"
        text="We are always interested in meeting talented people who care about doing careful, honest work."
      />
      <Section>
        <Container>
          <SectionTitle eyebrow="Job openings" title="Current opportunities" />
          <div className="mt-10 divide-y divide-navy-900/10 rounded-xl border border-navy-900/10">
            {jobs.map((j) => (
              <div key={j.title} className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-navy-900">{j.title}</h3>
                  <p className="text-xs text-navy-500">{j.type} · {j.place}</p>
                  <p className="mt-2 max-w-xl text-sm text-muted">{j.text}</p>
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-navy-600 hover:text-navy-500">
                  Apply <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="ice">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Culture and benefits" title="Why people join us" />
            <ul className="mt-6 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex gap-3 text-muted">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-navy-500" /> {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionTitle eyebrow="Employee stories" title="In their words" />
            <div className="mt-6 space-y-5">
              {employeeStories.map((e) => (
                <figure key={e.quote} className="rounded-xl bg-white p-6">
                  <blockquote className="font-serif text-lg text-navy-900">&ldquo;{e.quote}&rdquo;</blockquote>
                  <figcaption className="mt-3 text-sm text-muted">{e.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
