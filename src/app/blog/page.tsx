import { Section } from "@/components/ui/section";
import { getAllPosts } from "@/lib/blog";
import { BlogList } from "./blog-list";
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
        개발하면서 배운 것들을 주제별로 정리합니다.
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          아직 작성된 글이 없습니다.
        </p>
      ) : (
        <BlogList posts={posts} />
      )}
    </Section>
  );
}
