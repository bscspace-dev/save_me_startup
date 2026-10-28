import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "신규창업 종합 컨설팅",
  description: "입지 분석, 브랜드 아이덴티티, 인테리어, 마케팅까지 신규창업을 처음부터 함께 설계합니다.",
};

const NAV = [
  { href: "#services", label: "서비스" },
  { href: "#projects", label: "완성 사례" },
  { href: "#listings", label: "분석 매물" },
  { href: "#report", label: "분석 리포트" },
  { href: "#process", label: "프로세스" },
  { href: "#checklist", label: "계약 전 체크" },
  { href: "#faq", label: "FAQ" },
];

export default function LocationLayout({ children }: LayoutProps<"/location">) {
  return (
    <div className="bg-br-bg text-br-ink">
      <header className="fixed inset-x-0 top-0 z-50 bg-br-bg/90 backdrop-blur">
        <div className="px-8">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between border-b border-br-line">
          <Link href="/location" className="font-serif text-xl font-black">
            {SITE.name}
            <span className="ml-2 hidden text-xs font-medium tracking-[0.3em] text-br-accent sm:inline">NEW BUSINESS</span>
          </Link>
          <nav className="hidden gap-8 text-sm font-medium text-br-mute lg:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="transition hover:text-br-ink">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <Link href="/franchise" className="hidden text-sm text-br-mute hover:text-br-ink sm:block">
              프랜차이즈 전수창업 →
            </Link>
            <a href="#contact" className="whitespace-nowrap rounded-md bg-br-ink px-5 py-2.5 text-sm font-bold text-white">
              창업 문의
            </a>
          </div>
        </div>
        </div>
      </header>
      {children}
      <footer className="bg-br-ink px-8 py-16 text-sm leading-relaxed text-white/70">
        <div className="mx-auto max-w-7xl">
          <p className="font-serif text-xl font-bold text-white">{SITE.company}</p>
          <p className="mt-4">
            대표 {SITE.ceo} · 사업자등록번호 {SITE.bizNo}
          </p>
          <p>{SITE.address}</p>
          <p>
            {SITE.phone} · {SITE.email}
          </p>
          <p className="mt-6 text-xs text-white/50">
            입지분석 결과와 컨설팅 내용은 참고 자료이며 매출과 수익을 보장하지 않습니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
