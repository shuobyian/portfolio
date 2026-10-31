export interface Project {
  slug: string;
  title: string;
  description: string;
  thumbnail?: string;
  tags: string[];
  github?: string;
  demo?: string;
  period: string;
  role: string;
  highlights: string[];
  /** 상세 페이지에서 카드로 강조할 highlights 인덱스. 나머지는 목록으로 표시 */
  keyHighlights?: number[];
  featured?: boolean;
  company?: string;
  relatedPostSlugs?: string[];
}

const projects: Project[] = [
  {
    slug: "frontend-standardization",
    title: "프론트엔드 표준화 및 CI/CD 정착",
    description:
      "신설 조직의 멀티 프로젝트 환경에서 개발 컨벤션·빌드·배포 흐름을 단일 표준으로 정착시킨 기반 작업. 공통 API·ESLint 설정을 사내 npm 패키지로 분리하고, Jenkins CI/CD에 AWS CodeArtifact 인증을 자동 연동",
    tags: ["Monorepo", "사내 npm 패키지", "ESLint", "Jenkins", "AWS CodeArtifact"],
    period: "2025.03 - 재직중",
    role: "프론트엔드 개발",
    company: "알스솔루션",
    highlights: [
      "공통 패키지 분리: 공통 API·ESLint 설정을 사내 표준 npm 패키지로 분리해 사내 전 프론트엔드 프로젝트의 개발 컨벤션·빌드 환경을 일원화. 입사 3개월 만에 프론트엔드 표준을 0→1로 정착",
      "앱끼리는 서로 의존하지 않고 부트스트랩(@als/fe-kit)·API 계약(@als/als-api)·린트(@als/eslint-config-als) 3개 공유 라이브러리로만 단방향 결합하는 구조",
      "CI/CD 단일 파이프라인: Jenkins 기반 CI/CD에 AWS CodeArtifact 인증 자동화를 연동해 멀티 프로젝트 빌드·배포를 하나의 파이프라인으로 표준화. 신규 프로젝트 빌드·배포 소요 시간 약 60% 단축",
      "온보딩 시간 단축: Jenkins 스크립트를 Git 저장소로 이관하고 환경 설정을 문서화해 신규 합류자 개발 환경 셋업 시간을 약 1일 → 1시간 이내로 단축",
      "공유 라이브러리의 정확버전 핀·툴체인 메이저 drift 리스크를 정리하고, 버전 일괄 관리 도구(als-deps)와 CI drift 감시 잡으로 재발을 차단",
      "프로젝트 특성에 맞춰 디자인 시스템 4종을 별도 설계·운영 ([디자인 시스템 구축](/projects/design-system)부터 시작)",
    ],
    keyHighlights: [0, 2, 3],
    relatedPostSlugs: ["als-multirepo-fanin-architecture", "als-frontend-structure"],
  },
  {
    slug: "design-system",
    title: "디자인 시스템 구축",
    description:
      "신설 조직의 멀티 프로젝트 환경을 위한 사내 범용 디자인 시스템. Bootstrap 기반 커스텀 컴포넌트 라이브러리 위에 CSS Variables로 사내 정체성 토큰을 입힌 Monorepo 구조",
    tags: ["Bootstrap", "CSS Variables", "Monorepo"],
    period: "2025.03 - 2025.04",
    role: "프론트엔드 개발 (설계·구현 주도)",
    company: "알스솔루션",
    highlights: [
      "Bootstrap 채택 근거: 백오피스 도메인 비중이 높은 사내 환경에 맞춰 컴포넌트 풍부도·디자인 커스터마이징 용이성·반응형 그리드 성숙도를 종합 검토하여 Bootstrap 채택",
      "사내 디자인 토큰을 CSS Variables로 추상화하여 Bootstrap 기본 스타일 위에 사내 정체성 레이어를 일관 적용",
      "단일 토큰 체계: 색상·타이포·간격·레이아웃을 단일 토큰으로 정의하여 토큰 1회 변경으로 시스템 전반 갱신",
      "컴포넌트를 Monorepo 단위 패키지로 분리하여 UI 자산의 독립 배포·버전 관리 구조 확보",
      "라이트/다크 테마를 토큰 레이어에서 분기. 컴포넌트 코드는 테마 인지 없이 동작하도록 분리",
      "운영 검증 후 표준 정착: 백오피스 신규 프로젝트의 첫 적용을 통해 토큰·컴포넌트 구조를 운영 환경에서 검증한 뒤 사내 표준 라인업으로 정착",
    ],
    keyHighlights: [0, 2, 5],
    featured: true,
  },
  {
    slug: "backoffice",
    title: "사내 백오피스 신규 구축",
    description:
      "공지사항·약관·FAQ·회원 관리 등 사내 운영 도메인을 다루는 운영 관리툴. 자체 Monorepo 디자인 시스템을 처음 적용해 운영 환경에서 검증한 프로젝트",
    tags: ["React", "TypeScript", "Monorepo Design System", "AWS S3"],
    period: "2025.05 - 2025.06",
    role: "프론트엔드 개발 (설계·구현 단독)",
    company: "알스솔루션",
    highlights: [
      "공지사항·약관·FAQ·회원 관리 등 사내 운영 도메인 전반을 단독으로 초기 설계부터 구현까지 담당",
      "신설 조직의 초기 운영 단계로 별도 운영팀 없이 개발자·기획자가 운영을 겸하는 환경에 맞춰 설계",
      "디자인 시스템 첫 적용: 자체 Monorepo 디자인 시스템을 첫 적용한 프로젝트. 토큰·컴포넌트 구조를 운영 환경에서 처음 검증하여 사내 표준 정착의 기반 마련",
      "기능 단위 컴포넌트 분리로 메뉴 추가 시 기존 화면 영향 없이 확장 가능한 구조 설계",
      "파일 업로드 모듈 구현: AWS S3 업로드/다운로드 처리. 게시글 작성 흐름과 첨부 파일 생성·삭제 라이프사이클을 연동하여 게시글 단위로 파일 일관 관리",
      "이후 2026.02-03에 팜스코프 사전 검증 목적으로 Antd 디자인 시스템으로 마이그레이션 ([사내 백오피스 리팩토링](/projects/backoffice-refactor) 참조)",
    ],
    keyHighlights: [2, 4],
    relatedPostSlugs: ["admin-als-frontend-deployment"],
  },
  {
    slug: "pharm-bridge",
    title: "팜브릿지 서비스 재구축",
    description:
      "약국 대상 약품 입고 관리 프로그램의 백엔드 JSP→Spring 전환에 맞춘 프론트엔드 전면 재구성. 전환 일정 내 안정화 제약을 최우선으로, SSR 제약·운영 인력 기술 폭을 함께 고려해 Vanilla JS 채택",
    tags: ["HTML", "CSS", "JavaScript", "자체 디자인 시스템"],
    period: "2025.07 - 2025.12",
    role: "프론트엔드 개발",
    company: "알스솔루션",
    highlights: [
      "약국 대상 약품 입고 관리 프로그램 ‘팜브릿지’의 백엔드 JSP→Spring 전환에 맞춰 프론트엔드 전면 재구성",
      "의사결정: 백엔드 Spring 전환과 동기화된 일정 안에 안정화해야 하는 제약이 가장 컸고, 여기에 SSR 라우팅 제약·운영 인력의 장기 유지보수 가능 기술 폭을 함께 고려하여 Vanilla JS 선택 (React 도입 시 구조 설계·학습 비용으로 전환 일정 내 안정화가 어렵다고 판단)",
      "프레임워크 없는 자체 구조: HTML/CSS/JavaScript만으로 라우팅 진입점, 상태 컨테이너, 이벤트 위임 처리 모듈을 자체 구현하여 프레임워크 의존도 없이 유지보수 가능한 구조 설계",
      "SSR 환경에 최적화된 자체 디자인 시스템을 별도 설계 — 사내 Monorepo·Antd 라인과 토큰·컴포넌트 모두 분리 운영",
      "이후 2026.02-03에 React Island 패턴으로 부분 전환 ([팜브릿지 서비스 리팩토링](/projects/pharm-bridge-refactor) 참조)",
    ],
    keyHighlights: [1, 2],
    featured: true,
  },
  {
    slug: "wbs",
    title: "WBS 시스템 구축",
    description:
      "Jira REST API 기반 데이터로 간트 차트·캘린더 뷰를 제공하는 사내 일정 관리 시스템. 드래그앤드롭·낙관적 업데이트·과거 시점 조회·Atlassian OAuth 통합",
    tags: ["React", "TypeScript", "Atlassian OAuth", "Jira REST API"],
    period: "2026.01 - 2026.02",
    role: "프론트엔드 개발",
    company: "알스솔루션",
    highlights: [
      "Jira REST API 기반 데이터로 간트 차트·캘린더 뷰 설계·구현하여 일정 관리 가시성 향상",
      "낙관적 업데이트: 드래그앤드롭 일정 편집에 낙관적 업데이트 적용으로 작업 처리 속도 개선",
      "과거 시점 조회: Changelog 분석으로 과거 시점 조회·고스트 바 비교 기능 구현 (회고/이력 분석 지원)",
      "팀/상태 기반 색상 시각화·다중 필터링으로 대규모 프로젝트 탐색 효율 최적화",
      "URL로 공유하는 협업 환경: Atlassian OAuth 연동 및 URL 상태 관리로 별도 저장 없이 공유 가능한 협업 환경 구축",
    ],
    keyHighlights: [1, 2, 4],
  },
  {
    slug: "pharm-bridge-refactor",
    title: "팜브릿지 서비스 리팩토링",
    description:
      "Vanilla JS로 운영하던 팜브릿지 화면의 유지보수 한계를 React Island 패턴으로 부분 전환. SSR 라우팅 제약 하에서 SSR/CSR 하이브리드 구조 설계",
    tags: [
      "React",
      "TypeScript",
      "React Query",
      "React Island Pattern",
      "SSR/CSR Hybrid",
    ],
    period: "2026.02 - 2026.03",
    role: "프론트엔드 개발",
    company: "알스솔루션",
    highlights: [
      "배경: Vanilla JS로 운영하던 화면이 상태·이벤트 결합으로 유지보수 비용 누적. SSR 라우팅 구조는 SEO·서버 의존성 때문에 변경할 수 없는 제약 하에서 부분 React 도입 결정",
      "의사결정: React Island 패턴 채택 — SSR이 페이지 셸을 그대로 그리고, 동적 영역만 React 컴포넌트가 마운트되는 SSR/CSR 하이브리드 구조로 설계",
      "React Query 전면 도입으로 API 호출·캐싱·에러 처리 일원화",
      "화면 단위로 묶여 있던 로직을 도메인별 훅·유틸로 분리하고, Context 도입으로 prop drilling 제거",
      "테스트 커버리지 0% → 20%: 테스트 인프라(Jest+MSW) 구축으로 React 영역 테스트 커버리지 0% → 약 20% 확보, 회귀 안정성 확보",
      "성능 검증: 리팩토링 전후 번들·에셋 사이즈를 직접 실측해 트레이드오프 정량 확인. SearchWait 페이지 기준 jQuery 등 외부 CDN 의존(약 207 KB)은 제거됐으나 단일 페이지 첫 진입 비용은 gzip 약 111 KB → 150 KB로 증가 — 코드 스플리팅 구조라 사이트 전체·재방문 캐시 관점에서 역전 우위 여지가 있다고 분석",
    ],
    keyHighlights: [1, 4, 5],
  },
  {
    slug: "backoffice-refactor",
    title: "사내 백오피스 리팩토링 (Antd 마이그레이션)",
    description:
      "차기 팜스코프 프로젝트의 Antd 도입 리스크를 운영 중인 백오피스에서 사전 검증한 파일럿. 자체 Monorepo 디자인 시스템 → Antd 컴포넌트 단위 점진적 교체",
    tags: ["React", "TypeScript", "Ant Design"],
    period: "2026.02 - 2026.03",
    role: "프론트엔드 개발",
    company: "알스솔루션",
    highlights: [
      "배경: 사내 차기 신규 프로젝트(팜스코프)에서 Antd 디자인 시스템 도입을 결정한 상황. 신규 프로젝트에 본격 적용하기 전, 운영 중인 백오피스에서 먼저 마이그레이션을 선행하여 Antd 기반 개발 워크플로우·사내 정체성 디자인 적용 가능성·운영 리스크를 사전 검증",
      "40종 무중단 전환: 자체 Monorepo 디자인 시스템에서 Antd 기반 디자인 시스템으로 약 4주간 컴포넌트 약 40종을 무중단 점진 전환, 화면별 회귀 결함 0건",
      "토큰 → Antd 매핑 가이드: 기존 컴포넌트의 디자인 토큰을 Antd 컴포넌트 props·테마로 매핑하는 변환 가이드를 정의하여 화면별 영향 범위 최소화 (화면당 평균 수정 범위 약 50% 축소)",
    ],
    keyHighlights: [1, 2],
  },
  {
    slug: "pharmscope",
    title: "팜스코프 신규 구축",
    description:
      "의약품 출고·유통 데이터를 제약사 운영자·사내 운영자에게 시각화·분석 형태로 제공하는 의약품 유통 데이터 분석 플랫폼. 제약사용 서비스 앱과 사내 어드민 콘솔 두 프로덕트를 pnpm 모노레포 한 저장소에서 공유 패키지 기반으로 구축",
    tags: [
      "React 19",
      "TypeScript",
      "Vite",
      "Ant Design",
      "AntV G2",
      "React Query",
      "Zustand",
      "pnpm Monorepo",
      "SSE",
      "GA4 · Clarity",
      "Vitest",
      "Playwright",
    ],
    period: "2026.04 - 2026.08",
    role: "프론트엔드 개발 (아키텍처 설계·구현 주도)",
    company: "알스솔루션",
    highlights: [
      "제약사 사용자용 서비스 앱과 사내 운영자용 어드민 콘솔 두 프로덕트를 pnpm 모노레포로 구축 — 인증·차트·도메인 레이어는 공유 패키지로 묶고 앱 셸(라우터·가드·경로)은 각 앱이 독립 보유해 교차 의존 제거",
      "서비스 앱: 대시보드 · 통합분석 5축(출고·채널·지역·시장·제품) · 데이터 활용 · 계정관리 · 고객센터 / 어드민 앱: 계약사·어드민 계정 관리 · 운영 콘텐츠 · 데이터 전처리 · 보안 접근 로그",
      "직전 [사내 백오피스 리팩토링](/projects/backoffice-refactor)에서 사전 검증한 Antd 디자인 시스템을 본격 적용. 차트도 라이브러리 직접 사용을 막고 공유 래퍼 6종만 공개해 디자인 시스템에 편입",
      "라이브러리의 이중 축 컴포넌트가 자식별 y 스케일을 독립 강제해 라인이 소실되는 문제를, 두 마크가 스케일을 공유하도록 차트 뷰를 직접 조립한 컴포넌트로 해결 — 래퍼 층 덕분에 대응이 공유 패키지 안에서 끝나, 명령형 차트 뷰로 내려간 사실이 화면으로 번지지 않음",
      "아키텍처 규약을 문서가 아니라 도구로 강제: 단방향 import·feature 간 직접 참조 금지는 lint 에러로, SDK 호출을 데이터 레이어로 제한하는 경계는 테스트로 고정",
      "동시성·세션 경계 설계: 조회 함수 65개에 취소 신호를 관통 전달해 실제 HTTP 취소 적용, 세션 세대로 늦게 도착한 401을 분류. 세션 흔적 정리는 스토어 한 경로로만 내려 다계정 복원 힌트가 남아 다른 계정으로 세션이 되살아나는 경로를 차단",
      "인증 계약 설계: 인증 원본은 서버 HttpOnly 쿠키로 두고 클라이언트 상태는 표시용 캐시로 한정. 401/403만 로그아웃으로 처리하고 네트워크 오류·5xx는 재시도 상태를 유지",
      "권한 설계: 알스마스터·알스어드민·계약사마스터·계약사일반 4종 역할에 대해 ①버튼·메뉴 미렌더 ②라우트 가드 ③페이지 가드 세 지점의 조건을 일치시켜 \"버튼은 보이는데 누르면 튕기는\" 불일치를 제거. 역할 헬퍼 단위 테스트 · 실제 route object 통합 테스트 · 브라우저 E2E를 각각 다른 책임으로 분리",
      "CS 고객 화면 보기: 어드민이 계약사 화면을 그대로 보는 세션을 창 간 postMessage로 인계. 양쪽 모두 상대 origin을 명시(`'*'` 금지)하고 `event.origin`·`event.source`를 검증하며, 토큰은 메모리에만 두고 결과는 토큰 없는 응답으로 회신. CS 탭은 분석 스크립트 미로드 · 쿠키 세션 복원 생략 · 토큰 없는 요청 차단 · 읽기 전용 가드로 격리하고, 세션 종료도 일반 로그아웃과 분리해 같은 브라우저의 본인 세션을 끊지 않도록 설계",
      "분석 도구(GA4 · Microsoft Clarity)를 계약사 데이터 유출 없이 도입: 개인정보 parameter 제거와 `page_location` 정제를 공통 client에 두어 deep link 토큰까지 자동 차단, 사용자 식별은 인증 스토어 구독 한 곳으로 모아 모든 로그아웃·만료 경로에서 자동 해제. Clarity 마스킹은 대시보드 설정이 아니라 `<body>` 속성으로 코드에서 강제 — Antd Modal·Drawer가 `#root` 밖으로 portal되기 때문",
      "실시간 알림센터: SSE 스트림으로 보정 반영 알림을 수신하고 토스트·데스크톱 알림·인박스를 공유 패키지 모듈로 통합",
      "라우트 코드 스플리팅에서 React.lazy가 한 번 실패한 로드를 확정 저장해 다시 시도해도 복구되지 않는 문제를 세대 기반 재시도 래퍼로 해소",
      "테스트 233개 파일·1,389개 케이스(Vitest) + 역할별 인증 E2E 31개(Playwright, 8 spec). 리렌더 횟수가 계약인 화면은 렌더 카운팅 스텁으로 memo 무력화 회귀를 검출",
      "배포: 정적 산출물에 API 호스트를 굽지 않고 동일 origin 상대경로만 사용해 dev·prod가 같은 이미지를 공유. 운영 네임스페이스 보안 정책에 맞춰 비루트 nginx 이미지로 전환",
      "전처리 결과의 생산 측은 [팜스코프 데이터 전처리 백오피스](/projects/preprocess-backoffice) — 이 서비스의 어드민 '데이터 전처리' 화면과 수집 현황 요약을 공유",
    ],
    keyHighlights: [4, 5, 7],
    relatedPostSlugs: [
      "pharmscope-react-query-zustand-architecture",
      "pharmscope-query-key-cache-invalidation",
    ],
    featured: true,
  },
  {
    slug: "preprocess-backoffice",
    title: "팜스코프 데이터 전처리 백오피스 구축",
    description:
      "팜스코프에 공개되는 의약품 유통 데이터의 전처리를 담당하는 사내 백오피스. 데이터비즈팀이 Excel로 반려 데이터를 검토해 회신하고 담당자가 DB에 수기 입력하던 과정을, 웹 검수와 보정 접수로 대체. 범용 셸 + 제품 프로젝트 구조로 설계",
    tags: [
      "React 19",
      "TypeScript",
      "Vite",
      "Emotion",
      "React Query",
      "자체 디자인 시스템",
      "pnpm Monorepo",
      "node:test",
      "Playwright",
    ],
    period: "2026.09 - 2026.10",
    role: "프론트엔드 개발 (설계·구현 주도)",
    company: "알스솔루션",
    highlights: [
      "[팜스코프](/projects/pharmscope)의 데이터 공급 측 — 전처리를 끝낸 보정 결과가 고객 공개를 거쳐 팜스코프 화면의 분석 데이터가 된다",
      "문제: 팜스코프에 공개될 의약품 유통 원천 데이터 중 검증에 실패한 '반려' 행을 데이터비즈팀이 일일 Excel 리포트(15시트)로 받아 검토·회신하고, 개발·운영 담당자가 그 결과를 DB에 손으로 옮겨 넣고 있었다. 팀이 직접 검수·판정·접수하고 그 결과가 배치·야간 처리·고객 공개까지 이어지는 과정을 한 화면에서 추적하도록 재설계",
      "업무 흐름을 단계로 분리: 현황 확인 → 반려 6개 탭 검수 → 초안 저장/보류 → 서버 미리보기 → 접수 → 실행 대기·보정 배치 → 고객 공개 → 감사 이력. 사람의 판정 · 규칙 저장 · 실제 실행 · 고객 공개를 서로 다른 것으로 다루고 각각 다르게 부름",
      "Excel 손놀림을 그대로 받는 검수 표: 행별 직접 입력, 선택 항목 일괄 채우기, Excel 여러 행 붙여넣기, 행 상세 패널. 열 이름·단위·용어는 팀이 Excel에서 쓰던 말을 그대로 사용",
      "접수 안전성 설계: 미리보기 ID + payload 해시 + 멱등키를 함께 보내고 입력이 바뀌면 미리보기를 무효화. 멱등키는 범위별로 발급해 '접수된 뒤에만' 교체하고, 응답을 받지 못한 요청은 키·본문을 기억해 '다시 보내기'로만 재전송. 운영자가 입력을 바꾸면 그 요청을 버리고 '접수됐을 수 있다'고 알리며, 서버가 키 재사용을 거부(409)하면 그 범위의 키를 새로 발급",
      "\"결과를 모르는 실패\"를 별도 상태로 취급: 게이트웨이 502·504·무응답·봉투 깨짐은 재시도시키지 않고 이력 확인부터 유도. 오류 케이스 474건(업무 영역 436 + 공통 38)을 코드에서 전수 수집해 거절 모달 · 확인 필요 모달 · 위험 토스트 · 인라인 네 자리로 분류",
      "빈 값을 0으로 적지 않는다: 확인 불가 · 준비 안 됨 · 미수신 · 기록 없음과 '값이 없는 것이 답'(—)을 구분하는 표시 규칙을 도메인 레이어에 상수로 고정. 금액·비율은 서버의 Decimal 문자열을 `Number()` 변환 없이 원문으로 표시",
      "규약을 문서가 아니라 시험으로 강제 — 규칙 시험 17종: SDK import 경계, 디자인 토큰 밖 리터럴, 단추 크기·확정 단추 variant, 표 마크업(날것 `<tr>`/`<td>` 금지), Emotion 선택자, 모달 제목 위계, 접근성 이름을 가질 수 없는 요소의 `aria-label`, 44px 터치 영역, 화면 문구 용어집·코드 라벨 대조까지 lint·테스트가 막음",
      "범용 셸 설계: 제품 프로젝트는 `defineProject`로 등록하고 메뉴·그룹·기본 화면·브레드크럼이 설정에서 파생. 제품마다 다른 셸 동작(도움말 가이드, 머리글 매출일자, 대기 건수 배지) 세 항목만 플래그로 켜서 범용 셸이 특정 제품의 화면 id·문구를 물려받지 않도록 분리. 레지스트리 누락·중복 메뉴·잘못된 기본 화면은 컴파일 오류",
      "앱과 공통 UI를 pnpm 모노레포로 분리하고 디자인 시스템이 업무 상태·API를 참조하지 않도록 단방향 의존 고정. Emotion 토큰으로 라이트·다크·리얼다크·시스템(OS 설정 추종) 4종 테마와 글꼴 4종·글자 크기 4단(12~18px)을 제공하고, 네온 강조색은 사용자가 고른 값이 본문 대비 기준(4.5:1)에 못 미치면 색조를 지킨 채 밝기만 올려 칠함",
      "세션·권한: 브라우저가 IdP에 직접 붙지 않는 BFF 세션 방식(직원 SSO), CSRF 헤더 없는 변경 차단. 메뉴 노출은 서버가 돌려준 역할·`capabilities`가 결정하고, 프런트엔드 메뉴 필터를 보안 경계로 쓰지 않음을 문서·코드 양쪽에 명시",
      "검증: node:test 252개 파일·약 1,766개 케이스 + 브라우저 E2E 6 spec(Playwright — 스모크·업무 흐름·초안·신원·셸·화면 설정). 응답을 받지 못한 쓰기 네 흐름은 화면을 그려 실제로 버튼을 누르는 수준까지 검사. `pnpm verify`가 포맷 → 디자인 시스템 빌드 → lint → 타입체크 → 전체 시험 → 앱 빌드 → 운영 번들에 예시 데이터가 섞였는지 검사까지 한 줄로 수행",
      "미검증 범위를 성과로 포장하지 않음: 실제 SSO 세션 검증은 개발 origin의 `redirect_uri` 미허용으로 아직 못 했고, 서버 권한·감사·멱등성과 예약 스케줄러·DAG 실행은 실환경에서 확인하지 않았음을 저장소 문서에 명시",
    ],
    keyHighlights: [2, 4, 5],
    featured: true,
  },
  {
    slug: "community-platform",
    title: "커뮤니티 서비스 운영툴 / 파트너스 플랫폼",
    description:
      "전국 500개 단지·MAU 10만 규모의 아파트 커뮤니티 플랫폼. 5종 예약·결제·이용권이 커뮤니티·파트너스 두 프로덕트에 걸쳐 운영되는 환경에서 기능 개발과 아키텍처 개선을 병행 수행",
    tags: [
      "React",
      "TypeScript",
      "React Query",
      "Redux",
      "Axios",
      "Ant Design",
      "Jest",
      "MSW",
      "Vite",
      "Lexical",
    ],
    period: "2021.08 - 2024.12",
    role: "프론트엔드 개발",
    company: "에이치티비욘드",
    highlights: [
      "시간·공간·강좌·숙박·레슨 등 5종 예약 도메인과 PG·관리비 결제, 횟수제 이용권 관리가 커뮤니티 운영툴·파트너스 두 프로덕트에 걸쳐 운영되는 환경에서 기능 개발과 아키텍처 개선 병행",
      "JS → TS 마이그레이션: 컨시어지 운영툴(현 파트너스)을 공통 컴포넌트·API·enum·타입 레이어부터 먼저 옮긴 뒤 채널·판매·예약 화면 순으로 전환. JS/JSX 파일 145개 → 4개",
      "MUI → Ant Design 전환: 같은 운영툴의 UI를 예약·판매·채널·로그인 4개 메뉴 단위 PR로 나눠 교체하고, 마지막 단계에서 MUI 패키지를 제거해 운영 중인 화면을 메뉴별로 검증하며 전환",
      "Redux → React Query: 운영툴에 React Query를 처음 도입하고 도메인별 QUERY_KEY 상수 컨벤션을 만들어, 이후 인증·시설·단지 등 다른 도메인도 같은 패턴으로 확장. 매장관리 영역은 Redux slice와 MVVM 계층을 걷어내 202개 파일에서 약 4천 줄 순감",
      "Axios interceptor 공통 에러 처리: 파트너스에서 응답 경로(커뮤니티·결제)별로 에러 타입을 나누고 에러 코드를 운영자용 안내 문구로 매핑해 외부 연동 실패 메시지를 일관화",
      "핫픽스 월 5건 → 1건: 운영툴에 Jest + MSW 테스트 환경을 처음 구성하고 매장 옵션 CRUD에서 예약 화면으로 테스트 범위를 넓힘. antd Select 같은 UI 라이브러리 컴포넌트용 테스트 유틸도 작성. 배포 후 핫픽스 월 평균 5건 → 1건 감소",
      "기획·디자인 협업: 예약 창구 중복 검증 결과를 단일 에러가 아닌 충돌 자원 목록 모달로 보여주도록 역제안 → 운영팀이 충돌 자원을 즉시 식별·재배정 가능하도록 개선. 이후 6개 예약 시나리오가 함께 쓰는 점유 검증 훅으로 일반화",
      "기획·디자인 협업: 예약 시간 설정 화면 복잡도가 높아 고객사가 직접 설정에 어려움을 겪던 상황. 요일·운영 시간·슬롯 단위·예약 가능 시간표 4개 정보 그룹으로 나눠 박스 단위로 재배치하도록 역제안하여 진입 장벽 완화",
      "파트너스 초기 구조 설계: 컨시어지 운영툴을 바이비파트너스로 전환하며 레이어 아키텍처 경로 규칙과 ESLint 파일·폴더 네이밍 규칙을 정하고, API 모듈을 REST 경로와 같은 폴더 구조로 배치해 엔드포인트에서 코드 위치를 바로 찾을 수 있게 구성",
      "빌드·라우팅 현대화: 파트너스를 CRA → Vite로 옮기며 Overmind 상태 관리를 걷어내고 Amplify v6로 갱신. generouted 파일 기반 라우팅과 knip 미사용 코드 점검 도입",
      "예약 창구 불러오기: 기존 창구·예약자 정보를 불러와 새 창구를 만드는 기능을 예약 시나리오 타입별 폼으로 나눠 구현하고, 건별 처리 진행률과 실패 내역을 보여주는 진행 표시 추가",
      "Lexical 에디터 도입: 파트너스·운영툴에 Lexical 에디터를 도입하고 S3 이미지 업로드를 연동해 공지·설문·투표·피드 작성에 공통 적용 (운영툴 쪽 플러그인은 팀원과 공동 작업)",
    ],
    keyHighlights: [1, 3, 5],
    featured: true,
  },
  {
    slug: "pos-kiosk",
    title: "POS / 주문 키오스크 시스템",
    description:
      "아파트 단지 내 입주민 대상 카페·매점에서 사용하는 POS와 주문 키오스크. 두 대의 독립 크롬 윈도우 간 실시간 동기화를 BroadcastChannel로 해결하고, 결제·IoT 장비 연동부터 Vite 전환까지 신규 개발과 운영을 담당",
    tags: [
      "React",
      "TypeScript",
      "React Query",
      "Recoil",
      "Tailwind CSS",
      "Broadcast Channel API",
      "localStorage",
      "MSW",
      "Vite",
    ],
    period: "2023.03 - 2024.11",
    role: "프론트엔드 개발",
    company: "에이치티비욘드",
    highlights: [
      "아파트 단지 내 입주민 대상 카페·매점에서 사용하는 POS를 신규 개발(2023.03)하고, 같은 코드베이스에 주문 키오스크를 추가(2023.12)해 2024년까지 운영·확장",
      "React Query로 서버 데이터를, Recoil로 결제·주문·영수증 같은 화면 상태를 나눠 관리하여 컴포넌트 간 의존성 감소",
      "결제 요청 취소 처리: AbortController로 결제 API를 요청 단위 취소 가능하게 구성. 결제 수단 태그 모달을 닫으면 진행 중인 요청을 abort하고 결제 중지를 호출해, 사용자가 결제 도중 화면을 이탈해도 잔여 요청이 후속 화면에 영향 주지 않도록 처리. 결제 수단별 timeout도 분리",
      "POS·KIOSK 화면 대응: 공통 Tailwind preset 위에 POS·KIOSK 설정을 따로 두고, KIOSK는 간격·글자 크기 스케일을 약 2배로 재정의. 같은 클래스명의 컴포넌트가 빌드별로 다른 크기로 나오도록 해 POS(가로 1024×768)·KIOSK(세로 1024×1920, 50인치) 양 환경을 동일 컴포넌트로 대응",
      "트러블슈팅: 한 매장에 메인(직원)+서브(고객) 두 대의 독립 크롬 윈도우가 동시에 떠 상품 목록·결제 진행 상태·결제 결과를 실시간 공유해야 하는 요구. 팀 내 윈도우 간 통신 선례가 없는 상황에서 WebSocket 서버 신설 없이 동일 origin 안에서 쓸 수 있는 BroadcastChannel을 채택하고 데이터 종류별로 채널을 분리. 서브 창이 나중에 열리거나 새로고침돼도 화면이 비지 않도록 송신 시 localStorage에 스냅샷을 저장하고 마운트 시 복원",
      "IoT 장비 연동: 카드리더기·영수증 프린터·안면인식기 포트 설정과 결제 흐름을 연동하고, 엣지·IoT 서버 health check와 장비 에러 코드 체계를 만들어 현장 장애 원인을 화면에서 구분",
      "기기 설정 로컬 이관: 기기별 장비 설정을 서버 조회에서 localStorage 저장으로 옮기고 기존 서버 데이터를 옮겨 오는 마이그레이션 훅을 두어 장비 조회 API 호출 감소",
      "빌드·라우팅 현대화: CRA → Vite 마이그레이션, React Query v3에서 v5로 업그레이드하며 useQuery·useMutation 로직 분리, generouted 파일 기반 라우팅과 knip 도입",
    ],
    keyHighlights: [2, 4, 5],
    featured: true,
    relatedPostSlugs: ["post-message-browser-communication"],
  },
  {
    slug: "byby-2",
    title: "바이비 2.0 서비스",
    description:
      "입주민용 커뮤니티 앱(웹뷰)의 예약·상품 구매·스마트아파트 기능 개발과 장기 유지보수. 전역 Modal·Bottom Sheet로 웹뷰 백버튼 흐름을 정리하고 라우트 지연 로딩으로 탐색 UX 개선",
    tags: [
      "React",
      "TypeScript",
      "React Query",
      "Recoil",
      "Tailwind CSS",
      "Vite",
      "Storybook",
    ],
    period: "2023.06 - 2024.11",
    role: "프론트엔드 개발",
    company: "에이치티비욘드",
    highlights: [
      "예약 기능 확장: 고정 기간·구독 예약, 강좌 월별 반복 회차 상세와 재수강 여부, 정원·잔여석, 수강 횟수 제한, 정기권·단기권 등 예약 시나리오 확장 (강좌 도메인은 팀원과 분담)",
      "옵션 그룹 상품 모델: 단일·조합 옵션을 담는 옵션 그룹 기반 상품 구조를 프론트에서 모델링하고 상품 상세·장바구니·구매 금액 계산 로직을 구현해 다양한 상품 조합 지원",
      "전역 Modal·Bottom Sheet: 화면마다 따로 두던 바텀시트 상태를 전역으로 올리고, 안드로이드 백버튼을 바텀시트 닫기 → 모달 닫기 → 뒤로가기 순으로 처리. 작성 중 이탈 방지 모달도 적용 (모바일 네비게이션 관련 버그 약 60% 감소)",
      "스마트아파트 기능: 방문 차량 등록(홈넷 연동), 앱카드 분실 신고(네이티브 연동), 엘리베이터 호출 화면 구현",
      "탐색 UX 개선: 라우트 전반에 React.lazy를 적용하고, 뒤로가기 시 스크롤 위치 유지와 단지 변경 시 쿼리 캐시 처리를 정리",
      "파트너스 쿠폰: 쿠폰 카드·목록·상세와 사용 바텀시트를 만들고 회원·비회원·입주민별 노출 분기 구현",
      "고정 슬롯 예약 제한: 회원별 일·월 슬롯 한도와 이미 점유된 슬롯과의 충돌 안내 추가",
      "Lexical 에디터 테마·CSS를 정의해 피드 상세 뷰어에 적용",
      "공통 UI 패키지: 모노레포 공통 UI 패키지에 Select·Radio·Toggle·Input(Text·Password·Code·Stepper·Textarea) 컴포넌트를 Storybook 문서와 함께 작성",
    ],
    keyHighlights: [1, 2],
    relatedPostSlugs: ["global-modal-bottom-sheet", "coupon-code-bottom-sheet"],
  },
  {
    slug: "cicd-infra",
    title: "프론트엔드 인프라 및 배포 환경 개선",
    description:
      "엣지(현장) 서버에 배포되는 프론트 프로덕트의 WebServer를 pm2 serve에서 nginx로 전환하고, Ansible Semaphore + Jenkins + AWS S3를 잇는 배포 파이프라인을 Git Tag 버전 기반으로 개편. 단지별 배포 버전 추적 가능",
    tags: [
      "Jenkins",
      "Ansible Semaphore",
      "AWS S3",
      "nginx",
      "Git Tag",
      "YAML",
      "Linux",
    ],
    period: "2024.02 - 2024.04",
    role: "프론트엔드 인프라",
    company: "에이치티비욘드",
    highlights: [
      "엣지 배포 환경 전환: POS·KIOSK(blue-byb-pos)와 월패드(blue-web-wallpad) 3개 화면의 WebServer를 pm2 serve → nginx 정적 콘텐츠 서비스로 이관. nginx 설정에 화면별 포트·build 폴더·SPA fallback을 정의하고 pm2 설치 스크립트를 걷어내, build 파일 교체만으로 배포가 완결되도록 구조 단순화",
      "배포 파이프라인 개편: Ansible Semaphore + Jenkins + AWS S3를 잇는 기존 배포 플레이북(GITHUB_BUNDLE_CHECK → JENKINS_BUILD → DEPLOY_TO_EDGE)을 버전 기반으로 개편. 번들에서 서비스별 버전을 추출하고 Jenkins 호출을 파라미터 빌드로 변경",
      "POS·KIOSK 빌드 통합: REACT_APP_PRODUCT 환경변수 sed 치환과 산출물 폴더 분리(build-pos / build-kiosk)로 한 번의 build step에서 두 프로덕트 산출물을 동시 생성하고, nginx가 한 배포 폴더에서 두 빌드를 서빙 (이전 2회 빌드 → 1회)",
      "AWS S3 빌드 산출물을 Git Tag 기반 version 단위로 관리 (이전 build_id 기반 → version 기반). devops-bundle의 단지별 bundle.yaml에 적힌 버전으로 배포하도록 바꿔 단지별 배포 버전을 명시적으로 추적 가능하도록 개선",
      "트러블슈팅: 슬래시가 들어간 Git Tag(release/x.y.z 등)를 그대로 S3 경로에 쓰면 파일을 찾지 못하는 문제를 막기 위해 Jenkins 파라미터를 태그용과 S3 경로용 버전명으로 분리. 이후 Jinja 표현식 안 문자열에 넣은 버전 변수가 치환되지 않던 버그는 변수 설정을 두 단계로 나눠 해결",
      "nginx가 build 폴더를 읽을 수 있도록 배포 단계에서 디렉터리 권한 설정을 자동화. 다른 팀 폴더에 영향을 주지 않도록 상위 홈 디렉터리는 711(통과만 허용)로 최소 권한을 먼저 적용했고, 배포 환경 검증 후 755로 조정",
      "Git Tag 버전 규칙(dev / alpha / release)을 Ansible 환경별 브랜치와 연결해 환경별 배포 흐름 일관화",
    ],
    keyHighlights: [0, 1, 2],
    relatedPostSlugs: ["edge-deployment-pipeline", "linux-permissions-nginx"],
  },
  {
    slug: "game-calculator",
    title: "놀러와마이홈 게임 계산기",
    description:
      "게임 「놀러와마이홈」의 제작 물품 재료·비용 계산 웹 서비스. 프론트·백엔드를 단독으로 만들어 실제 게임 유저 대상으로 운영하며 두 차례 전면 리뉴얼. 2차 리뉴얼에서는 API·DB 호환을 유지한 채 NestJS → Django 전환과 프론트 전면 리팩터링 진행",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "React Query",
      "Emotion",
      "NestJS",
      "Django",
      "PostgreSQL",
      "Docker",
      "Google Analytics",
    ],
    period: "2020.08 - 2026.10",
    role: "풀스택 개발 (단독)",
    highlights: [
      "프론트엔드·백엔드·배포를 단독으로 설계·구현하고 실제 게임 유저 대상으로 운영 (2020.08 첫 출시, 2023.08 React·TypeScript·NestJS로 1차 전면 리뉴얼, 2026.10 2차 전면 리뉴얼)",
      "계산 도메인: 물품 레시피를 하위 물품까지 재귀 전개해 기본 재료 수량을 합산하고, 시세 × 수량으로 재료비, 재료비 + 제작비로 총비용 계산. 장바구니 합산, 99개 묶음 단위 환산, 보유 재료 기준 부족분 계산 지원",
      "실사용자 3.3천 명: 실제 게임 유저 대상 서비스 운영, 누적 사용자 약 3.3천 명·재방문율 약 30% 확보",
      "API 호환 백엔드 전환: NestJS 서버를 Django REST Framework로 다시 쓰면서 URL·응답 키·에러 형식·DB 스키마를 그대로 유지해 프론트와 데이터 변경 없이 전환. 응답 형태 특성화 테스트와 롤백 절차 문서화",
      "레거시 대비 회귀 검증: 기존 TypeScript 계산 코드로 만든 골든 fixture와 시드 고정 무작위 레시피 3,000개 시나리오(물품 5만여 개)를 비교해 재작성한 계산 결과의 순서·수량·가격이 모두 같음을 확인",
      "계산 알고리즘 개선: 단계마다 전체 물품을 선형 탐색하던 BFS를 물품별 메모이제이션 DFS로 바꾸고, 입력 객체를 직접 수정해 다음 계산을 오염시키던 버그와 순환 레시피 무한 루프를 순환 감지 예외로 해결",
      "데이터 정합성: 시세·물품을 고치면 같은 트랜잭션에서 계산 결과를 갱신하고, 저장 전후 진단을 비교해 새로 생긴 문제(순환 레시피·누락 시세 등)만 거절. 관리자용 데이터 점검 화면 제공",
      "프론트 리팩터링: CRA → Vite·Vitest 전환, React Query v3에서 v5로 업그레이드, antd를 걷어내고 Emotion 기반 자체 UI로 교체. 관리 화면 지연 로딩과 xlsx 동적 import로 첫 화면 JS(gzip) 501KB → 362KB",
      "엑셀 일괄 등록: 물품·시세 엑셀 업로드에 행 단위 검증과 행 번호 오류 안내를 넣고, 알려진 취약점이 있던 xlsx 0.18.5를 SheetJS 0.20.3으로 교체",
      "인증·운영: 공용 비밀번호 로그인을 회원가입·Bearer 토큰(해시 저장·7일 만료) 방식으로 바꾸고 쓰기 API를 관리자 전용으로 제한. GitHub Actions CI와 Render·Vercel·Neon 배포 구성",
    ],
    keyHighlights: [2, 3, 4],
    github: "https://github.com/shuobyian/my-home-frontend",
    demo: "https://myhome-nine-topaz.vercel.app",
    relatedPostSlugs: ["myhome-recipe-calculator-rewrite", "myhome-basic-material-logic", "myhome-crafting-cost-formula"],
  },
  {
    slug: "byby-quiz",
    title: "바이비 Quiz",
    description:
      "NestJS·PostgreSQL 기반 진행형 퀴즈 서비스 백엔드. 문제 진행 상태 관리와 채점·집계 API를 맡아 동시 참여 약 50명 안정 처리",
    tags: ["NestJS", "TypeORM", "PostgreSQL"],
    period: "2022.12 - 2023.01",
    role: "백엔드 개발",
    company: "에이치티비욘드",
    highlights: [
      "NestJS·TypeORM·PostgreSQL 기반 퀴즈 서비스 백엔드에서 문제 진행 상태와 리포트 모듈 담당 (4명 분담)",
      "문제 진행 상태 관리: 퀴즈 시작 시 문제별 진행 레코드를 만들고 INITIALIZED → INPROGRESS → RESULT → DONE 상태로 관리. 진행 중인 문제가 있으면 다른 문제를 시작하지 못하게 막아 진행 순서 보장",
      "채점·점수 반영: 객관식은 정답 보기 묶음을, 주관식은 복수 정답을 허용해 비교. 진행 중이 아닌 문제나 중복 제출은 거절하고 정답이면 참여자 점수에 누적",
      "동시 참여 50명 처리: 문제별 보기 선택 수를 세는 리포트 API로 진행자 화면의 결과 표시를 지원. 클라이언트가 폴링으로 진행 상태를 받는 구조에서 동시 참여 약 50명 안정 처리",
    ],
    keyHighlights: [1, 3],
  },
  {
    slug: "e-voting",
    title: "전자 투표 시스템 (프로그래밍 경진대회 2위)",
    description:
      "학생 자치기구 선거를 위한 웹 기반 전자 투표 시스템. 데이터 무결성을 고려한 투표 기록 관리로 교내 프로그래밍 경진대회 2위 수상",
    tags: ["Node.js", "Vue.js", "MySQL"],
    period: "2018.09",
    role: "웹 개발",
    highlights: [
      "학생 자치기구 선거를 위한 웹 기반 전자 투표 시스템 개발",
      "전자 투표 기능 및 투표 이력 조회 기능 구현",
      "데이터 무결성을 고려한 투표 기록 관리",
      "경진대회 2위: 데이터 무결성 기반 투표 시스템으로 교내 프로그래밍 경진대회 2위 수상",
    ],
    keyHighlights: [3],
  },
  {
    slug: "student-council",
    title: "학생회 관리 홈페이지",
    description:
      "학생회 운영을 위한 내부 관리 웹 애플리케이션. 대여 사업 물품 관리·학과 정보·공지 관리 도메인을 단일 웹앱으로 통합",
    tags: ["Node.js", "Vue.js", "MySQL"],
    period: "2018.01",
    role: "웹 개발",
    highlights: [
      "학생회 운영을 위한 내부 관리 웹 애플리케이션 개발",
      "대여 사업 물품 관리 기능 구현",
      "학과 정보 및 공지 사항 관리 화면 개발",
      "업무 처리 시간 80% 단축: 학생회 운영 도메인 전반을 단일 웹 애플리케이션으로 통합, 물품·공지 관리 업무 처리 시간 약 80% 단축",
    ],
    keyHighlights: [3],
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function parsePeriodStart(period: string): number {
  const m = period.match(/(\d{4})\.(\d{2})/);
  if (!m) return 0;
  return parseInt(m[1]) * 100 + parseInt(m[2]);
}

/** 시작 시점 기준 최신순 */
export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => parsePeriodStart(b.period) - parsePeriodStart(a.period));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
