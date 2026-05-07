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
    period: "2021.08 ~",
    slug: "community-platform",
    title: "1. 합류 — 커뮤니티 + 파트너스 두 프로덕트",
    subtitle: "현 상태 인지",
    decision:
      "전국 500개 단지·MAU 10만 규모의 커뮤니티와 파트너스 두 프로덕트에 합류, 도메인 복잡도와 기술 부채를 동시에 관찰",
    why: "시간·공간·강좌·숙박·레슨 5종 예약 도메인과 PG·관리비 결제, 이용권 관리가 두 프로덕트에 걸쳐 운영되고 있었습니다. 커뮤니티와 파트너스 각각의 흐름을 파악하면서, 기능 추가 속도와 기술 부채 누적 사이의 균형을 잡는 게 첫 과제였습니다.",
    nextHook:
      "JS 기반 두 프로덕트 모두에서 기능을 늘리다 보니, 결제·예약 같은 도메인에서 타입 누락으로 인한 런타임 에러가 반복되기 시작했습니다.",
  },
  {
    period: "~ 2023",
    slug: "community-platform",
    title: "2. JS → TypeScript 마이그레이션 (파트너스)",
    subtitle: "운영 중단 없이 단계적 전환",
    decision:
      "파트너스의 핵심 메뉴 4개 영역에 걸쳐 인터페이스 우선 정의 후 구현체 이관",
    why: "전면 전환은 운영 리스크가 컸기 때문에, 도메인 결합이 강한 부분은 인터페이스를 먼저 정의한 뒤 구현체를 옮기는 방식으로 진행했습니다. 운영 중단 없이 마이그레이션을 완료할 수 있었습니다.",
    nextHook:
      "타입은 잡혔지만, 다른 프로덕트(커뮤니티)에서는 서버 상태와 클라이언트 상태가 한 store에 섞이며 stale 데이터 노출 이슈가 누적되고 있었습니다.",
  },
  {
    period: "~ 2024",
    slug: "community-platform",
    title: "3. Redux → React Query 분리 (커뮤니티)",
    subtitle: "서버 상태 분리 + 컨벤션 전파",
    decision:
      "커뮤니티의 서버 상태를 React Query로 분리하고, 도메인별 queryKey·invalidation 규칙 문서화 후 팀 전파",
    why: "캐시 정책과 클라이언트 상태가 한 store에 섞여 있던 게 stale 데이터 노출의 근본 원인이었습니다. 서버 상태를 분리한 뒤, 도메인별 queryKey 컨벤션과 invalidation 규칙을 문서화해 팀 전체에 전파했습니다. Axios interceptor 기반 공통 에러 처리도 함께 도입해 외부 연동(PG·관리비) 실패 메시지를 도메인 단위로 일관화했습니다.",
    nextHook:
      "두 프로덕트 모두 코드 구조는 정돈됐지만, 핫픽스가 월 평균 5건 발생하고 있었고 그중 상당 비중이 결제·예약 같은 핵심 플로우에서 나왔습니다.",
  },
  {
    period: "2024",
    slug: "community-platform",
    title: "4. 첫 프론트엔드 테스트 체계 도입 (전체)",
    subtitle: "Jest + MSW · 두 프로덕트 핵심 플로우부터",
    decision:
      "Jest+MSW 기반 단위/통합 테스트 가이드 작성 후, 커뮤니티·파트너스 두 프로덕트의 결제·예약 핵심 플로우부터 적용",
    why: "프론트엔드 테스트 문화가 없던 팀에 처음 도입하는 작업이었기 때문에, 모든 영역을 한 번에 덮으려 하기보다 ‘가장 자주 깨지는 곳’부터 시작했습니다. 두 프로덕트의 결제·예약 플로우가 안정화된 뒤에 다른 도메인으로 점진 확장했습니다. 그 결과 배포 후 핫픽스가 월 평균 5건 → 1건으로 감소했습니다.",
    nextHook: null,
  },
];

