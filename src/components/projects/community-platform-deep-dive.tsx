const scaleStats = [
  { value: "3년 5개월", unit: "", label: "재직 기간 중 가장 오래 맡은 제품" },
  { value: "500", unit: "개 단지", label: "MAU 10만 규모" },
  { value: "5", unit: "종", label: "예약 도메인 (시간·공간·강좌·숙박·레슨)" },
  { value: "2", unit: "프로덕트", label: "커뮤니티 운영툴 · 파트너스" },
];

const outcomes = [
  { metric: "stale 데이터 노출 이슈", change: "약 90% 감소", from: "상태 소유자 분리" },
  { metric: "배포 후 핫픽스", change: "월 5건 → 1건", from: "Jest + MSW 도입" },
  { metric: "타입 관련 런타임 에러", change: "약 70% 감소", from: "JS → TS 이관" },
  { metric: "창구 생성 포기 사례", change: "약 90% 감소", from: "충돌 자원 모달 역제안" },
];

function StateOwnershipDiagram() {
  return (
    <svg
      viewBox="0 0 820 400"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="상태 소유자 분리 전후 비교 — 이전에는 서버에서 받아온 데이터와 UI 상태가 하나의 Redux store에 함께 있어 stale 데이터가 노출됐고, 이후에는 서버 상태를 React Query가, UI 상태를 Redux가 나눠 소유한다"
    >
      <defs>
        <marker
          id="cp-state-arrow"
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

      <text
        x="410"
        y="26"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="14"
        fontWeight="600"
      >
        같은 store에 있으면 갱신 시점을 정할 수 없다
      </text>

      {/* ── 이전 ── */}
      <text x="205" y="58" textAnchor="middle" className="fill-muted-foreground" fontSize="12" fontWeight="600">
        이전 — 한 store에 함께
      </text>

      <g className="text-foreground">
        <rect
          x="60"
          y="74"
          width="290"
          height="38"
          rx="9"
          fill="currentColor"
          fillOpacity="0.05"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
      </g>
      <text x="205" y="98" textAnchor="middle" className="fill-foreground" fontSize="11">
        예약 · 결제 · 이용권 화면
      </text>

      <g className="text-muted-foreground">
        <line
          x1="205"
          y1="112"
          x2="205"
          y2="140"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#cp-state-arrow)"
        />
      </g>

      <g className="text-foreground">
        <rect
          x="60"
          y="140"
          width="290"
          height="100"
          rx="10"
          fill="currentColor"
          fillOpacity="0.05"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
      </g>
      <text x="205" y="162" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        단일 Redux store
      </text>

      <g className="text-muted-foreground">
        <rect
          x="76"
          y="174"
          width="128"
          height="52"
          rx="7"
          fill="currentColor"
          fillOpacity="0.09"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.25"
        />
        <rect
          x="196"
          y="174"
          width="138"
          height="52"
          rx="7"
          fill="currentColor"
          fillOpacity="0.09"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.25"
        />
      </g>
      <text x="140" y="196" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        서버에서 받은
      </text>
      <text x="140" y="210" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        데이터
      </text>
      <text x="265" y="196" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        UI 상태
      </text>
      <text x="265" y="210" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        (모달·필터·선택)
      </text>

      <g className="text-foreground">
        <rect
          x="60"
          y="262"
          width="290"
          height="58"
          rx="9"
          fill="currentColor"
          fillOpacity="0.04"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
      </g>
      <text x="205" y="284" textAnchor="middle" className="fill-foreground" fontSize="11">
        캐시 정책이 없어 갱신 시점이 화면마다 제각각
      </text>
      <text x="205" y="304" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        → 다른 화면에서 바꾼 값이 stale 상태로 노출
      </text>

      {/* 구분선 */}
      <g className="text-foreground">
        <line
          x1="410"
          y1="66"
          x2="410"
          y2="330"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="1"
        />
      </g>

      {/* ── 이후 ── */}
      <text x="615" y="58" textAnchor="middle" className="fill-muted-foreground" fontSize="12" fontWeight="600">
        이후 — 소유자를 나눔
      </text>

      <g className="text-foreground">
        <rect
          x="470"
          y="74"
          width="290"
          height="38"
          rx="9"
          fill="currentColor"
          fillOpacity="0.05"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
      </g>
      <text x="615" y="98" textAnchor="middle" className="fill-foreground" fontSize="11">
        예약 · 결제 · 이용권 화면
      </text>

      <g className="text-accent">
        <line
          x1="560"
          y1="112"
          x2="536"
          y2="140"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#cp-state-arrow)"
        />
        <line
          x1="670"
          y1="112"
          x2="694"
          y2="140"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#cp-state-arrow)"
        />
      </g>

      <g className="text-accent">
        <rect
          x="470"
          y="140"
          width="138"
          height="100"
          rx="10"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>
      <text x="539" y="164" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        React Query
      </text>
      <text x="539" y="184" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        서버 상태
      </text>
      <text x="539" y="206" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        queryKey 컨벤션
      </text>
      <text x="539" y="221" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        invalidation 규칙
      </text>

      <g className="text-foreground">
        <rect
          x="622"
          y="140"
          width="138"
          height="100"
          rx="10"
          fill="currentColor"
          fillOpacity="0.05"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
      </g>
      <text x="691" y="164" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        Redux
      </text>
      <text x="691" y="184" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        UI 상태
      </text>
      <text x="691" y="206" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        모달 · 필터 · 선택
      </text>
      <text x="691" y="221" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        화면 안에서 끝난다
      </text>

      <g className="text-accent">
        <rect
          x="470"
          y="262"
          width="290"
          height="58"
          rx="9"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>
      <text x="615" y="284" textAnchor="middle" className="fill-foreground" fontSize="11">
        갱신 시점이 규칙으로 고정된다
      </text>
      <text x="615" y="304" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        → stale 데이터 노출 이슈 약 90% 감소
      </text>

      <text x="410" y="362" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        라이브러리를 바꾼 게 아니라 &quot;이 값을 누가 소유하는가&quot;를 정한 작업이다
      </text>
    </svg>
  );
}

