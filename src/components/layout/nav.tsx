"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { pillClass } from "@/components/ui/pill";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    // 화면 끝에 붙은 띠 대신 iOS 탭 바처럼 떠 있는 유리 캡슐
    <header className="fixed inset-x-3 top-3 z-50 mx-auto max-w-5xl rounded-[2rem] border border-border liquid-glass">
      <div className="mx-auto max-w-5xl px-6">
        <nav className="flex h-16 items-center justify-between gap-2">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight"
          >
            Subeen<span className="text-accent">.</span>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  // 음수 마진으로 자리를 그대로 둔 채 선택 항목에 알약을 깐다
                  className={`-mx-2.5 rounded-full px-2.5 py-1.5 text-sm ${pillClass(active)}`}
                >
                  {link.label}
                </Link>
              );
            })}
            <span className="h-5 w-px bg-border" />
            <ThemeToggle />
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="메뉴 토글"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>

        {/* Mobile sheet */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="border-t border-border py-2 md:hidden"
            >
              <div className="flex flex-col gap-0.5">
                {links.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`rounded-md px-2 py-2.5 text-sm transition-colors ${
                        active
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
