-- Supabase SQL Editor에서 실행하세요.
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('franchise', 'location')),
  name text not null,
  phone text not null,
  details jsonb not null default '{}'::jsonb,
  message text,
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

-- 누구나 문의는 등록할 수 있지만, 조회/수정/삭제는 불가 (관리자는 대시보드 또는 service role로 확인)
create policy "anyone can insert inquiries"
  on public.inquiries for insert
  to anon
  with check (true);

-- 발굴 브랜드 (프랜차이즈 전수창업 사이트에 노출)
create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,            -- 예: 카페·음료, 치킨·분식, 주점, 무인매장
  tagline text not null,             -- 한 줄 소개
  summary text not null,             -- 상세 설명
  highlights text[] not null default '{}',   -- 추천 포인트
  cautions text[] not null default '{}',     -- 확인·유의 사항
  invest_total integer,              -- 총 창업비용(만원), 가맹점 상담 기준
  stores integer,                    -- 가맹점 수
  royalty text,                      -- 예: 월 30만원 정액
  training text,                     -- 예: 본사 교육 2주
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.brands enable row level security;

-- 공개(published) 브랜드만 누구나 조회 가능. 등록/수정은 Supabase 대시보드에서.
create policy "anyone can read published brands"
  on public.brands for select
  to anon
  using (published = true);

-- 입지분석 매물 (신규창업 상가매물·입지분석 사이트에 노출)
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  title text not null,                       -- 예: 범어동 먹자골목 1층 상가
  district text not null,                    -- 필터용 구·군. 예: 수성구
  location_note text not null,               -- 동 단위까지만. 예: 범어동 일대 (상세 주소 입력 금지)
  floor text,                                -- 예: 1층
  size_pyeong numeric,                       -- 전용 평수
  deposit integer,                           -- 보증금(만원)
  rent integer,                              -- 월세(만원)
  premium integer,                           -- 권리금(만원), 없으면 null
  recommended text[] not null default '{}',  -- 추천 업종
  status text not null default 'available' check (status in ('available', 'reserved', 'closed')),
  summary text not null,                     -- 분석 요약
  score_traffic smallint check (score_traffic between 1 and 5),      -- 유동인구
  score_demand smallint check (score_demand between 1 and 5),        -- 배후 수요
  score_competition smallint check (score_competition between 1 and 5), -- 경쟁 여건 (높을수록 유리)
  score_access smallint check (score_access between 1 and 5),        -- 접근성·가시성
  score_rent smallint check (score_rent between 1 and 5),            -- 임대 조건 (높을수록 유리)
  pros text[] not null default '{}',
  risks text[] not null default '{}',
  analyzed_at date,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.listings enable row level security;

create policy "anyone can read published listings"
  on public.listings for select
  to anon
  using (published = true);

-- 완성 사례 (신규창업 종합 컨설팅 사이트의 "우리가 만든 공간" 갤러리)
-- 사진은 Storage 버킷 'projects'에 업로드한 뒤 public URL을 images에 넣으세요. (첫 번째 이미지가 대표 사진)
insert into storage.buckets (id, name, public)
values ('projects', 'projects', true)
on conflict (id) do nothing;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,                       -- 예: 범어동 디저트 카페
  category text not null,                    -- 업종. 예: 카페, 한식, 미용실
  district text,                             -- 예: 수성구
  summary text not null,                     -- 작업 소개 (콘셉트, 우리가 한 일)
  services text[] not null default '{}',     -- 진행 범위. 예: 입지분석, 아이덴티티, 인테리어, 마케팅
  images text[] not null default '{}',       -- 사진 public URL 목록
  completed_at date,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "anyone can read published projects"
  on public.projects for select
  to anon
  using (published = true);

-- 유튜브 영상 (프랜차이즈 전수창업 사이트의 영상 섹션, 맨 위 한 개만 노출. 테이블 이름은 예전 그대로 playlists)
create table if not exists public.playlists (
  id uuid primary key default gen_random_uuid(),
  title text not null,               -- 영상 제목
  description text,                  -- 한 줄 소개
  url text not null,                 -- 유튜브 영상 주소(https://www.youtube.com/watch?v=... 또는 https://youtu.be/...) 또는 11자리 영상 ID
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.playlists enable row level security;

create policy "anyone can read published playlists"
  on public.playlists for select
  to anon
  using (published = true);

-- 매물 사진·특이사항 (이미 listings 테이블을 만든 경우 아래만 추가로 실행하세요)
-- 사진은 Storage 버킷 'listings'에 업로드한 뒤 public URL을 images에 넣으세요. (첫 번째 이미지가 대표 사진)
alter table public.listings add column if not exists images text[] not null default '{}';
alter table public.listings add column if not exists notes text;  -- 특이사항 (권리금 협의, 건물 유의사항 등)

insert into storage.buckets (id, name, public)
values ('listings', 'listings', true)
on conflict (id) do nothing;
