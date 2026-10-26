"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import type { BlogPost, PostType } from "@/lib/blog";
import { GlassSheen } from "@/components/ui/glass-sheen";
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
          {filtered.map((post) => (
            // hover는 움직이지 않는 링크가 받고 안쪽 카드만 떠오른다.
            // glassy에서는 링크를 카드 폭만큼 넓혀서, 떠오른 카드 아래 양옆 가장자리에서도 hover가 풀리지 않게 한다
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block glassy:-mx-4"
            >
              {/* 넓어진 만큼 안쪽 여백을 줘서 글 위치는 그대로 둔다. 테두리는 레이아웃을 바꾸지 않게 ring으로 그린다 */}
              <article className="relative overflow-hidden rounded-md py-7 transition duration-300 ease-out glassy:px-4 glassy:group-hover:bg-muted/40 glassy:group-hover:shadow-xl glassy:group-hover:shadow-accent/20 glassy:group-hover:ring-1 glassy:group-hover:ring-accent/60 glassy:motion-safe:group-hover:-translate-y-1.5">
                <GlassSheen overText />
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-accent">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
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
                        className="rounded-sm border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
