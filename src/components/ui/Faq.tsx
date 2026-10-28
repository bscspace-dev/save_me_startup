"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Item = { q: string; a: string };

export function Faq({
  items,
  itemClass,
  mutedClass,
}: {
  items: Item[];
  itemClass: string;
  mutedClass: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className={`overflow-hidden rounded-2xl border ${itemClass}`}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-medium"
            >
              <span>{it.q}</span>
              <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-2xl leading-none">
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className={`px-6 pb-6 leading-relaxed ${mutedClass}`}>{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
