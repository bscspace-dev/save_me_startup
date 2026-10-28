"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects";

function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex size-full items-center justify-center bg-gradient-to-br from-br-ink to-br-ink/70 p-6 text-center font-serif text-lg text-white/70">
      {title}
    </div>
  );
}

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const categories = ["전체", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [category, setCategory] = useState("전체");
  const [selected, setSelected] = useState<Project | null>(null);
  const [index, setIndex] = useState(0);

  const visible = category === "전체" ? projects : projects.filter((p) => p.category === category);
  const images = selected?.images ?? [];

  const open = (p: Project) => {
    setIndex(0);
    setSelected(p);
  };

  useEffect(() => {
    if (!selected) return;
    const count = selected.images.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (count > 1 && e.key === "ArrowRight") setIndex((i) => (i + 1) % count);
      if (count > 1 && e.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count);
    };
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
                ? "border-br-ink bg-br-ink text-white"
                : "border-br-line bg-white text-br-mute hover:border-br-ink/40 hover:text-br-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.button
              layout
              key={p.id}
              type="button"
              onClick={() => open(p)}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="group text-left"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-br-line">
                {p.images[0] ? (
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <Placeholder title={p.title} />
                )}
                {p.images.length > 1 && (
                  <span className="absolute right-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white">
                    {p.images.length}장
                  </span>
                )}
                {p.sample && <span className="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-xs">샘플</span>}
              </div>
              <p className="mt-4 text-xs font-medium text-br-accent">
                {[p.category, p.district].filter(Boolean).join(" · ")}
              </p>
              <p className="mt-1 font-serif text-xl font-bold">{p.title}</p>
              {p.services.length > 0 && <p className="mt-2 text-sm text-br-mute">{p.services.join(" · ")}</p>}
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/75 p-0 sm:items-center sm:p-6"
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
              className="max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-br-bg sm:rounded-3xl"
            >
              <div className="relative aspect-[4/3] bg-br-line sm:aspect-[16/10]">
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
                      <Image src={images[index]} alt={`${selected.title} ${index + 1}`} fill sizes="768px" className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <Placeholder title={selected.title} />
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

              <div className="p-8">
                <p className="text-xs font-medium text-br-accent">
                  {[selected.category, selected.district, selected.completedAt].filter(Boolean).join(" · ")}
                </p>
                <h3 className="mt-1 font-serif text-2xl font-black">{selected.title}</h3>
                {selected.services.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selected.services.map((s) => (
                      <span key={s} className="rounded-full border border-br-line bg-white px-3 py-1 text-xs text-br-mute">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
                <p className="mt-5 leading-relaxed">{selected.summary}</p>
                <a
                  href="#contact"
                  onClick={() => setSelected(null)}
                  className="mt-8 block rounded-xl bg-br-ink px-6 py-4 text-center text-lg font-bold text-white transition hover:bg-br-ink/90"
                >
                  이런 공간, 상담받기
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
