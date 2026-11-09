import Link from "next/link";
import { PageHeader, Container, Section, SectionTitle, Glass, CallToAction } from "@/components/Ui";
import { Reveal } from "@/components/quinn/Interactive";
import { jobs, benefits, employeeStories } from "@/lib/site";

export const metadata = { title: "Careers" };

// The Careers page: open positions, why people join us and what employees say.
export default function Careers() {
  return (
    <>
      <PageHeader eyebrow="Careers" title="Build a career" accent="with us." text="We are always interested in meeting talented people who care about doing careful, honest work." />
      <Section>
        <Container>
          <SectionTitle eyebrow="Job openings" title="Current" accent="opportunities." />
          <div className="mt-12 space-y-4">
            {jobs.map((j, i) => (
              <Reveal key={j.title} delay={i * 80}>
                <Glass className="group flex flex-col gap-5 p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold text-navy-900">{j.title}</h3>
                      <span className="rounded-full bg-ice-100 px-3 py-1 text-xs font-semibold text-navy-600">{j.type}</span>
                      <span className="text-xs font-semibold text-muted">{j.place}</span>
                    </div>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{j.text}</p>
                  </div>
                  <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-navy-600 px-6 py-3 text-sm font-semibold text-navy-600 transition-colors duration-300 hover:bg-navy-600 hover:text-white">Apply <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></Link>
                </Glass>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="ice">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Culture and benefits" title="Why people" accent="join us." />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {benefits.map((b, i) => (
                <Reveal key={b} delay={i * 70}>
                  <li className="flex gap-3 rounded-2xl border border-white bg-white/60 p-4 text-sm text-navy-900 backdrop-blur-xl"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-600 text-xs text-white">✓</span>{b}</li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <SectionTitle eyebrow="Employee stories" title="In their" accent="words." />
            <div className="mt-8 space-y-4">
              {employeeStories.map((e, i) => (
                <Reveal key={e.quote} delay={i * 100}>
                  <Glass className="p-7">
                    <span className="text-5xl font-bold leading-none text-navy-600">&ldquo;</span>
                    <blockquote className="text-lg font-semibold leading-snug text-navy-900">{e.quote}</blockquote>
                    <p className="mt-4 text-sm text-muted">{e.name}</p>
                  </Glass>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      <CallToAction />
    </>
  );
}
