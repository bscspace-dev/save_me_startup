import { Suspense } from "react";
import { BrandShowcase } from "@/components/franchise/BrandShowcase";
import { FranchiseHero } from "@/components/franchise/Hero";
import { VideoShowcase } from "@/components/franchise/VideoShowcase";
import { getBrands } from "@/lib/brands";
import { getFeaturedVideo } from "@/lib/playlists";
import { Faq } from "@/components/ui/Faq";
import { InquiryForm } from "@/components/ui/InquiryForm";
import { Reveal } from "@/components/ui/Reveal";

const AUDIENCE = [
  {
    tag: "자영업자 사장님",
    title: "지금 가게를 하고 있는데, 성장하고 싶다면",
    points: ["검증된 시스템으로 2호점·업종 확장 검토", "현재 매장 운영과 병행 가능한 브랜드 선별", "기존 상권·자금 상황에 맞는 조건 비교"],
    cta: "자영업자 상담",
  },
  {
    tag: "전수창업을 알아보는 분",
    title: "처음이라 도움이 필요하다면",
    points: ["경험이 없어도 따라 할 수 있는 교육·매뉴얼 확인", "내 자본에 맞는 브랜드와 업종 좁히기", "계약 전 위험 요소 점검과 오픈 지원"],
    cta: "창업 상담",
  },
];

const CONCEPTS = [
  ["기술", "조리법과 서비스 방식 등 매장 운영에 필요한 실무 기술을 배웁니다."],
  ["노하우", "상품 구성, 거래처, 마케팅 등 운영하며 쌓인 노하우를 전수받습니다."],
  ["운영 방식", "매뉴얼과 교육을 통해 매장을 운영하는 방식을 익힙니다."],
];

const PROBLEMS = [
  ["경험이 없어서 막막해요", "경험이 없어도 괜찮습니다. 처음부터 단계별로 배우고, 매뉴얼을 따라 할 수 있는 브랜드를 함께 찾습니다."],
  ["기술을 제대로 배울 수 있을까요?", "교육 기간과 커리큘럼, 실습 방식을 직접 확인해 드립니다. 충분히 배울 수 있는 브랜드인지 먼저 점검합니다."],
  ["노하우를 어디까지 전수받나요?", "레시피, 운영 방식, 거래처, 마케팅까지 브랜드별 전수 범위를 한눈에 비교해 정리해 드립니다."],
  ["오픈 준비를 어떻게 해야 할지 모르겠어요", "상담부터 브랜드 선택, 교육, 매장 세팅, 오픈까지 일정을 단계별로 잡고 함께 진행합니다."],
];

const STEPS = [
  ["상담 신청", "목표와 자금 상황을 간단히 접수합니다."],
  ["1:1 진단", "업종·예산·성향에 맞는 후보를 좁힙니다."],
  ["브랜드·입지 검증", "데이터와 현장으로 후보를 검증합니다."],
  ["계약 검토", "계약 전 위험 요소를 점검합니다."],
  ["오픈 지원", "오픈 준비와 초기 운영을 함께 점검합니다."],
];

const FAQS = [
  { q: "상담은 정말 무료인가요?", a: "초기 상담과 업종 진단은 무료입니다. 이후 심화 검증이 필요한 경우 범위와 비용을 사전에 안내드립니다." },
  { q: "특정 브랜드를 추천해주시나요?", a: "특정 브랜드의 수수료에 의존하지 않고, 고객님 조건에 맞는 후보를 비교 기준과 함께 안내합니다." },
  { q: "자금이 5천만원 이하여도 가능한가요?", a: "소자본에 맞는 업종과 운영 방식을 우선 검토합니다. 먼저 현재 상황을 알려주세요." },
  { q: "상담 후 반드시 창업해야 하나요?", a: "아닙니다. 창업하지 않기로 결정하는 것도 좋은 결과라고 생각합니다." },
];

async function BrandsSection() {
  const brands = await getBrands();
  if (brands.length === 0) return null;

  return (
    <section id="brands" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-bold tracking-widest text-fd-accent">BRANDS</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">구해줘창업이 발굴한 브랜드</h2>
          <p className="mt-4 text-fd-mute">직접 검토한 브랜드만 소개합니다. 카드를 눌러 상세 정보를 확인하세요.</p>
        </Reveal>
        <div className="mt-12">
          <BrandShowcase brands={brands} />
        </div>
      </div>
    </section>
  );
}

