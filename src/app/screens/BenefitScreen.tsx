import { useState } from "react";
import { COUPONS } from "../data";
import {
  MapPin, Navigation, Zap, Leaf, Award, Users, Star,
  ChevronRight, Check, Share2, Camera, TrendingUp,
  Clock, Target, Heart, Dog, Recycle, Shield, Globe,
  ArrowRight, Activity, Bell, Search, Settings, Play,
  Home, Map, BarChart2, Gift, ChevronLeft, Plus,
  Flame, Wind, Droplets, Timer, X, Filter, Bot,
  ChevronDown, Layers, List, Calendar, QrCode, Sparkles, RefreshCw, CheckCircle2
} from "lucide-react";

function DongbaekjeonLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full rounded-lg shadow-2xs" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="22" fill="#FFFFFF" stroke="#1E1E1E" strokeWidth="7"/>
        <path d="M42 7V62" stroke="#1E1E1E" strokeWidth="6"/>
        <path d="M42 36H93" stroke="#1E1E1E" strokeWidth="6"/>
        <path d="M42 62H93" stroke="#1E1E1E" strokeWidth="6"/>
        <rect x="7" y="7" width="35" height="55" fill="#9C6BB2"/>
        <rect x="42" y="7" width="22" height="29" fill="#4B77BE"/>
        <rect x="64" y="7" width="29" height="29" fill="#A3D17B"/>
        <rect x="42" y="36" width="51" height="26" fill="#58B8E6"/>
        <rect x="42" y="62" width="51" height="31" fill="#F7C4B0"/>
        <circle cx="28" cy="74" r="21" fill="#E64579" stroke="#1E1E1E" strokeWidth="5"/>
        <path d="M28 74 L13 60 A21 21 0 0 1 43 60 Z" fill="#8B1939"/>
        <circle cx="28" cy="74" r="9" fill="#F7D66C" stroke="#1E1E1E" strokeWidth="4"/>
      </svg>
    </div>
  );
}

