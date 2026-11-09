import Link from "next/link";
import Icon from "./Icon";

// Wraps page content in a centred column with consistent side spacing.
export function Container({ children, className = "" }) {
  return <div className={`mx-auto max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

// A block of the page with vertical spacing and an optional background colour.
export function Section({ children, tone = "white", className = "" }) {
  const bg = tone === "ice" ? "bg-ice-50" : "bg-white";
  return <section className={`${bg} py-20 ${className}`}>{children}</section>;
}

// A small heading with a title and optional intro, used at the top of each section.
export function SectionTitle({ eyebrow, title, text, center = false }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-500">{eyebrow}</p>}
      <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-900 sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 leading-relaxed text-muted">{text}</p>}
    </div>
  );
}

// The dark blue banner at the top of inner pages with the page title.
export function PageHeader({ eyebrow, title, text }) {
  return (
    <div className="bg-grid bg-navy-900 py-20 text-white">
      <Container>
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold sm:text-5xl">{title}</h1>
        {text && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sky-300">{text}</p>}
      </Container>
    </div>
  );
}

// A styled link that looks like a button. Use "solid" or "outline".
export function Button({ href, children, variant = "solid" }) {
  const styles =
    variant === "solid"
      ? "bg-navy-600 text-white hover:bg-navy-500"
      : "border border-white/40 text-white hover:bg-white/10";
  return (
    <Link href={href} className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${styles}`}>
      {children} <Icon name="arrow" className="h-4 w-4" />
    </Link>
  );
}

// A banner near the bottom of pages inviting visitors to get in touch.
export function CallToAction() {
  return (
    <section className="bg-grid bg-navy-800 py-16 text-white">
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="font-serif text-3xl font-semibold">Let us talk about your needs</h2>
          <p className="mt-2 text-sky-300">Tell us what you are working on and we will suggest the right next step.</p>
        </div>
        <Button href="/contact">Contact us</Button>
      </Container>
    </section>
  );
}

// A friendly message shown where content has not been added yet.
export function EmptyNote({ children }) {
  return (
    <div className="rounded-lg border border-dashed border-navy-600/30 bg-ice-50 p-8 text-center text-muted">
      {children}
    </div>
  );
}
