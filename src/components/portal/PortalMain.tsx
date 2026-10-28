"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { won } from "@/lib/format";
import type { Brand } from "@/lib/brands";
import type { Listing } from "@/lib/listings";
import { Reveal } from "@/components/ui/Reveal";
import { Thumb } from "./Thumb";

const STARTUPS = [
  {
    no: "01",
    href: "/franchise",
    title: "프랜차이즈 전수창업",
    desc: "검증된 브랜드의 노하우를 전수 받아 시작합니다. 브랜드 시작부터 오픈까지 함께합니다.",
    tags: ["창업상담", "브랜드 노하우", "오픈지원"],
  },
  {
    no: "02",
    href: "/location",
    title: "신규창업 컨설팅",
    desc: "나만의 가게를 처음부터 설계합니다. 입지 분석부터 인테리어, 마케팅까지 함께합니다.",
    tags: ["입지 분석", "브랜드 아이덴티티", "인테리어", "마케팅"],
  },
];

export function PortalMain({ listings, brands }: { listings: Listing[]; brands: Brand[] }) {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-16 pt-36 md:pt-44">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-pt-tint)_0%,var(--color-pt-bg)_70%)]" />
        {/* 점 격자 + 레이더 링: 상권 분석 느낌 */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 [background-image:radial-gradient(color-mix(in_srgb,var(--color-pt-gold)_55%,transparent)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
        <div aria-hidden className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2">
          {[360, 560, 780].map((s, i) => (
            <motion.span
              key={s}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pt-gold/50"
              style={{ width: s, height: s }}
              animate={{ opacity: [0.25, 0.8, 0.25] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-3xl text-center"
        >
          <p className="text-xs font-bold tracking-[0.3em] text-pt-gold-deep">STRATEGIC BUSINESS &amp; STARTUP CONSULTING</p>
          <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
            대구 <span className="bg-[linear-gradient(transparent_62%,var(--color-pt-gold)_62%)]">상가 분석</span>부터
            <br />
            창업 전략까지
          </h1>
          <p className="mt-6 text-xl font-bold">
            현장을 아는 전문가의 <span className="text-pt-gold-deep">실무 중심 창업 컨설팅</span>
          </p>
          <p className="mx-auto mt-3 max-w-xl text-pt-mute">
            상가 입지 분석부터 브랜드 발굴, 프랜차이즈·전수창업까지
            <br className="hidden sm:block" /> 현실적인 창업 방향을 제시합니다.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/start"
              className="w-full rounded-full bg-pt-accent px-8 py-3.5 font-bold text-white shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:brightness-105 sm:w-auto"
            >
              컨설팅 안내
            </Link>
            <a
              href="#quick"
              className="w-full rounded-full border border-pt-accent/30 bg-pt-card px-8 py-3.5 font-bold text-pt-accent transition hover:-translate-y-0.5 hover:bg-pt-accent/5 sm:w-auto"
            >
              무료 상담 신청
            </a>
          </div>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4"
        >
          {[
            ["유동인구", "시간대·요일별 보행 흐름"],
            ["배후 수요", "주거·직장 세대와 소비 성향"],
            ["경쟁 현황", "동일 업종 점포와 폐업 추이"],
            ["접근성·가시성", "교통, 주차, 간판 노출과 동선"],
          ].map(([title, desc]) => (
            <li key={title} className="rounded-2xl border border-pt-line bg-pt-card/90 p-5 text-left shadow-sm backdrop-blur">
              <p className="flex items-center gap-2 font-black">
                <span aria-hidden className="size-2 rounded-full bg-pt-gold" />
                {title}
              </p>
              <p className="mt-2 text-sm text-pt-mute">{desc}</p>
            </li>
          ))}
        </motion.ul>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center">
            <p className="text-xs font-bold tracking-[0.3em] text-pt-gold-deep">CATEGORY</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              창업별 <span className="text-pt-gold-deep">카테고리</span>
            </h2>
            <p className="mt-3 text-pt-mute">나에게 맞는 창업 방식을 선택해 보세요.</p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {STARTUPS.map((s, i) => (
              <Reveal key={s.href} delay={i * 0.08}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col rounded-3xl border border-pt-line bg-pt-card p-8 transition hover:-translate-y-1 hover:border-pt-gold md:p-10"
                >
                  <p className="text-sm font-bold text-pt-gold-deep">{s.no}</p>
                  <h3 className="mt-3 text-2xl font-black md:text-3xl">{s.title}</h3>
                  <p className="mt-3 text-pt-mute">{s.desc}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <li key={t} className="rounded-full bg-pt-soft px-3.5 py-1.5 text-sm font-medium">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-2 border-t border-pt-line pt-5 font-bold transition group-hover:text-pt-gold-deep">
                    자세히 보기 <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {brands.length > 0 && (
        <section id="picks" className="px-6 py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="text-center">
              <p className="text-xs font-bold tracking-[0.3em] text-pt-gold-deep">PICK</p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">구해줘창업 <span className="text-pt-gold-deep">PICK</span></h2>
              <p className="mt-3 text-pt-mute">창업을 고민하는 당신에게, <span className="text-pt-gold-deep">구해줘창업이 제안하는 곳</span></p>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {brands.slice(0, 4).map((b) => (
                <article key={b.id} className="overflow-hidden rounded-2xl border border-pt-line bg-pt-card">
                  <Thumb label={b.category} tone="from-pt-gold/15 to-pt-card" badge="추천" />
                  <div className="p-5">
                    <p className="text-lg font-black">{b.name}</p>
                    <p className="mt-1 text-sm text-pt-mute">{b.tagline}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="market" className="scroll-mt-16 px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center">
            <p className="text-xs font-bold tracking-[0.3em] text-pt-gold-deep">LISTINGS</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              등록된 <span className="text-pt-gold-deep">상가 매물</span>
            </h2>
            <p className="mt-3 text-pt-mute">구해줘창업에 등록된 상가를 확인해보세요.</p>
          </Reveal>

          {listings.length === 0 ? (
            <p className="mt-14 rounded-2xl border border-pt-line bg-pt-card p-10 text-center text-pt-mute">
              현재 공개된 매물이 없습니다. 아래 간편상담으로 비공개 매물을 문의해 보세요.
            </p>
          ) : (
            <>
              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {listings.slice(0, 8).map((l) => (
                  <motion.div key={l.id} whileHover={{ y: -6 }}>
                    <Link href={`/listings?id=${l.id}`} className="block overflow-hidden rounded-2xl border border-pt-line bg-pt-card">
                      <Thumb
                        label={l.recommended.join(" · ") || "상가 매물"}
                        tone="from-pt-gold/15 to-pt-card"
                        image={l.images[0]}
                        count={l.images.length}
                        badge={l.status === "reserved" ? "계약 진행 중" : "문의 가능"}
                      />
                      <div className="p-5">
                        <p className="text-lg font-black text-pt-gold-deep">
                          {l.premium != null ? `권리금 ${won(l.premium)}` : `보증금 ${won(l.deposit)}`}
                        </p>
                        <p className="mt-1 line-clamp-2 font-bold leading-snug">{l.title}</p>
                        <p className="mt-2 text-sm text-pt-mute">
                          대구 {l.district} {l.locationNote}
                        </p>
                        <p className="mt-1 text-xs text-pt-mute">
                          {[l.floor, l.sizePyeong != null ? `${l.sizePyeong}평` : null, l.rent != null ? `월세 ${won(l.rent)}` : null]
                            .filter(Boolean)
                            .join(" | ")}
                        </p>
                        {l.sample && <p className="mt-2 text-xs text-pt-mute/70">샘플 데이터</p>}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link href="/listings" className="inline-block rounded-full border border-pt-accent/30 bg-pt-card px-8 py-3 font-bold transition hover:bg-pt-accent/5">
                  전체 매물 보기 →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
