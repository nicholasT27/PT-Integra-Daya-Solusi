import Link from "next/link";
import { PageHeader, Container, Section, SectionTitle, CallToAction, EmptyNote } from "@/components/Ui";
import { values, company } from "@/lib/site";

export const metadata = { title: "About Us" };

// The About Us page: who the company is, its mission, values, leadership and news.
export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Integrated expertise, one trusted partner"
        text={`${company.name} is a consulting firm in Jakarta serving businesses that need dependable advice on risk, insurance, law, finance and operations.`}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Company and mission" title="Why we exist" />
            <p className="mt-5 leading-relaxed text-muted">
              Many companies manage insurance, legal, tax and operational risk through separate advisers who rarely talk
              to each other. Gaps appear between them.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              We close those gaps by bringing specialists together in one team that looks at the whole picture.
            </p>
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-navy-900/10 p-7">
              <h3 className="font-serif text-xl font-semibold text-navy-900">Our mission</h3>
              <p className="mt-3 leading-relaxed text-muted">
                To help organisations understand and manage their risks through honest, practical and well-coordinated advice.
              </p>
            </div>
            <div className="rounded-xl border border-navy-900/10 p-7">
              <h3 className="font-serif text-xl font-semibold text-navy-900">Our vision</h3>
              <p className="mt-3 leading-relaxed text-muted">
                To be the consultant that businesses in Indonesia turn to first when they need to protect what they have built.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="ice">
        <Container>
          <SectionTitle eyebrow="Leadership and values" title="The principles we work by" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl bg-white p-6">
                <h3 className="font-serif text-lg font-semibold text-navy-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <EmptyNote>Profiles of our leadership team will be published here soon.</EmptyNote>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle eyebrow="Press and company news" title="News" />
          <p className="mt-4 text-muted">
            Company announcements and articles from our team are shared on our{" "}
            <Link href="/insights" className="font-semibold text-navy-600 underline">Insights page</Link>.
          </p>
        </Container>
      </Section>

      <CallToAction />
    </>
  );
}
