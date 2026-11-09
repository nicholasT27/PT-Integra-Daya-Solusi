// Five small vector illustrations, one for each word in the hero headline (insurance, retirement, legal, tax,
// engineering). They are drawn in the brand blues, so they stay sharp at any size.
const B = "#003af2", N = "#002070", S = "#a9bfff", I = "#e5ecff", W = "#ffffff";

// Insurance: a shield with a tick, under an umbrella, over a small building.
function Insurance() {
  return (
    <g>
      <path d="M40 150 a110 110 0 0 1 220 0 z" fill={B} />
      <path d="M40 150 q27 -22 55 0 q27 -22 55 0 q27 -22 55 0 q27 -22 55 0" fill={N} opacity="0.35" />
      <rect x="148" y="150" width="4" height="70" rx="2" fill={N} />
      <path d="M150 220 q0 14 -14 14" stroke={N} strokeWidth="4" fill="none" strokeLinecap="round" />
      <rect x="70" y="238" width="160" height="62" rx="8" fill={I} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={86 + i * 38} y="252" width="22" height="22" rx="4" fill={S} />)}
      <g className="ill-rise">
        <path d="M150 42 l54 20 v38 c0 34 -22 56 -54 70 c-32 -14 -54 -36 -54 -70 v-38 z" fill={W} stroke={N} strokeWidth="5" strokeLinejoin="round" />
        <path d="M124 104 l20 20 l34 -40" fill="none" stroke={B} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}

// Retirement: a clock face with a hand sweeping round, and a small tree growing from coins.
function Retirement() {
  return (
    <g>
      <circle cx="150" cy="120" r="84" fill={W} stroke={N} strokeWidth="6" />
      <circle cx="150" cy="120" r="70" fill={I} />
      {Array.from({ length: 12 }).map((_, i) => <rect key={i} x="148" y="54" width="4" height={i % 3 === 0 ? 14 : 8} rx="2" fill={N} transform={`rotate(${i * 30} 150 120)`} />)}
      <path d="M150 120 L150 82" stroke={N} strokeWidth="7" strokeLinecap="round" />
      <g className="ill-spin"><path d="M150 120 L150 66" stroke={B} strokeWidth="5" strokeLinecap="round" /></g>
      <circle cx="150" cy="120" r="8" fill={B} />
      <ellipse cx="150" cy="290" rx="92" ry="12" fill={S} opacity="0.5" />
      {[0, 1, 2].map((i) => <g key={i}><ellipse cx={104 + i * 46} cy="278" rx="26" ry="9" fill={N} /><rect x={78 + i * 46} y="262" width="52" height="16" fill={B} /><ellipse cx={104 + i * 46} cy="262" rx="26" ry="9" fill={S} /></g>)}
      <g className="ill-rise"><path d="M150 258 v-34" stroke={N} strokeWidth="5" strokeLinecap="round" /><path d="M150 236 q-30 -4 -34 -30 q28 -2 34 30 z" fill={B} /><path d="M150 226 q28 -6 30 -32 q-26 4 -30 32 z" fill={S} /></g>
    </g>
  );
}

// Legal: scales of justice that gently tip, standing on a base, with a document beside them.
function Legal() {
  return (
    <g>
      <rect x="196" y="150" width="76" height="104" rx="8" fill={W} stroke={N} strokeWidth="5" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x="210" y={168 + i * 20} width={i === 3 ? 26 : 48} height="7" rx="3.5" fill={i === 0 ? B : S} />)}
      <circle cx="248" cy="238" r="9" fill={B} />
      <rect x="143" y="70" width="14" height="200" rx="7" fill={N} />
      <rect x="96" y="268" width="108" height="16" rx="8" fill={N} />
      <circle cx="150" cy="62" r="14" fill={B} />
      <g className="ill-tilt" style={{ transformOrigin: "150px 82px" }}>
        <rect x="52" y="78" width="196" height="9" rx="4.5" fill={B} />
        {[62, 238].map((x) => (
          <g key={x}>
            <path d={`M${x} 87 L${x - 28} 150 M${x} 87 L${x + 28} 150`} stroke={N} strokeWidth="3" />
            <path d={`M${x - 36} 150 h72 a36 22 0 0 1 -72 0 z`} fill={x < 150 ? S : I} stroke={N} strokeWidth="4" strokeLinejoin="round" />
          </g>
        ))}
      </g>
    </g>
  );
}

