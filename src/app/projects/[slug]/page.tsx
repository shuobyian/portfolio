import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { getPostBySlug } from "@/lib/blog";
import { PosKioskDeepDive } from "@/components/projects/pos-kiosk-deep-dive";
import { PharmBridgeRefactorDeepDive } from "@/components/projects/pharm-bridge-refactor-deep-dive";
import type { Metadata } from "next";

function renderHighlight(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      const [, label, href] = match;
      return (
        <Link
          key={i}
          href={href}
          className="text-accent underline-offset-2 hover:underline"
        >
          {label}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return { title: project?.title ?? "Project" };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <Section>
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={14} />
        프로젝트 목록
      </Link>

      {project.company && (
        <p className="mt-6 text-sm font-medium text-accent">{project.company}</p>
      )}
      <h1 className={`text-3xl font-bold ${project.company ? "mt-1" : "mt-6"}`}>
        {project.title}
      </h1>
      <p className="mt-2 text-muted-foreground">{project.description}</p>

      <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span>기간: {project.period}</span>
        <span>역할: {project.role}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {(project.github || project.demo) && (
        <div className="mt-6 flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted transition-colors"
            >
              <Github size={14} />
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm text-accent-foreground hover:opacity-90 transition-opacity"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-xl font-semibold">주요 성과</h2>
        <ul className="mt-4 space-y-3">
          {project.highlights.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span>{renderHighlight(item)}</span>
            </li>
          ))}
        </ul>
      </div>

      {project.relatedPostSlugs && project.relatedPostSlugs.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold">관련 블로그 글</h2>
          <ul className="mt-4 space-y-3">
            {project.relatedPostSlugs.map((slug) => {
              const post = getPostBySlug(slug);
              if (!post) return null;
              return (
                <li key={slug}>
                  <Link
                    href={`/blog/${slug}`}
                    className="group flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:border-accent/50"
                  >
                    <BookOpen
                      size={16}
                      className="mt-1 flex-shrink-0 text-accent"
                    />
                    <div className="min-w-0">
                      <p className="font-medium transition-colors group-hover:text-accent">
                        {post.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {project.slug === "pos-kiosk" && <PosKioskDeepDive />}
      {project.slug === "pharm-bridge-refactor" && (
        <PharmBridgeRefactorDeepDive />
      )}
    </Section>
  );
}
