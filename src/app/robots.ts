import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// TODO(정식 오픈 시 해제): site.ts의 testMode가 true인 동안은 모든 검색엔진 수집을 막습니다.
export default function robots(): MetadataRoute.Robots {
  return SITE.testMode
    ? { rules: { userAgent: "*", disallow: "/" } }
    : { rules: { userAgent: "*", allow: "/" } };
}
