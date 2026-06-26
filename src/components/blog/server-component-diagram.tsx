export function ServerComponentDiagram() {
  return (
    <svg
      viewBox="0 0 760 372"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="Server Component는 서버에서 실행돼 RSC payload로 직렬화된 뒤 브라우저로 전송되고, Client Component만 JS가 브라우저로 보내져 hydrate된다. Server Component는 DB·서버 자원에 접근하지만 useState·이벤트·브라우저 API는 못 쓰고, 코드는 번들에 포함되지 않는다."
    >
      <defs>
        <marker
          id="sc-arrow"
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

      {/* 파이프라인 */}
      {[
        { x: 36, label: "① 서버에서 렌더" },
        { x: 286, label: "② RSC payload 직렬화" },
        { x: 536, label: "③ 브라우저 hydrate" },
      ].map((s) => (
        <g key={s.x} className="text-muted-foreground">
          <rect x={s.x} y="30" width="188" height="42" rx="8" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.3" />
          <text x={s.x + 94} y="56" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
            {s.label}
          </text>
        </g>
      ))}
      <g className="text-muted-foreground">
        <line x1="226" y1="51" x2="282" y2="51" stroke="currentColor" strokeWidth="1.6" markerEnd="url(#sc-arrow)" />
        <line x1="476" y1="51" x2="532" y2="51" stroke="currentColor" strokeWidth="1.6" markerEnd="url(#sc-arrow)" />
      </g>

      {/* Server Component 박스 */}
      <g className="text-accent">
        <rect x="36" y="104" width="330" height="232" rx="12" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeWidth="1.8" />
      </g>
      <text x="60" y="134" className="fill-foreground" fontSize="14" fontWeight="700">
        Server Component
      </text>
      <text x="60" y="151" className="fill-muted-foreground" fontSize="10.5">
        기본값 · 서버에서만 실행
      </text>
      {[
        { y: 182, t: "✅ DB · 파일 · 서버 자원 접근" },
        { y: 210, t: "✅ async/await 컴포넌트" },
        { y: 238, t: "✅ 무거운 라이브러리 → 번들 0" },
        { y: 270, t: "❌ useState · useEffect" },
        { y: 298, t: "❌ onClick 등 이벤트" },
        { y: 322, t: "❌ 브라우저 API" },
      ].map((l) => (
        <text key={l.y} x="60" y={l.y} className="fill-foreground" fontSize="12">
          {l.t}
        </text>
      ))}

      {/* Client Component 박스 */}
      <g className="text-muted-foreground">
        <rect x="394" y="104" width="330" height="232" rx="12" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
      </g>
      <text x="418" y="134" className="fill-foreground" fontSize="14" fontWeight="700">
        Client Component
      </text>
      <g className="text-accent">
        <rect x="600" y="119" width="100" height="22" rx="11" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.3" />
      </g>
      <text x="650" y="134" textAnchor="middle" className="fill-foreground" fontSize="11" fontFamily="monospace" fontWeight="700">
        &quot;use client&quot;
      </text>
      {[
        { y: 182, t: "✅ useState · useEffect" },
        { y: 210, t: "✅ 이벤트 · 상호작용" },
        { y: 238, t: "✅ 브라우저 API" },
        { y: 270, t: "❌ 서버 자원 직접 접근" },
        { y: 298, t: "→ JS가 브라우저로 전송됨" },
      ].map((l) => (
        <text key={l.y} x="418" y={l.y} className="fill-foreground" fontSize="12">
          {l.t}
        </text>
      ))}

      {/* 하단 메모 */}
      <text x="380" y="360" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        Server Component의 코드는 번들에 실리지 않는다 — 렌더 결과(payload)만 전송
      </text>
    </svg>
  );
}
