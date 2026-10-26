// 내비 메뉴·필터가 함께 쓰는 알약 — 선택하면 배경이 깔린다.
// hover하면 라이트·다크에서는 글자색만 바뀌고, glassy에서는 빛 반사·그림자를 달고 떠오른다.
// 누를 때 줄이지는 않는다 — 가장자리를 누르면 줄어든 알약 밖에서 손을 떼게 돼 클릭이 사라진다
export const pillClass = (selected: boolean) =>
  `transition duration-200 ease-out ${
    selected
      ? "bg-foreground/15 text-foreground"
      : "text-muted-foreground hover:text-foreground glassy:hover:bg-foreground/15 glassy:hover:shadow-[inset_0_1px_0_var(--glass-highlight),0_4px_14px_var(--glass-shadow)] glassy:motion-safe:hover:scale-105"
  }`;

// 테두리 있는 알약 — 프로젝트·블로그의 태그 필터
export const tagClass = (selected: boolean) =>
  `rounded-full border px-3 py-1 text-sm ${pillClass(selected)} ${
    selected ? "border-foreground/30" : "border-border glassy:hover:border-foreground/30"
  }`;
