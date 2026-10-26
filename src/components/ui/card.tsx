import type { ReactNode } from "react";

// 떠오름 — glassy에서 조상 group을 hover하면 6px 떠오른다.
// hover는 움직이지 않는 조상이 받아야 한다. 떠오르는 요소가 받으면 아래 가장자리에서 hover가 풀렸다 돌아오길 반복한다
const liftHover = "glassy:motion-safe:group-hover:-translate-y-1.5";
export const cardLift = `transition-transform duration-300 ease-out ${liftHover}`;

/**
 * 프로젝트 썸네일·주요 성과·관련 글·블로그 글·연락처처럼 hover하는 카드가 함께 쓰는 유리 카드. glassy에서 조상 group을 hover하면 떠오르며
 * 강조색 테두리·그림자로 빛나고 유리 광택이 생긴다. 라이트·다크에서는 hover해도 모양이 바뀌지 않는다.
 * - 테두리·배경·여백·배치(flex 등)는 className으로 준다. 강조 테두리는 안쪽 outline이라 테두리가 없는 카드도 레이아웃이 바뀌지 않는다.
 * - lift={false}면 떠오르지 않는다. 카드 바깥 요소까지 함께 띄울 때는 그 요소에 cardLift를 준다.
 * - overText면 글자 아래에 약한 광택만 깔고, 아니면(이미지 등) 내용 위에 광택과 빛줄기를 얹는다.
 */
export function Card({
  as: Tag = "div",
  lift = true,
  overText = false,
  className = "",
  children,
}: {
  as?: "div" | "article";
  lift?: boolean;
  overText?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    // 강조 outline은 늘 투명한 색에서 시작해 테마를 glassy로 바꾸는 순간 글자색 outline이 번쩍이지 않게 한다.
    // hover하면 원래 테두리를 지워 그 자리를 outline이 맡는다. 고대비 모드는 투명한 outline도 보이게 칠하므로 뺀다
    <Tag
      className={`relative isolate overflow-hidden rounded-md outline-transparent transition duration-300 ease-out glassy:outline glassy:-outline-offset-1 glassy:group-hover:border-transparent glassy:group-hover:shadow-xl glassy:group-hover:shadow-accent/20 glassy:group-hover:outline-accent/60 forced-colors:outline-none ${lift ? liftHover : ""} ${className}`}
    >
      {overText ? (
        <>
          <Sheen overText />
          {children}
        </>
      ) : (
        <>
          {children}
          <Sheen />
        </>
      )}
    </Tag>
  );
}

// 유리 광택 — 글자 위에서는 반사를 글자 대비 4.5:1이 유지되는 세기로 낮추고, 지나가는 동안 대비를 크게 떨어뜨리는 빛줄기는 뺀다
function Sheen({ overText = false }: { overText?: boolean }) {
  return (
    <>
      {/* 왼쪽 위에서 비치는 반사와 안쪽 테두리의 빛. 밝은 바탕에서도 보이게 오른쪽 아래는 살짝 어둡힌다.
          글자 카드에서는 음수 z-index로 글자와 카드 outline 아래에 깐다(카드가 isolate라 카드 배경보다는 위) */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-br ${overText ? "-z-10 from-white/8" : "from-white/35"} via-white/5 to-black/10 opacity-0 shadow-[inset_0_1px_0_rgb(255_255_255/0.6),inset_0_0_0_1px_rgb(255_255_255/0.12)] transition-opacity duration-300 glassy:group-hover:opacity-100`}
      />
      {/* 빛줄기 — hover하는 순간 한 번 훑고 지나가고, 벗어나면 바로 제자리로 돌아간다 */}
      {!overText && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/45 to-transparent opacity-0 transition duration-0 glassy:group-hover:translate-x-[600%] glassy:group-hover:opacity-100 glassy:group-hover:duration-700 glassy:group-hover:ease-out motion-reduce:hidden"
        />
      )}
    </>
  );
}
