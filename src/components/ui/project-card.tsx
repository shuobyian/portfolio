"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { ProjectThumbnail } from "./project-thumbnail";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group overflow-hidden rounded-lg border border-border bg-background hover:border-accent/50 transition-colors"
      >
        <div className="relative aspect-video overflow-hidden bg-muted">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <ProjectThumbnail project={project} />
          )}
        </div>
        <div className="p-4">
          {project.company && (
            <p className="text-xs text-accent font-medium mb-1">{project.company}</p>
          )}
          <h3 className="font-semibold text-foreground">{project.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