export default function CommunityPlatformEvolutionStory() {
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
          커뮤니티 + 파트너스 4년의 점진 개선
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          전국 500개 단지·MAU 10만 규모의 커뮤니티 플랫폼을 커뮤니티와 파트너스
          두 프로덕트에 걸쳐 4년 가까이 운영하며, 어떤 점진적 개선들을
          누적했는지 정리해봤습니다.
        </p>
      </div>

      <div className="mt-12 rounded-lg border border-border bg-muted/30 p-6">
        <p className="mb-2 text-sm font-medium text-accent">
          이 흐름에서 제가 배운 것
        </p>
        <p className="leading-relaxed text-muted-foreground">
          오래 사는 코드를 만드는 일은 이벤트성 리팩토링이 아니라, 매 분기마다{" "}
          <strong className="text-foreground">
            ‘미루지 않을 결정 하나’
          </strong>
          를 골라 실행한 누적이었습니다. 두 프로덕트의 모든 부채를 다 갚을
          수는 없지만, 각 시점에 ‘다음 분기를 더 살게 만드는 결정 하나’를
          고르는 — 그 ‘우선순위 선정’이 4년 동안 가장 많이 한 일이었다고
          생각합니다.
        </p>
      </div>

      <div className="mt-16 rounded-lg border border-accent/30 bg-accent/5 p-6">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-accent">
          정량 지표
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-2xl font-bold">500개 단지</p>
            <p className="mt-1 text-sm text-muted-foreground">
              플랫폼이 배포된 아파트 단지 수
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold">MAU 10만</p>
            <p className="mt-1 text-sm text-muted-foreground">
              월 활성 사용자 규모
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold">5건 → 1건</p>
            <p className="mt-1 text-sm text-muted-foreground">
              테스트 체계 도입 후 월 평균 핫픽스
            </p>
          </div>
        </div>
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

      <div className="mt-16 rounded-lg border border-border bg-muted/30 p-6">
        <h2 className="text-xl font-bold">덧붙임: 기획·디자인과 함께 만든 사례</h2>
        <ul className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
          <li>
            ・ <strong className="text-foreground">예약 창구 중복 모달</strong>{" "}
            — 시간/장소 중복 검증 결과가 단일 에러 메시지로만 노출되어 운영팀이
            충돌 자원을 추적하지 못해 창구 생성을 포기하는 사례가 발생. 충돌한
            시간·장소 목록을 함께 보여주는 경고 모달 도입을 기획·디자인에
            역제안하여 반영, 운영팀이 충돌 자원을 즉시 식별·재배정할 수 있게
            개선했습니다.
          </li>
          <li>
            ・{" "}
            <strong className="text-foreground">예약 시간 설정 UX 단순화</strong>{" "}
            — 화면 복잡도가 높아 고객사가 직접 설정에 어려움을 겪던 상황. 정보
            그룹 단위 박스 처리·배치 재구성으로 시각적 구분을 강화하는 디자인을
            역제안하여 반영, 고객사 설정 작업의 진입 장벽을 낮췄습니다.
          </li>
        </ul>
      </div>

      <div className="mt-12 rounded-lg border border-accent/30 bg-accent/5 p-6">
        <h2 className="text-xl font-bold">회고: 다시 한다면</h2>
        <ul className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
          <li>
            ・ 1단계 합류 시점에 두 프로덕트의 도메인 모델을 더 빨리
            정리해뒀다면, 이후 2~3단계에서 어떤 프로덕트부터 손댈지의
            우선순위를 더 빨리 잡을 수 있었을 것 같습니다.
          </li>
          <li>
            ・ 4단계 테스트 도입을 더 일찍 시작했다면 핫픽스 감소 효과를 더
            빨리 볼 수 있었을 것 같습니다.
          </li>
          <li>
            ・ 4년 동안 두 프로덕트에서 누적된 변화는 이벤트성 결정이 아니라,
            분기마다 미루지 않은 작은 결정의 합이었다는 점을 가장 크게
            배웠습니다.
          </li>
        </ul>
      </div>
    </Section>
  );
}
