export function CookieSecurityDiagram() {
  const cards = [
    {
      x: 36,
      y: 80,
      name: "localStorage",
      sub: "JS가 getItem()으로 바로 읽음",
      verdict: "❌ 유출",
      safe: false,
    },
    {
      x: 36,
      y: 158,
      name: "HttpOnly 쿠키",
      sub: "JS에서 접근 불가",
      verdict: "✅ 차단",
      safe: true,
    },
    {
      x: 404,
      y: 80,
      name: "SameSite 없음 · None",
      sub: "크로스사이트에도 자동 전송",
      verdict: "❌ 전송됨",
      safe: false,
    },
    {
      x: 404,
      y: 158,
      name: "SameSite=Lax · Strict",
      sub: "외부 출발 요청엔 미전송",
      verdict: "✅ 차단",
      safe: true,
    },
  ];

  return (
    <svg
      viewBox="0 0 760 326"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="토큰 저장과 쿠키 옵션의 보안 — XSS는 주입된 스크립트가 토큰을 읽으려는 공격으로, localStorage는 유출되지만 HttpOnly 쿠키는 차단된다. CSRF는 외부 사이트가 요청을 유발하는 공격으로, SameSite가 없으면 쿠키가 자동 전송되지만 Lax·Strict면 차단된다. XSS는 HttpOnly, CSRF는 SameSite로 서로 다른 두 축을 막는다."
    >
      <text x="380" y="24" textAnchor="middle" className="fill-muted-foreground" fontSize="11.5">
        토큰은 두 공격을 동시에 견뎌야 한다 — XSS와 CSRF는 막는 축이 다르다
      </text>

      {/* 좌/우 헤더 */}
      <text x="196" y="58" textAnchor="middle" className="fill-foreground" fontSize="11.5" fontWeight="700">
        🐛 XSS — 주입된 스크립트가 토큰을 읽음
      </text>
      <text x="564" y="58" textAnchor="middle" className="fill-foreground" fontSize="11.5" fontWeight="700">
        🎣 CSRF — 외부 사이트가 요청을 유발
      </text>

      {/* 가운데 구분선 */}
      <g className="text-muted-foreground">
        <line x1="380" y1="72" x2="380" y2="240" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="4 4" />
      </g>

      {cards.map((c) => (
        <g key={c.name} className={c.safe ? "text-accent" : "text-muted-foreground"}>
          <rect
            x={c.x}
            y={c.y}
            width="320"
            height="66"
            rx="11"
            fill="currentColor"
            fillOpacity={c.safe ? 0.1 : 0.04}
            stroke="currentColor"
            strokeOpacity={c.safe ? 1 : 0.35}
            strokeWidth={c.safe ? 1.8 : 1.3}
          />
          <text x={c.x + 18} y={c.y + 28} className="fill-foreground" fontSize="12.5" fontWeight="700" fontFamily="monospace">
            {c.name}
          </text>
          <text x={c.x + 18} y={c.y + 48} className="fill-muted-foreground" fontSize="9.5">
            {c.sub}
          </text>
          <text x={c.x + 302} y={c.y + 39} textAnchor="end" className="fill-foreground" fontSize="12.5" fontWeight="700">
            {c.verdict}
          </text>
        </g>
      ))}

      {/* 하단 핵심 */}
      <g className="text-accent">
        <rect x="36" y="256" width="688" height="56" rx="10" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
      </g>
      <text x="380" y="280" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
        XSS는 HttpOnly로, CSRF는 SameSite로 — 서로 다른 두 축을 따로 막는다
      </text>
      <text x="380" y="300" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        어느 하나도 만능이 아니라 HttpOnly · Secure · SameSite를 조합해야 완성된다
      </text>
    </svg>
  );
}
