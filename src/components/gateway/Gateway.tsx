"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { SITE } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Gateway() {
  return (
    <main className="relative flex min-h-dvh flex-col md:flex-row">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease }}
        className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center pt-6"
      >
        <span className="rounded-full bg-white px-5 py-2 text-sm font-bold tracking-wide text-fd-bg shadow-lg">
          {SITE.name}
        </span>
      </motion.div>

      {/* 예비 창업자 */}
      <Link
        href="/franchise"
        className="group relative flex min-h-[50dvh] flex-1 items-center justify-center overflow-hidden bg-fd-bg px-8 py-24 text-fd-text transition-[flex-grow] duration-700 ease-out md:min-h-dvh md:hover:flex-[1.4]"
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease }}
          className="relative max-w-md"
        >
          <p className="mb-4 text-sm font-bold tracking-widest text-fd-accent">FRANCHISE</p>
          <h2 className="text-4xl font-black leading-tight md:text-5xl">
            혼자 시작하기
            <br />
            막막하다면?
          </h2>
          <p className="mt-5 text-lg text-fd-mute">프랜차이즈 전수창업, 브랜드 비교부터 계약, 오픈까지 함께합니다</p>
          <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-fd-accent px-6 py-3 font-bold text-fd-bg transition-transform group-hover:translate-x-1">
            프랜차이즈 전수창업 <span aria-hidden>→</span>
          </span>
        </motion.div>
      </Link>

      {/* 가맹본부 */}
      <Link
        href="/location"
        className="group relative flex min-h-[50dvh] flex-1 items-center justify-center overflow-hidden bg-br-bg px-8 py-24 text-br-ink transition-[flex-grow] duration-700 ease-out md:min-h-dvh md:hover:flex-[1.4]"
      >
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease }}
          className="relative max-w-md"
        >
          <p className="mb-4 text-sm font-bold tracking-widest text-br-accent">NEW BUSINESS</p>
          <h2 className="font-serif text-4xl font-black leading-tight md:text-5xl">
            내 가게의 시작,
            <br />
            아이덴티티부터
          </h2>
          <p className="mt-5 text-lg text-br-mute">입지 분석부터 인테리어, 마케팅까지 나다운 가게를 처음부터 설계합니다</p>
          <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-br-ink px-6 py-3 font-bold text-white transition-transform group-hover:translate-x-1">
            신규창업 종합 컨설팅 <span aria-hidden>→</span>
          </span>
        </motion.div>
      </Link>
    </main>
  );
}
