export function RenderClosureDiagram() {
  const renders = [
    { x: 24, n: 0, captured: "0 + 1", current: false },
    { x: 300, n: 1, captured: "1 + 1", current: false },
    { x: 576, n: 2, captured: "2 + 1", current: true },
  ];

  return (
    <svg
      viewBox="0 0 840 340"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="React 리렌더마다 새로운 클로저가 생기는 과정 — 각 렌더는 자신만의 count 값과, 그 값을 캡처한 독립된 onClick 클로저를 가진다. setCount 호출이 다음 렌더를 트리거한다."
    >
      <defs>
        <marker
          id="rc-arrow"
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

      {/* 상단 제목 */}
      <text
        x="420"
        y="34"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="13"
        fontWeight="600"
      >
        리렌더마다 — 새로운 count, 새로운 클로저
      </text>

      {renders.map((r) => {
        const cx = r.x + 120;
        return (
          <g key={r.n} className={r.current ? "text-accent" : "text-foreground"}>
            {/* 렌더 카드 */}
            <rect
              x={r.x}
              y="58"
              width="240"
              height="232"
              rx="12"
              fill="currentColor"
              fillOpacity={r.current ? 0.09 : 0.045}
              stroke="currentColor"
              strokeOpacity={r.current ? 1 : 0.4}
              strokeWidth={r.current ? 2 : 1.5}
            />

            {/* 헤더 */}
            <text
              x={cx}
              y="88"
              textAnchor="middle"
              className="fill-foreground"
              fontSize="15"
              fontWeight="700"
            >
              {`Render #${r.n}`}
            </text>
            {r.current && (
              <text
                x={cx}
                y="106"
                textAnchor="middle"
                className="fill-accent"
                fontSize="10.5"
                fontWeight="700"
              >
                ● 현재 화면
              </text>
            )}

            {/* state 값 pill */}
            <rect
              x={r.x + 50}
              y="120"
              width="140"
              height="34"
              rx="17"
              fill="currentColor"
              fillOpacity="0.14"
            />
            <text
              x={cx}
              y="142"
              textAnchor="middle"
              className="fill-foreground"
              fontSize="13"
              fontFamily="monospace"
              fontWeight="700"
            >
              {`count = ${r.n}`}
            </text>

            {/* 클로저 라벨 */}
            <text
              x={cx}
              y="186"
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize="11"
            >
              이 렌더의 onClick 클로저
            </text>

            {/* 클로저 박스 */}
            <rect
              x={r.x + 22}
              y="198"
              width="196"
              height="68"
              rx="8"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.5"
              strokeWidth="1.4"
              strokeDasharray="5 4"
            />
            <text
              x={cx}
              y="226"
              textAnchor="middle"
              className="fill-foreground"
              fontSize="12"
              fontFamily="monospace"
            >
              () =&gt; setCount(
            </text>
            <text
              x={cx}
              y="246"
              textAnchor="middle"
              className="fill-foreground"
              fontSize="12"
              fontFamily="monospace"
              fontWeight="700"
            >
              {`${r.captured} )`}
            </text>
          </g>
        );
      })}

      {/* 카드 사이 화살표: setCount → 리렌더 */}
      {[
        { x1: 264, x2: 300 },
        { x1: 540, x2: 576 },
      ].map((a) => (
        <g key={a.x1} className="text-accent">
          <line
            x1={a.x1}
            y1="174"
            x2={a.x2}
            y2="174"
            stroke="currentColor"
            strokeWidth="2.2"
            markerEnd="url(#rc-arrow)"
          />
          <text
            x={(a.x1 + a.x2) / 2}
            y="162"
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="9.5"
            fontWeight="600"
          >
            리렌더
          </text>
        </g>
      ))}

      {/* 하단 핵심 메모 */}
      <g className="text-accent">
        <rect
          x="24"
          y="304"
          width="792"
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
        x="420"
        y="324"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11.5"
      >
        옛 렌더의 클로저가 나중에 실행되면 → 그 렌더 시점의 count(옛 값)를 본다 = stale closure
      </text>
    </svg>
  );
}
