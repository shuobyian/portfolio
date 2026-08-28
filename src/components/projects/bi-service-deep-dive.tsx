const scaleStats = [
  { value: "2", unit: "프로덕트", label: "서비스 앱 · 어드민 콘솔" },
  { value: "5", unit: "축", label: "통합분석 (출고·채널·지역·시장·제품)" },
  { value: "65", unit: "개", label: "취소 신호를 관통시킨 조회 함수" },
  { value: "~1,000", unit: "케이스", label: "Vitest 195개 파일" },
];

const enforcedRules = [
  {
    rule: "app → features → shared 단방향",
    how: "eslint 경계 규칙",
    why: "shared가 앱 코드를 참조하면 두 앱이 서로에게 묶인다",
  },
  {
    rule: "feature 간 직접 import 금지",
    how: "eslint 경계 규칙 (lint 에러)",
    why: "공유가 필요하면 승격 — 한 앱 안이면 앱 로컬 티어, 두 앱이면 shared",
  },
  {
    rule: "SDK 호출은 데이터 레이어에서만",
    how: "경계 테스트",
    why: "SDK 교체·이름 변경의 파급을 파일 한 줄로 막는다",
  },
  {
    rule: "차트 라이브러리 직접 import 금지",
    how: "eslint + 단일 진입점",
    why: "래퍼를 자체 구현으로 갈아끼워도 화면 코드가 그대로다",
  },
];

function MonorepoBoundaryDiagram() {
  return (
    <svg
      viewBox="0 0 820 400"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="모노레포 의존 경계 — 두 앱이 각자 app → features 계층을 가지고 공유 패키지를 향해 단방향으로 의존하며, 앱 간 참조와 shared의 역방향 참조는 금지된다"
    >
      <defs>
        <marker
          id="bi-mono-arrow"
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
        의존은 아래로만 흐른다
      </text>

      {[
        { x: 60, title: "apps/service", sub: "제약사 사용자용" },
        { x: 450, title: "apps/admin", sub: "사내 운영자용" },
      ].map((app) => (
        <g key={app.title}>
          <g className="text-foreground">
            <rect
              x={app.x}
              y="52"
              width="310"
              height="182"
              rx="12"
              fill="currentColor"
              fillOpacity="0.03"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
          </g>
          <text
            x={app.x + 16}
            y="74"
            className="fill-foreground"
            fontSize="12"
            fontWeight="600"
            fontFamily="ui-monospace, monospace"
          >
            {app.title}
          </text>
          <text x={app.x + 155} y="74" className="fill-muted-foreground" fontSize="11">
            {app.sub}
          </text>

          <g className="text-accent">
            <rect
              x={app.x + 20}
              y="88"
              width="270"
              height="42"
              rx="9"
              fill="currentColor"
              fillOpacity="0.1"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </g>
          <text
            x={app.x + 155}
            y="106"
            textAnchor="middle"
            className="fill-foreground"
            fontSize="12"
            fontWeight="600"
          >
            app — 라우터 · 가드 · 경로
          </text>
          <text
            x={app.x + 155}
            y="122"
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="10"
          >
            앱 셸은 각 앱이 독립 보유
          </text>

          <g className="text-accent">
            <line
              x1={app.x + 155}
              y1="130"
              x2={app.x + 155}
              y2="156"
              stroke="currentColor"
              strokeWidth="1.5"
              markerEnd="url(#bi-mono-arrow)"
            />
          </g>

          <g className="text-foreground">
            <rect
              x={app.x + 20}
              y="156"
              width="270"
              height="60"
              rx="9"
              fill="currentColor"
              fillOpacity="0.05"
              stroke="currentColor"
              strokeOpacity="0.4"
              strokeWidth="1.5"
            />
          </g>
          <text
            x={app.x + 155}
            y="177"
            textAnchor="middle"
            className="fill-foreground"
            fontSize="12"
            fontWeight="600"
          >
            features / _shared
          </text>
          <text
            x={app.x + 155}
            y="196"
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="10"
          >
            도메인별 화면 + 데이터 레이어 3층
          </text>
          <text
            x={app.x + 155}
            y="210"
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            types · api · queries
          </text>
        </g>
      ))}

      {/* 앱 간 참조 금지 */}
      <g className="text-muted-foreground">
        <line
          x1="376"
          y1="143"
          x2="444"
          y2="143"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
        <line
          x1="401"
          y1="134"
          x2="419"
          y2="152"
          stroke="currentColor"
          strokeOpacity="0.75"
          strokeWidth="1.75"
        />
        <line
          x1="419"
          y1="134"
          x2="401"
          y2="152"
          stroke="currentColor"
          strokeOpacity="0.75"
          strokeWidth="1.75"
        />
      </g>
      <text x="410" y="170" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        앱 간 참조
      </text>
      <text x="410" y="183" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        금지
      </text>

      {/* shared로 내려가는 화살표 */}
      <g className="text-accent">
        <line
          x1="215"
          y1="234"
          x2="290"
          y2="286"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#bi-mono-arrow)"
        />
        <line
          x1="605"
          y1="234"
          x2="530"
          y2="286"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#bi-mono-arrow)"
        />
      </g>

      <g className="text-accent">
        <rect
          x="150"
          y="292"
          width="520"
          height="62"
          rx="12"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>
      <text
        x="410"
        y="316"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="12"
        fontWeight="600"
        fontFamily="ui-monospace, monospace"
      >
        packages/shared
      </text>
      <text x="410" y="336" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        인증 · 차트 래퍼 · 계약사/계정 도메인 · 공통 컴포넌트 · 캐시 정책
      </text>

      <text x="410" y="378" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        shared는 앱 코드를 절대 참조하지 않는다 — 역방향은 lint 에러
      </text>
    </svg>
  );
}

