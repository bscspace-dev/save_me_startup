"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function LocationHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden px-8 pb-24 pt-44">
      <motion.div
        aria-hidden
        style={{ y }}
        className="absolute right-[8%] top-28 hidden h-[28rem] w-[22rem] rounded-t-full border border-br-accent/50 lg:block"
      />
      <motion.div
        aria-hidden
        style={{ y }}
        className="absolute right-[14%] top-44 hidden h-[28rem] w-[22rem] rounded-t-full bg-br-ink lg:block"
      />
      <motion.div style={{ opacity: fade }} className="relative mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.2, ease }}
          className="text-xs font-bold text-br-accent"
        >
          NEW BUSINESS CONSULTING
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease }}
          className="mt-8 max-w-3xl font-serif text-5xl font-black leading-[1.2] md:text-7xl"
        >
          입지부터 인테리어,
          <br />
          마케팅까지.
          <br />
          가게의 <span className="text-br-accent">아이덴티티</span>를
          <br />
          만듭니다.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 max-w-xl text-lg leading-relaxed text-br-mute"
        >
          상가 입지 분석, 브랜드 콘셉트, 공간 설계, 오픈 마케팅을 하나의 흐름으로 설계해 처음부터 ‘나다운 가게’를 만들어 드립니다.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <a href="#contact" className="rounded-md bg-br-ink px-8 py-4 font-bold text-white transition hover:bg-br-ink/90">
            창업 문의
          </a>
          <a href="#services" className="rounded-md border border-br-ink/30 px-8 py-4 font-medium transition hover:border-br-ink">
            서비스 보기
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
