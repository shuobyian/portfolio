export function MappedTypeDiagram() {
  const rows = [
    { y: 132, from: "id: number", to: "id?: number" },
    { y: 178, from: "name: string", to: "name?: string" },
    { y: 224, from: "email: string", to: "email?: string" },
  ];

  return (
    <svg
      viewBox="0 0 760 320"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="매핑 타입 { [K in keyof T]?: T[K] } 이 원본 User의 각 속성을 순회하며 ?를 붙여 Partial<User>를 만드는 과정."
    >
      <defs>
        <marker
          id="mt-arrow"
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

      {/* 상단: 매핑 타입 식 */}
      <text x="380" y="28" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">
        type Partial&lt;T&gt; =
      </text>
      <text x="380" y="50" textAnchor="middle" className="fill-accent" fontSize="14" fontFamily="monospace" fontWeight="700">
        &#123; [K in keyof T]?: T[K] &#125;
      </text>
      <text x="380" y="70" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        T의 각 키 K를 순회하며 ?(선택적)를 붙인다
      </text>

      {/* 원본 박스 */}
      <g className="text-muted-foreground">
        <rect x="56" y="86" width="248" height="180" rx="12" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      </g>
      <text x="180" y="112" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">
        원본 — User
      </text>

      {/* 결과 박스 */}
      <g className="text-accent">
        <rect x="456" y="86" width="248" height="180" rx="12" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeWidth="1.8" />
      </g>
      <text x="580" y="112" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">
        결과 — Partial&lt;User&gt;
      </text>

      {rows.map((r) => (
        <g key={r.from}>
          {/* 원본 행 */}
          <text x="180" y={r.y} textAnchor="middle" className="fill-foreground" fontSize="13" fontFamily="monospace">
            {r.from}
          </text>
          {/* 화살표 */}
          <g className="text-accent">
            <line x1="306" y1={r.y - 4} x2="452" y2={r.y - 4} stroke="currentColor" strokeWidth="1.8" markerEnd="url(#mt-arrow)" />
          </g>
          <text x="379" y={r.y - 10} textAnchor="middle" className="fill-accent" fontSize="11" fontWeight="700">
            + ?
          </text>
          {/* 결과 행 */}
          <text x="580" y={r.y} textAnchor="middle" className="fill-foreground" fontSize="13" fontFamily="monospace" fontWeight="700">
            {r.to}
          </text>
        </g>
      ))}

      {/* 하단 메모 */}
      <g className="text-accent">
        <rect x="56" y="286" width="648" height="28" rx="8" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
      </g>
      <text x="380" y="305" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        Pick · Readonly · Required 등 대부분의 유틸리티 타입이 이 매핑 타입으로 만들어진다
      </text>
    </svg>
  );
}
