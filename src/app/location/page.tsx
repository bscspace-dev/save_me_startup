import { Suspense } from "react";
import { LocationHero } from "@/components/location/Hero";
import { ListingShowcase } from "@/components/location/ListingShowcase";
import { ProjectGallery } from "@/components/location/ProjectGallery";
import { getProjects } from "@/lib/projects";
import { getListings } from "@/lib/listings";
import { Faq } from "@/components/ui/Faq";
import { InquiryForm } from "@/components/ui/InquiryForm";
import { Reveal } from "@/components/ui/Reveal";

const SERVICES = [
  ["상가 매물·입지 분석", "희망 지역과 업종에 맞는 상가 매물을 찾고, 유동인구·배후 수요·경쟁 점포를 근거로 후보지를 비교합니다."],
  ["브랜드 아이덴티티", "가게의 콘셉트, 네이밍, 로고, 톤앤매너를 정리해 처음부터 ‘나다운 가게’의 방향을 만듭니다."],
  ["인테리어·공간 설계", "브랜드 콘셉트에 맞는 공간 방향과 동선을 설계하고, 업체 선정·견적 검토·진행을 컨설팅합니다."],
  ["마케팅·오픈 준비", "온라인 플레이스, SNS, 오픈 이벤트까지 오픈 전부터 고객을 만날 준비를 함께합니다."],
  ["권리금·임대 조건 검토", "권리금 적정성, 임대료, 계약 기간과 갱신 조건을 계약 전에 점검합니다."],
];

const REPORT = [
  ["유동인구", "시간대·요일별 보행 흐름과 주 고객층"],
  ["배후 수요", "주거·직장 세대 수와 소비 성향"],
  ["경쟁 현황", "동일 업종 점포 수, 폐업 추이"],
  ["접근성·가시성", "교통, 주차, 간판 노출과 동선"],
  ["임대 조건", "보증금·월세·권리금 대비 손익분기"],
  ["리스크 요인", "상권 변화, 개발 계획, 계약상 위험"],
];

const STEPS = [
  ["상담", "창업 목표, 업종, 예산을 확인합니다."],
  ["입지 분석", "후보 매물을 찾고 현장과 데이터로 분석합니다."],
  ["아이덴티티 설계", "콘셉트, 네이밍, 비주얼 방향을 정립합니다."],
  ["인테리어", "콘셉트에 맞는 공간을 설계하고 공사 과정을 점검합니다."],
  ["마케팅·오픈", "오픈 마케팅을 준비하고 오픈 이후까지 함께합니다."],
];

const CHECKS = [
  "건물 용도와 영업 가능 업종을 확인했다",
  "등기부등본으로 근저당·소유자를 확인했다",
  "권리금 산정 근거와 전 임차인 매출을 확인했다",
  "시간대별로 현장 유동인구를 직접 확인했다",
  "임대차 갱신 조건과 원상복구 범위를 확인했다",
  "철거·인테리어 가능 범위를 건물주와 합의했다",
];

const FAQS = [
  { q: "어떤 분야까지 컨설팅해 주시나요?", a: "상가 입지 분석, 브랜드 아이덴티티, 인테리어 방향, 오픈 마케팅까지 창업의 전 과정을 다룹니다. 필요한 부분만 선택해서 진행할 수도 있습니다." },
  { q: "어떤 지역을 다루나요?", a: "대구·경북을 중심으로 진행하며, 그 외 지역은 상담 후 가능 여부를 안내드립니다." },
  { q: "이미 보고 있는 매물만 분석해 주실 수 있나요?", a: "가능합니다. 후보지 주소를 알려주시면 해당 입지의 분석 리포트를 작성해 드립니다." },
  { q: "비용은 어떻게 되나요?", a: "필요한 서비스 범위에 따라 달라집니다. 상담 후 사전에 견적을 안내드립니다." },
  { q: "컨설팅을 받으면 매출이 보장되나요?", a: "아닙니다. 컨설팅은 판단을 돕는 근거와 방향을 제공하며 매출을 보장하지 않습니다. 리스크까지 함께 알려드립니다." },
];

async function ProjectsSection() {
  const projects = await getProjects();
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="bg-white px-8 py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.3em] text-br-accent">PORTFOLIO</p>
          <h2 className="mt-4 font-serif text-4xl font-black md:text-5xl">우리가 만든 공간</h2>
          <p className="mt-4 text-br-mute">입지 선정부터 아이덴티티, 인테리어, 마케팅까지 함께한 매장입니다. 사진을 눌러 자세히 보세요.</p>
        </Reveal>
        <div className="mt-12">
          <ProjectGallery projects={projects} />
        </div>
      </div>
    </section>
  );
}

