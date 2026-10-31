"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tagClass } from "@/components/ui/pill";
import {
  RELATION_TYPES,
  getAllProjects,
  getAllRelations,
  getProjectBySlug,
  type RelationEdge,
  type RelationType,
} from "@/lib/projects";

const NODE_W = 150;
const NODE_H = 48;

// 노드 자리는 손으로 잡는다. 왼쪽(이전 회사) → 오른쪽(현 회사)으로 읽히게 두어 경험 전이 선이 시간 순으로 흐른다
const NODES: Record<string, { x: number; y: number; label: string }> = {
  "cicd-infra": { x: 115, y: 120, label: "엣지 배포 인프라" },
  "byby-2": { x: 115, y: 240, label: "바이비 2.0" },
  "pos-kiosk": { x: 285, y: 240, label: "POS·키오스크" },
  "byby-quiz": { x: 115, y: 360, label: "바이비 Quiz" },
  "community-platform": { x: 285, y: 360, label: "운영툴·파트너스" },
  "frontend-standardization": { x: 700, y: 120, label: "FE 표준화·CI/CD" },
  "design-system": { x: 480, y: 240, label: "디자인 시스템" },
  wbs: { x: 910, y: 240, label: "WBS 시스템" },
  backoffice: { x: 480, y: 360, label: "사내 백오피스" },
  pharmscope: { x: 700, y: 360, label: "팜스코프" },
  "preprocess-backoffice": { x: 910, y: 360, label: "전처리 백오피스" },
  "pharm-bridge": { x: 560, y: 480, label: "팜브릿지 재구축" },
  "pharm-bridge-refactor": { x: 820, y: 480, label: "팜브릿지 리팩토링" },
  "game-calculator": { x: 200, y: 610, label: "마이홈 계산기" },
  "e-voting": { x: 510, y: 610, label: "전자 투표" },
  "student-council": { x: 820, y: 610, label: "학생회 홈페이지" },
};

const CLUSTERS = [
  { x: 20, y: 44, w: 360, h: 380, label: "에이치티비욘드 · 2021–2024" },
  { x: 400, y: 44, w: 600, h: 500, label: "알스솔루션 · 2025–" },
  { x: 20, y: 564, w: 980, h: 86, label: "개인 프로젝트", personal: true },
];

// 유형마다 색과 선 모양을 함께 바꿔 색을 구분하기 어려워도 읽히게 한다
const EDGE_STYLE: Record<RelationType, { className: string; dash?: string; width: number; arrow: boolean }> = {
  lineage: { className: "text-foreground/70", width: 1.8, arrow: true },
  foundation: { className: "text-accent", width: 2.2, arrow: true },
  data: { className: "text-accent", dash: "9 5", width: 2.2, arrow: true },
  ecosystem: { className: "text-muted-foreground", width: 1.8, arrow: false },
  transfer: { className: "text-muted-foreground", dash: "4 5", width: 1.6, arrow: true },
};

const TYPES = Object.keys(RELATION_TYPES) as RelationType[];

// 노드 중심을 잇는 직선이 노드 상자 테두리와 만나는 점
function borderPoint(from: { x: number; y: number }, to: { x: number; y: number }, gap = 0) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const scale = Math.min((NODE_W / 2 + gap) / Math.abs(dx || 1e-6), (NODE_H / 2 + gap) / Math.abs(dy || 1e-6));
  return { x: from.x + dx * scale, y: from.y + dy * scale };
}

function EdgeSwatch({ type }: { type: RelationType }) {
  const style = EDGE_STYLE[type];
  return (
    <svg width="28" height="10" aria-hidden className={style.className}>
      <line x1="1" y1="5" x2="27" y2="5" stroke="currentColor" strokeWidth={style.width} strokeDasharray={style.dash} />
    </svg>
  );
}

type Props = {
  // 주요(featured) 프로젝트 노드에 강조 테두리를 둔다
  highlightFeatured?: boolean;
  // 처음부터 골라 둘 노드. 설명 패널이 빈 채로 시작하지 않게 할 때 쓴다
  defaultSelected?: string;
  // 축약해 보여준다 — 관계가 없는 노드와 개인 프로젝트 구역, 유형 토글, 관계 설명 문장을 뺀다
  compact?: boolean;
};