function ChartLayerDiagram() {
  return (
    <svg
      viewBox="0 0 820 380"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="차트 레이어 구조 — 화면은 공유 래퍼 6종만 사용하고, 래퍼는 단일 동적 진입점을 통해서만 차트 라이브러리를 로드한다. 화면에서 라이브러리 직접 import는 금지된다"
    >
      <defs>
        <marker
          id="bi-chart-arrow"
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
        화면과 차트 라이브러리 사이에 층을 하나 둔다
      </text>

      <g className="text-foreground">
        <rect
          x="80"
          y="52"
          width="450"
          height="52"
          rx="10"
          fill="currentColor"
          fillOpacity="0.05"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
      </g>
      <text x="305" y="74" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        분석 · 대시보드 화면
      </text>
      <text x="305" y="92" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        데이터와 필드 이름만 넘긴다
      </text>

      <g className="text-accent">
        <line
          x1="305"
          y1="104"
          x2="305"
          y2="136"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#bi-chart-arrow)"
        />
      </g>

      <g className="text-accent">
        <rect
          x="80"
          y="136"
          width="450"
          height="72"
          rx="10"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>
      <text x="305" y="160" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        공유 래퍼 6종
      </text>
      <text
        x="305"
        y="179"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="10"
        fontFamily="ui-monospace, monospace"
      >
        Line · Column · Bar · Area · Pie · ComboTrend
      </text>
      <text x="305" y="196" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        팔레트 · 높이 · 다크모드 · 확대 조작을 여기서 결정
      </text>

      <g className="text-accent">
        <line
          x1="305"
          y1="208"
          x2="305"
          y2="240"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#bi-chart-arrow)"
        />
      </g>

      <g className="text-foreground">
        <rect
          x="80"
          y="240"
          width="450"
          height="52"
          rx="10"
          fill="currentColor"
          fillOpacity="0.05"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
      </g>
      <text x="305" y="262" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        단일 동적 진입점
      </text>
      <text x="305" y="280" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        차트 번들이 초기 로드에 들어가지 않는다
      </text>

      <g className="text-accent">
        <line
          x1="305"
          y1="292"
          x2="305"
          y2="322"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#bi-chart-arrow)"
        />
      </g>

      <g className="text-foreground">
        <rect
          x="80"
          y="322"
          width="450"
          height="42"
          rx="10"
          fill="currentColor"
          fillOpacity="0.05"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
      </g>
      <text x="305" y="348" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        차트 라이브러리 (Antd Charts / AntV G2)
      </text>

      {/* 금지된 우회 경로 */}
      <g className="text-muted-foreground">
        <path
          d="M 530 78 C 660 78 660 343 530 343"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
        <line
          x1="643"
          y1="199"
          x2="669"
          y2="225"
          stroke="currentColor"
          strokeOpacity="0.75"
          strokeWidth="1.75"
        />
        <line
          x1="669"
          y1="199"
          x2="643"
          y2="225"
          stroke="currentColor"
          strokeOpacity="0.75"
          strokeWidth="1.75"
        />
      </g>
      <text x="742" y="196" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        화면에서 라이브러리
      </text>
      <text x="742" y="210" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        직접 import
      </text>
      <text x="742" y="228" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">
        lint 에러
      </text>
    </svg>
  );
}

