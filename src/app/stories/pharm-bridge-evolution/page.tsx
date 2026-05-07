"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/section";

type Stage = {
  period: string;
  slug?: string;
  title: string;
  subtitle: string;
  decision: string;
  why: string;
  nextHook: string | null;
};

const stages: Stage[] = [
  {
    period: "2025.07 - 12",
    slug: "pharm-bridge",
    title: "1. Vanilla JS로 신규 구축",
    subtitle: "초기 의사결정",
    decision: "HTML/CSS/JavaScript만으로 라우팅·상태·이벤트 모듈 자체 구현",
    why: "SSR 라우팅(서버 렌더된 페이지 셸을 그대로 활용해야 하는 제약)·운영 인력의 장기 유지보수 가능 기술 폭·초기 번들 사이즈 요구·백엔드 Spring 전환과 동기화된 일정 안에 안정화 가능 여부를 종합 검토한 결과 React 도입의 비용 대비 효익이 낮다고 판단했습니다.",
    nextHook:
      "약 6개월 운영하며 화면 단위로 묶인 상태와 이벤트가 서로 결합되면서 유지보수 비용이 누적되기 시작했습니다.",
  },
  {
    period: "2025.12 - 2026.01",
    title: "2. 운영하며 마주친 한계",
    subtitle: "초기 결정의 트레이드오프 노출",
    decision: "Vanilla JS의 한계 인식 + SSR 제약 재검토",
    why: "화면 단위로 묶여있던 상태와 이벤트가 서로 결합되어, 한 화면을 수정하면 다른 화면에 영향이 가는 사례가 늘었습니다. SSR 라우팅 자체는 SEO와 서버 의존성 때문에 변경할 수 없는 제약이 그대로였습니다.",
    nextHook:
      "‘SSR 셸을 유지하면서도 동적 영역만 React로 분리할 수 있는 방법은 없을까?’라는 질문이 React Island 패턴을 발견하게 만들었습니다.",
  },
  {
    period: "2026.02",
    slug: "pharm-bridge-refactor",
    title: "3. React Island 패턴 채택",
    subtitle: "SSR 제약 안에서의 부분 React 도입",
    decision:
      "SSR이 페이지 셸을 그대로 그리고, 동적 영역만 React 컴포넌트가 마운트되는 SSR/CSR 하이브리드 구조",
    why: "전면 전환은 SSR 제약상 불가능했고 일정상도 비현실적이었습니다. 정적 영역은 SSR이 그대로 처리하고, 인터랙션이 필요한 영역만 React로 마운트하는 구조라면 양쪽의 장점을 살리면서 점진적으로 마이그레이션할 수 있다고 판단했습니다.",
    nextHook:
      "Island 패턴을 채택한 뒤에는 React 영역에 어떤 인프라를 깔지가 중요했습니다.",
  },
  {
    period: "2026.02 - 03",
    slug: "pharm-bridge-refactor",
    title: "4. React 영역의 인프라 정착",
    subtitle: "React Query · 훅 분리 · 테스트",
    decision:
      "React Query 전면 도입 + 도메인별 훅·유틸 분리 + Jest+MSW 테스트 인프라",
    why: "React 영역에서 발생하는 API 호출·캐싱·에러 처리를 React Query로 일원화했습니다. 화면 단위로 묶여 있던 로직은 도메인별 훅·유틸로 분리해 prop drilling을 제거했습니다. 부분 도입한 React 영역의 회귀 안정성을 위해 Jest+MSW 기반 테스트 인프라도 함께 구축했습니다.",
    nextHook: null,
  },
];

export default function PharmBridgeEvolutionStory() {
  return (
    <Section>
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={14} />
        홈으로
      </Link>

      <div className="mt-6">
        <p className="text-sm font-medium text-accent">Highlight Story</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          팜브릿지의 진화: Vanilla → React Island
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          한 프로젝트가 ‘그 시점의 최선’으로 만들어진 뒤, 운영하며 마주친
          한계를 어떻게 받아들이고 같은 제약 안에서 진화시켰는지에 대한 8개월의
          기록입니다.
        </p>
      </div>

      <div className="mt-12 rounded-lg border border-border bg-muted/30 p-6">
        <p className="mb-2 text-sm font-medium text-accent">
          이 흐름에서 제가 배운 것
        </p>
        <p className="leading-relaxed text-muted-foreground">
          초기 의사결정은 ‘그 시점의 제약 안에서의 최선’이었지, 영원한 정답이
          아니었습니다. 운영하며 한계가 드러나면 정직하게 인정하고, 같은 제약
          안에서 새로운 옵션을 찾는 것이 시니어의 역할이라고 생각했습니다.
          진화는{" "}
          <strong className="text-foreground">
            ‘처음부터 다시’가 아니라 ‘제약은 유지하되 구조를 바꾸기’
          </strong>
          였습니다.
        </p>
      </div>

      <div className="mt-16 space-y-10">
        {stages.map((stage, i) => (
          <div key={`${stage.title}-${i}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
              className="rounded-lg border border-border p-6 transition-colors hover:border-accent/50"
            >
              <p className="text-sm text-muted-foreground">{stage.period}</p>
              <h2 className="mt-1 text-2xl font-bold">{stage.title}</h2>
              <p className="mt-1 text-sm text-accent">{stage.subtitle}</p>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    의사결정
                  </p>
                  <p className="mt-2 text-foreground">{stage.decision}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    근거
                  </p>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {stage.why}
                  </p>
                </div>
              </div>

              {stage.slug && (
                <div className="mt-6">
                  <Link
                    href={`/projects/${stage.slug}`}
                    className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                  >
                    프로젝트 상세 보기
                    <ExternalLink size={12} />
                  </Link>
                </div>
              )}
            </motion.div>

            {stage.nextHook && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="ml-6 mt-6 flex items-start gap-3"
              >
                <div className="mt-2">
                  <ArrowDown size={16} className="text-accent" />
                </div>
                <div className="flex-1 rounded-lg border border-dashed border-border px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-accent">
                    다음 단계로
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {stage.nextHook}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-lg border border-accent/30 bg-accent/5 p-6">
        <h2 className="text-xl font-bold">회고: 다시 한다면</h2>
        <ul className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
          <li>
            ・ 1단계 신규 구축 시점에 ‘Vanilla의 한계가 어디에서 처음 드러날
            것인지’ 가설을 세워두었더라면, 2단계의 한계 인지가 더 빨랐을 것
            같습니다.
          </li>
          <li>
            ・ 2단계 한계 인지 시점에 Vanilla → React 전면 전환을 원점에서
            다시 검토할 수도 있었지만, SSR 제약이 변하지 않은 상황이었기 때문에
            Island 패턴이 합리적 선택이었다고 봅니다.
          </li>
          <li>
            ・ React Island 패턴은 추후 다른 SSR 기반 프로젝트의 점진 진화
            옵션으로 활용 가능한 자산이 됐다고 생각합니다.
          </li>
        </ul>
      </div>
    </Section>
  );
}
