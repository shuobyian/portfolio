"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { tagClass } from "./pill";

// 필터 칩 묶음 — 모바일에서는 지금 고른 값만 보이는 버튼으로 접어 두고 눌러서 펼친다. md 이상에서는 늘 펼쳐 둔다
export function FilterChips({
  label,
  current,
  className = "",
  children,
}: {
  label: string;
  current: string;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 md:hidden ${tagClass(open)}`}
      >
        {label}: <span className="font-medium text-foreground">{current}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div id={id} className={`${open ? "mt-3 flex" : "hidden"} flex-wrap gap-2 md:mt-0 md:flex`}>
        {children}
      </div>
    </div>
  );
}
