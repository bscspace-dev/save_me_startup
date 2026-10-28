"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;
const BREAK = "<br>";
const words = ["혼자", "시작하지", "마세요.", BREAK, "저희와", "함께하세요."];

export function FranchiseHero() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden px-6 pt-16">
      <div className="relative mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 text-sm font-bold tracking-widest text-fd-accent"
        >
          자영업자 · 예비 창업자를 위한 전수창업 컨설팅
        </motion.p>
        <h1 className="text-4xl font-black leading-[1.15] md:text-6xl">
          {words.map((w, i) =>
            w === BREAK ? (
              <br key={i} />
            ) : (
            <motion.span
              key={i}
              className="mr-[0.25em] inline-block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.07, ease }}
            >
              {w}
            </motion.span>
            ),
          )}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-fd-mute md:text-xl"
        >
          운영 중인 가게를 키우고 싶은 사장님도, 처음 창업을 준비하는 분도. 검증된 브랜드의 노하우를 전수받아 시작할 수 있도록 구해줘창업이 함께합니다.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a href="#contact" className="rounded-full bg-fd-accent px-8 py-4 text-lg font-bold text-fd-bg transition hover:brightness-110">
            무료 창업 상담
          </a>
          <a href="#concept" className="rounded-full border border-fd-mute/40 px-8 py-4 text-lg font-medium transition hover:border-fd-accent">
            전수창업 알아보기
          </a>
        </motion.div>
      </div>
    </section>
  );
}
