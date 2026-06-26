export function HttpVersionsDiagram() {
  const CW = 184;
  const cols = [
    { x: 172, name: "HTTP/1.1", transport: "TCP · 연결당 순차" },
    { x: 364, name: "HTTP/2", transport: "TCP · 멀티플렉싱" },
    { x: 556, name: "HTTP/3", transport: "QUIC (UDP)" },
  ];

  const statusRows = [
    { y: 96, label: "HTTP 계층 HOL", cells: [false, true, true] },
    { y: 148, label: "TCP 계층 HOL", cells: [false, false, true] },
  ];

  const RH = 46;

  const front = [
    ["요청 수 줄이기", "샤딩 · 스프라이트"],
    ["샤딩 폐기", "캐시 단위 분할"],
    ["모바일 · 재방문", "지연 개선"],
  ];

  return (
    <svg
      viewBox="0 0 760 320"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="HTTP 버전별 Head-of-Line 블로킹 비교 — HTTP/1.1은 TCP 연결당 순차 처리라 HTTP 계층과 TCP 계층 HOL이 모두 있다. HTTP/2는 멀티플렉싱으로 HTTP 계층 HOL을 없앴지만 TCP 계층 HOL은 남는다. HTTP/3은 QUIC(UDP) 기반이라 TCP 계층 HOL까지 없앤다. 그 결과 도메인 샤딩·스프라이트 같은 1.1식 최적화는 안티패턴이 되고, 캐시 단위 분할로 무게중심이 옮겨간다."
    >
      <text x="380" y="24" textAnchor="middle" className="fill-muted-foreground" fontSize="11.5">
        버전이 올라갈수록 HOL 블로킹을 한 계층씩 제거해 왔다
      </text>

      {/* 열 헤더 */}
      {cols.map((c) => (
        <g key={c.name} className="text-accent">
          <rect x={c.x} y="44" width={CW} height="44" rx="9" fill="currentColor" fillOpacity="0.09" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.3" />
          <text x={c.x + CW / 2} y="65" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700" fontFamily="monospace">
            {c.name}
          </text>
          <text x={c.x + CW / 2} y="81" textAnchor="middle" className="fill-muted-foreground" fontSize="9">
            {c.transport}
          </text>
        </g>
      ))}

      {/* 상태 행 (HOL) */}
      {statusRows.map((row) => (
        <g key={row.label}>
          <text x="32" y={row.y + RH / 2 + 4} className="fill-foreground" fontSize="11.5" fontWeight="600">
            {row.label}
          </text>
          {cols.map((c, i) => {
            const safe = row.cells[i];
            return (
              <g key={c.name} className={safe ? "text-accent" : "text-muted-foreground"}>
                <rect
                  x={c.x + 6}
                  y={row.y + 5}
                  width={CW - 12}
                  height={RH - 10}
                  rx="8"
                  fill="currentColor"
                  fillOpacity={safe ? 0.12 : 0.04}
                  stroke="currentColor"
                  strokeOpacity={safe ? 0.9 : 0.25}
                  strokeWidth={safe ? 1.6 : 1.1}
                />
                <text x={c.x + CW / 2} y={row.y + RH / 2 + 5} textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">
                  {safe ? "✅ 없음" : "❌ 있음"}
                </text>
              </g>
            );
          })}
        </g>
      ))}

      {/* 프론트 핵심 행 */}
      <text x="32" y="228" className="fill-foreground" fontSize="11.5" fontWeight="600">
        프론트 핵심
      </text>
      {cols.map((c, i) => (
        <g key={c.name}>
          <text x={c.x + CW / 2} y="216" textAnchor="middle" className="fill-foreground" fontSize="10.5" fontWeight="600">
            {front[i][0]}
          </text>
          <text x={c.x + CW / 2} y="232" textAnchor="middle" className="fill-muted-foreground" fontSize="9.5">
            {front[i][1]}
          </text>
        </g>
      ))}

      {/* 하단 핵심 */}
      <g className="text-accent">
        <rect x="24" y="256" width="712" height="48" rx="10" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
      </g>
      <text x="380" y="276" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
        2는 멀티플렉싱으로 HTTP HOL을, 3은 QUIC으로 TCP HOL까지 없앤다
      </text>
      <text x="380" y="294" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        그래서 &quot;요청 수 줄이기&quot;가 &quot;캐시 단위로 잘 쪼개기&quot;로 역전됐다
      </text>
    </svg>
  );
}
