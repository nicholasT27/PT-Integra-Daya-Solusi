import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Container, Button, CallToAction } from "@/components/Ui";
import { WhoWeAre, Approach, Values, LatestInsights } from "@/components/home/Parts";
import { services } from "@/lib/site";

export const metadata = { title: "Homepage concept A: Skyline" };

// Concept A: a full-screen skyscraper photo with the white logo, like page 8 of the brand guide.
export default function ConceptA() {
  return (
    <>
      <section className="relative isolate flex min-h-[640px] items-center justify-center overflow-hidden text-center text-white">
        <Image src="/brand/skyscrapers.jpg" alt="" fill priority className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900/55 via-navy-900/35 to-navy-950/80" />
        <Container className="py-24">
          <Image src="/brand/ids-mark-white.svg" alt="IDS" width={300} height={102} priority className="mx-auto w-56 sm:w-72" />
          <p className="mt-6 text-sm font-medium uppercase tracking-[0.35em] sm:text-base">PT Integra Daya Solusi</p>
          <h1 className="mx-auto mt-10 max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">
            Insurance, risk and engineering advice, integrated.
          </h1>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href="/services">Our services</Button>
            <Button href="/contact" variant="outline">Contact us</Button>
          </div>
        </Container>
      </section>

      <Container className="relative z-10 -mt-14">
        <div className="grid divide-navy-900/10 rounded-2xl bg-white p-2 shadow-2xl sm:grid-cols-2 lg:grid-cols-6 lg:divide-x">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="group flex flex-col items-center gap-3 rounded-xl px-3 py-6 text-center transition hover:bg-ice-50">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ice-100 text-navy-600 transition group-hover:bg-navy-600 group-hover:text-white">
                <Icon name={s.icon} />
              </span>
              <span className="text-sm font-semibold leading-snug text-navy-900">{s.title}</span>
            </Link>
          ))}
        </div>
      </Container>

      <WhoWeAre />
      <Approach />
      <Values />
      <LatestInsights />
      <CallToAction />
    </>
  );
}
