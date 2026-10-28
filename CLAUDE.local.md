# 포트폴리오 ↔ 실제 프로젝트 레포 매핑

레포 경로는 이 맥북 기준(`~/Documents/...`)이다. 사내 레포 이름이 담겨 있으니 내부 호스트명·키·고객사 정보 같은 민감한 내용은 이 파일에도 적지 않는다.

블로그 글(`src/content/blog/*.mdx`)이나 프로젝트 설명(`src/lib/projects.ts`)을 쓰거나 다듬을 때,
아래 매핑을 보고 해당 레포의 실제 코드·README·커밋 이력을 근거로 삼는다.

## 작업 규칙

- 회사 레포는 **읽기 전용**으로만 참고한다. 그쪽 파일을 수정·커밋하지 않는다.
- 공개 글에는 사내 코드를 그대로 붙이지 않는다. 구조·패턴만 일반화해 설명하고, 도메인 데이터·URL·키·내부 호스트명·고객사 정보는 빼거나 가명으로 바꾼다.
- 숫자 성과(%, 건수 등)는 레포에서 근거를 찾을 수 없으면 기존 문구를 유지하고 새로 지어내지 않는다.
- 레포가 없는 프로젝트는 기존 `projects.ts`·블로그 내용만 근거로 쓴다.

## 알스솔루션 (`~/Documents/als`, 2025.03 – 재직중)

| 포트폴리오 slug | 레포 | 비고 |
| --- | --- | --- |
| `frontend-standardization` | `als-fe-kit`, `als-api`, `eslint-config-als`, `jenkins-als` | 공유 라이브러리 3종(@als/fe-kit·@als/als-api·@als/eslint-config-als) + Jenkins CI/CD |
| `backoffice`, `backoffice-refactor` | `backoffice-als` | React 19 + Vite 백오피스 (ALS Workspace) |
| `preprocess-backoffice` | `backoffice-als`, `backoffice-api`, `airflow-dags-als` | 팜스코프 데이터 전처리 화면 + FastAPI 백엔드 + Airflow DAG |
| `pharmscope` | `alpha-als` | 제약사 BI 툴 모노레포 (`apps/service`, `apps/admin`, `packages/shared`) |
| `design-system` | (로컬 레포 없음) | |
| `pwa-notification` | (로컬 레포 없음) | |
| `pharm-bridge`, `pharm-bridge-refactor` | (로컬 레포 없음) | |
| `wbs` | (로컬 레포 없음) | |

## 에이치티비욘드 (`~/Documents/htbeyond`)

| 포트폴리오 slug | 레포 | 비고 |
| --- | --- | --- |
| `community-platform` | `blue-web-byb-admin-v2`, `blue-web-byb-partners-v2` | 커뮤니티 운영툴 / 파트너스 |
| `pos-kiosk` | `blue-byb-pos` | POS·KIOSK 공용 빌드 (`REACT_APP_PRODUCT`) |
| `byby-2` | `blue-web-byb-v2`, `blue-web-monorepo` | 바이비 2.0. 모노레포는 `packages/ui` 일부 컴포넌트만 본인 작업 (`packages/design-system`은 타인 작업) |
| `cicd-infra` | `devops-ansible`, `devops-bundle`, `red-nginx-proxy` | 엣지 배포·번들 버전 관리·nginx |
| `byby-quiz` | `blue-byb-quiz`, `blue-byb-quiz-backend` | 퀴즈 프론트 + NestJS 백엔드 |
| (포트폴리오 미등록) | `blue-did-desktop-app` | Electron 시설 안내 키오스크(DID), 본인 단독 작업 |
| (본인 작업 아님) | `blue-edge-logger` | Express 로깅 서버, 본인 커밋 없음 |

본인 커밋 판별: author에 `subeen`이 들어간 커밋 (`git log --all -i --author=subeen`).

## 개인 프로젝트

| 포트폴리오 slug | 레포 | 비고 |
| --- | --- | --- |
| `game-calculator` | `~/Documents/myhome/my-home-frontend`, `~/Documents/myhome/my-home-backend` | 놀러와 마이홈 계산기 (백엔드는 NestJS → Django 전환) |
| `e-voting`, `student-council` | (로컬 레포 없음) | |
