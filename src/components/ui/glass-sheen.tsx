/**
 * hover하면 카드가 유리처럼 보이게 얹는 덧칠. 부모에 relative·overflow-hidden, 조상에 group이 있어야 한다.
 * gloss는 왼쪽 위 반사 세기 — 글자가 그 위에 놓이면 대비가 4.5:1 아래로 떨어지지 않게 from-white/10 이하로 쓰고,
 * 글자에 relative를 줘서 덧칠보다 위에 그려지게 한다.
 */
export function GlassSheen({ gloss = "from-white/35" }: { gloss?: string }) {
  return (
    <>
      {/* 왼쪽 위에서 비치는 반사와 안쪽 테두리의 빛. 밝은 바탕에서도 보이게 오른쪽 아래는 살짝 어둡힌다 */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-br ${gloss} via-white/5 to-black/10 opacity-0 shadow-[inset_0_1px_0_rgb(255_255_255/0.6),inset_0_0_0_1px_rgb(255_255_255/0.12)] transition-opacity duration-300 group-hover:opacity-100`}
      />
      {/* 빛줄기 — hover하는 순간 한 번 훑고 지나가고, 벗어나면 바로 제자리로 돌아간다 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/45 to-transparent opacity-0 transition duration-0 group-hover:translate-x-[600%] group-hover:opacity-100 group-hover:duration-700 group-hover:ease-out motion-reduce:hidden"
      />
    </>
  );
}
