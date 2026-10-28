import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "프랜차이즈 전수창업 컨설팅",
  description: "검증된 브랜드의 노하우를 전수받는 프랜차이즈 창업, 브랜드 비교·수익 검증·계약 검토·오픈까지.",
};

const NAV = [
  { href: "#audience", label: "대상" },
  { href: "#problems", label: "고민" },
  { href: "#services", label: "서비스" },
  { href: "#brands", label: "발굴 브랜드" },
  { href: "#videos", label: "영상" },
  { href: "#process", label: "진행 과정" },
  { href: "#faq", label: "FAQ" },
];

export default function FranchiseLayout({ children }: LayoutProps<"/franchise">) {
  return (
    <div className="bg-fd-bg text-fd-text">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-fd-line/60 bg-fd-bg/80 backdrop-blur">
        <div className="px-6">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
          <Link href="/franchise" className="text-lg font-black">
            {SITE.name} <span className="text-fd-accent">Franchise</span>
          </Link>
          <nav className="hidden gap-8 text-sm text-fd-mute md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="transition hover:text-fd-text">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/location" className="hidden text-sm text-fd-mute hover:text-fd-text sm:block">
              상가매물·입지분석 →
            </Link>
            <a href="#contact" className="whitespace-nowrap rounded-full bg-fd-accent px-5 py-2 text-sm font-bold text-fd-bg">
              무료 상담
            </a>
          </div>
        </div>
        </div>
      </header>
      {children}
      <footer className="border-t border-fd-line px-6 py-12 text-sm leading-relaxed text-fd-mute">
        <div className="mx-auto max-w-6xl">
          <p className="font-bold text-fd-text">{SITE.company}</p>
          <p>
            대표 {SITE.ceo} · 사업자등록번호 {SITE.bizNo}
          </p>
          <p>{SITE.address}</p>
          <p>
            {SITE.phone} · {SITE.email}
          </p>
        </div>
      </footer>
    </div>
  );
}
