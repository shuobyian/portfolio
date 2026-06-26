export function CompositorThreadDiagram() {
  return (
    <svg
      viewBox="0 0 760 384"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="메인 스레드와 컴포지터 스레드 — width·top·color 같은 속성은 메인 스레드에서 Style·Layout·Paint를 거치며 JS와 경합한다. transform·opacity는 이 단계를 건너뛰고 컴포지터 스레드(GPU)의 Composite로 직접 들어가, 메인 스레드가 JS로 바빠도 독립적으로 60fps를 유지한다. will-change는 레이어를 미리 승격시키는 힌트다."
    >
      <defs>
        <marker
          id="ct-arrow"
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

      <text x="380" y="24" textAnchor="middle" className="fill-muted-foreground" fontSize="11.5">
        같은 픽셀 변화라도 어느 스레드에서 처리되느냐가 부드러움을 가른다
      </text>

      {/* ── 메인 스레드 레인 ── */}
      <text x="32" y="54" className="fill-muted-foreground" fontSize="11.5" fontWeight="600">
        🧵 메인 스레드 — JS · 이벤트 핸들러와 경합 (바쁘면 끊김)
      </text>
      <g className="text-muted-foreground">
        <rect x="24" y="64" width="712" height="92" rx="12" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
      </g>

      {/* 진입 라벨 */}
      <text x="104" y="84" textAnchor="middle" className="fill-muted-foreground" fontSize="9.5" fontFamily="monospace">
        width · top · color
      </text>
      <g className="text-muted-foreground">
        <line x1="44" y1="116" x2="166" y2="116" stroke="currentColor" strokeWidth="1.6" markerEnd="url(#ct-arrow)" />
      </g>

      {/* Style → Layout → Paint */}
      {[
        { x: 170, label: "Style" },
        { x: 330, label: "Layout" },
        { x: 490, label: "Paint" },
      ].map((b) => (
        <g key={b.label} className="text-foreground">
          <rect x={b.x} y="92" width="120" height="48" rx="10" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.4" />
          <text x={b.x + 60} y="121" textAnchor="middle" className="fill-foreground" fontSize="12.5" fontWeight="700">
            {b.label}
          </text>
        </g>
      ))}
      {[
        { x1: 292, x2: 328 },
        { x1: 452, x2: 488 },
      ].map((a) => (
        <g key={a.x1} className="text-muted-foreground">
          <line x1={a.x1} y1="116" x2={a.x2} y2="116" stroke="currentColor" strokeWidth="1.8" markerEnd="url(#ct-arrow)" />
        </g>
      ))}

      {/* Paint → Composite 세로 화살표 */}
      <g className="text-muted-foreground">
        <line x1="550" y1="140" x2="550" y2="216" stroke="currentColor" strokeWidth="1.8" strokeDasharray="4 3" markerEnd="url(#ct-arrow)" />
      </g>
      <text x="560" y="182" className="fill-muted-foreground" fontSize="9.5">
        칠한 픽셀을 레이어 텍스처로
      </text>

      {/* ── 컴포지터 레인 ── */}
      <text x="32" y="186" className="fill-accent" fontSize="11.5" fontWeight="700">
        ⚡ 컴포지터 스레드 + GPU — 메인 스레드와 독립, JS가 바빠도 60fps
      </text>
      <g className="text-accent">
        <rect x="24" y="196" width="712" height="110" rx="12" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" />
      </g>

      {/* transform·opacity 우회 화살표 */}
      <text x="150" y="240" textAnchor="middle" className="fill-accent" fontSize="11" fontWeight="700" fontFamily="monospace">
        transform · opacity
      </text>
      <g className="text-accent">
        <line x1="44" y1="256" x2="486" y2="256" stroke="currentColor" strokeWidth="2.4" markerEnd="url(#ct-arrow)" />
      </g>
      <text x="150" y="274" textAnchor="middle" className="fill-muted-foreground" fontSize="9.5">
        Style·Layout·Paint 건너뜀
      </text>

      {/* Composite 박스 */}
      <g className="text-accent">
        <rect x="490" y="226" width="120" height="56" rx="10" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.8" />
      </g>
      <text x="550" y="251" textAnchor="middle" className="fill-foreground" fontSize="12.5" fontWeight="700">
        Composite
      </text>
      <text x="550" y="267" textAnchor="middle" className="fill-muted-foreground" fontSize="9">
        레이어 합성
      </text>

      {/* 레이어 텍스처 썸네일 */}
      <g className="text-accent">
        <rect x="648" y="222" width="56" height="40" rx="5" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" />
        <rect x="640" y="230" width="56" height="40" rx="5" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.2" />
        <rect x="632" y="238" width="56" height="40" rx="5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.4" />
      </g>
      <text x="660" y="294" textAnchor="middle" className="fill-muted-foreground" fontSize="8.5">
        GPU 레이어 텍스처
      </text>

      {/* will-change 주석 */}
      <text x="408" y="298" textAnchor="middle" className="fill-muted-foreground" fontSize="9.5">
        will-change → 레이어를 미리 승격해 첫 프레임 jank 제거
      </text>

      {/* ── 하단 핵심 ── */}
      <g className="text-accent">
        <rect x="24" y="326" width="712" height="40" rx="10" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
      </g>
      <text x="380" y="351" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
        핵심은 GPU라서 빠른 게 아니라, 메인 스레드 경합에서 벗어나기 때문이다
      </text>
    </svg>
  );
}
