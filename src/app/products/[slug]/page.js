import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, Container, Section, Glass, CallToAction } from "@/components/Ui";
import { Reveal } from "@/components/quinn/Interactive";
import { ArrowButton } from "@/components/quinn/Bits";
import ProductArt from "@/components/qx/ProductArt";
import { products } from "@/lib/site";

// Tells Next.js to build one page for each product.
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

// Sets the browser tab title for a product page.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.short } : {};
}

// A page for one product: what it covers, how we work, and links to the other products.
export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <>
      <PageHeader eyebrow="Products" title={product.title} text={product.intro} />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <Reveal>
              <Glass className="p-8 sm:p-10">
                <h2 className="text-3xl font-bold text-navy-900">What it covers</h2>
                <ul className="mt-8 space-y-4">
                  {product.covers.map((c, i) => (
                    <li key={c} className="flex gap-4 border-t border-navy-900/10 pt-4 text-navy-900"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-600 text-xs font-bold text-white">{i + 1}</span>{c}</li>
                  ))}
                </ul>
              </Glass>
            </Reveal>
            <Reveal>
              <Glass className="p-8 sm:p-10">
                <h2 className="text-3xl font-bold text-navy-900">How we work</h2>
                <ol className="mt-8 grid gap-5 sm:grid-cols-2">
                  {product.steps.map((s, i) => (
                    <li key={s} className="rounded-2xl bg-ice-50 p-5"><span className="text-3xl font-bold text-navy-600/40">0{i + 1}</span><p className="mt-2 font-semibold text-navy-900">{s}</p></li>
                  ))}
                </ol>
                <div className="mt-8"><ArrowButton href="/contact">Talk to us about this</ArrowButton></div>
              </Glass>
            </Reveal>
          </div>
          <aside className="space-y-5 lg:col-span-4">
            <Reveal delay={100}><Glass className="p-6"><ProductArt kind={product.art} className="h-auto w-full" /></Glass></Reveal>
            <Reveal delay={180}>
              <Glass className="p-7">
                <h3 className="text-lg font-bold text-navy-900">Other products</h3>
                <ul className="mt-4 space-y-1">
                  {products.filter((p) => p.slug !== slug).map((p) => (
                    <li key={p.slug}><Link href={`/products/${p.slug}`} className="block rounded-xl p-2 text-sm text-navy-900 transition-colors hover:bg-ice-100 hover:text-navy-600">{p.title}</Link></li>
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
