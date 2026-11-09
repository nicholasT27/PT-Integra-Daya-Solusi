import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Container, CallToAction } from "@/components/Ui";
import { WhoWeAre, ServicesGrid, Approach, LatestInsights } from "@/components/home/Parts";

export const metadata = { title: "Homepage concept D: Pattern" };

// Concept D: a full-blue hero filled with the repeating logo pattern from page 6 of the brand guide.
export default function ConceptD() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-600">
        <div className="absolute inset-0 -z-10 flex -translate-x-10 flex-col opacity-[0.18]" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5, 6].map((r) => (
            <div key={r} className="flex shrink-0 gap-2 py-1" style={{ marginLeft: r % 2 ? "-120px" : 0 }}>
              {[0, 1, 2, 3, 4, 5, 6].map((c) => (
                <Image key={c} src="/brand/ids-mark-white.svg" alt="" width={260} height={88} className={`w-[260px] shrink-0 ${c % 2 ? "-scale-x-100" : ""}`} />
              ))}
            </div>
          ))}
        </div>
        <Container className="flex min-h-[620px] items-center justify-center py-20">
          <div className="max-w-2xl rounded-3xl bg-white p-8 text-center shadow-2xl sm:p-14">
            <Image src="/brand/ids-mark-blue.svg" alt="IDS" width={160} height={54} className="mx-auto w-32" priority />
            <h1 className="mt-8 text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
              Integrated solutions for risk, insurance and business.
            </h1>
            <p className="mt-4 text-muted">Six specialist services from one trusted partner in Jakarta.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/services" className="inline-flex items-center gap-2 rounded-full bg-navy-600 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-700">
                Our services <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="rounded-full border border-navy-900/20 px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-ice-50">
                Contact us
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <WhoWeAre />
      <ServicesGrid />
      <Approach />
      <LatestInsights />
      <CallToAction />
    </>
  );
}
