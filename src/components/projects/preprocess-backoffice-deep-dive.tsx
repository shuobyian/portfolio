const scaleStats = [
  { value: "15", unit: "시트", label: "대체한 일일 전처리 리포트 Excel" },
  { value: "474", unit: "건", label: "코드에서 전수 수집한 오류 케이스" },
  { value: "17", unit: "종", label: "규약을 막는 시험" },
  { value: "~1,766", unit: "케이스", label: "node:test 252개 파일" },
];

const stageLabels = [
  {
    stage: "검수",
    detail: "반려 6개 탭 · 직접 입력 · 일괄 채우기 · Excel 붙여넣기",
    kind: "사람의 판정",
  },
  {
    stage: "초안 저장",
    detail: "서버에 남긴다. 아직 아무것도 실행되지 않았다",
    kind: "사람의 판정",
  },
  {
    stage: "서버 미리보기",
    detail: "실재 여부·형식을 서버가 판정해 결과와 ID를 돌려준다",
    kind: "사람의 판정",
  },
  {
    stage: "접수",
    detail: "미리보기 ID + payload 해시 + 멱등키",
    kind: "실제 실행",
  },
  {
    stage: "보정 배치",
    detail: "즉시 실행 또는 야간 처리. 대기·이력을 따로 본다",
    kind: "실제 실행",
  },
  {
    stage: "고객 공개",
    detail: "공개 보류·일정을 거쳐 PharmScope 화면의 데이터가 된다",
    kind: "실제 실행",
  },
];

const conventionChecks = [
  { label: "SDK import 경계", what: "운영 데이터 호출을 데이터 레이어 밖으로 새지 않게" },
  { label: "디자인 토큰 리터럴", what: "척도 밖 값은 같은 줄에 이유를 달아야 통과" },
  { label: "단추 크기·확정 변형", what: "되돌릴 수 없는 전이와 다시 고칠 수 있는 저장을 다른 색으로" },
  { label: "표 마크업", what: "날것 <tr>·<td>와 표 내부 CSS 덮어쓰기 금지" },
  { label: "Emotion 선택자", what: ":has(·:is( 시작 금지 — 부모 클래스에 붙어 범위가 뒤집힌다" },
  { label: "모달 제목 위계", what: "창 제목이 h2이므로 안쪽 구역은 h3부터" },
  { label: "접근성 이름", what: "이름을 가질 수 없는 요소에 aria-label 금지" },
  { label: "터치 영역", what: "작은 조작 요소도 44px까지 넓어지는지" },
  { label: "문구 용어집 대조", what: "코드의 라벨 표와 문구 문서의 행이 값까지 일치하는지" },
];

function StagePipelineDiagram() {
  return (
    <svg
      viewBox="0 0 820 400"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="전처리 단계 분리 — 검수·초안 저장·서버 미리보기는 사람의 판정이고, 접수·보정 배치·고객 공개는 실제 실행이다. 두 묶음 사이에 접수가 경계로 놓인다"
    >
      <defs>
        <marker
          id="pb-stage-arrow"
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
        저장 · 실행 · 공개를 섞지 않는다
      </text>

      {/* 묶음 레이블 */}
      <g className="text-muted-foreground">
        <rect
          x="40"
          y="48"
          width="340"
          height="304"
          rx="12"
          fill="currentColor"
          fillOpacity="0.03"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
        <rect
          x="440"
          y="48"
          width="340"
          height="304"
          rx="12"
          fill="currentColor"
          fillOpacity="0.03"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
      </g>
      <text x="210" y="70" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        사람의 판정 — 되돌릴 수 있다
      </text>
      <text x="610" y="70" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        실제 실행 — 되돌리기 어렵다
      </text>

      {stageLabels.map((item, i) => {
        const left = i < 3;
        const x = left ? 60 : 460;
        const y = 92 + (i % 3) * 86;
        const isBoundary = i === 3;
        return (
          <g key={item.stage}>
            <g className={isBoundary ? "text-accent" : "text-foreground"}>
              <rect
                x={x}
                y={y}
                width="300"
                height="60"
                rx="10"
                fill="currentColor"
                fillOpacity={isBoundary ? 0.12 : 0.05}
                stroke="currentColor"
                strokeOpacity={isBoundary ? 1 : 0.4}
                strokeWidth={isBoundary ? 2 : 1.5}
              />
            </g>
            <text
              x={x + 16}
              y={y + 24}
              className="fill-foreground"
              fontSize="12"
              fontWeight="600"
            >
              {`${i + 1}. ${item.stage}`}
            </text>
            <text
              x={x + 16}
              y={y + 44}
              className="fill-muted-foreground"
              fontSize="10"
            >
              {item.detail}
            </text>
            {i % 3 < 2 && (
              <g className="text-accent">
                <line
                  x1={x + 150}
                  y1={y + 60}
                  x2={x + 150}
                  y2={y + 82}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  markerEnd="url(#pb-stage-arrow)"
                />
              </g>
            )}
          </g>
        );
      })}

      {/* 왼쪽 묶음 → 오른쪽 묶음 */}
      <g className="text-accent">
        <path
          d="M 360 322 C 400 322 400 122 456 122"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          markerEnd="url(#pb-stage-arrow)"
        />
      </g>

      <text x="410" y="378" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        화면은 지금 어느 단계인지 항상 말한다 — 저장됐다와 실행됐다와 공개됐다는 다른 말이다
      </text>
    </svg>
  );
}

