const capabilities = [
  {
    title: "간트 차트 · 캘린더 뷰",
    detail:
      "Jira의 이슈 목록은 '지금 무엇이 열려 있는가'는 보여줘도 '무엇이 언제까지인가'는 잘 보여주지 않는다. 같은 데이터를 시간 축 위에 올렸다.",
  },
  {
    title: "팀 · 상태 색상 + 다중 필터",
    detail:
      "규모가 큰 프로젝트는 전체를 한 번에 보면 아무것도 안 보인다. 색으로 묶고 필터로 좁히는 두 단계를 뒀다.",
  },
  {
    title: "URL 상태 관리",
    detail:
      "필터·기간·뷰 모드를 URL에 담았다. 별도 저장이나 공유 기능 없이 주소창을 복사해 붙이면 상대가 같은 화면을 본다.",
  },
];

function OptimisticUpdateDiagram() {
  return (
    <svg
      viewBox="0 0 820 360"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="드래그앤드롭 일정 편집의 낙관적 업데이트 흐름 — 드롭 즉시 화면에 반영하고 서버 요청은 뒤에서 진행하며, 실패하면 원래 위치로 되돌리고 안내한다"
    >
      <defs>
        <marker
          id="wbs-opt-arrow"
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
        서버 응답을 기다리지 않고 먼저 그린다
      </text>

      <g className="text-accent">
        <rect x="60" y="60" width="200" height="52" rx="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      </g>
      <text x="160" y="82" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        일정 바를 드롭
      </text>
      <text x="160" y="100" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        사용자 입력 완료
      </text>

      <g className="text-accent">
        <line x1="260" y1="86" x2="320" y2="86" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#wbs-opt-arrow)" />
      </g>

      <g className="text-accent">
        <rect x="320" y="60" width="200" height="52" rx="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      </g>
      <text x="420" y="82" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        즉시 화면 반영
      </text>
      <text x="420" y="100" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        네트워크 왕복을 기다리지 않음
      </text>

      <g className="text-muted-foreground">
        <line x1="520" y1="86" x2="580" y2="86" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#wbs-opt-arrow)" />
      </g>

      <g className="text-foreground">
        <rect x="580" y="60" width="180" height="52" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      </g>
      <text x="670" y="82" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        Jira 요청 전송
      </text>
      <text x="670" y="100" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        뒤에서 진행
      </text>

      <g className="text-muted-foreground">
        <line x1="640" y1="112" x2="560" y2="158" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#wbs-opt-arrow)" />
        <line x1="700" y1="112" x2="700" y2="158" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#wbs-opt-arrow)" />
      </g>

      <g className="text-accent">
        <rect x="420" y="158" width="200" height="70" rx="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      </g>
      <text x="520" y="182" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        성공
      </text>
      <text x="520" y="202" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        이미 그려진 상태 그대로 확정
      </text>
      <text x="520" y="218" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        추가 렌더 없음
      </text>

      <g className="text-foreground">
        <rect x="640" y="158" width="130" height="70" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="5 4" />
      </g>
      <text x="705" y="182" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        실패
      </text>
      <text x="705" y="202" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        원래 위치로 롤백
      </text>
      <text x="705" y="218" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        + 사유 안내
      </text>

      <g className="text-foreground">
        <rect x="60" y="268" width="700" height="56" rx="10" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="5 4" />
      </g>
      <text x="410" y="292" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
        드래그 편집은 연속 동작이라 매번 응답을 기다리면 리듬이 끊긴다
      </text>
      <text x="410" y="310" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        대신 롤백 경로를 반드시 갖춰야 한다 — 낙관적 업데이트의 비용은 실패 처리에 있다
      </text>
    </svg>
  );
}

function GhostBarDiagram() {
  return (
    <svg
      viewBox="0 0 820 340"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="Changelog로 과거 시점을 재구성해 고스트 바로 겹쳐 보여주는 구조 — 현재 일정 아래에 과거 시점의 일정을 반투명 바로 함께 그려 변경 폭을 눈으로 비교한다"
    >
      <defs>
        <marker
          id="wbs-ghost-arrow"
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
        &quot;언제부터 밀렸나&quot;는 현재 상태만 봐서는 알 수 없다
      </text>

      <g className="text-foreground">
        <rect x="50" y="58" width="220" height="76" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      </g>
      <text x="160" y="82" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        Jira Changelog
      </text>
      <text x="160" y="102" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        필드가 언제 무엇에서
      </text>
      <text x="160" y="118" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        무엇으로 바뀌었는지
      </text>

      <g className="text-accent">
        <line x1="270" y1="96" x2="330" y2="96" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#wbs-ghost-arrow)" />
      </g>

      <g className="text-accent">
        <rect x="330" y="58" width="220" height="76" rx="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      </g>
      <text x="440" y="82" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        선택 시점으로 되감기
      </text>
      <text x="440" y="102" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        변경 이력을 역순으로 적용해
      </text>
      <text x="440" y="118" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        그때의 일정을 복원
      </text>

      <g className="text-accent">
        <line x1="550" y1="96" x2="610" y2="96" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#wbs-ghost-arrow)" />
      </g>

      <g className="text-foreground">
        <rect x="610" y="58" width="160" height="76" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      </g>
      <text x="690" y="90" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        고스트 바로
      </text>
      <text x="690" y="110" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">
        겹쳐 표시
      </text>

      {/* 간트 예시 */}
      <text x="50" y="176" className="fill-muted-foreground" fontSize="10">
        간트 표시 예시
      </text>
      <g className="text-foreground">
        <line x1="50" y1="188" x2="770" y2="188" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
      </g>

      <g className="text-muted-foreground">
        <rect x="150" y="200" width="240" height="20" rx="5" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 3" />
      </g>
      <text x="404" y="215" className="fill-muted-foreground" fontSize="10">
        2주 전 계획 (고스트)
      </text>

      <g className="text-accent">
        <rect x="230" y="230" width="300" height="20" rx="5" fill="currentColor" fillOpacity="0.85" />
      </g>
      <text x="544" y="245" className="fill-foreground" fontSize="10">
        현재 일정
      </text>

      <g className="text-muted-foreground">
        <line x1="150" y1="256" x2="230" y2="256" stroke="currentColor" strokeWidth="1.25" />
        <line x1="150" y1="251" x2="150" y2="261" stroke="currentColor" strokeWidth="1.25" />
        <line x1="230" y1="251" x2="230" y2="261" stroke="currentColor" strokeWidth="1.25" />
      </g>
      <text x="190" y="274" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        밀린 폭
      </text>

      <text x="410" y="312" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        회고에서 &quot;계획이 어떻게 변해왔는지&quot;를 말로 복원하지 않아도 된다
      </text>
    </svg>
  );
}

