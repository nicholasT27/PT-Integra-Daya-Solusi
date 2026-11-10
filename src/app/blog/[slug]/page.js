import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, Container, Section, Glass, CallToAction } from "@/components/Ui";
import { Reveal } from "@/components/quinn/Interactive";
import { Arrow } from "@/components/quinn/Bits";
import { posts } from "@/lib/site";

// Tells Next.js to build one page for each article.
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

// Sets the browser tab title for an article.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.summary } : {};
}

// Formats a date like 2026-10-01 into "1 October 2026".
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

// A single article page, with the other articles listed underneath.
export default async function Post({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const others = posts.filter((p) => p.slug !== slug);

  return (
    <>
      <PageHeader eyebrow={`${post.category} · ${formatDate(post.date)}`} title={post.title} />
      <Section>
        <Container className="max-w-3xl">
          <Reveal>
            <Glass className="p-8 sm:p-12">
              <div className="space-y-5 text-lg leading-relaxed text-navy-900/85">
                {post.body.map((para) => <p key={para}>{para}</p>)}
              </div>
              <Link href="/blog" className="mt-10 inline-flex items-center gap-2 font-semibold text-navy-600 transition-all hover:gap-3"><Arrow flip /> Back to the blog</Link>
            </Glass>
          </Reveal>
        </Container>
      </Section>
      <Section tone="ice">
        <Container>
          <h2 className="text-3xl font-bold text-navy-900">More to read</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <Link href={`/blog/${p.slug}`} className="group block h-full">
                  <Glass className="h-full p-7 transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-white group-hover:shadow-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-600">{p.category}</p>
                    <h3 className="mt-3 text-xl font-bold leading-snug text-navy-900">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted">{p.summary}</p>
                  </Glass>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <CallToAction />
    </>
  );
}
