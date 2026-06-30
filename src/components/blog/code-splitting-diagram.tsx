export function CodeSplittingDiagram() {
  return (
    <svg
      viewBox="0 0 760 250"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="코드 스플리팅 전후 비교 — Before는 단일 번들로 모든 코드를 초기에 로드하고, After는 작은 entry 청크만 초기 로드하고 라우트·무거운 라이브러리는 필요할 때 지연 로드해 초기 번들을 줄인다."
    >
      <text x="380" y="24" textAnchor="middle" className="fill-muted-foreground" fontSize="12">
        코드 스플리팅 — 초기 번들을 작게, 나머지는 필요할 때
      </text>

      {/* Before */}
      <text x="20" y="74" className="fill-foreground" fontSize="12" fontWeight="700">Before</text>
      <text x="20" y="89" className="fill-muted-foreground" fontSize="9.5">단일 번들</text>
      <g className="text-accent">
        <rect x="150" y="56" width="580" height="44" rx="8" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.6" />
      </g>
      <text x="440" y="83" textAnchor="middle" className="fill-foreground" fontSize="12.5" fontWeight="700">
        main.js — 모든 코드 초기 로드
      </text>

      {/* After */}
      <text x="20" y="160" className="fill-foreground" fontSize="12" fontWeight="700">After</text>
      <text x="20" y="175" className="fill-muted-foreground" fontSize="9.5">코드 스플리팅</text>

      {/* entry */}
      <g className="text-accent">
        <rect x="150" y="142" width="150" height="44" rx="8" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.6" />
      </g>
      <text x="225" y="169" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">
        entry.js
      </text>

      {/* lazy chunks */}
      {[
        { x: 312, label: "/route (lazy)" },
        { x: 454, label: "heavy-lib (lazy)" },
        { x: 596, label: "기타 (lazy)" },
      ].map((c) => (
        <g key={c.x} className="text-muted-foreground">
          <rect x={c.x} y="142" width="130" height="44" rx="8" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.3" strokeDasharray="5 4" />
          <text x={c.x + 65} y="168" textAnchor="middle" className="fill-foreground" fontSize="10.5">
            {c.label}
          </text>
        </g>
      ))}

      <text x="225" y="206" textAnchor="middle" className="fill-accent" fontSize="10.5" fontWeight="700">
        ↑ 초기 로드 (작음)
      </text>
      <text x="530" y="206" textAnchor="middle" className="fill-muted-foreground" fontSize="10.5">
        ↑ 필요할 때 on-demand 로드
      </text>

      {/* 하단 메모 */}
      <text x="380" y="236" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        초기 번들 = entry만 → 첫 로딩 빨라짐 (나머지는 라우트 진입·상호작용 시 로드)
      </text>
    </svg>
  );
}
