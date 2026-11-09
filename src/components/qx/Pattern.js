import Image from "next/image";

// Fills its parent with the repeating, mirrored IDS logo pattern from the brand guide.
export default function Pattern({ opacity = 0.18 }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex -translate-x-10 flex-col overflow-hidden" style={{ opacity }} aria-hidden="true">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((r) => (
        <div key={r} className="flex shrink-0 gap-2 py-1" style={{ marginLeft: r % 2 ? "-120px" : 0 }}>
          {[0, 1, 2, 3, 4, 5, 6].map((c) => (
            <Image key={c} src="/brand/ids-mark-white.svg" alt="" width={260} height={88} className={`w-[260px] shrink-0 ${c % 2 ? "-scale-x-100" : ""}`} />
          ))}
        </div>
      ))}
    </div>
  );
}
