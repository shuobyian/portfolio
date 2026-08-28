import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 실행에 실제로 필요한 파일만 .next/standalone 으로 추려낸다.
  // 컨테이너 이미지에 node_modules 전체를 넣지 않기 위한 옵션.
  output: "standalone",
};

export default nextConfig;
