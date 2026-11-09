import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Container, Section, SectionTitle, Button, CallToAction } from "@/components/Ui";
import { WhoWeAre, Approach, LatestInsights } from "@/components/home/Parts";
import { services } from "@/lib/site";

export const metadata = { title: "Homepage concept B: Clean split" };

// Concept B: a bright white hero with the headline on the left, a photo on the right and the logo pattern behind.
export default function ConceptB() {
  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -right-24 top-0 hidden w-[760px] opacity-[0.07] lg:block" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((r) => (
            <div key={r} className="flex gap-6 py-2">
              {[0, 1, 2].map((c) => (
                <Image key={c} src="/brand/ids-mark-blue.svg" alt="" width={240} height={82} className={(r + c) % 2 ? "rotate-180" : ""} />
              ))}
            </div>
          ))}
        </div>
        <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-navy-600">PT Integra Daya Solusi</p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] text-navy-900 sm:text-5xl lg:text-6xl">
              One team for your <span className="text-navy-600">risk, insurance</span> and business advice.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Six specialist services working together, so every decision you make is better protected.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/services" className="inline-flex items-center gap-2 rounded-full bg-navy-600 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-700">
                Our services <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-navy-900/20 px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-ice-50">
                Contact us
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] rounded-br-[7rem] shadow-2xl">
              <Image src="/brand/skyscrapers.jpg" alt="Glass office towers seen from below" fill priority className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-4 rounded-2xl bg-white p-5 shadow-xl sm:-left-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-navy-600">Six disciplines</p>
              <p className="mt-1 text-lg font-semibold text-navy-900">One integrated team</p>
            </div>
          </div>
        </Container>
      </section>

      <WhoWeAre />

      <Section tone="ice">
        <Container>
          <SectionTitle eyebrow="What we do" title="Our services" />
          <div className="mt-10 divide-y divide-navy-900/10 border-y border-navy-900/10">
            {services.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group grid items-center gap-3 py-6 transition hover:bg-white md:grid-cols-12 md:px-4">
                <span className="text-sm font-semibold text-navy-600 md:col-span-1">0{i + 1}</span>
                <h3 className="text-xl font-semibold text-navy-900 md:col-span-4">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted md:col-span-6">{s.short}</p>
                <Icon name="arrow" className="hidden h-5 w-5 text-navy-600 transition group-hover:translate-x-1 md:col-span-1 md:block md:justify-self-end" />
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Approach />
      <LatestInsights />
      <CallToAction />
    </>
  );
}
