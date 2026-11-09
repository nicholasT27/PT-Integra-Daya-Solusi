import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Container, Button, CallToAction } from "@/components/Ui";
import { WhoWeAre, Approach, Values, LatestInsights } from "@/components/home/Parts";
import { services, company } from "@/lib/site";

export const metadata = { title: "Homepage concept F: Dark editorial" };

// Concept F: a dark navy hero over the photo, with the headline on the left and the services list on the right.
export default function ConceptF() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <Image src="/brand/skyscrapers.jpg" alt="" fill priority className="-z-20 object-cover opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-900/60" />
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <Image src="/brand/ids-mark-white.svg" alt="IDS" width={200} height={68} className="w-28" priority />
            <h1 className="mt-10 text-4xl font-bold leading-[1.08] sm:text-6xl">
              Protect what you have <span className="text-sky-300">built.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">
              Insurance, risk, legal, finance and engineering advice from one integrated team.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Button href="/contact">Contact us</Button>
              <a href={company.phones[0].href} className="flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white">
                <Icon name="phone" className="h-4 w-4" /> {company.phones[0].label}
              </a>
            </div>
          </div>
          <ol className="divide-y divide-white/10 rounded-2xl border border-white/15 bg-white/5 backdrop-blur">
            {services.map((s, i) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group flex items-center gap-5 px-6 py-4 transition hover:bg-white/10">
                  <span className="w-6 text-sm font-semibold text-sky-300">0{i + 1}</span>
                  <span className="flex-1 font-semibold">{s.title}</span>
                  <Icon name="arrow" className="h-4 w-4 text-sky-300 transition group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <WhoWeAre />
      <Approach />
      <Values />
      <LatestInsights />
      <CallToAction />
    </>
  );
}
