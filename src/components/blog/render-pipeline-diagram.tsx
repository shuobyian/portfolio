export function RenderPipelineDiagram() {
  return (
    <svg
      viewBox="0 0 760 330"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="브라우저 렌더링 파이프라인 — 네트워크로 받은 HTML과 CSS가 각각 DOM·CSSOM이 되고, 합쳐 Render Tree를 만든 뒤 Layout(reflow) → Paint(repaint) → Composite 순으로 화면을 그린다. Layout이 가장 비싸고 Composite가 가장 싸며, transform·opacity는 Layout·Paint를 건너뛰고 Composite만 거친다."
    >
      <defs>
        <marker
          id="rp-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>

      {/* 네트워크 breadcrumb */}
      <text x="380" y="26" textAnchor="middle" className="fill-muted-foreground" fontSize="11.5">
        URL → DNS → TCP·TLS → HTTP 요청 → HTML 수신
      </text>
      <g className="text-muted-foreground">
        <line x1="100" y1="36" x2="100" y2="74" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.4" markerEnd="url(#rp-arrow)" />
      </g>

      {/* DOM / CSSOM */}
      {[
        { y: 78, label: "DOM", sub: "HTML 파싱" },
        { y: 148, label: "CSSOM", sub: "CSS 파싱" },
      ].map((b) => (
        <g key={b.label} className="text-accent">
          <rect x="40" y={b.y} width="124" height="46" rx="10" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.6" />
          <text x="102" y={b.y + 22} textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700" fontFamily="monospace">
            {b.label}
          </text>
          <text x="102" y={b.y + 38} textAnchor="middle" className="fill-muted-foreground" fontSize="9.5">
            {b.sub}
          </text>
        </g>
      ))}

      {/* DOM·CSSOM → Render Tree */}
      <g className="text-accent">
        <line x1="164" y1="101" x2="216" y2="124" stroke="currentColor" strokeWidth="1.8" markerEnd="url(#rp-arrow)" />
        <line x1="164" y1="171" x2="216" y2="148" stroke="currentColor" strokeWidth="1.8" markerEnd="url(#rp-arrow)" />
      </g>

      {/* 파이프라인 박스 */}
      {[
        { x: 220, w: 120, label: "Render Tree", sub: "" },
        { x: 372, w: 104, label: "Layout", sub: "" },
        { x: 508, w: 96, label: "Paint", sub: "" },
        { x: 636, w: 112, label: "Composite", sub: "" },
      ].map((b) => (
        <g key={b.label} className="text-accent">
          <rect x={b.x} y="113" width={b.w} height="46" rx="10" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.6" />
          <text x={b.x + b.w / 2} y="141" textAnchor="middle" className="fill-foreground" fontSize="12.5" fontWeight="700">
            {b.label}
          </text>
        </g>
      ))}

      {/* 파이프라인 화살표 */}
      {[
        { x1: 340, x2: 368 },
        { x1: 476, x2: 504 },
        { x1: 604, x2: 632 },
      ].map((a) => (
        <g key={a.x1} className="text-accent">
          <line x1={a.x1} y1="136" x2={a.x2} y2="136" stroke="currentColor" strokeWidth="2" markerEnd="url(#rp-arrow)" />
        </g>
      ))}

      {/* 비용 주석 */}
      {[
        { x: 424, dot: "🔴", t: "reflow", sub: "비쌈" },
        { x: 556, dot: "🟡", t: "repaint", sub: "중간" },
        { x: 692, dot: "🟢", t: "합성", sub: "저렴" },
      ].map((c) => (
        <g key={c.t}>
          <text x={c.x} y="185" textAnchor="middle" fontSize="12">
            {c.dot}
          </text>
          <text x={c.x} y="203" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
            {c.t}
          </text>
          <text x={c.x} y="218" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
            {c.sub}
          </text>
        </g>
      ))}

      {/* 하단 규칙 */}
      <g className="text-accent">
        <rect x="40" y="246" width="708" height="66" rx="10" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
      </g>
      <text x="394" y="270" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        크기·위치 변경 → Layout(reflow)부터 다시  ·  색·배경만 변경 → Paint(repaint)부터
      </text>
      <text x="394" y="292" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
        transform · opacity → Layout·Paint를 건너뛰고 Composite만 (가장 저렴, GPU)
      </text>
    </svg>
  );
}
