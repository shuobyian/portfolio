export function EventLoopDiagram() {
  return (
    <svg
      viewBox="0 0 840 560"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="자바스크립트 이벤트 루프 구성 요소 흐름도 — 콜스택이 비동기 작업을 Web API에 위임하고, 완료된 콜백이 마이크로태스크·매크로태스크 큐에 쌓이면 이벤트 루프가 마이크로태스크를 전부 비운 뒤 매크로태스크를 하나씩 꺼내 콜스택으로 보낸다."
    >
      <defs>
        <marker
          id="el-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6.5"
          markerHeight="6.5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
        <marker
          id="el-arrow-muted"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6.5"
          markerHeight="6.5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" fillOpacity="0.55" />
        </marker>
      </defs>

      {/* ───────── Call Stack (좌측, hot path) ───────── */}
      <g className="text-accent">
        <rect
          x="44"
          y="196"
          width="180"
          height="208"
          rx="12"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </g>
      <text
        x="134"
        y="226"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="16"
        fontWeight="700"
      >
        Call Stack
      </text>
      <text
        x="134"
        y="246"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
      >
        현재 실행 중인 함수
      </text>
      {/* 스택 프레임 */}
      {[
        { y: 264, label: "함수 C", op: 0.16 },
        { y: 304, label: "함수 B", op: 0.12 },
        { y: 344, label: "함수 A", op: 0.08 },
      ].map((f) => (
        <g key={f.label} className="text-accent">
          <rect
            x="70"
            y={f.y}
            width="128"
            height="30"
            rx="6"
            fill="currentColor"
            fillOpacity={f.op}
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
          <text
            x="134"
            y={f.y + 20}
            textAnchor="middle"
            className="fill-foreground"
            fontSize="12"
            fontFamily="monospace"
          >
            {f.label}
          </text>
        </g>
      ))}

      {/* ───────── Web APIs (상단) ───────── */}
      <g className="text-foreground">
        <rect
          x="312"
          y="40"
          width="248"
          height="104"
          rx="12"
          fill="currentColor"
          fillOpacity="0.04"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeDasharray="6 5"
        />
      </g>
      <text
        x="436"
        y="74"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="15"
        fontWeight="700"
      >
        Web APIs
      </text>
      <text
        x="436"
        y="98"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11.5"
        fontFamily="monospace"
      >
        타이머 · fetch · DOM 이벤트
      </text>
      <text
        x="436"
        y="120"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
      >
        (브라우저가 대신 처리)
      </text>

      {/* ───────── Microtask Queue (우상단, 우선 처리) ───────── */}
      <g className="text-accent">
        <rect
          x="624"
          y="158"
          width="188"
          height="96"
          rx="12"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="2"
        />
      </g>
      {/* "우선" 배지 */}
      <g className="text-accent">
        <rect
          x="624"
          y="138"
          width="58"
          height="22"
          rx="11"
          fill="currentColor"
          fillOpacity="0.9"
        />
      </g>
      <text
        x="653"
        y="153"
        textAnchor="middle"
        className="fill-background"
        fontSize="11"
        fontWeight="700"
      >
        우선
      </text>
      <text
        x="718"
        y="188"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="13.5"
        fontWeight="700"
      >
        Microtask Queue
      </text>
      <text
        x="718"
        y="210"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
        fontFamily="monospace"
      >
        Promise.then · await
      </text>
      <text
        x="718"
        y="228"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
        fontFamily="monospace"
      >
        queueMicrotask
      </text>

      {/* ───────── Macrotask Queue (우하단) ───────── */}
      <g className="text-foreground">
        <rect
          x="624"
          y="300"
          width="188"
          height="96"
          rx="12"
          fill="currentColor"
          fillOpacity="0.05"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
      </g>
      <text
        x="718"
        y="330"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="13.5"
        fontWeight="700"
      >
        Macrotask Queue
      </text>
      <text
        x="718"
        y="352"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
        fontFamily="monospace"
      >
        setTimeout · setInterval
      </text>
      <text
        x="718"
        y="370"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
      >
        이벤트 콜백
      </text>

      {/* ───────── Event Loop (중앙) ───────── */}
      {/* 회전 링 (반복 의미) */}
      <g className="text-accent">
        <path
          d="M 436 366 A 64 64 0 1 1 372 430"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="2"
          strokeDasharray="5 5"
          markerEnd="url(#el-arrow)"
        />
      </g>
      <g className="text-accent">
        <circle
          cx="436"
          cy="430"
          r="56"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeWidth="2"
        />
      </g>
      <text
        x="436"
        y="425"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="15"
        fontWeight="700"
      >
        Event
      </text>
      <text
        x="436"
        y="446"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="15"
        fontWeight="700"
      >
        Loop
      </text>

      {/* ───────── 흐름 화살표 ───────── */}

      {/* ① Call Stack → Web APIs : 비동기 위임 */}
      <g className="text-muted-foreground">
        <path
          d="M 200 210 C 250 130, 290 92, 310 92"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="1.8"
          markerEnd="url(#el-arrow-muted)"
        />
      </g>
      <text
        x="214"
        y="150"
        className="fill-muted-foreground"
        fontSize="12"
        fontWeight="600"
      >
        ① 비동기 작업 위임
      </text>

      {/* ② Web APIs → 큐 : 완료 콜백 적재 */}
      <g className="text-muted-foreground">
        <path
          d="M 562 110 C 610 120, 624 150, 638 156"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="1.8"
          markerEnd="url(#el-arrow-muted)"
        />
        <path
          d="M 562 128 C 640 150, 700 230, 718 298"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.6"
          strokeDasharray="5 4"
          markerEnd="url(#el-arrow-muted)"
        />
      </g>
      <text
        x="575"
        y="166"
        className="fill-muted-foreground"
        fontSize="12"
        fontWeight="600"
      >
        ② 완료 콜백
      </text>

      {/* ③ Microtask → Event Loop : 큐 전부 비움 (hot path) */}
      <g className="text-accent">
        <path
          d="M 624 224 C 540 270, 510 350, 492 392"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          markerEnd="url(#el-arrow)"
        />
      </g>
      <text
        x="512"
        y="300"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="12.5"
        fontWeight="700"
      >
        ③ 큐 전부 비움
      </text>

      {/* ④ Macrotask → Event Loop : 하나만 */}
      <g className="text-muted-foreground">
        <path
          d="M 624 352 C 560 372, 520 400, 494 420"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.6"
          strokeWidth="1.8"
          markerEnd="url(#el-arrow-muted)"
        />
      </g>
      <text
        x="556"
        y="406"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="12"
        fontWeight="600"
      >
        ④ 하나만
      </text>

      {/* ⑤ Event Loop → Call Stack : 콜스택 비면 실행 */}
      <g className="text-accent">
        <path
          d="M 380 430 C 300 430, 250 410, 226 392"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          markerEnd="url(#el-arrow)"
        />
      </g>
      <text
        x="300"
        y="470"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="12.5"
        fontWeight="700"
      >
        ⑤ 콜스택이 비면 실행
      </text>

      {/* ───────── 하단 핵심 규칙 ───────── */}
      <g className="text-accent">
        <rect
          x="44"
          y="512"
          width="768"
          height="36"
          rx="8"
          fill="currentColor"
          fillOpacity="0.06"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
      </g>
      <text
        x="428"
        y="535"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="12"
      >
        핵심 — 마이크로태스크 큐를 「전부」 비운 뒤에야 매크로태스크를 「하나」 꺼낸다
      </text>
    </svg>
  );
}
