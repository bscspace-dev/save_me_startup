import type { Metadata } from "next";
import { Gateway } from "@/components/gateway/Gateway";

export const metadata: Metadata = {
  title: "창업 상담 시작하기",
};

export default function StartPage() {
  return <Gateway />;
}