// Tax: a calculator with a percent sign on its screen, and a coin and a document leaning against it.
function Tax() {
  return (
    <g>
      <rect x="196" y="70" width="80" height="110" rx="8" fill={W} stroke={N} strokeWidth="5" transform="rotate(8 236 125)" />
      <path d="M212 96 h46 M212 116 h46 M212 136 h30" stroke={S} strokeWidth="6" strokeLinecap="round" transform="rotate(8 236 125)" />
      <rect x="62" y="64" width="150" height="214" rx="20" fill={N} />
      <rect x="80" y="82" width="114" height="52" rx="10" fill={I} />
      <text x="187" y="120" textAnchor="end" fontSize="34" fontWeight="800" fill={N} fontFamily="system-ui, sans-serif">25%</text>
      {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={82 + (i % 3) * 38} y={150 + Math.floor(i / 3) * 31} width="30" height="23" rx="7" fill={i === 11 ? B : i % 3 === 2 ? S : "#2f5ff5"} />)}
      <g className="ill-spin-rev"><circle cx="232" cy="236" r="30" fill={B} stroke={W} strokeWidth="5" /><text x="232" y="248" textAnchor="middle" fontSize="32" fontWeight="800" fill={W} fontFamily="system-ui, sans-serif">%</text></g>
    </g>
  );
}

// Engineering: a factory with a chimney, and two interlocking gears that keep turning.
function Engineering() {
  const gear = (cx, cy, r, teeth, fill, cls) => (
    <g className={cls}>
      {Array.from({ length: teeth }).map((_, i) => <rect key={i} x={cx - 7} y={cy - r - 9} width="14" height="20" rx="3" fill={fill} transform={`rotate(${(360 / teeth) * i} ${cx} ${cy})`} />)}
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <circle cx={cx} cy={cy} r={r * 0.4} fill={W} />
    </g>
  );
  return (
    <g>
      <rect x="40" y="188" width="220" height="104" rx="8" fill={I} />
      <path d="M40 188 l36 -34 v34 l36 -34 v34 l36 -34 v34 l36 -34 v34 h40 v0 z" fill={S} />
      <rect x="196" y="100" width="30" height="88" fill={N} />
      <circle className="ill-rise" cx="212" cy="86" r="14" fill={S} opacity="0.7" />
      <circle className="ill-rise" cx="226" cy="62" r="10" fill={S} opacity="0.45" />
      {[0, 1, 2].map((i) => <rect key={i} x={58 + i * 44} y="236" width="30" height="56" rx="4" fill={N} opacity="0.85" />)}
      {gear(96, 112, 34, 10, B, "ill-spin")}
      {gear(150, 142, 22, 8, N, "ill-spin-rev")}
    </g>
  );
}

const scenes = [Insurance, Retirement, Legal, Tax, Engineering];
const captions = ["Protecting what you have built", "Planning for the long term", "Staying on the right side of the rules", "Clear books and smart planning", "Safer, smoother operations"];

// The picture beside the headline. Each illustration fades in as its word comes round, with a short caption underneath.
export default function HeroVisual({ active = 0 }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      <span className="orbit-slow absolute inset-[2%] rounded-full border border-dashed border-navy-600/25" />
      <span className="drift absolute inset-[10%] rounded-full bg-sky-300/50 blur-3xl" />
      <div className="absolute inset-[8%] rounded-[2.5rem] border border-white bg-white/70 shadow-2xl backdrop-blur-xl">
        {scenes.map((Scene, i) => (
          <svg key={i} viewBox="0 0 300 310" role="img" aria-label={captions[i]} aria-hidden={active !== i} className="absolute inset-0 h-full w-full p-[9%] transition-all duration-700" style={{ opacity: active === i ? 1 : 0, transform: active === i ? "scale(1)" : "scale(0.92)" }}>
            <Scene />
          </svg>
        ))}
      </div>
      <p className="absolute inset-x-0 bottom-[-0.5rem] mx-auto w-fit max-w-[90%] rounded-full bg-navy-900 px-5 py-2 text-center text-xs font-semibold text-white shadow-xl transition-all duration-500" key={active}>{captions[active]}</p>
    </div>
  );
}