export function WbsDeepDive() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <h2 className="text-2xl font-bold">설계 자세히 보기</h2>
      <p className="mt-2 text-muted-foreground">
        Jira에 이미 있는 데이터를 다시 저장하지 않고, 보는 방식만 바꿔 일정
        가시성을 올린 사내 도구 — 드래그 편집의 반응성과 과거 시점 조회를 어떻게
        풀었는지.
      </p>

      <div className="mt-8 rounded-lg border border-border bg-muted/30 p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          1. 전제 — 데이터를 옮기지 않는다
        </h3>
        <p className="mt-3 leading-relaxed">
          일정 관리 도구를 새로 만들면 팀은 두 곳에 일정을 적게 된다. 그러면 곧
          한쪽이 낡고, 낡은 쪽을 아무도 믿지 않게 된다. 그래서 저장소는 Jira
          그대로 두고{" "}
          <strong>REST API로 읽어와 보는 방식만 바꾸는 것</strong>을 전제로
          잡았다. 편집도 이 도구가 아니라 Jira에 쓴다.
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          2. 무엇을 더 보이게 했나
        </h3>
        <div className="mt-4 space-y-3">
          {capabilities.map((c, i) => (
            <div
              key={c.title}
              className="flex items-start gap-4 rounded-lg border border-border bg-background p-5"
            >
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {i + 1}
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
      </div>

      <div className="mt-8 rounded-lg border border-border p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          3. 드래그 편집의 반응성
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          간트에서 일정을 옮기는 건 한 번으로 끝나지 않는다. 여러 개를 연달아
          조정하는 연속 동작인데, 매번 Jira 응답을 기다리면 그 리듬이 끊긴다.
          그래서 드롭 즉시 화면에 반영하고 요청은 뒤에서 보내는 낙관적 업데이트를
          적용했다.
        </p>
        <div className="mt-6">
          <OptimisticUpdateDiagram />
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          → 낙관적 업데이트의 진짜 비용은 성공 경로가 아니라 실패 경로에 있다.
          되돌릴 원래 값을 들고 있어야 하고, 사용자가 이미 다음 동작으로 넘어간
          뒤에 롤백이 도착할 수도 있다. 이 처리를 빼면 &ldquo;바꾼 줄 알았는데
          안 바뀐&rdquo; 상태가 조용히 남는다.
        </p>
      </div>

      <div className="mt-8 rounded-lg border border-border p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          4. 과거 시점을 되살린다
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          회고에서 가장 자주 나오는 질문이 &ldquo;이거 언제부터 밀린
          거예요?&rdquo;였다. 현재 일정만 보면 답할 수 없고, 사람의 기억으로
          복원해야 했다. Jira Changelog에는 어떤 필드가 언제 무엇에서 무엇으로
          바뀌었는지가 남아 있으니, 이걸 역순으로 적용하면 특정 시점의 일정을
          복원할 수 있다.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          복원한 일정은 화면을 갈아끼우는 대신{" "}
          <strong className="text-foreground">
            현재 일정 옆에 고스트 바로 겹쳐
          </strong>{" "}
          보여줬다. 시점을 오가며 비교하는 것보다 한 화면에서 폭을 보는 편이
          빠르다.
        </p>
        <div className="mt-6">
          <GhostBarDiagram />
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          5. 공유는 기능이 아니라 주소로
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          &ldquo;이 화면 좀 보세요&rdquo;를 위해 저장·공유 기능을 만들면 관리할
          상태가 하나 더 생긴다. 대신 필터·기간·뷰 모드를 전부 URL에 담았다.
          주소창을 복사해 붙이면 상대가 같은 화면을 보고, 브라우저 뒤로 가기가
          그대로 실행 취소처럼 동작한다.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          → Atlassian OAuth로 각자 자기 권한으로 접근하므로, 링크를 받아도 원래
          Jira에서 볼 수 있는 범위만 보인다.
        </p>
      </div>
    </div>
  );
}
