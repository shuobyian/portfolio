"use client";

import { useTheme } from "next-themes";
import { Droplet, Moon, Sun } from "lucide-react";
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

// 누를 때마다 이 순서로 돈다. 버튼에는 다음에 바뀔 테마의 아이콘을 보여준다.
const themes = [
  { name: "light", label: "라이트", Icon: Sun },
  { name: "dark", label: "다크", Icon: Moon },
  { name: "glassy", label: "글래시", Icon: Droplet },
];

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useHydrated();

  if (!hydrated) return <div className="h-8 w-8" />;

  const current = themes.findIndex((t) => t.name === resolvedTheme);
  const next = themes[(current + 1) % themes.length];

  return (
    <button
      onClick={() => setTheme(next.name)}
      className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      aria-label={`${next.label} 테마로 전환`}
      title={`${next.label} 테마로 전환`}
    >
      <next.Icon size={15} />
    </button>
  );
}
