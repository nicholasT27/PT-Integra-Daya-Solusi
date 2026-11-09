import fs from "node:fs";
import path from "node:path";

// The IDS logo drawn as a thin outline that traces itself on screen, then fills in softly.
export default function LogoDraw({ className = "" }) {
  const svg = fs.readFileSync(path.join(process.cwd(), "public/brand/ids-mark-white.svg"), "utf8");
  const viewBox = svg.match(/viewBox="([^"]+)"/)[1];
  const paths = [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
  return (
    <svg viewBox={viewBox} className={`logo-draw ${className}`} fill="white" stroke="white" aria-hidden="true">
      {paths.map((d, i) => (
        <path key={i} d={d} pathLength="1" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      ))}
    </svg>
  );
}
