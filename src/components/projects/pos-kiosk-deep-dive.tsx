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

const codeSnippet = `// 1. 데이터 종류별 BroadcastChannel 분리 (메시지 라우팅 단순화)
const productChannel = new BroadcastChannel(PRODUCT_LIST_KEY);
const paymentChannel = new BroadcastChannel(PAYMENT_KEY);
const paymentModalChannel = new BroadcastChannel(PAYMENT_MODAL_KEY);

// 2. 메인 모니터: 상품 목록이 바뀔 때마다 스냅샷 저장 + 발송
function syncProductList(next: SelectedProduct[]) {
  localStorage.setItem(PRODUCT_LIST_KEY, JSON.stringify(next));
  productChannel.postMessage(next);
}

// 결제가 끝나면 결과를 보내고 목록·스냅샷을 비운다
function onPaymentFinished(result: PaymentResult) {
  paymentChannel.postMessage(result);
  productChannel.postMessage([]);
  localStorage.removeItem(PRODUCT_LIST_KEY);
}

// 3. 서브 모니터: 채널별 리스너 + 마운트 시 스냅샷 복원
function usePostMessageListener() {
  const [productList, setProductList] = useState<SelectedProduct[]>([]);
  const [paymentResult, setPaymentResult] = useState<PaymentResult>();
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    productChannel.onmessage = (e) => setProductList(e.data);
    paymentChannel.onmessage = (e) => {
      setIsModalOpen(true);
      setPaymentResult(e.data);
    };
    paymentModalChannel.onmessage = (e) => setIsModalOpen(e.data);

    // 나중에 열렸거나 새로고침된 창은 이전 메시지를 받지 못하므로 복원
    const snapshot = localStorage.getItem(PRODUCT_LIST_KEY);
    setProductList(JSON.parse(snapshot ?? "[]"));
  }, []);

  return { productList, paymentResult, isModalOpen };
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
        ② localStorage 스냅샷 (복원용)
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
        서브 모니터 화면 상태
      </text>
      <text
        x="400"
        y="293"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
      >
        상품 목록 · 결제 모달 · 결제 결과
      </text>

      <text
        x="160"
        y="170"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
      >
        상품 변경·결제 결과 → 메시지 발송
      </text>
      <text
        x="640"
        y="170"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
      >
        메시지 수신 → 화면 상태 갱신
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
        늦게 열린 창을 위해 더한 스냅샷 복원까지.
      </p>

      <div className="mt-8 rounded-lg border border-border bg-muted/30 p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          1. 요구사항
        </h3>
        <p className="mt-3 leading-relaxed">
          한 매장에 메인(직원용) + 서브(고객용) 두 대의 모니터가 동시에 떠 있고,
          선택한 상품 목록·결제 진행 상태·결제 결과를 실시간으로 공유해야 함. 두 모니터는
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
          3. 채택: BroadcastChannel + 데이터별 채널 분리
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          비동기 메시지 전달 + 동일 origin 내 다중 컨텍스트 통신을 단일 API로
          해결할 수 있는 BroadcastChannel을 채택. 채널을 데이터별(상품 목록/결제
          결과/결제 모달)로 분리해 수신 측이 메시지 타입을 분기할 필요 없이
          채널마다 받은 값을 바로 화면 상태에 반영.
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
          4. 보완: 늦게 열린 창을 위한 스냅샷 복원
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          BroadcastChannel은 메시지를 보관하지 않는다. 서브 모니터가 메인보다
          늦게 켜지거나 새로고침되면, 그 전에 보낸 상품 목록은 받을 방법이 없어
          고객 화면이 빈 채로 남는다. 1차 검토에서 ‘데이터 매개체’ 용도로
          기각했던 localStorage를{" "}
          <strong className="text-foreground">‘마지막 상태 스냅샷’</strong>으로
          용도를 바꿔, 메인 모니터가 상품 목록을 보낼 때마다 함께 저장하고 서브
          모니터는 마운트할 때 한 번 읽어 복원. 결제가 끝나면 스냅샷도 지워 이전
          주문이 다음 고객 화면에 남지 않게 처리.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          → 동일 API라도 ‘무엇을 위해 쓰는가’의 정의가 바뀌면 재검토 가치가
          있음을 확인.
        </p>
      </div>
    </div>
  );
}
