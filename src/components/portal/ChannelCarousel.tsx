"use client";

import Image from "next/image";
import { useState } from "react";

export type ChannelItem = { title: string; videoId: string | null };

// 가운데 영상은 크게, 양옆 영상은 흐리고 작게 보이는 캐러셀. 가운데 영상을 누르면 그 자리에서 재생됩니다.
export function ChannelCarousel({ items }: { items: ChannelItem[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState<number | null>(null);
  const last = items.length - 1;

  const go = (i: number) => {
    setPlaying(null);
    setIndex(Math.min(Math.max(i, 0), last));
  };

  return (
    <div>
      <div className="relative overflow-hidden py-4">
        <div
          className="flex gap-6 transition-transform duration-500 ease-out [--w:78] md:[--w:56]"
          style={{
            transform: `translateX(calc((100% - var(--w) * 1%) / 2 - ${index} * (var(--w) * 1% + 1.5rem)))`,
          }}
        >
          {items.map((it, i) => {
            const active = i === index;
            return (
              <div
                key={i}
                className={`relative aspect-video shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-pt-gold/40 to-pt-tint shadow-lg transition duration-500 ${
                  active ? "scale-100 opacity-100" : "scale-90 opacity-50"
                }`}
                style={{ width: "calc(var(--w) * 1%)" }}
              >
                {active && playing === i && it.videoId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${it.videoId}?autoplay=1&rel=0`}
                    title={it.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 size-full"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => (active ? it.videoId && setPlaying(i) : go(i))}
                    aria-label={active ? `${it.title} 재생` : `${it.title} 보기`}
                    disabled={active && !it.videoId}
                    className="group absolute inset-0 flex items-center justify-center disabled:cursor-default"
                  >
                    {it.videoId && (
                      <Image
                        src={`https://i.ytimg.com/vi/${it.videoId}/hqdefault.jpg`}
                        alt=""
                        fill
                        unoptimized
                        sizes="(min-width: 768px) 56vw, 78vw"
                        className="object-cover"
                      />
                    )}
                    <span className="relative flex size-14 items-center justify-center rounded-full bg-pt-accent text-white shadow-lg transition group-enabled:group-hover:scale-110 md:size-16">
                      <svg viewBox="0 0 24 24" className="ml-1 size-8" fill="currentColor" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    {!it.videoId && <span className="absolute bottom-4 left-0 right-0 text-center text-sm font-medium text-pt-mute">{it.title}</span>}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {items.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="이전 영상"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            className="size-10 rounded-full border border-pt-line bg-pt-card text-xl transition enabled:hover:border-pt-gold disabled:opacity-30"
          >
            ‹
          </button>
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${i + 1}번 영상`}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-pt-accent" : "w-2 bg-pt-line"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="다음 영상"
            onClick={() => go(index + 1)}
            disabled={index === last}
            className="size-10 rounded-full border border-pt-line bg-pt-card text-xl transition enabled:hover:border-pt-gold disabled:opacity-30"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
