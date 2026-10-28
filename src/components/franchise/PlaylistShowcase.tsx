"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Playlist } from "@/lib/playlists";

export function PlaylistShowcase({ playlists }: { playlists: Playlist[] }) {
  const [activeId, setActiveId] = useState(playlists[0].id);
  // 재생 시작을 누른 재생목록만 iframe을 불러와 초기 로딩을 가볍게 유지
  const [started, setStarted] = useState<string | null>(null);

  const active = playlists.find((p) => p.id === activeId) ?? playlists[0];
  const playing = started === active.id && active.listId;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <div className="relative aspect-video overflow-hidden rounded-3xl border border-fd-line bg-fd-card">
        {playing ? (
          <iframe
            key={active.id}
            src={`https://www.youtube-nocookie.com/embed/videoseries?list=${active.listId}&autoplay=1&rel=0`}
            title={active.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <AnimatePresence mode="wait">
            <motion.button
              key={active.id}
              type="button"
              disabled={!active.listId}
              onClick={() => setStarted(active.id)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              aria-label={`${active.title} 재생`}
              className="group absolute inset-0 flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-fd-card to-fd-bg p-8 text-center disabled:cursor-default"
            >
              <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-fd-accent text-fd-bg transition group-enabled:group-hover:scale-110 md:size-20">
                <svg viewBox="0 0 24 24" className="ml-1 size-9" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="text-2xl font-black md:text-3xl">{active.title}</span>
              {active.sample && <span className="text-sm text-fd-mute">샘플 (영상 없음)</span>}
            </motion.button>
          </AnimatePresence>
        )}
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {playlists.map((p, i) => {
          const on = p.id === active.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              aria-pressed={on}
              className={`w-64 shrink-0 rounded-2xl border p-5 text-left transition lg:w-auto ${
                on ? "border-fd-accent bg-fd-card" : "border-fd-line hover:border-fd-accent/50"
              }`}
            >
              <span className="text-xs font-bold text-fd-accent">PLAYLIST {String(i + 1).padStart(2, "0")}</span>
              <span className="mt-2 block font-bold leading-snug">{p.title}</span>
              {p.description && <span className="mt-2 block text-sm leading-relaxed text-fd-mute">{p.description}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
