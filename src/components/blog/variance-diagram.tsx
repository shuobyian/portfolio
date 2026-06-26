export function VarianceDiagram() {
  const rows = [
    {
      y: 78,
      label: "기준 관계",
      left: "Dog",
      right: "Animal",
      note: "Dog <: Animal",
      flip: false,
    },
    {
      y: 188,
      label: "공변 (반환)",
      left: "() => Dog",
      right: "() => Animal",
      note: "방향 유지 ✅",
      flip: false,
    },
    {
      y: 298,
      label: "반공변 (매개변수)",
      left: "(Animal) => void",
      right: "(Dog) => void",
      note: "방향 반전 🔄",
      flip: true,
    },
  ];

  const BOX_H = 54;

  return (
    <svg
      viewBox="0 0 760 404"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="공변과 반공변 — 화살표는 '왼쪽이 오른쪽의 하위 타입'을 뜻한다. 반환 타입은 Dog 쪽이 하위로 방향이 유지(공변)되고, 함수 매개변수는 Animal 쪽이 하위가 되어 방향이 반전(반공변)된다."
    >
      <defs>
        <marker
          id="var-arrow"
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

      <text x="380" y="30" textAnchor="middle" className="fill-muted-foreground" fontSize="11.5">
        화살표 A ▶ B = &quot;A는 B의 하위 타입 (A &lt;: B)&quot;
      </text>

      {rows.map((r) => (
        <g key={r.label}>
          {/* 행 라벨 */}
          <text
            x="28"
            y={r.y + BOX_H / 2 + 4}
            className={r.flip ? "fill-accent" : "fill-foreground"}
            fontSize="12.5"
            fontWeight="700"
          >
            {r.label}
          </text>

          {/* 왼쪽 박스 */}
          <g className={r.flip ? "text-accent" : "text-muted-foreground"}>
            <rect
              x="180"
              y={r.y}
              width="214"
              height={BOX_H}
              rx="10"
              fill="currentColor"
              fillOpacity={r.flip ? 0.1 : 0.06}
              stroke="currentColor"
              strokeOpacity={r.flip ? 1 : 0.5}
              strokeWidth={r.flip ? 1.8 : 1.4}
            />
          </g>
          <text
            x="287"
            y={r.y + BOX_H / 2 + 5}
            textAnchor="middle"
            className="fill-foreground"
            fontSize="13"
            fontFamily="monospace"
            fontWeight="700"
          >
            {r.left}
          </text>

          {/* 화살표 (항상 왼→오, 의미: 왼쪽이 하위 타입) */}
          <g className="text-accent">
            <line
              x1="402"
              y1={r.y + BOX_H / 2}
              x2="448"
              y2={r.y + BOX_H / 2}
              stroke="currentColor"
              strokeWidth="2.4"
              markerEnd="url(#var-arrow)"
            />
          </g>

          {/* 오른쪽 박스 */}
          <g className="text-muted-foreground">
            <rect
              x="456"
              y={r.y}
              width="220"
              height={BOX_H}
              rx="10"
              fill="currentColor"
              fillOpacity="0.05"
              stroke="currentColor"
              strokeOpacity="0.5"
              strokeWidth="1.4"
            />
          </g>
          <text
            x="566"
            y={r.y + BOX_H / 2 + 5}
            textAnchor="middle"
            className="fill-foreground"
            fontSize="13"
            fontFamily="monospace"
            fontWeight="700"
          >
            {r.right}
          </text>

          {/* 행 노트 */}
          <text
            x="691"
            y={r.y + BOX_H / 2 + 4}
            className="fill-muted-foreground"
            fontSize="10.5"
            fontWeight="600"
          >
            {r.note}
          </text>
        </g>
      ))}

      {/* 하단 핵심 */}
      <g className="text-accent">
        <rect x="28" y="364" width="704" height="30" rx="8" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
      </g>
      <text x="380" y="384" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        출력(반환)은 공변 — Dog가 하위 그대로 · 입력(매개변수)은 반공변 — Animal이 하위로 뒤집힘
      </text>
    </svg>
  );
}
