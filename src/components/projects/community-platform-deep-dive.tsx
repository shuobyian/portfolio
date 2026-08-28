const scaleStats = [
  { value: "3년 4개월", unit: "", label: "재직 기간 중 가장 오래 맡은 제품" },
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
      aria-label="상태 소유자 분리 전후 비교 — 이전에는 서버에서 받아온 데이터와 UI 상태가 하나의 Redux store에 함께 있어 stale 데이터가 노출됐고, 이후에는 서버 상태를 React Query가, UI 상태를 Redux와 Recoil이 나눠 소유한다"
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
        Redux · Recoil
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
    { n: "1", title: "인터페이스 정의", sub: "도메인 경계의 타입만 먼저" },
    { n: "2", title: "호출부에 적용", sub: "구현체는 아직 JS" },
    { n: "3", title: "구현체 이관", sub: "한 번에 한 파일" },
    { n: "4", title: "운영 배포", sub: "중단 없음" },
  ];

  return (
    <svg
      viewBox="0 0 820 300"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="JS에서 TS로 무중단 이관하는 순서 — 인터페이스를 먼저 정의하고 호출부에 적용한 뒤 구현체를 파일 단위로 이관해 운영 중단 없이 배포한다"
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
        결합이 강한 영역일수록 타입이 먼저다
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
        순서를 뒤집으면 (구현체 먼저) 그것에 의존하는 화면이 같은 커밋에서 함께 깨진다
      </text>
      <text x="410" y="233" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        타입이 먼저 서 있으면 구현체 이관은 한 파일씩 나눠서, 언제 멈춰도 배포 가능한 상태로 진행된다
      </text>

      <text x="410" y="282" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        핵심 메뉴 4개 영역 · 운영 중단 0회 · 타입 관련 런타임 에러 약 70% 감소
      </text>
    </svg>
  );
}

export function CommunityPlatformDeepDive() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <h2 className="text-2xl font-bold">운영하며 바꾼 것들</h2>
      <p className="mt-2 text-muted-foreground">
        3년 4개월간 굴러가는 제품 위에서 진행한 작업이라, 모든 변경의 전제가
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
          분리 자체보다 오래 걸린 건 그다음이었다. 도메인별 queryKey 컨벤션과
          invalidation 규칙을 문서로 정리해 팀에 전파했다. 규칙이 없으면 같은
          문제가 React Query 안에서 다시 생긴다 — 라이브러리는 캐시를 제공할 뿐
          갱신 시점을 대신 정해주지 않는다.
        </p>
      </div>

      <div className="mt-8 rounded-lg border border-border p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          2. 멈추지 않고 타입을 입힌다
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          파트너스 핵심 메뉴 4개 영역을 JS에서 TS로 옮기는 작업이었다. 운영
          중이라 &ldquo;전부 바꾸고 한 번에 배포&rdquo;는 선택지가 아니었고,
          도메인 간 결합이 강한 구간일수록 파일 하나를 건드리면 연쇄로 깨졌다.
          그래서 순서를 뒤집었다 —{" "}
          <strong className="text-foreground">인터페이스를 먼저 세운다.</strong>
        </p>
        <div className="mt-6">
          <TypeMigrationOrderDiagram />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          3. 팀의 첫 테스트 체계
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          팀에 프론트엔드 테스트가 한 줄도 없던 상태에서 Jest + MSW 도입을
          주도했다. 커버리지를 목표로 잡는 대신{" "}
          <strong className="text-foreground">
            깨지면 가장 아픈 곳부터
          </strong>{" "}
          — 결제와 예약 플로우에 먼저 적용했다. 테스트가 없던 팀에서 전면 도입을
          선언하면 대개 아무도 쓰지 않게 되고, 효용이 즉시 보이는 지점에서
          시작해야 다음 사람이 따라 쓴다.
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
