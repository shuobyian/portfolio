"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, Clock, FolderOpen } from "lucide-react";
import type { BlogPost, PostType } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";
import { Card } from "@/components/ui/card";
import { pillClass, tagClass } from "@/components/ui/pill";
import { FilterChips } from "@/components/ui/filter-chips";

const CATEGORY_ORDER = [
  "React",
  "DevOps & 배포",
  "브라우저 & Web API",
  "보안",
  "CSS & UI",
] as const;

type TypeFilter = "all" | PostType;

// 프로젝트 쪽 relatedPostSlugs를 거꾸로 읽어 글마다 다룬 프로젝트를 찾는다
const PROJECT_BY_POST = new Map(
  getAllProjects().flatMap((p) => (p.relatedPostSlugs ?? []).map((slug) => [slug, p] as const))
);

const TYPE_TABS: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "project", label: "프로젝트" },
  { value: "tech", label: "기술" },
];

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [selected, setSelected] = useState<string | null>(null);

  const byType = useMemo(
    () =>
      typeFilter === "all"
        ? posts
        : posts.filter((p) => p.type === typeFilter),
    [posts, typeFilter]
  );

  const categories = useMemo(() => {
    const present = new Set(byType.map((p) => p.category));
    return [
      ...CATEGORY_ORDER.filter((c) => present.has(c)),
      ...Array.from(present).filter(
        (c) => !CATEGORY_ORDER.includes(c as (typeof CATEGORY_ORDER)[number])
      ),
    ];
  }, [byType]);

  const filtered =
    selected && categories.includes(selected)
      ? byType.filter((p) => p.category === selected)
      : byType;

  const selectType = (value: TypeFilter) => {
    setTypeFilter(value);
    setSelected(null); // 타입 전환 시 카테고리 필터 초기화
  };

  return (
    <>
      {/* Primary type tabs */}
      <div className="mt-8 inline-flex rounded-full border border-border p-1">
        {TYPE_TABS.map((tab) => {
          const count =
            tab.value === "all"
              ? posts.length
              : posts.filter((p) => p.type === tab.value).length;
          return (
            <button
              key={tab.value}
              onClick={() => selectType(tab.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${pillClass(typeFilter === tab.value)}`}
            >
              {tab.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Category badges (scoped to selected type) */}
      <FilterChips label="카테고리" current={selected ?? "전체"} className="mt-5">
        <button
          onClick={() => setSelected(null)}
          className={tagClass(selected === null)}
        >
          전체 ({byType.length})
        </button>
        {categories.map((category) => {
          const count = byType.filter((p) => p.category === category).length;
          return (
            <button
              key={category}
              onClick={() =>
                setSelected(selected === category ? null : category)
              }
              className={tagClass(selected === category)}
            >
              {category} ({count})
            </button>
          );
        })}
      </FilterChips>

      {/* Posts list (time-sorted) */}
      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          선택한 카테고리에 해당하는 글이 없습니다.
        </p>
      ) : (
        // glassy에서는 hover한 글만 떠오르는 유리 카드가 되고, 그동안 목록 위아래 선은 사라진다
        <div className="mt-10 border-y border-border transition-colors duration-300 glassy:hover:border-transparent">
          {filtered.map((post) => {
            const project = PROJECT_BY_POST.get(post.slug);
            return (
              // hover는 움직이지 않는 바깥 상자가 받고 안쪽 카드만 떠오른다.
              // glassy에서는 바깥 상자를 카드 폭만큼 넓혀서, 떠오른 카드 아래 양옆 가장자리에서도 hover가 풀리지 않게 한다
              <div key={post.slug} className="group glassy:-mx-4">
                {/* 넓어진 만큼 안쪽 여백을 줘서 글 위치는 그대로 둔다. 평소엔 목록이라 배경은 hover할 때만 깐다 */}
                <Card as="article" overText className="py-7 glassy:px-4 glassy:group-hover:bg-muted/40">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-accent">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {/* 링크 안에 프로젝트 링크를 넣을 수 없어서, 제목 링크를 카드 전체로 늘리고 프로젝트 링크만 그 위로 올린다 */}
                    <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                      {post.title}
                    </Link>
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
                    {project && (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="relative z-10 flex min-w-0 items-center gap-1 text-accent underline-offset-2 hover:underline"
                      >
                        <FolderOpen size={12} className="shrink-0" />
                        <span className="truncate">{project.title}</span>
                      </Link>
                    )}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
