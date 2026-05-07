"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/ui/project-card";
import { getFeaturedProjects } from "@/lib/projects";

const skills = [
  { category: "Frontend", items: ["React", "TypeScript", "JavaScript", "HTML/CSS", "Next.js"] },
  { category: "State / Data", items: ["React Query", "Redux", "Recoil", "Zod"] },
  { category: "UI / Design System", items: ["Tailwind CSS", "Ant Design", "MUI", "Bootstrap", "Storybook"] },
  { category: "Test", items: ["Jest", "MSW"] },
  { category: "Infra / DevOps", items: ["AWS", "Jenkins", "GitHub Actions", "Docker", "Ansible"] },
  { category: "Backend", items: ["Node.js", "NestJS", "PostgreSQL", "MySQL"] },
];

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-sm font-medium text-accent">안녕하세요, 저는</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              프론트엔드 개발자
              <br />
              <span className="text-accent">장수빈</span>입니다
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground leading-relaxed">
              복잡한 상태와 비동기 흐름을 풀어내는 데 즐거움을 느끼는 5년차
              프론트엔드 개발자입니다. 예약·결제·POS·KIOSK 같은 도메인에서 전국
              500개 단지·MAU 10만 규모의 서비스를 만들어왔고, 신설 조직의
              프론트엔드 표준을 입사 3개월 만에 0→1로 정착시킨 경험이 있습니다.
              기획·디자인부터 인프라까지, 제품을 만드는 전 과정에 관심이 많습니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
              >
                프로젝트 보기
                <ArrowRight size={16} />
              </Link>
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
              >
                이력서 다운로드
                <Download size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlight Story */}
      <Section>
        <Link
          href="/stories/design-system"
          className="block rounded-lg border border-border bg-muted/30 p-6 transition-colors hover:border-accent/50 hover:bg-muted/50"
        >
          <p className="text-sm font-medium text-accent">Highlight Story</p>
          <h2 className="mt-2 text-2xl font-bold">디자인 시스템의 4단 진화</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground leading-relaxed">
            신설 조직에 디자인 시스템을 0→1로 만든 뒤, 운영 환경에서 어떻게
            진화시켜왔는지에 대한 약 1년의 의사결정 흐름. 4개 프로젝트가 한
            덩어리로 이어지는 시니어 시각 의사결정 스토리.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent">
            스토리 보기
            <ArrowRight size={14} />
          </span>
        </Link>
      </Section>

      {/* Featured Projects */}
      <Section>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">주요 프로젝트</h2>
          <Link
            href="/projects"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            전체 보기 &rarr;
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section>
        <h2 className="text-2xl font-bold">기술 스택</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border px-3 py-1.5 text-sm hover:border-accent/50 hover:text-accent transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
