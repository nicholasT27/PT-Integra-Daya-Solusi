import Link from "next/link";

// A small label with a dot, such as "What we offer." placed above a section.
export function DetailTab({ children, className = "" }) {
  return (
    <p className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] ${className}`}>
      <span className="h-2 w-2 rounded-full bg-current" /> {children}
    </p>
  );
}

// A pill button with an arrow that slides across when you hover over it.
export function ArrowButton({ href, children, tone = "blue" }) {
  const styles = {
    blue: "bg-navy-600 text-white hover:bg-navy-700",
    white: "bg-white text-navy-900 hover:bg-ice-100",
    outline: "border border-current",
  }[tone];
  return (
    <Link href={href} className={`group inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 text-sm font-semibold transition-colors ${styles}`}>
      {children}
      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white/20">
        {[0, 1].map((n) => (
          <svg
            key={n}
            viewBox="0 0 17 10"
            className={`absolute h-2.5 w-4 transition-transform duration-300 ${n === 0 ? "group-hover:translate-x-6" : "-translate-x-6 group-hover:translate-x-0"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M1 5h14M11 1l4 4-4 4" />
          </svg>
        ))}
      </span>
    </Link>
  );
}
