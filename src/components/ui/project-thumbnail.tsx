import {
  Palette,
  LayoutDashboard,
  Pill,
  GanttChart,
  BarChart3,
  FileSpreadsheet,
  Users,
  ShoppingBag,
  Smartphone,
  GitBranch,
  Calculator,
  RefreshCw,
  Sparkles,
  HelpCircle,
  Vote,
  GraduationCap,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "@/lib/projects";

const ICON_MAP: Record<string, LucideIcon> = {
  "frontend-standardization": Boxes,
  "design-system": Palette,
  backoffice: LayoutDashboard,
  "pharm-bridge": Pill,
  wbs: GanttChart,
  "pharm-bridge-refactor": RefreshCw,
  "pharmscope": BarChart3,
  "preprocess-backoffice": FileSpreadsheet,
  "community-platform": Users,
  "pos-kiosk": ShoppingBag,
  "byby-2": Smartphone,
  "cicd-infra": GitBranch,
  "game-calculator": Calculator,
  "byby-quiz": HelpCircle,
  "e-voting": Vote,
  "student-council": GraduationCap,
};

export function ProjectThumbnail({ project }: { project: Project }) {
  const Icon = ICON_MAP[project.slug] ?? Sparkles;
  const patternId = `grid-${project.slug}`;

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden text-muted-foreground"
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-40 transition-opacity duration-300 glassy:group-hover:opacity-100"
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
              stroke="var(--border)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      <Icon
        size={48}
        strokeWidth={1.25}
        className="relative transition duration-300 ease-out group-hover:text-accent glassy:motion-safe:group-hover:-rotate-6 glassy:motion-safe:group-hover:scale-110"
        aria-hidden="true"
      />
    </div>
  );
}
