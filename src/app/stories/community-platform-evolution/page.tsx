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
    period: "2022",
    slug: "community-platform",
    title: "2. JS → TypeScript, MUI → Ant Design (파트너스)",
    subtitle: "의존받는 레이어부터 전환",
    decision:
      "컨시어지 운영툴(현 파트너스)을 공통 컴포넌트·API·타입 레이어부터 먼저 옮긴 뒤 채널·판매·예약 화면 순으로 TS 전환, 이후 UI는 4개 메뉴 단위로 Ant Design 전환",
    why: "도메인 간 결합이 강해서 화면부터 바꾸면 아직 타입이 없는 API와 공통 컴포넌트를 매번 any로 감싸야 했습니다. 그래서 여러 화면이 의존하는 레이어를 먼저 옮기고 화면은 그 타입을 가져다 쓰게 해, JS/JSX 파일 145개를 4개로 줄였습니다. 같은 해 MUI → Ant Design 전환은 메뉴끼리 서로 의존하지 않아 예약·판매·채널·로그인 4개 메뉴 단위 PR로 나눠 운영 중인 화면을 메뉴별로 검증하며 바꿨습니다.",
    nextHook:
      "타입은 잡혔지만, 배포 후 핫픽스가 월 평균 5건씩 나오고 있었고 이를 배포 전에 잡아낼 프론트엔드 테스트가 한 줄도 없었습니다.",
  },
  {
    period: "2023.02 ~",
    slug: "community-platform",
    title: "3. 첫 프론트엔드 테스트 체계 도입 (운영툴)",
    subtitle: "Jest + MSW · 따라 쓸 수 있는 본보기부터",
    decision:
      "운영툴에 Jest + MSW 테스트 환경을 처음 구성하고, 매장 옵션 CRUD 화면으로 본보기를 만든 뒤 예약 화면으로 확장",
    why: "프론트엔드 테스트 문화가 없던 팀에 처음 도입하는 작업이었기 때문에, 모든 영역을 한 번에 덮으려 하기보다 바로 복사해 쓸 수 있는 예시부터 만들었습니다. 목 API 구조와 antd Select처럼 테스트하기 까다로운 컴포넌트용 유틸을 함께 두자 팀원들도 같은 구조로 테스트를 추가하기 시작했습니다. 그 결과 배포 후 핫픽스가 월 평균 5건 → 1건으로 감소했습니다.",
    nextHook:
      "회귀는 잡히기 시작했지만, 운영툴에서는 서버 상태와 클라이언트 상태가 한 Redux store에 섞여 stale 데이터 노출 이슈가 계속 쌓이고 있었습니다.",
  },
  {
    period: "2023.12 ~ 2024",
    slug: "community-platform",
    title: "4. Redux → React Query 분리 (운영툴)",
    subtitle: "서버 상태 분리 + 컨벤션 정착",
    decision:
      "운영툴에 React Query를 처음 도입하고 도메인별 QUERY_KEY 상수 컨벤션을 만들어, 다른 도메인도 같은 패턴으로 확장",
    why: "캐시 정책과 클라이언트 상태가 한 store에 섞여 있던 게 stale 데이터 노출의 근본 원인이었습니다. 횟수제 이용권 작업에서 React Query와 QUERY_KEY 상수 컨벤션을 함께 들였고, 이후 인증·시설·단지 같은 도메인도 팀원들이 같은 패턴으로 옮겼습니다. 매장관리 영역은 Redux slice와 MVVM 계층을 걷어내 약 4천 줄을 덜어냈습니다. 파트너스에서는 Axios interceptor로 커뮤니티·결제 API 에러를 나눠 운영자용 안내 문구로 매핑했습니다.",
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
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Highlight Story</p>
        <h1 className="mt-2 text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl">
          커뮤니티 + 파트너스 3년 5개월의 점진 개선
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          전국 500개 단지·MAU 10만 규모의 커뮤니티 플랫폼을 커뮤니티와 파트너스
          두 프로덕트에 걸쳐 3년 5개월 동안 운영하며, 어떤 점진적 개선들을
          누적했는지 정리해봤습니다.
        </p>
      </div>

      <div className="mt-12 border-y border-border py-6">
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
          고르는 — 그 ‘우선순위 선정’이 3년 5개월 동안 가장 많이 한 일이었다고
          생각합니다.
        </p>
      </div>

      <div className="mt-16 border-l-2 border-accent pl-6">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-accent">
          정량 지표
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-2xl font-semibold tracking-tight">500개 단지</p>
            <p className="mt-1 text-sm text-muted-foreground">
              플랫폼이 배포된 아파트 단지 수
            </p>
          </div>
          <div>
            <p className="text-2xl font-semibold tracking-tight">MAU 10만</p>
            <p className="mt-1 text-sm text-muted-foreground">
              월 활성 사용자 규모
            </p>
          </div>
          <div>
            <p className="text-2xl font-semibold tracking-tight">5건 → 1건</p>
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
              className="border-t border-border pt-8"
            >
              <p className="font-mono text-sm text-muted-foreground">{stage.period}</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">{stage.title}</h2>
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
                <div className="flex-1 border-l-2 border-dashed border-border py-1 pl-4">
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

      <div className="mt-16 border-y border-border py-6">
        <h2 className="text-xl font-semibold tracking-tight">덧붙임: 기획·디자인과 함께 만든 사례</h2>
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

      <div className="mt-12 border-l-2 border-accent pl-6">
        <h2 className="text-xl font-semibold tracking-tight">회고: 다시 한다면</h2>
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
            ・ 3년 5개월 동안 두 프로덕트에서 누적된 변화는 이벤트성 결정이 아니라,
            분기마다 미루지 않은 작은 결정의 합이었다는 점을 가장 크게
            배웠습니다.
          </li>
        </ul>
      </div>
    </Section>
  );
}
