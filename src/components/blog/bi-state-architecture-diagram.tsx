export function BiProviderStackDiagram() {
  return (
    <svg
      viewBox="0 0 820 460"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="main.tsx Provider 조립 순서 — QueryClientProvider → AntdProvider → QueryErrorResetBoundary → ErrorBoundary → SessionBootstrap → RouterProvider"
    >
      <defs>
        <marker
          id="bi-provider-arrow"
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

      <text
        x="410"
        y="32"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="14"
        fontWeight="600"
      >
        main.tsx — Provider 조립 순서
      </text>

      {[
        { y: 60, label: "QueryClientProvider", sub: "서버 상태 게이트웨이" },
        { y: 124, label: "AntdProvider", sub: "디자인 시스템 토큰·테마" },
        {
          y: 188,
          label: "QueryErrorResetBoundary",
          sub: "Query 에러 리셋 컨텍스트",
        },
        { y: 252, label: "ErrorBoundary", sub: "런타임 예외 폴백" },
        {
          y: 316,
          label: "SessionBootstrap",
          sub: "쿠키 ↔ store 정합성 1회 확인",
        },
        { y: 380, label: "RouterProvider", sub: "라우터 렌더 시작" },
      ].map((b, i, arr) => (
        <g key={b.y}>
          <g className="text-accent">
            <rect
              x="180"
              y={b.y}
              width="460"
              height="48"
              rx="10"
              fill="currentColor"
              fillOpacity={0.05 + i * 0.015}
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </g>
          <text
            x="200"
            y={b.y + 22}
            className="fill-foreground"
            fontSize="14"
            fontWeight="600"
          >
            {b.label}
          </text>
          <text
            x="200"
            y={b.y + 39}
            className="fill-muted-foreground"
            fontSize="11"
          >
            {b.sub}
          </text>
          {i < arr.length - 1 && (
            <g className="text-accent">
              <line
                x1="410"
                y1={b.y + 48}
                x2="410"
                y2={b.y + 60}
                stroke="currentColor"
                strokeWidth="1.5"
                markerEnd="url(#bi-provider-arrow)"
              />
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}

export function BiSessionBootstrapDiagram() {
  return (
    <svg
      viewBox="0 0 820 460"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="SessionBootstrap 동작 — 앱 마운트 시 GET /me 호출 결과에 따라 store sync 또는 logout"
    >
      <defs>
        <marker
          id="bi-session-arrow"
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

      <text
        x="410"
        y="32"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="14"
        fontWeight="600"
      >
        SessionBootstrap — 마운트 1회 정합성 체크
      </text>

      <g className="text-accent">
        <rect
          x="320"
          y="56"
          width="180"
          height="58"
          rx="10"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>
      <text
        x="410"
        y="82"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="14"
        fontWeight="600"
      >
        앱 마운트
      </text>
      <text
        x="410"
        y="100"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
      >
        useQuery(loadCurrentUser)
      </text>

      <g className="text-accent">
        <line
          x1="410"
          y1="114"
          x2="410"
          y2="150"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#bi-session-arrow)"
        />
      </g>

      <g className="text-foreground">
        <rect
          x="290"
          y="150"
          width="240"
          height="50"
          rx="10"
          fill="currentColor"
          fillOpacity="0.05"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
      </g>
      <text
        x="410"
        y="180"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="13"
        fontWeight="600"
      >
        GET /me (alpha 서버 쿠키)
      </text>

      <g className="text-muted-foreground">
        <line
          x1="320"
          y1="200"
          x2="180"
          y2="245"
          stroke="currentColor"
          strokeOpacity="0.6"
          strokeWidth="1.5"
          markerEnd="url(#bi-session-arrow)"
        />
        <line
          x1="410"
          y1="200"
          x2="410"
          y2="245"
          stroke="currentColor"
          strokeOpacity="0.6"
          strokeWidth="1.5"
          markerEnd="url(#bi-session-arrow)"
        />
        <line
          x1="500"
          y1="200"
          x2="640"
          y2="245"
          stroke="currentColor"
          strokeOpacity="0.6"
          strokeWidth="1.5"
          markerEnd="url(#bi-session-arrow)"
        />
      </g>

      <text
        x="240"
        y="230"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
      >
        200 OK
      </text>
      <text
        x="425"
        y="230"
        textAnchor="start"
        className="fill-muted-foreground"
        fontSize="11"
      >
        pending
      </text>
      <text
        x="580"
        y="230"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
      >
        401 등 실패
      </text>

      {[
        {
          x: 60,
          color: "text-accent",
          title: "store sync",
          sub: "setUser(me)",
          desc: "user 캐시 갱신",
        },
        {
          x: 320,
          color: "text-foreground",
          title: "전체 화면 Spin",
          sub: "가드 판단 보류",
          desc: "라우터 진입 차단",
        },
        {
          x: 580,
          color: "text-accent",
          title: "store logout()",
          sub: "user = null",
          desc: "localStorage도 비움",
        },
      ].map((b) => (
        <g key={b.x}>
          <g className={b.color}>
            <rect
              x={b.x}
              y="245"
              width="180"
              height="90"
              rx="10"
              fill="currentColor"
              fillOpacity="0.08"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </g>
          <text
            x={b.x + 90}
            y="275"
            textAnchor="middle"
            className="fill-foreground"
            fontSize="14"
            fontWeight="600"
          >
            {b.title}
          </text>
          <text
            x={b.x + 90}
            y="295"
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="11"
            fontFamily="monospace"
          >
            {b.sub}
          </text>
          <text
            x={b.x + 90}
            y="318"
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="11"
          >
            {b.desc}
          </text>
        </g>
      ))}

      <g className="text-muted-foreground">
        <rect
          x="120"
          y="375"
          width="580"
          height="62"
          rx="10"
          fill="currentColor"
          fillOpacity="0.04"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
      </g>
      <text
        x="410"
        y="401"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="13"
        fontWeight="600"
      >
        결과: 라우터 진입 시 store ↔ 쿠키 정합성 보장
      </text>
      <text
        x="410"
        y="421"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
      >
        localStorage만 믿고 가드를 통과시키는 오판 방지
      </text>
    </svg>
  );
}

export function BiDependencyDirectionDiagram() {
  return (
    <svg
      viewBox="0 0 820 360"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="단방향 의존 흐름 — app → features → stores/lib"
    >
      <defs>
        <marker
          id="bi-dep-arrow"
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

      <text
        x="410"
        y="32"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="14"
        fontWeight="600"
      >
        의존 방향 — 단방향 (app → features → stores · lib)
      </text>

      {[
        {
          x: 40,
          title: "app",
          lines: ["main.tsx", "SessionBootstrap", "guards"],
          color: "text-accent",
        },
        {
          x: 290,
          title: "features",
          lines: ["auth/api/*", "auth/hooks/*", "inquiry/api/*"],
          color: "text-accent",
        },
        {
          x: 540,
          title: "stores · lib",
          lines: ["authStore", "themeStore", "queryClient"],
          color: "text-foreground",
        },
      ].map((b) => (
        <g key={b.x}>
          <g className={b.color}>
            <rect
              x={b.x}
              y="80"
              width="240"
              height="190"
              rx="12"
              fill="currentColor"
              fillOpacity="0.06"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </g>
          <text
            x={b.x + 120}
            y="115"
            textAnchor="middle"
            className="fill-foreground"
            fontSize="16"
            fontWeight="700"
          >
            {b.title}
          </text>
          {b.lines.map((line, i) => (
            <text
              key={line}
              x={b.x + 120}
              y={150 + i * 26}
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize="12"
              fontFamily="monospace"
            >
              {line}
            </text>
          ))}
        </g>
      ))}

      <g className="text-accent">
        <line
          x1="280"
          y1="175"
          x2="290"
          y2="175"
          stroke="currentColor"
          strokeWidth="2"
          markerEnd="url(#bi-dep-arrow)"
        />
        <line
          x1="530"
          y1="175"
          x2="540"
          y2="175"
          stroke="currentColor"
          strokeWidth="2"
          markerEnd="url(#bi-dep-arrow)"
        />
      </g>

      <text
        x="410"
        y="310"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="12"
      >
        store는 어떤 feature도 import하지 않음 — 역방향 의존 금지
      </text>
      <text
        x="410"
        y="332"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="12"
      >
        feature는 stores·lib을 소비하지만, stores·lib은 feature를 모름
      </text>
    </svg>
  );
}
