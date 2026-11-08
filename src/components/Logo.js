// Shows the company logo mark and name. Replace the mark with the official logo file when available.
export default function Logo({ light = false }) {
  const main = light ? "text-white" : "text-navy-900";
  const sub = light ? "text-sky-300" : "text-navy-600";
  return (
    <span className="flex items-center gap-3">
      <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0" aria-hidden="true">
        <rect width="40" height="40" rx="9" fill={light ? "#ffffff" : "#0a2550"} />
        <rect x="9" y="22" width="5" height="9" rx="1" fill={light ? "#0a2550" : "#9cc0f5"} />
        <rect x="17.5" y="15" width="5" height="16" rx="1" fill={light ? "#1d52b8" : "#5b8fe8"} />
        <rect x="26" y="8" width="5" height="23" rx="1" fill={light ? "#2f6fe0" : "#ffffff"} />
      </svg>
      <span className="leading-tight">
        <span className={`block font-serif text-lg font-semibold ${main}`}>
          <span className="text-sm font-normal">PT</span> Integra Daya Solusi
        </span>
        <span className={`block text-[10px] font-medium uppercase tracking-[0.14em] ${sub}`}>
          Insurance · Risk · Engineering
        </span>
      </span>
    </span>
  );
}
