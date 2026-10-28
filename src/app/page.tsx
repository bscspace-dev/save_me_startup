import { Suspense } from "react";
import { PortalFooter, PortalHeader } from "@/components/portal/Chrome";
import { ChannelSection } from "@/components/portal/ChannelSection";
import { LandingPopup } from "@/components/portal/LandingPopup";
import { PortalMain } from "@/components/portal/PortalMain";
import { InquiryForm } from "@/components/ui/InquiryForm";
import { Reveal } from "@/components/ui/Reveal";
import { getBrands } from "@/lib/brands";
import { getListings } from "@/lib/listings";

async function Market() {
  const [listings, brands] = await Promise.all([getListings(), getBrands()]);
  return <PortalMain listings={listings} brands={brands} />;
}

export default function Home() {
  return (
    <div className="bg-pt-bg text-pt-text">
      <PortalHeader />
      <main className="[&>section:nth-of-type(even)]:bg-pt-soft">
        <Suspense fallback={<div className="min-h-dvh" />}>
          <Market />
        </Suspense>

        <ChannelSection />

        <section id="quick" className="px-6 py-28">
          <div className="mx-auto max-w-3xl rounded-3xl border border-pt-line bg-pt-card p-8 md:p-12">
            <Reveal>
              <p className="text-center text-sm font-bold tracking-widest text-pt-gold-deep">QUICK CONSULT</p>
              <h2 className="mt-3 text-center text-3xl font-black md:text-4xl"><span className="text-pt-gold-deep">간편</span>상담</h2>
              <p className="mt-4 text-center text-pt-mute">
                공개되지 않은 비공개 매물도 있습니다. 희망 지역과 예산을 남겨주시면 조건에 맞는 매물을 비교해 안내드립니다.
              </p>
            </Reveal>
            <div className="mt-10">
              <InquiryForm kind="franchise" theme="portal" />
            </div>
          </div>
        </section>
      </main>
      <PortalFooter />
      <LandingPopup />
    </div>
  );
}
