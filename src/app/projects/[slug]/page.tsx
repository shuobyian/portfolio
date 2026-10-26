import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { GlassSheen } from "@/components/ui/glass-sheen";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { getPostBySlug } from "@/lib/blog";
import { PosKioskDeepDive } from "@/components/projects/pos-kiosk-deep-dive";
import { PharmBridgeRefactorDeepDive } from "@/components/projects/pharm-bridge-refactor-deep-dive";
import { PharmscopeDeepDive } from "@/components/projects/pharmscope-deep-dive";
import { PreprocessBackofficeDeepDive } from "@/components/projects/preprocess-backoffice-deep-dive";
import { CommunityPlatformDeepDive } from "@/components/projects/community-platform-deep-dive";
import { DesignSystemDeepDive } from "@/components/projects/design-system-deep-dive";
import { PharmBridgeDeepDive } from "@/components/projects/pharm-bridge-deep-dive";
import { BackofficeRefactorDeepDive } from "@/components/projects/backoffice-refactor-deep-dive";
import { WbsDeepDive } from "@/components/projects/wbs-deep-dive";
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
    return <span key={i}>{renderMetrics(part)}</span>;
  });
}

// "5건 → 1건", "약 60% 감소" 같은 숫자 변화
const NUM = String.raw`(?:약\s*)?\d[\d.,]*\s*(?:%|KB|[가-힣]{1,2})?`;
const METRIC = new RegExp(
  String.raw`(${NUM}(?:\s[가-힣]{1,3})?\s*→\s*${NUM}|(?:약\s*)?\d[\d.,]*\s*%\s*(?:감소|축소|단축|증가|개선|향상))`,
);

function renderMetrics(text: string) {
  // split에 캡처 그룹을 쓰면 홀수 인덱스가 매칭된 숫자 변화
  return text.split(METRIC).map((part, i) =>
    i % 2 ? (
      <strong key={i} className="rounded-sm bg-accent/10 px-1 font-semibold text-accent">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

// "의사결정: 본문"처럼 짧은 라벨로 시작하면 카드 제목과 본문으로 나눈다
function splitHighlight(text: string) {
  const match = text.match(/^([^:\n]{1,30}): ([\s\S]+)$/);
  return match ? { label: match[1], body: match[2] } : { label: null, body: text };
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

  const keySet = new Set(project.keyHighlights);
  const keyItems = project.highlights.filter((_, i) => keySet.has(i));
  const restItems = project.highlights.filter((_, i) => !keySet.has(i));

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
      <h1 className={`text-4xl font-semibold tracking-tight ${project.company ? "mt-1" : "mt-6"}`}>
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
            className="rounded-sm border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
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
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm hover:bg-muted transition-colors"
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
              className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-sm text-background hover:opacity-85 transition-opacity"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">주요 성과</h2>
        {keyItems.length > 0 && (
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {keyItems.map((item, i) => {
              const { label, body } = splitHighlight(item);
              return (
                // 프로젝트 카드처럼 hover하면 떠오르며 강조색으로 빛나고 유리 광택이 생긴다. 광택은 글자 아래에 깐다
                <li
                  key={i}
                  className="group relative flex flex-col overflow-hidden rounded-md border border-border bg-muted/40 p-5 transition duration-300 ease-out hover:border-accent/60 hover:shadow-xl hover:shadow-accent/20 motion-safe:hover:-translate-y-1.5"
                >
                  <GlassSheen gloss="from-white/10" />
                  {label && (
                    <h3 className="relative font-semibold tracking-tight text-accent">{label}</h3>
                  )}
                  <p className={`relative ${label ? "mt-3 " : ""}text-sm leading-relaxed text-foreground/85`}>
                    {renderHighlight(body)}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
        <ul className={`${keyItems.length > 0 ? "mt-8" : "mt-4"} space-y-3`}>
          {restItems.map((item, i) => (
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
                    className="group flex items-start gap-3 rounded-md border border-border p-4 transition-colors hover:border-accent/50"
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
      {project.slug === "pharmscope" && <PharmscopeDeepDive />}
      {project.slug === "preprocess-backoffice" && (
        <PreprocessBackofficeDeepDive />
      )}
      {project.slug === "community-platform" && <CommunityPlatformDeepDive />}
      {project.slug === "design-system" && <DesignSystemDeepDive />}
      {project.slug === "pharm-bridge" && <PharmBridgeDeepDive />}
      {project.slug === "backoffice-refactor" && <BackofficeRefactorDeepDive />}
      {project.slug === "wbs" && <WbsDeepDive />}
    </Section>
  );
}
