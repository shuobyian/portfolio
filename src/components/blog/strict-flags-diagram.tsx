export function StrictFlagsDiagram() {
  const support = [
    { x: 40, y: 212, label: "strictFunctionTypes" },
    { x: 266, y: 212, label: "strictPropertyInitialization" },
    { x: 492, y: 212, label: "strictBindCallApply" },
    { x: 40, y: 264, label: "noImplicitThis" },
    { x: 266, y: 264, label: "useUnknownInCatchVariables" },
    { x: 492, y: 264, label: "alwaysStrict" },
  ];

  return (
    <svg
      viewBox="0 0 760 318"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="strict: true 하나가 하위 플래그들을 한꺼번에 켠다. 핵심 두 축은 strictNullChecks와 noImplicitAny이고, 나머지 6개는 함수·클래스·this·catch의 빈틈을 보완하는 보조 플래그다."
    >
      <defs>
        <marker
          id="strict-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6.5"
          markerHeight="6.5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>

      {/* strict: true */}
      <g className="text-accent">
        <rect x="296" y="18" width="168" height="46" rx="10" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2" />
      </g>
      <text x="380" y="47" textAnchor="middle" className="fill-foreground" fontSize="15" fontFamily="monospace" fontWeight="700">
        strict: true
      </text>

      <g className="text-accent">
        <line x1="380" y1="64" x2="380" y2="92" stroke="currentColor" strokeWidth="2" markerEnd="url(#strict-arrow)" />
      </g>

      {/* 핵심 라벨 */}
      <text x="380" y="108" textAnchor="middle" className="fill-accent" fontSize="12" fontWeight="700">
        핵심 — 타입 안전의 두 축
      </text>

      {/* 핵심 칩 2개 */}
      {[
        { x: 90, label: "strictNullChecks", sub: "null/undefined 안전" },
        { x: 410, label: "noImplicitAny", sub: "암묵적 any 차단" },
      ].map((c) => (
        <g key={c.label} className="text-accent">
          <rect x={c.x} y="118" width="260" height="50" rx="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.8" />
          <text x={c.x + 130} y="140" textAnchor="middle" className="fill-foreground" fontSize="13" fontFamily="monospace" fontWeight="700">
            {c.label}
          </text>
          <text x={c.x + 130} y="157" textAnchor="middle" className="fill-muted-foreground" fontSize="10.5">
            {c.sub}
          </text>
        </g>
      ))}

      {/* 보조 라벨 */}
      <text x="380" y="198" textAnchor="middle" className="fill-muted-foreground" fontSize="12" fontWeight="700">
        보조 — 함수 · 클래스 · this · catch 빈틈 보완
      </text>

      {/* 보조 칩 6개 */}
      {support.map((c) => (
        <g key={c.label} className="text-muted-foreground">
          <rect x={c.x} y={c.y} width="222" height="40" rx="9" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.3" />
          <text x={c.x + 111} y={c.y + 25} textAnchor="middle" className="fill-foreground" fontSize="11" fontFamily="monospace">
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
