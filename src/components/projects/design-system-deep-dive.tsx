import Link from "next/link";

const selectionCriteria = [
  {
    axis: "컴포넌트 풍부도",
    why: "사내 프로젝트는 백오피스 비중이 높다. 테이블·폼·모달처럼 운영 화면이 매일 쓰는 부품이 기본으로 갖춰져 있어야 0에서 만드는 시간이 줄어든다.",
  },
  {
    axis: "디자인 커스터마이징 용이성",
    why: "기본 스타일을 그대로 쓸 게 아니라 사내 정체성을 입혀야 했다. 라이브러리 내부를 뜯지 않고 위에서 덮을 수 있는 구조인지가 관건이었다.",
  },
  {
    axis: "반응형 그리드 성숙도",
    why: "화면 밀도가 높은 운영툴은 레이아웃이 곧 사용성이다. 그리드를 직접 만들면 프로젝트마다 규칙이 갈린다.",
  },
];

function TokenLayerDiagram() {
  return (
    <svg
      viewBox="0 0 820 420"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="토큰 레이어 구조 — 컴포넌트는 토큰 이름만 참조하고, 라이트와 다크 테마는 토큰 레이어에서 값만 갈린다. 그 아래에 Bootstrap 기본 스타일이 있다"
    >
      <defs>
        <marker
          id="ds-token-arrow"
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
        테마가 갈리는 지점을 한 층에 가둔다
      </text>

      {/* 컴포넌트 층 */}
      <g className="text-foreground">
        <rect
          x="120"
          y="52"
          width="580"
          height="70"
          rx="10"
          fill="currentColor"
          fillOpacity="0.05"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
      </g>
      <text x="410" y="76" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        컴포넌트 패키지 (한 벌)
      </text>
      <text x="410" y="96" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        Button · Table · Form · Modal · Layout …
      </text>
      <text x="410" y="112" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        어떤 테마가 켜져 있는지 알지 못한다
      </text>

      <g className="text-accent">
        <line
          x1="410"
          y1="122"
          x2="410"
          y2="156"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#ds-token-arrow)"
        />
      </g>
      <text x="424" y="144" className="fill-muted-foreground" fontSize="10" fontFamily="ui-monospace, monospace">
        var(--surface) 같은 이름만 참조
      </text>

      {/* 토큰 층 */}
      <g className="text-accent">
        <rect
          x="80"
          y="156"
          width="660"
          height="124"
          rx="12"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>
      <text x="410" y="180" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        토큰 레이어 (CSS Variables)
      </text>
      <text x="410" y="198" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        색상 · 타이포 · 간격 · 레이아웃을 단일 이름 집합으로 정의
      </text>

      <g className="text-foreground">
        <rect
          x="112"
          y="210"
          width="284"
          height="54"
          rx="8"
          fill="currentColor"
          fillOpacity="0.06"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.25"
        />
        <rect
          x="424"
          y="210"
          width="284"
          height="54"
          rx="8"
          fill="currentColor"
          fillOpacity="0.06"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.25"
        />
      </g>
      <text x="254" y="230" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
        라이트 테마 값
      </text>
      <text x="254" y="250" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        같은 토큰 이름 · 다른 값
      </text>
      <text x="566" y="230" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
        다크 테마 값
      </text>
      <text x="566" y="250" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        같은 토큰 이름 · 다른 값
      </text>

      <g className="text-accent">
        <line
          x1="410"
          y1="280"
          x2="410"
          y2="314"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#ds-token-arrow)"
        />
      </g>
      <text x="424" y="302" className="fill-muted-foreground" fontSize="10">
        기본 스타일 위에 덮어쓴다
      </text>

      {/* 베이스 층 */}
      <g className="text-foreground">
        <rect
          x="120"
          y="314"
          width="580"
          height="52"
          rx="10"
          fill="currentColor"
          fillOpacity="0.05"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
      </g>
      <text x="410" y="337" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        Bootstrap 기본 스타일
      </text>
      <text x="410" y="355" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        내부를 수정하지 않는다 — 업그레이드 경로를 남겨둔다
      </text>

      <text x="410" y="398" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        테마를 바꾸는 일 = 토큰 값 교체 한 번. 컴포넌트 코드는 건드리지 않는다
      </text>
    </svg>
  );
}

