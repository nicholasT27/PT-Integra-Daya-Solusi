import { Arrow } from "./Bits";

// The pill button used in forms, in the same style as the other arrow buttons on the site.
// "type" is "submit" to send the form, or "button" for steps such as Continue.
export function ArrowButtonSubmit({ children, type = "submit", onClick }) {
  return (
    <button type={type} onClick={onClick} className="group inline-flex items-center gap-3 rounded-full bg-navy-600 py-2 pl-6 pr-2 text-sm font-semibold text-white transition-colors hover:bg-navy-700">
      {children}
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1"><Arrow /></span>
    </button>
  );
}
