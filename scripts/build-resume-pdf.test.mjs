// 실행: node --test scripts/
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { toHtmlBody } from "./build-resume-pdf.mjs";

const BAR = "═".repeat(40);

test("═ 쌍 사이의 한 줄만 대분류 띠가 된다", () => {
  const html = toHtmlBody(`이름\n\n${BAR}\n\n경력\n\n${BAR}\n`);
  assert.match(html, /<h2 class="band">경력<\/h2>/);
});

test("단독 ═ 는 구분선일 뿐, 뒤 섹션을 제목으로 삼키지 않는다", () => {
  // 실제 resume.md 구조: 회사 사이 구분선 하나 → 다음 띠까지 거리가 멀다
  const html = toHtmlBody(
    [
      "이름",
      "",
      BAR,
      "",
      "■ 회사",
      "",
      "▣ 프로젝트",
      "",
      "· 한 일",
      "",
      BAR,
      "",
      "학력",
      "",
      BAR,
      "",
    ].join("\n"),
  );
  assert.match(html, /<h3 class="org">회사<\/h3>/);
  assert.match(html, /<h4 class="item">프로젝트<\/h4>/);
  assert.match(html, /<li>한 일<\/li>/);
  assert.match(html, /<h2 class="band">학력<\/h2>/);
});

test("실제 resume.md의 모든 ▣ 항목이 제목으로 살아난다", () => {
  const md = readFileSync(new URL("../resume.md", import.meta.url), "utf8");
  const expected = md.split("\n").filter((l) => l.startsWith("▣ ")).length;
  const actual = toHtmlBody(md).match(/<h4 class="item">/g)?.length ?? 0;
  assert.equal(actual, expected);
});