function PackageIndependenceDiagram() {
  return (
    <svg
      viewBox="0 0 820 340"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="모노레포 패키지 분리 구조 — 컴포넌트를 단위 패키지로 나눠 배포하면 각 프로젝트가 필요한 패키지를 원하는 버전으로 골라 쓴다"
    >
      <defs>
        <marker
          id="ds-pkg-arrow"
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
        한 컴포넌트의 수정이 다른 프로젝트의 배포를 강제하지 않는다
      </text>

      {/* 모노레포 */}
      <g className="text-foreground">
        <rect
          x="50"
          y="58"
          width="300"
          height="200"
          rx="12"
          fill="currentColor"
          fillOpacity="0.03"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
      </g>
      <text x="66" y="80" className="fill-foreground" fontSize="12" fontWeight="600">
        디자인 시스템 Monorepo
      </text>

      {[
        { label: "tokens", y: 94 },
        { label: "components/button", y: 132 },
        { label: "components/table", y: 170 },
        { label: "components/form …", y: 208 },
      ].map((pkg, i) => (
        <g key={pkg.label}>
          <g className={i === 0 ? "text-accent" : "text-foreground"}>
            <rect
              x="70"
              y={pkg.y}
              width="260"
              height="30"
              rx="7"
              fill="currentColor"
              fillOpacity={i === 0 ? 0.12 : 0.06}
              stroke="currentColor"
              strokeOpacity={i === 0 ? 1 : 0.4}
              strokeWidth="1.25"
            />
          </g>
          <text
            x="86"
            y={pkg.y + 20}
            className="fill-foreground"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
          >
            {pkg.label}
          </text>
          <text x="316" y={pkg.y + 20} textAnchor="end" className="fill-muted-foreground" fontSize="10">
            독립 버전
          </text>
        </g>
      ))}

      <g className="text-accent">
        <line
          x1="350"
          y1="158"
          x2="440"
          y2="158"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#ds-pkg-arrow)"
        />
      </g>
      <text x="395" y="148" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        npm 배포
      </text>

      {/* 소비 프로젝트 */}
      {[
        { name: "사내 백오피스", note: "첫 적용 — 운영 환경에서 검증", y: 78, accent: true },
        { name: "이후 신규 프로젝트", note: "검증된 구조를 그대로 재사용", y: 152, accent: false },
        { name: "…", note: "필요한 패키지만 골라 쓴다", y: 226, accent: false },
      ].map((proj) => (
        <g key={proj.name}>
          <g className={proj.accent ? "text-accent" : "text-foreground"}>
            <rect
              x="460"
              y={proj.y}
              width="300"
              height="58"
              rx="10"
              fill="currentColor"
              fillOpacity={proj.accent ? 0.1 : 0.05}
              stroke="currentColor"
              strokeOpacity={proj.accent ? 1 : 0.4}
              strokeWidth="1.5"
            />
          </g>
          <text x="610" y={proj.y + 24} textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
            {proj.name}
          </text>
          <text x="610" y={proj.y + 43} textAnchor="middle" className="fill-muted-foreground" fontSize="10">
            {proj.note}
          </text>
        </g>
      ))}

      <text x="410" y="304" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        토큰 패키지만 올려도 전 프로젝트의 색·간격이 함께 따라온다
      </text>
    </svg>
  );
}

export function DesignSystemDeepDive() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <h2 className="text-2xl font-bold">설계 자세히 보기</h2>
      <p className="mt-2 text-muted-foreground">
        신설 조직이라 참고할 사내 자산이 없었다. 무엇을 기준으로 베이스를 골랐고,
        사내 정체성을 어느 층에 올렸으며, 왜 컴포넌트를 패키지 단위로 쪼갰는지 —
        이후 사내 디자인 시스템 3종의 출발점이 된 결정들.
      </p>

      <div className="mt-8">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          1. 무엇을 기준으로 골랐나
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          &ldquo;요즘 많이 쓰는 것&rdquo;이 아니라 사내 프로젝트가 실제로 그릴
          화면을 기준으로 삼았다. 세 축으로 검토해 Bootstrap을 택했다.
        </p>
        <div className="mt-4 space-y-3">
          {selectionCriteria.map((c, i) => (
            <div
              key={c.axis}
              className="flex items-start gap-4 rounded-lg border border-border bg-background p-5"
            >
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h4 className="font-semibold">{c.axis}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {c.why}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-border p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          2. 정체성은 위에 얹고, 베이스는 건드리지 않는다
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Bootstrap을 그대로 쓰면 사내 정체성이 없고, 내부를 뜯어고치면
          업그레이드 경로가 막힌다. 그래서 사이에 토큰 레이어를 넣었다. 색상·
          타이포·간격·레이아웃을 CSS Variables 단일 이름 집합으로 정의하고,
          컴포넌트는 그 이름만 참조하게 했다.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          이 구조의 값은 다크모드에서 분명해졌다.{" "}
          <strong className="text-foreground">
            테마가 갈리는 지점이 토큰 레이어 한 곳뿐
          </strong>
          이라, 컴포넌트는 지금 어떤 테마가 켜져 있는지 알 필요가 없다. 테마
          대응이 컴포넌트마다 분기문으로 번지지 않는다.
        </p>
        <div className="mt-6">
          <TokenLayerDiagram />
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-border p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          3. 왜 하나의 패키지가 아니라 여러 패키지인가
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          동시에 여러 프로젝트가 굴러가는 환경이었다. 디자인 시스템을 한 덩어리로
          배포하면 버튼 하나를 고쳐도 모든 프로젝트가 같은 버전을 받아야 하고, 그
          순간 &ldquo;업데이트하면 뭐가 깨질지 몰라서&rdquo; 아무도 올리지 않는
          상태가 된다. 그래서 컴포넌트를 Monorepo 안의 단위 패키지로 쪼개 각
          프로젝트가 필요한 것만 원하는 버전으로 가져가게 했다.
        </p>
        <div className="mt-6">
          <PackageIndependenceDiagram />
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          4. 만들고 끝내지 않는다 — 운영에서 검증
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          디자인 시스템은 쓰이기 전까지 가설이다. 그래서 곧바로 사내 표준으로
          선언하지 않고,{" "}
          <Link
            href="/projects/backoffice"
            className="text-accent underline-offset-2 hover:underline"
          >
            사내 백오피스 신규 구축
          </Link>
          에 첫 적용해 실제 운영 화면에서 토큰·컴포넌트 구조를 검증한 뒤 표준
          라인업으로 정착시켰다.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          → 이 프로젝트가 이후 사내 디자인 시스템 3종의 출발점이 됐다. 전체
          흐름은{" "}
          <Link
            href="/stories/design-system"
            className="text-accent underline-offset-2 hover:underline"
          >
            디자인 시스템 스토리
          </Link>
          에 정리해 뒀다.
        </p>
      </div>
    </div>
  );
}
