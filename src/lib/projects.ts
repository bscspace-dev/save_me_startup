import { cacheLife } from "next/cache";
import { getSupabase } from "@/lib/supabase";

export type Project = {
  id: string;
  title: string;
  category: string;
  district: string | null;
  summary: string;
  services: string[];
  images: string[];
  completedAt: string | null;
  sample?: boolean;
};

// 개발 환경에서 화면 확인용으로만 쓰는 가상의 샘플입니다(사진 없음). 프로덕션에는 노출되지 않습니다.
const SAMPLES: Project[] = [
  {
    id: "sample-1",
    title: "샘플 프로젝트 A · 디저트 카페",
    category: "카페",
    district: "수성구",
    summary: "샘플 데이터입니다. Supabase projects 테이블에 실제 완성 사례와 사진을 등록하면 이 자리에 표시됩니다.",
    services: ["입지분석", "아이덴티티", "인테리어", "마케팅"],
    images: [],
    completedAt: null,
    sample: true,
  },
  {
    id: "sample-2",
    title: "샘플 프로젝트 B · 한식 다이닝",
    category: "한식",
    district: "달서구",
    summary: "샘플 데이터입니다. 실제 사례로 교체하세요.",
    services: ["입지분석", "인테리어"],
    images: [],
    completedAt: null,
    sample: true,
  },
];

type Row = {
  id: string;
  title: string;
  category: string;
  district: string | null;
  summary: string;
  services: string[] | null;
  images: string[] | null;
  completed_at: string | null;
};

const isProd = () => process.env.NODE_ENV === "production";

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("minutes");

  const supabase = getSupabase();
  if (!supabase) return isProd() ? [] : SAMPLES;

  const { data, error } = await supabase
    .from("projects")
    .select("id,title,category,district,summary,services,images,completed_at")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[projects] fetch failed", error.message);
    return isProd() ? [] : SAMPLES;
  }

  const rows = (data ?? []) as Row[];
  if (rows.length === 0 && !isProd()) return SAMPLES;

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    district: r.district,
    summary: r.summary,
    services: r.services ?? [],
    images: r.images ?? [],
    completedAt: r.completed_at,
  }));
}
