import { useState } from "react";
import { BADGES, WEEKLY } from "../data";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area, CartesianGrid,
} from "recharts";
import {
  MapPin, Navigation, Zap, Leaf, Award, Users, Star,
  ChevronRight, Check, Share2, Camera, TrendingUp,
  Clock, Target, Heart, Dog, Recycle, Shield, Globe,
  ArrowRight, Activity, Bell, Search, Settings, Play,
  Home, Map, BarChart2, Gift, ChevronLeft, Plus,
  Flame, Wind, Droplets, Timer, X, Filter, Bot
} from "lucide-react";

export function RecordScreen() {
  const [activeTab, setActiveTab] = useState<"기록" | "배지" | "랭킹">("기록");
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(7);
  const [selectedWeek, setSelectedWeek] = useState<"all" | "1w" | "2w" | "3w" | "4w">("all");
  const [repBadge, setRepBadge] = useState<string>("댕댕 파트너");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const BADGE_LIST = [
    { label: "첫 걸음의 순간", icon: "👟", bg: "bg-emerald-100/70 border border-emerald-200/70", earned: true },
    { label: "댕댕 파트너", icon: "🐶", bg: "bg-amber-100/80 border border-amber-300/80", earned: true },
    { label: "지구 수호 플로깅", icon: "🌿", bg: "bg-green-100/70 border border-green-200/70", earned: true },
    { label: "바다 드로잉런", icon: "🌊", bg: "bg-cyan-100/70 border border-cyan-200/70", earned: true },
    { label: "연속 7일 달리기", icon: "⚡", bg: "bg-indigo-100/70 border border-indigo-200/70", earned: true },
    { label: "새벽 공기 마니아", icon: "🌅", bg: "bg-rose-100/70 border border-rose-200/70", earned: true },
    { label: "월간 50km 클럽", icon: "🔒", bg: "bg-slate-100 border border-slate-200/60", isLock: true },
    { label: "야간 안전 러너", icon: "🔒", bg: "bg-slate-100 border border-slate-200/60", isLock: true },
    { label: "마라톤 전설 100km", icon: "🔒", bg: "bg-slate-100 border border-slate-200/60", isLock: true },
  ];

  const currentRep = BADGE_LIST.find(b => b.label === repBadge) || BADGE_LIST[1];

  const handleBadgeClick = (badge: typeof BADGE_LIST[0]) => {
    if (!badge.earned) {
      setToastMsg(`🔒 '${badge.label}' 배지는 아직 미획득 상태입니다.`);
      setTimeout(() => setToastMsg(null), 2500);
      return;
    }
    setRepBadge(badge.label);
    setToastMsg(`🎉 대표 배지가 '${badge.label}'(으)로 변경되었습니다!`);
    setTimeout(() => setToastMsg(null), 2500);
  };

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Summary card - Pastel Lime / Green Gauge Style with Year/Month Navigation */}
      {(() => {
        const THIS_YEAR = 2026;
        const isCurrentYear = currentYear === THIS_YEAR;

        const MONTHLY_STATS: Record<number, {
          totalKm: number;
          targetKm: number;
          rate: number;
          runs: number;
          kcal: number;
        }> = {
          7: { totalKm: 124.6, targetKm: 150, rate: 83, runs: 38, kcal: 8420 },
          6: { totalKm: 140.2, targetKm: 150, rate: 93, runs: 42, kcal: 9150 },
          5: { totalKm: 118.5, targetKm: 150, rate: 79, runs: 35, kcal: 7800 },
          4: { totalKm: 105.0, targetKm: 150, rate: 70, runs: 32, kcal: 7200 },
          3: { totalKm: 132.8, targetKm: 150, rate: 88, runs: 40, kcal: 8900 },
          2: { totalKm: 98.4, targetKm: 150, rate: 65, runs: 29, kcal: 6500 },
          1: { totalKm: 110.6, targetKm: 150, rate: 73, runs: 33, kcal: 7400 },
          12: { totalKm: 128.0, targetKm: 150, rate: 85, runs: 39, kcal: 8600 },
          11: { totalKm: 115.4, targetKm: 150, rate: 76, runs: 34, kcal: 7700 },
        };

        const monthData = MONTHLY_STATS[currentMonth] || {
          totalKm: 110.0,
          targetKm: 150,
          rate: 73,
          runs: 30,
          kcal: 7400
        };

        const remainingKm = Math.max(0, monthData.targetKm - monthData.totalKm).toFixed(1);

        const handlePrevMonth = () => {
          if (currentMonth > 1) {
            setCurrentMonth(prev => prev - 1);
          } else {
            setCurrentYear(prev => prev - 1);
            setCurrentMonth(12);
          }
        };

        const handleNextMonth = () => {
          if (currentYear === THIS_YEAR && currentMonth >= 7) return;
          if (currentMonth < 12) {
            setCurrentMonth(prev => prev + 1);
          } else {
            setCurrentYear(prev => prev + 1);
            setCurrentMonth(1);
          }
        };

        const displayTitle = isCurrentYear
          ? `${currentMonth}월 누적 기록`
          : `${currentYear}년 ${currentMonth}월 누적 기록`;

        const isNextDisabled = currentYear === THIS_YEAR && currentMonth >= 7;

        return (
          <div className="mx-4 mt-2 bg-[#E7F7D4] border border-[#D3EDB5] rounded-3xl p-5 shadow-xs relative overflow-hidden transition-all">
            {/* Month Navigation Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevMonth}
                  className="p-1 rounded-full hover:bg-white/60 text-lime-950 font-bold transition-colors"
                  title="이전 달"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-black text-lime-950 tracking-tight">
                  {displayTitle}
                </span>
                <button
                  onClick={handleNextMonth}
                  disabled={isNextDisabled}
                  className={`p-1 rounded-full transition-colors ${
                    isNextDisabled
                      ? "opacity-30 cursor-not-allowed text-slate-400"
                      : "hover:bg-white/60 text-lime-950 font-bold"
                  }`}
                  title="다음 달"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <span className="text-[11px] font-extrabold text-lime-800 bg-white/75 px-2.5 py-0.5 rounded-full shadow-2xs">
                월 목표 {monthData.targetKm}km 기준
              </span>
            </div>

            {/* Main Content: Left Rate % & Right Circular Gauge */}
            <div className="flex items-center justify-between my-2">
              {/* Left Percentage Rate (Enlarged Font Size) */}
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-lime-950 font-mono tracking-tight">
                    {monthData.rate}%
                  </span>
                  <span className="text-sm font-extrabold text-lime-800 ml-1 flex items-center gap-1">
                    달성 🎉
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-lime-800/90 mt-1">
                  {monthData.rate >= 100 ? "🎉 목표 초과 달성!" : `목표 달성까지 ${remainingKm}km 남음!`}
                </p>
              </div>

              {/* Right Enlarged Circular Donut Gauge */}
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#D2EEB3"
                    strokeWidth="9"
                    fill="transparent"
                  />
                  {/* Progress Bar */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#65A30D"
                    strokeWidth="9"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 38}
                    strokeDashoffset={2 * Math.PI * 38 * (1 - Math.min(100, monthData.rate) / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                {/* Inner Circular White Badge */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-full m-2.5 shadow-inner text-center">
                  <span className="text-[9px] font-bold text-slate-400 leading-none mb-0.5">현재</span>
                  <span className="text-sm font-black text-lime-950 font-mono leading-tight">{monthData.totalKm}<span className="text-[9px] font-bold text-slate-500 ml-0.5">km</span></span>
                  <div className="w-6 h-px bg-slate-200 my-0.5" />
                  <span className="text-[9px] font-bold text-slate-400 leading-none">목표 {monthData.targetKm}km</span>
                </div>
              </div>
            </div>

            {/* Sub Metrics (Total Distance, Run Count, Kcal) */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#D3EDB5]/90">
              <div className="bg-white/80 rounded-2xl py-2 px-2 text-center shadow-2xs border border-white/40">
                <p className="text-[10px] font-bold text-lime-800/90 flex items-center justify-center gap-0.5">
                  <span>📍</span> 총 누적거리
                </p>
                <p className="text-xs font-black text-lime-950 font-mono mt-0.5">{monthData.totalKm} <span className="text-[9px] font-normal">km</span></p>
              </div>
              <div className="bg-white/80 rounded-2xl py-2 px-2 text-center shadow-2xs border border-white/40">
                <p className="text-[10px] font-bold text-lime-800/90 flex items-center justify-center gap-0.5">
                  <span>🏃</span> 러닝 횟수
                </p>
                <p className="text-xs font-black text-lime-950 font-mono mt-0.5">{monthData.runs} <span className="text-[9px] font-normal">회</span></p>
              </div>
              <div className="bg-white/80 rounded-2xl py-2 px-2 text-center shadow-2xs border border-white/40">
                <p className="text-[10px] font-bold text-lime-800/90 flex items-center justify-center gap-0.5">
                  <span>🔥</span> 소모 칼로리
                </p>
                <p className="text-xs font-black text-lime-950 font-mono mt-0.5">{monthData.kcal.toLocaleString()} <span className="text-[9px] font-normal">kcal</span></p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Sub tabs */}
      <div className="flex gap-2 px-4">
        {(["기록", "배지", "랭킹"] as const).map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === t ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"}`}>
            {t}
          </button>
        ))}
      </div>

      {activeTab === "기록" && (
        <div className="px-4 flex flex-col gap-4">
          {/* Week Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: "all", label: `${currentMonth}월 전체` },
              { id: "1w", label: "1주차" },
              { id: "2w", label: "2주차" },
              { id: "3w", label: "3주차" },
              { id: "4w", label: "4주차" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setSelectedWeek(id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedWeek === id
                    ? "bg-foreground text-background shadow-xs"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Continuous Running Flow Statistics Card */}
          {(() => {
            const MONTH_DATA = {
              all: {
                title: "이달의 러닝 연속 흐름",
                totalKm: "124.6",
                targetKm: "150.0 km",
                streak: "🔥 24일간 꾸준히 운동 중",
                trend: "📈 월간 목표 83% 달성",
                pace: "7'12\" /km",
                time: "14시간 20분",
                kcal: "8,420 kcal",
                chart: [
                  { day: "1주차", km: 28.4, label: "28.4km" },
                  { day: "2주차", km: 34.2, label: "34.2km" },
                  { day: "3주차", km: 32.6, label: "32.6km" },
                  { day: "4주차", km: 29.4, label: "29.4km" },
                ],
              },
              "1w": {
                title: "1주차 러닝 현황 (1일~7일)",
                totalKm: "28.4",
                targetKm: "30.0 km",
                streak: "🔥 6일 완주",
                trend: "📈 주간 목표 94.6%",
                pace: "7'20\" /km",
                time: "3시간 15분",
                kcal: "1,890 kcal",
                chart: [
                  { day: "월", km: 4.0, label: "4.0km" },
                  { day: "화", km: 5.2, label: "5.2km" },
                  { day: "수", km: 3.5, label: "3.5km" },
                  { day: "목", km: 6.0, label: "6.0km" },
                  { day: "금", km: 2.5, label: "2.5km" },
                  { day: "토", km: 4.2, label: "4.2km" },
                  { day: "일", km: 3.0, label: "3.0km" },
                ],
              },
              "2w": {
                title: "2주차 러닝 현황 (8일~14일)",
                totalKm: "34.2",
                targetKm: "30.0 km",
                streak: "🔥 7일 연속 달성!",
                trend: "⚡ 주간 목표 114% 달성",
                pace: "7'02\" /km",
                time: "3시간 50분",
                kcal: "2,310 kcal",
                chart: [
                  { day: "월", km: 5.1, label: "5.1km" },
                  { day: "화", km: 4.0, label: "4.0km" },
                  { day: "수", km: 8.5, label: "8.5km" },
                  { day: "목", km: 4.2, label: "4.2km" },
                  { day: "금", km: 3.8, label: "3.8km" },
                  { day: "토", km: 5.0, label: "5.0km" },
                  { day: "일", km: 3.6, label: "3.6km" },
                ],
              },
              "3w": {
                title: "3주차 러닝 현황 (15일~21일)",
                totalKm: "32.6",
                targetKm: "35.0 km",
                streak: "🔥 5일 달성",
                trend: "📈 전주 대비 +18.4%",
                pace: "7'08\" /km",
                time: "3시간 42분",
                kcal: "2,340 kcal",
                chart: [
                  { day: "월", km: 4.2, label: "4.2km" },
                  { day: "화", km: 3.2, label: "3.2km" },
                  { day: "수", km: 10.5, label: "10.5km (최고)" },
                  { day: "목", km: 4.5, label: "4.5km" },
                  { day: "금", km: 3.0, label: "3.0km" },
                  { day: "토", km: 7.5, label: "7.5km" },
                  { day: "일", km: 2.3, label: "2.3km" },
                ],
              },
              "4w": {
                title: "4주차 러닝 현황 (22일~28일)",
                totalKm: "29.4",
                targetKm: "30.0 km",
                streak: "🔥 6일 달성",
                trend: "🏃 안정적인 페이스 유지",
                pace: "7'15\" /km",
                time: "3시간 33분",
                kcal: "1,880 kcal",
                chart: [
                  { day: "월", km: 3.5, label: "3.5km" },
                  { day: "화", km: 4.8, label: "4.8km" },
                  { day: "수", km: 6.2, label: "6.2km" },
                  { day: "목", km: 3.0, label: "3.0km" },
                  { day: "금", km: 5.5, label: "5.5km" },
                  { day: "토", km: 4.0, label: "4.0km" },
                  { day: "일", km: 2.4, label: "2.4km" },
                ],
              },
            };

            const currentData = MONTH_DATA[selectedWeek];

            return (
              <div className="bg-card border border-border/80 rounded-3xl p-5 shadow-xs relative overflow-hidden transition-all">
                {/* Background Glow Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/10 rounded-full blur-2xl pointer-events-none" />

                {/* Header: Title, Streak Badge & Distance Value */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        {currentData.title}
                      </span>
                      <span className="text-[10px] font-extrabold bg-lime-100 text-lime-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                        {currentData.streak}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-foreground font-mono tracking-tight">
                        {currentData.totalKm}
                      </span>
                      <span className="text-sm font-extrabold text-muted-foreground">km</span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-0.5 ml-1">
                        {currentData.trend}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-muted-foreground font-medium">목표 </span>
                    <p className="text-sm font-black text-foreground font-mono">{currentData.targetKm}</p>
                  </div>
                </div>

                {/* Smooth Connected Trend Area Chart */}
                <div className="w-full h-44 -ml-2 my-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={currentData.chart}
                      margin={{ top: 15, right: 15, left: 15, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#84CC16" stopOpacity={0.45} />
                          <stop offset="95%" stopColor="#84CC16" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                      <XAxis
                        dataKey="day"
                        tick={{ fontSize: 12, fill: "#64748B", fontWeight: 600 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis hide domain={[0, "auto"]} />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-xl border border-slate-800 text-xs font-semibold">
                                <p className="text-lime-400 font-extrabold mb-0.5">{data.day} 러닝 기록</p>
                                <p className="font-mono text-sm">{data.km} km</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="km"
                        stroke="#84CC16"
                        strokeWidth={3.5}
                        fillOpacity={1}
                        fill="url(#trendGradient)"
                        dot={{ r: 4, fill: "#FFFFFF", stroke: "#65A30D", strokeWidth: 2.5 }}
                        activeDot={{ r: 7, fill: "#84CC16", stroke: "#FFFFFF", strokeWidth: 3 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Continuous Continuity Analytics Row */}
                <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-border/60 text-center">
                  <div className="bg-muted/30 rounded-2xl p-2.5">
                    <p className="text-[10px] text-muted-foreground font-semibold">평균 러닝 페이스</p>
                    <p className="text-xs font-black text-foreground font-mono mt-0.5">{currentData.pace}</p>
                  </div>
                  <div className="bg-muted/30 rounded-2xl p-2.5">
                    <p className="text-[10px] text-muted-foreground font-semibold">총 운동 시간</p>
                    <p className="text-xs font-black text-foreground font-mono mt-0.5">{currentData.time}</p>
                  </div>
                  <div className="bg-muted/30 rounded-2xl p-2.5">
                    <p className="text-[10px] text-muted-foreground font-semibold">소모 칼로리</p>
                    <p className="text-xs font-black text-foreground font-mono mt-0.5">{currentData.kcal}</p>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Timeline Section Header */}
          <div className="flex items-center justify-between mt-2 px-1">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-foreground">러닝 타임라인</h3>
              <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                최근 3건
              </span>
            </div>
            <button className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
              전체보기 <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Timeline Node List */}
          <div className="relative flex flex-col gap-3 pl-3 my-1 before:absolute before:left-6 before:top-4 before:bottom-6 before:w-0.5 before:bg-border/80">
            {[
              {
                date: "오늘 · 18:20",
                name: "광안리 바다 드로잉런",
                km: "5.2 km",
                time: "38분",
                pace: "7'18\"",
                kcal: "342 kcal",
                icon: "🌊",
                badgeBg: "bg-cyan-100/90 text-cyan-900 border-cyan-200",
              },
              {
                date: "2일 전 · 07:15",
                name: "낙동강 생태공원 산책",
                km: "7.8 km",
                time: "55분",
                pace: "7'03\"",
                kcal: "510 kcal",
                icon: "🌿",
                badgeBg: "bg-emerald-100/90 text-emerald-900 border-emerald-200",
              },
              {
                date: "4일 전 · 20:00",
                name: "서면 생활권 밤러닝",
                km: "3.6 km",
                time: "24분",
                pace: "6'40\"",
                kcal: "240 kcal",
                icon: "🏙️",
                badgeBg: "bg-indigo-100/90 text-indigo-900 border-indigo-200",
              },
            ].map(({ date, name, km, time, pace, kcal, icon, badgeBg }) => (
              <div key={name} className="flex items-start gap-3 relative z-10 group">
                {/* Timeline Connector Node Badge */}
                <div className={`w-6 h-6 rounded-full ${badgeBg} border-2 flex items-center justify-center text-xs shrink-0 shadow-xs mt-3 bg-background`}>
                  <div className="w-2 h-2 rounded-full bg-current" />
                </div>

                {/* Main Item Card */}
                <div className="flex-1 bg-card border border-border/80 rounded-2xl p-3.5 hover:border-primary/40 transition-all shadow-xs group-hover:shadow-sm">
                  {/* Top Date & Icon */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-muted-foreground">
                      {date}
                    </span>
                    <span className="text-base">{icon}</span>
                  </div>

                  {/* Course Name */}
                  <h4 className="font-extrabold text-sm text-foreground mb-2.5">
                    {name}
                  </h4>

                  {/* Clean Metric Chips */}
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <div className="bg-primary/10 text-primary font-black px-2.5 py-1 rounded-xl">
                      {km}
                    </div>
                    <div className="bg-muted/40 text-foreground font-semibold px-2.5 py-1 rounded-xl">
                      ⏱️ {time}
                    </div>
                    <div className="bg-muted/40 text-muted-foreground font-medium px-2.5 py-1 rounded-xl">
                      {pace}/km
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "배지" && (
        <div className="px-4 flex flex-col gap-5 relative">
          {/* Toast Notification */}
          {toastMsg && (
            <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg transition-all animate-bounce">
              {toastMsg}
            </div>
          )}

          {/* Top Bar / Header */}
          <div className="flex items-center justify-between pt-1 pb-1">
            <button className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h2 className="font-bold text-base text-foreground">활동 배지</h2>
            <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              6 / 9 획득
            </span>
          </div>

          {/* Featured / Representative Badge Section */}
          <div className="bg-card border border-border/80 rounded-3xl p-6 flex flex-col items-center text-center shadow-xs">
            <h3 className="font-extrabold text-base text-foreground mb-1">나의 대표 배지</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4 max-w-[250px]">
              획득한 배지를 클릭해<br />
              나의 대표 배지로 설정해 보세요!
            </p>

            {/* Representative Badge Active Slot */}
            <div className="w-28 h-28 rounded-[36px] bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-300 flex flex-col items-center justify-center shadow-sm relative group cursor-pointer hover:scale-105 transition-all">
              <span className="text-4xl drop-shadow-xs mb-1">{currentRep.icon}</span>
              <span className="text-[10px] font-extrabold bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full shadow-xs">
                대표 배지
              </span>
            </div>
            <p className="font-extrabold text-sm text-foreground mt-2.5">{currentRep.label}</p>
          </div>

          {/* Divider */}
          <div className="h-px bg-border/80 my-1" />

          {/* Badge Grid (3 Columns) */}
          <div className="grid grid-cols-3 gap-4 pb-2">
            {BADGE_LIST.map((badge) => {
              const isRep = badge.label === repBadge;
              return (
                <div
                  key={badge.label}
                  onClick={() => handleBadgeClick(badge)}
                  className="flex flex-col items-center text-center cursor-pointer group"
                >
                  {/* Squircle Badge Container */}
                  <div
                    className={`w-20 h-20 rounded-[28px] ${badge.bg} flex items-center justify-center text-3xl mb-2 shadow-xs group-hover:scale-105 transition-all relative ${
                      isRep ? "ring-4 ring-amber-400/80 ring-offset-2" : ""
                    }`}
                  >
                    {badge.isLock ? (
                      <span className="text-slate-400 font-bold text-2xl">🔒</span>
                    ) : (
                      <span>{badge.icon}</span>
                    )}
                    {badge.earned && (
                      <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center font-bold shadow-xs">
                        ✓
                      </span>
                    )}
                    {isRep && (
                      <span className="absolute -bottom-1 text-[9px] font-black bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full shadow-xs">
                        대표
                      </span>
                    )}
                  </div>

                  {/* Badge Name */}
                  <span
                    className={`text-xs font-semibold leading-tight ${
                      isRep ? "text-amber-700 font-bold" : badge.earned ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Next Goal Progress Banner */}
          <div className="bg-muted/30 border border-border/80 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-muted-foreground font-semibold">🎯 다음 배지 달성까지</p>
              <p className="text-xs font-extrabold text-foreground mt-0.5">월간 50km 클럽 — 7.5km 남음!</p>
            </div>
            <span className="text-xs font-mono font-bold text-primary bg-background border border-border px-2.5 py-1 rounded-xl shadow-xs shrink-0">
              42.5 / 50 km
            </span>
          </div>
        </div>
      )}

      {activeTab === "랭킹" && (
        <div className="px-4 flex flex-col gap-4">
          {/* Header Bar */}
          <div className="flex items-center justify-between pt-1 pb-1 text-xs text-muted-foreground">
            <button className="p-1 hover:bg-muted rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <span className="font-bold text-sm text-foreground">월간 누적 거리 랭킹</span>
            <span className="font-medium text-xs text-primary cursor-pointer hover:underline">챌린지 규칙</span>
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-2.5 items-end pt-3 pb-1">
            {/* Rank 2 (Left) */}
            <div className="bg-slate-100/90 border border-slate-200/90 rounded-2xl p-3 flex flex-col items-center text-center relative shadow-sm">
              <div className="absolute -top-3 flex items-center justify-center bg-slate-300 text-slate-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                👑 2위
              </div>
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-3xl mt-2 mb-2 shadow-inner">
                🐰
              </div>
              <p className="font-bold text-xs text-foreground truncate w-full">해운대페메</p>
              <p className="text-sm font-black text-primary font-mono my-1">128.5 <span className="text-xs font-normal text-muted-foreground">km</span></p>
              <span className="text-[10px] font-semibold bg-slate-200/90 text-slate-700 px-2 py-0.5 rounded-full">
                연속 21일
              </span>
            </div>

            {/* Rank 1 (Center - Elevated) */}
            <div className="bg-indigo-50/90 border-2 border-indigo-200 rounded-2xl p-3 flex flex-col items-center text-center relative -translate-y-2 shadow-md">
              <div className="absolute -top-3.5 flex items-center justify-center bg-amber-400 text-amber-950 text-xs font-black px-2.5 py-0.5 rounded-full shadow">
                👑 1위
              </div>
              <div className="w-16 h-16 rounded-full bg-yellow-200 border-2 border-yellow-300 flex items-center justify-center text-4xl mt-2 mb-2 shadow-inner">
                🐱
              </div>
              <p className="font-extrabold text-xs text-foreground truncate w-full">러닝왕강지훈</p>
              <p className="text-base font-black text-primary font-mono my-1">142.8 <span className="text-xs font-normal text-muted-foreground">km</span></p>
              <span className="text-[10px] font-bold bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-full shadow-xs">
                월간 MVP
              </span>
            </div>

            {/* Rank 3 (Right) */}
            <div className="bg-rose-50/90 border border-rose-200/90 rounded-2xl p-3 flex flex-col items-center text-center relative shadow-sm">
              <div className="absolute -top-3 flex items-center justify-center bg-amber-700/80 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                👑 3위
              </div>
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-3xl mt-2 mb-2 shadow-inner">
                🐻
              </div>
              <p className="font-bold text-xs text-foreground truncate w-full">매일뛰다보면</p>
              <p className="text-sm font-black text-primary font-mono my-1">115.2 <span className="text-xs font-normal text-muted-foreground">km</span></p>
              <span className="text-[10px] font-semibold bg-rose-200/90 text-rose-800 px-2 py-0.5 rounded-full">
                연속 14일
              </span>
            </div>
          </div>

          {/* 4th ~ 9th List */}
          <div className="flex flex-col gap-1.5 mt-1">
            {[
              { rank: 4, tag: "마라토너", name: "페가수스", dist: "98.4 km", avatar: "🐤", bg: "bg-emerald-100" },
              { rank: 5, tag: "스프린터", name: "광안리 번개", dist: "88.2 km", avatar: "⚡", bg: "bg-blue-100" },
              { rank: 6, tag: "열정러너", name: "다정한악어", dist: "79.5 km", avatar: "🐊", bg: "bg-yellow-100" },
              { rank: 7, tag: "꾸준러너", name: "기운찬초보", dist: "72.1 km", avatar: "🐵", bg: "bg-pink-100" },
              { rank: 8, tag: "산책마스터", name: "폭풍질주", dist: "65.4 km", avatar: "🐸", bg: "bg-purple-100" },
              { rank: 9, tag: "새벽러너", name: "깔끔한고양이", dist: "58.0 km", avatar: "🐱", bg: "bg-amber-100" },
            ].map(({ rank, tag, name, dist, avatar, bg }) => (
              <div
                key={rank}
                className="flex items-center justify-between p-3 rounded-2xl bg-card border border-border/80 hover:border-primary/40 transition-all shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Rank & Tag Badge */}
                  <div className="flex flex-col items-center justify-center w-11 shrink-0">
                    <span className="text-sm font-extrabold text-foreground font-mono">{rank}</span>
                    <span className="text-[9px] font-medium bg-muted text-muted-foreground px-1.5 py-0.2 rounded-full whitespace-nowrap">
                      {tag}
                    </span>
                  </div>

                  {/* Avatar & Name */}
                  <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center text-xl shrink-0 shadow-xs`}>
                    {avatar}
                  </div>
                  <span className="font-bold text-sm text-foreground truncate">{name}</span>
                </div>

                {/* Distance Record */}
                <span className="text-sm font-black text-primary font-mono shrink-0 pl-2">
                  {dist}
                </span>
              </div>
            ))}

            {/* My Rank Highlight Row */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-primary/10 border-2 border-primary/40 mt-1 shadow-sm">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex flex-col items-center justify-center w-11 shrink-0">
                  <span className="text-sm font-black text-primary font-mono">24</span>
                  <span className="text-[9px] font-bold bg-primary text-primary-foreground px-1.5 py-0.2 rounded-full whitespace-nowrap">
                    내 순위
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl shrink-0 border border-primary/30">
                  🐕
                </div>
                <div>
                  <span className="font-extrabold text-sm text-primary">나 (해피와)</span>
                  <p className="text-[10px] text-muted-foreground">서면 생활권 · 연속 5일</p>
                </div>
              </div>
              <span className="text-base font-black text-primary font-mono shrink-0 pl-2">
                42.5 km
              </span>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="sticky bottom-2 flex items-center gap-2 pt-2 bg-gradient-to-t from-background via-background to-transparent pb-1">
            <button className="flex-1 py-3.5 rounded-2xl bg-muted/80 hover:bg-muted text-foreground font-bold text-sm shadow-sm transition-all text-center">
              공유하기
            </button>
            <button className="flex-1 py-3.5 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-yellow-950 font-black text-sm shadow-md transition-all text-center">
              1위 코스 따라뛰기
            </button>
            <button className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center shadow-md hover:bg-muted transition-all shrink-0">
              <Search className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

