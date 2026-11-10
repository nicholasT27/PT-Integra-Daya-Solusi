import Image from "next/image";
import { products } from "@/lib/site";

// The picture for a product. It shows the product's photo, or, if it has none, a drawn illustration in the brand blues.
// "kind" is "factory", "transport" or "building".
const B = "#003af2", N = "#002070", S = "#a9bfff", I = "#e5ecff", W = "#ffffff";

function Factory() {
  return (
    <g>
      <rect x="0" y="262" width="400" height="38" fill={S} opacity="0.5" />
      <rect x="40" y="150" width="230" height="120" rx="6" fill={I} stroke={N} strokeWidth="4" />
      <path d="M40 150 l38 -36 v36 l38 -36 v36 l38 -36 v36 l38 -36 v36 l38 -36 v36" fill={S} stroke={N} strokeWidth="4" strokeLinejoin="round" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={62 + i * 52} y="186" width="34" height="26" rx="4" fill={B} opacity="0.85" />)}
      <rect x="120" y="224" width="46" height="46" rx="4" fill={N} />
      <rect x="296" y="70" width="34" height="200" fill={N} />
      <rect x="290" y="62" width="46" height="14" rx="3" fill={B} />
      <circle className="ill-rise" cx="314" cy="44" r="16" fill={S} opacity="0.75" />
      <circle className="ill-rise" cx="334" cy="18" r="11" fill={S} opacity="0.5" style={{ animationDelay: "-1.4s" }} />
      <g className="ill-spin" style={{ transformOrigin: "60px 78px" }}>
        {[0, 60, 120, 180, 240, 300].map((a) => <rect key={a} x="54" y="52" width="12" height="18" rx="3" fill={B} transform={`rotate(${a} 60 78)`} />)}
        <circle cx="60" cy="78" r="22" fill={B} /><circle cx="60" cy="78" r="9" fill={W} />
      </g>
    </g>
  );
}

function Transport() {
  return (
    <g>
      <rect x="0" y="252" width="400" height="48" fill={S} opacity="0.5" />
      <path d="M0 262 H400" stroke={N} strokeWidth="3" strokeDasharray="22 16" opacity="0.4" />
      <g className="ill-rise" style={{ transformOrigin: "200px 250px" }}>
        <rect x="40" y="110" width="200" height="130" rx="8" fill={W} stroke={N} strokeWidth="4" />
        <rect x="58" y="128" width="164" height="40" rx="6" fill={I} />
        <text x="140" y="156" textAnchor="middle" fontSize="26" fontWeight="800" fill={B} fontFamily="system-ui, sans-serif">IDS</text>
        <rect x="58" y="182" width="164" height="10" rx="5" fill={S} />
        <path d="M240 150 h56 l36 44 v46 h-92 z" fill={B} stroke={N} strokeWidth="4" strokeLinejoin="round" />
        <path d="M252 162 h40 l22 28 h-62 z" fill={I} />
      </g>
      {[96, 170, 300].map((x) => <g key={x}><circle cx={x} cy="246" r="24" fill={N} /><circle cx={x} cy="246" r="10" fill={S} /></g>)}
      <g className="ill-spin" style={{ transformOrigin: "340px 60px" }}><circle cx="340" cy="60" r="30" fill="none" stroke={B} strokeWidth="4" strokeDasharray="8 8" /></g>
      <path d="M326 60 l10 10 l20 -24" fill="none" stroke={B} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function Building() {
  return (
    <g>
      <rect x="0" y="266" width="400" height="34" fill={S} opacity="0.5" />
      <rect x="40" y="130" width="90" height="136" fill={I} stroke={N} strokeWidth="4" />
      <rect x="140" y="50" width="120" height="216" fill={W} stroke={N} strokeWidth="4" />
      <rect x="270" y="110" width="90" height="156" fill={I} stroke={N} strokeWidth="4" />
      {[0, 1, 2, 3, 4, 5].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={154 + c * 36} y={66 + r * 30} width="22" height="18" rx="3" fill={(r + c) % 3 === 0 ? B : S} />))}
      {[0, 1, 2, 3].map((r) => <rect key={`l${r}`} x="56" y={146 + r * 28} width="22" height="16" rx="3" fill={S} />)}
      {[0, 1, 2, 3].map((r) => <rect key={`r${r}`} x="290" y={126 + r * 32} width="22" height="16" rx="3" fill={S} />)}
      <rect x="182" y="226" width="36" height="40" rx="4" fill={N} />
      <g className="ill-tilt" style={{ transformOrigin: "320px 40px" }}>
        <path d="M320 20 l30 11 v22 c0 20 -13 31 -30 39 c-17 -8 -30 -19 -30 -39 v-22 z" fill={W} stroke={N} strokeWidth="4" strokeLinejoin="round" />
        <path d="M306 54 l10 10 l20 -22" fill="none" stroke={B} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}

const scenes = { factory: Factory, transport: Transport, building: Building };

export default function ProductArt({ kind, className = "", sizes = "560px" }) {
  const photo = products.find((p) => p.art === kind)?.photo;
  if (photo) {
    return (
      <span className={`relative block aspect-[4/3] overflow-hidden rounded-2xl ${className}`}>
        <Image src={photo.src} alt={photo.alt} fill unoptimized sizes={sizes} className="object-cover" />
      </span>
    );
  }
  const Scene = scenes[kind] ?? Factory;
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label={`Illustration: ${kind}`} className={className} preserveAspectRatio="xMidYMid meet">
      <Scene />
    </svg>
  );
}
