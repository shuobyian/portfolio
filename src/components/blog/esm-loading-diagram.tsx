export function EsmLoadingDiagram() {
  return (
    <svg
      viewBox="0 0 800 372"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="ESM은 파싱으로 모든 import를 먼저 발견한 뒤 의존성을 병렬·비동기로 다운로드하고 마지막에 실행한다. CommonJS는 실행 중 require를 만날 때마다 멈추고 그 자리에서 동기로 모듈을 로드한다."
    >
      <defs>
        <marker
          id="esm-arrow"
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

      {/* ───────── ESM ───────── */}
      <text x="36" y="28" className="fill-foreground" fontSize="13.5" fontWeight="700">
        ESM (정적) — 파싱으로 그래프를 먼저 파악 → 병렬·비동기 로드
      </text>

      {/* ① 파싱 */}
      <g className="text-accent">
        <rect x="36" y="44" width="210" height="78" rx="10" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.8" />
      </g>
      <text x="141" y="74" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">
        ① 파싱
      </text>
      <text x="141" y="96" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        import 전부 발견
      </text>
      <text x="141" y="112" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        (실행하지 않음)
      </text>

      <g className="text-accent">
        <line x1="246" y1="83" x2="290" y2="83" stroke="currentColor" strokeWidth="2.2" markerEnd="url(#esm-arrow)" />
      </g>

      {/* ② 병렬 비동기 다운로드 */}
      <g className="text-accent">
        <rect x="292" y="44" width="250" height="78" rx="10" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.8" />
      </g>
      <text x="417" y="68" textAnchor="middle" className="fill-foreground" fontSize="12.5" fontWeight="700">
        ② 병렬·비동기 다운로드
      </text>
      {[84, 98, 112].map((y) => (
        <g key={y} className="text-accent">
          <rect x="312" y={y - 6} width="210" height="9" rx="4.5" fill="currentColor" fillOpacity="0.45" />
        </g>
      ))}

      <g className="text-accent">
        <line x1="542" y1="83" x2="586" y2="83" stroke="currentColor" strokeWidth="2.2" markerEnd="url(#esm-arrow)" />
      </g>

      {/* ③ 평가 */}
      <g className="text-accent">
        <rect x="588" y="44" width="176" height="78" rx="10" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.8" />
      </g>
      <text x="676" y="80" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">
        ③ 평가(실행)
      </text>
      <text x="676" y="100" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        준비 완료 후 실행
      </text>

      {/* 구분선 */}
      <line x1="36" y1="158" x2="764" y2="158" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />

      {/* ───────── CommonJS ───────── */}
      <text x="36" y="194" className="fill-foreground" fontSize="13.5" fontWeight="700">
        CommonJS (동적) — 실행 중 require를 만날 때마다 멈추고 동기 로드
      </text>

      {/* 타임라인 */}
      {[
        { x: 36, w: 130, label: "실행", run: true },
        { x: 166, w: 152, label: "require(a)", sub: "동기 로드 · 멈춤", run: false },
        { x: 318, w: 108, label: "실행", run: true },
        { x: 426, w: 152, label: "require(b)", sub: "동기 로드 · 멈춤", run: false },
        { x: 578, w: 186, label: "실행", run: true },
      ].map((seg) => (
        <g
          key={seg.x}
          className={seg.run ? "text-accent" : "text-muted-foreground"}
        >
          <rect
            x={seg.x}
            y="214"
            width={seg.w}
            height="64"
            rx="8"
            fill="currentColor"
            fillOpacity={seg.run ? 0.1 : 0.06}
            stroke="currentColor"
            strokeOpacity={seg.run ? 1 : 0.5}
            strokeWidth={seg.run ? 1.8 : 1.4}
            strokeDasharray={seg.run ? undefined : "5 4"}
          />
          <text
            x={seg.x + seg.w / 2}
            y={seg.sub ? 242 : 250}
            textAnchor="middle"
            className="fill-foreground"
            fontSize="12"
            fontFamily={seg.run ? undefined : "monospace"}
            fontWeight="700"
          >
            {seg.label}
          </text>
          {seg.sub && (
            <text
              x={seg.x + seg.w / 2}
              y="260"
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize="10"
            >
              {seg.sub}
            </text>
          )}
        </g>
      ))}
      <text x="400" y="296" textAnchor="middle" className="fill-muted-foreground" fontSize="10.5">
        ← 실행 타임라인 (멈춤 구간만큼 블로킹) →
      </text>

      {/* 하단 핵심 */}
      <g className="text-accent">
        <rect x="36" y="316" width="728" height="42" rx="8" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
      </g>
      <text x="400" y="333" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        정적 import → 의존성을 미리 알 수 있음 → 병렬·비동기 가능
      </text>
      <text x="400" y="349" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        동적 require → 실행 중 발견 → 그 자리서 동기 로드(블로킹)
      </text>
    </svg>
  );
}
