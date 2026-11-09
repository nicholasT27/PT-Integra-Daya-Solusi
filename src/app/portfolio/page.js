import { PageHeader, Container, Section, SectionTitle, Glass, CallToAction } from "@/components/Ui";
import { Reveal } from "@/components/quinn/Interactive";
import ProjectGrid from "@/components/qx/ProjectGrid";
import { projects, testimonials } from "@/lib/site";

export const metadata = { title: "Portfolio" };

// The Portfolio page: sample projects with a service filter, and what clients say.
export default function Portfolio() {
  return (
    <>
      <PageHeader eyebrow="Portfolio" title="Selected" accent="projects." text="A sample of the work we do for clients across industries. Choose a service to filter the list." />
      <Section>
        <Container><ProjectGrid projects={projects} /></Container>
      </Section>
      <Section tone="ice">
        <Container>
          <SectionTitle eyebrow="Testimonials" title="What clients" accent="say." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.quote} delay={i * 100} className="h-full">
                <Glass className="h-full p-7">
                  <span className="text-6xl font-bold leading-none text-navy-600">&ldquo;</span>
                  <blockquote className="mt-1 text-lg font-semibold leading-snug text-navy-900">{t.quote}</blockquote>
                  <p className="mt-6 text-sm text-muted"><strong className="text-navy-900">{t.name}</strong>, {t.company}</p>
                </Glass>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <CallToAction />
    </>
  );
}
