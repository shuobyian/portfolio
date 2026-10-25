import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 실행에 실제로 필요한 파일만 .next/standalone 으로 추려낸다.
  // 컨테이너 이미지에 node_modules 전체를 넣지 않기 위한 옵션.
  output: "standalone",
  // BI 서비스 → 팜스코프 이름 변경 전 URL을 새 주소로 보낸다.
  async redirects() {
    return [
      { source: "/projects/bi-service", destination: "/projects/pharmscope", permanent: true },
      {
        source: "/blog/bi-react-query-zustand-architecture",
        destination: "/blog/pharmscope-react-query-zustand-architecture",
        permanent: true,
      },
      {
        source: "/blog/bi-query-key-cache-invalidation",
        destination: "/blog/pharmscope-query-key-cache-invalidation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
