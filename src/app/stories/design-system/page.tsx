"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/section";

const stages = [
  {
    period: "2025.03 - 04",
    slug: "design-system",
    title: "1. 디자인 시스템 구축",
    subtitle: "신설 조직의 범용 시스템 0→1",
    decision: "Bootstrap 기반 + CSS Variables 토큰 + Monorepo",
    why: "백오피스 도메인 비중이 높은 사내 환경에 맞춰 컴포넌트 풍부도·디자인 커스터마이징 자유도·반응형 그리드 성숙도가 균형 잡힌 Bootstrap을 채택했습니다. 사내 정체성은 CSS Variables로 추상화해 Bootstrap 위에 일관되게 입혔습니다.",
    nextHook:
      "이 시스템이 운영 환경에서 어떻게 동작할지 어디서 검증해볼까 고민하던 차에, 마침 시작 단계였던 사내 백오피스 신규 구축이 첫 적용 환경으로 자연스러웠습니다.",
  },
  {
    period: "2025.05 - 06",
    slug: "backoffice",
    title: "2. 사내 백오피스 신규 구축",
    subtitle: "디자인 시스템의 첫 검증 환경",
    decision: "Monorepo 디자인 시스템을 운영 환경에 처음 적용",
    why: "공지·약관·FAQ·회원·파일 업로드 등 운영 도메인의 다양한 화면 패턴(폼·테이블·검색·첨부)에 토큰·컴포넌트 구조가 어떻게 동작하는지 직접 확인해봤습니다.",
    nextHook:
      "운영한 지 약 1년이 됐을 때 사내 차기 신규 프로젝트(BI 서비스)에 Antd를 도입하기로 했습니다. 신규에 바로 던지지 않고 운영 중인 백오피스에서 먼저 검증해보기로 결정했습니다.",
  },
  {
    period: "2026.02 - 03",
    slug: "backoffice-refactor",
    title: "3. 백오피스 리팩토링",
    subtitle: "BI 프로젝트의 사전 검증 파일럿",
    decision: "자체 Monorepo → Antd 디자인 시스템 점진적 교체",
    why: "신규 BI 프로젝트에 Antd를 바로 적용하면 라이브러리 부적합·디자인 정체성 적용 한계 같은 리스크가 운영 단계에서 발견될 수 있다고 봤습니다. 그래서 운영 중인 백오피스에서 먼저 마이그레이션을 진행해 Antd 기반 워크플로우·디자인 적용 가능성·운영 리스크를 사전에 확인했습니다.",
    nextHook:
      "검증 단계에서 정의한 토큰 매핑·컴포넌트 사용 패턴이 그대로 신규 BI 프로젝트의 초기 개발 속도를 결정했습니다.",
  },
  {
    period: "2026.04 - 진행중",
    slug: "bi-service",
    title: "4. BI 서비스 신규 구축",
    subtitle: "검증된 패턴의 본격 적용",
    decision: "Antd 디자인 시스템 + Antd Charts 본격 적용",
    why: "직전 백오피스 리팩토링에서 검증해둔 토큰 매핑·컴포넌트 사용 패턴을 그대로 가져왔습니다. 차트 라이브러리도 디자인 시스템과의 시각적 일관성을 위해 같은 계열인 Antd Charts를 채택했습니다.",
    nextHook: null,
  },
];

export default function DesignSystemStory() {
  return (
    <Section>
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={14} />
        프로젝트 목록
      </Link>

      <div className="mt-6">
        <p className="text-sm font-medium text-accent">Highlight Story</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          디자인 시스템의 4단 진화
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          신설 조직에 디자인 시스템을 0→1로 만든 뒤, 1년 가까이 운영하며
          어떻게 진화시켜왔는지를 직접 겪은 흐름으로 정리해봤습니다.
        </p>
      </div>

      <div className="mt-12 rounded-lg border border-border bg-muted/30 p-6">
        <p className="mb-2 text-sm font-medium text-accent">
          이 흐름에서 제가 배운 것
        </p>
        <p className="leading-relaxed text-muted-foreground">
          새 라이브러리를 신규 프로젝트에 바로 적용하지 않고, 운영 중인 환경에서
          먼저 검증해본 뒤 본격 적용했습니다. 디자인 시스템은 만들고 끝나는
          결과물이 아니라{" "}
          <strong className="text-foreground">운영 → 학습 → 진화</strong>의
          사이클을 거치는 살아있는 시스템이라는 걸, 1년 동안 직접 마주하며
          알게 됐습니다.
        </p>
      </div>

      <div className="mt-16 space-y-10">
        {stages.map((stage) => (
          <div key={stage.slug}>
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

              <div className="mt-6">
                <Link
                  href={`/projects/${stage.slug}`}
                  className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                >
                  프로젝트 상세 보기
                  <ExternalLink size={12} />
                </Link>
              </div>
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
            ・ 1단계 디자인 시스템 구축 시점에 Antd/MUI 같은 큰 시스템과의
            비교 검토를 더 명시적으로 문서화해뒀다면, 이후 3단계 마이그레이션
            결정의 근거가 더 단단했을 것 같습니다.
          </li>
          <li>
            ・ 2단계 백오피스 첫 적용에서 더 다양한 화면 패턴(데이터
            시각화·복합 폼)까지 검증했다면 3단계 Antd 결정 시점을 더 앞당길 수
            있었을 것 같아요.
          </li>
          <li>
            ・ 디자인 시스템의 ‘운영 → 학습 → 진화’ 사이클을 더 짧게 가져가기
            위해, 다음 시스템부터는 분기별 회고를 명시적인 단계로 두려고
            합니다.
          </li>
        </ul>
      </div>
    </Section>
  );
}
