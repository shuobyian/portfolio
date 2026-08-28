import Link from "next/link";

const constraints = [
  {
    rank: "1순위",
    title: "전환 일정",
    detail:
      "백엔드 JSP→Spring 전환과 같은 일정 안에서 안정화해야 했다. 프론트가 늦으면 백엔드 전환 전체가 묶인다.",
    accent: true,
  },
  {
    rank: "2순위",
    title: "SSR 라우팅 제약",
    detail:
      "라우팅을 서버가 소유하는 구조라 클라이언트 라우터를 얹을 수 없었다. 이 구조 자체는 변경 대상이 아니었다.",
    accent: false,
  },
  {
    rank: "3순위",
    title: "운영 인력의 기술 폭",
    detail:
      "인수인계 후 장기 유지보수를 맡을 인력이 다룰 수 있는 범위여야 했다. 내가 떠난 뒤에도 고쳐져야 한다.",
    accent: false,
  },
];

function SelfBuiltModulesDiagram() {
  return (
    <svg
      viewBox="0 0 820 370"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="자체 구현 모듈 구조 — 서버가 그린 HTML이 도착하면 진입점 모듈이 현재 화면을 판별해 해당 화면 모듈을 초기화하고, 그 안에서 상태 컨테이너와 이벤트 위임이 동작한다"
    >
      <defs>
        <marker
          id="pb-mod-arrow"
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
        프레임워크가 해주던 일을 세 조각으로 나눠 직접 만든다
      </text>

      <g className="text-foreground">
        <rect x="250" y="52" width="320" height="46" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      </g>
      <text x="410" y="72" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        서버가 그린 HTML 도착
      </text>
      <text x="410" y="89" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        라우팅은 서버가 소유 — 건드리지 않는다
      </text>

      <g className="text-accent">
        <line x1="410" y1="98" x2="410" y2="128" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#pb-mod-arrow)" />
      </g>

      <g className="text-accent">
        <rect x="250" y="128" width="320" height="52" rx="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      </g>
      <text x="410" y="150" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        ① 라우팅 진입점
      </text>
      <text x="410" y="168" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        현재 화면을 판별해 해당 화면 스크립트만 초기화
      </text>

      <g className="text-accent">
        <line x1="340" y1="180" x2="250" y2="216" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#pb-mod-arrow)" />
        <line x1="480" y1="180" x2="570" y2="216" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#pb-mod-arrow)" />
      </g>

      <g className="text-foreground">
        <rect x="80" y="216" width="290" height="86" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
        <rect x="450" y="216" width="290" height="86" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      </g>
      <text x="225" y="240" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        ② 상태 컨테이너
      </text>
      <text x="225" y="260" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        화면이 쓰는 값을 한곳에 모은다
      </text>
      <text x="225" y="278" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        DOM에 흩어진 값을 읽어오지 않는다
      </text>

      <text x="595" y="240" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        ③ 이벤트 위임
      </text>
      <text x="595" y="260" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        컨테이너 한 곳에서 하위 이벤트를 받는다
      </text>
      <text x="595" y="278" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        나중에 그려진 행도 그대로 동작
      </text>

      <text x="410" y="340" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        세 모듈은 규칙일 뿐 라이브러리가 아니다 — 읽을 코드가 늘지 않는 게 요건이었다
      </text>
    </svg>
  );
}

