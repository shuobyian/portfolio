"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
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
    // glassy에서는 화면 끝에 붙은 띠 대신 iOS 탭 바처럼 떠 있는 유리 캡슐이 된다
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm glassy:inset-x-3 glassy:top-3 glassy:mx-auto glassy:max-w-5xl glassy:rounded-[2rem] glassy:border glassy:liquid-glass">
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
                  // glassy: 음수 마진으로 자리를 그대로 둔 채 선택 항목에 유리 알약을 깐다
                  className={`text-sm underline-offset-[6px] transition-colors glassy:-mx-2.5 glassy:rounded-full glassy:px-2.5 glassy:py-1.5 ${
                    active
                      ? "text-foreground underline decoration-accent decoration-2 glassy:bg-white/15 glassy:no-underline"
                      : "text-muted-foreground hover:text-foreground glassy:hover:bg-white/10"
                  }`}
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
