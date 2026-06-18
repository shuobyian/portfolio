import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Section } from "@/components/ui/section";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { AdminAlsDeploymentDiagram } from "@/components/blog/admin-als-deployment-diagram";
import {
  BiProviderStackDiagram,
  BiSessionBootstrapDiagram,
  BiDependencyDirectionDiagram,
} from "@/components/blog/bi-state-architecture-diagram";
import { AlsFanInGraphDiagram } from "@/components/blog/als-fanin-architecture-diagram";
import type { Metadata } from "next";

const mdxComponents = {
  AdminAlsDeploymentDiagram,
  BiProviderStackDiagram,
  BiSessionBootstrapDiagram,
  BiDependencyDirectionDiagram,
  AlsFanInGraphDiagram,
};

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return { title: post?.title ?? "Blog" };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <Section>
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={14} />
        블로그 목록
      </Link>

      <h1 className="mt-6 text-3xl font-bold">{post.title}</h1>

      <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          {post.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {post.readingTime}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <article className="prose prose-neutral dark:prose-invert mt-12 max-w-none">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>
    </Section>
  );
}
