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
  { category: "Infra / DevOps", items: ["AWS", "Jenkins", "Git Actions", "Docker", "Ansible"] },
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
              복잡한 도메인(예약·결제·이용권·POS·KIOSK)을 가진 서비스를 4년 이상
              설계·운영한 프론트엔드 개발자입니다. 아키텍처 개선, 디자인 시스템
              구축, 테스트 및 CI/CD 자동화를 통해 유지보수성과 개발 생산성 향상을
              주도해왔습니다.
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
