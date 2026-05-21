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
      <section className="relative overflow-hidden py-28 sm:py-40">
        <div className="mesh-bg" aria-hidden>
          <div className="mesh-blob" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgb(52_211_153/0.8)]" />
              지금 새로운 기회 탐색 중
            </div>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-7xl">
              안녕하세요,
              <br />
              저는{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                장수빈
              </span>
              입니다.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              예약·결제·POS·KIOSK처럼{" "}
              <span className="text-foreground">상태·캐시·동기화 복잡도가 높은 도메인</span>을
              5년간 다뤄온 프론트엔드 개발자입니다. 안정적 운영과 0→1 초기 구축
              양쪽에 즉시 기여할 수 있습니다.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
              >
                프로젝트 보기
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-5 py-2.5 text-sm font-medium backdrop-blur-md hover:bg-muted transition-colors"
              >
                이력서 다운로드
                <Download size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlight Stories */}
      <Section>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-accent">Highlight Stories</p>
            <h2 className="mt-2 text-2xl font-bold">의사결정 흐름 모음</h2>
          </div>
        </div>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          여러 프로젝트나 한 코드베이스 안에서의 의사결정·진화 흐름을 정리한
          스토리입니다.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              slug: "design-system",
              title: "디자인 시스템의 4단 진화",
              summary:
                "신설 조직의 시스템을 0→1로 만든 뒤, 4개 프로젝트에 걸쳐 어떻게 진화시켰는지에 대한 약 1년의 흐름.",
            },
            {
              slug: "pharm-bridge-evolution",
              title: "팜브릿지: Vanilla → React Island",
              summary:
                "한 프로젝트가 ‘그 시점의 최선’으로 만들어진 뒤, 운영하며 마주친 한계를 같은 제약 안에서 진화시킨 8개월.",
            },
            {
              slug: "community-platform-evolution",
              title: "커뮤니티 + 파트너스 4년의 점진 개선",
              summary:
                "전국 500개 단지·MAU 10만 규모의 커뮤니티와 파트너스 두 프로덕트를 4년간 운영하며 누적한 점진적 개선의 기록.",
            },
          ].map((story) => (
            <Link
              key={story.slug}
              href={`/stories/${story.slug}`}
              className="group flex flex-col rounded-lg border border-border bg-muted/30 p-5 transition-colors hover:border-accent/50 hover:bg-muted/50"
            >
              <h3 className="text-lg font-bold transition-colors group-hover:text-accent">
                {story.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {story.summary}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent">
                스토리 보기
                <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
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
