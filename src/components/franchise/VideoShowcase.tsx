"use client";

import { useState } from "react";
import type { FeaturedVideo } from "@/lib/playlists";

export function VideoShowcase({ video }: { video: FeaturedVideo }) {
  // 재생 버튼을 누른 뒤에만 iframe을 불러와 초기 로딩을 가볍게 유지
  const [playing, setPlaying] = useState(false);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="relative aspect-video overflow-hidden rounded-3xl border border-fd-line bg-fd-card">
        {playing && video.videoId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            disabled={!video.videoId}
            onClick={() => setPlaying(true)}
            aria-label={`${video.title} 재생`}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-fd-card to-fd-bg p-8 text-center disabled:cursor-default"
          >
            <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-fd-accent text-fd-bg transition group-enabled:group-hover:scale-110 md:size-20">
              <svg viewBox="0 0 24 24" className="ml-1 size-9" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="text-2xl font-black md:text-3xl">{video.title}</span>
            {video.sample && <span className="text-sm text-fd-mute">샘플 (영상 없음)</span>}
          </button>
        )}
      </div>
      {video.description && <p className="mt-5 text-center text-fd-mute">{video.description}</p>}
    </div>
  );
}
