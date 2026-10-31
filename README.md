# 장수빈 · Frontend Developer Portfolio

> 예약·결제·POS·KIOSK처럼 상태·캐시·동기화 복잡도가 높은 도메인을 5년간 다뤄온 프론트엔드 개발자의 포트폴리오 사이트입니다.

React·TypeScript 기반 아키텍처 개선, 디자인 시스템 구축, 테스트 및 CI/CD 자동화 경험을 한곳에 모아두었습니다.

---

## 한눈에 보기

| 항목        | 내용                                                                                   |
| ----------- | -------------------------------------------------------------------------------------- |
| **이름**    | 장수빈 (Subeen Chang)                                                                  |
| **포지션**  | Frontend Developer · 경력 5년 1개월 (2026.10 기준)                                     |
| **현 소속** | (주)알스솔루션 — 프론트엔드 개발 선임 (2025.03 ~)                                      |
| **이메일**  | chickby@gmail.com                                                                      |
| **GitHub**  | [github.com/shuobyian](https://github.com/shuobyian)                                   |
| **사이트**  | [portfolio-rho-eight-97.vercel.app](https://portfolio-rho-eight-97.vercel.app/)        |
| **이력서**  | [`/public/resume.pdf`](./public/resume.pdf)                                            |

---

## 기술 스택

- **Frontend** — React, TypeScript, JavaScript, HTML/CSS, Next.js, Vite, pnpm Monorepo
- **State / Data** — React Query, Zustand, Redux, Recoil, Zod
- **UI / Design System** — Tailwind CSS, Ant Design, Emotion, MUI, Bootstrap, Storybook
- **Test** — Vitest, Playwright, Jest, MSW, node:test
- **Infra / DevOps** — AWS (S3, Amplify, CodeArtifact), Jenkins, GitHub Actions, Docker, Ansible
- **Backend** — Node.js, NestJS, PostgreSQL, MySQL
- **AI Workflow** — Claude Code, Cursor

---

## 주요 프로젝트

### (주)알스솔루션 · 2025.03 ~

| 프로젝트                              | 역할              | 기간              | 핵심 키워드                                          |
| ------------------------------------- | ----------------- | ----------------- | ---------------------------------------------------- |
| **팜스코프 데이터 전처리 백오피스**   | 설계·구현 주도    | 2026.09 ~ 10      | React 19, Emotion 디자인 시스템, pnpm Monorepo       |
| **팜스코프 신규 구축**                | 아키텍처·구현 주도 | 2026.04 ~ 08     | Ant Design, AntV G2, React Query, Zustand, SSE       |
| **팜브릿지 서비스 리팩토링**          | 프론트엔드 개발   | 2026.02 ~ 03      | React Island, SSR/CSR 하이브리드, React Query        |
| **WBS 시스템 구축**                   | 프론트엔드 개발   | 2026.01 ~ 02      | Jira REST API, Atlassian OAuth, 낙관적 업데이트      |
| **팜브릿지 서비스 재구축**            | 프론트엔드 개발   | 2025.07 ~ 12      | Vanilla JS, Spring 전환, 자체 디자인 시스템          |
| **사내 백오피스 구축 및 Antd 마이그레이션** | 설계·구현 단독 | 2025.05 ~ 2026.03 | Monorepo 디자인 시스템 → Ant Design 점진 전환, AWS S3 |
| **프론트엔드 표준화 및 CI/CD 정착**   | 프론트엔드 개발   | 2025.03 ~         | 사내 npm 패키지, ESLint, Jenkins, AWS CodeArtifact   |
| **디자인 시스템 구축**                | 설계·구현 주도    | 2025.03 ~ 04      | Bootstrap, CSS Variables, Monorepo                   |

### (주)에이치티비욘드 · 2021.08 ~ 2024.12

| 프로젝트                              | 역할              | 기간              | 핵심 키워드                                          |
| ------------------------------------- | ----------------- | ----------------- | ---------------------------------------------------- |
| **프론트엔드 인프라 및 배포 환경 개선** | 프론트엔드 인프라 | 2024.02 ~ 04    | Jenkins, Ansible Semaphore, AWS S3, nginx, Git Tag   |
| **POS / 주문 키오스크 시스템**        | 프론트엔드 개발   | 2023.03 ~ 04      | Broadcast Channel API, AbortController               |
| **바이비 2.0 서비스**                 | 프론트엔드 개발   | 2023.02 ~ 10      | Storybook, Lexical Editor, 웹뷰                      |
| **커뮤니티 서비스 운영툴 / 파트너스** | 프론트엔드 개발   | 2021.08 ~ 2024.12 | JS→TS 마이그레이션, React Query, Jest/MSW            |

> 개인·학생 프로젝트를 포함한 전체 목록과 상세 설명은 사이트의 [`/projects`](./src/app/projects) 페이지에서 확인할 수 있습니다. 데이터 소스는 [`src/lib/projects.ts`](./src/lib/projects.ts)에 정의되어 있습니다.

---

## 사이트 구성

```
/                홈 — 소개, 하이라이트 스토리, 주요 프로젝트, 기술 스택
/about           경력 · 학력
/projects        전체 프로젝트 목록 (회사별 · 태그 필터)
/projects/[slug] 프로젝트 상세 (일부 프로젝트는 설계 딥다이브 포함)
/stories/*       하이라이트 스토리 — 디자인 시스템 · 팜브릿지 · 커뮤니티
/blog            MDX 기반 블로그 (프로젝트 / 기술 분류)
/blog/[slug]     블로그 상세 (Shiki 코드 하이라이트)
/contact         연락처
```

---

## 기술 스펙 (이 사이트)

- **Framework** — Next.js 16 (App Router) · React 19
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4 · `next-themes` 다크모드
- **Animation** — Framer Motion
- **Content** — MDX (`next-mdx-remote`) · `gray-matter` · `reading-time`
- **Code Highlight** — Shiki · `rehype-pretty-code`
- **Icons** — lucide-react

---

## 프로젝트 구조

```
portfolio/
├── public/                  # 정적 자산 (이력서 PDF 포함)
├── resume.md                # 이력서 원문 (resume.pdf 생성 소스)
├── scripts/                 # resume.md → public/resume.pdf 변환 스크립트와 테스트
├── src/
│   ├── app/                 # App Router 페이지
│   │   ├── about/
│   │   ├── blog/[slug]/
│   │   ├── projects/[slug]/
│   │   ├── stories/         # 하이라이트 스토리
│   │   ├── contact/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── blog/            # 블로그 본문용 다이어그램
│   │   ├── layout/          # Nav, Footer, ThemeProvider
│   │   ├── projects/        # 프로젝트 상세 딥다이브
│   │   └── ui/              # Section, ProjectCard, ProjectThumbnail
│   ├── content/
│   │   └── blog/*.mdx       # 블로그 글 (MDX)
│   └── lib/
│       ├── projects.ts      # 프로젝트 데이터
│       └── blog.ts          # MDX 로더
├── Dockerfile
└── package.json
```

---

## 로컬 실행

```bash
pnpm install
pnpm dev          # http://localhost:4000
pnpm dev:clean    # .next 캐시를 지우고 dev 서버 실행

pnpm build        # 프로덕션 빌드
pnpm start        # 빌드 결과 실행 (포트 4000)
pnpm lint         # ESLint

pnpm resume:pdf   # resume.md → public/resume.pdf (Chrome 필요, 경로는 CHROME_PATH로 변경 가능)
pnpm resume:test  # 이력서 변환 스크립트 테스트
```

> Node.js 20+ · pnpm 10+ 권장 (Docker 이미지는 node:22-alpine)

---

## Contact

- **Email** — chickby@gmail.com
- **GitHub** — [@shuobyian](https://github.com/shuobyian)
