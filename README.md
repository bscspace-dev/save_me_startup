# 구해줘창업

예비 창업자와 신규창업자를 위한 **창업 컨설팅 랜딩 사이트**입니다.
방문자를 두 갈래로 나누어 각자에게 맞는 서비스를 안내하고, 상담 문의를 수집합니다.

## 사이트 기획

### 목적
- 창업을 준비하는 방문자가 자신의 상황에 맞는 서비스를 바로 찾게 한다.
- 브랜드·매물·시공 사례로 신뢰를 쌓고, **무료 상담 신청**으로 대상을 전환시킨다.

### 사이트 구조

| 경로 | 이름 | 대상 | 내용 |
| --- | --- | --- | --- |
| `/` | 매물 포털 (메인) | 모든 방문자 | 창업별 카테고리(프랜차이즈 전수창업·신규창업 컨설팅), 추천 브랜드 PICK, 등록된 상가 매물, 간편상담. 접속 시 컨설팅 안내 팝업이 뜨고 누르면 `/start`로 이동 |
| `/listings` | 등록된 매물 | 모든 방문자 | 업종 탭(전체·카페·베이커리·음식점·배달)으로 매물을 걸러 보고, 카드를 누르면 상세 정보와 문의 버튼이 뜬다. 메인의 등록된 상가 매물 카드와 "매물 보기" 버튼이 여기로 연결된다 |
| `/about` | 회사소개 | 모든 방문자 | 회사 소개 문구, 일하는 방식, 서비스 영역, 회사 정보. 문구는 `src/app/about/page.tsx` 상단 상수로 수정 |
| `/start` | 게이트웨이 | 컨설팅 관심 방문자 | 화면을 둘로 나눠 두 서비스 중 하나를 고르게 하는 진입 페이지 |
| `/knowhow` | 프랜차이즈 전수창업 | 프랜차이즈로 창업하려는 예비 창업자 | 발굴 브랜드, 소개 영상, 추천 대상, 창업 전 체크 4가지, 진행 과정, FAQ, 상담 신청 |
| `/identity` | 신규창업 종합 컨설팅 | 나만의 가게를 새로 열려는 창업자 | 시공 사례, 분석 중인 매물, 서비스 범위, FAQ, 상담 신청 |

### 서비스 소개
- **프랜차이즈 전수창업**: 브랜드 비교부터 계약, 오픈까지 함께한다.
- **신규창업 종합 컨설팅**: 입지 분석, 브랜드 아이덴티티, 인테리어, 마케팅을 맡는다.

### 전환 흐름
1. `/`에서 서비스를 선택한다.
2. 각 페이지에서 브랜드, 매물, 사례를 살펴본다.
3. 페이지 하단 폼으로 상담을 신청한다. (이름, 연락처, 관심 분야, 예산, 지역, 문의 내용, 개인정보 동의)
4. 문의는 Supabase `inquiries` 테이블에 저장된다. 관리자는 Supabase 대시보드에서 확인한다.

### 콘텐츠 관리
브랜드, 매물, 시공 사례, 영상은 코드를 고치지 않고 **Supabase 대시보드에서 등록·수정**합니다.
`published = true`인 항목만 사이트에 노출됩니다.

## 기술 스택
- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- motion (애니메이션)
- Supabase (DB, 문의 수집)

## 폴더 구조

```
src/
├─ app/                 페이지 (/, /knowhow, /identity)와 문의 접수 서버 액션(actions.ts)
├─ components/
│  ├─ gateway/          메인 분할 화면
│  ├─ franchise/        프랜차이즈 페이지 섹션
│  ├─ location/         신규창업 페이지 섹션
│  └─ ui/               공통 (FAQ, 문의 폼, 등장 애니메이션)
└─ lib/                 Supabase 조회 함수와 사이트 정보 (site.ts)
supabase/schema.sql     DB 테이블과 RLS 정책
```

## 시작하기

```bash
npm install
cp .env.local.example .env.local   # Supabase 값 입력
npm run dev                        # http://localhost:3000
```

### 환경 변수 (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Supabase 설정
1. Supabase 프로젝트를 만든다.
2. SQL Editor에서 `supabase/schema.sql`을 실행한다.
   - 테이블: `inquiries`, `brands`, `listings`, `projects`, `playlists`
   - 매물 사진은 Storage 버킷 `listings`에 올리고 public URL을 `listings.images`에 넣는다. 특이사항은 `listings.notes`에 적는다.
   - 문의는 누구나 등록할 수 있지만 조회는 불가능하다. 공개된 콘텐츠만 누구나 조회할 수 있다.

## 사이트 정보 수정

사이트명, 연락처, 회사 정보는 `src/lib/site.ts` 한 곳에서 바꾸면 전체에 반영됩니다.
현재 이메일과 사업자등록번호는 임시 값이므로 실제 값으로 교체해야 합니다.

## 정식 오픈 전 체크리스트 (테스트 기간 설정 해제)

현재는 테스트 기간이라 아래 제한이 걸려 있습니다. 정식 오픈할 때 풀어야 합니다.

- [ ] `src/lib/site.ts`의 `testMode`를 `false`로 변경 (테스트 안내 팝업, 검색엔진 차단 `noindex`와 `robots.txt` 해제)
- [ ] `src/lib/site.ts`의 `inquiryOpen`을 `true`로 변경 (문의 접수 재개)
- [ ] 문의를 열기 전에 개인정보처리방침 페이지 준비
- [ ] 전화번호, 대표명, 주소, 이메일, 사업자등록번호를 실제 값으로 교체
- [ ] `src/lib/site.ts`의 `channelUrl`(채널 주소)과 `channelVideos`(메인 채널 섹션 영상 목록)를 채움. 비어 있으면 메인에 "준비 중"으로 표시
- [ ] Supabase에 매물과 브랜드를 `published = true`로 등록
- [ ] Vercel 무료(Hobby) 플랜은 비상업 용도 전용이므로 상업 운영 전에 유료 플랜 확인

## 스크립트

| 명령 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint 검사 |
