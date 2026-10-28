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
];

const IDENTITY_ITEMS = [
  ["네이밍", "가게의 이야기를 담은 이름을 짓습니다. 부르기 쉽고 기억에 남는 이름을 함께 고릅니다."],
  ["로고", "콘셉트를 한눈에 보여주는 심볼과 로고타입을 만듭니다."],
  ["컬러·서체", "가게의 분위기를 만드는 대표 색상과 서체를 정합니다."],
  ["슬로건", "가게가 전하고 싶은 한마디를 짧고 선명한 문장으로 정리합니다."],
  ["간판", "멀리서도 눈에 띄고 가게의 첫인상을 결정하는 간판을 디자인합니다."],
  ["메뉴판·패키지", "메뉴판, 포장재, 명함 등 손님 손에 닿는 모든 것에 콘셉트를 입힙니다."],
  ["공간 콘셉트", "브랜드의 느낌이 공간의 분위기와 동선으로 이어지도록 방향을 잡습니다."],
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
    <section id="projects" className="px-8 py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.3em] text-br-accent">PORTFOLIO</p>
          <h2 className="mt-4 font-serif text-3xl font-black md:text-4xl">우리가 만든 공간</h2>
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
          <h2 className="mt-4 font-serif text-3xl font-black md:text-4xl">현재 분석 중인 매물</h2>
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
    <main className="[&>section:nth-of-type(even)]:bg-br-card">
      <LocationHero />

      <section id="services" className="px-8 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.3em] text-br-accent">SERVICES</p>
            <h2 className="mt-4 font-serif text-3xl font-black md:text-4xl">창업의 처음부터 끝까지</h2>
          </Reveal>
          <div className="mt-16 divide-y divide-br-line border-y border-br-line">
            {SERVICES.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.06}>
                <div className="grid gap-4 py-10 transition-colors hover:bg-black/[0.03] md:grid-cols-[6rem_1fr_1.4fr] md:items-center md:px-6">
                  <span className="font-serif text-3xl font-black text-br-accent">0{i + 1}</span>
                  <p className="font-serif text-2xl font-bold">{t}</p>
                  <p className="leading-relaxed text-br-mute">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="identity" className="px-8 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.3em] text-br-accent">IDENTITY</p>
            <h2 className="mt-4 font-serif text-3xl font-black md:text-4xl">나다운 가게를 만드는 7가지</h2>
            <p className="mt-4 max-w-2xl text-br-mute">
              이름 하나, 색 하나가 손님이 기억하는 첫인상이 됩니다. 가게의 콘셉트를 정하고 눈에 보이는 모든 곳에 일관되게 담아냅니다.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {IDENTITY_ITEMS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-br-line bg-br-card p-7 transition hover:-translate-y-1 hover:border-br-accent/60">
                  <span className="font-serif text-2xl font-black text-br-accent">0{i + 1}</span>
                  <p className="mt-4 font-serif text-xl font-bold">{t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-br-mute">{d}</p>
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

      <section id="faq" className="px-8 py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-3xl font-black md:text-4xl">자주 묻는 질문</h2>
          </Reveal>
          <div className="mt-12">
            <Faq items={FAQS} itemClass="border-br-line" mutedClass="text-br-mute" />
          </div>
        </div>
      </section>

      <section id="contact" className="px-8 py-28">
        <div className="mx-auto max-w-2xl rounded-2xl border border-br-line bg-white p-8 shadow-sm md:p-12">
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
