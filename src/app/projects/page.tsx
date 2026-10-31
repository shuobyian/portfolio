"use client";

import { useState, useMemo, useSyncExternalStore } from "react";
import { LayoutGrid, ListChecks, Share2 } from "lucide-react";
import { ProjectRelationMap } from "@/components/projects/project-relation-map";
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
  { label: "렌더링·플랫폼", tags: ["SSR/CSR Hybrid", "React Island Pattern"] },
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

type View = "list" | "map";

function subscribeLocation(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

function readViewFromUrl(): View {
  return new URLSearchParams(window.location.search).get("view") === "map" ? "map" : "list";
}

export default function ProjectsPage() {
  const projects = getAllProjects();
  const tagGroups = useMemo(
    () => groupTags(Array.from(new Set(projects.flatMap((p) => p.tags)))),
    [projects]
  );
  // 여러 태그를 고를 수 있고, 고른 태그 중 하나라도 있는 프로젝트를 보여준다. 비어 있으면 전체
  const [selected, setSelected] = useState<string[]>([]);
  // 홈의 "전체 관계도 보기"처럼 ?view=map 으로 들어오면 관계도부터 보여준다. 버튼으로 고른 값이 URL보다 우선한다
  const urlView = useSyncExternalStore(subscribeLocation, readViewFromUrl, () => "list" as View);
  const [chosenView, setChosenView] = useState<View | null>(null);
  const view = chosenView ?? urlView;
  const changeView = (next: View) => {
    setChosenView(next);
    const url = new URL(window.location.href);
    if (next === "map") url.searchParams.set("view", "map");
    else url.searchParams.delete("view");
    window.history.replaceState(window.history.state, "", url);
  };
  const has = (tag: string) => selected.includes(tag);
  const toggleTag = (tag: string) =>
    setSelected(has(tag) ? selected.filter((t) => t !== tag) : [...selected, tag]);
  // 분류를 누르면 그 분류의 태그를 모두 고르고, 이미 모두 골라져 있으면 모두 뺀다
  const toggleGroup = (tags: string[]) =>
    setSelected(
      tags.every(has)
        ? selected.filter((t) => !tags.includes(t))
        : [...selected, ...tags.filter((t) => !has(t))]
    );

  const filtered = selected.length
    ? projects.filter((p) => p.tags.some(has))
    : projects;

  // 접힌 필터 버튼에 보일 요약 — 통째로 고른 분류는 분류 이름으로, 나머지는 태그 이름으로 센다
  const fullGroups = tagGroups.filter((g) => g.tags.every(has));
  const names = [
    ...fullGroups.map((g) => g.label),
    ...selected.filter((t) => !fullGroups.some((g) => g.tags.includes(t))),
  ];
  const summary = !names.length
    ? "전체"
    : names.length === 1
      ? names[0]
      : `${names[0]} 외 ${names.length - 1}개`;

  const grouped = useMemo(() => groupByCompany(filtered), [filtered]);
  const personal = grouped["__personal__"] ?? [];

  return (
    <Section>
      <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-2 text-muted-foreground">
        지금까지 진행한 프로젝트들을 회사별로 정리했습니다.
      </p>

      <div role="group" aria-label="보기 방식" className="mt-8 flex gap-2">
        {(
          [
            ["list", "목록", LayoutGrid],
            ["map", "관계도", Share2],
          ] as const
        ).map(([value, label, Icon]) => (
          <button
            key={value}
            aria-pressed={view === value}
            onClick={() => changeView(value)}
            className={`inline-flex items-center gap-1.5 ${tagClass(view === value)}`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {view === "map" ? (
        <div className="mt-8">
          <ProjectRelationMap />
        </div>
      ) : (
      <>
      {/* Tag Filter */}
      <FilterChips label="카테고리" current={summary} collapsible className="mt-6">
        {/* 모바일에서는 전체와 분류 버튼만 칩처럼 늘어놓고, 넓은 화면에서는 분류마다 줄을 나눠 왼쪽 열에 분류, 오른쪽에 태그를 둔다 */}
        <div className="flex w-full flex-wrap gap-2 md:block md:space-y-3">
          <button
            aria-pressed={!selected.length}
            onClick={() => setSelected([])}
            className={tagClass(!selected.length)}
          >
            전체
          </button>
          {tagGroups.map((group) => {
            const allSelected = fullGroups.includes(group);
            // 넓은 화면에서 일부 태그만 골라 둔 채 모바일로 바뀌어도 어느 분류에 필터가 걸렸는지 보이게, 일부 선택은 점선 테두리로 표시한다
            const someSelected = !allSelected && group.tags.some(has);
            return (
              <div key={group.label} className="contents md:flex md:gap-2">
                {/* 분류 이름이 곧 전체 선택 버튼이다. 모바일에서는 태그 칩과 같은 모양이고,
                    넓은 화면에서는 테두리 없는 작은 알약으로 바꾸고 음수 마진으로 글자를 칩 열에 맞춘다 */}
                <div className="contents md:block md:w-32 md:shrink-0 md:pt-[3px]">
                  <button
                    aria-pressed={someSelected ? "mixed" : allSelected}
                    title={`${group.label} 태그 ${allSelected ? "모두 빼기" : "모두 고르기"}`}
                    onClick={() => toggleGroup(group.tags)}
                    className={`inline-flex items-center gap-1 ${tagClass(allSelected)} ${someSelected ? "border-dashed" : ""} md:-ml-2 md:border-0 md:px-2 md:text-xs md:font-medium`}
                  >
                    <ListChecks size={12} />
                    {group.label}
                  </button>
                </div>
                <div className="hidden flex-wrap gap-2 md:flex">
                  {group.tags.map((tag) => (
                    <button
                      key={tag}
                      aria-pressed={has(tag)}
                      onClick={() => toggleTag(tag)}
                      className={tagClass(has(tag))}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
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
      </>
      )}
    </Section>
  );
}
