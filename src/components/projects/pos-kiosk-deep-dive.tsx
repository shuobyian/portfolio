"use client";

const optionsConsidered = [
  {
    name: "localStorage 직접 사용",
    summary: "setItem/getItem으로 데이터를 공유하고 storage event로 변경 알림",
    pros: "별도 API 불필요, 구현 단순",
    cons: "값 설정/조회 시 동기 작동 → 렌더링 블락 가능. 데이터 매개체로는 부적합",
    verdict: "기각",
  },
  {
    name: "BroadcastChannel API",
    summary: "탭·윈도우·iframe·Web Worker 간 통신을 위한 단일 API",
    pros: "비동기 메시지 전달, 채널 단위 라우팅 분리, 다양한 컨텍스트를 단일 API로 통합",
    cons: "구형 브라우저 미지원 (POS·KIOSK는 모던 크롬 고정 환경이라 무관)",
    verdict: "채택",
  },
  {
    name: "Service Worker postMessage",
    summary: "Service Worker를 매개로 윈도우 간 메시지 전달",
    pros: "오프라인·푸시 등 SW의 부가 기능과 통합 가능",
    cons: "러닝 커브 + SW 등록/관리 부담. 단순 윈도우 동기화에는 과도한 도구",
    verdict: "기각",
  },
  {
    name: "Window postMessage",
    summary: "window.open()으로 연 윈도우 간 메시지 전달",
    pros: "iframe·팝업 통신의 표준",
    cons: "window.open()/document.open()으로 직접 연 윈도우에만 사용 가능. 독립 실행된 두 모니터에는 부적합",
    verdict: "기각",
  },
];

const codeSnippet = `// 1. 도메인별 BroadcastChannel 분리 (메시지 라우팅 단순화)
const paymentChannel = new BroadcastChannel("payment");
const orderChannel = new BroadcastChannel("order");

// 2. 메인 모니터: 결제 완료 시 메시지 발송
function onPaymentCompleted(orderId: string) {
  const message = { type: "payment-completed", orderId, ts: Date.now() };

  // 1차: BroadcastChannel
  paymentChannel.postMessage(message);

  // 2차(백업): localStorage event 트리거
  // (BroadcastChannel 메시지 유실 가능성 대비)
  localStorage.setItem("__sync__", JSON.stringify(message));
}

// 3. 서브 모니터: 두 채널 모두 수신 → React Query invalidate
paymentChannel.onmessage = (e) => handle(e.data);

window.addEventListener("storage", (e) => {
  if (e.key !== "__sync__" || !e.newValue) return;
  handle(JSON.parse(e.newValue));
});

function handle(msg: SyncMessage) {
  if (msg.type === "payment-completed") {
    queryClient.invalidateQueries({ queryKey: ["order", msg.orderId] });
  }
}`;

function CommunicationDiagram() {
  return (
    <svg
      viewBox="0 0 800 360"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="메인 모니터와 서브 모니터 간 통신 구조 다이어그램"
    >
      <defs>
        <marker
          id="arrow"
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

      <g className="text-accent">
        <rect
          x="50"
          y="40"
          width="220"
          height="100"
          rx="10"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>
      <text
        x="160"
        y="80"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="16"
        fontWeight="600"
      >
        메인 모니터
      </text>
      <text
        x="160"
        y="105"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="12"
      >
        직원용 (가로 1024×768)
      </text>

      <g className="text-accent">
        <rect
          x="530"
          y="40"
          width="220"
          height="100"
          rx="10"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>
      <text
        x="640"
        y="80"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="16"
        fontWeight="600"
      >
        서브 모니터
      </text>
      <text
        x="640"
        y="105"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="12"
      >
        고객용 (세로 1024×1920)
      </text>

      <g className="text-accent">
        <line
          x1="270"
          y1="75"
          x2="525"
          y2="75"
          stroke="currentColor"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />
      </g>
      <text
        x="397"
        y="65"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="13"
        fontWeight="500"
      >
        ① BroadcastChannel
      </text>

      <g className="text-muted-foreground">
        <line
          x1="270"
          y1="115"
          x2="525"
          y2="115"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          markerEnd="url(#arrow)"
        />
      </g>
      <text
        x="397"
        y="135"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="12"
      >
        ② localStorage event (백업)
      </text>

      <line
        x1="640"
        y1="145"
        x2="500"
        y2="240"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1.5"
        markerEnd="url(#arrow)"
      />

      <g className="text-foreground">
        <rect
          x="280"
          y="240"
          width="240"
          height="80"
          rx="10"
          fill="currentColor"
          fillOpacity="0.05"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
      </g>
      <text
        x="400"
        y="270"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="14"
        fontWeight="600"
      >
        React Query
      </text>
      <text
        x="400"
        y="293"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
      >
        invalidate → refetch → 화면 자동 갱신
      </text>

      <text
        x="160"
        y="170"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
      >
        결제 완료 → 메시지 발송
      </text>
      <text
        x="640"
        y="170"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
      >
        메시지 수신 → invalidate 호출
      </text>
    </svg>
  );
}

