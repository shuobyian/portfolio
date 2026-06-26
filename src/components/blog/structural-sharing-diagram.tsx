export function StructuralSharingDiagram() {
  // 노드: cx(중심 x), y(상단), 라벨, 부가설명, isNew(이번 업데이트로 새로 생성됐는지)
  const nodes = [
    { id: "state", cx: 380, y: 44, label: "state", sub: "새 객체", isNew: true },
    { id: "user", cx: 240, y: 150, label: "user", sub: "새 객체", isNew: true },
    { id: "settings", cx: 520, y: 150, label: "settings", sub: "재사용", isNew: false },
    { id: "name", cx: 150, y: 256, label: "name", sub: "재사용", isNew: false },
    { id: "address", cx: 350, y: 256, label: "address", sub: "새 객체", isNew: true },
    { id: "city", cx: 280, y: 360, label: "city", sub: '"서울"→"부산"', isNew: true },
    { id: "zip", cx: 420, y: 360, label: "zip", sub: "재사용", isNew: false },
  ];

  const W = 116;
  const H = 46;
  const center = (id: string) => {
    const n = nodes.find((x) => x.id === id)!;
    return { x: n.cx, top: n.y, bottom: n.y + H };
  };

  const edges = [
    { from: "state", to: "user", hot: true },
    { from: "state", to: "settings", hot: false },
    { from: "user", to: "name", hot: false },
    { from: "user", to: "address", hot: true },
    { from: "address", to: "city", hot: true },
    { from: "address", to: "zip", hot: false },
  ];

  return (
    <svg
      viewBox="0 0 760 466"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="구조적 공유 — state.user.address.city를 바꾸면 그 경로의 노드(state·user·address·city)만 새로 만들고, 변경되지 않은 settings·name·zip은 이전 객체를 그대로 참조해 공유한다."
    >
      {/* 범례 */}
      <g className="text-accent">
        <circle cx="486" cy="22" r="6" fill="currentColor" fillOpacity="0.85" />
      </g>
      <text x="498" y="26" className="fill-muted-foreground" fontSize="11.5">
        새로 생성 (바뀐 경로)
      </text>
      <g className="text-muted-foreground">
        <circle
          cx="640"
          cy="22"
          r="6"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1.3"
          strokeDasharray="3 2"
        />
      </g>
      <text x="652" y="26" className="fill-muted-foreground" fontSize="11.5">
        재사용 (공유)
      </text>

      {/* 엣지 */}
      {edges.map((e) => {
        const a = center(e.from);
        const b = center(e.to);
        return (
          <g
            key={`${e.from}-${e.to}`}
            className={e.hot ? "text-accent" : "text-muted-foreground"}
          >
            <line
              x1={a.x}
              y1={a.bottom}
              x2={b.x}
              y2={b.top}
              stroke="currentColor"
              strokeOpacity={e.hot ? 1 : 0.45}
              strokeWidth={e.hot ? 2.2 : 1.5}
              strokeDasharray={e.hot ? undefined : "5 4"}
            />
          </g>
        );
      })}

      {/* 노드 */}
      {nodes.map((n) => (
        <g
          key={n.id}
          className={n.isNew ? "text-accent" : "text-muted-foreground"}
        >
          <rect
            x={n.cx - W / 2}
            y={n.y}
            width={W}
            height={H}
            rx="10"
            fill="currentColor"
            fillOpacity={n.isNew ? 0.12 : 0.05}
            stroke="currentColor"
            strokeOpacity={n.isNew ? 1 : 0.45}
            strokeWidth={n.isNew ? 2 : 1.4}
            strokeDasharray={n.isNew ? undefined : "5 4"}
          />
          <text
            x={n.cx}
            y={n.y + 20}
            textAnchor="middle"
            className="fill-foreground"
            fontSize="13"
            fontFamily="monospace"
            fontWeight="700"
          >
            {n.label}
          </text>
          <text
            x={n.cx}
            y={n.y + 36}
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="10"
          >
            {n.sub}
          </text>
        </g>
      ))}

      {/* 하단 메모 */}
      <g className="text-accent">
        <rect
          x="40"
          y="424"
          width="680"
          height="30"
          rx="8"
          fill="currentColor"
          fillOpacity="0.06"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
      </g>
      <text
        x="380"
        y="444"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11.5"
      >
        바뀐 경로만 새 객체로 · 나머지 서브트리는 이전 참조를 그대로 공유 = 구조적 공유
      </text>
    </svg>
  );
}