export function ProjectRelationMap({ highlightFeatured = false, defaultSelected, compact = false }: Props) {
  const edges = getAllRelations();
  const connected = new Set(edges.flatMap((e) => [e.from, e.to]));
  const clusters = compact ? CLUSTERS.filter((c) => !("personal" in c)) : CLUSTERS;
  const [hidden, setHidden] = useState<RelationType[]>([]);
  // 고른 노드는 클릭·탭으로 고정되고, 마우스를 올린 노드는 고정된 노드보다 먼저 보인다
  const [selected, setSelected] = useState<string | null>(defaultSelected ?? null);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = hovered ?? selected;

  const visible = edges.filter((e) => !hidden.includes(e.type));
  const touches = (e: RelationEdge, slug: string) => e.from === slug || e.to === slug;
  const linked = new Set(
    active ? visible.filter((e) => touches(e, active)).flatMap((e) => [e.from, e.to]) : [],
  );
  const activeEdges = active ? visible.filter((e) => touches(e, active)) : [];
  const activeProject = active ? getProjectBySlug(active) : undefined;

  const toggleType = (type: RelationType) =>
    setHidden(hidden.includes(type) ? hidden.filter((t) => t !== type) : [...hidden, type]);
  const select = (slug: string) => setSelected(selected === slug ? null : slug);
  const onKey = (slug: string) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select(slug);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {compact && TYPES.map((type) => (
          <span key={type} className="inline-flex items-center gap-2 px-1 text-sm text-muted-foreground">
            <EdgeSwatch type={type} />
            {RELATION_TYPES[type].label}
          </span>
        ))}
        {!compact && TYPES.map((type) => (
          <button
            key={type}
            aria-pressed={!hidden.includes(type)}
            title={RELATION_TYPES[type].description}
            onClick={() => toggleType(type)}
            className={`inline-flex items-center gap-2 ${tagClass(!hidden.includes(type))} ${hidden.includes(type) ? "opacity-60" : ""}`}
          >
            <EdgeSwatch type={type} />
            {RELATION_TYPES[type].label}
          </button>
        ))}
        {highlightFeatured && (
          <span className="inline-flex items-center gap-2 px-1 text-sm text-muted-foreground">
            <svg width="22" height="14" aria-hidden>
              <rect x="1" y="1" width="20" height="12" rx="3" className="fill-background stroke-accent" strokeWidth="2" />
            </svg>
            주요 프로젝트
          </span>
        )}
      </div>

      {/* 좁은 화면에서는 도면을 줄이지 않고 이 상자 안에서만 가로로 넘긴다 */}
      <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-muted/30">
        <svg
          viewBox={compact ? "0 0 1020 556" : "0 0 1020 664"}
          className="h-auto w-full min-w-[720px] text-foreground"
          role="group"
          aria-label="프로젝트 관계도 — 노드를 누르면 연결된 프로젝트와 관계 설명이 아래에 나온다"
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <defs>
            {/* Tailwind가 클래스 이름을 찾을 수 있게 조합하지 않고 그대로 적는다 */}
            {(
              [
                ["foreground", "fill-foreground/70"],
                ["accent", "fill-accent"],
                ["muted-foreground", "fill-muted-foreground"],
              ] as const
            ).map(([color, fill]) => (
              <marker
                key={color}
                id={`relation-arrow-${color}`}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" className={fill} />
              </marker>
            ))}
          </defs>

          {clusters.map((c) => (
            <g key={c.label} className="text-muted-foreground">
              <rect
                x={c.x}
                y={c.y}
                width={c.w}
                height={c.h}
                rx="14"
                fill="currentColor"
                fillOpacity="0.03"
                stroke="currentColor"
                strokeOpacity="0.25"
                strokeDasharray="3 4"
              />
              <text x={c.x + 16} y={c.y + 24} fontSize="13" fontWeight="600" className="fill-muted-foreground">
                {c.label}
              </text>
            </g>
          ))}

          {visible.map((e) => {
            const a = NODES[e.from];
            const b = NODES[e.to];
            if (!a || !b) return null;
            const style = EDGE_STYLE[e.type];
            const start = borderPoint(a, b, 2);
            const end = borderPoint(b, a, 4);
            const marker = e.type === "lineage" ? "foreground" : style.className === "text-accent" ? "accent" : "muted-foreground";
            const dim = active && !touches(e, active);
            return (
              <line
                key={`${e.from}-${e.to}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="currentColor"
                strokeWidth={active && !dim ? style.width + 0.8 : style.width}
                strokeDasharray={style.dash}
                markerEnd={style.arrow ? `url(#relation-arrow-${marker})` : undefined}
                className={`${style.className} transition-opacity duration-200 ${dim ? "opacity-15" : ""}`}
              />
            );
          })}

          {getAllProjects().map((p) => {
            const node = NODES[p.slug];
            if (!node || (compact && !connected.has(p.slug))) return null;
            const isActive = active === p.slug;
            const isFeatured = highlightFeatured && p.featured;
            const dim = active && !isActive && !linked.has(p.slug);
            return (
              <g
                key={p.slug}
                role="button"
                tabIndex={0}
                aria-pressed={selected === p.slug}
                aria-label={`${p.title} — 관계 보기`}
                onClick={() => select(p.slug)}
                onKeyDown={onKey(p.slug)}
                onMouseEnter={() => setHovered(p.slug)}
                onMouseLeave={() => setHovered(null)}
                className={`cursor-pointer outline-none transition-opacity duration-200 focus-visible:[&>rect]:stroke-accent ${dim ? "opacity-30" : ""}`}
              >
                <rect
                  x={node.x - NODE_W / 2}
                  y={node.y - NODE_H / 2}
                  width={NODE_W}
                  height={NODE_H}
                  rx="10"
                  className={
                    isActive
                      ? "fill-accent stroke-accent"
                      : isFeatured
                        ? "fill-background stroke-accent"
                        : "fill-background stroke-border"
                  }
                  strokeWidth={isActive || isFeatured ? 2 : 1.5}
                />
                <text
                  x={node.x}
                  y={node.y - 3}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="600"
                  className={isActive ? "fill-accent-foreground" : "fill-foreground"}
                >
                  {node.label}
                </text>
                <text
                  x={node.x}
                  y={node.y + 14}
                  textAnchor="middle"
                  fontSize="10.5"
                  className={isActive ? "fill-accent-foreground" : "fill-muted-foreground"}
                >
                  {p.period}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div
        className={`mt-6 rounded-lg border border-border p-5 ${compact ? "min-h-28" : "min-h-40"}`}
        aria-live="polite"
      >
        {activeProject ? (
          <>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold tracking-tight">{activeProject.title}</h3>
              <Link
                href={`/projects/${activeProject.slug}`}
                className="inline-flex items-center gap-1 text-sm text-accent underline-offset-2 hover:underline"
              >
                프로젝트 보기 <ArrowRight size={14} />
              </Link>
            </div>
            {activeEdges.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {activeEdges.map((e) => {
                  const otherSlug = e.from === active ? e.to : e.from;
                  const other = getProjectBySlug(otherSlug);
                  const arrow = e.type === "ecosystem" ? "↔" : e.from === active ? "→" : "←";
                  return (
                    <li key={`${e.from}-${e.to}`} className="flex flex-wrap items-start gap-x-3 gap-y-1 text-sm">
                      <span className="inline-flex w-28 shrink-0 items-center gap-2 text-muted-foreground">
                        <EdgeSwatch type={e.type} />
                        {RELATION_TYPES[e.type].label}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="text-muted-foreground">{arrow} </span>
                        <Link
                          href={`/projects/${otherSlug}`}
                          className="font-medium underline-offset-2 hover:text-accent hover:underline"
                        >
                          {other?.title}
                        </Link>
                        {!compact && <span className="mt-0.5 block text-muted-foreground">{e.note}</span>}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                다른 프로젝트와 직접 이어진 관계가 없는 독립 프로젝트입니다.
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            {compact
              ? "프로젝트를 누르면 이어진 프로젝트가 여기에 나옵니다."
              : "프로젝트를 누르면 이어진 프로젝트와 관계 설명이 여기에 나옵니다. 위 범례를 눌러 관계 유형을 숨기거나 다시 보일 수 있습니다."}
          </p>
        )}
      </div>
    </div>
  );
}
