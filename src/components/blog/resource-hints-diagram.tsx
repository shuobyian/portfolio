export function ResourceHintsDiagram() {
  // 단계 경계 x좌표
  const X0 = 170; // 시작
  const S1 = 300; // DNS 끝
  const S2 = 430; // 연결 끝
  const S3 = 560; // 다운로드 끝
  const S4 = 690; // 실행 끝

  const apis = [
    { y: 70, name: "prefetchDNS", end: S1 },
    { y: 118, name: "preconnect", end: S2 },
    { y: 166, name: "preload", end: S3 },
    { y: 214, name: "preinit", end: S4 },
  ];

  return (
    <svg
      viewBox="0 0 760 290"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="react-dom의 리소스 힌트 API가 처리하는 범위 — prefetchDNS는 DNS 조회까지, preconnect는 연결(TCP·TLS)까지, preload는 다운로드까지, preinit은 실행·적용까지. 오른쪽으로 갈수록 더 많은 단계를 처리한다."
    >
      {/* 단계 헤더 */}
      {[
        { x: 235, t: "DNS 조회" },
        { x: 365, t: "연결 (TCP·TLS)" },
        { x: 495, t: "다운로드" },
        { x: 625, t: "실행·적용" },
      ].map((s) => (
        <text key={s.t} x={s.x} y="40" textAnchor="middle" className="fill-muted-foreground" fontSize="11" fontWeight="600">
          {s.t}
        </text>
      ))}

      {/* 단계 구분선 */}
      {[S1, S2, S3].map((x) => (
        <line key={x} x1={x} y1="52" x2={x} y2="250" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="4 4" />
      ))}

      {/* API 막대 */}
      {apis.map((a) => (
        <g key={a.name}>
          <text x="20" y={a.y + 20} className="fill-foreground" fontSize="12" fontFamily="monospace" fontWeight="700">
            {a.name}
          </text>
          {/* 전체 범위(연한 트랙) */}
          <rect x={X0} y={a.y} width={S4 - X0} height="30" rx="6" className="fill-muted-foreground" fillOpacity="0.06" />
          {/* 처리 범위 */}
          <g className="text-accent">
            <rect x={X0} y={a.y} width={a.end - X0} height="30" rx="6" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.5" />
          </g>
        </g>
      ))}

      {/* 하단 메모 */}
      <text x="380" y="276" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        오른쪽으로 갈수록 더 많이 한다 — preload는 받기만, preinit만 실행·적용까지
      </text>
    </svg>
  );
}