export function BenefitScreen() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [selectedCoupon, setSelectedCoupon] = useState<typeof COUPONS[0] | null>(null);
  const [selectedCityTime, setSelectedCityTime] = useState<number>(10); // default 10분

  // QR Modal State
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [qrTimer, setQrTimer] = useState<number>(179); // 2:59 countdown

  // Earning Structure Speech Bubble Visibility State
  const [showEarningStructure, setShowEarningStructure] = useState<boolean>(true);

  // Point History Full View State
  const [showFullHistory, setShowFullHistory] = useState<boolean>(false);
  const [historyMonth, setHistoryMonth] = useState<string>("2026-07");
  const [historyDisplayType, setHistoryDisplayType] = useState<"list" | "calendar">("list");
  const [historyFilter, setHistoryFilter] = useState<"used" | "all" | "earned">("all"); // default all for 전체보기
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<number | null>(18);

  // Point Data by Month & Day (Up to July 2026)
  const POINT_DATA_BY_MONTH: Record<string, {
    totalEarned: number;
    totalSpent: number;
    calendarData: Record<number, { label: string; point: string; plus: boolean; time: string }[]>;
  }> = {
    "2026-07": {
      totalEarned: 1200,
      totalSpent: 500,
      calendarData: {
        5: [{ label: "해운대 돌고래런 완주", point: "+250P", time: "11:00", plus: true }],
        12: [{ label: "낙동강 오리런 완주", point: "+200P", time: "16:45", plus: true }],
        17: [{ label: "플로깅 인증", point: "+300P", time: "10:15", plus: true }],
        18: [{ label: "스포츠 365 쿠폰 사용", point: "-500P", time: "14:20", plus: false }],
        20: [{ label: "카페 파도 방문 인증", point: "+100P", time: "09:22", plus: true }],
        21: [
          { label: "광안리 5km 완주", point: "+200P", time: "07:38", plus: true },
          { label: "SNS 인증샷 공유", point: "+50P", time: "08:12", plus: true },
        ],
      }
    },
    "2026-06": {
      totalEarned: 1850,
      totalSpent: 400,
      calendarData: {
        3: [{ label: "동백전 가맹점 방문 인증", point: "+150P", time: "12:30", plus: true }],
        10: [{ label: "서면 하트런 완주", point: "+200P", time: "19:10", plus: true }],
        15: [{ label: "6월 플로깅 보너스", point: "+500P", time: "10:00", plus: true }],
        25: [{ label: "세븐일레븐 쿠폰 사용", point: "-400P", time: "15:20", plus: false }],
      }
    },
    "2026-05": {
      totalEarned: 2100,
      totalSpent: 600,
      calendarData: {
        5: [{ label: "어린이날 가족 챌린지", point: "+500P", time: "14:00", plus: true }],
        12: [{ label: "광안리 야간런 완주", point: "+200P", time: "20:30", plus: true }],
        20: [{ label: "카페 쿠폰 사용", point: "-600P", time: "11:15", plus: false }],
      }
    },
    "2026-04": {
      totalEarned: 1500,
      totalSpent: 200,
      calendarData: {
        8: [{ label: "벚꽃시즌 런 완주", point: "+300P", time: "09:00", plus: true }],
        19: [{ label: "부산진구 생활권 인증", point: "+100P", time: "17:40", plus: true }],
      }
    },
    "2026-03": {
      totalEarned: 1600,
      totalSpent: 300,
      calendarData: {
        1: [{ label: "삼일절 기념 챌린지", point: "+400P", time: "10:00", plus: true }],
        15: [{ label: "낙동강 일몰런 완주", point: "+200P", time: "18:20", plus: true }],
      }
    },
    "2026-02": {
      totalEarned: 1400,
      totalSpent: 500,
      calendarData: {
        14: [{ label: "발렌타인 커플런 완주", point: "+300P", time: "16:00", plus: true }],
      }
    },
    "2026-01": {
      totalEarned: 2000,
      totalSpent: 700,
      calendarData: {
        1: [{ label: "새해 첫 러닝 완주", point: "+500P", time: "07:00", plus: true }],
      }
    }
  };

  // Store pin coordinates on the radar grid
  const pinPositions = [
    { top: "26%", left: "12%", label: "카페 파도" },
    { top: "34%", left: "32%", label: "세븐일레븐" },
    { top: "22%", right: "12%", label: "스포츠 365" },
    { top: "62%", right: "16%", label: "낙지볶음" },
  ];

  // 15-min city facilities data with walking times
  const CITY_FACILITIES = [
    { icon: "🏥", name: "의료", count: 3, walkTime: 3, label: "병원/약국", top: "42%", left: "40%" },
    { icon: "📚", name: "도서관", count: 1, walkTime: 5, label: "시립도서관", top: "30%", left: "60%" },
    { icon: "🌳", name: "공원", count: 5, walkTime: 8, label: "생태공원", top: "65%", left: "30%" },
    { icon: "🚇", name: "지하철", count: 2, walkTime: 10, label: "광안역", top: "72%", left: "65%" },
    { icon: "🏫", name: "학교", count: 4, walkTime: 13, label: "초/중/고", top: "18%", left: "25%" },
    { icon: "🛒", name: "마트", count: 6, walkTime: 15, label: "대형마트", top: "22%", left: "75%" },
  ];

  const TIME_STEPS = [5, 10, 15, 30, 60];

  return (
    <div className="relative flex flex-col gap-4 pb-4">
      {/* Dongbaekjeon wallet */}
      <div className="mx-4 mt-2 relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#F7D66C]/24 via-[#F4A43C]/12 to-card border border-[#F7D66C]/45 p-5 shadow-xs">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #F4A43C 1px, transparent 1px)", backgroundSize: "18px 18px" }}/>
        <div className="relative z-10 flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <DongbaekjeonLogo className="w-6 h-6" />
              <span className="text-base font-black text-foreground tracking-tight">동백전</span>
              <span className="text-xs font-bold text-[#B86F16]">포인트</span>
            </div>
            <p className="text-4xl font-black text-[#D7A72E]" style={{ fontFamily:"'Exo 2',sans-serif" }}>4,820P</p>
            <p className="text-xs text-muted-foreground mt-1">≈ 4,820원 사용 가능</p>
          </div>
          <div className="bg-[#F7D66C]/20 border border-[#F7D66C]/45 rounded-2xl px-3 py-2 text-center">
            <p className="text-xs text-[#B86F16] font-bold">이달 적립</p>
            <p className="text-lg font-black text-[#D7A72E] font-mono">+1,200P</p>
          </div>
        </div>
        <div className="relative z-10 flex gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); setShowQrModal(true); }}
            className="flex-1 py-2.5 bg-[#F7D66C]/30 hover:bg-[#F7D66C]/45 border border-[#F7D66C]/60 rounded-xl text-xs font-black text-[#8C520C] flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <QrCode className="w-4 h-4 text-[#8C520C]" />
            <span>포인트 사용 (QR결제)</span>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setHistoryFilter("used"); setShowFullHistory(true); }}
            className="flex-1 py-2.5 bg-[#F7D66C]/20 hover:bg-[#F7D66C]/30 border border-[#F7D66C]/45 rounded-xl text-xs font-bold text-[#B86F16] transition-colors cursor-pointer"
          >
            사용 내역
          </button>
        </div>
      </div>

      {/* QR CODE POPUP MODAL */}
      {showQrModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setShowQrModal(false)}
        >
          <div 
            className="bg-card border border-border rounded-3xl p-6 shadow-2xl w-[310px] flex flex-col items-center text-center relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center text-foreground cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Title */}
            <div className="flex items-center gap-2 mb-1.5">
              <DongbaekjeonLogo className="w-6 h-6" />
              <span className="text-sm font-black text-foreground tracking-tight">동백전 결제 QR</span>
            </div>
            <p className="text-3xl font-black text-foreground font-mono mb-0.5">4,820<span className="text-base font-bold text-primary ml-0.5">P</span></p>
            <p className="text-[11px] text-muted-foreground mb-4">가맹점 스캐너에 QR코드를 스캔하세요</p>

            {/* Stylized QR Box */}
            <div className="relative w-48 h-48 bg-white p-3 rounded-2xl border-2 border-primary/50 shadow-inner flex flex-col items-center justify-center mb-4">
              <div className="w-full h-full bg-gradient-to-br from-[#17213D] via-[#0F172A] to-[#1E293B] rounded-xl p-2.5 flex flex-col justify-between items-center relative overflow-hidden">
                {/* QR Corner Markers */}
                <div className="w-full flex justify-between">
                  <div className="w-9 h-9 bg-white rounded-lg p-1.5 flex items-center justify-center"><div className="w-full h-full bg-[#17213D] rounded-xs" /></div>
                  <div className="w-9 h-9 bg-white rounded-lg p-1.5 flex items-center justify-center"><div className="w-full h-full bg-[#17213D] rounded-xs" /></div>
                </div>

                {/* Center QR Graphic */}
                <div className="my-auto flex flex-col items-center gap-1">
                  <QrCode className="w-14 h-14 text-primary animate-pulse" />
                  <span className="text-[9px] font-mono text-white/90 font-black tracking-widest bg-primary/20 px-2 py-0.5 rounded-full border border-primary/30">
                    DONGBAEK-PAY
                  </span>
                </div>

                {/* Bottom QR Markers */}
                <div className="w-full flex justify-between items-center">
                  <div className="w-9 h-9 bg-white rounded-lg p-1.5 flex items-center justify-center"><div className="w-full h-full bg-[#17213D] rounded-xs" /></div>
                  <div className="h-2 bg-primary/80 rounded-full flex-1 mx-2" />
                </div>
              </div>
            </div>

            {/* Timer Badge */}
            <div className="flex items-center gap-1.5 bg-muted/60 border border-border px-3 py-1.5 rounded-full text-xs font-mono text-muted-foreground mb-4">
              <Timer className="w-3.5 h-3.5 text-primary" />
              <span>유효시간: <strong className="text-primary font-bold">02:59</strong></span>
              <button 
                onClick={() => setQrTimer(179)}
                className="ml-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>

            {/* Confirmation Button */}
            <button 
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 bg-primary text-primary-foreground font-black text-xs rounded-xl shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* Flow: Complete → Verify → Earn → Spend (Speech Bubble 말풍선 디자인 & X 닫기 버튼) */}
      {showEarningStructure && (
        <div className="mx-4 relative bg-card border border-border rounded-2xl p-3 shadow-xs mt-1 animate-in fade-in duration-200">
          {/* Speech Bubble Tail (꽁지) pointing UP to Dongbaekjeon card */}
          <div className="absolute -top-2 left-10 w-4 h-2.5 overflow-hidden pointer-events-none">
            <div className="w-3 h-3 bg-card border-t border-l border-border rotate-45 transform translate-y-1.5 translate-x-0.5" />
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="font-extrabold text-xs text-foreground tracking-tight flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>적립 구조</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground font-mono">완주 ➔ 사용 4단계</span>
              <button 
                onClick={() => setShowEarningStructure(false)}
                className="w-5 h-5 rounded-full hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                title="닫기"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between bg-muted/30 border border-border/50 rounded-xl px-2.5 py-1.5">
            {[
              { icon: "🏃", label: "완주" },
              { icon: "📍", label: "인증" },
              { icon: "🌸", label: "적립" },
              { icon: "🛍️", label: "사용" },
            ].map(({ icon, label }, idx, arr) => (
              <div key={label} className="flex items-center">
                <div className="flex items-center gap-1">
                  <span className="text-sm">{icon}</span>
                  <span className="font-bold text-foreground text-[11px]">{label}</span>
                </div>
                {idx < arr.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 mx-1.5" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Point history */}
      <div className="mx-4 bg-card border border-border rounded-3xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-sm text-foreground">적립 내역</p>
          <button 
            onClick={() => { setHistoryFilter("all"); setShowFullHistory(true); }}
            className="text-xs text-primary font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>전체보기</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        {[
          { label: "광안리 5km 완주", point: "+200P", time: "오늘 07:38", plus: true },
          { label: "SNS 인증샷 공유", point: "+50P", time: "오늘 08:12", plus: true },
          { label: "카페 파도 방문 인증", point: "+100P", time: "어제 09:22", plus: true },
          { label: "스포츠 365 쿠폰 사용", point: "-500P", time: "3일 전", plus: false },
          { label: "플로깅 인증", point: "+300P", time: "4일 전", plus: true },
        ].map(({ label, point, time, plus }) => (
          <div key={label} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs ${plus ? "bg-[#6ACF98]/15" : "bg-red-500/10"}`}>
              {plus ? "↑" : "↓"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground truncate">{label}</p>
              <p className="text-xs text-muted-foreground">{time}</p>
            </div>
            <span className={`text-sm font-mono font-bold shrink-0 ${plus ? "text-[#4CB57D]" : "text-red-400"}`}>{point}</span>
          </div>
        ))}
      </div>

      {/* FULL POINT HISTORY MODAL / VIEW */}
      {showFullHistory && (
        <div className="absolute inset-0 z-50 bg-background overflow-y-auto flex flex-col p-4 animate-in fade-in slide-in-from-bottom-3 duration-200 min-h-full">
          {/* Header */}
          <div className="flex items-center justify-between py-3 border-b border-border mb-4">
            <button 
              onClick={() => setShowFullHistory(false)}
              className="flex items-center gap-1 text-sm font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>포인트 적립 내역</span>
            </button>
            <button 
              onClick={() => setShowFullHistory(false)}
              className="w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center text-foreground hover:bg-muted cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Month Selector & View Toggle Header */}
          <div className="bg-card border border-border rounded-3xl p-4 mb-4 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              {/* Month Selector Dropdown / Pills */}
              <div className="flex items-center gap-2">
                <select
                  value={historyMonth}
                  onChange={(e) => setHistoryMonth(e.target.value)}
                  className="bg-muted/40 border border-border text-foreground font-extrabold text-base rounded-2xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                >
                  <option value="2026-07">2026년 7월</option>
                  <option value="2026-06">2026년 6월</option>
                  <option value="2026-05">2026년 5월</option>
                  <option value="2026-04">2026년 4월</option>
                  <option value="2026-03">2026년 3월</option>
                  <option value="2026-02">2026년 2월</option>
                  <option value="2026-01">2026년 1월</option>
                </select>
              </div>

              {/* View Format Switcher (List vs Calendar) */}
              <div className="flex bg-muted/60 p-1 rounded-2xl border border-border">
                <button
                  onClick={() => setHistoryDisplayType("list")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    historyDisplayType === "list"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>목록형</span>
                </button>
                <button
                  onClick={() => setHistoryDisplayType("calendar")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    historyDisplayType === "calendar"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>달력형</span>
                </button>
              </div>
            </div>

            {/* Monthly Summary Banner */}
            <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-2xl p-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">월 누적 혜택:</span>
                <span className="font-extrabold text-primary font-mono text-sm">+1,200P</span>
              </div>
              <div className="text-muted-foreground">
                사용: <span className="font-mono text-red-400 font-bold">-500P</span>
              </div>
            </div>
          </div>

          {/* CALENDAR VIEW */}
          {historyDisplayType === "calendar" ? (
            <div className="flex flex-col gap-4">
              <div className="bg-card border border-border rounded-3xl p-4 shadow-xs">
                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-muted-foreground mb-2 py-1 border-b border-border">
                  <span className="text-red-400">일</span>
                  <span>월</span>
                  <span>화</span>
                  <span>수</span>
                  <span>목</span>
                  <span>금</span>
                  <span className="text-blue-400">토</span>
                </div>

                {/* Calendar Days Grid for 2025년 1월 (31 days, starts Wednesday = offset 3) */}
                <div className="grid grid-cols-7 gap-1.5 text-center">
                  {/* Empty Offset cells */}
                  {[...Array(3)].map((_, i) => (
                    <div key={`empty-${i}`} className="h-12 rounded-2xl bg-transparent" />
                  ))}

                  {/* Days 1 to 31 */}
                  {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    const monthData = POINT_DATA_BY_MONTH[historyMonth] || POINT_DATA_BY_MONTH["2025-01"];
                    const dayEvents = monthData.calendarData[day];
                    const hasEvent = !!dayEvents && dayEvents.length > 0;
                    const isSelected = selectedCalendarDate === day;

                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedCalendarDate(day)}
                        className={`h-13 rounded-2xl p-1 flex flex-col items-center justify-between transition-all cursor-pointer relative ${
                          isSelected
                            ? "bg-primary/20 border-2 border-primary shadow-xs scale-105"
                            : hasEvent
                              ? "bg-[#F7D66C]/15 border border-[#F7D66C]/50 hover:bg-[#F7D66C]/25"
                              : "bg-muted/20 border border-border/40 hover:bg-muted/40"
                        }`}
                      >
                        <span className={`text-xs font-bold font-mono ${
                          isSelected ? "text-primary" : "text-foreground"
                        }`}>
                          {day}
                        </span>

                        {hasEvent && (
                          <div className="w-full flex flex-col items-center">
                            <span className="text-[9px] font-mono font-black text-[#B86F16] bg-[#F7D66C]/30 px-1 rounded-md leading-tight">
                              {dayEvents[0].point}
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Day Activity Detail Card */}
              {selectedCalendarDate && (
                <div className="bg-card border border-primary/30 rounded-3xl p-4 shadow-xs flex flex-col gap-2 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="font-extrabold text-sm text-foreground">
                      {historyMonth.replace("-", "년 ")}월 {selectedCalendarDate}일 내역
                    </span>
                    <span className="text-xs text-primary font-mono font-bold">
                      {(POINT_DATA_BY_MONTH[historyMonth]?.calendarData[selectedCalendarDate] || []).length}건
                    </span>
                  </div>

                  {(POINT_DATA_BY_MONTH[historyMonth]?.calendarData[selectedCalendarDate] || []).length > 0 ? (
                    POINT_DATA_BY_MONTH[historyMonth].calendarData[selectedCalendarDate].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                        <div className="flex items-center gap-2">
                          <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                            item.plus ? "bg-[#6ACF98]/20 text-[#35865E]" : "bg-red-500/15 text-red-500"
                          }`}>
                            {item.plus ? "↑" : "↓"}
                          </span>
                          <div>
                            <p className="text-xs font-bold text-foreground">{item.label}</p>
                            <p className="text-[10px] text-muted-foreground">{item.time}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-mono font-extrabold ${item.plus ? "text-[#4CB57D]" : "text-red-400"}`}>
                          {item.point}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground py-3 text-center">해당 날짜에 적립/사용 내역이 없습니다.</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* LIST VIEW FOR FULL HISTORY (SPENT ITEMS FIRST) */
            <div className="bg-card border border-border rounded-3xl p-4 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="font-extrabold text-sm text-foreground">포인트 내역 목록</p>
                {/* Filter Pills: Used (-) first */}
                <div className="flex gap-1">
                  {[
                    { id: "used", label: "🛍️ 사용 내역 (-)" },
                    { id: "all", label: "전체" },
                    { id: "earned", label: "🌸 적립 (+)" },
                  ].map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setHistoryFilter(id as any)}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                        historyFilter === id
                          ? "bg-primary text-primary-foreground shadow-2xs"
                          : "bg-muted/40 text-muted-foreground hover:text-foreground border border-border/40"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items List Filtered with Spent (-) items first */}
              {[
                { date: "7월 18일", label: "스포츠 365 쿠폰 사용", point: "-500P", time: "14:20", plus: false },
                { date: "6월 25일", label: "세븐일레븐 쿠폰 사용", point: "-400P", time: "15:20", plus: false },
                { date: "5월 20일", label: "카페 파도 포인트 결제", point: "-600P", time: "11:15", plus: false },
                { date: "7월 21일", label: "광안리 5km 완주", point: "+200P", time: "07:38", plus: true },
                { date: "7월 21일", label: "SNS 인증샷 공유", point: "+50P", time: "08:12", plus: true },
                { date: "7월 20일", label: "카페 파도 방문 인증", point: "+100P", time: "09:22", plus: true },
                { date: "7월 17일", label: "플로깅 인증", point: "+300P", time: "10:15", plus: true },
                { date: "7월 12일", label: "낙동강 오리런 완주", point: "+200P", time: "16:45", plus: true },
                { date: "7월 5일", label: "해운대 돌고래런 완주", point: "+250P", time: "11:00", plus: true },
              ]
                .filter(item => historyFilter === "all" ? true : historyFilter === "used" ? !item.plus : item.plus)
                .map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 py-2.5 border-b border-border/60 last:border-0">
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-bold ${
                      item.plus ? "bg-[#6ACF98]/20 text-[#35865E]" : "bg-red-500/15 text-red-500"
                    }`}>
                      {item.plus ? "↑" : "↓"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-foreground truncate">{item.label}</p>
                        {!item.plus && (
                          <span className="text-[9px] font-bold text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded-full">사용</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{item.date} · {item.time}</p>
                    </div>
                    <span className={`text-sm font-mono font-extrabold ${item.plus ? "text-[#4CB57D]" : "text-red-400"}`}>
                      {item.point}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Nearby coupons (Map / List Toggle) */}
      <div className="mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button 
            onClick={() => setViewMode(v => v === "map" ? "list" : "map")}
            className="flex items-center gap-1 text-foreground hover:opacity-80 transition-opacity group cursor-pointer"
          >
            <span className="font-extrabold text-base tracking-tight">내 주변 혜택</span>
            <ChevronRight className={`w-5 h-5 text-foreground transition-transform duration-200 ${viewMode === "list" ? "rotate-90 text-primary" : "group-hover:translate-x-0.5"}`} />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">오늘 11:16 기준</span>
            <button 
              onClick={() => setViewMode(v => v === "map" ? "list" : "map")}
              className="text-xs px-2.5 py-1 rounded-full bg-muted/60 hover:bg-muted border border-border text-foreground font-semibold flex items-center gap-1 transition-colors"
            >
              {viewMode === "map" ? <List className="w-3 h-3 text-primary" /> : <Map className="w-3 h-3 text-primary" />}
              <span>{viewMode === "map" ? "목록" : "지도"}</span>
            </button>
          </div>
        </div>

        {/* MAP VIEW */}
        {viewMode === "map" ? (
          <div className="relative w-full h-[320px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#FFFDF5] via-[#FFF9E6] to-[#FFF4D6] border border-[#FDE68A]/60 shadow-sm flex items-center justify-center">
            {/* Concentric Radar Rings */}
            <div className="absolute w-[280px] h-[280px] rounded-full border border-[#FDE68A]/40 bg-[#FFFBEB]/30" />
            <div className="absolute w-[200px] h-[200px] rounded-full border border-[#FCD34D]/50 bg-[#FEF3C7]/40" />
            <div className="absolute w-[110px] h-[110px] rounded-full border border-[#F59E0B]/30 bg-[#FDE68A]/40" />

            {/* Center User Location Pin */}
            <div className="absolute z-10 flex flex-col items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#FF4D4D] border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <div className="absolute w-12 h-12 rounded-full bg-[#FF4D4D]/20 animate-ping pointer-events-none" />
            </div>

            {/* Store Pins on Radar */}
            {COUPONS.map((coupon, idx) => {
              const pos = pinPositions[idx] || { top: "50%", left: "50%" };
              const isSelected = selectedCoupon?.name === coupon.name;

              return (
                <div
                  key={coupon.name}
                  style={pos}
                  onClick={() => setSelectedCoupon(isSelected ? null : coupon)}
                  className={`absolute z-20 cursor-pointer transition-all duration-200 ${
                    isSelected ? "scale-110 z-30" : "hover:scale-105"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    {/* White Card Speech Bubble */}
                    <div className="bg-white/95 backdrop-blur-sm shadow-md hover:shadow-lg border border-border/60 rounded-2xl p-2.5 flex items-center gap-2 max-w-[130px]">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0 border ${coupon.color}`}>
                        {coupon.icon}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[11px] font-bold text-foreground truncate leading-tight">
                          {coupon.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground truncate leading-tight mt-0.5">
                          {coupon.discount}
                        </span>
                      </div>
                    </div>

                    {/* Distance Pill Badge */}
                    <div className="mt-1 bg-[#E8F3FF] border border-[#60AEDD]/30 text-[#2F80ED] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                      {coupon.dist}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Floating Action Button at Bottom */}
            <div className="absolute bottom-3 z-30">
              <button 
                onClick={() => setViewMode("list")}
                className="bg-white/95 backdrop-blur-md border border-border/80 shadow-lg rounded-full px-5 py-2.5 text-xs font-extrabold text-foreground flex items-center gap-2 hover:bg-muted/30 transition-all active:scale-95"
              >
                <span>결제하고 할인받기</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                <span className="w-5 h-5 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center -mr-1">
                  {COUPONS.length}
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* LIST VIEW */
          <div className="flex flex-col gap-2">
            {COUPONS.map(({ name, type, discount, dist, color, icon }) => (
              <div key={name} className="bg-card border border-border rounded-2xl p-3.5 flex items-center gap-3 hover:border-primary/30 transition-colors cursor-pointer active:scale-[0.98]">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl border ${color}`}>{icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${color} font-medium`}>{type}</span>
                  </div>
                  <p className="font-semibold text-sm text-foreground truncate">{name}</p>
                  <p className="text-xs text-muted-foreground">{discount}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-mono text-muted-foreground">{dist}</p>
                  <ChevronRight className="w-4 h-4 text-muted-foreground mt-1"/>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected coupon detail modal / card */}
      {selectedCoupon && viewMode === "map" && (
        <div className="mx-4 bg-primary/10 border border-primary/30 rounded-2xl p-3.5 flex items-center justify-between animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedCoupon.icon}</span>
            <div>
              <p className="text-xs font-bold text-primary">{selectedCoupon.name}</p>
              <p className="text-xs text-foreground font-medium">{selectedCoupon.discount}</p>
            </div>
          </div>
          <button className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-xl shadow-xs">
            쿠폰 받기
          </button>
        </div>
      )}

      {/* 15min city facilities section with interactive time slider */}
      <div className="mx-4 bg-card border border-border rounded-3xl p-5 shadow-xs overflow-hidden flex flex-col gap-4">
        {/* Header & Large Time Display matching reference image */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-extrabold text-base text-foreground tracking-tight">15분 도시 연계 시설</span>
            </div>
            <p className="text-xs text-muted-foreground">현재 위치 기반 도보 접근성 시설 조회</p>
          </div>
          
          {/* Prominent Overlay Time Display */}
          <div className="text-right bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-2xl flex items-baseline gap-1">
            <span className="text-3xl font-black text-primary font-mono leading-none">{selectedCityTime}</span>
            <span className="text-xs font-bold text-primary">분 이내</span>
          </div>
        </div>

        {/* Map View Container with Dynamic Radius Circle */}
        <div className="relative w-full h-[180px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#EEF6FC] via-[#E6F0FA] to-[#DFECF8] border border-border/80 flex items-center justify-center">
          {/* Dynamic Radius Circle based on selectedCityTime */}
          <div 
            className="rounded-full border-2 border-primary/40 bg-primary/10 transition-all duration-300 flex items-center justify-center"
            style={{
              width: `${Math.min(100, Math.max(28, (selectedCityTime / 60) * 100))}%`,
              height: `${Math.min(100, Math.max(28, (selectedCityTime / 60) * 100))}%`,
            }}
          >
            <div className="w-full h-full rounded-full border border-primary/20 bg-primary/5 animate-pulse" />
          </div>

          {/* User Center Pin */}
          <div className="absolute z-10 flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-[#FF4D4D] border-2 border-white shadow-md flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <span className="text-[9px] font-bold text-primary-foreground bg-primary px-1.5 py-0.5 rounded-full mt-1 shadow-2xs">내 위치</span>
          </div>

          {/* Facility Markers on Map */}
          {CITY_FACILITIES.map((facility) => {
            const isAccessible = facility.walkTime <= selectedCityTime;
            return (
              <div
                key={facility.name}
                style={{ top: facility.top, left: facility.left }}
                className={`absolute z-20 transition-all duration-300 flex flex-col items-center ${
                  isAccessible ? "opacity-100 scale-100" : "opacity-35 scale-90"
                }`}
              >
                <div className={`px-2 py-1 rounded-xl shadow-xs border flex items-center gap-1 text-[10px] font-bold transition-colors ${
                  isAccessible ? "bg-white border-primary/40 text-foreground" : "bg-muted/70 border-border text-muted-foreground"
                }`}>
                  <span>{facility.icon}</span>
                  <span>{facility.name}</span>
                  <span className="text-primary font-mono text-[9px]">({facility.walkTime}분)</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Time Range Ruler Dial Bar matching reference screenshot */}
        <div className="bg-[#131728] border border-[#252D47] rounded-2xl p-4 text-white shadow-lg flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
            <span className="font-bold text-gray-200">도보 접근 시간 조절</span>
            <span className="text-[10px] text-gray-500 font-mono">15분 생활권 중심</span>
          </div>

          {/* Ruler Ticks & Slider Container */}
          <div className="relative pt-2 pb-1">
            {/* Tick Marks Bar */}
            <div className="flex justify-between items-end h-3 px-3 mb-2">
              {TIME_STEPS.map((t) => (
                <div key={t} className="flex flex-col items-center">
                  <div className={`w-0.5 transition-all ${t === selectedCityTime ? "h-3 bg-[#FF5A5A]" : t <= 15 ? "h-2 bg-gray-400" : "h-1.5 bg-gray-600"}`} />
                </div>
              ))}
            </div>

            {/* Range Input Track */}
            <input
              type="range"
              min="0"
              max={TIME_STEPS.length - 1}
              step="1"
              value={TIME_STEPS.indexOf(selectedCityTime)}
              onChange={(e) => setSelectedCityTime(TIME_STEPS[parseInt(e.target.value)])}
              className="w-full h-2 bg-[#252D47] rounded-lg appearance-none cursor-pointer accent-[#FF5A5A] focus:outline-none"
            />

            {/* Time Step Labels with Enlarged 5m~15m and Compact 30m~60m */}
            <div className="flex justify-between items-center px-1 mt-3">
              {TIME_STEPS.map((t) => {
                const isMainStep = t <= 15;
                const isSelected = t === selectedCityTime;

                return (
                  <button
                    key={t}
                    onClick={() => setSelectedCityTime(t)}
                    className={`transition-all duration-200 cursor-pointer rounded-xl ${
                      isMainStep
                        ? isSelected
                          ? "px-3 py-1 bg-[#FF5A5A] text-white font-black text-lg shadow-md ring-2 ring-[#FF5A5A]/50 scale-105"
                          : "px-2 py-0.5 text-gray-200 font-extrabold text-base hover:text-white"
                        : isSelected
                          ? "px-2 py-0.5 bg-[#FF5A5A]/25 text-rose-300 font-bold text-xs border border-[#FF5A5A]/40"
                          : "px-1 py-0.5 text-gray-500 font-medium text-[11px] opacity-70 hover:opacity-100"
                    }`}
                  >
                    {t}분
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Facilities Filtered Grid */}
        <div className="grid grid-cols-3 gap-2">
          {CITY_FACILITIES.map((facility) => {
            const isAccessible = facility.walkTime <= selectedCityTime;

            return (
              <div
                key={facility.name}
                className={`p-2.5 rounded-2xl border transition-all flex flex-col items-center text-center ${
                  isAccessible
                    ? "bg-primary/10 border-primary/30 text-foreground font-bold shadow-2xs"
                    : "bg-muted/10 border-border text-muted-foreground opacity-45"
                }`}
              >
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-base">{facility.icon}</span>
                  <span className="text-xs font-bold">{facility.name}</span>
                </div>
                <span className="text-[11px] font-mono font-semibold text-primary">
                  {facility.count}곳 <span className="text-[10px] text-muted-foreground">({facility.walkTime}분)</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}