function TypeMigrationOrderDiagram() {
  const steps = [
    { n: "1", title: "공통 컴포넌트", sub: "모든 화면이 의존" },
    { n: "2", title: "API · enum · 타입", sub: "도메인 경계를 먼저" },
    { n: "3", title: "화면 이관", sub: "채널 → 판매 → 예약" },
    { n: "4", title: "라우터 · 로그인", sub: "진입점은 마지막" },
  ];

  return (
    <svg
      viewBox="0 0 820 300"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="JS에서 TS로 이관한 순서 — 공통 컴포넌트와 API·enum·타입 레이어를 먼저 옮기고, 채널·판매·예약 화면을 거쳐 라우터·로그인을 마지막에 옮겨 JS/JSX 파일 145개를 4개로 줄였다"
    >
      <defs>
        <marker
          id="cp-mig-arrow"
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

      <text
        x="410"
        y="28"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="14"
        fontWeight="600"
      >
        의존받는 쪽부터 타입을 입힌다
      </text>

      {steps.map((step, i) => {
        const x = 55 + i * 180;
        const accent = i < 2;
        return (
          <g key={step.n}>
            <g className={accent ? "text-accent" : "text-foreground"}>
              <rect
                x={x}
                y="60"
                width="150"
                height="96"
                rx="10"
                fill="currentColor"
                fillOpacity={accent ? 0.1 : 0.05}
                stroke="currentColor"
                strokeOpacity={accent ? 1 : 0.45}
                strokeWidth="1.5"
              />
              <circle cx={x + 24} cy="82" r="12" fill="currentColor" fillOpacity={accent ? 0.9 : 0.15} />
            </g>
            <text
              x={x + 24}
              y="86"
              textAnchor="middle"
              className={accent ? "fill-background" : "fill-foreground"}
              fontSize="11"
              fontWeight="700"
            >
              {step.n}
            </text>
            <text x={x + 75} y="114" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
              {step.title}
            </text>
            <text x={x + 75} y="134" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
              {step.sub}
            </text>

            {i < steps.length - 1 && (
              <g className="text-muted-foreground">
                <line
                  x1={x + 152}
                  y1="108"
                  x2={x + 176}
                  y2="108"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  markerEnd="url(#cp-mig-arrow)"
                />
              </g>
            )}
          </g>
        );
      })}

      <g className="text-foreground">
        <rect
          x="55"
          y="188"
          width="710"
          height="62"
          rx="10"
          fill="currentColor"
          fillOpacity="0.04"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
      </g>
      <text x="410" y="212" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
        순서를 뒤집으면 (화면 먼저) 아직 타입이 없는 API·공통 컴포넌트를 any로 감싸야 한다
      </text>
      <text x="410" y="233" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        의존받는 레이어가 먼저 서 있으면 화면 이관은 이미 정의된 타입을 가져다 쓰는 일이 된다
      </text>

      <text x="410" y="282" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        JS/JSX 파일 145개 → 4개 · 타입 관련 런타임 에러 약 70% 감소
      </text>
    </svg>
  );
}

