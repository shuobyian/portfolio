"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { GlassSheen } from "./glass-sheen";
import { ProjectThumbnail } from "./project-thumbnail";

export function ProjectCard({ project }: { project: Project }) {
  return (
    // hover는 움직이지 않는 링크가 받는다 — 떠오른 카드가 받으면 아래 가장자리에서 포인터를 벗어났다 돌아오길 반복한다
    <Link href={`/projects/${project.slug}`} className="group block">
      {/* glassy에서 hover하면 카드가 떠오르고, 썸네일 테두리와 그림자가 강조색으로 빛난다 */}
      <article className="transition-transform duration-300 ease-out glassy:motion-safe:group-hover:-translate-y-1.5">
        <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-muted transition duration-300 glassy:group-hover:border-accent/60 glassy:group-hover:shadow-xl glassy:group-hover:shadow-accent/20">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <ProjectThumbnail project={project} />
          )}
          <GlassSheen />
        </div>
        <div className="pt-4">
          {project.company && (
            <p className="mb-1 text-xs text-muted-foreground">{project.company}</p>
          )}
          <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          <p className="mt-3 font-mono text-xs text-muted-foreground">
            {project.tags.slice(0, 4).join(" · ")}
          </p>
        </div>
      </article>
    </Link>
  );
}
