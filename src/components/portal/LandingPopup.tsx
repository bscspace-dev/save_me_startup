"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

const HIDE_KEY = "landing-popup-hidden-until";

export function LandingPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let hidden = false;
    try {
      hidden = Number(localStorage.getItem(HIDE_KEY) ?? 0) > Date.now();
    } catch {}
    if (hidden) return;
    const t = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const hideToday = () => {
    try {
      localStorage.setItem(HIDE_KEY, String(Date.now() + 24 * 60 * 60 * 1000));
    } catch {}
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          aria-label="창업 상담 안내"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 16, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-xs overflow-hidden rounded-2xl border border-pt-line bg-pt-card text-pt-text shadow-xl shadow-black/10"
        >
          <Link href="/start" className="group block p-5">
            <p className="text-xs font-bold tracking-widest text-pt-gold-deep">{SITE.name}</p>
            <p className="mt-2 text-xl font-black leading-snug">
              혼자 시작하기 막막하다면?
            </p>
            <p className="mt-2 text-sm text-pt-mute">브랜드 비교부터 입지 분석, 계약, 오픈까지 창업 컨설팅</p>
            <span className="mt-4 flex items-center justify-center gap-2 rounded-full bg-pt-accent px-5 py-2.5 text-sm font-bold text-white transition group-hover:brightness-110">
              창업 컨설팅 자세히 보기 <span aria-hidden>→</span>
            </span>
          </Link>
          <div className="flex border-t border-pt-line text-xs text-pt-mute">
            <button type="button" onClick={hideToday} className="flex-1 px-3 py-2.5 transition hover:text-pt-text">
              오늘 하루 보지 않기
            </button>
            <button type="button" onClick={() => setOpen(false)} className="flex-1 border-l border-pt-line px-3 py-2.5 transition hover:text-pt-text">
              닫기
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
