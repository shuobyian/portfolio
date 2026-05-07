import {
  Palette,
  LayoutDashboard,
  Pill,
  GanttChart,
  BarChart3,
  Users,
  ShoppingBag,
  Smartphone,
  GitBranch,
  Bell,
  Calculator,
  RefreshCw,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "@/lib/projects";

const ICON_MAP: Record<string, LucideIcon> = {
  "design-system": Palette,
  backoffice: LayoutDashboard,
  "pharm-bridge": Pill,
  wbs: GanttChart,
  "pharm-bridge-refactor": RefreshCw,
  "backoffice-refactor": RefreshCw,
  "bi-service": BarChart3,
  "community-platform": Users,
  "pos-kiosk": ShoppingBag,
  "byby-2": Smartphone,
  "cicd-infra": GitBranch,
  "pwa-notification": Bell,
  "game-calculator": Calculator,
};

const COMPANY_GRADIENT: Record<string, string> = {
  알스솔루션: "from-sky-500 via-blue-600 to-indigo-700",
  에이치티비욘드: "from-violet-500 via-purple-600 to-fuchsia-700",
};

const DEFAULT_GRADIENT = "from-slate-500 via-slate-600 to-slate-700";

export function ProjectThumbnail({ project }: { project: Project }) {
  const Icon = ICON_MAP[project.slug] ?? Sparkles;
  const gradient =
    (project.company && COMPANY_GRADIENT[project.company]) ?? DEFAULT_GRADIENT;
  const patternId = `grid-${project.slug}`;

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} text-white`}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-20"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id={patternId}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* 발광 효과 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />

      <Icon
        size={64}
        strokeWidth={1.5}
        className="relative drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
      />
    </div>
  );
}
