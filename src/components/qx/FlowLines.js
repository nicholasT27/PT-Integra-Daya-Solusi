// Soft curved lines with a bright stretch that keeps travelling along each one, without ever stopping.
const curves = [
  "M-50 620 C 250 480, 450 760, 760 600 S 1250 380, 1500 520",
  "M-50 440 C 220 300, 520 560, 820 420 S 1230 200, 1500 340",
  "M-50 260 C 300 160, 500 380, 800 250 S 1200 60, 1500 180",
  "M-50 760 C 300 700, 600 820, 900 720 S 1300 600, 1500 680",
  "M-50 120 C 250 40, 520 220, 760 120 S 1200 -40, 1500 60",
  "M-50 540 C 400 640, 600 400, 900 520 S 1250 700, 1500 560",
];

export default function FlowLines({ className = "", opacity = 1, color = "white" }) {
  return (
    <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} style={{ opacity }} fill="none" stroke={color} aria-hidden="true">
      {curves.map((d, i) => (
        <g key={i}>
          <path d={d} pathLength="1" strokeWidth="1.5" strokeOpacity="0.16" vectorEffect="non-scaling-stroke" />
          <path
            d={d}
            pathLength="1"
            className="flow-line"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.9"
            vectorEffect="non-scaling-stroke"
            style={{ "--d": `${9 + i * 2.5}s`, animationDelay: `-${i * 3.1}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
