import Link from "next/link";

// A small label with a dot, such as "What we offer." placed above a section.
export function DetailTab({ children, className = "" }) {
  return (
    <p className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] ${className}`}>
      <span className="h-2 w-2 rounded-full bg-current" /> {children}
    </p>
  );
}

// One plain arrow icon, used inside every button. It never moves or changes. "flip" points it left.
export function Arrow({ className = "h-3.5 w-3.5", flip = false }) {
  return (
    <svg viewBox="0 0 17 10" className={`${className} ${flip ? "-scale-x-100" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 5h14M11 1l4 4-4 4" />
    </svg>
  );
}

// The round arrow badge of a pill button. On hover the arrow slides out to the right while a new one slides in from the
// left. The waiting arrow is parked a full badge-width away, so none of it can show before the hover. The button must be a "group".
export function SlideArrow() {
  return (
    <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white/20">
      <Arrow className="absolute h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-9" />
      <Arrow className="absolute h-3.5 w-3.5 -translate-x-9 transition-transform duration-300 group-hover:translate-x-0" />
    </span>
  );
}

// A pill button with an arrow in a round badge that slides on hover.
export function ArrowButton({ href, children, tone = "blue" }) {
  const styles = {
    blue: "bg-navy-600 text-white hover:bg-navy-700",
    white: "bg-white text-navy-900 hover:bg-ice-100",
    outline: "border border-current",
  }[tone];
  return (
    <Link href={href} className={`group inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 text-sm font-semibold transition-colors ${styles}`}>
      {children}
      <SlideArrow />
    </Link>
  );
}