function EventDelegationDiagram() {
  return (
    <svg
      viewBox="0 0 820 340"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="개별 바인딩과 이벤트 위임 비교 — 개별 바인딩은 나중에 추가된 행에 리스너가 없어 동작하지 않고, 위임은 컨테이너 한 곳에서 받으므로 추가된 행도 동작한다"
    >
      <defs>
        <marker
          id="pb-evt-arrow"
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

      <text x="410" y="26" textAnchor="middle" className="fill-foreground" fontSize="14" fontWeight="600">
        서버가 다시 그린 DOM에서도 살아남아야 한다
      </text>

      <text x="205" y="56" textAnchor="middle" className="fill-muted-foreground" fontSize="12" fontWeight="600">
        요소마다 리스너를 붙이면
      </text>
      <text x="615" y="56" textAnchor="middle" className="fill-muted-foreground" fontSize="12" fontWeight="600">
        컨테이너 한 곳에서 받으면
      </text>

      {[0, 1].map((side) => {
        const ox = side === 0 ? 60 : 470;
        const delegated = side === 1;
        return (
          <g key={side}>
            <g className={delegated ? "text-accent" : "text-foreground"}>
              <rect x={ox} y="72" width="290" height="176" rx="10" fill="currentColor" fillOpacity={delegated ? 0.07 : 0.04} stroke="currentColor" strokeOpacity={delegated ? 1 : 0.35} strokeWidth="1.5" />
            </g>
            <text x={ox + 145} y="94" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
              목록 컨테이너
            </text>
            {delegated && (
              <>
                <g className="text-accent">
                  <circle cx={ox + 24} cy="90" r="7" fill="currentColor" />
                </g>
                <text x={ox + 24} y="93" textAnchor="middle" className="fill-background" fontSize="8" fontWeight="700">
                  L
                </text>
              </>
            )}

            {[0, 1, 2].map((row) => {
              const y = 106 + row * 44;
              const isNew = row === 2;
              return (
                <g key={row}>
                  <g className="text-foreground">
                    <rect x={ox + 20} y={y} width="250" height="34" rx="7" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity={isNew ? 0.5 : 0.3} strokeWidth="1.25" strokeDasharray={isNew ? "4 3" : undefined} />
                  </g>
                  <text x={ox + 44} y={y + 22} className="fill-muted-foreground" fontSize="10">
                    {isNew ? "나중에 그려진 행" : `행 ${row + 1}`}
                  </text>
                  {!delegated && !isNew && (
                    <>
                      <g className="text-muted-foreground">
                        <circle cx={ox + 250} cy={y + 17} r="7" fill="currentColor" fillOpacity="0.5" />
                      </g>
                      <text x={ox + 250} y={y + 20} textAnchor="middle" className="fill-foreground" fontSize="8" fontWeight="700">
                        L
                      </text>
                    </>
                  )}
                  {!delegated && isNew && (
                    <g className="text-muted-foreground">
                      <line x1={ox + 244} y1={y + 11} x2={ox + 256} y2={y + 23} stroke="currentColor" strokeOpacity="0.75" strokeWidth="1.5" />
                      <line x1={ox + 256} y1={y + 11} x2={ox + 244} y2={y + 23} stroke="currentColor" strokeOpacity="0.75" strokeWidth="1.5" />
                    </g>
                  )}
                  {delegated && (
                    <g className="text-accent">
                      <line x1={ox + 250} y1={y + 17} x2={ox + 30} y2="98" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#pb-evt-arrow)" />
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}

      <text x="205" y="274" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        새로 그려진 행은 리스너가 없어 죽는다
      </text>
      <text x="615" y="274" textAnchor="middle" className="fill-foreground" fontSize="11">
        버블링으로 올라와 그대로 처리된다
      </text>

      <text x="410" y="316" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        SSR이 화면을 다시 그리는 구조라 &quot;붙여둔 리스너&quot;를 전제로 삼을 수 없었다
      </text>
    </svg>
  );
}

export function PharmBridgeDeepDive() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <h2 className="text-2xl font-bold">기술 선택 자세히 보기</h2>
      <p className="mt-2 text-muted-foreground">
        2025년에 Vanilla JS를 고른 이유 — 무엇을 1순위 제약으로 뒀고, 프레임워크
        없이 유지보수 가능한 구조를 어떻게 세웠는지. 그리고 그 선택의 유효기간을
        어떻게 봤는지.
      </p>

      <div className="mt-8">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          1. 제약에 순위를 매긴다
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          제약이 여럿일 때는 전부 만족시키려 하기보다 무엇이 1순위인지 정하는 게
          결정을 만든다. 여기서는 일정이 1순위였다.
        </p>
        <div className="mt-4 space-y-3">
          {constraints.map((c) => (
            <div
              key={c.title}
              className={`flex items-start gap-4 rounded-lg border p-5 ${
                c.accent ? "border-accent bg-accent/5" : "border-border bg-background"
              }`}
            >
              <span
                className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  c.accent
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {c.rank}
              </span>
              <div className="min-w-0">
                <h4 className="font-semibold">{c.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {c.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          → React를 얹으면 구조 설계와 팀 학습 비용이 전환 일정 안에 들어오지
          않는다고 봤다. 기술의 우열이 아니라{" "}
          <strong className="text-foreground">이 일정 안에서의 선택</strong>
          이었다.
        </p>
      </div>

      <div className="mt-8 rounded-lg border border-border p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          2. 프레임워크 없이도 구조는 있어야 한다
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Vanilla JS를 고른다는 건 &ldquo;구조 없이 쓴다&rdquo;가 아니다.
          프레임워크가 대신 해주던 일 중 이 서비스에 반드시 필요한 세 가지만
          골라 직접 만들었다. 라이브러리를 만든 게 아니라{" "}
          <strong className="text-foreground">따라야 할 규칙</strong>을 만든
          것에 가깝다 — 인수인계받을 사람이 읽어야 할 코드가 늘어나면 3순위
          제약을 어기는 셈이라서다.
        </p>
        <div className="mt-6">
          <SelfBuiltModulesDiagram />
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-border p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          3. 이벤트를 어디서 받을 것인가
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          SSR 구조에서는 서버가 화면을 다시 그린다. 요소마다 리스너를 붙여두는
          방식은 새로 그려진 DOM에서 조용히 죽는다 — 에러도 안 나고 그냥 클릭이
          먹지 않는다. 그래서 이벤트를 컨테이너 한 곳에서 받도록 위임 구조를
          기본으로 삼았다.
        </p>
        <div className="mt-6">
          <EventDelegationDiagram />
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          4. 이 선택의 유효기간
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          일정 제약이 사라지면 근거도 사라진다. 실제로 운영이 이어지면서 상태와
          이벤트 결합으로 유지보수 비용이 쌓였고, 약 두 달 뒤{" "}
          <Link
            href="/projects/pharm-bridge-refactor"
            className="text-accent underline-offset-2 hover:underline"
          >
            React Island 패턴으로 부분 전환
          </Link>
          했다. SSR 라우팅 제약(2순위)은 그대로 둔 채 동적 영역만 React가 맡는
          구조다.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          → 되돌아보면 1순위 제약을 지킨 선택이었고, 동시에 오래 갈 선택은
          아니었다. 두 판단이 모순은 아니라고 본다 — 다만 &ldquo;언제 다시
          볼지&rdquo;를 처음부터 적어두는 편이 나았다.
        </p>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-muted/30 p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          5. 디자인 시스템을 따로 판 이유
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          사내에는 이미{" "}
          <Link
            href="/projects/design-system"
            className="text-accent underline-offset-2 hover:underline"
          >
            범용 Monorepo 디자인 시스템
          </Link>
          이 있었지만 이 프로젝트에는 쓰지 않았다. 그쪽은 번들러와 컴포넌트
          모델을 전제로 만들어졌고, 여기는 서버가 HTML을 그리는 환경이다. 억지로
          맞추면 양쪽 다 제약을 지게 된다고 판단해 토큰·컴포넌트를 모두 분리해
          운영했다.
        </p>
      </div>
    </div>
  );
}
