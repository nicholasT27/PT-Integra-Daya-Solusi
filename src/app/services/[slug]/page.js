import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { PageHeader, Container, Section, Glass, CallToAction } from "@/components/Ui";
import { Reveal } from "@/components/quinn/Interactive";
import { ArrowButton } from "@/components/quinn/Bits";
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

// A page for a single service: what it covers, a way to get in touch, and links to the other services.
export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <PageHeader eyebrow="Services" title={service.title} text={service.intro}>
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-600 text-white shadow-xl"><Icon name={service.icon} className="h-8 w-8" /></span>
      </PageHeader>
      <Section>
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <Glass className="p-8 sm:p-10">
                <h2 className="text-3xl font-bold text-navy-900">What we can help with</h2>
                <ul className="mt-8 space-y-4">
                  {service.offerings.map((o, i) => (
                    <Reveal key={o} delay={i * 80}>
                      <li className="flex gap-4 border-t border-navy-900/10 pt-4 text-navy-900">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-600 text-xs font-bold text-white">{i + 1}</span>
                        {o}
                      </li>
                    </Reveal>
                  ))}
                </ul>
                <p className="mt-8 leading-relaxed text-muted">Every engagement starts with a conversation. Contact us to discuss your situation and we will outline how we would approach it.</p>
                <div className="mt-8"><ArrowButton href="/contact">Talk to us about this</ArrowButton></div>
              </Glass>
            </Reveal>
          </div>
          <aside className="lg:col-span-4">
            <Reveal delay={120}>
              <Glass className="p-7 lg:sticky lg:top-28">
                <h3 className="text-lg font-bold text-navy-900">Other services</h3>
                <ul className="mt-4 space-y-1">
                  {services.filter((s) => s.slug !== slug).map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="group flex items-center gap-3 rounded-xl p-2 text-sm text-navy-900 transition-colors hover:bg-ice-100">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ice-100 text-navy-600 transition-colors group-hover:bg-navy-600 group-hover:text-white"><Icon name={s.icon} className="h-4 w-4" /></span>
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Glass>
            </Reveal>
          </aside>
        </Container>
      </Section>
      <CallToAction />
    </>
  );
}
