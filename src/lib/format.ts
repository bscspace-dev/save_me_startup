// 만원 단위 금액을 "1억 2,000만원" 형태로 표기
export function won(manwon: number | null, empty = "문의") {
  if (manwon == null) return empty;
  if (manwon >= 10000) {
    const eok = Math.floor(manwon / 10000);
    const rest = manwon % 10000;
    return rest ? `${eok}억 ${rest.toLocaleString("ko-KR")}만원` : `${eok}억원`;
  }
  return `${manwon.toLocaleString("ko-KR")}만원`;
}
