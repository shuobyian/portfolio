import Link from "next/link";

const results = [
  { label: "전환 기간", value: "약 4주" },
  { label: "전환 컴포넌트", value: "약 40종" },
  { label: "화면별 회귀 결함", value: "0건" },
  { label: "화면당 수정 범위", value: "약 50% 축소" },
];

function PilotRiskTimingDiagram() {
  return (
    <svg
      viewBox="0 0 820 380"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="리스크 발견 시점 비교 — 검증 없이 신규 프로젝트에 바로 적용하면 문제가 신규 프로젝트 한복판에서 드러나고, 운영 중인 백오피스에서 먼저 검증하면 파일럿 단계에서 드러난다"
    >
      <defs>
        <marker
          id="br-pilot-arrow"
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

      <text x="410" y="28" textAnchor="middle" className="fill-foreground" fontSize="14" fontWeight="600">
        같은 리스크라도 언제 만나느냐가 비용을 정한다
      </text>

      {/* 경로 A */}
      <text x="70" y="66" className="fill-muted-foreground" fontSize="12" fontWeight="600">
        검증 없이 바로 적용했다면
      </text>

      <g className="text-foreground">
        <rect x="70" y="80" width="220" height="52" rx="9" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      </g>
      <text x="180" y="102" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
        신규 BI 프로젝트 착수
      </text>
      <text x="180" y="120" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        Antd 처음 써보며 진행
      </text>

      <g className="text-muted-foreground">
        <line x1="290" y1="106" x2="340" y2="106" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#br-pilot-arrow)" />
      </g>

      <g className="text-foreground">
        <rect x="340" y="80" width="220" height="52" rx="9" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="5 4" />
      </g>
      <text x="450" y="102" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
        한복판에서 문제 발견
      </text>
      <text x="450" y="120" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        정체성 적용 한계 · 워크플로우 마찰
      </text>

      <g className="text-muted-foreground">
        <line x1="560" y1="106" x2="610" y2="106" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#br-pilot-arrow)" />
      </g>

      <g className="text-foreground">
        <rect x="610" y="80" width="140" height="52" rx="9" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="5 4" />
      </g>
      <text x="680" y="102" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
        되돌리기 비쌈
      </text>
      <text x="680" y="120" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        이미 쌓인 화면들
      </text>

      <g className="text-foreground">
        <line x1="70" y1="164" x2="750" y2="164" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
      </g>

      {/* 경로 B */}
      <text x="70" y="196" className="fill-accent" fontSize="12" fontWeight="600">
        실제로 택한 경로 — 운영 중인 곳에서 먼저
      </text>

      <g className="text-accent">
        <rect x="70" y="210" width="220" height="52" rx="9" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      </g>
      <text x="180" y="232" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
        운영 백오피스에서 파일럿
      </text>
      <text x="180" y="250" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        요구사항이 이미 확정된 화면들
      </text>

      <g className="text-accent">
        <line x1="290" y1="236" x2="340" y2="236" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#br-pilot-arrow)" />
      </g>

      <g className="text-accent">
        <rect x="340" y="210" width="220" height="52" rx="9" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      </g>
      <text x="450" y="232" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
        파일럿에서 문제 발견
      </text>
      <text x="450" y="250" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        변환 가이드로 흡수
      </text>

      <g className="text-accent">
        <line x1="560" y1="236" x2="610" y2="236" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#br-pilot-arrow)" />
      </g>

      <g className="text-accent">
        <rect x="610" y="210" width="140" height="52" rx="9" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      </g>
      <text x="680" y="232" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
        신규는 검증 후
      </text>
      <text x="680" y="250" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        시작
      </text>

      <g className="text-foreground">
        <rect x="70" y="292" width="680" height="52" rx="10" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="5 4" />
      </g>
      <text x="410" y="314" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
        파일럿 대상으로 운영 중인 서비스를 고른 게 핵심이다
      </text>
      <text x="410" y="332" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        요구사항이 확정돼 있어 &quot;기능이 바뀐 건지 전환이 깨진 건지&quot;를 구분할 수 있다
      </text>
    </svg>
  );
}

