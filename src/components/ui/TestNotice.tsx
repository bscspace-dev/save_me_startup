"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

const SEEN_KEY = "test-notice-seen";

// 테스트 기간 안내 팝업. 사이트 접속 시 가장 먼저 뜨고, 확인하면 이번 방문 동안은 다시 뜨지 않습니다.
export function TestNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!SITE.testMode) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    if (!seen) setOpen(true);
  }, []);

  const close = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="test-notice-title"
            initial={{ y: 20, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-sm rounded-3xl bg-white p-8 text-center text-neutral-900 shadow-2xl"
          >
            <span className="inline-block rounded-full bg-neutral-900 px-3 py-1 text-xs font-bold tracking-widest text-white">TEST</span>
            <h2 id="test-notice-title" className="mt-4 text-2xl font-black">
              현재 테스트 페이지입니다
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              이 사이트는 개발·테스트 중입니다.
              <br />
              표시된 정보와 매물은 실제와 다를 수 있으며,
              <br />
              문의 접수는 현재 중단되어 있습니다.
            </p>
            <button
              type="button"
              onClick={close}
              autoFocus
              className="mt-7 w-full rounded-full bg-neutral-900 px-6 py-3.5 font-bold text-white transition hover:bg-neutral-700"
            >
              확인
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
