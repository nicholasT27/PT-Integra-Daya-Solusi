import Link from "next/link";
import Icon from "@/components/Icon";
import { PageHeader, Container, Section, CallToAction } from "@/components/Ui";
import { services } from "@/lib/site";

export const metadata = { title: "Services" };

// The Services page: lists all six services with a short description of each.
export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services and solutions"
        title="Six specialist services, working together"
        text="Use one service on its own or combine several for a joined-up approach."
      />
      <Section>
        <Container className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex gap-5 rounded-xl border border-navy-900/10 p-7 transition hover:border-navy-500/40 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-ice-100 text-navy-600">
                <Icon name={s.icon} />
              </span>
              <span>
                <h2 className="font-serif text-xl font-semibold text-navy-900">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy-600">
                  View details <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          ))}
        </Container>
      </Section>
      <CallToAction />
    </>
  );
}
