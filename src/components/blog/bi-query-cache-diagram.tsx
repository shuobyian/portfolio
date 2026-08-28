export function QueryStaleResponseRaceDiagram() {
  return (
    <svg
      viewBox="0 0 820 430"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="mutation 이후 캐시 갱신 순서 비교 — cancel 없이 invalidate만 하면 쓰기 직전 시작된 조회의 늦은 응답이 새 서버 상태를 덮어쓰고, cancel 후 invalidate하면 그 응답이 폐기된다"
    >
      <defs>
        <marker
          id="bi-race-arrow"
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
        y="28"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="14"
        fontWeight="600"
      >
        쓰기 직전 시작된 조회의 늦은 응답
      </text>

      {/* ── 왼쪽: cancel 없이 invalidate만 ── */}
      <text
        x="205"
        y="62"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="12"
        fontWeight="600"
      >
        invalidate만 호출
      </text>

      <g className="text-foreground">
        <line
          x1="60"
          y1="80"
          x2="60"
          y2="330"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
        <line
          x1="350"
          y1="80"
          x2="350"
          y2="330"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
      </g>
      <text x="60" y="350" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        클라이언트
      </text>
      <text x="350" y="350" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        서버
      </text>

      <g className="text-muted-foreground">
        <line
          x1="60"
          y1="100"
          x2="350"
          y2="118"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#bi-race-arrow)"
        />
      </g>
      <text x="205" y="98" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        ① GET 목록 (진행 중)
      </text>

      <g className="text-accent">
        <line
          x1="60"
          y1="150"
          x2="350"
          y2="164"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#bi-race-arrow)"
        />
      </g>
      <text x="205" y="148" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        ② PATCH 수정
      </text>

      <g className="text-accent">
        <line
          x1="350"
          y1="196"
          x2="60"
          y2="210"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#bi-race-arrow)"
        />
      </g>
      <text x="205" y="194" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        ③ 성공 → invalidate
      </text>

      <g className="text-muted-foreground">
        <line
          x1="350"
          y1="248"
          x2="60"
          y2="262"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          markerEnd="url(#bi-race-arrow)"
        />
      </g>
      <text x="205" y="246" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        ④ ①의 응답이 뒤늦게 도착
      </text>

      <g className="text-foreground">
        <rect
          x="70"
          y="284"
          width="270"
          height="34"
          rx="8"
          fill="currentColor"
          fillOpacity="0.06"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
      </g>
      <text x="205" y="306" textAnchor="middle" className="fill-foreground" fontSize="11">
        캐시가 수정 전 데이터로 되돌아간다
      </text>

      {/* ── 구분선 ── */}
      <g className="text-foreground">
        <line
          x1="410"
          y1="70"
          x2="410"
          y2="360"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="1"
        />
      </g>

      {/* ── 오른쪽: cancel → invalidate ── */}
      <text
        x="615"
        y="62"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="12"
        fontWeight="600"
      >
        cancel → invalidate
      </text>

      <g className="text-foreground">
        <line
          x1="470"
          y1="80"
          x2="470"
          y2="330"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
        <line
          x1="760"
          y1="80"
          x2="760"
          y2="330"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
      </g>
      <text x="470" y="350" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        클라이언트
      </text>
      <text x="760" y="350" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        서버
      </text>

      <g className="text-muted-foreground">
        <line
          x1="470"
          y1="100"
          x2="760"
          y2="118"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#bi-race-arrow)"
        />
      </g>
      <text x="615" y="98" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        ① GET 목록 (진행 중)
      </text>

      <g className="text-accent">
        <line
          x1="470"
          y1="150"
          x2="760"
          y2="164"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#bi-race-arrow)"
        />
      </g>
      <text x="615" y="148" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        ② PATCH 수정
      </text>

      <g className="text-accent">
        <line
          x1="760"
          y1="196"
          x2="470"
          y2="210"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#bi-race-arrow)"
        />
      </g>
      <text x="615" y="194" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        ③ 성공 → cancel → invalidate
      </text>

      <g className="text-muted-foreground">
        <line
          x1="760"
          y1="248"
          x2="600"
          y2="256"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
        <line
          x1="586"
          y1="248"
          x2="614"
          y2="266"
          stroke="currentColor"
          strokeOpacity="0.7"
          strokeWidth="1.5"
        />
        <line
          x1="614"
          y1="248"
          x2="586"
          y2="266"
          stroke="currentColor"
          strokeOpacity="0.7"
          strokeWidth="1.5"
        />
      </g>
      <text x="700" y="278" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        ④ 늦은 응답은 캐시에 반영되지 않음
      </text>

      <g className="text-accent">
        <rect
          x="480"
          y="284"
          width="270"
          height="34"
          rx="8"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>
      <text x="615" y="306" textAnchor="middle" className="fill-foreground" fontSize="11">
        refetch 결과인 최신 상태만 남는다
      </text>

      <text x="410" y="392" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        cancel은 늦은 응답의 &quot;캐시 반영&quot;을 막는다 — HTTP 전송 중단은 별개 문제다
      </text>
    </svg>
  );
}

export function SessionScopeGenerationDiagram() {
  const rows = [
    {
      scope: "current",
      when: "현재 활성 세션에서 시작한 요청",
      action: "401이면 세션 종료 + 안내",
      accent: true,
    },
    {
      scope: "local-stale",
      when: "같은 탭의 로그아웃 직전에 시작된 요청",
      action: "무시 — 새 상태에 영향 없음",
      accent: false,
    },
    {
      scope: "external-stale",
      when: "다른 탭의 로그인으로 세대가 바뀌기 전 요청",
      action: "현재 탭만 로컬 종료 (새 토큰은 그대로)",
      accent: false,
    },
  ];

  return (
    <svg
      viewBox="0 0 820 320"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="세션 세대에 따른 오류 스코프 분류 — current는 세션 종료, local-stale은 무시, external-stale은 현재 탭만 종료"
    >
      <text
        x="410"
        y="28"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="14"
        fontWeight="600"
      >
        요청 시작 시점의 세션 세대로 401을 분류한다
      </text>

      <text x="60" y="62" className="fill-muted-foreground" fontSize="11" fontWeight="600">
        스코프
      </text>
      <text x="220" y="62" className="fill-muted-foreground" fontSize="11" fontWeight="600">
        언제 생기나
      </text>
      <text x="540" y="62" className="fill-muted-foreground" fontSize="11" fontWeight="600">
        401 도착 시 처리
      </text>

      {rows.map((row, i) => {
        const y = 78 + i * 66;
        return (
          <g key={row.scope}>
            <g className={row.accent ? "text-accent" : "text-foreground"}>
              <rect
                x="50"
                y={y}
                width="720"
                height="52"
                rx="10"
                fill="currentColor"
                fillOpacity={row.accent ? 0.1 : 0.05}
                stroke="currentColor"
                strokeOpacity={row.accent ? 1 : 0.35}
                strokeWidth="1.5"
              />
            </g>
            <text
              x="66"
              y={y + 31}
              className="fill-foreground"
              fontSize="12"
              fontWeight="600"
              fontFamily="ui-monospace, monospace"
            >
              {row.scope}
            </text>
            <text x="220" y={y + 31} className="fill-muted-foreground" fontSize="11">
              {row.when}
            </text>
            <text x="540" y={y + 31} className="fill-foreground" fontSize="11">
              {row.action}
            </text>
          </g>
        );
      })}

      <text x="410" y="296" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        동시 401 중 첫 응답만 세션을 정리한다 — 나머지는 중복 안내를 만들지 않는다
      </text>
    </svg>
  );
}
