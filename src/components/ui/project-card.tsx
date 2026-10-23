"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectThumbnail } from "./project-thumbnail";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <article className="group">
        <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-muted">
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
