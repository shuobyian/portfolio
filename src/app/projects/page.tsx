"use client";

import { useState, useMemo } from "react";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/ui/project-card";
import { getAllProjects, type Project } from "@/lib/projects";

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

function parsePeriodStart(period: string): number {
  const m = period.match(/(\d{4})\.(\d{2})/);
  if (!m) return 0;
  return parseInt(m[1]) * 100 + parseInt(m[2]);
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
  const allTags = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tags))),
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
      <h1 className="text-3xl font-bold">Projects</h1>
      <p className="mt-2 text-muted-foreground">
        지금까지 진행한 프로젝트들을 회사별로 정리했습니다.
      </p>

      {/* Tag Filter */}
      <div className="mt-8 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter(null)}
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            filter === null
              ? "bg-accent text-accent-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          전체
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(filter === tag ? null : tag)}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              filter === tag
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Company Sections */}
      <div className="mt-12 space-y-16">
        {COMPANIES.map((company) => {
          const list = grouped[company.name] ?? [];
          if (list.length === 0) return null;
          return (
            <div key={company.name}>
              <div className="mb-6 border-l-2 border-accent pl-4">
                <h2 className="text-2xl font-bold">{company.name}</h2>
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
              <h2 className="text-2xl font-bold">개인 프로젝트</h2>
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