export function PosKioskDeepDive() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <h2 className="text-2xl font-bold">트러블슈팅 자세히 보기</h2>
      <p className="mt-2 text-muted-foreground">
        독립된 두 크롬 윈도우 사이의 실시간 동기화를 어떻게 풀었는지 — 검토한
        옵션 4가지의 비교, 채택 근거, 통신 구조 다이어그램과 코드, 그리고
        안정성 보강을 위해 추가한 백업 채널까지.
      </p>

      <div className="mt-8 rounded-lg border border-border bg-muted/30 p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          1. 요구사항
        </h3>
        <p className="mt-3 leading-relaxed">
          한 매장에 메인(직원용) + 서브(고객용) 두 대의 모니터가 동시에 떠 있고,
          결제 진행 상태·주문 내역·세션을 실시간으로 공유해야 함. 두 모니터는
          각각 독립된 크롬 윈도우로 실행되며, 별도 WebSocket 인프라는 신설하지
          않는다는 제약.
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          2. 검토한 옵션 비교
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {optionsConsidered.map((opt) => {
            const isPicked = opt.verdict === "채택";
            return (
              <div
                key={opt.name}
                className={`rounded-lg border p-5 ${
                  isPicked
                    ? "border-accent bg-accent/5"
                    : "border-border bg-background"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-semibold">{opt.name}</h4>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      isPicked
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {opt.verdict}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {opt.summary}
                </p>
                <div className="mt-3 space-y-1.5 text-xs leading-relaxed">
                  <p className="flex gap-2">
                    <span className="font-mono text-accent">+</span>
                    <span className="text-muted-foreground">{opt.pros}</span>
                  </p>
                  <p className="flex gap-2">
                    <span className="font-mono text-muted-foreground">−</span>
                    <span className="text-muted-foreground">{opt.cons}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-border p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          3. 채택: BroadcastChannel + 도메인별 채널 분리
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          비동기 메시지 전달 + 동일 origin 내 다중 컨텍스트 통신을 단일 API로
          해결할 수 있는 BroadcastChannel을 채택. 채널을
          도메인별(주문/결제/세션)로 분리하여 메시지 라우팅 로직 단순화.
        </p>
        <div className="mt-6">
          <CommunicationDiagram />
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-border">
        <div className="border-b border-border bg-muted px-4 py-2">
          <p className="text-xs font-medium text-muted-foreground">
            sync.ts — 핵심 동기화 로직 (요약)
          </p>
        </div>
        <pre className="overflow-x-auto bg-background p-4 text-xs leading-relaxed">
          <code className="font-mono text-foreground">{codeSnippet}</code>
        </pre>
      </div>

      <div className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          4. 안정성 보강: 백업 채널 추가
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          개발 단계에서 BroadcastChannel만으로는 메시지 안정성에 부족함을 확인 —
          브라우저 정책·탭 비활성화 등으로 메시지가 유실될 수 있음. 1차 검토에서
          ‘데이터 매개체’ 용도로 기각했던 localStorage를{" "}
          <strong className="text-foreground">‘메시지 알림 트리거’</strong>로
          용도를 바꿔 백업 채널로 추가. 수신 측은 어느 채널이든 메시지가
          도착하면 React Query invalidate를 호출하여 결국 화면이 갱신되는 단일
          흐름으로 통합.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          → 동일 API라도 ‘무엇을 위해 쓰는가’의 정의가 바뀌면 재검토 가치가
          있음을 확인.
        </p>
      </div>
    </div>
  );
}
