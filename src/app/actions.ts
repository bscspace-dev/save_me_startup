"use server";

import { getSupabase } from "@/lib/supabase";

export type InquiryState = { ok: boolean; message: string } | null;

const PHONE_RE = /^0\d{1,2}-?\d{3,4}-?\d{4}$/;

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  // 봇이 채우는 숨김 필드
  if (formData.get("website")) return { ok: true, message: "접수되었습니다." };

  const kind = String(formData.get("kind") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim().slice(0, 2000);

  if (kind !== "franchise" && kind !== "location") return { ok: false, message: "잘못된 요청입니다." };
  if (name.length < 2 || name.length > 40) return { ok: false, message: "이름을 확인해주세요." };
  if (!PHONE_RE.test(phone)) return { ok: false, message: "연락처 형식을 확인해주세요. (예: 010-1234-5678)" };
  if (formData.get("consent") !== "on") return { ok: false, message: "개인정보 수집·이용에 동의해주세요." };

  const details: Record<string, string> = {};
  for (const key of ["status", "interest", "budget", "area"]) {
    const v = String(formData.get(key) ?? "").trim().slice(0, 100);
    if (v) details[key] = v;
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.warn("[inquiry] Supabase 환경변수가 없어 저장하지 않았습니다.", { kind, name });
    return { ok: false, message: "서버 설정이 완료되지 않았습니다. 잠시 후 다시 시도해주세요." };
  }

  const { error } = await supabase.from("inquiries").insert({ kind, name, phone, details, message });
  if (error) {
    console.error("[inquiry] insert failed", error.message);
    return { ok: false, message: "접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요." };
  }
  return { ok: true, message: "상담 신청이 접수되었습니다. 영업일 기준 1일 내 연락드리겠습니다." };
}
