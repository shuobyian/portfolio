"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

// 서버·하이드레이션 렌더에서는 false, 하이드레이션이 끝나면 true.
// effect 안에서 setState 하지 않고도 마운트 여부를 읽는다.
const subscribe = () => () => {};
const useHydrated = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useHydrated();

  if (!hydrated) return <div className="h-8 w-8" />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      aria-label="테마 전환"
    >
      {resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
