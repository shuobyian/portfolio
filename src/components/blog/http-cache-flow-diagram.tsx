export function HttpCacheFlowDiagram() {
  return (
    <svg
      viewBox="0 0 760 410"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="HTTP 캐시 흐름 — 캐시가 fresh면 요청 없이 바로 사용(강한 캐시). stale이면 If-None-Match/If-Modified-Since로 조건부 요청을 보내고, 서버가 304면 캐시 재사용, 200이면 새 본문을 받아 캐시를 갱신한다."
    >
      <defs>
        <marker id="hc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>

      {/* A: 리소스 필요 */}
      <g className="text-muted-foreground">
        <rect x="300" y="18" width="160" height="40" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.4" />
      </g>
      <text x="380" y="43" textAnchor="middle" className="fill-foreground" fontSize="12.5" fontWeight="600">
        리소스 필요
      </text>
      <g className="text-muted-foreground">
        <line x1="380" y1="58" x2="380" y2="82" stroke="currentColor" strokeWidth="1.6" markerEnd="url(#hc-arrow)" />
      </g>

      {/* B: fresh? */}
      <g className="text-foreground">
        <rect x="266" y="84" width="228" height="50" rx="10" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" />
      </g>
      <text x="380" y="106" textAnchor="middle" className="fill-foreground" fontSize="12.5" fontWeight="700">
        캐시가 fresh?
      </text>
      <text x="380" y="123" textAnchor="middle" className="fill-muted-foreground" fontSize="10.5">
        max-age 이내인가
      </text>

      {/* B → C (예) */}
      <g className="text-accent">
        <line x1="494" y1="109" x2="536" y2="109" stroke="currentColor" strokeWidth="2" markerEnd="url(#hc-arrow)" />
      </g>
      <text x="515" y="100" textAnchor="middle" className="fill-accent" fontSize="10" fontWeight="700">
        예
      </text>
      {/* C: 캐시 바로 사용 */}
      <g className="text-accent">
        <rect x="538" y="80" width="206" height="58" rx="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.7" />
      </g>
      <text x="641" y="104" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">
        ⚡ 캐시 바로 사용
      </text>
      <text x="641" y="122" textAnchor="middle" className="fill-muted-foreground" fontSize="10.5">
        요청 안 보냄 (강한 캐시)
      </text>

      {/* B → D (아니오) */}
      <g className="text-muted-foreground">
        <line x1="380" y1="134" x2="380" y2="174" stroke="currentColor" strokeWidth="1.8" markerEnd="url(#hc-arrow)" />
      </g>
      <text x="392" y="158" className="fill-muted-foreground" fontSize="10.5" fontWeight="600">
        아니오 (stale)
      </text>

      {/* D: 조건부 요청 */}
      <g className="text-foreground">
        <rect x="244" y="176" width="272" height="58" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" />
      </g>
      <text x="380" y="199" textAnchor="middle" className="fill-foreground" fontSize="12.5" fontWeight="700">
        조건부 요청 전송
      </text>
      <text x="380" y="217" textAnchor="middle" className="fill-muted-foreground" fontSize="10" fontFamily="monospace">
        If-None-Match · If-Modified-Since
      </text>

      <g className="text-muted-foreground">
        <line x1="380" y1="234" x2="380" y2="262" stroke="currentColor" strokeWidth="1.8" markerEnd="url(#hc-arrow)" />
      </g>

      {/* E: 서버 비교 */}
      <g className="text-foreground">
        <rect x="290" y="264" width="180" height="46" rx="10" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" />
      </g>
      <text x="380" y="292" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">
        서버: 바뀌었나?
      </text>

      {/* E → F (304) */}
      <g className="text-accent">
        <path d="M 290 295 C 200 310, 170 318, 165 326" fill="none" stroke="currentColor" strokeWidth="2" markerEnd="url(#hc-arrow)" />
      </g>
      <text x="196" y="312" textAnchor="middle" className="fill-accent" fontSize="10" fontWeight="700">
        안 바뀜 → 304
      </text>
      {/* F: 304 재사용 */}
      <g className="text-accent">
        <rect x="40" y="328" width="250" height="58" rx="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.7" />
      </g>
      <text x="165" y="352" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">
        💨 304 Not Modified
      </text>
      <text x="165" y="370" textAnchor="middle" className="fill-muted-foreground" fontSize="10.5">
        캐시 재사용 (본문 없음)
      </text>

      {/* E → G (200) */}
      <g className="text-muted-foreground">
        <path d="M 470 295 C 560 310, 590 318, 595 326" fill="none" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.8" markerEnd="url(#hc-arrow)" />
      </g>
      <text x="566" y="312" textAnchor="middle" className="fill-muted-foreground" fontSize="10" fontWeight="700">
        바뀜 → 200
      </text>
      {/* G: 200 새 본문 */}
      <g className="text-muted-foreground">
        <rect x="470" y="328" width="250" height="58" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.4" />
      </g>
      <text x="595" y="352" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">
        200 OK
      </text>
      <text x="595" y="370" textAnchor="middle" className="fill-muted-foreground" fontSize="10.5">
        새 본문 다운로드 + 캐시 갱신
      </text>
    </svg>
  );
}
