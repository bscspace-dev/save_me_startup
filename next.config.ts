import type { NextConfig } from "next";

// 프로젝트 사진은 Supabase Storage(public 버킷)에서 불러옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // 예전 주소(/franchise, /location)로 들어온 방문자를 새 주소로 보냅니다.
  async redirects() {
    return [
      { source: "/franchise", destination: "/knowhow", permanent: false },
      { source: "/location", destination: "/identity", permanent: false },
    ];
  },
  partialPrefetching: true,
  images: {
    remotePatterns: supabaseUrl ? [new URL(`${supabaseUrl}/storage/v1/object/public/**`)] : [],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
