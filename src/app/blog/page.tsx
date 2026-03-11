import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Section } from "@/components/ui/section";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section>
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        개발하면서 배운 것들을 기록합니다.
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          아직 작성된 글이 없습니다.
        </p>
      ) : (
        <div className="mt-8 space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="group rounded-lg border border-border p-6 hover:border-accent/50 transition-colors">
                <h2 className="text-lg font-semibold group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {post.description}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readingTime}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}
