"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectThumbnail } from "./project-thumbnail";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`}>
      {/* hover하면 카드가 떠오르고, 썸네일 테두리와 그림자가 강조색으로 빛난다 */}
      <article className="group transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1.5">
        <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-muted transition duration-300 group-hover:border-accent/60 group-hover:shadow-xl group-hover:shadow-accent/20">
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
          {/* 유리 광택 — 왼쪽 위에서 비치는 반사와 안쪽 테두리의 빛. 밝은 바탕에서도 보이게 오른쪽 아래는 살짝 어둡힌다 */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-br from-white/35 via-white/5 to-black/10 opacity-0 shadow-[inset_0_1px_0_rgb(255_255_255/0.6),inset_0_0_0_1px_rgb(255_255_255/0.12)] transition-opacity duration-300 group-hover:opacity-100"
          />
          {/* 빛줄기 — hover하는 순간 한 번 훑고 지나가고, 벗어나면 바로 제자리로 돌아간다 */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/45 to-transparent opacity-0 transition duration-0 group-hover:translate-x-[600%] group-hover:opacity-100 group-hover:duration-700 group-hover:ease-out motion-reduce:hidden"
          />
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
