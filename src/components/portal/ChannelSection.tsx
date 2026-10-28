import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";
import { parseVideoId } from "@/lib/youtube";
import { ChannelCarousel, type ChannelItem } from "./ChannelCarousel";

const channelUrl: string = SITE.channelUrl;

const PLACEHOLDERS: ChannelItem[] = [
  { title: "영상 준비 중", videoId: null },
  { title: "영상 준비 중", videoId: null },
  { title: "영상 준비 중", videoId: null },
];

export function ChannelSection() {
  const items: ChannelItem[] = SITE.channelVideos.flatMap((v) => {
    const videoId = parseVideoId(v.url);
    return videoId ? [{ title: v.title, videoId }] : [];
  });

  return (
    <section id="channel" className="overflow-hidden px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-pt-gold-deep">CHANNEL</p>
          <h2 className="mt-3 text-3xl font-black leading-snug md:text-4xl">
            <span className="text-pt-gold-deep">구해줘창업</span> 채널에서 만나보세요
          </h2>
          <p className="mt-4 text-pt-mute">
            전수창업의 기술과 노하우부터 나다운 가게를 만드는 과정까지,
            <br className="hidden sm:block" /> 창업 준비에 도움이 되는 이야기를 영상으로 전합니다.
          </p>
        </Reveal>

        <div className="mt-12">
          <ChannelCarousel items={items.length > 0 ? items : PLACEHOLDERS} />
        </div>

        <div className="mt-10 text-center">
          {channelUrl ? (
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-pt-accent px-8 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:brightness-105"
            >
              채널 바로가기
            </a>
          ) : (
            <p className="inline-block rounded-full border border-pt-line px-8 py-3.5 font-bold text-pt-mute">채널 준비 중입니다</p>
          )}
        </div>
      </div>
    </section>
  );
}
