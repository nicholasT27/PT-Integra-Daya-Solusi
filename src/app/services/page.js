import Link from "next/link";
import Icon from "@/components/Icon";
import { PageHeader, Container, Section, Glass, CallToAction } from "@/components/Ui";
import { Reveal } from "@/components/quinn/Interactive";
import { services } from "@/lib/site";

export const metadata = { title: "Services" };

// The Services page: all six services as cards, each leading to its own page.
export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services and solutions"
        title="Six specialist services,"
        accent="working together."
        text="Use one service on its own or combine several for a joined-up approach."
      />
      <Section>
        <Container className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 100} className="h-full">
              <Link href={`/services/${s.slug}`} className="group block h-full">
                <Glass className="flex h-full gap-5 p-7 transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-white group-hover:shadow-2xl">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-600 text-white transition-transform duration-300 group-hover:rotate-6"><Icon name={s.icon} className="h-7 w-7" /></span>
                  <span>
                    <span className="flex items-center gap-3"><span className="text-sm font-semibold text-navy-600/60">0{i + 1}</span><h2 className="text-2xl font-bold text-navy-900">{s.title}</h2></span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted">{s.short}</span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy-600">View details <span className="transition-transform duration-300 group-hover:translate-x-2">→</span></span>
                  </span>
                </Glass>
              </Link>
            </Reveal>
          ))}
        </Container>
      </Section>
      <CallToAction />
    </>
  );
}
