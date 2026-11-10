import Link from "next/link";
import { PageHeader, Container, Section, CallToAction } from "@/components/Ui";
import { Reveal } from "@/components/quinn/Interactive";
import { ArrowButton } from "@/components/quinn/Bits";
import ProductArt from "@/components/qx/ProductArt";
import { products } from "@/lib/site";

export const metadata = { title: "Products" };

// The Products page: the three engineering products (factory, transportation, building), one per row with its photo.
export default function Products() {
  return (
    <>
      <PageHeader eyebrow="Products" title="Engineering solutions for" accent="the places that matter." text="Factories, transport and buildings: the assets where good engineering and good risk management make the biggest difference." />
      <Section>
        <Container className="space-y-24">
          {products.map((p, i) => (
            <div key={p.slug} className="grid items-center gap-10 lg:grid-cols-12">
              <Reveal className={`lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
                <Link href={`/products/${p.slug}`} aria-label={p.title} className="group relative block">
                  <span className={`absolute -bottom-4 ${i % 2 ? "-left-4" : "-right-4"} hidden h-full w-full rounded-[2rem] border border-navy-600/30 sm:block`} />
                  <div className={`relative aspect-[4/3] overflow-hidden shadow-2xl ring-4 ring-white ${i % 2 ? "rounded-[2rem] rounded-tr-[7rem]" : "rounded-[2rem] rounded-tl-[7rem]"}`}>
                    <span className="absolute inset-0 block transition-transform duration-700 group-hover:scale-105"><ProductArt kind={p.art} className="!h-full !rounded-none" sizes="620px" /></span>
                    <span className="absolute inset-0 bg-gradient-to-t from-navy-900/20 to-transparent" />
                  </div>
                </Link>
              </Reveal>
              <Reveal delay={150} className="lg:col-span-6">
                <span className="text-7xl font-bold leading-none text-transparent" style={{ WebkitTextStroke: "2px rgba(0,58,242,0.3)" }}>0{i + 1}</span>
                <h2 className="mt-2 text-balance text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">{p.title}</h2>
                <p className="mt-4 max-w-lg leading-relaxed text-muted">{p.intro}</p>
                <ul className="mt-5 space-y-2 text-sm text-navy-900">
                  {p.covers.slice(0, 3).map((c) => <li key={c} className="flex gap-3"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-navy-600" />{c}</li>)}
                </ul>
                <div className="mt-7"><ArrowButton href={`/products/${p.slug}`}>View product</ArrowButton></div>
              </Reveal>
            </div>
          ))}
        </Container>
      </Section>
      <CallToAction />
    </>
  );
}
