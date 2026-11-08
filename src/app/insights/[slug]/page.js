import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, Container, Section, CallToAction } from "@/components/Ui";
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

// A single article page.
export default async function Post({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <PageHeader eyebrow={post.category} title={post.title} />
      <Section>
        <Container className="max-w-3xl">
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            {post.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <Link href="/insights" className="mt-10 inline-block font-semibold text-navy-600 hover:text-navy-500">
            ← Back to all insights
          </Link>
        </Container>
      </Section>
      <CallToAction />
    </>
  );
}
