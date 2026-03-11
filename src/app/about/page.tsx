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
          복잡한 도메인(예약·결제·이용권·POS·KIOSK)을 가진 서비스를 4년 이상
          설계·운영한 프론트엔드 개발자입니다. React·TypeScript 기반 아키텍처
          개선, 디자인 시스템 구축, 테스트 및 CI/CD 자동화를 통해 유지보수성과
          개발 생산성 향상을 주도해 왔으며, 신설 기업 환경에서 프론트엔드와
          개발 환경을 0→1로 구축한 경험을 보유하고 있습니다.
        </p>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold">경력</h2>
        <p className="mt-1 text-sm text-muted-foreground">총 4년 6개월</p>
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
