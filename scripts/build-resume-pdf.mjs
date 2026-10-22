// resume.md → public/resume.pdf
// 실행: node scripts/build-resume-pdf.mjs
// Chrome headless의 print-to-pdf를 쓴다. 별도 의존성 없음.
import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const linkify = (s) =>
  esc(s).replace(
    /(https?:\/\/[^\s]+)/g,
    (url) => `<a href="${url}">${url}</a>`,
  );

export function toHtmlBody(md) {
  const lines = md.split("\n");
  const out = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };
  const openList = () => {
    if (!inList) {
      out.push("<ul>");
      inList = true;
    }
  };

  // 첫 블록: 이름 + 연락처
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i++;
  out.push(`<h1>${esc(lines[i].trim())}</h1>`);
  i++;
  const contact = [];
  for (; i < lines.length && !/^[■═]/.test(lines[i]); i++) {
    const t = lines[i].trim();
    if (t) contact.push(esc(t));
  }
  out.push(`<p class="contact">${contact.join("<span>·</span>")}</p>`);

  for (; i < lines.length; i++) {
    const raw = lines[i];
    const t = raw.trim();

    if (t === "") {
      closeList();
      continue;
    }

    // ════ 는 두 가지로 쓰인다.
    //  (1) 위아래 쌍 사이에 제목 한 줄 → 대분류 띠 (경력 / 학력 / 링크 …)
    //  (2) 단독 → 회사 구분선. 쌍으로 오인하면 섹션 전체를 제목으로 삼킨다.
    if (/^═+$/.test(t)) {
      closeList();
      const end = lines.findIndex((l, n) => n > i && /^═+$/.test(l.trim()));
      const inner =
        end === -1
          ? []
          : lines
              .slice(i + 1, end)
              .map((l) => l.trim())
              .filter(Boolean);
      const isBand = inner.length === 1 && !/^[■▣·\[]/.test(inner[0]);
      if (isBand) {
        out.push(`<h2 class="band">${esc(inner[0])}</h2>`);
        i = end;
      } else {
        out.push('<hr class="section-sep" />');
      }
      continue;
    }

    if (/^─+$/.test(t)) {
      closeList();
      out.push('<hr class="item-sep" />');
      continue;
    }

    closeListIfBlockStart(t, closeList);

    if (t.startsWith("■ ")) {
      out.push(`<h3 class="org">${esc(t.slice(2))}</h3>`);
      continue;
    }
    if (t.startsWith("▣ ")) {
      out.push(`<h4 class="item">${esc(t.slice(2))}</h4>`);
      continue;
    }
    if (/^\[.+\]$/.test(t)) {
      out.push(`<p class="label">${esc(t.slice(1, -1))}</p>`);
      continue;
    }
    if (t.startsWith("· ")) {
      openList();
      out.push(`<li>${linkify(t.slice(2))}</li>`);
      continue;
    }
    if (t.startsWith("기술 스택 :")) {
      out.push(
        `<p class="stack"><span>기술 스택</span>${esc(t.replace(/^기술 스택 :\s*/, ""))}</p>`,
      );
      continue;
    }
    // [개요] 등이 같은 줄에 붙어 있는 경우 (수상/기타 섹션)
    const inlineLabel = t.match(/^\[(.+?)\]\s*(.*)$/);
    if (inlineLabel) {
      out.push(
        `<p class="inline-label"><span>${esc(inlineLabel[1])}</span>${esc(inlineLabel[2])}</p>`,
      );
      continue;
    }
    out.push(`<p>${linkify(t)}</p>`);
  }
  closeList();
  return out.join("\n");
}

// 목록 뒤에 블록 요소가 오면 <ul>을 닫는다
function closeListIfBlockStart(t, closeList) {
  if (/^[■▣]/.test(t) || /^\[.+\]$/.test(t) || t.startsWith("기술 스택 :")) {
    closeList();
  }
}

const buildHtml = (md) => `<!doctype html>
<html lang="ko"><head><meta charset="utf-8" /><title>장수빈 이력서</title>
<style>
  @page { size: A4; margin: 14mm 14mm 16mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: "Apple SD Gothic Neo", "Pretendard", sans-serif;
    font-size: 9.2pt;
    line-height: 1.6;
    color: #1a1a1a;
    -webkit-print-color-adjust: exact;
  }
  h1 { font-size: 20pt; margin: 0 0 4px; letter-spacing: -0.3px; }
  .contact { margin: 0 0 18px; color: #555; font-size: 9pt; }
  .contact span { margin: 0 6px; color: #bbb; }

  h2.band {
    margin: 22px 0 10px;
    padding: 5px 0;
    font-size: 11.5pt;
    border-top: 1.6px solid #1a1a1a;
    border-bottom: 1.6px solid #1a1a1a;
    text-align: center;
    letter-spacing: 1px;
  }
  h3.org {
    margin: 16px 0 6px;
    font-size: 11pt;
    padding-bottom: 3px;
    border-bottom: 1px solid #ddd;
  }
  h4.item {
    margin: 13px 0 5px;
    font-size: 9.8pt;
    color: #0b3d63;
    page-break-after: avoid;
  }
  p { margin: 3px 0; }
  p.label {
    margin: 8px 0 2px;
    font-size: 8.6pt;
    font-weight: 600;
    color: #666;
    letter-spacing: 0.5px;
  }
  ul { margin: 2px 0 6px; padding-left: 15px; }
  li { margin: 2px 0; }
  p.stack {
    margin: 6px 0 2px;
    font-size: 8.5pt;
    color: #444;
    background: #f5f6f7;
    border-radius: 3px;
    padding: 4px 7px;
  }
  p.stack span {
    font-weight: 600;
    color: #0b3d63;
    margin-right: 6px;
  }
  p.inline-label span {
    font-weight: 600;
    color: #666;
    margin-right: 5px;
  }
  hr.item-sep { border: 0; border-top: 1px dashed #e2e2e2; margin: 11px 0; }
  hr.section-sep { border: 0; border-top: 1.2px solid #c9ced3; margin: 18px 0 0; }
  a { color: #0b3d63; text-decoration: none; }
</style></head>
<body>
${toHtmlBody(md)}
</body></html>
`;

// 테스트에서 import할 때는 Chrome을 띄우지 않는다
if (process.argv[1]?.endsWith("build-resume-pdf.mjs")) main();

function main() {
const dir = mkdtempSync(join(tmpdir(), "resume-pdf-"));
const htmlPath = join(dir, "resume.html");
const pdfPath = join(dir, "out.pdf");
writeFileSync(htmlPath, buildHtml(readFileSync("resume.md", "utf8")));

// Chrome은 PDF를 다 쓴 뒤에도 teardown watchdog 때문에 0이 아닌 코드로 끝날 수 있다.
// 종료 코드 대신 산출물 존재 여부로 성공을 판정한다.
try {
  execFileSync(
    CHROME,
    [
      "--headless",
      "--disable-gpu",
      `--user-data-dir=${join(dir, "profile")}`,
      "--no-pdf-header-footer",
      `--print-to-pdf=${pdfPath}`,
      `file://${htmlPath}`,
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );
} catch (e) {
  if (!existsSync(pdfPath)) {
    process.stderr.write(e.stderr?.toString() ?? String(e));
    throw new Error(`Chrome이 PDF를 만들지 못했습니다: ${CHROME}`);
  }
}

// tmpdir과 저장소가 다른 볼륨일 수 있어 rename 대신 copy
copyFileSync(pdfPath, "public/resume.pdf");
console.log(
  `public/resume.pdf 생성 완료 (${statSync("public/resume.pdf").size} bytes)`,
);
}
