export function ConcurrentPriorityDiagram() {
  const keystrokes = [170, 290, 410, 530];

  const blocks = [
    { x: 170, w: 110, done: false },
    { x: 290, w: 110, done: false },
    { x: 410, w: 110, done: false },
    { x: 530, w: 150, done: true },
  ];

  return (
    <svg
      viewBox="0 0 760 300"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="Concurrent 렌더링 타임라인 — 키 입력마다 '입력 반영(급함)'은 즉시 처리되고, '목록 렌더(낮은 우선순위)'는 다음 키가 오면 중단·재시작되며, 타이핑이 멈춘 뒤에야 한 번 완료된다."
    >
      <text x="380" y="24" textAnchor="middle" className="fill-muted-foreground" fontSize="12">
        타이핑 중 — 급한 입력은 즉시, 무거운 렌더는 미루고 중단 가능
      </text>

      {/* 키 입력 가이드 */}
      {keystrokes.map((x) => (
        <g key={x} className="text-muted-foreground">
          <text x={x} y="44" textAnchor="middle" fontSize="14">
            ⌨
          </text>
          <line x1={x} y1="50" x2={x} y2="238" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 4" />
        </g>
      ))}
      <text x="600" y="44" className="fill-muted-foreground" fontSize="11" fontWeight="600">
        타이핑 멈춤
      </text>

      {/* Lane 1 — 입력 반영 (급함) */}
      <text x="20" y="92" className="fill-foreground" fontSize="11.5" fontWeight="700">
        입력 반영
      </text>
      <text x="20" y="107" className="fill-muted-foreground" fontSize="10.5">
        (급함)
      </text>
      {keystrokes.map((x) => (
        <g key={x} className="text-accent">
          <rect x={x - 8} y="86" width="16" height="24" rx="4" fill="currentColor" fillOpacity="0.85" />
        </g>
      ))}
      <text x="170" y="74" textAnchor="middle" className="fill-accent" fontSize="10" fontWeight="700">
        즉시
      </text>

      {/* 구분선 */}
      <line x1="150" y1="130" x2="700" y2="130" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />

      {/* Lane 2 — 목록 렌더 (낮은 우선순위) */}
      <text x="20" y="182" className="fill-foreground" fontSize="11.5" fontWeight="700">
        목록 렌더
      </text>
      <text x="20" y="197" className="fill-muted-foreground" fontSize="10.5">
        (낮은 우선순위)
      </text>
      {blocks.map((b) => (
        <g key={b.x} className="text-accent">
          <rect
            x={b.x}
            y="162"
            width={b.w}
            height="40"
            rx="8"
            fill="currentColor"
            fillOpacity={b.done ? 0.12 : 0.05}
            stroke="currentColor"
            strokeOpacity={b.done ? 1 : 0.45}
            strokeWidth={b.done ? 1.8 : 1.3}
            strokeDasharray={b.done ? undefined : "5 4"}
          />
          <text
            x={b.x + b.w / 2}
            y="187"
            textAnchor="middle"
            className={b.done ? "fill-foreground" : "fill-muted-foreground"}
            fontSize="10.5"
            fontWeight={b.done ? 700 : 600}
          >
            {b.done ? "완료" : "중단"}
          </text>
        </g>
      ))}

      {/* 하단 메모 */}
      <g className="text-accent">
        <rect x="20" y="248" width="720" height="40" rx="8" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
      </g>
      <text x="380" y="265" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        입력은 매 키마다 즉시 반영 · 무거운 목록 렌더는 다음 키가 오면 버려지고 재시작
      </text>
      <text x="380" y="281" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        → 타이핑이 멈춘 뒤에야 한 번만 완성된다 (작업이 빨라지는 게 아니라 반응성을 지킴)
      </text>
    </svg>
  );
}