export function BiServiceDeepDive() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <h2 className="text-2xl font-bold">설계 자세히 보기</h2>
      <p className="mt-2 text-muted-foreground">
        두 프로덕트를 한 저장소에서 굴리기 위해 어떤 경계를 세웠고, 그 경계를
        말이 아니라 도구로 어떻게 강제했는지 — 그리고 라이브러리 한계에 부딪혔을
        때 화면 코드를 지키기 위해 어디를 갈아끼웠는지.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {scaleStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-muted/30 p-4"
          >
            <p className="text-2xl font-bold text-accent">
              {stat.value}
              <span className="ml-1 text-sm font-medium text-muted-foreground">
                {stat.unit}
              </span>
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-border p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          1. 두 프로덕트, 한 저장소
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          제약사 사용자가 쓰는 서비스 앱과 사내 운영자가 쓰는 어드민 콘솔은
          사용자도 권한도 다르지만, 인증·차트·계약사/계정 도메인은 같은 것을
          쓴다. 그래서 공통은 공유 패키지로 올리되{" "}
          <strong className="text-foreground">앱 셸은 각 앱이 독립 보유</strong>
          하도록 나눴다. 라우터·가드·경로를 공유하면 한쪽의 라우팅 변경이 다른
          쪽으로 새는데, 두 앱은 서로의 화면으로 이동할 일이 아예 없다.
        </p>
        <div className="mt-6">
          <MonorepoBoundaryDiagram />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          2. 규약을 문서가 아니라 도구에 둔다
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          경계는 지켜야 지켜진다. &ldquo;이렇게 하기로 했다&rdquo;는 문서는 바쁜
          날 가장 먼저 깨진다. 그래서 지켜야 할 규칙을 전부 lint 에러나 실패하는
          테스트로 바꿨다.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {enforcedRules.map((item) => (
            <div
              key={item.rule}
              className="rounded-lg border border-border bg-background p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-semibold leading-snug">{item.rule}</h4>
                <span className="flex-shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {item.how}
                </span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {item.why}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-border p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          3. 차트를 디자인 시스템 안으로
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          BI 서비스에서 차트는 부속이 아니라 제품 그 자체다. 화면마다 라이브러리를
          직접 부르면 팔레트와 축 설정이 화면 수만큼 갈라진다. 그래서 화면은 공유
          래퍼 6종만 쓰고, 래퍼만 단일 동적 진입점을 통해 라이브러리를 로드한다.
        </p>
        <div className="mt-6">
          <ChartLayerDiagram />
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          4. 이 층이 실제로 값을 한 순간
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          막대와 라인을 하나의 y축에 겹쳐 그려야 하는 화면에서, 라이브러리의
          이중 축 컴포넌트가 자식마다 y 스케일을 독립으로 강제해{" "}
          <strong className="text-foreground">라인이 아예 사라졌다.</strong>{" "}
          옵션으로 우회할 수 없는 구조적 제약이었다.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          그래서 두 마크가 y·color 스케일을 공유하도록 차트 뷰를 직접 조립한
          컴포넌트를 만들어 래퍼를 갈아끼웠다. 화면은 같은 이름의 래퍼에 같은
          props를 넘기고 있었으므로{" "}
          <strong className="text-foreground">사용처 코드는 한 줄도 바뀌지 않았다.</strong>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          → 이 층이 없었다면 같은 수정을 차트를 쓰는 화면 수만큼 반복해야 했다.
          되살아나지 않도록 &ldquo;이중 축 컴포넌트를 다시 쓰지 말 것&rdquo;과
          그 이유를 저장소 규약에 남겼다.
        </p>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-muted/30 p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          5. 사람 리뷰가 없는 환경의 안전망
        </h3>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">
              조회 함수 65개에 취소 신호 관통.
            </strong>{" "}
            화면 이탈·필터 재조회 때 요청이 실제로 끊긴다. 한 번 고치는 것보다
            66번째가 빠지는 걸 막는 게 어려워서, 신호를 넘기지 않은 조회 함수가
            새로 생기면 실패하는 구조 검사 테스트를 함께 뒀다.
          </p>
          <p>
            <strong className="text-foreground">렌더 카운팅 회귀 테스트.</strong>{" "}
            리렌더 횟수가 사실상 계약인 화면은 차트·표를 카운팅 스텁으로 바꿔
            상호작용별 렌더 횟수를 고정했다. 카운트가 늘면 props identity가
            갈렸다는 뜻이라 memo 무력화가 리뷰 없이도 잡힌다.
          </p>
          <p>
            <strong className="text-foreground">계단식 검증 게이트.</strong>{" "}
            바꾼 범위에 따라 타입체크·린트만, 해당 앱 테스트까지, 전체까지를
            나눠 돌린다. 첫 실패에서 멈추고 그 단계 로그만 보여준다.
          </p>
        </div>
      </div>
    </div>
  );
}
