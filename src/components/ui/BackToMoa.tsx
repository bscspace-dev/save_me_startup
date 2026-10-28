import Link from "next/link";
import { SITE } from "@/lib/site";

const THEME = {
  franchise: "border-fd-line bg-fd-card/90 text-fd-text hover:border-fd-accent",
  location: "border-br-line bg-br-card/95 text-br-ink hover:border-br-ink/40",
} as const;

// 프랜차이즈·신규창업 페이지에서 메인(구해줘창업 Moa)으로 돌아가는 플로팅 버튼
export function BackToMoa({ theme }: { theme: keyof typeof THEME }) {
  return (
    <Link
      href="/"
      aria-label={`${SITE.name} Moa 메인으로 돌아가기`}
      className={`fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold shadow-lg backdrop-blur transition hover:-translate-y-0.5 ${THEME[theme]}`}
    >
      <span aria-hidden>←</span>
      {SITE.name} Moa
    </Link>
  );
}
