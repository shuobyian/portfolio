export function ClosureDefinitionDiagram() {
  return (
    <svg
      viewBox="0 0 760 420"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="클로저의 구조 — 전역 렉시컬 환경 안에 makeCounter 환경이 있고, 그 안의 count 변수를 반환된 함수(클로저)가 스코프 체인으로 참조한다. 그래서 makeCounter가 끝나도 count가 살아남는다."
    >
      <defs>
        <marker
          id="cd-arrow"
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

      {/* 전역 렉시컬 환경 */}
      <g className="text-muted-foreground">
        <rect
          x="24"
          y="20"
          width="712"
          height="384"
          rx="14"
          fill="currentColor"
          fillOpacity="0.03"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeDasharray="6 5"
        />
      </g>
      <text x="44" y="46" className="fill-foreground" fontSize="13" fontWeight="700">
        전역 렉시컬 환경
      </text>
      <text
        x="44"
        y="70"
        className="fill-muted-foreground"
        fontSize="12"
        fontFamily="monospace"
      >
        const counter = makeCounter();
      </text>

      {/* makeCounter 환경 */}
      <g className="text-accent">
        <rect
          x="60"
          y="90"
          width="640"
          height="298"
          rx="12"
          fill="currentColor"
          fillOpacity="0.06"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </g>
      <text x="84" y="120" className="fill-foreground" fontSize="14" fontWeight="700">
        makeCounter() 렉시컬 환경
      </text>

      {/* count 변수 chip */}
      <g className="text-accent">
        <rect
          x="84"
          y="138"
          width="172"
          height="40"
          rx="20"
          fill="currentColor"
          fillOpacity="0.16"
        />
      </g>
      <text
        x="170"
        y="163"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="13"
        fontFamily="monospace"
        fontWeight="700"
      >
        count = 0
      </text>
      <text x="274" y="163" className="fill-muted-foreground" fontSize="11.5">
        ← 캡처되는 변수
      </text>

      {/* 반환된 함수 = 클로저 */}
      <g className="text-accent">
        <rect
          x="84"
          y="212"
          width="592"
          height="150"
          rx="10"
          fill="currentColor"
          fillOpacity="0.04"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeDasharray="6 4"
        />
      </g>
      <text x="104" y="240" className="fill-foreground" fontSize="13.5" fontWeight="700">
        반환된 함수 — 이게 클로저
      </text>
      <text
        x="380"
        y="280"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="14"
        fontFamily="monospace"
      >
        function () &#123; return ++count; &#125;
      </text>
      <text
        x="380"
        y="312"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11.5"
      >
        함수 + [[Environment]] (바깥 렉시컬 환경에 대한 참조)
      </text>
      <text
        x="380"
        y="332"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11.5"
      >
        → makeCounter가 끝나도 count를 계속 참조한다
      </text>

      {/* 스코프 체인 화살표: 클로저 → count */}
      <g className="text-accent">
        <line
          x1="150"
          y1="212"
          x2="150"
          y2="182"
          stroke="currentColor"
          strokeWidth="2.2"
          markerEnd="url(#cd-arrow)"
        />
      </g>
      <text x="166" y="202" className="fill-muted-foreground" fontSize="10.5" fontWeight="600">
        스코프 체인으로 참조
      </text>
    </svg>
  );
}
