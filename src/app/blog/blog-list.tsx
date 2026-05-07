"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

const CATEGORY_ORDER = [
  "React",
  "DevOps & 배포",
  "브라우저 & Web API",
  "CSS & UI",
] as const;

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const categories = useMemo(() => {
    const present = new Set(posts.map((p) => p.category));
    return [
      ...CATEGORY_ORDER.filter((c) => present.has(c)),
      ...Array.from(present).filter(
        (c) => !CATEGORY_ORDER.includes(c as (typeof CATEGORY_ORDER)[number])
      ),
    ];
  }, [posts]);

  const [selected, setSelected] = useState<string | null>(null);

  const filtered = selected
    ? posts.filter((p) => p.category === selected)
    : posts;

  return (
    <>
      {/* Category badges */}
      <div className="mt-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelected(null)}
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            selected === null
              ? "bg-accent text-accent-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          전체 ({posts.length})
        </button>
        {categories.map((category) => {
          const count = posts.filter((p) => p.category === category).length;
          return (
            <button
              key={category}
              onClick={() =>
                setSelected(selected === category ? null : category)
              }
              className={`rounded-full px-3 py-1 text-sm transition-colors ${
                selected === category
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>

      {/* Posts list (time-sorted) */}
      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          선택한 카테고리에 해당하는 글이 없습니다.
        </p>
      ) : (
        <div className="mt-10 flex flex-col gap-10">
          {filtered.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="group rounded-lg border border-border p-6 transition-colors hover:border-accent/50">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                    {post.category}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
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
    </>
  );
}
