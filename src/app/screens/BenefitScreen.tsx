import { COUPONS } from "../data";
import {
  MapPin, Navigation, Zap, Leaf, Award, Users, Star,
  ChevronRight, Check, Share2, Camera, TrendingUp,
  Clock, Target, Heart, Dog, Recycle, Shield, Globe,
  ArrowRight, Activity, Bell, Search, Settings, Play,
  Home, Map, BarChart2, Gift, ChevronLeft, Plus,
  Flame, Wind, Droplets, Timer, X, Filter, Bot
} from "lucide-react";

export function BenefitScreen() {
  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Dongbaekjeon wallet */}
      <div className="mx-4 mt-2 relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#F7D66C]/24 via-[#F4A43C]/12 to-card border border-[#F7D66C]/45 p-5">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, #F4A43C 1px, transparent 1px)", backgroundSize: "18px 18px" }}/>
        <div className="relative flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-[#B86F16] font-medium mb-0.5">🌸 동백전 포인트</p>
            <p className="text-4xl font-black text-[#D7A72E]" style={{ fontFamily:"'Exo 2',sans-serif" }}>4,820P</p>
            <p className="text-xs text-muted-foreground mt-1">≈ 4,820원 사용 가능</p>
          </div>
          <div className="bg-[#F7D66C]/20 border border-[#F7D66C]/45 rounded-2xl px-3 py-2 text-center">
            <p className="text-xs text-[#B86F16] font-bold">이달 적립</p>
            <p className="text-lg font-black text-[#D7A72E] font-mono">+1,200P</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 py-2.5 bg-[#F7D66C]/20 border border-[#F7D66C]/45 rounded-xl text-xs font-bold text-[#B86F16] hover:bg-[#F7D66C]/30 transition-colors">포인트 사용</button>
          <button className="flex-1 py-2.5 bg-[#F7D66C]/20 border border-[#F7D66C]/45 rounded-xl text-xs font-bold text-[#B86F16] hover:bg-[#F7D66C]/30 transition-colors">사용 내역</button>
        </div>
      </div>

      {/* Flow: Complete → Verify → Earn → Spend */}
      <div className="mx-4 bg-card border border-border rounded-3xl p-4">
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">적립 구조</p>
        <div className="flex items-center justify-between">
          {[
            { icon: "🏃", label: "완주" },
            { icon: "📍", label: "인증" },
            { icon: "🌸", label: "적립" },
            { icon: "🛍️", label: "사용" },
          ].map(({ icon, label }, i, arr) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xl">{icon}</div>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              {i < arr.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground/40 mx-1"/>}
            </div>
          ))}
        </div>
      </div>

      {/* Point history */}
      <div className="mx-4 bg-card border border-border rounded-3xl p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-sm text-foreground">적립 내역</p>
          <span className="text-xs text-primary">전체보기</span>
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

      {/* Nearby coupons */}
      <div className="mx-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-sm text-foreground">📍 내 주변 혜택</p>
          <span className="text-xs text-muted-foreground">광안리 완주 후 추천</span>
        </div>
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
      </div>

      {/* 15min city */}
      <div className="mx-4 bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 rounded-3xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4 text-primary"/>
          <span className="font-bold text-sm text-foreground">15분 도시 연계 시설</span>
        </div>
        <p className="text-xs text-muted-foreground mb-3">현재 위치에서 15분 내 이용 가능한 생활 시설</p>
        <div className="grid grid-cols-3 gap-2">
          {["🏥 의료 3곳", "📚 도서관 1곳", "🌳 공원 5곳", "🚇 지하철 2곳", "🏫 학교 4곳", "🛒 마트 6곳"].map(item => (
            <div key={item} className="bg-card/50 border border-border rounded-xl p-2 text-center text-xs text-muted-foreground">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

