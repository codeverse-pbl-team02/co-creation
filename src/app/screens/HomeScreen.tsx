import { useState } from "react";
import { MiniMap } from "../components/CourseMaps";
import { POPULARITY, WEEKLY } from "../data";
import { PetCertScreen, PetCertCompleteScreen } from "./CourseScreen";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, Cell,
} from "recharts";
import {
  MapPin, Navigation, Zap, Leaf, Award, Users, Star,
  ChevronRight, Check, Share2, Camera, TrendingUp,
  Clock, Target, Heart, Dog, Recycle, Shield, Globe,
  ArrowRight, Activity, Bell, Search, Settings, Play,
  Home, Map, BarChart2, Gift, ChevronLeft, Plus,
  Flame, Wind, Droplets, Timer, X, Filter, Bot
} from "lucide-react";

export function HomeScreen({ onStartCourse }: { onStartCourse: () => void }) {
  const todayStats = [
    { icon: <Timer className="w-4 h-4" />, label: "시간", val: "38:24", unit: "분" },
    { icon: <Flame className="w-4 h-4" />, label: "칼로리", val: "312", unit: "kcal" },
    { icon: <Activity className="w-4 h-4" />, label: "페이스", val: "5'32\"", unit: "/km" },
    { icon: <Wind className="w-4 h-4" />, label: "케이던스", val: "168", unit: "spm" },
  ];

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* AI Chatbot bar */}
      <div className="mx-4 mt-2 flex items-center gap-2.5 bg-card border border-border rounded-2xl px-4 py-3">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
          <Bot className="w-3 h-3 text-white" />
        </div>
        <span className="flex-1 text-sm text-muted-foreground/60 truncate">퇴근 후에 30분 동안 러닝 뛸 만한 코스 추천해줘.</span>
        <ArrowRight className="w-4 h-4 text-muted-foreground/40 shrink-0" />
      </div>

      {/* Today card — two separate containers side by side */}
      <div className="mx-4 flex gap-3">
        {/* Left card — route map image */}
        <div className="flex-1 rounded-3xl overflow-hidden bg-card border border-border flex flex-col shadow-sm">
          <div className="relative flex-1" style={{ minHeight: 140 }}>
            <img
              src="/gwangalli_seagull_map.png"
              alt="광안리 바다 갈매기런 드로잉 지도"
              className="w-full h-full object-cover"
            />
          </div>
          {/* footer */}
          <div className="px-3 py-2 flex items-center gap-3 border-t border-border bg-card">
            <span className="flex items-center gap-1 text-muted-foreground text-xs">
              <Heart className="w-3.5 h-3.5" /> 612
            </span>
            <span className="flex items-center gap-1 text-muted-foreground text-xs">
              <Users className="w-3.5 h-3.5" /> 10
            </span>
          </div>
        </div>

        {/* Right card — stats */}
        <div className="flex-1 rounded-3xl bg-card border border-border p-4 flex flex-col justify-between shadow-sm">
          {/* course label */}
          <div className="mb-3">
            <p className="text-[10px] text-muted-foreground font-medium mb-0.5">오늘의 러닝</p>
            <p className="font-bold text-foreground text-sm leading-tight">광안리 바다<br />갈매기런</p>
          </div>

          {/* stats list — big value + small label */}
          <div className="flex flex-col gap-3">
            {[
              { val: "5.2 km",      label: "Distance" },
              { val: "38:24",       label: "Duration" },
              { val: "5'32\"/km",   label: "Avg Pace" },
              { val: "142 bpm",     label: "Heart Rate" },
            ].map(({ val, label }) => (
              <div key={label}>
                <p className="font-black text-foreground text-base leading-none" style={{ fontFamily: "'Exo 2',sans-serif" }}>{val}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly AreaChart */}
      <div className="mx-4 bg-card border border-border rounded-3xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-sm text-foreground">이번 주 러닝</span>
          <span className="text-xs font-mono text-primary">총 31.3km</span>
        </div>
        <ResponsiveContainer width="100%" height={80}>
          <AreaChart data={WEEKLY}>
            <defs>
              <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60AEDD" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#60AEDD" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#7B8796" }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ background: "#FFFFFF", border: "1px solid #DCE3F1", borderRadius: "12px", color: "#17213D", fontSize: 11 }}
              formatter={(v: number) => [`${v}km`, ""]}
            />
            <Area
              type="monotone"
              dataKey="km"
              stroke="#60AEDD"
              strokeWidth={2}
              fill="url(#wg)"
              dot={(props: { cx: number; cy: number; index: number }) => {
                const { cx, cy, index } = props;
                const nonZero = WEEKLY.filter(d => d.km > 0);
                const maxKm = Math.max(...nonZero.map(d => d.km));
                const minKm = Math.min(...nonZero.map(d => d.km));
                const val = WEEKLY[index].km;
                const color = val === maxKm ? "#EF4444" : val > 0 && val === minKm ? "#22C55E" : "#60AEDD";
                const r = (val === maxKm || val === minKm) ? 5 : 3;
                return <circle key={index} cx={cx} cy={cy} r={r} fill={color} stroke="#fff" strokeWidth={1.5} />;
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 pt-3 border-t border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#6ACF98]/15 flex items-center justify-center text-lg shrink-0">🌍</div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-[#4CB57D] font-medium mb-0.5">오늘의 탄소 절감</p>
            <p className="text-xs font-bold text-foreground">4.2km 달려 <span className="text-[#4CB57D]">0.9kg CO₂</span> 절감</p>
          </div>
        </div>
      </div>

      {/* Popular time */}
      <div className="mx-4 bg-card border border-border rounded-3xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-sm text-foreground">오늘 인기 시간대</span>
          <span className="text-xs text-[#4CB57D] font-medium">지금은 여유 ✓</span>
        </div>
        <ResponsiveContainer width="100%" height={70}>
          <BarChart data={POPULARITY} barSize={18}>
            <XAxis dataKey="time" tick={{ fontSize: 9, fill: "#7B8796" }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Bar dataKey="v" radius={[4, 4, 0, 0]} label={false}>
              {(() => {
                const maxV = Math.max(...POPULARITY.map(d => d.v));
                const minV = Math.min(...POPULARITY.map(d => d.v));
                return POPULARITY.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.v === maxV ? "#EF4444" : entry.v === minV ? "#22C55E" : "#60AEDD"}
                  />
                ));
              })()}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-2 mt-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">🔥 오후 7시 피크</span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#6ACF98]/15 text-[#4CB57D] border border-[#6ACF98]/30">✅ 오전 6시 한산</span>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mx-5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-sm text-foreground">빠른 메뉴</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: "🗺️", label: "코스 탐색" },
            { icon: "🌸", label: "동백전" },
            { icon: "🐕", label: "반려견" },
            { icon: "♻️", label: "ESG" },
          ].map(({ icon, label }) => (
            <div key={label} className="bg-card border border-border rounded-2xl p-3 flex flex-col items-center gap-2 hover:border-primary/40 transition-colors cursor-pointer active:scale-95">
              <span className="text-2xl">{icon}</span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended course card */}
      <div className="mx-5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-sm text-foreground">AI 추천 코스</span>
          <span className="text-xs text-muted-foreground">현재 위치 : 강서구 명지동</span>
        </div>
        <div className="bg-gradient-to-br from-[#60AEDD]/12 to-white border border-[#DCE3F1] rounded-3xl p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#60AEDD]/15 text-[#3B91C1] border border-[#60AEDD]/25 font-medium">일반</span>
              <h3 className="font-bold text-foreground mt-1.5">강서구 돛단배 드로잉런</h3>
              <p className="text-xs text-muted-foreground">강서구 · 돛단배</p>
            </div>
            <span className="text-3xl">⛵</span>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1"><Target className="w-3 h-3 text-primary" />4.8km</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-primary" />35분</span>
            <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-primary" />288kcal</span>
          </div>
          <button onClick={onStartCourse} className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <Navigation className="w-4 h-4" />이 코스로 시작하기
          </button>
        </div>
      </div>


    </div>
  );
}