function TokenMappingDiagram() {
  return (
    <svg
      viewBox="0 0 820 330"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="토큰 매핑 변환 가이드 — 자체 디자인 시스템의 토큰을 Antd 컴포넌트의 props와 테마로 옮기는 규칙을 한 번 정의해 화면마다 즉흥 변환하는 것을 막는다"
    >
      <defs>
        <marker
          id="br-map-arrow"
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

      <text x="410" y="28" textAnchor="middle" className="fill-foreground" fontSize="14" fontWeight="600">
        변환 규칙을 한 번 정의하면 화면은 그것을 따르기만 한다
      </text>

      <g className="text-foreground">
        <rect x="50" y="70" width="200" height="120" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      </g>
      <text x="150" y="96" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        자체 디자인 시스템
      </text>
      <text x="150" y="122" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        색상 · 타이포 · 간격
      </text>
      <text x="150" y="140" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        CSS Variables 토큰
      </text>
      <text x="150" y="166" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        컴포넌트 약 40종
      </text>

      <g className="text-accent">
        <line x1="250" y1="130" x2="310" y2="130" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#br-map-arrow)" />
      </g>

      <g className="text-accent">
        <rect x="310" y="70" width="200" height="120" rx="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      </g>
      <text x="410" y="96" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        변환 가이드
      </text>
      <text x="410" y="122" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        토큰 → Antd props
      </text>
      <text x="410" y="140" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        토큰 → Antd 테마
      </text>
      <text x="410" y="166" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        한 번 정의 · 전 화면 공유
      </text>

      <g className="text-accent">
        <line x1="510" y1="130" x2="570" y2="130" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#br-map-arrow)" />
      </g>

      <g className="text-foreground">
        <rect x="570" y="70" width="200" height="120" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      </g>
      <text x="670" y="96" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        Antd 기반 시스템
      </text>
      <text x="670" y="122" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        사내 정체성 유지
      </text>
      <text x="670" y="140" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        컴포넌트 단위 교체
      </text>
      <text x="670" y="166" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        무중단 점진 전환
      </text>

      <g className="text-foreground">
        <rect x="50" y="218" width="720" height="56" rx="10" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="5 4" />
      </g>
      <text x="410" y="242" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
        가이드가 없으면 화면마다 각자 변환한다
      </text>
      <text x="410" y="260" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        같은 회색이 화면마다 다른 값이 되고, 전환이 끝난 뒤에 그 차이를 되돌리는 비용이 남는다
      </text>

      <text x="410" y="308" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        화면당 평균 수정 범위 약 50% 축소 · 화면별 회귀 결함 0건
      </text>
    </svg>
  );
}

export function BackofficeRefactorDeepDive() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <h2 className="text-2xl font-bold">파일럿 전략 자세히 보기</h2>
      <p className="mt-2 text-muted-foreground">
        새 디자인 시스템을 신규 프로젝트에 바로 넣지 않고 운영 중인 백오피스에서
        먼저 갈아끼운 이유 — 리스크를 어디서 만날지 고른 판단과, 40종을 무중단으로
        옮기기 위해 먼저 만든 것.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {results.map((r) => (
          <div key={r.label} className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-xl font-bold text-accent">{r.value}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {r.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-border p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          1. 리스크를 어디서 만날지 고른다
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          차기{" "}
          <Link href="/projects/bi-service" className="text-accent underline-offset-2 hover:underline">
            BI 서비스
          </Link>
          에 Antd 도입이 결정된 상황이었다. 그대로 신규 프로젝트에서 처음 써보면
          라이브러리 부적합이나 사내 정체성 적용 한계 같은 문제가{" "}
          <strong className="text-foreground">
            신규 개발 한복판에서 드러난다.
          </strong>{" "}
          그 시점엔 이미 화면이 쌓여 있어 되돌리기가 비싸다.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          그래서 운영 중인 백오피스를 파일럿으로 삼았다. 요구사항이 이미 확정된
          화면들이라 &ldquo;기능이 바뀐 건지 전환이 깨진 건지&rdquo;를 구분할 수
          있다는 게 결정적이었다 — 신규 개발에서는 이 둘이 섞여서 전환의
          문제인지 판단할 기준 자체가 없다.
        </p>
        <div className="mt-6">
          <PilotRiskTimingDiagram />
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-border p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          2. 옮기기 전에 변환 규칙부터
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          컴포넌트 40종을 하나씩 옮기면서 그때그때 판단하면, 같은 회색이 화면마다
          다른 값이 된다. 전환은 끝나도 정체성은 흩어지고, 그 차이를 되돌리는
          비용이 뒤에 남는다. 그래서 기존 토큰을 Antd의 props·테마로 옮기는
          변환 가이드를 먼저 정의하고, 화면 작업은 그 규칙을 따르기만 하도록
          했다.
        </p>
        <div className="mt-6">
          <TokenMappingDiagram />
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          3. 파일럿이 넘긴 것
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          4주간 40종을 무중단으로 옮기며 화면별 회귀 결함 0건으로 마쳤다. 다만
          이 프로젝트의 산출물은 전환된 백오피스 그 자체가 아니라{" "}
          <strong className="text-foreground">
            신규 프로젝트가 물려받은 자산
          </strong>
          이다 — 토큰 매핑 규칙, 컴포넌트 사용 패턴, 그리고 &ldquo;Antd로
          사내 정체성이 표현된다&rdquo;는 확인된 사실.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          → 이 자산이 BI 서비스의 화면 초기 셋업에 그대로 쓰였다. 전체 흐름은{" "}
          <Link href="/stories/design-system" className="text-accent underline-offset-2 hover:underline">
            디자인 시스템 스토리
          </Link>
          에 정리해 뒀다.
        </p>
      </div>
    </div>
  );
}
