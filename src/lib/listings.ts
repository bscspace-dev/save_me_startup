import { cacheLife } from "next/cache";
import { getSupabase } from "@/lib/supabase";

export type ListingStatus = "available" | "reserved" | "closed";

export type Listing = {
  id: string;
  title: string;
  district: string;
  locationNote: string;
  floor: string | null;
  sizePyeong: number | null;
  deposit: number | null; // 만원
  rent: number | null; // 만원/월
  premium: number | null; // 만원
  recommended: string[];
  status: ListingStatus;
  summary: string;
  scores: { label: string; value: number | null }[];
  pros: string[];
  risks: string[];
  analyzedAt: string | null;
  sample?: boolean;
};

// 개발 환경에서 화면 확인용으로만 쓰는 가상의 샘플입니다. 프로덕션에는 노출되지 않습니다.
const SAMPLES: Listing[] = [
  {
    id: "sample-1",
    title: "샘플 매물 A · 먹자골목 1층 상가",
    district: "수성구",
    locationNote: "OO동 일대",
    floor: "1층",
    sizePyeong: 18,
    deposit: 5000,
    rent: 280,
    premium: 3000,
    recommended: ["카페", "디저트"],
    status: "available",
    summary: "샘플 데이터입니다. Supabase listings 테이블에 실제 분석 매물을 등록하면 이 자리에 표시됩니다.",
    scores: [
      { label: "유동인구", value: 4 },
      { label: "배후 수요", value: 4 },
      { label: "경쟁 여건", value: 3 },
      { label: "접근성·가시성", value: 5 },
      { label: "임대 조건", value: 3 },
    ],
    pros: ["점심·저녁 보행량이 꾸준함", "코너 입지로 간판 노출 우수"],
    risks: ["동일 업종 점포 밀집", "월세 대비 전용면적 협소"],
    analyzedAt: null,
    sample: true,
  },
  {
    id: "sample-2",
    title: "샘플 매물 B · 주택가 이면도로 상가",
    district: "달서구",
    locationNote: "OO동 일대",
    floor: "1층",
    sizePyeong: 12,
    deposit: 2000,
    rent: 130,
    premium: null,
    recommended: ["분식", "배달 전문"],
    status: "reserved",
    summary: "샘플 데이터입니다. 실제 매물 정보로 교체하세요.",
    scores: [
      { label: "유동인구", value: 2 },
      { label: "배후 수요", value: 4 },
      { label: "경쟁 여건", value: 4 },
      { label: "접근성·가시성", value: 2 },
      { label: "임대 조건", value: 5 },
    ],
    pros: ["배후 세대 수 풍부", "낮은 임대 부담"],
    risks: ["도보 유입이 적어 배달 의존도 높음"],
    analyzedAt: null,
    sample: true,
  },
];

type Row = {
  id: string;
  title: string;
  district: string;
  location_note: string;
  floor: string | null;
  size_pyeong: number | null;
  deposit: number | null;
  rent: number | null;
  premium: number | null;
  recommended: string[] | null;
  status: ListingStatus;
  summary: string;
  score_traffic: number | null;
  score_demand: number | null;
  score_competition: number | null;
  score_access: number | null;
  score_rent: number | null;
  pros: string[] | null;
  risks: string[] | null;
  analyzed_at: string | null;
};

const isProd = () => process.env.NODE_ENV === "production";

export async function getListings(): Promise<Listing[]> {
  "use cache";
  cacheLife("minutes");

  const supabase = getSupabase();
  if (!supabase) return isProd() ? [] : SAMPLES;

  const { data, error } = await supabase
    .from("listings")
    .select(
      "id,title,district,location_note,floor,size_pyeong,deposit,rent,premium,recommended,status,summary,score_traffic,score_demand,score_competition,score_access,score_rent,pros,risks,analyzed_at",
    )
    .neq("status", "closed")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[listings] fetch failed", error.message);
    return isProd() ? [] : SAMPLES;
  }

  const rows = (data ?? []) as Row[];
  if (rows.length === 0 && !isProd()) return SAMPLES;

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    district: r.district,
    locationNote: r.location_note,
    floor: r.floor,
    sizePyeong: r.size_pyeong,
    deposit: r.deposit,
    rent: r.rent,
    premium: r.premium,
    recommended: r.recommended ?? [],
    status: r.status,
    summary: r.summary,
    scores: [
      { label: "유동인구", value: r.score_traffic },
      { label: "배후 수요", value: r.score_demand },
      { label: "경쟁 여건", value: r.score_competition },
      { label: "접근성·가시성", value: r.score_access },
      { label: "임대 조건", value: r.score_rent },
    ],
    pros: r.pros ?? [],
    risks: r.risks ?? [],
    analyzedAt: r.analyzed_at,
  }));
}
