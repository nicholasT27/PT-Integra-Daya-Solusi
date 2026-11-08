import Link from "next/link";
import { PageHeader, Container, Section, SectionTitle, EmptyNote } from "@/components/Ui";
import { values } from "@/lib/site";

export const metadata = { title: "Careers" };

// The Careers page: open positions, company culture and how to apply.
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
          <div className="mt-6">
            <EmptyNote>
              There are no vacancies listed right now. You are welcome to introduce yourself through our{" "}
              <Link href="/contact" className="font-semibold text-navy-600 underline">contact page</Link>.
            </EmptyNote>
          </div>
        </Container>
      </Section>
      <Section tone="ice">
        <Container>
          <SectionTitle eyebrow="Culture and benefits" title="How we work together" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl bg-white p-6">
                <h3 className="font-serif text-lg font-semibold text-navy-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
