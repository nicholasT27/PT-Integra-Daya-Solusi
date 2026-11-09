import Image from "next/image";
import Link from "next/link";
import { PageHeader, Container, Section, SectionTitle, Glass, CallToAction } from "@/components/Ui";
import { Reveal } from "@/components/quinn/Interactive";
import { ArrowButton } from "@/components/quinn/Bits";
import Timeline from "@/components/qx/Timeline";
import { values, company, history, leaders } from "@/lib/site";

export const metadata = { title: "About Us" };

// The About Us page: who the company is, its mission and vision, the story behind the logo, values, history and leadership.
export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Integrated expertise,"
        accent="one trusted partner."
        text={`${company.name} is a consulting firm in Jakarta serving businesses that need dependable advice on risk, insurance, law, finance and operations.`}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Company and mission" title="Why we" accent="exist." />
            <Reveal delay={150}><p className="mt-6 leading-relaxed text-muted">Many companies manage insurance, legal, tax and operational risk through separate advisers who rarely talk to each other. Gaps appear between them.</p></Reveal>
            <Reveal delay={220}><p className="mt-4 leading-relaxed text-muted">We close those gaps by bringing specialists together in one team that looks at the whole picture.</p></Reveal>
          </div>
          <div className="space-y-5">
            <Reveal><Glass className="p-8"><h3 className="text-2xl font-bold text-navy-900">Our mission</h3><p className="mt-3 leading-relaxed text-muted">To help organisations understand and manage their risks through honest, practical and well-coordinated advice.</p></Glass></Reveal>
            <Reveal delay={120}><Glass className="p-8"><h3 className="text-2xl font-bold text-navy-900">Our vision</h3><p className="mt-3 leading-relaxed text-muted">To be the consultant that businesses in Indonesia turn to first when they need to protect what they have built.</p></Glass></Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="ice">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Glass className="flex items-center justify-center p-12">
              <Image src="/brand/ids-mark-blue.svg" alt="IDS logo" width={400} height={136} className="w-full max-w-sm" />
            </Glass>
          </Reveal>
          <div>
            <SectionTitle eyebrow="Our brand" title="The meaning behind" accent="our logo." />
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              <Reveal delay={150}><p>Our logo joins the letters I, D and S into one connected form. It stands for integration, collaboration and continuity of solutions across many fields of business.</p></Reveal>
              <Reveal delay={200}><p>Flowing lines and rounded corners express a professional, adaptable and humble company that builds flexible yet trustworthy working relationships. The simple, solid structure reflects efficiency, stability and readiness to deliver integrated, sustainable solutions.</p></Reveal>
              <Reveal delay={250}><p>Blue was chosen to represent trust, professionalism and innovation.</p></Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle eyebrow="Values" title="The principles we" accent="work by." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100} className="h-full">
                <Glass className="group h-full p-7 transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-2xl">
                  <span className="text-sm font-semibold text-navy-600/60">0{i + 1}</span>
                  <h3 className="mt-3 text-xl font-bold text-navy-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
                </Glass>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ice">
        <Container>
          <SectionTitle eyebrow="Our story" title="Built one discipline at a time," accent="joined into one team." />
          <div className="mt-16"><Timeline items={history} /></div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle eyebrow="Leadership team" title="The people" accent="leading the firm." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((l, i) => (
              <Reveal key={l.name} delay={i * 100} className="h-full">
                <Glass className="group h-full p-7 transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-2xl">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-600 text-xl font-bold text-white transition-transform duration-300 group-hover:scale-105">{l.name.split(" ").map((w) => w[0]).join("")}</span>
                  <h3 className="mt-5 text-lg font-bold text-navy-900">{l.name}</h3>
                  <p className="text-sm font-semibold text-navy-600">{l.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{l.bio}</p>
                </Glass>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14"><p className="text-muted">Company announcements and articles from our team are shared on our <Link href="/insights" className="font-semibold text-navy-600 underline">Insights page</Link>.</p></Reveal>
        </Container>
      </Section>

      <CallToAction />
    </>
  );
}
