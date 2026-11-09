import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Container, Section, SectionTitle, Button, CallToAction } from "@/components/Ui";
import { Approach, LatestInsights } from "@/components/home/Parts";
import { services } from "@/lib/site";

export const metadata = { title: "Homepage concept C: Bold blue" };

// Concept C: a bold Blue Integrity hero with a large logo, a photo band and navy service tiles.
export default function ConceptC() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-600 text-white">
        <Image
          src="/brand/ids-mark-white.svg"
          alt=""
          width={900}
          height={306}
          aria-hidden="true"
          className="pointer-events-none absolute -right-72 top-1/2 hidden w-[760px] -translate-y-1/2 opacity-15 lg:block"
        />
        <Container className="relative py-24 lg:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">PT Integra Daya Solusi</p>
          <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Integrated solutions you can rely on.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85">
            Insurance, risk, legal, finance and engineering expertise from one trusted partner in Jakarta.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/services" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-ice-100">
              Our services <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Button href="/contact" variant="outline">Contact us</Button>
          </div>
        </Container>
        <div className="relative border-t border-white/20 bg-navy-900/40">
          <Container className="grid gap-2 py-5 text-center text-xs font-semibold uppercase tracking-[0.3em] sm:grid-cols-3">
            <span>Integrasi</span>
            <span>Kolaborasi</span>
            <span>Kesinambungan</span>
          </Container>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-24 text-white">
        <Image src="/brand/skyscrapers.jpg" alt="" fill className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-navy-900/80" />
        <Container className="max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-snug sm:text-4xl">
            Risk does not stop at one department, so our advice should not either.
          </h2>
          <p className="mt-5 text-sky-300">
            We combine six specialist services to give you the full picture and a clear next step.
          </p>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionTitle eyebrow="What we do" title="Our services" />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-navy-900/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group bg-white p-8 transition hover:bg-navy-900">
                <span className="text-sm font-semibold text-navy-600 group-hover:text-sky-300">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-semibold text-navy-900 group-hover:text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted group-hover:text-sky-300">{s.short}</p>
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
