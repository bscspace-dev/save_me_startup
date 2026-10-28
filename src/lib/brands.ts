import { cacheLife } from "next/cache";
import { getSupabase } from "@/lib/supabase";

export type Brand = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  highlights: string[];
  cautions: string[];
  investTotal: number | null; // 만원
  stores: number | null;
  royalty: string | null;
  training: string | null;
  sample?: boolean;
};

// 개발 환경에서 화면 확인용으로만 쓰는 가상의 샘플입니다. 프로덕션에는 노출되지 않습니다.
const SAMPLES: Brand[] = [
  {
    id: "sample-1",
    name: "샘플 브랜드 A",
    category: "카페·음료",
    tagline: "소형 평수에서 운영 가능한 디저트 카페",
    summary: "샘플 데이터입니다. Supabase brands 테이블에 실제 브랜드를 등록하면 이 자리에 표시됩니다.",
    highlights: ["10평 내외 소형 매장", "간소화된 조리 공정", "본사 직접 원두 공급"],
    cautions: ["최소 계약 기간 확인 필요", "인테리어 지정 업체 여부 확인"],
    investTotal: 8000,
    stores: 24,
    royalty: "월 정액 30만원",
    training: "본사 교육 2주",
    sample: true,
  },
  {
    id: "sample-2",
    name: "샘플 브랜드 B",
    category: "치킨·분식",
    tagline: "배달 중심 소자본 창업 모델",
    summary: "샘플 데이터입니다. 실제 브랜드 정보로 교체하세요.",
    highlights: ["배달 특화 소형 주방", "낮은 초기 투자"],
    cautions: ["배달 플랫폼 수수료 구조 확인"],
    investTotal: 6000,
    stores: 58,
    royalty: "매출의 3%",
    training: "본사 교육 1주",
    sample: true,
  },
];

type Row = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  highlights: string[] | null;
  cautions: string[] | null;
  invest_total: number | null;
  stores: number | null;
  royalty: string | null;
  training: string | null;
};

export async function getBrands(): Promise<Brand[]> {
  "use cache";
  cacheLife("minutes");

  const supabase = getSupabase();
  if (!supabase) return process.env.NODE_ENV === "production" ? [] : SAMPLES;

  const { data, error } = await supabase
    .from("brands")
    .select("id,name,category,tagline,summary,highlights,cautions,invest_total,stores,royalty,training")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[brands] fetch failed", error.message);
    return process.env.NODE_ENV === "production" ? [] : SAMPLES;
  }

  const rows = (data ?? []) as Row[];
  if (rows.length === 0 && process.env.NODE_ENV !== "production") return SAMPLES;

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    category: r.category,
    tagline: r.tagline,
    summary: r.summary,
    highlights: r.highlights ?? [],
    cautions: r.cautions ?? [],
    investTotal: r.invest_total,
    stores: r.stores,
    royalty: r.royalty,
    training: r.training,
  }));
}
