import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import { TestNotice } from "@/components/ui/TestNotice";
import { SITE } from "@/lib/site";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  variable: "--font-noto-sans",
  weight: ["400", "500", "700", "900"],
  preload: false,
});

const notoSerif = Noto_Serif_KR({
  variable: "--font-noto-serif",
  weight: ["500", "700", "900"],
  preload: false,
});

export const metadata: Metadata = {
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE.description,
  // TODO(정식 오픈 시 해제): 테스트 기간에는 검색엔진 노출을 막습니다. site.ts의 testMode를 false로 바꾸면 풀립니다.
  robots: SITE.testMode ? { index: false, follow: false } : undefined,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSans.variable} ${notoSerif.variable} antialiased`}>
      <body className="min-h-dvh">
        {children}
        <TestNotice />
      </body>
    </html>
  );
}
