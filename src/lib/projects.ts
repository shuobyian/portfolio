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
  featured?: boolean;
  company?: string;
  relatedPostSlugs?: string[];
}

const projects: Project[] = [
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
      "백오피스 도메인 비중이 높은 사내 환경에 맞춰 컴포넌트 풍부도·디자인 커스터마이징 용이성·반응형 그리드 성숙도를 종합 검토하여 Bootstrap 채택",
      "사내 디자인 토큰을 CSS Variables로 추상화하여 Bootstrap 기본 스타일 위에 사내 정체성 레이어를 일관 적용",
      "색상·타이포·간격·레이아웃을 단일 토큰으로 정의하여 토큰 1회 변경으로 시스템 전반 갱신",
      "컴포넌트를 Monorepo 단위 패키지로 분리하여 UI 자산의 독립 배포·버전 관리 구조 확보",
      "라이트/다크 테마를 토큰 레이어에서 분기. 컴포넌트 코드는 테마 인지 없이 동작하도록 분리",
      "백오피스 신규 프로젝트의 첫 적용을 통해 토큰·컴포넌트 구조를 운영 환경에서 검증한 뒤 사내 표준 라인업으로 정착",
    ],
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
      "자체 Monorepo 디자인 시스템을 첫 적용한 프로젝트. 토큰·컴포넌트 구조를 운영 환경에서 처음 검증하여 사내 표준 정착의 기반 마련",
      "기능 단위 컴포넌트 분리로 메뉴 추가 시 기존 화면 영향 없이 확장 가능한 구조 설계",
      "파일 업로드 모듈 구현: AWS S3 업로드/다운로드 처리. 게시글 작성 흐름과 첨부 파일 생성·삭제 라이프사이클을 연동하여 게시글 단위로 파일 일관 관리",
      "이후 2026.02-03에 BI 사전 검증 목적으로 Antd 디자인 시스템으로 마이그레이션 ([백오피스 리팩토링](/projects/backoffice-refactor) 참조)",
    ],
    relatedPostSlugs: ["admin-als-frontend-deployment"],
  },
  {
    slug: "pharm-bridge",
    title: "팜브릿지 서비스 재구축",
    description:
      "약국 대상 약품 입고 관리 프로그램의 백엔드 JSP→Spring 전환에 맞춘 프론트엔드 전면 재구성. SSR 제약·인력 풀·번들·일정을 종합 검토하여 Vanilla JS 채택",
    tags: ["HTML", "CSS", "JavaScript", "자체 디자인 시스템"],
    period: "2025.07 - 2025.12",
    role: "프론트엔드 개발",
    company: "알스솔루션",
    highlights: [
      "약국 대상 약품 입고 관리 프로그램 ‘팜브릿지’의 백엔드 JSP→Spring 전환에 맞춰 프론트엔드 전면 재구성",
      "의사결정: SSR 라우팅 제약·운영 인력의 장기 유지보수 가능 기술 폭·초기 번들 사이즈 요구·백엔드 Spring 전환과 동기화된 일정 안에 안정화 가능 여부를 종합 검토하여 Vanilla JS 선택",
      "HTML/CSS/JavaScript만으로 라우팅 진입점, 상태 컨테이너, 이벤트 위임 처리 모듈을 자체 구현하여 프레임워크 의존도 없이 유지보수 가능한 구조 설계",
      "SSR 환경에 최적화된 자체 디자인 시스템을 별도 설계 — 사내 Monorepo·Antd 라인과 토큰·컴포넌트 모두 분리 운영",
      "이후 2026.02-03에 React Island 패턴으로 부분 전환 ([팜브릿지 서비스 리팩토링](/projects/pharm-bridge-refactor) 참조)",
    ],
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
      "드래그앤드롭 일정 편집에 낙관적 업데이트 적용으로 작업 처리 속도 개선",
      "Changelog 분석으로 과거 시점 조회·고스트 바 비교 기능 구현 (회고/이력 분석 지원)",
      "팀/상태 기반 색상 시각화·다중 필터링으로 대규모 프로젝트 탐색 효율 최적화",
      "Atlassian OAuth 연동 및 URL 상태 관리로 별도 저장 없이 공유 가능한 협업 환경 구축",
    ],
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
      "테스트 인프라(Jest+MSW) 구축으로 React 영역 회귀 안정성 확보",
    ],
    featured: true,
  },
  {
    slug: "backoffice-refactor",
    title: "백오피스 리팩토링 (Antd 마이그레이션)",
    description:
      "차기 BI 프로젝트의 Antd 도입 리스크를 운영 중인 백오피스에서 사전 검증한 파일럿. 자체 Monorepo 디자인 시스템 → Antd 컴포넌트 단위 점진적 교체",
    tags: ["React", "TypeScript", "Ant Design"],
    period: "2026.02 - 2026.03",
    role: "프론트엔드 개발",
    company: "알스솔루션",
    highlights: [
      "배경: 사내 차기 신규 프로젝트(BI 서비스)에서 Antd 디자인 시스템 도입을 결정한 상황. 신규 프로젝트에 본격 적용하기 전, 운영 중인 백오피스에서 먼저 마이그레이션을 선행하여 Antd 기반 개발 워크플로우·사내 정체성 디자인 적용 가능성·운영 리스크를 사전 검증",
      "자체 Monorepo 디자인 시스템에서 Antd 기반 디자인 시스템으로 컴포넌트 단위 점진적 교체",
      "기존 컴포넌트의 디자인 토큰을 Antd 컴포넌트 props·테마로 매핑하는 변환 가이드를 정의하여 화면별 영향 범위 최소화",
    ],
    featured: true,
  },
  {
    slug: "bi-service",
    title: "BI 서비스 신규 구축",
    description:
      "약품 판매 실적 데이터를 제약사 운영자·사내 운영자에게 시각화·분석 형태로 제공하는 사내 BI 서비스. 직전 백오피스 리팩토링에서 사전 검증한 Antd 디자인 시스템 본격 적용",
    tags: ["React", "TypeScript", "Ant Design", "Antd Charts"],
    period: "2026.04 - 진행중",
    role: "프론트엔드 개발",
    company: "알스솔루션",
    highlights: [
      "약품 판매 실적 데이터를 제약사 운영자·사내 운영자에게 시각화·분석 형태로 제공하는 사내 BI 서비스. 현재 요구사항·설계 단계",
      "직전 백오피스 리팩토링에서 사전 검증한 Antd 디자인 시스템을 본격 적용. 검증 단계에서 정의한 토큰 매핑·컴포넌트 사용 패턴을 그대로 활용하여 초기 개발 속도 확보",
      "디자인 시스템과의 시각적 일관성을 위해 차트 라이브러리는 Antd Charts 채택 예정",
    ],
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
      "Recoil",
      "Jest",
      "MSW",
      "Ant Design",
    ],
    period: "2021.08 - 2024.12",
    role: "프론트엔드 개발",
    company: "에이치티비욘드",
    highlights: [
      "시간·공간·강좌·숙박·레슨 등 5종 예약 도메인과 PG·관리비 결제, 이용권 관리가 커뮤니티·파트너스 두 프로덕트에 걸쳐 운영되는 환경에서 기능 개발과 아키텍처 개선 병행",
      "JS→TS 마이그레이션을 핵심 메뉴 4개 영역에서 단계적 진행. 도메인 간 결합이 강한 부분은 인터페이스 우선 정의 후 구현체 이관하여 운영 중단 없이 완료",
      "서버 상태를 Redux→React Query로 분리. 도메인별 queryKey 컨벤션·invalidation 규칙 문서화 후 팀 전파",
      "Axios interceptor 공통 에러 처리로 외부 연동(PG/관리비) 실패 메시지를 도메인 단위로 일관화",
      "팀 내 첫 프론트엔드 테스트 체계(Jest+MSW) 도입 주도. 핵심 결제·예약 플로우부터 적용하여 배포 후 핫픽스 월 평균 5건 → 1건 감소",
      "기획·디자인 협업: 예약 창구 중복 검증 결과를 단일 에러가 아닌 충돌 자원 목록 모달로 보여주도록 역제안 → 운영팀이 충돌 자원을 즉시 식별·재배정 가능하도록 개선",
      "기획·디자인 협업: 예약 시간 설정 화면 복잡도가 높아 고객사가 직접 설정에 어려움을 겪던 상황. 정보 그룹 단위 박스 처리·배치 재구성을 역제안하여 진입 장벽 완화",
    ],
    featured: true,
  },
  {
    slug: "pos-kiosk",
    title: "POS / 주문 키오스크 시스템",
    description:
      "아파트 단지 내 입주민 대상 카페·매점에서 사용하는 클라우드 POS·주문 키오스크. 두 대의 독립 크롬 윈도우 간 실시간 동기화를 Broadcast Channel + localStorage 이중 구조로 해결",
    tags: [
      "React",
      "TypeScript",
      "React Query",
      "Recoil",
      "Tailwind CSS",
      "Broadcast Channel API",
      "localStorage",
    ],
    period: "2023.03 - 2023.04",
    role: "프론트엔드 개발",
    company: "에이치티비욘드",
    highlights: [
      "아파트 단지 내 입주민 대상 카페·매점에서 사용하는 클라우드 기반 POS·주문 키오스크 시스템 신규 개발",
      "React Query·Recoil로 서버 상태와 UI 상태를 분리하여 컴포넌트 간 의존성 감소",
      "AbortController로 결제 API를 요청 단위 취소 가능하게 구성. 사용자가 결제 도중 화면을 이탈해도 잔여 요청이 후속 화면에 영향 주지 않도록 처리",
      "POS(가로 1024×768) · KIOSK(세로 1024×1920) 두 가지 화면 방향·비율을 Tailwind 토큰으로 추상화하여 동일 컴포넌트로 양 환경 대응",
      "트러블슈팅: 한 매장에 메인(직원)+서브(고객) 두 대의 독립 크롬 윈도우가 동시에 떠 결제 상태·주문 내역·세션을 실시간 공유해야 하는 요구. 팀 내 윈도우 간 통신 선례가 없는 상황에서 WebSocket 서버 신설 없이 동일 origin 내에서 해결 가능한 Web API Broadcast Channel을 1차 채널로 채택하고, 메시지 유실에 대비해 localStorage event를 백업 채널로 두는 이중 구조 설계. 수신 측에서 메시지를 받아 React Query invalidate를 호출하는 방식으로 두 화면 동기화 통합",
    ],
    featured: true,
    relatedPostSlugs: ["post-message-browser-communication"],
  },
  {
    slug: "byby-2",
    title: "바이비 2.0 서비스",
    description:
      "기존 서비스 리뉴얼 및 장기 유지보수. Storybook 기반 디자인 시스템 구축, 웹뷰 모바일 UX 개선, Lexical Editor 커스터마이징",
    tags: [
      "React",
      "TypeScript",
      "React Query",
      "Recoil",
      "Tailwind CSS",
      "Storybook",
      "Lexical",
    ],
    period: "2023.02 - 2023.10",
    role: "프론트엔드 개발",
    company: "에이치티비욘드",
    highlights: [
      "예약 서비스 UI/UX 개선 및 월 반복 강좌 기능 구현",
      "옵션 그룹 기반 상품 구조 설계로 다양한 상품 조합 지원",
      "Lexical Editor 커스터마이징으로 게시글 편집 기능 고도화",
      "전역 Modal / Bottom Sheet 구현으로 모바일 네비게이션 및 백버튼 대응",
      "Storybook 기반 디자인 시스템 구축 및 공통 컴포넌트 개발",
    ],
    relatedPostSlugs: ["global-modal-bottom-sheet", "coupon-code-bottom-sheet"],
  },
  {
    slug: "cicd-infra",
    title: "프론트엔드 인프라 및 배포 환경 개선",
    description:
      "엣지(현장) 서버에 배포되는 프론트 프로덕트의 WebServer를 pm2 serve에서 nginx로 전환하고, Ansible Semaphore + Jenkins + AWS S3를 잇는 단일 배포 파이프라인 구축. Git Tag 기반 version 관리로 단지별 배포 버전 추적 가능",
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
      "엣지 배포 환경 전환: blue-byb-pos·blue-byb-kiosk·blue-web-wallpad 3개 프론트 프로덕트의 WebServer를 pm2 serve → nginx 정적 콘텐츠 서비스로 이관. pm2 설정 변경 없이 build 파일 교체만으로 배포가 완결되도록 구조 단순화",
      "Ansible Semaphore + Jenkins + AWS S3를 잇는 단일 배포 파이프라인 구축 (GITHUB_BUNDLE_CHECK → JENKINS_BUILD → DEPLOY_TO_EDGE 3단계 yaml 정의)",
      "POS·KIOSK 빌드 통합: REACT_APP_PRODUCT 환경변수 sed 치환으로 한 번의 build step에서 두 프로덕트 산출물을 동시 생성하도록 변경 (이전 2회 빌드 → 1회)",
      "AWS S3 빌드 산출물을 Git Tag 기반 version 단위로 관리 (이전 build_id 기반 → version_tag 기반). devops-bundle에서 단지별 배포 버전을 명시적으로 추적 가능하도록 개선",
      "트러블슈팅: Jenkins build parameter에 version_tag·s3_bucket_name 분리 도입 — origin/develop 같이 슬래시 포함 tag가 s3 폴더명과 미스매치되어 파일을 못 찾는 이슈 해결",
      "nginx 정적 콘텐츠 실행을 위한 build 폴더 권한 자동화 (chmod 755 + /home/htbeyond에 711 — 다른 팀 폴더에 영향을 주지 않으면서 nginx만 통과 가능하도록 최소 권한)",
      "Git Tag 기반 버전 관리 전략 수립 (dev / alpha / prod) — 환경별 배포 흐름 일관화",
    ],
    relatedPostSlugs: ["edge-deployment-pipeline", "linux-permissions-nginx"],
  },
  {
    slug: "pwa-notification",
    title: "PWA / Electron 기반 알림 환경 구축",
    description:
      "Firebase Cloud Messaging(FCM) 기반 Push 알림 서버 구축. PWA·Electron 환경별 권한 모델 차이를 단일 인터페이스로 추상화",
    tags: ["Firebase", "PWA", "Electron"],
    period: "2025",
    role: "프론트엔드 개발",
    company: "알스솔루션",
    highlights: [
      "FCM을 활용한 Push 알림 서버 구축",
      "PWA·Electron 환경의 권한 모델 차이를 단일 인터페이스로 추상화",
      "웹·데스크톱 환경 간 알림 동작 차이를 고려한 분기 구조 설계",
    ],
  },
  {
    slug: "game-calculator",
    title: "놀러와마이홈 게임 계산기",
    description:
      "게임 내 재화 및 재료 자동 계산 웹 서비스. 프론트·백엔드 단독 설계·구현, 실제 게임 유저 대상 서비스 운영",
    tags: ["React", "Node.js", "PostgreSQL", "Docker", "Google Analytics"],
    period: "2020.08",
    role: "풀스택 개발 (단독)",
    highlights: [
      "프론트엔드 및 백엔드 전반을 단독으로 설계·구현",
      "사용자 입력 기반 계산 로직 및 결과 시각화 구현",
      "실제 게임 유저를 대상으로 서비스 운영 경험",
    ],
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
