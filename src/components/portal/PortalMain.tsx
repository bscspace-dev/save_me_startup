"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { won } from "@/lib/format";
import type { Brand } from "@/lib/brands";
import { CATEGORIES } from "@/lib/categories";
import type { Listing } from "@/lib/listings";
import { Reveal } from "@/components/ui/Reveal";
import { Thumb } from "./Thumb";

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
          <p className="text-xs font-bold tracking-[0.3em] text-pt-gold-deep">PRECISION LOCATION &amp; LOCATION ANALYSIS FOR YOUR SUCCESS</p>
          <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
            대구 <span className="bg-[linear-gradient(transparent_62%,var(--color-pt-gold)_62%)]">상가 · 상권 분석</span> 전문
          </h1>
          <p className="mt-5 text-xl font-bold">실무 중심 <span className="text-pt-gold-deep">상권 입지 컨설팅</span></p>
          <p className="mt-2 text-lg text-pt-mute"><strong className="font-bold text-pt-text">현장 유동인구 · 매출 데이터</strong> 기반 <span className="text-pt-gold-deep">정밀 분석</span></p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/listings"
              className="w-full rounded-full bg-pt-accent px-8 py-3.5 font-bold text-white shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:brightness-105 sm:w-auto"
            >
              매물 보기
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

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center">
            <p className="text-xs font-bold tracking-[0.3em] text-pt-gold-deep">CATEGORY</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">업종별 <span className="text-pt-gold-deep">매물</span></h2>
            <p className="mt-3 text-pt-mute">원하는 업종의 양도양수 매물을 확인해보세요.</p>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {CATEGORIES.map((c, i) => (
              <Link
                key={c.label}
                href={`/listings?cat=${i}`}
                className="overflow-hidden rounded-2xl border border-pt-line bg-pt-card text-left transition hover:-translate-y-1 hover:border-pt-gold"
              >
                <div className={`aspect-[4/3] bg-gradient-to-br ${c.tone}`} />
                <p className="px-4 py-3.5 text-center text-sm font-bold">{c.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {brands.length > 0 && (
        <section id="picks" className="border-y border-pt-line bg-pt-soft px-6 py-20">
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
                    <p className="text-lg font-black text-pt-gold-deep">{won(b.investTotal)}</p>
                    <p className="mt-1 font-bold">{b.name}</p>
                    <p className="mt-1 text-sm text-pt-mute">{b.tagline}</p>
                    {b.stores != null && <p className="mt-3 text-xs text-pt-mute">가맹점 {b.stores}개</p>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="market" className="scroll-mt-16 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center">
            <p className="text-xs font-bold tracking-[0.3em] text-pt-gold-deep">NEW LISTINGS</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              <span className="text-pt-gold-deep">신규 등록</span> 매물
            </h2>
            <p className="mt-3 text-pt-mute">최근 등록된 매물을 확인해보세요.</p>
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
