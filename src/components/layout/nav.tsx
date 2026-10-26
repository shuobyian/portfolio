"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, FolderKanban, House, Mail, User } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { pillClass } from "@/components/ui/pill";

const links = [
  { href: "/", label: "홈", icon: House },
  { href: "/about", label: "소개", icon: User },
  { href: "/projects", label: "프로젝트", icon: FolderKanban },
  { href: "/blog", label: "블로그", icon: BookOpen },
  { href: "/contact", label: "연락처", icon: Mail },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <>
      {/* 화면 끝에 붙은 띠 대신 iOS 탭 바처럼 떠 있는 유리 캡슐 */}
      <header className="fixed inset-x-3 top-3 z-50 mx-auto max-w-5xl rounded-[2rem] border border-border liquid-glass">
        <div className="mx-auto max-w-5xl px-6">
          <nav className="flex h-16 items-center justify-between gap-2">
            <Link
              href="/"
              className="text-base font-semibold tracking-tight"
            >
              Subeen<span className="text-accent">.</span>
            </Link>

            <div className="flex items-center gap-6">
              {/* 모바일에서는 메뉴를 아래 탭 바로 옮긴다 */}
              <div className="hidden items-center gap-6 md:flex">
                {links.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      // 음수 마진으로 자리를 그대로 둔 채 선택 항목에 알약을 깐다
                      className={`-mx-2.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm ${pillClass(active)}`}
                    >
                      <link.icon size={16} />
                      {link.label}
                    </Link>
                  );
                })}
                <span className="h-5 w-px bg-border" />
              </div>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      {/* 모바일 탭 바 — iOS처럼 화면 아래에 떠 있는 유리 캡슐. 가려지는 만큼 layout에서 아래 여백을 준다 */}
      <nav
        aria-label="메뉴"
        className="fixed inset-x-3 bottom-3 z-50 flex h-16 items-center rounded-[2rem] border border-border p-1.5 liquid-glass md:hidden"
      >
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`flex h-full flex-1 flex-col items-center justify-center gap-0.5 rounded-full text-[11px] font-medium ${pillClass(active)}`}
            >
              <link.icon size={20} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
