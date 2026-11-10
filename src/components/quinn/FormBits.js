import { SlideArrow } from "./Bits";

// The pill button used in forms. It looks and moves exactly like the site's other pill buttons: blue, with the
// arrow in a round badge that slides on hover. "type" is "submit" to send the form, or "button" for steps such as Continue.
export function ArrowButtonSubmit({ children, type = "submit", onClick }) {
  return (
    <button type={type} onClick={onClick} className="group inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full bg-navy-600 py-2 pl-6 pr-2 text-sm font-semibold text-white transition-colors hover:bg-navy-700">
      {children}
      <SlideArrow />
    </button>
  );
}
