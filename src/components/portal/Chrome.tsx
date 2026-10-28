import Link from "next/link";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/listings", label: "매물 보기" },
  { href: "/#picks", label: "추천 브랜드" },
  { href: "/#quick", label: "매물 의뢰" },
  { href: "/about", label: "회사소개" },
];

export function PortalHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-pt-line/60 bg-pt-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-lg font-black">
            {SITE.name} <span className="text-pt-gold-deep">Moa</span>
          </Link>
          <nav className="hidden gap-7 text-sm text-pt-mute md:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="transition hover:text-pt-text">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/start" className="hidden text-sm text-pt-mute hover:text-pt-text sm:block">
            창업 컨설팅 →
          </Link>
          <a href={`tel:${SITE.phone}`} className="whitespace-nowrap rounded-full bg-pt-accent px-5 py-2 text-sm font-bold text-white">
            {SITE.phone}
          </a>
        </div>
      </div>
    </header>
  );
}

export function PortalFooter() {
  return (
    <footer className="border-t border-pt-line px-6 py-12 text-sm leading-relaxed text-pt-mute">
      <div className="mx-auto max-w-6xl">
        <p className="font-bold text-pt-text">{SITE.company}</p>
        <p>
          대표 {SITE.ceo} · 사업자등록번호 {SITE.bizNo}
        </p>
        <p>{SITE.address}</p>
        <p>
          {SITE.phone} · {SITE.email}
        </p>
        <p className="mt-4 text-xs">
          게시된 매물·브랜드 정보는 참고용이며 매출과 수익을 보장하지 않습니다. 계약 전 반드시 현장과 서류를 직접 확인하세요.
        </p>
      </div>
    </footer>
  );
}
