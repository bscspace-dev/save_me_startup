"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, hit } from "@/lib/categories";
import { won } from "@/lib/format";
import type { Listing } from "@/lib/listings";
import { Thumb } from "./Thumb";

function Row({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 border-b border-pt-line py-3 text-sm">
      <dt className="text-pt-mute">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}

export function ListingBoard({ listings }: { listings: Listing[] }) {
  const params = useSearchParams();
  const initialCat = params.get("cat");
  const initialId = params.get("id");

  const [catIdx, setCatIdx] = useState<number | null>(
    initialCat != null && CATEGORIES[Number(initialCat)] ? Number(initialCat) : null,
  );
  const [selected, setSelected] = useState<Listing | null>(listings.find((l) => l.id === initialId) ?? null);
  const [index, setIndex] = useState(0);
  const images = selected?.images ?? [];

  const visible = useMemo(() => {
    if (catIdx == null) return listings;
    const keys = CATEGORIES[catIdx].keys;
    return listings.filter((l) => hit([...l.recommended, l.title].join(" "), keys));
  }, [listings, catIdx]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      const n = selected.images.length;
      if (n > 1 && e.key === "ArrowRight") setIndex((i) => (i + 1) % n);
      if (n > 1 && e.key === "ArrowLeft") setIndex((i) => (i - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const tab = (active: boolean) =>
    `rounded-full border px-5 py-2 text-sm font-medium transition ${
      active ? "border-pt-accent bg-pt-accent text-white" : "border-pt-line bg-pt-card text-pt-mute hover:border-pt-gold hover:text-pt-text"
    }`;

  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-xs font-bold tracking-[0.3em] text-pt-gold-deep">LISTINGS</p>
      <h1 className="mt-3 text-3xl font-black md:text-4xl">
        등록된 <span className="text-pt-gold-deep">매물</span>
      </h1>
      <p className="mt-3 text-pt-mute">원하는 업종을 골라 매물을 확인해보세요.</p>

      <div className="mt-8 flex flex-wrap gap-2">
        <button type="button" onClick={() => setCatIdx(null)} className={tab(catIdx == null)}>
          전체
        </button>
        {CATEGORIES.map((c, i) => (
          <button key={c.label} type="button" onClick={() => setCatIdx(i)} className={tab(catIdx === i)}>
            {c.label}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-pt-mute">{visible.length}건의 매물</p>

      {visible.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-pt-line bg-pt-card p-10 text-center text-pt-mute">
          이 업종으로 공개된 매물이 아직 없습니다. 비공개 매물은{" "}
          <Link href="/#quick" className="font-bold text-pt-gold-deep underline underline-offset-4">
            간편상담
          </Link>
          으로 문의해 주세요.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((l) => (
            <motion.button
              key={l.id}
              type="button"
              onClick={() => {
                setIndex(0);
                setSelected(l);
              }}
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-2xl border border-pt-line bg-pt-card text-left"
            >
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
            </motion.button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-pt-bg sm:rounded-3xl"
            >
              <div className="relative aspect-[4/3] bg-pt-soft sm:aspect-[16/10]">
                {images.length > 0 ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Image src={images[index]} alt={`${selected.title} ${index + 1}`} fill sizes="576px" className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-pt-gold/20 to-pt-card text-sm text-pt-mute">
                    등록된 매물 사진이 없습니다
                  </div>
                )}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="이전 사진"
                      onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 size-10 -translate-y-1/2 rounded-full bg-white/85 text-xl"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      aria-label="다음 사진"
                      onClick={() => setIndex((i) => (i + 1) % images.length)}
                      className="absolute right-3 top-1/2 size-10 -translate-y-1/2 rounded-full bg-white/85 text-xl"
                    >
                      ›
                    </button>
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1 text-xs text-white">
                      {index + 1} / {images.length}
                    </span>
                  </>
                )}
                <button
                  type="button"
                  aria-label="닫기"
                  onClick={() => setSelected(null)}
                  className="absolute right-3 top-3 size-10 rounded-full bg-white/85 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto px-8 pt-4">
                  {images.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      aria-label={`${i + 1}번 사진 보기`}
                      onClick={() => setIndex(i)}
                      className={`relative size-16 shrink-0 overflow-hidden rounded-lg border-2 ${i === index ? "border-pt-accent" : "border-transparent opacity-70"}`}
                    >
                      <Image src={src} alt="" fill sizes="64px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="p-8">
                <p className="text-xs font-medium text-pt-gold-deep">
                  대구 {selected.district} {selected.locationNote}
                </p>
                <h2 className="mt-1 text-2xl font-black leading-snug">{selected.title}</h2>

                <p className="mt-5 leading-relaxed">{selected.summary}</p>

                <dl className="mt-6 border-t border-pt-line">
                  <Row
                    label="층 / 면적"
                    value={[selected.floor, selected.sizePyeong != null ? `${selected.sizePyeong}평` : null].filter(Boolean).join(" · ") || null}
                  />
                  <Row label="보증금" value={selected.deposit != null ? won(selected.deposit) : null} />
                  <Row label="월세" value={selected.rent != null ? won(selected.rent) : null} />
                  <Row label="권리금" value={selected.premium != null ? won(selected.premium) : "없음 / 협의"} />
                  <Row label="추천 업종" value={selected.recommended.join(", ") || null} />
                </dl>

                {selected.notes && (
                  <div className="mt-6 rounded-xl border border-pt-gold/60 bg-pt-soft p-5">
                    <p className="text-sm font-black text-pt-gold-deep">특이사항</p>
                    <p className="mt-2 whitespace-pre-line text-sm leading-relaxed">{selected.notes}</p>
                  </div>
                )}

                <Link
                  href="/#quick"
                  className="mt-7 block rounded-xl bg-pt-accent px-6 py-4 text-center text-lg font-bold text-white transition hover:brightness-110"
                >
                  이 매물 문의하기
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