function IdempotencyDiagram() {
  const branches = [
    {
      y: 150,
      verdict: "접수됨",
      action: "그때만 키를 새로 발급",
      tone: "accent" as const,
    },
    {
      y: 214,
      verdict: "결과를 모름 (502 · 504 · 무응답)",
      action: "키와 본문을 기억 → 주 단추가 '다시 보내기'로 바뀐다",
      tone: "accent" as const,
    },
    {
      y: 278,
      verdict: "운영자가 입력을 바꿈",
      action: "그 요청을 버리고 '접수됐을 수 있다'고 한 줄 알린다",
      tone: "muted" as const,
    },
    {
      y: 342,
      verdict: "서버가 키 재사용 거부 (409)",
      action: "그 범위의 키만 새로 발급 — 거절된 키는 다시 나가지 않는다",
      tone: "muted" as const,
    },
  ];

  return (
    <svg
      viewBox="0 0 820 410"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="멱등키 상태 처리 — 요청을 보낸 뒤 접수됨·결과 모름·입력 변경·키 재사용 거부 네 갈래를 서로 다르게 다룬다"
    >
      <defs>
        <marker
          id="pb-idem-arrow"
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
        &ldquo;실패&rdquo;와 &ldquo;결과를 모름&rdquo;은 다른 것이다
      </text>

      <g className="text-accent">
        <rect
          x="40"
          y="48"
          width="210"
          height="58"
          rx="10"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>
      <text x="145" y="72" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        접수 요청
      </text>
      <text x="145" y="90" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        미리보기 ID · 해시 · 멱등키
      </text>

      <g className="text-muted-foreground">
        <line
          x1="145"
          y1="106"
          x2="145"
          y2="366"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />
      </g>

      {branches.map((branch) => (
        <g key={branch.verdict}>
          <g className="text-muted-foreground">
            <path
              d={`M 145 ${branch.y - 22} L 145 ${branch.y} L 276 ${branch.y}`}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              markerEnd="url(#pb-idem-arrow)"
            />
          </g>
          <g className={branch.tone === "accent" ? "text-accent" : "text-foreground"}>
            <rect
              x="286"
              y={branch.y - 26}
              width="494"
              height="52"
              rx="10"
              fill="currentColor"
              fillOpacity={branch.tone === "accent" ? 0.1 : 0.05}
              stroke="currentColor"
              strokeOpacity={branch.tone === "accent" ? 1 : 0.4}
              strokeWidth="1.5"
            />
          </g>
          <text
            x="302"
            y={branch.y - 6}
            className="fill-foreground"
            fontSize="11"
            fontWeight="600"
          >
            {branch.verdict}
          </text>
          <text x="302" y={branch.y + 13} className="fill-muted-foreground" fontSize="10">
            {branch.action}
          </text>
        </g>
      ))}

      <text x="410" y="396" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        결과를 모르는 요청은 재시도 단추를 주지 않는다 — 이력에서 확인부터 시킨다
      </text>
    </svg>
  );
}

