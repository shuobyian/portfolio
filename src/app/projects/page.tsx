"use client";

import { useState, useMemo } from "react";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/ui/project-card";
import { tagClass } from "@/components/ui/pill";
import { FilterChips } from "@/components/ui/filter-chips";
import {
  getAllProjects,
  parsePeriodStart,
  type Project,
} from "@/lib/projects";

const COMPANIES = [
  {
    name: "알스솔루션",
    period: "2025.03 - 재직중",
    role: "프론트엔드 개발 선임",
  },
  {
    name: "에이치티비욘드",
    period: "2021.08 - 2024.12 (3년 5개월)",
    role: "프론트엔드 개발",
  },
] as const;

// 태그 필터를 묶어 보여줄 분류. 여기 없는 태그는 "기타"로 모인다
const TAG_GROUPS = [
  { label: "언어·프레임워크", tags: ["React", "React 19", "Vue.js", "TypeScript", "JavaScript", "HTML", "CSS"] },
  { label: "상태·통신", tags: ["React Query", "Redux", "Recoil", "Zustand", "Axios", "SSE", "Broadcast Channel API", "localStorage"] },
  {
    label: "UI·디자인 시스템",
    tags: ["Ant Design", "MUI", "Bootstrap", "Tailwind CSS", "Emotion", "CSS Variables", "Storybook", "Lexical", "AntV G2", "Monorepo Design System", "자체 디자인 시스템"],
  },
  { label: "렌더링·플랫폼", tags: ["SSR/CSR Hybrid", "React Island Pattern", "PWA", "Service Worker", "Electron"] },
  { label: "테스트", tags: ["Vitest", "Jest", "Playwright", "MSW", "node:test"] },
  { label: "빌드·패키지", tags: ["Vite", "Monorepo", "pnpm Monorepo", "사내 npm 패키지", "ESLint"] },
  {
    label: "배포·인프라",
    tags: ["Jenkins", "Docker", "nginx", "AWS S3", "AWS CodeArtifact", "Ansible Semaphore", "Git Tag", "YAML", "Linux"],
  },
  { label: "백엔드·DB", tags: ["Node.js", "NestJS", "PostgreSQL", "MySQL"] },
  { label: "연동·분석", tags: ["Atlassian OAuth", "Jira REST API", "FCM", "GA4 · Clarity", "Google Analytics"] },
];

function groupTags(tags: string[]) {
  const present = new Set(tags);
  const known = new Set(TAG_GROUPS.flatMap((g) => g.tags));
  return [
    ...TAG_GROUPS.map((g) => ({ label: g.label, tags: g.tags.filter((t) => present.has(t)) })),
    { label: "기타", tags: tags.filter((t) => !known.has(t)) },
  ].filter((g) => g.tags.length > 0);
}

function groupByCompany(projects: Project[]): Record<string, Project[]> {
  const byCompany: Record<string, Project[]> = {};
  for (const p of projects) {
    const key = p.company ?? "__personal__";
    (byCompany[key] ??= []).push(p);
  }
  for (const k of Object.keys(byCompany)) {
    byCompany[k].sort(
      (a, b) => parsePeriodStart(b.period) - parsePeriodStart(a.period)
    );
  }
  return byCompany;
}

export default function ProjectsPage() {
  const projects = getAllProjects();
  const tagGroups = useMemo(
    () => groupTags(Array.from(new Set(projects.flatMap((p) => p.tags)))),
    [projects]
  );
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter
    ? projects.filter((p) => p.tags.includes(filter))
    : projects;

  const grouped = useMemo(() => groupByCompany(filtered), [filtered]);
  const personal = grouped["__personal__"] ?? [];

  return (
    <Section>
      <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-2 text-muted-foreground">
        지금까지 진행한 프로젝트들을 회사별로 정리했습니다.
      </p>

      {/* Tag Filter */}
      <FilterChips label="태그" current={filter ?? "전체"} className="mt-8">
        <div className="w-full space-y-3">
          <button
            onClick={() => setFilter(null)}
            className={tagClass(filter === null)}
          >
            전체
          </button>
          {/* 모바일에서는 분류 이름을 칩 위에, 넓은 화면에서는 왼쪽 열에 둔다 */}
          {tagGroups.map((group) => (
            <div key={group.label} className="flex flex-col gap-2 sm:flex-row">
              <span className="shrink-0 text-xs font-medium text-muted-foreground sm:w-32 sm:pt-1.5">
                {group.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setFilter(filter === tag ? null : tag)}
                    className={tagClass(filter === tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FilterChips>

      {/* Company Sections */}
      <div className="mt-12 space-y-16">
        {COMPANIES.map((company) => {
          const list = grouped[company.name] ?? [];
          if (list.length === 0) return null;
          return (
            <div key={company.name}>
              <div className="mb-6 border-l-2 border-accent pl-4">
                <h2 className="text-2xl font-semibold tracking-tight">{company.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {company.period} · {company.role}
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          );
        })}

        {personal.length > 0 && (
          <div>
            <div className="mb-6 border-l-2 border-border pl-4">
              <h2 className="text-2xl font-semibold tracking-tight">개인 프로젝트</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                사이드 프로젝트
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {personal.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        )}

        {Object.keys(grouped).length === 0 && (
          <p className="text-center text-muted-foreground">
            선택한 태그에 해당하는 프로젝트가 없습니다.
          </p>
        )}
      </div>
    </Section>
  );
}
