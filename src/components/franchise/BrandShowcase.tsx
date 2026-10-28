"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Brand } from "@/lib/brands";
import { won } from "@/lib/format";

function Row({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 border-b border-fd-line py-3 text-sm">
      <dt className="text-fd-mute">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}

export function BrandShowcase({ brands }: { brands: Brand[] }) {
  const categories = ["전체", ...Array.from(new Set(brands.map((b) => b.category)))];
  const [category, setCategory] = useState("전체");
  const [selected, setSelected] = useState<Brand | null>(null);

  const visible = category === "전체" ? brands : brands.filter((b) => b.category === category);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
              category === c
                ? "border-fd-accent bg-fd-accent text-fd-bg"
                : "border-fd-line text-fd-mute hover:border-fd-accent/60 hover:text-fd-text"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((b) => (
            <motion.button
              layout
              key={b.id}
              type="button"
              onClick={() => setSelected(b)}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col rounded-3xl border border-fd-line bg-fd-card p-7 text-left hover:border-fd-accent/60"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-fd-accent/15 px-3 py-1 text-xs font-bold text-fd-accent">{b.category}</span>
                {b.sample && <span className="text-xs text-fd-mute">샘플</span>}
              </div>
              <p className="mt-5 text-2xl font-black">{b.name}</p>
              <p className="mt-2 flex-1 leading-relaxed text-fd-mute">{b.tagline}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-fd-line pt-5 text-sm">
                <div>
                  <dt className="text-fd-mute">총 창업비용</dt>
                  <dd className="mt-1 font-bold">{won(b.investTotal)}</dd>
                </div>
                <div>
                  <dt className="text-fd-mute">가맹점 수</dt>
                  <dd className="mt-1 font-bold">{b.stores != null ? `${b.stores.toLocaleString("ko-KR")}개` : "문의"}</dd>
                </div>
              </dl>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selected.name}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-fd-line bg-fd-card p-8 sm:rounded-3xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="rounded-full bg-fd-accent/15 px-3 py-1 text-xs font-bold text-fd-accent">{selected.category}</span>
                  <h3 className="mt-4 text-3xl font-black">{selected.name}</h3>
                  <p className="mt-2 text-fd-mute">{selected.tagline}</p>
                </div>
                <button type="button" aria-label="닫기" onClick={() => setSelected(null)} className="text-3xl leading-none text-fd-mute hover:text-fd-text">
                  ×
                </button>
              </div>

              <p className="mt-6 leading-relaxed">{selected.summary}</p>

              {selected.highlights.length > 0 && (
                <div className="mt-8">
                  <p className="font-bold text-fd-accent">추천 포인트</p>
                  <ul className="mt-3 space-y-2">
                    {selected.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span aria-hidden className="text-fd-accent">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <dl className="mt-8 border-t border-fd-line">
                <Row label="총 창업비용" value={selected.investTotal != null ? won(selected.investTotal) : null} />
                <Row label="가맹점 수" value={selected.stores != null ? `${selected.stores.toLocaleString("ko-KR")}개` : null} />
                <Row label="로열티" value={selected.royalty} />
                <Row label="교육" value={selected.training} />
              </dl>

              {selected.cautions.length > 0 && (
                <div className="mt-8 rounded-2xl bg-fd-bg p-5">
                  <p className="font-bold">계약 전 확인할 점</p>
                  <ul className="mt-3 space-y-2 text-sm text-fd-mute">
                    {selected.cautions.map((c) => (
                      <li key={c}>· {c}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="mt-6 text-xs leading-relaxed text-fd-mute/80">
                표기된 비용과 조건은 상담 시점 기준이며 변동될 수 있습니다. 계약 전 반드시 해당 가맹본부의 정보공개서를 확인하세요.
              </p>

              <a
                href="#contact"
                onClick={() => setSelected(null)}
                className="mt-6 block rounded-xl bg-fd-accent px-6 py-4 text-center text-lg font-bold text-fd-bg transition hover:brightness-110"
              >
                이 브랜드 상담하기
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
