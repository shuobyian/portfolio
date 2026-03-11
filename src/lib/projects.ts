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
}

const projects: Project[] = [
  {
    slug: "design-system",
    title: "디자인 시스템 구축",
    description:
      "Bootstrap 기반 커스텀 테마 설계 및 Tailwind CSS, SCSS 병행 적용으로 레거시·신규 환경 모두 지원하는 Monorepo 기반 디자인 시스템",
    tags: ["Bootstrap", "Tailwind CSS", "CSS Variables", "Monorepo"],
    period: "2025.03 - 2025.04",
    role: "프론트엔드 개발 (설계·구현 주도)",
    company: "알스솔루션",
    highlights: [
      "색상, 타이포그래피, 레이아웃 규칙을 토큰화하여 컴포넌트 단위 재사용 구조화",
      "라이트/다크 모드를 고려한 테마 아키텍처 설계로 스타일 확장 시 영향 범위 최소화",
      "컴포넌트 단위 Monorepo 기반 설계로 UI 자산의 재사용성과 독립 배포 구조 확보",
      "공통 컴포넌트 수준 추상화로 UI 변경 사항이 전역에 일관되게 반영",
    ],
    featured: true,
  },
  {
    slug: "backoffice",
    title: "사내 백오피스 신규 구축",
    description:
      "React 기반 사내 백오피스 웹 애플리케이션을 초기 설계부터 구현까지 담당. 자체 디자인 시스템을 전면 적용하여 화면 일관성 확보",
    tags: ["React", "TypeScript"],
    period: "2025.05 - 2025.06",
    role: "프론트엔드 개발 (설계·구현)",
    company: "알스솔루션",
    highlights: [
      "React 기반 백오피스 웹 애플리케이션을 초기 설계부터 구현까지 담당",
      "자체 구축한 디자인 시스템을 전면 적용하여 화면 일관성 및 유지보수성 확보",
      "기능 단위 컴포넌트 분리로 확장 가능한 화면 구조 설계",
    ],
    featured: true,
  },
  {
    slug: "pharm-bridge",
    title: "팜브릿지 서비스 재구축",
    description:
      "JSP 기반 화면 구조를 Spring 서버 구조로 전환하는 과정에서 프론트엔드를 바닐라 JS로 전면 재구성. 프레임워크 의존도 최소화",
    tags: ["HTML", "CSS", "JavaScript"],
    period: "2025.07 - 2025.11",
    role: "프론트엔드 개발",
    company: "알스솔루션",
    highlights: [
      "HTML/CSS/JavaScript만으로 모든 화면을 바닐라 방식 구현",
      "렌더링 흐름, 상태 관리, 이벤트 처리 로직을 명시적으로 구성하여 프레임워크 의존도 최소화",
      "웹 표준과 DOM 구조에 기반한 설계로 성능 및 유지보수성 확보",
    ],
    featured: true,
  },
  {
    slug: "community-platform",
    title: "커뮤니티 서비스 운영툴 / 파트너스 플랫폼",
    description:
      "아파트 커뮤니티 시설 예약, 상품 구매, 이용권 관리 등 핵심 서비스 프론트엔드 개발. JS→TS 마이그레이션, React Query 도입, 테스트 체계 구축",
    tags: ["React", "TypeScript", "React Query", "Redux", "Recoil", "Jest", "MSW", "Ant Design"],
    period: "2021.08 - 2024.12",
    role: "프론트엔드 개발",
    company: "에이치티비욘드",
    highlights: [
      "JavaScript 코드베이스를 TypeScript로 단계적 전환하여 타입 안정성 확보",
      "React Query 도입으로 서버 상태 관리 구조 개선 및 데이터 동기화 단순화",
      "Axios interceptor 기반 공통 에러 처리로 중복 코드 제거 및 유지보수성 향상",
      "테스트 코드(Jest, MSW) 도입을 주도하여 배포 후 긴급 수정 및 사이드 이펙트 발생 빈도 감소",
      "시간/공간/강좌/숙박/레슨 등 다양한 예약 타입과 복합 상품 도메인 구현",
    ],
    featured: true,
  },
  {
    slug: "pos-kiosk",
    title: "POS / 주문 키오스크 시스템",
    description:
      "클라우드 기반 POS 웹 시스템과 키오스크 환경 프론트엔드 개발. Broadcast Channel API를 활용한 다중 브라우저 간 실시간 통신 구현",
    tags: ["React", "TypeScript", "React Query", "Recoil", "Tailwind CSS", "Broadcast Channel API"],
    period: "2023.03 - 2023.04",
    role: "프론트엔드 개발",
    company: "에이치티비욘드",
    highlights: [
      "메인/서브 모니터 간 브라우저 통신 구조 설계 및 구현",
      "Broadcast Channel API를 활용한 다중 브라우저 간 실시간 통신 구현",
      "AbortController를 활용한 API 취소 처리로 결제 실패 시 사용자 경험 개선",
      "React Query, Recoil을 활용한 상태 분리로 컴포넌트 간 의존성 감소",
      "POS·KIOSK 화면 크기에 맞춘 Tailwind 기반 반응형 UI 구성",
    ],
    featured: true,
  },
  {
    slug: "byby-2",
    title: "바이비 2.0 서비스",
    description:
      "기존 서비스 리뉴얼 및 장기 유지보수. Storybook 기반 디자인 시스템 구축, 웹뷰 모바일 UX 개선, Lexical Editor 커스터마이징",
    tags: ["React", "TypeScript", "React Query", "Recoil", "Tailwind CSS", "Storybook", "Lexical"],
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
  },
  {
    slug: "cicd-infra",
    title: "프론트엔드 인프라 및 배포 환경 개선",
    description:
      "Jenkins 기반 CI/CD 파이프라인 구축, Git Tag 버전 관리 전략 수립, AWS S3 배포 및 Ansible 자동 배포 프로세스 개선",
    tags: ["Jenkins", "Git", "AWS S3", "Ansible", "YAML"],
    period: "2024.02 - 2024.04",
    role: "프론트엔드 인프라",
    company: "에이치티비욘드",
    highlights: [
      "Jenkins 기반 CI/CD 파이프라인 구축 및 운영",
      "Git Tag 기반 버전 관리 전략 수립 (dev / alpha / prod)",
      "AWS S3 기반 빌드 산출물 배포 및 환경별 관리",
      "Ansible Semaphore를 활용한 현장(단지)별 자동 배포 프로세스 개선",
    ],
  },
  {
    slug: "byby-quiz",
    title: "바이비 Quiz",
    description:
      "NestJS, PostgreSQL 기반 실시간 퀴즈 서비스 백엔드 개발. 문제 진행 상태 및 점수 집계 로직 구현",
    tags: ["NestJS", "PostgreSQL"],
    period: "2022.12 - 2023.01",
    role: "백엔드 개발",
    company: "에이치티비욘드",
    highlights: [
      "NestJS, PostgreSQL 기반 실시간 퀴즈 서비스 백엔드 개발",
      "문제 진행 상태 및 점수 집계 로직 구현",
    ],
  },
  {
    slug: "pwa-notification",
    title: "PWA / Electron 기반 알림 환경 구축",
    description:
      "Firebase Cloud Messaging(FCM)을 활용한 Push 알림 서버 구축. 웹, 데스크톱 환경 간 알림 동작 차이를 고려한 구조 설계",
    tags: ["Firebase", "PWA", "Electron"],
    period: "2025",
    role: "프론트엔드 개발",
    company: "알스솔루션",
    highlights: [
      "FCM을 활용한 Push 알림 서버 구축",
      "PWA 및 Electron 환경에서의 알림 수신 흐름과 권한 관리 적용",
      "웹, 데스크톱 환경 간 알림 동작 차이를 고려한 구조 설계",
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
