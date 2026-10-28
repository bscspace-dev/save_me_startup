import type { Metadata } from "next";
import Link from "next/link";
import { PortalFooter, PortalHeader } from "@/components/portal/Chrome";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "회사소개",
  description: `${SITE.name} 소개`,
};

// 소개 문구는 이 아래 상수만 고치면 됩니다.
// **로 감싼 부분은 강조색으로 표시됩니다.
const INTRO = [
  "창업은 한 번의 결정이 **몇 년을 좌우**합니다.\n\n구해줘창업은 그 결정 앞에서 막막해하는 분들 곁에서 \n**함께 고민**하기 위해 시작했습니다.",
  "창업을 준비하는 분의 상황과 목표를 **먼저 듣고**, 좋은 점과 함께 유의할 점도 숨기지 않고 **솔직하게** 알려드립니다.",
  "상담부터 **오픈까지** 실무 경험을 바탕으로 함께합니다.",
];

function Rich({ text }: { text: string }) {
  return text.split("**").map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-black text-pt-gold-deep">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

const VALUES = [
  ["먼저 듣습니다", "창업 목표, 업종, 예산과 고민을 충분히 듣고 그에 맞는 방향을 함께 찾습니다."],
  ["솔직하게 말씀드립니다", "좋은 점뿐 아니라 유의할 점도 숨기지 않고 알려드립니다."],
  ["오픈까지 함께합니다", "상담부터 오픈하는 날까지 한 걸음씩 곁에서 함께합니다."],
];

const SERVICES = [
  { href: "/franchise", title: "프랜차이즈 전수창업", desc: "브랜드 비교부터 계약, 오픈까지 함께합니다." },
  { href: "/location", title: "신규창업 종합 컨설팅", desc: "입지 분석부터 인테리어, 마케팅까지 설계합니다." },
];

const INFO = [
  ["회사명", SITE.company],
  ["대표", SITE.ceo],
  ["사업자등록번호", SITE.bizNo],
  ["주소", SITE.address],
  ["전화", SITE.phone],
  ["이메일", SITE.email],
];

export default function AboutPage() {
  return (
    <div className="bg-pt-bg text-pt-text">
      <PortalHeader />
      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-36">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-pt-tint)_0%,var(--color-pt-bg)_65%)]" />
          <Reveal className="relative mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold tracking-[0.3em] text-pt-gold-deep">ABOUT US</p>
            <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
              <span className="text-pt-gold-deep">{SITE.name}</span>을 소개합니다
            </h1>
            <p className="mt-5 text-lg text-pt-mute">{SITE.description}</p>
          </Reveal>
        </section>

        <section className="px-6 py-20">
          <Reveal className="mx-auto max-w-2xl border-l-2 border-pt-gold pl-6">
            <p className="whitespace-pre-line text-xl font-bold leading-relaxed md:text-2xl md:leading-relaxed">
              <Rich text={INTRO[0]} />
            </p>
            <p className="mt-5 leading-relaxed text-pt-mute">
              <Rich text={INTRO[1]} />
            </p>
            <p className="mt-5 text-sm font-bold text-pt-gold-deep">{INTRO[2].replaceAll("**", "")}</p>
          </Reveal>
        </section>

        <section className="border-y border-pt-line bg-pt-soft px-6 py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="text-center">
              <p className="text-xs font-bold tracking-[0.3em] text-pt-gold-deep">VALUES</p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">우리가 <span className="text-pt-gold-deep">일하는 방식</span></h2>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {VALUES.map(([title, desc], i) => (
                <Reveal key={title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-pt-line bg-pt-card p-8">
                    <p className="text-sm font-bold text-pt-gold-deep">0{i + 1}</p>
                    <p className="mt-3 text-xl font-black">{title}</p>
                    <p className="mt-3 text-pt-mute">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="text-center">
              <p className="text-xs font-bold tracking-[0.3em] text-pt-gold-deep">SERVICES</p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl"><span className="text-pt-gold-deep">서비스</span> 영역</h2>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {SERVICES.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group rounded-2xl border border-pt-line bg-pt-card p-8 transition hover:-translate-y-1 hover:border-pt-gold"
                >
                  <p className="text-xl font-black">{s.title}</p>
                  <p className="mt-3 text-pt-mute">{s.desc}</p>
                  <span className="mt-6 inline-block font-bold text-pt-gold-deep transition group-hover:translate-x-1">자세히 보기 →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-pt-line bg-pt-soft px-6 py-28">
          <div className="mx-auto max-w-3xl">
            <Reveal className="text-center">
              <p className="text-xs font-bold tracking-[0.3em] text-pt-gold-deep">INFORMATION</p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl"><span className="text-pt-gold-deep">회사</span> 정보</h2>
            </Reveal>
            <dl className="mt-10 rounded-2xl border border-pt-line bg-pt-card px-8">
              {INFO.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-pt-line py-4 last:border-b-0">
                  <dt className="text-pt-mute">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <PortalFooter />
    </div>
  );
}