export function HomeRunningCompleteScreen({ onClose }: { onClose: () => void }) {
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
          <h2 className="text-2xl font-black text-foreground" style={{ fontFamily: "'Exo 2',sans-serif" }}>
            드로잉런 완성
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">강서구 돛단배 코스 인증 완료</p>
        </div>
        <button
          onClick={() => setPetFlow("cert")}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#6ACF98]/15 border border-[#6ACF98]/40 rounded-2xl text-xs font-bold text-[#35865E] hover:bg-[#6ACF98]/25 transition-colors shrink-0 mt-1"
        >
          🐕 반려견 인증
        </button>
      </div>

      {/* Drawing route card — gangseo map with route overlay */}
      <div className="mx-4 bg-card border border-border rounded-3xl overflow-hidden">
        <div className="relative h-[220px] overflow-hidden">
          <MiniMap />
        </div>
        <p className="text-center text-sm font-semibold text-[#6ACF98] py-3">돛단배 그림 경로</p>
      </div>

      {/* Stats */}
      <div className="mx-4 grid grid-cols-4 gap-2">
        {[
          { val: "4.60km", label: "거리" },
          { val: "27:42", label: "시간" },
          { val: "5'58\"", label: "평균" },
          { val: "321", label: "칼로리" },
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
          낙동강 둑방길 구간에서 페이스가 안정적이었고, 명지시장 구간 이후 심박이 점진적으로 안정되었습니다.
        </p>
      </div>

      {/* Local coupon */}
      <div className="mx-4 bg-[#F0FFF8] border border-[#6ACF98]/40 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#6ACF98] flex items-center justify-center shrink-0">
          <span className="text-lg">🪙</span>
        </div>
        <div>
          <p className="font-bold text-sm text-[#35865E]">지역 쿠폰 획득</p>
          <p className="text-xs text-[#35865E]/70 mt-0.5">명지시장 국밥 1,000원 할인</p>
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

// ─── Home Running Live Screen (강서구 돛단배 드로잉런) ────────

export function HomeRunningLiveScreen({ onDone }: { onDone: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background overflow-y-auto scrollbar-hide">
      {/* Map — 강서구 지도 + 갈색 경로 + ME 마커 (MiniMap과 동일) */}
      <div className="relative overflow-hidden" style={{ height: 380 }}>
        <MiniMap />
      </div>

      {/* Bottom panel */}
      <div className="flex flex-col gap-3 px-4 pt-4 pb-5 bg-background">
        <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
          <p className="font-bold text-red-600 text-sm">경로 이탈 12m</p>
          <p className="text-xs text-red-400 mt-0.5">낙동강 둑방길 방향으로 이동하세요.</p>
        </div>

        <div className="bg-[#17213D] rounded-2xl px-4 py-3">
          <p className="text-xs text-white/60 font-medium mb-0.5">AI 페이스 코칭</p>
          <p className="text-sm text-white font-medium">현재 페이스 유지 중입니다. 심박수가 안정적입니다.</p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[
            { val: "5'58\"", label: "페이스" },
            { val: "3.10", label: "거리" },
            { val: "18:30", label: "시간" },
            { val: "142", label: "심박" },
          ].map(({ val, label }) => (
            <div key={label} className="bg-card border border-border rounded-2xl py-3 flex flex-col items-center gap-0.5">
              <span className="text-base font-black text-foreground" style={{ fontFamily: "'Exo 2',sans-serif" }}>{val}</span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onDone}
          className="w-full py-4 bg-[#6ACF98] text-white rounded-2xl text-base font-bold hover:bg-[#57B884] transition-colors shadow-lg shadow-[#6ACF98]/25"
        >
          완료
        </button>
      </div>
    </div>
  );
}

// ─── Running Live Screen (광안리 바다 드로잉런) ────────────────

export function HomeCourseDetailScreen({ onBack, onStart }: { onBack: () => void; onStart: () => void }) {
  return (
    <div className="flex flex-col gap-0 pb-6">
      {/* Back button */}
      <div className="px-4 pt-1 pb-2">
        <button onClick={onBack} className="flex items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" />뒤로
        </button>
      </div>

      {/* Title row */}
      <div className="px-4 mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-foreground" style={{ fontFamily: "'Exo 2',sans-serif" }}>강서구 돛단배 드로잉런</h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#6ACF98]/15 border border-[#6ACF98]/40 text-[#35865E] text-xs font-bold">Membership</span>
      </div>

      {/* Map */}
      <div className="mx-4 rounded-3xl overflow-hidden border border-border" style={{ height: 220 }}>
        <MiniMap />
      </div>

      {/* Info sections */}
      <div className="px-4 mt-4 flex flex-col gap-3">
        {/* Landmark section */}
        <div className="bg-card border border-border rounded-3xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#6ACF98]/15 border border-[#6ACF98]/30 flex items-center justify-center text-xl shrink-0">📍</div>
            <div>
              <p className="font-bold text-foreground text-sm mb-1">생태 랜드마크 3곳 포함</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                낙동강 하구 철새도래지, 명지시장, 신호생태공원<br />인증 지점이 자동 표시됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* Coupon section */}
        <div className="bg-card border border-border rounded-3xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#6ACF98]/10 border border-[#6ACF98]/25 flex items-center justify-center text-xl shrink-0">🏪</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold text-foreground text-sm">주변 상권 추천</p>
                <span className="px-2 py-0.5 rounded-full bg-[#F4A43C]/20 border border-[#F4A43C]/40 text-[#B86F16] text-xs font-bold">Coupon</span>
              </div>
              <p className="text-xs text-muted-foreground">명지시장 국밥 10% · 강서낙지 음료 쿠폰</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="px-4 mt-4 flex flex-col gap-2.5">
        <button
          onClick={onStart}
          className="w-full py-4 bg-[#6ACF98] text-white rounded-2xl text-base font-bold hover:bg-[#57B884] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#6ACF98]/30"
        >
          <Navigation className="w-5 h-5" />러닝 시작
        </button>
      </div>
    </div>
  );
}

// ─── Course Detail Screen (광안리 바다 드로잉런) ───────────────
