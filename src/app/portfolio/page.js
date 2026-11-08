import Icon from "@/components/Icon";
import { PageHeader, Container, Section, SectionTitle, CallToAction, EmptyNote } from "@/components/Ui";
import { services } from "@/lib/site";

export const metadata = { title: "Portfolio" };

// The Portfolio page: the kinds of work we do, with spaces for projects and client testimonials.
export default function Portfolio() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="The kind of work we do"
        text="A look at the areas where we support clients, with project case studies and testimonials to follow."
      />
      <Section>
        <Container>
          <SectionTitle eyebrow="Projects" title="Areas of engagement" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.slug} className="rounded-xl border border-navy-900/10 p-6">
                <Icon name={s.icon} className="h-6 w-6 text-navy-600" />
                <h3 className="mt-4 font-serif text-lg font-semibold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.offerings[0]}.</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="ice">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Gallery" title="Project gallery" />
            <div className="mt-6"><EmptyNote>Photos from our assignments will be added here.</EmptyNote></div>
          </div>
          <div>
            <SectionTitle eyebrow="Testimonials" title="What clients say" />
            <div className="mt-6"><EmptyNote>Client testimonials will be shared here with their permission.</EmptyNote></div>
          </div>
        </Container>
      </Section>
      <CallToAction />
    </>
  );
}
