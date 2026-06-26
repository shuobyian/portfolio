export function ScriptLoadingDiagram() {
  return (
    <svg
      viewBox="0 0 760 300"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="스크립트 로딩 타임라인 — 일반 script는 다운로드·실행 동안 파싱을 멈춘다. async는 병렬 다운로드 후 받는 즉시 실행해 파싱을 잠깐 끊고 순서를 보장하지 않는다. defer는 병렬 다운로드 후 파싱이 끝난 뒤 순서대로 실행한다."
    >
      {/* ── 일반 ── */}
      <text x="20" y="58" className="fill-foreground" fontSize="12" fontWeight="700">
        일반
      </text>
      <text x="20" y="73" className="fill-muted-foreground" fontSize="9.5">
        &lt;script&gt;
      </text>
      <g className="text-muted-foreground">
        <rect x="110" y="48" width="130" height="32" rx="6" fill="currentColor" fillOpacity="0.12" />
      </g>
      <text x="175" y="68" textAnchor="middle" className="fill-foreground" fontSize="11">파싱</text>
      <g className="text-accent">
        <rect x="240" y="48" width="180" height="32" rx="6" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.4" strokeDasharray="5 3" />
      </g>
      <text x="330" y="68" textAnchor="middle" className="fill-foreground" fontSize="10.5" fontWeight="600">🔴 다운로드+실행 (멈춤)</text>
      <g className="text-muted-foreground">
        <rect x="420" y="48" width="220" height="32" rx="6" fill="currentColor" fillOpacity="0.12" />
      </g>
      <text x="530" y="68" textAnchor="middle" className="fill-foreground" fontSize="11">파싱</text>

      {/* ── async ── */}
      <text x="20" y="150" className="fill-foreground" fontSize="12" fontWeight="700">async</text>
      {/* 병렬 다운로드 바 */}
      <g className="text-accent">
        <rect x="110" y="126" width="200" height="9" rx="4.5" fill="currentColor" fillOpacity="0.3" />
      </g>
      <text x="320" y="134" className="fill-muted-foreground" fontSize="9">다운로드(병렬)</text>
      {/* 파싱 + 실행 */}
      <g className="text-muted-foreground">
        <rect x="110" y="142" width="200" height="32" rx="6" fill="currentColor" fillOpacity="0.12" />
      </g>
      <text x="210" y="162" textAnchor="middle" className="fill-foreground" fontSize="11">파싱</text>
      <g className="text-accent">
        <rect x="310" y="142" width="78" height="32" rx="6" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.4" />
      </g>
      <text x="349" y="162" textAnchor="middle" className="fill-foreground" fontSize="10.5" fontWeight="700">🟡 실행</text>
      <g className="text-muted-foreground">
        <rect x="388" y="142" width="252" height="32" rx="6" fill="currentColor" fillOpacity="0.12" />
      </g>
      <text x="514" y="162" textAnchor="middle" className="fill-foreground" fontSize="11">파싱</text>
      <text x="349" y="190" textAnchor="middle" className="fill-muted-foreground" fontSize="9.5">받는 즉시 · 순서 X</text>

      {/* ── defer ── */}
      <text x="20" y="244" className="fill-foreground" fontSize="12" fontWeight="700">defer</text>
      <g className="text-accent">
        <rect x="110" y="220" width="200" height="9" rx="4.5" fill="currentColor" fillOpacity="0.3" />
      </g>
      <text x="320" y="228" className="fill-muted-foreground" fontSize="9">다운로드(병렬)</text>
      <g className="text-muted-foreground">
        <rect x="110" y="236" width="420" height="32" rx="6" fill="currentColor" fillOpacity="0.12" />
      </g>
      <text x="320" y="256" textAnchor="middle" className="fill-foreground" fontSize="11">파싱</text>
      <line x1="532" y1="232" x2="532" y2="272" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 3" />
      <g className="text-accent">
        <rect x="536" y="236" width="104" height="32" rx="6" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.4" />
      </g>
      <text x="588" y="256" textAnchor="middle" className="fill-foreground" fontSize="10.5" fontWeight="700">🟢 실행</text>
      <text x="588" y="284" textAnchor="middle" className="fill-muted-foreground" fontSize="9.5">파싱 후 · 순서대로</text>
    </svg>
  );
}
