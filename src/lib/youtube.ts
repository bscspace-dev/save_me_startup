// 영상 URL(watch, youtu.be, embed, shorts) 또는 11자리 ID에서 영상 ID만 안전하게 추출
export function parseVideoId(input: string): string | null {
  const raw = input.trim();
  let id: string | null = null;
  try {
    const url = new URL(raw);
    if (url.hostname === "youtu.be") {
      id = url.pathname.split("/")[1] ?? null;
    } else {
      id = url.searchParams.get("v") ?? url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1] ?? null;
    }
  } catch {
    id = raw;
  }
  return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
}
