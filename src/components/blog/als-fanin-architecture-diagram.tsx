export function AlsFanInGraphDiagram() {
  // tier 2 — 부트스트랩되는 코어 repo. gantt가 린트 허브에 합류해 5개로.
  const repos = [
    { cx: 105, label: "alpha-als" },
    { cx: 285, label: "admin-als" },
    { cx: 465, label: "als-api" },
    { cx: 645, label: "eslint-config-als" },
    { cx: 825, label: "als-gantt-chart" },
  ];
  // als-fe-kit 하단에서 fan-out 시작점 (5개)
  const fanOut = [400, 432, 464, 496, 528];

  return (
    <svg
      viewBox="-12 0 936 650"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="알스솔루션 레포 의존 관계 그래프 — als-fe-kit(ca-env·als-deps) 부트스트랩에서 5개 레포로 fan-out, 앱들은 @als/als-api·@als/eslint-config-als 두 허브로 fan-in, gantt는 린트 허브만 합류, 위성 레포 2종은 독립"
    >
      <defs>
        <marker
          id="als-arrow-muted"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path
            d="M 0 0 L 10 5 L 0 10 z"
            className="fill-muted-foreground"
          />
        </marker>
        <marker
          id="als-arrow-accent"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-accent" />
        </marker>
        <marker
          id="als-arrow-fg"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path
            d="M 0 0 L 10 5 L 0 10 z"
            className="fill-foreground"
            fillOpacity="0.55"
          />
        </marker>
      </defs>

      {/* 범례 */}
      <g className="text-muted-foreground">
        <rect
          x="20"
          y="22"
          width="262"
          height="100"
          rx="10"
          fill="currentColor"
          fillOpacity="0.04"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
      </g>
      <g className="text-muted-foreground">
        <line
          x1="36"
          y1="48"
          x2="72"
          y2="48"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
      </g>
      <text x="82" y="52" className="fill-foreground" fontSize="12">
        부트스트랩 (npx)
      </text>
      <g className="text-accent">
        <line
          x1="36"
          y1="76"
          x2="72"
          y2="76"
          stroke="currentColor"
          strokeWidth="2"
        />
      </g>
      <text x="82" y="80" className="fill-foreground" fontSize="12">
        api-contract · ^0.1.x
      </text>
      <g className="text-foreground">
        <line
          x1="36"
          y1="104"
          x2="72"
          y2="104"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1.8"
        />
      </g>
      <text x="82" y="108" className="fill-foreground" fontSize="12">
        lint-config · ^0.0.10
      </text>

      {/* Tier 1 — 부트스트랩 허브 */}
      <g className="text-muted-foreground">
        <rect
          x="300"
          y="22"
          width="300"
          height="84"
          rx="12"
          fill="currentColor"
          fillOpacity="0.07"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 5"
        />
      </g>
      <text
        x="450"
        y="48"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="15"
        fontWeight="700"
      >
        als-fe-kit (ca-env · als-deps)
      </text>
      <text
        x="450"
        y="68"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
        fontFamily="monospace"
      >
        부트스트랩 허브 · git #v0.2.1
      </text>
      <text
        x="450"
        y="90"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
      >
        셋업·토큰 + @als 버전 일괄 관리
      </text>

      {/* 부트스트랩 → 5개 레포 (fan-out, dashed) */}
      <g className="text-muted-foreground">
        {repos.map((r, i) => (
          <line
            key={r.label}
            x1={fanOut[i]}
            y1="106"
            x2={r.cx}
            y2="166"
            stroke="currentColor"
            strokeOpacity="0.55"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            markerEnd="url(#als-arrow-muted)"
          />
        ))}
      </g>

      {/* Tier 2 — 5개 레포 */}
      {repos.map((r) => (
        <g key={r.label}>
          <g className="text-foreground">
            <rect
              x={r.cx - 78}
              y="168"
              width="156"
              height="60"
              rx="10"
              fill="currentColor"
              fillOpacity="0.05"
              stroke="currentColor"
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
          </g>
          <text
            x={r.cx}
            y="203"
            textAnchor="middle"
            className="fill-foreground"
            fontSize="13"
            fontWeight="600"
          >
            {r.label}
          </text>
        </g>
      ))}

      {/* gantt 부분 통합 주석 */}
      <text
        x="825"
        y="247"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="10"
      >
        lint만 합류 · API 미소비
      </text>

      {/* api-contract fan-in (accent) — alpha·admin만 */}
      <g className="text-accent">
        <line
          x1="105"
          y1="228"
          x2="150"
          y2="328"
          stroke="currentColor"
          strokeWidth="2"
          markerEnd="url(#als-arrow-accent)"
        />
        <line
          x1="280"
          y1="228"
          x2="200"
          y2="328"
          stroke="currentColor"
          strokeWidth="2"
          markerEnd="url(#als-arrow-accent)"
        />
      </g>

      {/* lint-config fan-in (foreground, faint) — alpha·admin·als-api·gantt */}
      <g className="text-foreground">
        <line
          x1="130"
          y1="228"
          x2="420"
          y2="328"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="1.8"
          markerEnd="url(#als-arrow-fg)"
        />
        <line
          x1="295"
          y1="228"
          x2="465"
          y2="328"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="1.8"
          markerEnd="url(#als-arrow-fg)"
        />
        <line
          x1="465"
          y1="228"
          x2="505"
          y2="328"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="1.8"
          markerEnd="url(#als-arrow-fg)"
        />
        <line
          x1="820"
          y1="228"
          x2="575"
          y2="328"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="1.8"
          markerEnd="url(#als-arrow-fg)"
        />
      </g>

      {/* Tier 3 — 허브 2종 */}
      <g className="text-accent">
        <rect
          x="55"
          y="330"
          width="250"
          height="74"
          rx="12"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>
      <text
        x="180"
        y="358"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="14"
        fontWeight="700"
      >
        @als/als-api
      </text>
      <text
        x="180"
        y="377"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
      >
        API 계약 허브 · axios peer
      </text>
      <text
        x="180"
        y="393"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
        fontFamily="monospace"
      >
        캐럿 ^0.1.x · 소스 als-api
      </text>

      <g className="text-foreground">
        <rect
          x="345"
          y="330"
          width="300"
          height="74"
          rx="12"
          fill="currentColor"
          fillOpacity="0.06"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
      </g>
      <text
        x="495"
        y="358"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="14"
        fontWeight="700"
      >
        @als/eslint-config-als
      </text>
      <text
        x="495"
        y="377"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
      >
        린트 허브 · airbnb-extended flat
      </text>
      <text
        x="495"
        y="393"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
        fontFamily="monospace"
      >
        ^0.0.10 · 소스 eslint-config-als
      </text>

      <text
        x="680"
        y="372"
        className="fill-muted-foreground"
        fontSize="11"
      >
        lint (dev) ×4
      </text>

      {/* 단방향 원칙 노트 */}
      <text
        x="450"
        y="446"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="12"
        fontWeight="600"
      >
        앱 → 앱 의존 0건 · 모든 결합은 공유 허브로 단방향 fan-in
      </text>

      {/* 위성 컨테이너 */}
      <g className="text-muted-foreground">
        <rect
          x="40"
          y="468"
          width="820"
          height="150"
          rx="12"
          fill="currentColor"
          fillOpacity="0.03"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeDasharray="6 5"
        />
      </g>
      <text
        x="60"
        y="494"
        className="fill-muted-foreground"
        fontSize="12"
        fontWeight="600"
      >
        위성 · 독립 (@als 활성 의존 없음)
      </text>

      {[
        {
          x: 150,
          title: "mcp",
          l1: "cursor-talk-to-figma-mcp",
          l2: "서드파티 (ALS 무관)",
        },
        {
          x: 510,
          title: "design/als-design",
          l1: "@als-design · React-Bootstrap",
          l2: "앱 미소비 · 린트 0.0.10 합류·툴체인 정체",
        },
      ].map((b) => (
        <g key={b.title}>
          <g className="text-foreground">
            <rect
              x={b.x}
              y="508"
              width="240"
              height="92"
              rx="10"
              fill="currentColor"
              fillOpacity="0.04"
              stroke="currentColor"
              strokeOpacity="0.4"
              strokeWidth="1.5"
            />
          </g>
          <text
            x={b.x + 120}
            y="540"
            textAnchor="middle"
            className="fill-foreground"
            fontSize="13"
            fontWeight="600"
          >
            {b.title}
          </text>
          <text
            x={b.x + 120}
            y="562"
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="11"
            fontFamily="monospace"
          >
            {b.l1}
          </text>
          <text
            x={b.x + 120}
            y="582"
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="11"
          >
            {b.l2}
          </text>
        </g>
      ))}
    </svg>
  );
}
