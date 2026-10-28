"use client";

import { useActionState } from "react";
import { submitInquiry } from "@/app/actions";
import { SITE } from "@/lib/site";

type Kind = "franchise" | "location";
type Theme = Kind | "portal";

const THEME = {
  franchise: {
    input:
      "w-full rounded-xl border border-fd-line bg-fd-bg px-4 py-3.5 text-fd-text placeholder:text-fd-mute/60 outline-none transition focus:border-fd-accent",
    label: "text-sm font-medium text-fd-mute",
    button:
      "w-full rounded-xl bg-fd-accent px-6 py-4 text-lg font-bold text-fd-bg transition hover:brightness-110 disabled:opacity-60",
    ok: "text-fd-accent",
    err: "text-red-400",
    consent: "text-fd-mute",
  },
  portal: {
    input:
      "w-full rounded-xl border border-pt-line bg-pt-bg px-4 py-3.5 text-pt-text placeholder:text-pt-mute/60 outline-none transition focus:border-pt-accent",
    label: "text-sm font-medium text-pt-mute",
    button:
      "w-full rounded-xl bg-pt-accent px-6 py-4 text-lg font-bold text-white transition hover:brightness-110 disabled:opacity-60",
    ok: "text-pt-accent",
    err: "text-red-600",
    consent: "text-pt-mute",
  },
  location: {
    input:
      "w-full rounded-xl border border-br-line bg-white px-4 py-3.5 text-br-ink placeholder:text-br-mute/60 outline-none transition focus:border-br-ink",
    label: "text-sm font-medium text-br-mute",
    button:
      "w-full rounded-xl bg-br-ink px-6 py-4 text-lg font-bold text-white transition hover:bg-br-ink/90 disabled:opacity-60",
    ok: "text-br-ink",
    err: "text-red-700",
    consent: "text-br-mute",
  },
} as const;

function Field({ label, cls, wide, children }: { label: string; cls: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <label className={`flex flex-col gap-2 ${wide ? "sm:col-span-2" : ""}`}>
      <span className={cls}>{label}</span>
      {children}
    </label>
  );
}

export function InquiryForm({ kind, theme = kind }: { kind: Kind; theme?: Theme }) {
  const [state, action, pending] = useActionState(submitInquiry, null);
  const t = THEME[theme];

  if (!SITE.inquiryOpen) {
    return (
      <p className={`py-10 text-center text-lg font-bold leading-relaxed ${t.consent}`}>
        현재 테스트 기간으로 문의 접수가 중단되어 있습니다.
        <br />
        정식 오픈 후 이용해 주세요.
      </p>
    );
  }

  if (state?.ok) {
    return <p className={`py-10 text-center text-xl font-bold leading-relaxed ${t.ok}`}>{state.message}</p>;
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <input type="hidden" name="kind" value={kind} />
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="이름" cls={t.label}>
          <input name="name" required minLength={2} placeholder="홍길동" className={t.input} />
        </Field>
        <Field label="연락처" cls={t.label}>
          <input name="phone" required inputMode="tel" placeholder="010-1234-5678" className={t.input} />
        </Field>
      </div>

      {kind === "franchise" ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="현재 상황" cls={t.label} wide>
            <select name="status" className={t.input} defaultValue="">
              <option value="">선택 안 함</option>
              <option>현재 자영업 운영 중</option>
              <option>직장인·예비 창업자</option>
              <option>전수창업 정보 탐색 중</option>
              <option>기타</option>
            </select>
          </Field>
          <Field label="관심 업종" cls={t.label}>
            <select name="interest" className={t.input} defaultValue="">
              <option value="">선택 안 함</option>
              <option>외식 (카페·음료)</option>
              <option>외식 (치킨·분식·한식)</option>
              <option>주점·배달 전문</option>
              <option>무인·소자본 매장</option>
              <option>서비스·교육</option>
            </select>
          </Field>
          <Field label="가용 창업 자금" cls={t.label}>
            <select name="budget" className={t.input} defaultValue="">
              <option value="">선택 안 함</option>
              <option>5천만원 미만</option>
              <option>5천만 ~ 1억원</option>
              <option>1억 ~ 2억원</option>
              <option>2억원 이상</option>
            </select>
          </Field>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="희망 지역" cls={t.label}>
            <input name="area" placeholder="예: 대구 수성구 범어동" className={t.input} />
          </Field>
          <Field label="희망 업종" cls={t.label}>
            <input name="interest" placeholder="예: 카페, 한식, 미용실" className={t.input} />
          </Field>
          <Field label="예산 (보증금 + 권리금)" cls={t.label} wide>
            <select name="budget" className={t.input} defaultValue="">
              <option value="">선택 안 함</option>
              <option>5천만원 미만</option>
              <option>5천만 ~ 1억원</option>
              <option>1억 ~ 2억원</option>
              <option>2억원 이상</option>
            </select>
          </Field>
        </div>
      )}

      <Field label="문의 내용 (선택)" cls={t.label}>
        <textarea name="message" rows={4} className={t.input} placeholder="궁금한 점을 자유롭게 적어주세요." />
      </Field>

      <label className={`flex items-start gap-3 text-sm ${t.consent}`}>
        <input type="checkbox" name="consent" className="mt-1 size-4" />
        <span>상담 진행을 위한 개인정보(이름, 연락처) 수집·이용에 동의합니다. (보관: 상담 완료 후 1년)</span>
      </label>

      {state && !state.ok && (
        <p role="alert" className={`text-sm ${t.err}`}>
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className={t.button}>
        {pending ? "접수 중..." : "무료 상담 신청하기"}
      </button>
    </form>
  );
}
