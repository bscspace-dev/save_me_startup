// 브랜드/연락처 정보는 이 파일 한 곳에서 바꾸면 전체에 반영됩니다. (모두 임시 값)
export const SITE = {
  name: "구해줘창업",
  description: "예비 창업자와 현업 사업자를 위한 확실한 상가 컨설팅",
  phone: "010-0000-0000",
  email: "hello@example.com",
  company: "(주)구해줘창업",
  ceo: "홍길동",
  bizNo: "000-00-00000",
  address: "대구광역시 OO구 OO로 000",
  // TODO(정식 오픈 시 해제): 아래 두 값을 바꾸면 테스트 안내 팝업과 검색엔진 차단(noindex, robots.txt)이 풀리고 문의 접수가 열립니다.
  // 테스트 기간 설정: testMode가 true면 접속 시 테스트 안내 팝업이 뜨고 검색엔진 노출이 차단되며, inquiryOpen이 false면 문의 접수가 중단됩니다.
  testMode: true,
  inquiryOpen: false,
} as const;
