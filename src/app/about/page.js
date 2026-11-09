import Image from "next/image";
import Link from "next/link";
import { PageHeader, Container, Section, SectionTitle, CallToAction } from "@/components/Ui";
import { values, company, history, leaders } from "@/lib/site";

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
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle eyebrow="Our story" title="Company history" />
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {history.map((h) => (
              <li key={h.year} className="border-t-2 border-navy-600 pt-5">
                <span className="font-serif text-2xl text-navy-500">{h.year}</span>
                <h3 className="mt-2 font-semibold text-navy-900">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{h.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="ice">
        <Container>
          <SectionTitle eyebrow="Leadership team" title="The people leading the firm" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((l) => (
              <div key={l.name} className="rounded-xl bg-white p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-900 font-serif text-xl text-white">
                  {l.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-navy-900">{l.name}</h3>
                <p className="text-sm font-medium text-navy-500">{l.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{l.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ice">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-12">
            <Image src="/brand/ids-mark-blue.svg" alt="IDS logo" width={400} height={136} className="mx-auto w-full max-w-sm" />
          </div>
          <div>
            <SectionTitle eyebrow="Our brand" title="The meaning behind our logo" />
            <div className="mt-5 space-y-4 leading-relaxed text-muted">
              <p>
                Our logo joins the letters I, D and S into one connected form. It stands for integration, collaboration
                and continuity of solutions across many fields of business.
              </p>
              <p>
                Flowing lines and rounded corners express a professional, adaptable and humble company that builds
                flexible yet trustworthy working relationships. The simple, solid structure reflects efficiency,
                stability and readiness to deliver integrated, sustainable solutions.
              </p>
              <p>Blue was chosen to represent trust, professionalism and innovation.</p>
            </div>
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
