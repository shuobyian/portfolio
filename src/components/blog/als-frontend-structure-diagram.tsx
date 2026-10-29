type Box = { x: number; y: number; w?: number; name: string; desc: string };

// 박스 기본 크기 196×60. 연결선은 모두 직각(H/V)으로만 꺾는다.
const BOXES: Box[] = [
  { x: 44, y: 108, name: "apps/backoffice", desc: "검수 백오피스 · Emotion" },
  { x: 300, y: 108, name: "apps/pharmscope", desc: "제약사 서비스 · antd" },
  { x: 528, y: 108, name: "apps/pharmscope-admin", desc: "서비스 관리자 · antd" },
  { x: 44, y: 230, name: "packages/design-system", desc: "공통 컴포넌트 35종 · 토큰" },
  { x: 414, y: 230, name: "packages/pharmscope-core", desc: "서비스 공통 UI·스토어" },
  { x: 414, y: 350, name: "packages/core", desc: "UI 없는 유틸·훅" },
  { x: 780, y: 108, name: "als-gantt-chart", desc: "Jira 간트 뷰어 · 단독 앱" },
  { x: 230, y: 533, name: "als-api", desc: "alpha·backoffice API SDK" },
  { x: 480, y: 533, name: "eslint-config-als", desc: "공용 ESLint Flat Config" },
  { x: 760, y: 672, w: 216, name: "als-fe-kit", desc: "git 태그 배포" },
];

// dev: devDependencies·CLI 도구(점선), bus: 화살표 없는 합류선
const EDGES: { d: string; dev?: boolean; bus?: boolean }[] = [
  { d: "M142 168 V229" },
  { d: "M452 168 V198 H572 M572 168 V198", bus: true },
  { d: "M512 198 V229" },
  { d: "M320 168 V380 H413" },
  { d: "M708 168 V380 H611" },
  { d: "M512 290 V349" },
  { d: "M240 138 H262 V532" },
  { d: "M360 440 V532" },
  { d: "M600 460 V532", dev: true },
  { d: "M878 168 V563 H677", dev: true },
  { d: "M760 702 H450 V646", dev: true },
];

const LABELS: { x: number; y: number; text: string; anchor?: "middle" | "end"; mono?: boolean }[] = [
  { x: 298, y: 97, text: "pharmscope 계열 · 백오피스 쪽과 서로 import 안 함" },
  { x: 780, y: 97, text: "별도 저장소" },
  { x: 254, y: 493, text: "backoffice SDK", anchor: "end" },
  { x: 368, y: 485, text: "alpha SDK" },
  { x: 368, y: 501, text: "앱 2개·pharmscope-core·core" },
  { x: 608, y: 485, text: "als-web 루트" },
  { x: 608, y: 501, text: "devDependency", mono: true },
  { x: 870, y: 305, text: "devDependency", anchor: "end", mono: true },
  { x: 605, y: 694, text: "각 저장소 env-install → ca-env 토큰 발급", anchor: "middle" },
  { x: 760, y: 752, text: "als-deps · Jenkins로 @als 버전 drift 검사" },
];

export function AlsFrontendStructureDiagram() {
  return (
    <div className="not-prose my-8 overflow-x-auto">
      <svg
        viewBox="0 0 1000 770"
        className="h-auto w-full min-w-[720px] text-foreground"
        role="img"
        aria-label="als-web 모노레포 안에서 backoffice는 design-system에, pharmscope와 pharmscope-admin은 pharmscope-core와 core에 의존한다. backoffice는 als-api의 backoffice SDK를, pharmscope 계열은 alpha SDK를 쓴다. als-web과 als-gantt-chart는 eslint-config-als를 개발 의존성으로 쓰고, 두 공유 패키지는 CodeArtifact에서 받으며 그 토큰은 als-fe-kit의 ca-env가 발급한다."
      >
        <defs>
          <marker
            id="fs-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-foreground" />
          </marker>
        </defs>

        {/* als-web 모노레포 */}
        <g className="text-accent">
          <rect x="20" y="40" width="728" height="420" rx="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </g>
        <text x="36" y="64" className="fill-accent" fontSize="13" fontWeight="700">
          als-web
          <tspan dx="6" className="fill-muted-foreground" fontSize="11" fontWeight="400">
            pnpm workspace 모노레포 · apps/* · packages/*
          </tspan>
        </text>

        {/* pharmscope 계열 경계 · CodeArtifact 레지스트리 */}
        <g className="text-muted-foreground">
          <rect x="284" y="78" width="456" height="362" rx="8" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 4" />
          <rect x="200" y="515" width="500" height="130" rx="10" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="1" />
        </g>
        <text x="216" y="627" className="fill-foreground" fontSize="13" fontWeight="700">
          CodeArtifact
          <tspan dx="6" className="fill-muted-foreground" fontSize="11" fontWeight="400">
            @als 사설 레지스트리 · 설치에 토큰 필요
          </tspan>
        </text>

        {/* 연결선 */}
        <g className="text-foreground" fill="none" stroke="currentColor" strokeWidth="1.3">
          {EDGES.map((e) => (
            <path
              key={e.d}
              d={e.d}
              strokeDasharray={e.dev ? "5 4" : undefined}
              markerEnd={e.bus ? undefined : "url(#fs-arrow)"}
            />
          ))}
        </g>
        <circle cx="512" cy="198" r="3" className="fill-foreground" />
        <text x="298" y="428" className="fill-muted-foreground" fontSize="11">
          내부 의존은 모두 <tspan className="fill-foreground font-mono">workspace:*</tspan>
        </text>

        {/* 패키지 박스 */}
        {BOXES.map((b) => {
          const w = b.w ?? 196;
          const cx = b.x + w / 2;
          return (
            <g key={b.name}>
              <rect
                x={b.x}
                y={b.y}
                width={w}
                height="60"
                rx="8"
                className="fill-background stroke-foreground"
                strokeOpacity="0.7"
                strokeWidth="1.3"
              />
              <text x={cx} y={b.y + 25} textAnchor="middle" className="fill-foreground font-mono" fontSize="12" fontWeight="600">
                {b.name}
              </text>
              <text x={cx} y={b.y + 44} textAnchor="middle" className="fill-muted-foreground" fontSize="11">
                {b.desc}
              </text>
            </g>
          );
        })}

        {/* 연결선 라벨 */}
        {LABELS.map((l) => (
          <text
            key={l.text + l.x}
            x={l.x}
            y={l.y}
            textAnchor={l.anchor}
            className={l.mono ? "fill-foreground font-mono" : "fill-muted-foreground"}
            fontSize="11"
          >
            {l.text}
          </text>
        ))}

        {/* 범례 */}
        <g className="text-foreground" fill="none" stroke="currentColor" strokeWidth="1.3">
          <path d="M36 682 H66" markerEnd="url(#fs-arrow)" />
          <path d="M36 706 H66" strokeDasharray="5 4" markerEnd="url(#fs-arrow)" />
        </g>
        <text x="78" y="686" className="fill-muted-foreground" fontSize="11">dependencies</text>
        <text x="78" y="710" className="fill-muted-foreground" fontSize="11">devDependencies · CLI 도구</text>
        <text x="36" y="734" className="fill-muted-foreground" fontSize="11">화살표: 의존하는 쪽 → 의존받는 쪽</text>
      </svg>
    </div>
  );
}