export function CommunityPlatformDeepDive() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <h2 className="text-2xl font-bold">운영하며 바꾼 것들</h2>
      <p className="mt-2 text-muted-foreground">
        3년 5개월간 굴러가는 제품 위에서 진행한 작업이라, 모든 변경의 전제가
        &ldquo;멈추지 않는다&rdquo;였다. 상태 소유자를 나누고, 타입을 입히고,
        테스트를 처음 들이고, 화면 설계를 역제안하기까지 — 각각을 어떤 순서로
        했는지.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {scaleStats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-2xl font-bold text-accent">
              {stat.value}
              {stat.unit && (
                <span className="ml-1 text-sm font-medium text-muted-foreground">
                  {stat.unit}
                </span>
              )}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-border p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          1. 상태의 소유자를 나눈다
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          서버에서 받아온 데이터와 화면 안에서만 쓰는 UI 상태가 하나의 Redux
          store에 함께 있었다. 문제는 불편함이 아니라{" "}
          <strong className="text-foreground">
            갱신 시점을 정할 수 없다는 것
          </strong>
          이었다. 캐시 정책이라는 개념 자체가 없으니 &ldquo;언제 다시
          받아오는가&rdquo;가 화면마다 제각각이었고, 예약이나 결제처럼 여러
          화면이 같은 데이터를 보는 도메인에서 stale 데이터 노출이 계속 쌓였다.
        </p>
        <div className="mt-6">
          <StateOwnershipDiagram />
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          분리 자체보다 중요한 건 그다음이었다. 운영툴에 React Query를 처음
          들이면서 도메인별 QUERY_KEY 상수 컨벤션을 함께 만들었고, 이후 인증·시설·단지
          같은 다른 도메인도 같은 패턴으로 확장됐다. 규칙이 없으면 같은 문제가
          React Query 안에서 다시 생긴다 — 라이브러리는 캐시를 제공할 뿐 갱신
          시점을 대신 정해주지 않는다. 매장관리 영역은 Redux slice와 MVVM 계층을
          걷어내고 React Query로 옮겨 202개 파일에서 약 4천 줄을 덜어냈다.
        </p>
      </div>

      <div className="mt-8 rounded-lg border border-border p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          2. 멈추지 않고 타입을 입힌다
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          컨시어지 운영툴(현 파트너스)을 JS에서 TS로 옮기는 작업이었다. 도메인
          간 결합이 강해서 화면부터 바꾸면 아직 타입이 없는 API와 공통 컴포넌트를
          매번 any로 감싸야 했다. 그래서 순서를 정했다 —{" "}
          <strong className="text-foreground">의존받는 쪽을 먼저 세운다.</strong>
        </p>
        <div className="mt-6">
          <TypeMigrationOrderDiagram />
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          같은 운영툴의 MUI → Ant Design 전환은 반대로 예약·판매·채널·로그인
          4개 메뉴 단위 PR로 나눴다. 화면 라이브러리 교체는 메뉴끼리 서로 의존하지
          않아서, 운영 중인 화면을 메뉴별로 검증하며 바꾸고 마지막 단계에서 MUI
          패키지를 걷어냈다.
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          3. 팀의 첫 테스트 체계
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          운영툴에 프론트엔드 테스트가 한 줄도 없던 상태에서 Jest + MSW 환경을
          처음 구성했다. 커버리지를 목표로 잡는 대신{" "}
          <strong className="text-foreground">
            따라 쓸 수 있는 본보기부터
          </strong>{" "}
          — 매장 옵션 CRUD 화면으로 목 API와 테스트 구조를 먼저 세우고 예약
          화면으로 넓혔다. antd Select처럼 테스트하기 까다로운 컴포넌트용 유틸도
          함께 만들었다. 테스트가 없던 팀에서 전면 도입을 선언하면 대개 아무도
          쓰지 않게 되고, 바로 복사해 쓸 수 있는 예시가 있어야 다음 사람이 따라
          쓴다.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {outcomes.map((o) => (
            <div
              key={o.metric}
              className="rounded-lg border border-border bg-background p-5"
            >
              <p className="text-sm text-muted-foreground">{o.metric}</p>
              <p className="mt-1 text-lg font-semibold text-accent">{o.change}</p>
              <p className="mt-2 text-xs text-muted-foreground">← {o.from}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          4. 에러를 띄우는 대신 다음 행동을 준다
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          예약 창구를 만들 때 이미 잡힌 자원과 겹치면{" "}
          <strong className="text-foreground">
            &ldquo;중복된 예약이 있습니다&rdquo; 한 줄
          </strong>
          만 떴다. 운영팀 입장에서는 무엇과 겹쳤는지 모르니 하나씩 지워보다
          포기하는 일이 잦았다. 검증 로직은 이미 충돌한 자원을 알고 있는데 화면이
          그걸 버리고 있던 셈이다.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          그래서 단일 에러 대신{" "}
          <strong className="text-foreground">충돌 자원 목록을 띄우는 모달</strong>
          을 기획·디자인에 역제안해 반영했다. 운영팀이 무엇과 겹쳤는지 즉시 보고
          바로 재배정할 수 있게 되면서 창구 생성 포기 사례가 약 90% 줄었다.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          → 같은 맥락에서 예약 시간 설정 화면도 정보 그룹 단위 박스 처리와 배치
          재구성을 역제안했다. 고객사가 직접 설정하다 막히던 화면이라, 기능을
          더하는 것보다 이미 있는 정보를 다시 묶는 편이 빨랐다.
        </p>
      </div>
    </div>
  );
}
