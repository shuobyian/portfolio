export function WebSecurityDefenseDiagram() {
  const layers = [
    { x: 60, name: "① 자동 escape", sub: "React가 {} 보간을 텍스트로", scope: "기본" },
    { x: 270, name: "② DOMPurify", sub: "HTML 직접 삽입 시 sanitize", scope: "꼭 필요할 때" },
    { x: 480, name: "③ CSP", sub: "브라우저가 실행 자체를 차단", scope: "최후 방어선" },
  ];

  return (
    <svg
      viewBox="0 0 760 360"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="웹 보안의 두 축 — XSS는 악성 스크립트 주입 공격으로, 자동 escape·DOMPurify·CSP의 3중 방어로 막는다. CSRF는 위조 요청 공격으로, SameSite 쿠키와 CSRF 토큰으로 막는다. XSS는 코드 주입, CSRF는 요청 위조라는 서로 다른 공격이며 방어 수단도 다르다."
    >
      <text x="380" y="22" textAnchor="middle" className="fill-muted-foreground" fontSize="11.5">
        XSS와 CSRF는 다른 공격이다 — 막는 방법도 다르다
      </text>

      {/* XSS 블록 */}
      <text x="60" y="56" className="fill-foreground" fontSize="12.5" fontWeight="700">
        🐛 XSS — 악성 스크립트를 주입해 실행시킨다
      </text>

      {layers.map((l, i) => (
        <g key={l.name} className="text-accent">
          <rect
            x={l.x}
            y={72}
            width="190"
            height="74"
            rx="11"
            fill="currentColor"
            fillOpacity={0.07 + i * 0.03}
            stroke="currentColor"
            strokeOpacity="0.8"
            strokeWidth="1.6"
          />
          <text x={l.x + 16} y={98} className="fill-foreground" fontSize="12" fontWeight="700">
            {l.name}
          </text>
          <text x={l.x + 16} y={118} className="fill-muted-foreground" fontSize="9.5">
            {l.sub}
          </text>
          <text x={l.x + 16} y={135} className="fill-foreground" fontSize="9.5" fontWeight="600" fontFamily="monospace">
            {l.scope}
          </text>
        </g>
      ))}

      {/* 화살표로 깊이 방어 표현 */}
      <g className="text-muted-foreground">
        <line x1="250" y1="109" x2="270" y2="109" stroke="currentColor" strokeWidth="1.4" markerEnd="url(#ws-arrow)" />
        <line x1="460" y1="109" x2="480" y2="109" stroke="currentColor" strokeWidth="1.4" markerEnd="url(#ws-arrow)" />
        <defs>
          <marker id="ws-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
          </marker>
        </defs>
      </g>
      <text x="380" y="166" textAnchor="middle" className="fill-muted-foreground" fontSize="9.5">
        앞단이 뚫려도 다음 층이 막는 깊이 방어(defense in depth)
      </text>

      {/* CSRF 블록 */}
      <text x="60" y="212" className="fill-foreground" fontSize="12.5" fontWeight="700">
        🎣 CSRF — 로그인된 권한으로 위조 요청을 보낸다
      </text>

      {[
        { x: 60, name: "SameSite=Lax · Strict", sub: "크로스사이트 요청에 쿠키 미전송", scope: "기본 방어" },
        { x: 400, name: "CSRF 토큰", sub: "예측 불가 토큰을 요청에 동봉", scope: "교차 도메인 시" },
      ].map((c) => (
        <g key={c.name} className="text-accent">
          <rect
            x={c.x}
            y={228}
            width="300"
            height="68"
            rx="11"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeOpacity="0.8"
            strokeWidth="1.6"
          />
          <text x={c.x + 18} y={254} className="fill-foreground" fontSize="12" fontWeight="700" fontFamily="monospace">
            {c.name}
          </text>
          <text x={c.x + 18} y={274} className="fill-muted-foreground" fontSize="9.5">
            {c.sub}
          </text>
          <text x={c.x + 18} y={289} className="fill-foreground" fontSize="9.5" fontWeight="600" fontFamily="monospace">
            {c.scope}
          </text>
        </g>
      ))}

      {/* 하단 핵심 */}
      <g className="text-accent">
        <rect x="60" y="312" width="640" height="38" rx="10" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
      </g>
      <text x="380" y="336" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
        XSS는 코드 주입을 막고(escape · DOMPurify · CSP), CSRF는 요청 위조를 막는다(SameSite · 토큰)
      </text>
    </svg>
  );
}
