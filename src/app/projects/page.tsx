"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/ui/project-card";
import { getAllProjects } from "@/lib/projects";

export default function ProjectsPage() {
  const projects = getAllProjects();
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter
    ? projects.filter((p) => p.tags.includes(filter))
    : projects;

  return (
    <Section>
      <h1 className="text-3xl font-bold">Projects</h1>
      <p className="mt-2 text-muted-foreground">
        지금까지 진행한 프로젝트들입니다.
      </p>

      {/* Filter */}
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

      {/* Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
