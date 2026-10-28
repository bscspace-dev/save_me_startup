import { cacheLife } from "next/cache";
import { getSupabase } from "@/lib/supabase";

export type Playlist = {
  id: string;
  title: string;
  description: string | null;
  listId: string | null; // 유튜브 재생목록 ID (없으면 샘플)
  sample?: boolean;
};

// 개발 환경에서 화면 확인용으로만 쓰는 샘플입니다(영상 없음). 프로덕션에는 노출되지 않습니다.
const SAMPLES: Playlist[] = [
  {
    id: "sample-1",
    title: "샘플 재생목록 A",
    description: "Supabase playlists 테이블에 유튜브 재생목록 주소를 등록하면 이 자리에 표시됩니다.",
    listId: null,
    sample: true,
  },
  {
    id: "sample-2",
    title: "샘플 재생목록 B",
    description: "실제 재생목록으로 교체하세요.",
    listId: null,
    sample: true,
  },
];

// 재생목록 URL 또는 ID에서 list ID만 안전하게 추출
export function parseListId(input: string): string | null {
  const raw = input.trim();
  let id: string | null = null;
  try {
    id = new URL(raw).searchParams.get("list");
  } catch {
    id = raw;
  }
  return id && /^[A-Za-z0-9_-]{10,64}$/.test(id) ? id : null;
}

type Row = { id: string; title: string; description: string | null; url: string };

const isProd = () => process.env.NODE_ENV === "production";

export async function getPlaylists(): Promise<Playlist[]> {
  "use cache";
  cacheLife("minutes");

  const supabase = getSupabase();
  if (!supabase) return isProd() ? [] : SAMPLES;

  const { data, error } = await supabase
    .from("playlists")
    .select("id,title,description,url")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[playlists] fetch failed", error.message);
    return isProd() ? [] : SAMPLES;
  }

  const rows = (data ?? []) as Row[];
  if (rows.length === 0 && !isProd()) return SAMPLES;

  return rows.flatMap((r) => {
    const listId = parseListId(r.url);
    if (!listId) {
      console.warn("[playlists] 주소를 해석할 수 없어 건너뜁니다:", r.title);
      return [];
    }
    return [{ id: r.id, title: r.title, description: r.description, listId }];
  });
}