export function PreprocessBackofficeDeepDive() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <h2 className="text-2xl font-bold">설계 자세히 보기</h2>
      <p className="mt-2 text-muted-foreground">
        Excel 왕복과 수기 입력으로 돌아가던 전처리를 웹으로 옮기면서, 가장 많이
        고민한 건 화면 수가 아니라 &ldquo;지금 무엇이 저장됐고 무엇이 실제로
        실행됐는가&rdquo;를 헷갈리지 않게 만드는 일이었다. 되돌리기 어려운 작업을
        다루는 업무 도구라서, 모호함이 곧 사고였다.
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
          1. 원래 어떻게 일하고 있었나
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          PharmScope에 공개될 의약품 유통 원천 데이터 중 검증에 실패한 행을
          &lsquo;반려&rsquo;라고 부른다. 데이터비즈팀은 이 반려 데이터를{" "}
          <strong className="text-foreground">일일 Excel 리포트(15시트)</strong>
          로 받아 검토하고, 보정값을 정해 메일로 회신했다. 그러면 개발·운영
          담당자가 그 내용을 DB에 손으로 옮겨 넣었다.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          이 구조의 비용은 입력 시간이 아니라{" "}
          <strong className="text-foreground">추적 불가</strong>였다. 회신한
          보정이 실제로 반영됐는지, 반영됐다면 고객 화면에 나갔는지를 팀이 알
          방법이 없었다. 그래서 설계의 출발점을 &ldquo;입력을 웹으로
          옮기기&rdquo;가 아니라 &ldquo;단계를 눈에 보이게 쪼개기&rdquo;로
          잡았다.
        </p>
        <div className="mt-6">
          <StagePipelineDiagram />
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          → 익숙한 작업대는 그대로 뒀다. 팀이 Excel에서 쓰던 열 이름과 용어를
          화면 문구로 쓰고, 행별 직접 입력·선택 항목 일괄 채우기·Excel 여러 행
          붙여넣기처럼 하던 손놀림을 받는다. 바꾼 것은 도구가 아니라 단계의
          경계다.
        </p>
      </div>

      <div className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          2. 접수 버튼을 두 번 눌렀을 때
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          접수는 배치와 고객 공개로 이어지는 되돌리기 어려운 작업이다. 그런데
          게이트웨이 타임아웃처럼{" "}
          <strong className="text-foreground">
            서버가 받았는지 알 수 없는 실패
          </strong>
          가 실제로 난다. 여기서 흔한 처리는 &ldquo;실패했습니다, 다시
          시도&rdquo;인데, 이미 접수된 요청이면 같은 보정이 두 번 들어간다.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          그래서 실패를 두 종류로 나눴다. 서버가 거절한 실패는 다시 하면 되고,{" "}
          <strong className="text-foreground">결과를 모르는 실패</strong>는 다시
          시도시키지 않고 이력에서 확인부터 시킨다. 재전송이 필요한 경우를 위해
          멱등키를 범위별로 발급하고, 접수가 확인된 뒤에만 키를 바꾼다.
        </p>
        <div className="mt-6">
          <IdempotencyDiagram />
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          → 까다로운 건 세 번째 갈래다. 운영자가 응답을 기다리다 입력을 고치면,
          화면의 값과 날아간 요청의 내용이 달라진다. 이때 새 입력으로 다시 보내면
          둘 다 접수될 수 있다. 그래서 그 요청은 &ldquo;버린 요청&rdquo;으로
          따로 남겨 접수됐을 가능성을 한 줄로 알리고, 새 입력은 새 키로만
          나간다. 이 네 갈래와 &ldquo;입력이 같아도 접수된 뒤에는 새 키&rdquo;
          같은 조건은 화면을 실제로 그려 버튼을 누르는 테스트로 고정했다.
        </p>
      </div>

      <div className="mt-8 rounded-lg border border-border p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          3. 빈 값을 0으로 적지 않는다
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          데이터 검수 도구에서 <code className="text-xs">0</code>은 위험한
          기본값이다. &lsquo;수집했고 정상인데 0건&rsquo;과 &lsquo;아직 수집 기록이
          없음&rsquo;은 업무상 완전히 다른 판단으로 이어지는데, 널 값을 0으로
          바꿔 그리면 화면에서 구별이 사라진다.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          그래서 표시 규칙을 도메인 레이어의 상수로 고정했다. 확인 불가 · 준비
          안 됨 · 미수신 · 기록 없음을 각각 다른 말로 쓰고,{" "}
          <strong className="text-foreground">
            값이 없는 것 자체가 답일 때만
          </strong>{" "}
          &lsquo;—&rsquo;로 적는다. 이 규칙 밖의 새 표현을 만들지 않는 것까지
          규약에 넣었다.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          같은 이유로 금액·비율은 서버가 주는 10진 문자열을 숫자로 변환하지 않고
          원문 그대로 표시한다. 정렬에만 숫자 비교를 쓰고, 보여주기·복사·상세는
          문자열이다 — 부동소수 변환으로 끝자리가 바뀌면 그건 틀린 매출액이다.
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          4. 오류가 어디에 뜨는지를 먼저 정했다
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          업무 도구에서 오류 표시는 장식이 아니라 다음 행동을 지시하는 장치다.
          그런데 화면을 늘리다 보면 같은 성질의 실패가 어떤 화면에서는 모달,
          어떤 화면에서는 토스트로 뜬다. 그래서 코드 전체에서 오류가 날 수 있는
          지점을{" "}
          <strong className="text-foreground">
            474건(업무 영역 436 + 공통 38)
          </strong>{" "}
          수집해 네 자리로 분류했다.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[
            {
              where: "거절 모달",
              when: "권한 없음 · 충돌 · 대상이 사라짐",
              why: "서버가 \"안 된다\"고 확정한 것 — 입력을 고쳐야 한다",
            },
            {
              where: "확인 필요 모달",
              when: "5xx · 무응답 · 응답 봉투 깨짐",
              why: "결과를 모른다 — 다시 하지 말고 이력을 보라는 뜻",
            },
            {
              where: "위험 토스트",
              when: "요청 형식 · 용량 · 빈도 · 일시 중단",
              why: "흐름을 끊을 필요는 없지만 눈에 띄어야 하는 것",
            },
            {
              where: "인라인 문구만",
              when: "목록·상세 읽기 실패, 단계 중간 검증",
              why: "표 자리에서 바로 재시도하면 되는 것 — 모달로 덮지 않는다",
            },
          ].map((item) => (
            <div
              key={item.where}
              className="rounded-lg border border-border bg-background p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-semibold leading-snug">{item.where}</h4>
                <span className="flex-shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {item.when}
                </span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {item.why}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-muted/30 p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          5. 규약 17종을 시험으로 바꿨다
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          사람 리뷰어가 없는 환경에서 &ldquo;이렇게 하기로 했다&rdquo;는 문서는
          안 지켜진다. 특히 디자인 일관성·접근성·문구처럼 깨져도 동작은 하는
          규칙이 먼저 무너진다. 그래서 지켜야 할 것을{" "}
          <strong className="text-foreground">실패하는 시험</strong>으로
          옮겼다.
        </p>
        <div className="mt-4 grid gap-2.5 md:grid-cols-3">
          {conventionChecks.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-border bg-background p-4"
            >
              <h4 className="text-sm font-semibold">{item.label}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {item.what}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          → 가장 효과가 컸던 건 문구 시험이다. 코드의 라벨 표와 문구 문서의 용어집을
          값까지 대조하므로, 화면에서 용어를 바꾸면 문서를 같이 고치지 않는 한
          시험이 깨진다. 업무 도구에서 용어 불일치는 오해를 만들고, 오해는 잘못된
          보정으로 이어진다.
        </p>
      </div>

      <div className="mt-8 rounded-lg border border-border p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          6. 셸은 제품을 모른다
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          지금 들어있는 제품은 전처리 프로젝트 하나와 플랫폼 관리지만, 앞으로 다른
          제품이 같은 셸에 들어온다. 이럴 때 흔한 실패가{" "}
          <strong className="text-foreground">
            범용 셸이 첫 제품의 화면 id와 문구를 물려받는 것
          </strong>
          이다.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          그래서 제품을 설정 객체로 등록하고 메뉴·그룹·기본 화면·브레드크럼이
          전부 거기서 파생되게 했다. 제품마다 다른 셸 동작은 세 항목(도움말
          가이드 종류, 머리글에 매출일자를 쓸지, 대기 건수 배지를 붙일 화면)으로
          만 열어두고, 없으면 켜지 않는다. 레지스트리에 빠뜨리거나 메뉴에 없는
          화면을 기본값으로 두면{" "}
          <strong className="text-foreground">컴파일 오류</strong>가 난다.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          → 이 설정은 화면 탐색용이고 권한이 아니다. 메뉴 노출은 서버가 돌려준
          역할과 권한 목록이 정하며, 각 업무 API의 인가는 서버가 다시 검사한다.
          프런트엔드 메뉴 필터를 보안 경계로 쓰지 않는다는 것을 코드 주석과 저장소
          문서 양쪽에 남겼다 — 실제로 브라우저에 메뉴 ON/OFF를 저장하던 화면이
          있었고, 그게 보안 경계처럼 읽힐 수 있어 지웠다.
        </p>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-muted/30 p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          아직 검증하지 못한 것
        </h3>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            실제 직원 SSO 세션으로는 아직 한 번도 열어보지 못했다. 개발 환경
            주소가 인증 서버의 콜백 허용 목록에 올라가지 않아서다. 프런트엔드
            설정이 준비된 것과 운영 적용이 끝난 것은 다른 일이라, 저장소 문서에
            그대로 적어 뒀다.
          </p>
          <p>
            서버 쪽 권한·감사·멱등성 보장과 예약 스케줄러·배치 실행도 실환경에서
            확인하지 않았다. 현재 검증은 배포 명세 기반 예시 데이터와 헤드리스
            브라우저 범위다. 성과를 말할 때 이 선을 넘지 않으려고 범위를 문서에
            먼저 고정했다.
          </p>
        </div>
      </div>
    </div>
  );
}
