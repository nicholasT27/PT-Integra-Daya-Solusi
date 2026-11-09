import { Reveal } from "@/components/quinn/Interactive";
import { ArrowButton, DetailTab } from "@/components/quinn/Bits";

// Wraps page content in a centred column with consistent side spacing.
export function Container({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

// A frosted-glass card, used for most boxes on the inner pages.
export function Glass({ children, className = "" }) {
  return <div className={`rounded-3xl border border-white bg-white/70 shadow-lg backdrop-blur-xl ${className}`}>{children}</div>;
}

// A block of the page. It has no colour of its own: it only tells the page background which soft tone to blend to.
export function Section({ children, tone = "white", className = "", id }) {
  const [t, g] = tone === "ice" ? ["#eaf0ff", "1"] : ["#f5f8ff", "0.9"];
  return <section id={id} data-tone={t} data-glow={g} className={`py-24 ${className}`}>{children}</section>;
}

// A heading with a small label above it and an optional intro, used at the top of each section.
export function SectionTitle({ eyebrow, title, accent, text, center = false }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Reveal><DetailTab className="text-navy-600">{eyebrow}</DetailTab></Reveal>}
      <Reveal delay={60}><h2 className="mt-5 text-balance text-4xl font-bold leading-[1.05] text-navy-900 sm:text-5xl">{title}{accent && <> <span className="shine-text">{accent}</span></>}</h2></Reveal>
      {text && <Reveal delay={120}><p className="mt-4 leading-relaxed text-muted">{text}</p></Reveal>}
    </div>
  );
}

// The opening of every inner page: a small label, a big title and an intro, on the same airy background as the home page.
export function PageHeader({ eyebrow, title, accent, text, children }) {
  return (
    <section data-tone="#ffffff" data-glow="1" className="pb-16 pt-40">
      <Container>
        {eyebrow && <Reveal><DetailTab className="text-navy-600">{eyebrow}</DetailTab></Reveal>}
        <Reveal delay={60}><h1 className="mt-6 max-w-4xl text-balance text-5xl font-bold leading-[1.04] text-navy-900 sm:text-7xl">{title}{accent && <> <span className="shine-text">{accent}</span></>}</h1></Reveal>
        {text && <Reveal delay={140}><p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{text}</p></Reveal>}
        {children && <Reveal delay={220}><div className="mt-9">{children}</div></Reveal>}
      </Container>
    </section>
  );
}

// A glass panel near the bottom of pages inviting visitors to get in touch.
export function CallToAction() {
  return (
    <section data-tone="#dde7ff" data-glow="1.2" className="py-24">
      <Container>
        <Reveal>
          <Glass className="flex flex-col items-start justify-between gap-8 p-8 sm:p-12 md:flex-row md:items-center">
            <div>
              <h2 className="max-w-xl text-balance text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">Let us talk about <span className="shine-text">your needs.</span></h2>
              <p className="mt-3 max-w-md text-muted">Tell us what you are working on and we will suggest the right next step.</p>
            </div>
            <ArrowButton href="/contact">Contact us</ArrowButton>
          </Glass>
        </Reveal>
      </Container>
    </section>
  );
}

// A friendly message shown where content has not been added yet.
export function EmptyNote({ children }) {
  return <Glass className="border-dashed p-8 text-center text-muted">{children}</Glass>;
}
