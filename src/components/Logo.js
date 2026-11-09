import Image from "next/image";

// Shows the official IDS logo mark with the company name. Use light on dark backgrounds.
export default function Logo({ light = false, stacked = false }) {
  return (
    <span className={`flex items-center ${stacked ? "flex-col gap-3" : "gap-3"}`}>
      <Image
        src={light ? "/brand/ids-mark-white.svg" : "/brand/ids-mark-blue.svg"}
        alt=""
        width={stacked ? 120 : 56}
        height={stacked ? 41 : 19}
        priority
      />
      <span
        className={`text-[11px] font-medium uppercase tracking-[0.22em] ${light ? "text-white" : "text-ink"} ${
          stacked ? "" : "hidden sm:block"
        }`}
      >
        PT Integra Daya Solusi
      </span>
    </span>
  );
}
