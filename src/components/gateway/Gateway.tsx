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
        <Link
          href="/"
          aria-label="메인페이지로 가기"
          className="pointer-events-auto rounded-full bg-white px-5 py-2 text-sm font-bold tracking-wide text-fd-bg shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          메인페이지로 가기 <span aria-hidden>→</span>
        </Link>
      </motion.div>

      {/* 상단 고정 문구 (링크 없음: 클릭해도 아래 영역으로 이동하지 않음, 배경색에 맞춰 글자색이 반전됨) */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease }}
        className="absolute inset-x-0 top-20 z-10 cursor-default select-none px-6 text-center text-2xl font-black leading-snug text-white mix-blend-difference md:top-24 md:text-4xl"
      >
        {SITE.name}의
        <br className="md:hidden" /> 맞춤 컨설팅과 함께하세요!
      </motion.p>

      {/* 예비 창업자 */}
      <Link
        href="/knowhow"
        className="group relative flex min-h-[50dvh] flex-1 items-center justify-center overflow-hidden bg-fd-bg px-8 pb-24 pt-52 md:pt-44 text-fd-text transition-[flex-grow] duration-700 ease-out md:min-h-dvh md:hover:flex-[1.4]"
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease }}
          className="relative max-w-md"
        >
          <p className="mb-4 text-sm font-bold tracking-widest text-fd-accent">KNOW-HOW</p>
          <h2 className="text-3xl font-black leading-tight md:text-4xl">
            배우고 시작하면,
            <br />
            다릅니다
          </h2>
          <p className="mt-5 text-lg text-fd-mute">전수창업, 필요한 기술부터 노하우까지 모두 배웁니다</p>
          <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-fd-accent px-6 py-3 font-bold text-fd-bg transition-transform group-hover:translate-x-1">
            프랜차이즈 전수창업 <span aria-hidden>→</span>
          </span>
        </motion.div>
      </Link>

      {/* 가맹본부 */}
      <Link
        href="/identity"
        className="group relative flex min-h-[50dvh] flex-1 items-center justify-center overflow-hidden bg-br-bg px-8 pb-24 pt-24 md:pt-44 text-br-ink transition-[flex-grow] duration-700 ease-out md:min-h-dvh md:hover:flex-[1.4]"
      >
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease }}
          className="relative max-w-md"
        >
          <p className="mb-4 text-sm font-bold tracking-widest text-br-accent">IDENTITY</p>
          <h2 className="font-serif text-3xl font-black leading-tight md:text-4xl">
            내 가게의 시작,
            <br />
            나로부터
          </h2>
          <p className="mt-5 text-lg text-br-mute">신규창업, 나다운 가게 처음이 중요합니다</p>
          <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-br-ink px-6 py-3 font-bold text-white transition-transform group-hover:translate-x-1">
            신규창업 종합 컨설팅 <span aria-hidden>→</span>
          </span>
        </motion.div>
      </Link>
    </main>
  );
}
