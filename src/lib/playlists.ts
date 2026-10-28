import { cacheLife } from "next/cache";
import { getSupabase } from "@/lib/supabase";
import { parseVideoId } from "@/lib/youtube";

export type FeaturedVideo = {
  id: string;
  title: string;
  description: string | null;
  videoId: string | null; // 유튜브 영상 ID (없으면 샘플)
  sample?: boolean;
};

// 개발 환경에서 화면 확인용으로만 쓰는 샘플입니다(영상 없음). 프로덕션에는 노출되지 않습니다.
const SAMPLE: FeaturedVideo = {
  id: "sample-1",
  title: "샘플 영상",
  description: "Supabase playlists 테이블에 유튜브 영상 주소를 등록하면 이 자리에 표시됩니다.",
  videoId: null,
  sample: true,
};

type Row = { id: string; title: string; description: string | null; url: string };

const isProd = () => process.env.NODE_ENV === "production";

// 등록된 영상 중 맨 위 한 개만 보여줍니다. (sort_order가 가장 작은 것, 같으면 최신 등록순)
export async function getFeaturedVideo(): Promise<FeaturedVideo | null> {
  "use cache";
  cacheLife("minutes");

  const supabase = getSupabase();
  if (!supabase) return isProd() ? null : SAMPLE;

  const { data, error } = await supabase
    .from("playlists")
    .select("id,title,description,url")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[video] fetch failed", error.message);
    return isProd() ? null : SAMPLE;
  }

  for (const r of (data ?? []) as Row[]) {
    const videoId = parseVideoId(r.url);
    if (videoId) return { id: r.id, title: r.title, description: r.description, videoId };
    console.warn("[video] 주소를 해석할 수 없어 건너뜁니다:", r.title);
  }

  return isProd() ? null : SAMPLE;
}
