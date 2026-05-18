import { Section } from "@/components/ui/section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

const experiences = [
  {
    company: "주식회사 알스솔루션",
    role: "프론트엔드 개발 선임",
    period: "2025.03 - 재직중",
    description:
      "신설 기업 초기 단계에서 프론트엔드 및 개발 환경 전반을 0→1로 구축. 디자인 시스템, 공통 API/설정, ESLint 등을 사내 표준 npm 패키지로 구축·배포하여 멀티 프로젝트 개발 기반 마련. Jenkins 기반 CI/CD에서 AWS CodeArtifact 연동 및 인증 자동화 구축.",
  },
  {
    company: "주식회사 에이치티비욘드",
    role: "프론트엔드 개발",
    period: "2021.08 - 2024.12",
    description:
      "아파트 커뮤니티 플랫폼 프론트엔드 개발 및 장기 운영. 예약·결제·이용권·POS·KIOSK 등 도메인 복잡도가 높은 서비스를 다년간 운영하며 아키텍처 개선과 기술 부채 해소를 지속적으로 수행.",
  },
];

const education = [
  {
    school: "인하대학교",
    major: "정보통신공학 학사",
    period: "2016.02 - 2020.02",
    note: "알고리즘, 데이터베이스, 운영체제, 시스템프로그래밍",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section>
        <h1 className="text-3xl font-bold">About Me</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          복잡한 화면 뒤의 상태·캐시·동기화 문제를 풀어내는 데서 가장 큰 즐거움을
          느끼는 5년차 프론트엔드 개발자입니다. 예약·결제·POS·KIOSK처럼 한 화면에
          여러 상태가 얽히는 도메인을 다뤄왔으며, 전국 500개 단지·MAU 10만 규모의
          서비스에서 React Query 캐시 전략·다중 윈도우 동기화·옵션 그룹 기반 상품
          모델링 같은 문제를 직접 설계해 풀어왔습니다. 신설 조직에서는 디자인
          시스템·CI/CD·개발 표준을 입사 3개월 만에 0→1로 정착시키고, 사내 3개
          프로젝트의 특성에 맞춰 디자인 시스템 3종을 설계·운영하고 있습니다. 기획·디자인과 같은 테이블에서
          모델을 다듬는 협업을 즐기며, 인프라부터 백엔드까지 도메인 전반에 관심을
          두고 일합니다.
        </p>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold">경력</h2>
        <p className="mt-1 text-sm text-muted-foreground">총 4년 8개월</p>
        <div className="mt-8 space-y-10">
          {experiences.map((exp) => (
            <div key={exp.company} className="border-l-2 border-accent pl-6">
              <p className="text-sm text-muted-foreground">{exp.period}</p>
              <h3 className="mt-1 text-lg font-semibold">{exp.company}</h3>
              <p className="text-accent text-sm font-medium">{exp.role}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold">학력</h2>
        <div className="mt-8 space-y-6">
          {education.map((edu) => (
            <div key={edu.school} className="border-l-2 border-border pl-6">
              <p className="text-sm text-muted-foreground">{edu.period}</p>
              <h3 className="mt-1 text-lg font-semibold">{edu.school}</h3>
              <p className="text-muted-foreground">{edu.major}</p>
              {edu.note && (
                <p className="mt-1 text-sm text-muted-foreground">{edu.note}</p>
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
