import type { Metadata } from "next";
import { Suspense } from "react";
import { PortalFooter, PortalHeader } from "@/components/portal/Chrome";
import { ListingBoard } from "@/components/portal/ListingBoard";
import { getListings } from "@/lib/listings";

export const metadata: Metadata = {
  title: "등록된 매물",
  description: "구해줘창업에 등록된 매물을 업종별로 확인해보세요.",
};

async function Board() {
  const listings = await getListings();
  return <ListingBoard listings={listings} />;
}

export default function ListingsPage() {
  return (
    <div className="bg-pt-bg text-pt-text">
      <PortalHeader />
      <main className="min-h-dvh px-6 pb-24 pt-32">
        <Suspense fallback={<div className="min-h-[60dvh]" />}>
          <Board />
        </Suspense>
      </main>
      <PortalFooter />
    </div>
  );
}
