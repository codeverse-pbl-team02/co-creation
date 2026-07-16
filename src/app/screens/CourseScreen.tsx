import { useEffect, useState } from "react";
import petRunImg from "@/imports/image-7.png";
import { GwangalliMap, MiniMap } from "../components/CourseMaps";
import { COURSES } from "../data";
import {
  MapPin, Navigation, Zap, Leaf, Award, Users, Star,
  ChevronRight, Check, Share2, Camera, TrendingUp,
  Clock, Target, Heart, Dog, Recycle, Shield, Globe,
  ArrowRight, Activity, Bell, Search, Settings, Play,
  Home, Map, BarChart2, Gift, ChevronLeft, Plus,
  Flame, Wind, Droplets, Timer, X, Filter, Bot,
  MessageSquare
} from "lucide-react";

import courseImg1 from "@/imports/seagull_run.png";
import courseImg2 from "@/imports/duck_run.png";
import courseImg3 from "@/imports/heart_run.png";
import courseImg4 from "@/imports/dolphin_run.png";
import gwangalliMap from "@/imports/image-2.png";

const COURSE_IMAGES: Record<number, string> = {
  1: courseImg1,
  2: courseImg2,
  3: courseImg3,
  4: courseImg4,
};

export function PetCertCompleteScreen({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col gap-4 pb-6 pt-4">
      {/* Title */}
      <div className="px-4 pt-2">
        <h2 className="text-2xl font-black text-foreground" style={{ fontFamily: "'Exo 2',sans-serif" }}>
          드로잉런 완성
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">반려견 동반 드로잉런 인증 완료 🐕</p>
      </div>

      {/* Pet photo */}
      <div className="mx-4 rounded-3xl overflow-hidden border border-border" style={{ height: 500 }}>
        <img src={petRunImg} alt="반려견 러닝 사진" className="w-full h-full object-cover"/>
      </div>

      {/* Stats */}
      <div className="mx-4 grid grid-cols-4 gap-2">
        {[
          { val: "5.01km", label: "거리" },
          { val: "25:19", label: "시간" },
          { val: "5'03\"", label: "평균" },
          { val: "365", label: "칼로리" },
        ].map(({ val, label }) => (
          <div key={label} className="bg-card border border-border rounded-2xl py-3 flex flex-col items-center gap-0.5">
            <span className="text-sm font-black text-foreground" style={{ fontFamily: "'Exo 2',sans-serif" }}>{val}</span>
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      {/* AI analysis */}
      <div className="mx-4 bg-card border border-border rounded-2xl p-4">
        <p className="font-bold text-sm text-foreground mb-1.5">AI 러닝 구간 분석</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          반려견 동반 구간에서 페이스가 안정적으로 유지되었으며, 전반적으로 심박수가 이상적인 범위에서 유지되었습니다.
        </p>
      </div>
      
      {/* Badge acquired */}
      <div className="mx-4 bg-gradient-to-br from-[#6ACF98]/15 to-[#F0FFF8] border border-[#6ACF98]/40 rounded-3xl p-6 flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-3xl bg-[#F7D66C]/20 border-2 border-[#F7D66C]/50 flex items-center justify-center text-5xl">🐾</div>
        <div className="text-center">
          <p className="font-black text-base text-foreground">반려견 파트너 배지 획득!</p>
          <p className="text-xs text-muted-foreground mt-1">반려견과 함께 드로잉런을 완주했습니다</p>
        </div>
        <span className="px-4 py-1.5 rounded-full bg-[#F7D66C]/25 border border-[#F7D66C]/50 text-xs font-bold text-[#B86F16]">🌸 동백전 +200P 적립 완료</span>
      </div>      

      {/* Coupon */}
      <div className="mx-4 bg-[#F0FFF8] border border-[#6ACF98]/40 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#6ACF98] flex items-center justify-center shrink-0">
          <span className="text-lg">🪙</span>
        </div>
        <div>
          <p className="font-bold text-sm text-[#35865E]">지역 쿠폰 획득</p>
          <p className="text-xs text-[#35865E]/70 mt-0.5">바다뷰 카페 파도 아메리카노 30% 할인</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mx-4 flex gap-2.5">
        <button className="flex-1 py-4 bg-[#6ACF98] text-white rounded-2xl text-sm font-bold hover:bg-[#57B884] transition-colors">
          SNS 공유
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-4 bg-[#17213D] text-white rounded-2xl text-sm font-bold hover:bg-[#0F1828] transition-colors"
        >
          인증샷 저장
        </button>
      </div>
    </div>
  );
}

// ─── Running Complete Screen ───────────────────────────────

export function PetCertScreen({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
  return (
    <div className="flex flex-col gap-4 pb-6 pt-2">
      <div className="px-4 pt-1 pb-0">
        <button onClick={onBack} className="flex items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4"/>뒤로
        </button>
      </div>
      <div className="px-4">
        <h2 className="text-2xl font-black text-foreground" style={{ fontFamily: "'Exo 2',sans-serif" }}>반려견 인증</h2>
        <p className="text-sm text-muted-foreground mt-0.5">반려견과 함께한 드로잉런을 인증해보세요</p>
      </div>

      {/* Upload area */}
      <div className="mx-4 border-2 border-dashed border-[#6ACF98]/60 bg-[#F0FFF8] rounded-3xl flex flex-col items-center justify-center gap-3 py-12">
        <div className="w-16 h-16 rounded-2xl bg-[#6ACF98]/20 flex items-center justify-center text-4xl">🐕</div>
        <p className="font-bold text-sm text-[#35865E]">반려견 사진 촬영</p>
        <p className="text-xs text-muted-foreground">러닝을 함께한 반려견 사진을 촬영해주세요</p>
        <button className="px-5 py-2.5 bg-[#6ACF98] text-white rounded-xl text-sm font-bold hover:bg-[#57B884] transition-colors flex items-center gap-2">
          <Camera className="w-4 h-4"/>사진 촬영
        </button>
      </div>

      {/* Info cards */}
      <div className="mx-4 flex flex-col gap-3">
        <div className="bg-card border border-border rounded-2xl p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#6ACF98]/15 border border-[#6ACF98]/30 flex items-center justify-center text-lg shrink-0">🏅</div>
          <div>
            <p className="font-bold text-sm text-foreground mb-0.5">반려견 파트너 배지 획득</p>
            <p className="text-xs text-muted-foreground">인증 완료 시 반려견 파트너 배지가 지급됩니다.</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#F7D66C]/20 border border-[#F7D66C]/45 flex items-center justify-center text-lg shrink-0">🌸</div>
          <div>
            <p className="font-bold text-sm text-foreground mb-0.5">동백전 200P 추가 적립</p>
            <p className="text-xs text-muted-foreground">반려견 동반 인증 시 보너스 포인트가 적립됩니다.</p>
          </div>
        </div>
      </div>

      <div className="mx-4">
        <button onClick={onSubmit} className="w-full py-4 bg-[#6ACF98] text-white rounded-2xl text-base font-bold hover:bg-[#57B884] transition-colors shadow-lg shadow-[#6ACF98]/25">
          인증 제출
        </button>
      </div>
    </div>
  );
}


function RunningCompleteScreen({ onClose }: { onClose: () => void }) {
  const [petFlow, setPetFlow] = useState<null | "cert" | "complete">(null);

  if (petFlow === "cert") {
    return <PetCertScreen onBack={() => setPetFlow(null)} onSubmit={() => setPetFlow("complete")} />;
  }
  if (petFlow === "complete") {
    return <PetCertCompleteScreen onClose={onClose} />;
  }

  return (
    <div className="flex flex-col gap-4 pb-6 pt-4">
      {/* Title */}
      <div className="px-4 pt-2 flex items-start justify-between">
        <div>
          <h2
            className="text-2xl font-black text-foreground"
            style={{ fontFamily: "'Exo 2',sans-serif" }}
          >
            드로잉런 완성
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            광안리 바다 드로잉런 인증 완료
          </p>
        </div>
        <button
          onClick={() => setPetFlow("cert")}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#6ACF98]/15 border border-[#6ACF98]/40 rounded-2xl text-xs font-bold text-[#35865E] hover:bg-[#6ACF98]/25 transition-colors shrink-0 mt-1"
        >
          🐕 반려견 인증
        </button>
      </div>

      {/* Drawing route image card */}
      <div className="mx-4 bg-card border border-border rounded-3xl overflow-hidden">
        <div className="relative bg-[#EEF6FF] h-[220px] overflow-hidden">
          <img
            src={gwangalliMap}
            alt="광안리 바다 드로잉 경로"
            className="absolute inset-0 h-full w-full object-cover object-[center_42%]"
          />
        </div>
        <p className="text-center text-sm font-semibold text-[#60AEDD] py-3">
          광안리 바다 드로잉 경로
        </p>
      </div>

      {/* Stats */}
      <div className="mx-4 grid grid-cols-4 gap-2">
        {[
          { val: "3.82km", label: "거리" },
          { val: "32:14", label: "시간" },
          { val: "6'12\"", label: "평균" },
          { val: "284", label: "칼로리" },
        ].map(({ val, label }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-2xl py-3 flex flex-col items-center gap-0.5"
          >
            <span
              className="text-sm font-black text-foreground"
              style={{ fontFamily: "'Exo 2',sans-serif" }}
            >
              {val}
            </span>
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      {/* AI analysis */}
      <div className="mx-4 bg-card border border-border rounded-2xl p-4">
        <p className="font-bold text-sm text-foreground mb-1.5">
          AI 러닝 구간 분석
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          해변 직선 구간에서 페이스가 안정적이었고, 반환점 이후 심박 상승이 관찰되었습니다.
        </p>
      </div>

      {/* Local coupon */}
      <div className="mx-4 bg-[#FFF9EC] border border-[#F7D66C]/50 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#F7D66C] flex items-center justify-center shrink-0">
          <span className="text-lg">🪙</span>
        </div>
        <div>
          <p className="font-bold text-sm text-[#B86F16]">지역 쿠폰 획득</p>
          <p className="text-xs text-[#B86F16]/70 mt-0.5">
            블루웨이 카페 아메리카노 1,000원 할인
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mx-4 flex gap-2.5">
        <button className="flex-1 py-4 bg-[#60AEDD] text-white rounded-2xl text-sm font-bold hover:bg-[#4A9DCC] transition-colors">
          SNS 공유
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-4 bg-[#17213D] text-white rounded-2xl text-sm font-bold hover:bg-[#0F1828] transition-colors"
        >
          인증샷 저장
        </button>
      </div>
    </div>
  );
}
// ─── Home Running Complete Screen (강서구 돛단배 드로잉런) ──────

function RunningLiveScreen({ onDone }: { onDone: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
      {/* Map */}
      <div className="relative flex-1 overflow-hidden bg-[#EEF2F7]">
        <img
          src={gwangalliMap}
          alt="광안리 러닝 라이브 지도"
          className="absolute inset-0 h-full w-full object-cover object-[center_42%]"
        />

        <svg
          viewBox="0 0 400 340"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="livePin" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="3"
                floodColor="#17213D"
                floodOpacity="0.24"
              />
            </filter>
          </defs>

          {/* Smaller ME pin */}
          <g transform="translate(195, 148) scale(0.45)" filter="url(#livePin)">
            <path
              d="M0 -30 C16 -30 28 -18 28 -2 C28 19 5 34 0 46 C-5 34 -28 19 -28 -2 C-28 -18 -16 -30 0 -30 Z"
              fill="#FF2F86"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <circle cx="0" cy="-3" r="16" fill="#FFFFFF" />
            <text
              x="0"
              y="2"
              textAnchor="middle"
              fontSize="9"
              fill="#17213D"
              fontFamily="Noto Sans KR"
              fontWeight="900"
            >
              ME
            </text>
          </g>
        </svg>
      </div>

      {/* Bottom panel */}
      <div className="shrink-0 bg-background flex flex-col gap-3 px-4 pt-4 pb-5">
        <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
          <p className="font-bold text-red-600 text-sm">경로 이탈 18m</p>
          <p className="text-xs text-red-400 mt-0.5">
            오른쪽 해변 산책로로 이동하세요.
          </p>
        </div>

        <div className="bg-[#17213D] rounded-2xl px-4 py-3">
          <p className="text-xs text-white/60 font-medium mb-0.5">
            AI 페이스 코칭
          </p>
          <p className="text-sm text-white font-medium">
            속도를 조금 낮춰보세요. 심박이 목표보다 높습니다.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[
            { val: "5'42\"", label: "페이스" },
            { val: "2.34", label: "거리" },
            { val: "18:20", label: "시간" },
            { val: "148", label: "심박" },
          ].map(({ val, label }) => (
            <div
              key={label}
              className="bg-card border border-border rounded-2xl py-3 flex flex-col items-center gap-0.5"
            >
              <span
                className="text-base font-black text-foreground"
                style={{ fontFamily: "'Exo 2',sans-serif" }}
              >
                {val}
              </span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onDone}
          className="w-full py-4 bg-[#60AEDD] text-white rounded-2xl text-base font-bold hover:bg-[#4A9DCC] transition-colors shadow-lg shadow-[#60AEDD]/25"
        >
          완료
        </button>
      </div>
    </div>
  );
}
// ─── Course Detail Screen ──────────────────────────────────
// ─── Home Course Detail Screen (강서구 돛단배 드로잉런) ────────

function CourseDetailScreen({ onBack, onStart }: { onBack: () => void; onStart: () => void }) {
  return (
    <div className="flex flex-col gap-0 pb-6">
      {/* Back button */}
      <div className="px-4 pt-1 pb-2">
        <button onClick={onBack} className="flex items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4"/>뒤로
        </button>
      </div>

      {/* Title row */}
      <div className="px-4 mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-foreground" style={{ fontFamily: "'Exo 2',sans-serif" }}>광안리 바다 드로잉런 관광 ver</h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#6ACF98]/15 border border-[#6ACF98]/40 text-[#35865E] text-xs font-bold">Free</span>
      </div>

      {/* Map */}
      <div className="mx-4 rounded-3xl overflow-hidden border border-border" style={{ height: 220 }}>
        <GwangalliMap />
      </div>

      {/* Info sections */}
      <div className="px-4 mt-4 flex flex-col gap-3">
        {/* Landmark section */}
        <div className="bg-card border border-border rounded-3xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F4A43C]/15 border border-[#F4A43C]/30 flex items-center justify-center text-xl shrink-0">📍</div>
            <div>
              <p className="font-bold text-foreground text-sm mb-1">관광 랜드마크 3곳 포함</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                광안대교 포토스팟, 민락수변공원, 카페거리 인증 지점이<br/>자동 표시됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* Coupon section */}
        <div className="bg-card border border-border rounded-3xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#60AEDD]/10 border border-[#60AEDD]/25 flex items-center justify-center text-xl shrink-0">🏪</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold text-foreground text-sm">주변 상권 추천</p>
                <span className="px-2 py-0.5 rounded-full bg-[#F4A43C]/20 border border-[#F4A43C]/40 text-[#B86F16] text-xs font-bold">Coupon</span>
              </div>
              <p className="text-xs text-muted-foreground">블루웨이 카페 10% · 민락분식 음료 쿠폰</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="px-4 mt-4 flex flex-col gap-2.5">
        <button
          onClick={onStart}
          className="w-full py-4 bg-[#60AEDD] text-white rounded-2xl text-base font-bold hover:bg-[#4A9DCC] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#60AEDD]/30"
        >
          <Navigation className="w-5 h-5"/>러닝 시작
        </button>
        <button className="w-full py-4 bg-[#17213D] text-white rounded-2xl text-base font-bold hover:bg-[#0F1828] transition-colors flex items-center justify-center gap-2">
          <Zap className="w-5 h-5"/>AI 맞춤 도안 생성
        </button>
      </div>
    </div>
  );
}


export function CourseScreen({ setHideScreenTitle }: { setHideScreenTitle: (hide: boolean) => void }) {
  const [filter, setFilter] = useState("전체");
  const [intensity, setIntensity] = useState(1);
  const [dist, setDist] = useState(5);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [selectedCommentCourse, setSelectedCommentCourse] = useState<any | null>(null);
  const [sortBy, setSortBy] = useState("rating");
  const filters = ["전체", "생활권", "관광", "공원", "반려견"];

  useEffect(() => {
    setHideScreenTitle(completed);
    return () => setHideScreenTitle(false);
  }, [completed, setHideScreenTitle]);

  const getSortedCourses = () => {
    let list = filter === "전체" ? COURSES : COURSES.filter(c => c.type === filter || (filter === "반려견" && c.name.includes("생태")));
    
    if (sortBy === "rating") {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === "reviews") {
      return [...list].sort((a, b) => b.reviews - a.reviews);
    }
    if (sortBy === "dist") {
      return [...list].sort((a, b) => (a.userDist || 0) - (b.userDist || 0));
    }
    if (sortBy === "time") {
      const parseTime = (t: string) => parseInt(t.replace(/[^0-9]/g, '')) || 0;
      return [...list].sort((a, b) => parseTime(a.time) - parseTime(b.time));
    }
    return list;
  };

  const sorted = getSortedCourses();

  if (completed) {
    return <RunningCompleteScreen onClose={() => { setCompleted(false); setSelectedCourseId(null); }} />;
  }

  if (running) {
    return <RunningLiveScreen onDone={() => { setRunning(false); setCompleted(true); }} />;
  }

  if (selectedCourseId === 1) {
    return <CourseDetailScreen onBack={() => setSelectedCourseId(null)} onStart={() => setRunning(true)} />;
  }

  return (
    <div className="flex flex-col gap-0 pb-4 relative">
      {/* Map area */}
      <div className="mx-4 mt-2 rounded-3xl overflow-hidden border border-border bg-card relative" style={{ height: 200 }}>
        <MiniMap />
        {/* Search bar overlay */}
        <div className="absolute top-3 left-3 right-3">
          <div className="flex items-center gap-2 bg-card/95 backdrop-blur-sm border border-border rounded-2xl px-3 py-2 shadow-lg">
            <Search className="w-4 h-4 text-muted-foreground shrink-0"/>
            <span className="text-sm text-muted-foreground flex-1">코스 또는 지역 검색</span>
            <button onClick={() => setShowFilter(!showFilter)} className="w-7 h-7 rounded-xl bg-primary/15 flex items-center justify-center">
              <Filter className="w-3.5 h-3.5 text-primary"/>
            </button>
          </div>
        </div>
        {/* Route badges */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm border border-primary/30 text-primary text-xs font-semibold">강서구청 루프 4.6km</span>
          <span className="px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm border border-accent/30 text-accent text-xs font-semibold">대저 생태런 6.8km</span>
        </div>
      </div>

      {/* Filter panel */}
      {showFilter && (
        <div className="mx-4 mt-3 bg-card border border-border rounded-3xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-foreground">필터 설정</span>
            <button onClick={() => setShowFilter(false)}><X className="w-4 h-4 text-muted-foreground"/></button>
          </div>
          <div>
            <label className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2 block">목표 거리: {dist}km</label>
            <input type="range" min={1} max={15} value={dist} onChange={e => setDist(Number(e.target.value))} className="w-full accent-primary"/>
          </div>
          <div>
            <label className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2 block">운동 강도</label>
            <div className="flex gap-2">
              {["여유", "보통", "강도"].map((l, i) => (
                <button key={l} onClick={() => setIntensity(i)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${intensity === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold">AI 코스 추천받기</button>
        </div>
      )}

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${filter === f ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "bg-card border border-border text-muted-foreground"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Sort selector dropdown */}
      <div className="flex items-center justify-between px-4 pb-2.5 text-xs text-muted-foreground">
        <span>총 {sorted.length}개의 코스</span>
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-muted-foreground">정렬:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-card text-foreground font-bold border border-border rounded-none px-2.5 py-1 focus:outline-none cursor-pointer text-xs"
          >
            <option value="rating">★ 별점 높은 순</option>
            <option value="reviews">🔥 많이 이용한 순</option>
            <option value="dist">📍 가까운 순</option>
            <option value="time">⏱ 코스 시간이 짧은 순</option>
          </select>
        </div>
      </div>

      {/* Course list */}
      <div className="flex flex-col gap-3 px-4">
        {sorted.map(c => (
          <div key={c.id} className={`bg-gradient-to-br ${c.cardBg} border ${c.border} rounded-3xl p-4 hover:scale-[1.01] transition-transform cursor-pointer active:scale-[0.99]`}>
            {/* Course Photo */}
            <div className="w-full h-32 rounded-2xl overflow-hidden mb-3.5 relative">
              <img
                src={COURSE_IMAGES[c.id]}
                alt={c.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.border} bg-card/30 text-muted-foreground`}>{c.type}</span>
                  <span className={`text-xs font-bold ${c.diffColor}`}>{c.diff}</span>
                  <span className="text-xs text-[#D7A72E] font-mono">★ {c.rating}</span>
                </div>
                <h3 className="font-bold text-foreground truncate pr-2">{c.name}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                  <span>{c.area}</span>
                  <span className="text-muted-foreground/30">•</span>
                  <span className="text-primary font-semibold">내 위치에서 {c.userDist}km</span>
                </p>
              </div>
              <span className="text-3xl shrink-0">{c.icon}</span>
            </div>

            <div className="flex gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><Target className="w-3 h-3 text-primary"/>{c.dist}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-primary"/>{c.time}</span>
              <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-primary"/>{c.cal}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {c.tags.map(t => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 rounded-full border border-amber-300 bg-amber-50 text-amber-800 font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCourseId(c.id)}
                className={`flex-1 py-2.5 bg-gradient-to-r ${c.color} text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5`}
              >
                <Navigation className="w-3.5 h-3.5"/>코스 시작
              </button>
              <button className="w-10 h-10 rounded-xl border border-border bg-card/50 flex items-center justify-center">
                <Heart className="w-4 h-4 text-muted-foreground"/>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCommentCourse(c);
                }}
                className="w-10 h-10 rounded-xl border border-border bg-card/50 flex items-center justify-center hover:bg-muted transition-colors active:scale-95"
              >
                <MessageSquare className="w-4 h-4 text-muted-foreground"/>
              </button>
              <button className="w-10 h-10 rounded-xl border border-border bg-card/50 flex items-center justify-center">
                <Share2 className="w-4 h-4 text-muted-foreground"/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Modal overlay */}
      {selectedCommentCourse && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end justify-center">
          <div className="w-full bg-background rounded-t-[32px] border-t border-border p-5 flex flex-col max-h-[70%] shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-base text-foreground">{selectedCommentCourse.name}</h4>
                <p className="text-xs text-muted-foreground">러너들의 추천 코멘트 💬</p>
              </div>
              <button
                onClick={() => setSelectedCommentCourse(null)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body (Comments list) */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 pb-4">
              {selectedCommentCourse.comments && selectedCommentCourse.comments.length > 0 ? (
                selectedCommentCourse.comments.map((comment: any, idx: number) => (
                  <div key={idx} className="bg-card border border-border rounded-2xl p-3.5 flex gap-3 items-start shadow-sm">
                    <span className="text-xl shrink-0">🏃</span>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-foreground">{comment.nickname}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{comment.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground text-center py-8">아직 등록된 코멘트가 없습니다.</p>
              )}
            </div>

            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedCommentCourse(null)}
              className="w-full py-4 bg-[#17213D] text-white rounded-2xl text-sm font-bold hover:bg-[#0F1828] transition-colors shrink-0"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