async function ListingsSection() {
  const listings = await getListings();
  if (listings.length === 0) return null;

  return (
    <section id="listings" className="px-8 py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.3em] text-br-accent">LISTINGS</p>
          <h2 className="mt-4 font-serif text-4xl font-black md:text-5xl">현재 분석 중인 매물</h2>
          <p className="mt-4 text-br-mute">
            직접 현장을 확인하고 분석한 매물입니다. 카드를 눌러 입지 분석 결과를 확인하세요. 상세 주소는 문의 시 안내드립니다.
          </p>
        </Reveal>
        <div className="mt-12">
          <ListingShowcase listings={listings} />
        </div>
      </div>
    </section>
  );
}

export default function LocationPage() {
  return (
    <main>
      <LocationHero />

      <section id="services" className="px-8 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.3em] text-br-accent">SERVICES</p>
            <h2 className="mt-4 font-serif text-4xl font-black md:text-5xl">창업의 처음부터 끝까지</h2>
          </Reveal>
          <div className="mt-16 divide-y divide-br-line border-y border-br-line">
            {SERVICES.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.06}>
                <div className="grid gap-4 py-10 transition-colors hover:bg-white md:grid-cols-[6rem_1fr_1.4fr] md:items-center md:px-6">
                  <span className="font-serif text-3xl font-black text-br-accent">0{i + 1}</span>
                  <p className="font-serif text-2xl font-bold">{t}</p>
                  <p className="leading-relaxed text-br-mute">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Suspense>
        <ProjectsSection />
      </Suspense>

      <Suspense>
        <ListingsSection />
      </Suspense>

      <section id="report" className="bg-white px-8 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.3em] text-br-accent">REPORT</p>
            <h2 className="mt-4 font-serif text-4xl font-black md:text-5xl">입지분석 리포트 구성</h2>
            <p className="mt-4 text-br-mute">후보지마다 아래 6가지 항목을 같은 기준으로 비교합니다.</p>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {REPORT.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.06}>
                <div className="h-full rounded-xl border border-br-line bg-br-bg p-7 transition hover:-translate-y-1 hover:border-br-ink/40">
                  <p className="font-serif text-xl font-bold">{t}</p>
                  <p className="mt-2 text-br-mute">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="px-8 py-28">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.3em] text-br-accent">PROCESS</p>
            <h2 className="mt-4 font-serif text-4xl font-black md:text-5xl">프로세스</h2>
          </Reveal>
          <div className="relative mt-16 border-l-2 border-br-line pl-10">
            {STEPS.map(([t, d], i) => (
              <Reveal key={t} delay={0.05}>
                <div className="relative pb-14 last:pb-0">
                  <span className="absolute -left-[3.2rem] top-1 flex size-8 items-center justify-center rounded-full bg-br-ink text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="font-serif text-2xl font-bold">{t}</p>
                  <p className="mt-2 text-br-mute">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="checklist" className="bg-white px-8 py-28">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.3em] text-br-accent">CHECKLIST</p>
            <h2 className="mt-4 font-serif text-4xl font-black md:text-5xl">상가 계약 전 체크리스트</h2>
            <p className="mt-4 text-br-mute">계약서에 도장 찍기 전, 이 항목들은 꼭 확인하세요.</p>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {CHECKS.map((c, i) => (
              <Reveal key={c} delay={i * 0.05}>
                <div className="flex gap-4 rounded-xl border border-br-line bg-br-bg p-5">
                  <span aria-hidden className="mt-0.5 text-br-accent">✓</span>
                  <span>{c}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-8 py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-4xl font-black md:text-5xl">자주 묻는 질문</h2>
          </Reveal>
          <div className="mt-12">
            <Faq items={FAQS} itemClass="border-br-line bg-white" mutedClass="text-br-mute" />
          </div>
        </div>
      </section>

      <section id="contact" className="px-8 pb-28">
        <div className="mx-auto max-w-2xl rounded-2xl border border-br-line bg-white p-8 md:p-12">
          <Reveal>
            <h2 className="font-serif text-3xl font-black">신규창업 상담 신청</h2>
            <p className="mb-8 mt-3 text-br-mute">희망 조건을 남겨주시면 담당 컨설턴트가 연락드립니다.</p>
            <InquiryForm kind="location" />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
