// The pill button used to submit forms, in the same style as the other arrow buttons on the site.
export function ArrowButtonSubmit({ children }) {
  return (
    <button type="submit" className="group inline-flex items-center gap-3 rounded-full bg-navy-600 py-2 pl-6 pr-2 text-sm font-semibold text-white transition-colors hover:bg-navy-700">
      {children}
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">→</span>
    </button>
  );
}
