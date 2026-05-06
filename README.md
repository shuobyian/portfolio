# 장수빈 · Frontend Developer Portfolio

> 복잡한 도메인(예약·결제·이용권·POS·KIOSK)을 가진 서비스를 4년 이상 설계·운영한 프론트엔드 개발자의 포트폴리오 사이트입니다.

React·TypeScript 기반 아키텍처 개선, 디자인 시스템 구축, 테스트 및 CI/CD 자동화 경험을 한곳에 모아두었습니다.

---

## 한눈에 보기

| 항목        | 내용                                                 |
| ----------- | ---------------------------------------------------- |
| **이름**    | 장수빈 (Subeen Chang)                                |
| **포지션**  | Frontend Developer · 4년 6개월                       |
| **현 소속** | (주)알스솔루션 — 프론트엔드 개발 선임 (2025.03 ~)    |
| **이메일**  | chickby@gmail.com                                    |
| **GitHub**  | [github.com/shuobyian](https://github.com/shuobyian) |
| **이력서**  | [`/public/resume.pdf`](./public/resume.pdf)          |

---

## 기술 스택

- **Frontend** — React, TypeScript, JavaScript, Next.js, HTML/CSS
- **State / Data** — React Query, Redux, Recoil, Zod
- **UI / Design System** — Tailwind CSS, Ant Design, MUI, Bootstrap, Storybook
- **Test** — Jest, MSW
- **Infra / DevOps** — AWS, Jenkins, GitHub Actions, Docker, Ansible
- **Backend** — Node.js, NestJS, PostgreSQL, MySQL

---

## 주요 프로젝트

| 프로젝트                              | 역할              | 기간              | 핵심 키워드                                       |
| ------------------------------------- | ----------------- | ----------------- | ------------------------------------------------- |
| **디자인 시스템 구축**                | 설계·구현 주도    | 2025.03 ~ 04      | Monorepo, CSS Variables, Tailwind, 다크모드       |
| **사내 백오피스 신규 구축**           | 설계·구현         | 2025.05 ~ 06      | React, TypeScript, 디자인 시스템 적용             |
| **팜브릿지 서비스 재구축**            | 프론트엔드 개발   | 2025.07 ~ 11      | Vanilla JS, Spring 전환, 프레임워크 의존도 최소화 |
| **커뮤니티 플랫폼 운영툴 / 파트너스** | 프론트엔드 개발   | 2021.08 ~ 2024.12 | JS→TS 마이그레이션, React Query, Jest/MSW         |
| **POS / 주문 키오스크 시스템**        | 프론트엔드 개발   | 2023.03 ~ 04      | Broadcast Channel API, AbortController            |
| **바이비 2.0 서비스**                 | 프론트엔드 개발   | 2023.02 ~ 10      | Storybook, Lexical Editor, 웹뷰                   |
| **CI/CD 인프라 개선**                 | 프론트엔드 인프라 | 2024.02 ~ 04      | Jenkins, AWS S3, Ansible, Git Tag 전략            |

> 전체 프로젝트와 상세 설명은 사이트의 [`/projects`](./src/app/projects) 페이지에서 확인할 수 있습니다. 데이터 소스는 [`src/lib/projects.ts`](./src/lib/projects.ts)에 정의되어 있습니다.

---

## 사이트 구성

```
/                홈 — 소개, 주요 프로젝트, 기술 스택
/about           경력 · 학력
/projects        전체 프로젝트 목록
/projects/[slug] 프로젝트 상세
/blog            MDX 기반 블로그
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
├── src/
│   ├── app/                 # App Router 페이지
│   │   ├── about/
│   │   ├── blog/[slug]/
│   │   ├── projects/[slug]/
│   │   ├── contact/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/          # Nav, Footer, ThemeProvider
│   │   └── ui/              # Section, ProjectCard
│   ├── content/
│   │   └── blog/*.mdx       # 블로그 글 (MDX)
│   └── lib/
│       ├── projects.ts      # 프로젝트 데이터
│       └── blog.ts          # MDX 로더
└── package.json
```

---

## 로컬 실행

```bash
pnpm install
pnpm dev          # http://localhost:3000

pnpm build        # 프로덕션 빌드
pnpm start        # 빌드 결과 실행
pnpm lint         # ESLint
```

> Node.js 20+ · pnpm 10+ 권장

---

## Contact

- **Email** — chickby@gmail.com
- **GitHub** — [@shuobyian](https://github.com/shuobyian)
