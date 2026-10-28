export const CATEGORIES = [
  { label: "프랜차이즈 카페", keys: ["카페", "음료", "디저트"], tone: "from-pt-gold/25 to-pt-card" },
  { label: "베이커리 · 디저트", keys: ["베이커리", "제과", "빵", "디저트"], tone: "from-pt-gold/40 to-pt-card" },
  { label: "음식점 · 외식", keys: ["음식", "외식", "한식", "주점", "치킨", "분식"], tone: "from-stone-300/50 to-pt-card" },
  { label: "배달전문점", keys: ["배달"], tone: "from-pt-gold/20 to-pt-card" },
] as const;

export const hit = (text: string, keys: readonly string[]) => keys.some((k) => text.includes(k));
