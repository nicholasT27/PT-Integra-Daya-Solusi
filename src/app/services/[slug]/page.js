import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { PageHeader, Container, Section, CallToAction } from "@/components/Ui";
import { services } from "@/lib/site";

// Tells Next.js to build one page for each service.
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

// Sets the browser tab title for a service page.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? { title: s.title, description: s.short } : {};
}

// A page for a single service with what it covers and links to the other services.
export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <PageHeader eyebrow="Services" title={service.title} text={service.intro} />
      <Section>
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-semibold text-navy-900">What we can help with</h2>
            <ul className="mt-6 space-y-4">
              {service.offerings.map((o) => (
                <li key={o} className="flex gap-3 text-muted">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-navy-500" /> {o}
                </li>
              ))}
            </ul>
            <p className="mt-8 leading-relaxed text-muted">
              Every engagement starts with a conversation. Contact us to discuss your situation and we will outline how we would approach it.
            </p>
          </div>
          <aside className="h-fit rounded-xl bg-ice-50 p-6">
            <h3 className="font-serif text-lg font-semibold text-navy-900">Other services</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {services.filter((s) => s.slug !== slug).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-navy-600 hover:text-navy-500">{s.title}</Link>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </Section>
      <CallToAction />
    </>
  );
}
