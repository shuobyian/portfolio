export function CoreWebVitalsDiagram() {
  const cards = [
    {
      x: 24,
      name: "LCP",
      full: "Largest Contentful Paint",
      desc1: "로딩 속도",
      desc2: "최대 콘텐츠 표시 시간",
      goodText: "Good ≤ 2.5s",
      poorText: "Poor > 4.0s",
    },
    {
      x: 270,
      name: "INP",
      full: "Interaction to Next Paint",
      desc1: "상호작용 반응성",
      desc2: "입력 → 다음 페인트",
      goodText: "Good ≤ 200ms",
      poorText: "Poor > 500ms",
    },
    {
      x: 516,
      name: "CLS",
      full: "Cumulative Layout Shift",
      desc1: "시각 안정성",
      desc2: "레이아웃 이동 누적",
      goodText: "Good ≤ 0.1",
      poorText: "Poor > 0.25",
    },
  ];

  return (
    <svg
      viewBox="0 0 760 250"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="Core Web Vitals 3대 지표 — LCP(로딩, Good ≤ 2.5초), INP(상호작용 반응성, Good ≤ 200ms), CLS(시각 안정성, Good ≤ 0.1). 각 지표는 Good·개선필요·Poor 구간으로 평가된다."
    >
      <text x="380" y="24" textAnchor="middle" className="fill-muted-foreground" fontSize="12">
        Core Web Vitals — 실사용자 경험을 재는 3대 지표
      </text>

      {cards.map((c) => (
        <g key={c.name}>
          <g className="text-accent">
            <rect x={c.x} y="40" width="220" height="196" rx="12" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="1.6" />
          </g>
          <text x={c.x + 22} y="80" className="fill-foreground" fontSize="22" fontWeight="800">
            {c.name}
          </text>
          <text x={c.x + 22} y="98" className="fill-muted-foreground" fontSize="9.5">
            {c.full}
          </text>

          <text x={c.x + 22} y="130" className="fill-foreground" fontSize="13" fontWeight="700">
            {c.desc1}
          </text>
          <text x={c.x + 22} y="148" className="fill-muted-foreground" fontSize="11">
            {c.desc2}
          </text>

          {/* 임계값 막대 */}
          <rect x={c.x + 22} y="168" width="88" height="12" rx="3" fill="#22c55e" fillOpacity="0.8" />
          <rect x={c.x + 110} y="168" width="44" height="12" rx="3" fill="#eab308" fillOpacity="0.8" />
          <rect x={c.x + 154} y="168" width="44" height="12" rx="3" fill="#ef4444" fillOpacity="0.8" />

          <text x={c.x + 22} y="202" className="fill-foreground" fontSize="11" fontWeight="700">
            {c.goodText}
          </text>
          <text x={c.x + 22} y="220" className="fill-muted-foreground" fontSize="10.5">
            {c.poorText}
          </text>
        </g>
      ))}
    </svg>
  );
}
