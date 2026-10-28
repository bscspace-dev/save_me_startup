"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { won } from "@/lib/format";
import type { Listing, ListingStatus } from "@/lib/listings";

const STATUS: Record<ListingStatus, { label: string; cls: string }> = {
  available: { label: "문의 가능", cls: "bg-br-ink text-white" },
  reserved: { label: "계약 진행 중", cls: "bg-br-accent/20 text-br-accent" },
  closed: { label: "마감", cls: "bg-br-line text-br-mute" },
};

function Score({ label, value }: { label: string; value: number | null }) {
  if (value == null) return null;
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="text-br-mute">{label}</span>
        <span className="font-bold">{value} / 5</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-br-line">
        <motion.div
          className="h-full rounded-full bg-br-ink"
          initial={{ width: 0 }}
          animate={{ width: `${(value / 5) * 100}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 border-b border-br-line py-3 text-sm">
      <dt className="text-br-mute">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}

export function ListingShowcase({ listings }: { listings: Listing[] }) {
  const districts = ["전체", ...Array.from(new Set(listings.map((l) => l.district)))];
  const [district, setDistrict] = useState("전체");
  const [selected, setSelected] = useState<Listing | null>(null);

  const visible = district === "전체" ? listings : listings.filter((l) => l.district === district);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {districts.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDistrict(d)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
              district === d
                ? "border-br-ink bg-br-ink text-white"
                : "border-br-line bg-white text-br-mute hover:border-br-ink/40 hover:text-br-ink"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((l) => (
            <motion.button
              layout
              key={l.id}
              type="button"
              onClick={() => setSelected(l)}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col rounded-2xl border border-br-line bg-white p-7 text-left hover:border-br-ink/40"
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS[l.status].cls}`}>{STATUS[l.status].label}</span>
                {l.sample && <span className="text-xs text-br-mute">샘플</span>}
              </div>
              <p className="mt-5 text-xs font-medium text-br-accent">
                {l.district} {l.locationNote}
              </p>
              <p className="mt-1 font-serif text-xl font-bold leading-snug">{l.title}</p>
              {l.recommended.length > 0 && (
                <p className="mt-3 flex-1 text-sm text-br-mute">추천 업종 · {l.recommended.join(", ")}</p>
              )}
              <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-br-line pt-5 text-sm">
                <div>
                  <dt className="text-br-mute">보증금</dt>
                  <dd className="mt-1 font-bold">{won(l.deposit)}</dd>
                </div>
                <div>
                  <dt className="text-br-mute">월세</dt>
                  <dd className="mt-1 font-bold">{won(l.rent)}</dd>
                </div>
                <div>
                  <dt className="text-br-mute">면적</dt>
                  <dd className="mt-1 font-bold">{l.sizePyeong != null ? `${l.sizePyeong}평` : "문의"}</dd>
                </div>
              </dl>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-6"
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
              className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-br-bg p-8 sm:rounded-3xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS[selected.status].cls}`}>
                    {STATUS[selected.status].label}
                  </span>
                  <p className="mt-4 text-xs font-medium text-br-accent">
                    {selected.district} {selected.locationNote}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl font-black leading-snug">{selected.title}</h3>
                </div>
                <button type="button" aria-label="닫기" onClick={() => setSelected(null)} className="text-3xl leading-none text-br-mute hover:text-br-ink">
                  ×
                </button>
              </div>

              <p className="mt-6 leading-relaxed">{selected.summary}</p>

              <dl className="mt-8 border-t border-br-line">
                <Row label="층 / 면적" value={[selected.floor, selected.sizePyeong != null ? `${selected.sizePyeong}평` : null].filter(Boolean).join(" · ") || null} />
                <Row label="보증금" value={selected.deposit != null ? won(selected.deposit) : null} />
                <Row label="월세" value={selected.rent != null ? won(selected.rent) : null} />
                <Row label="권리금" value={selected.premium != null ? won(selected.premium) : "없음 / 협의"} />
                <Row label="추천 업종" value={selected.recommended.join(", ") || null} />
                <Row label="분석 기준일" value={selected.analyzedAt} />
              </dl>

              {selected.scores.some((s) => s.value != null) && (
                <div className="mt-8">
                  <p className="font-serif text-lg font-bold">입지 분석 점수</p>
                  <div className="mt-4 space-y-4">
                    {selected.scores.map((s) => (
                      <Score key={s.label} {...s} />
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {selected.pros.length > 0 && (
                  <div className="rounded-xl bg-white p-5">
                    <p className="font-bold">장점</p>
                    <ul className="mt-3 space-y-2 text-sm text-br-mute">
                      {selected.pros.map((p) => (
                        <li key={p}>+ {p}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selected.risks.length > 0 && (
                  <div className="rounded-xl bg-white p-5">
                    <p className="font-bold">유의할 점</p>
                    <ul className="mt-3 space-y-2 text-sm text-br-mute">
                      {selected.risks.map((r) => (
                        <li key={r}>– {r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <p className="mt-6 text-xs leading-relaxed text-br-mute">
                분석 점수는 분석 시점의 자료와 현장 확인을 기준으로 한 참고 의견이며 매출과 수익을 보장하지 않습니다. 임대 조건은 변동될 수 있습니다.
              </p>

              <a
                href="#contact"
                onClick={() => setSelected(null)}
                className="mt-6 block rounded-xl bg-br-ink px-6 py-4 text-center text-lg font-bold text-white transition hover:bg-br-ink/90"
              >
                이 매물 분석 문의
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
