export function InferExtractionDiagram() {
  return (
    <svg
      viewBox="0 0 720 300"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="infer는 패턴 (...args) => infer R 에서 함수의 반환 자리를 R로 추출한다. 입력 () => User의 반환 타입 User가 infer R에 매칭되어 결과 R = User가 된다."
    >
      <defs>
        <marker
          id="infer-arrow"
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

      <text x="360" y="28" textAnchor="middle" className="fill-muted-foreground" fontSize="12">
        infer — 패턴에서 &quot;그 자리의 타입&quot;을 R로 추출한다
      </text>

      {/* 패턴 박스 */}
      <g className="text-muted-foreground">
        <rect x="60" y="50" width="600" height="64" rx="10" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      </g>
      <text x="92" y="88" className="fill-foreground" fontSize="14" fontFamily="monospace">
        (...args: any[]) =&gt;
      </text>
      {/* infer R 칩 */}
      <g className="text-accent">
        <rect x="338" y="66" width="116" height="32" rx="8" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.6" />
      </g>
      <text x="396" y="88" textAnchor="middle" className="fill-foreground" fontSize="14" fontFamily="monospace" fontWeight="700">
        infer R
      </text>
      <text x="470" y="88" className="fill-muted-foreground" fontSize="14" fontFamily="monospace">
        ? R : never
      </text>

      {/* 입력 박스 */}
      <text x="70" y="168" className="fill-muted-foreground" fontSize="11" fontWeight="600">
        입력
      </text>
      <g className="text-muted-foreground">
        <rect x="60" y="176" width="270" height="58" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.4" />
      </g>
      <text x="84" y="211" className="fill-foreground" fontSize="14" fontFamily="monospace">
        () =&gt; <tspan className="fill-accent" fontWeight="700">User</tspan>
      </text>

      {/* 결과 박스 */}
      <text x="410" y="168" className="fill-muted-foreground" fontSize="11" fontWeight="600">
        결과
      </text>
      <g className="text-accent">
        <rect x="400" y="176" width="260" height="58" rx="10" fill="currentColor" fillOpacity="0.09" stroke="currentColor" strokeWidth="1.8" />
      </g>
      <text x="530" y="211" textAnchor="middle" className="fill-foreground" fontSize="14" fontFamily="monospace" fontWeight="700">
        R = User
      </text>

      {/* 화살표: 입력 User → infer R */}
      <g className="text-accent">
        <path d="M 250 176 C 280 150, 330 120, 360 104" fill="none" stroke="currentColor" strokeWidth="2" markerEnd="url(#infer-arrow)" />
      </g>
      <text x="250" y="150" className="fill-muted-foreground" fontSize="10.5" fontWeight="600">
        반환 자리 매칭
      </text>

      {/* 화살표: infer R → 결과 R */}
      <g className="text-accent">
        <path d="M 430 104 C 470 130, 500 152, 520 174" fill="none" stroke="currentColor" strokeWidth="2" markerEnd="url(#infer-arrow)" />
      </g>
      <text x="492" y="150" className="fill-muted-foreground" fontSize="10.5" fontWeight="600">
        R에 담김
      </text>

      {/* 하단 메모 */}
      <g className="text-accent">
        <rect x="60" y="258" width="600" height="30" rx="8" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
      </g>
      <text x="360" y="278" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        ReturnType · Parameters · Awaited 가 모두 이 infer 추출로 만들어진다
      </text>
    </svg>
  );
}
