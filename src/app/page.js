import Link from "next/link";
import Icon from "@/components/Icon";
import { Container, Button, CallToAction } from "@/components/Ui";
import { WhoWeAre, ServicesGrid, Approach, Values, LatestInsights } from "@/components/home/Parts";
import { services, company } from "@/lib/site";

// The home page: introduction, services, how we work, latest insights and a contact prompt.
export default function Home() {
  return (
    <>
      <section className="bg-grid bg-navy-900 text-white">
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-5 lg:py-28">
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              Insurance, Risk and Engineering Consultant
            </p>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Clear advice for a more secure business.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-sky-300">
              {company.name} brings risk, insurance, legal, financial and industrial expertise together, so you can
              make decisions with confidence.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/services">Our services</Button>
              <Button href="/contact" variant="outline">Contact us</Button>
            </div>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Six disciplines, one team</p>
            <ul className="mt-4 divide-y divide-white/10">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="flex items-center gap-3 py-3 text-sm hover:text-sky-300">
                    <Icon name={s.icon} className="h-5 w-5 text-sky-300" /> {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <WhoWeAre />
      <ServicesGrid />
      <Approach />
      <Values />
      <LatestInsights />

      <CallToAction />
    </>
  );
}
