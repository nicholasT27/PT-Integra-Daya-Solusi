import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Container, CallToAction } from "@/components/Ui";
import { WhoWeAre, ServicesGrid, Approach, Values, LatestInsights } from "@/components/home/Parts";
import { services } from "@/lib/site";

export const metadata = { title: "Homepage concept E: Centred banner" };

// Concept E: centred headline on white, then a wide photo banner with the six services floating on it.
export default function ConceptE() {
  return (
    <>
      <section className="bg-white pt-16 text-center lg:pt-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-navy-600">Insurance · Risk · Engineering</p>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.08] text-navy-900 sm:text-6xl">
            Advice that connects <span className="text-navy-600">every part</span> of your business.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            PT Integra Daya Solusi brings six specialist services together, so nothing falls between the gaps.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-navy-600 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-700">
              Talk to us <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link href="/about" className="rounded-full border border-navy-900/20 px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-ice-50">
              About us
            </Link>
          </div>
        </Container>
        <Container className="mt-14">
          <div className="relative aspect-[16/8] overflow-hidden rounded-[2rem]">
            <Image src="/brand/skyscrapers.jpg" alt="Glass office towers seen from below" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
            <div className="absolute inset-x-4 bottom-4 flex flex-wrap justify-center gap-2 sm:inset-x-8 sm:bottom-8">
              {services.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-navy-900 shadow hover:bg-white sm:text-sm">
                  <Icon name={s.icon} className="h-4 w-4 text-navy-600" /> {s.title}
                </Link>
              ))}
            </div>
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
