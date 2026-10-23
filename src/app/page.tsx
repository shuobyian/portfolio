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

const stories = [
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
];

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border py-24 sm:py-36">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              지금 새로운 기회 탐색 중
            </p>
            <h1 className="mt-8 text-5xl font-semibold leading-[1.1] tracking-tight sm:text-7xl">
              안녕하세요,
              <br />
              저는 <span className="text-accent">장수빈</span>입니다.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              예약·결제·POS·KIOSK처럼{" "}
              <span className="text-foreground">상태·캐시·동기화 복잡도가 높은 도메인</span>을
              5년간 다뤄온 프론트엔드 개발자입니다. 안정적 운영과 0→1 초기 구축
              양쪽에 즉시 기여할 수 있습니다.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                프로젝트 보기
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 text-sm font-medium underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
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
        <SectionHeading label="Highlight Stories" title="의사결정 흐름 모음" />
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          여러 프로젝트나 한 코드베이스 안에서의 의사결정·진화 흐름을 정리한
          스토리입니다.
        </p>
        <ol className="mt-10 divide-y divide-border border-y border-border">
          {stories.map((story, i) => (
            <li key={story.slug}>
              <Link
                href={`/stories/${story.slug}`}
                className="group grid gap-2 py-7 sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <span className="font-mono text-sm text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {story.title}
                  </h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                    {story.summary}
                  </p>
                </div>
                <ArrowRight
                  size={18}
                  className="hidden text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent sm:block"
                />
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      {/* Featured Projects */}
      <Section>
        <div className="flex items-end justify-between gap-4">
          <SectionHeading label="Projects" title="주요 프로젝트" />
          <Link
            href="/projects"
            className="shrink-0 text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
          >
            전체 보기
          </Link>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section>
        <SectionHeading label="Stack" title="기술 스택" />
        <dl className="mt-10 divide-y divide-border border-y border-border">
          {skills.map((group) => (
            <div
              key={group.category}
              className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6"
            >
              <dt className="font-mono text-sm text-muted-foreground">{group.category}</dt>
              <dd>{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{label}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}
