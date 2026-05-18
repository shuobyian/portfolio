"use client";

const sizeComparison = [
  {
    metric: "앱 코드 첫 진입 (gzip)",
    before: "약 111 KB",
    after: "약 150 KB",
    delta: "increase" as const,
    note: "동일 SearchWait 화면. React 런타임 오버헤드(vendor-react gzip 약 45 KB) 포함",
  },
  {
    metric: "jQuery + jQuery-UI (transfer)",
    before: "약 207 KB",
    after: "제거",
    delta: "improve" as const,
    note: "공용 CDN이라 타 사이트 캐시 공유 시 실 비용은 명목보다 낮을 수 있음",
  },
  {
    metric: "중복 jQuery 레거시 사본",
    before: "약 750 KB (원본)",
    after: "정리",
    delta: "improve" as const,
    note: "jquery_.js · jquery_20131014.js · jquery-1.8.0.min.js 등",
  },
  {
    metric: "청크 분할 / 캐싱",
    before: "페이지마다 원본 재요청",
    after: "56개 청크 · vendor 공유",
    delta: "improve" as const,
    note: "해시 파일명으로 장기 캐시 + 안전한 무효화. 효과는 다중 페이지·재방문 가정",
  },
];

const tradeoffs = [
  "페이지 진입 비용은 오히려 증가했다. 단일 화면만 쓰는 사용자에겐 SSR보다 무겁다 (gzip 약 111 KB → 150 KB).",
  "캐싱·누적 전송 우위는 ‘다중 페이지 탐색·재방문’ 가정에서만 성립하는 추정이며, 실제 사용자 트래픽 패턴으로 검증이 필요하다.",
  "jQuery 207 KB는 공용 CDN이라 타 사이트 캐시 공유로 실 비용이 명목보다 낮을 수 있어, ‘207 KB 순절감’으로 단정하면 과대평가다.",
  "SSR→React 전환 자체의 마이그레이션 비용(공수·회귀 위험)은 별도이며, 번들 분석 범위 밖이다.",
];

export function PharmBridgeRefactorDeepDive() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <h2 className="text-2xl font-bold">번들 사이즈 실측 자세히 보기</h2>
      <p className="mt-2 text-muted-foreground">
        SSR(jQuery 기반) → React 전환의 효과를 체감이 아니라 실측 데이터로
        검증한 기록 — 무엇이 좋아졌고, 무엇이 오히려 나빠졌으며, 어디까지가
        측정이고 어디부터가 추정인지.
      </p>

      <div className="mt-8 rounded-lg border border-border bg-muted/30 p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          1. 측정 기준
        </h3>
        <p className="mt-3 leading-relaxed">
          동일한 SearchWait 화면을 기준으로 SSR(jQuery) 버전과 React(코드
          스플리팅) 버전의 앱 코드·외부 의존·청크 구조를 gzip 전송량 기준으로
          비교했다. 폰트 등 양쪽 공통 비용은 제외하고, 비교 가능한 범위의 측정
          수치만 사용했다.
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          2. 전후 비교
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {sizeComparison.map((row) => {
            const improved = row.delta === "improve";
            return (
              <div
                key={row.metric}
                className={`rounded-lg border p-5 ${
                  improved
                    ? "border-accent bg-accent/5"
                    : "border-border bg-background"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-semibold">{row.metric}</h4>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      improved
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {improved ? "개선" : "증가"}
                  </span>
                </div>
                <p className="mt-3 flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{row.before}</span>
                  <span className="text-accent">→</span>
                  <span className="font-medium text-foreground">
                    {row.after}
                  </span>
                </p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {row.note}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-border p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          3. 전환의 실질 이득
        </h3>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
          <li className="flex gap-2">
            <span className="font-mono text-accent">+</span>
            <span>
              <strong className="text-foreground">의존성 구조 단순화</strong> —
              React 컴포넌트 모델이 DOM 조작·이벤트 바인딩을 대체하면서 jQuery /
              jQuery-UI 자체가 불필요해지고, 중복 레거시 사본까지 정리 가능.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-mono text-accent">+</span>
            <span>
              <strong className="text-foreground">캐싱 구조</strong> — vendor
              청크가 페이지 간 공유되고 해시 파일명으로 장기 캐시·무효화가
              안전해져, 다중 페이지·재방문 시 누적 전송량 절감 여지.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-mono text-accent">+</span>
            <span>
              <strong className="text-foreground">빌드 파이프라인 확보</strong>{" "}
              — minify·tree-shaking·gzip 등 빌드 최적화 파이프라인을 표준으로
              가져갈 수 있음.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-mono text-accent">+</span>
            <span>
              <strong className="text-foreground">유지보수성</strong> — 이번
              전환의 본래 동기. Vanilla JS에서 화면 단위로 결합돼 있던 상태·이벤트를
              도메인별 훅·유틸로 분리하고 React Query로 API·캐싱·에러 처리를
              일원화, 테스트 인프라(Jest+MSW)까지 확보해 변경 시 영향 범위를
              좁힘.
            </span>
          </li>
        </ul>
      </div>

      <div className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-6">
        <h3 className="text-sm font-medium uppercase tracking-wide text-accent">
          4. 정직하게 짚는 한계
        </h3>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
          {tradeoffs.map((t, i) => (
            <li key={i} className="flex gap-2">
              <span className="font-mono text-muted-foreground">−</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-foreground">
          → 전환의 실질 이득은 번들 크기 자체보다 의존성 정리·캐싱 구조·유지보수성에
          있다. 단순 페이지 용량만 보면 개선이 아니라는 점은 분명히 해 둔다.
        </p>
      </div>
    </div>
  );
}