async function VideoSection() {
  const video = await getFeaturedVideo();
  if (!video) return null;

  return (
    <section id="videos" className="bg-fd-card/40 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-bold tracking-widest text-fd-accent">VIDEO</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">구해줘창업 영상에서 만나보세요!</h2>
          <p className="mt-4 text-fd-mute">창업 준비에 도움이 되는 영상을 소개합니다.</p>
        </Reveal>
        <div className="mt-12">
          <VideoShowcase video={video} />
        </div>
      </div>
    </section>
  );
}

export default function FranchisePage() {
  return (
    <main>
      <FranchiseHero />

      <section id="concept" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm font-bold tracking-widest text-fd-accent">CONCEPT</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">전수창업이란?</h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-fd-text md:text-xl">
              검증된 브랜드와 가게의 <strong className="font-black text-fd-accent">기술과 운영 노하우를 직접 배워</strong> 내 가게로 시작하는 창업
              방식입니다. 혼자 시행착오를 겪는 대신, 이미 검증된 방법을 전수받아 출발합니다.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {CONCEPTS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-fd-line bg-fd-card p-8">
                  <p className="text-sm font-bold text-fd-accent">0{i + 1}</p>
                  <p className="mt-3 text-2xl font-black">{t}</p>
                  <p className="mt-3 leading-relaxed text-fd-mute">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-8 text-fd-mute">구해줘창업은 브랜드별 전수 범위와 교육 내용을 비교해, 나에게 맞는 전수창업을 찾도록 돕습니다.</p>
          </Reveal>
        </div>
      </section>

      <section id="audience" className="px-6 pt-8 pb-4">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm font-bold tracking-widest text-fd-accent">FOR YOU</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">이런 분께 맞습니다</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {AUDIENCE.map((a, i) => (
              <Reveal key={a.tag} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded-3xl border border-fd-line bg-fd-card p-8 transition hover:-translate-y-1 hover:border-fd-accent/60">
                  <span className="w-fit rounded-full bg-fd-accent/15 px-3 py-1 text-xs font-bold text-fd-accent">{a.tag}</span>
                  <p className="mt-5 text-2xl font-black leading-snug">{a.title}</p>
                  <ul className="mt-6 flex-1 space-y-3 text-fd-mute">
                    {a.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span aria-hidden className="text-fd-accent">✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="mt-8 inline-flex w-fit items-center gap-2 font-bold text-fd-accent">
                    {a.cta} <span aria-hidden>→</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="problems" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-3xl font-black md:text-4xl">전수창업, 이런 점이 걱정되시나요?</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {PROBLEMS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-fd-line bg-fd-card p-8 transition hover:-translate-y-1 hover:border-fd-accent/60">
                  <p className="text-xl font-bold">{t}</p>
                  <p className="mt-3 leading-relaxed text-fd-mute">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Suspense>
        <BrandsSection />
      </Suspense>

      <Suspense>
        <VideoSection />
      </Suspense>

      <section id="process" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm font-bold tracking-widest text-fd-accent">PROCESS</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">진행 과정</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-5">
            {STEPS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-fd-line p-6">
                  <span className="text-sm font-bold text-fd-accent">STEP {i + 1}</span>
                  <p className="mt-3 text-lg font-bold">{t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-fd-mute">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-black md:text-4xl">자주 묻는 질문</h2>
          </Reveal>
          <div className="mt-12">
            <Faq items={FAQS} itemClass="border-fd-line bg-fd-card" mutedClass="text-fd-mute" />
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 pb-28">
        <div className="mx-auto max-w-2xl rounded-3xl border border-fd-line bg-fd-card p-8 md:p-12">
          <Reveal>
            <h2 className="text-3xl font-black">무료 창업 상담 신청</h2>
            <p className="mb-8 mt-3 text-fd-mute">남겨주시면 영업일 기준 1일 내 연락드립니다.</p>
            <InquiryForm kind="franchise" />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
