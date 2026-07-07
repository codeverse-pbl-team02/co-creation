import { BADGES } from "../data";
import {
  MapPin, Navigation, Zap, Leaf, Award, Users, Star,
  ChevronRight, Check, Share2, Camera, TrendingUp,
  Clock, Target, Heart, Dog, Recycle, Shield, Globe,
  ArrowRight, Activity, Bell, Search, Settings, Play,
  Home, Map, BarChart2, Gift, ChevronLeft, Plus,
  Flame, Wind, Droplets, Timer, X, Filter, Bot
} from "lucide-react";

export function ESGScreen() {
  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Carbon summary card */}
      <div className="mx-4 mt-2 relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#6ACF98]/15 to-[#60AEDD]/10 border border-[#DCE3F1] p-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#6ACF98]/10 rounded-full -translate-y-8 translate-x-8"/>
        <div className="relative">
          <p className="text-xs text-[#4CB57D] font-medium mb-1">🌍 지구 지킴이 리포트</p>
          <p className="text-lg font-bold text-foreground mb-1">
            오늘 <span className="text-[#3B91C1]">4.2km</span>를 걸어
          </p>
          <p className="text-lg font-bold text-foreground mb-4">
            자동차 대비 <span className="text-[#4CB57D]">0.9kg CO₂</span> 절감
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: "18.4kg", label: "이번달 절감", color: "text-[#3B91C1]" },
              { val: "🌳 2그루", label: "나무 효과", color: "text-[#4CB57D]" },
              { val: "247km", label: "누적 거리", color: "text-primary" },
            ].map(({ val, label, color }) => (
              <div key={label} className="bg-background/20 rounded-2xl p-2.5 text-center backdrop-blur-sm">
                <p className={`font-bold text-sm ${color}`}>{val}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plogging */}
      <div className="mx-4 bg-card border border-border rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#6ACF98]/15 to-[#EDF4FB] p-4 border-b border-border">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#6ACF98]/15 border border-[#6ACF98]/30 flex items-center justify-center text-xl shrink-0">♻️</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#6ACF98]/15 text-[#4CB57D] border border-[#6ACF98]/30 font-mono">PLOGGING</span>
              </div>
              <h3 className="font-bold text-foreground">랜드마크 플로깅 챌린지</h3>
              <p className="text-xs text-muted-foreground mt-0.5">부산 랜드마크 주변 달리며 쓰레기 수거 후 인증</p>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {[
            { name: "🌊 광안리 해안 플로깅", participants: "834명", status: "진행중" },
            { name: "🏖️ 해운대 비치 클린", participants: "612명", status: "진행중" },
            { name: "🗼 부산타워 둘레 플로깅", participants: "401명", status: "D-3" },
          ].map(({ name, participants, status }) => (
            <div key={name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm text-foreground font-medium">{name}</p>
                <p className="text-xs text-muted-foreground">{participants} 참여중</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-mono ${status === "진행중" ? "bg-[#6ACF98]/15 text-[#4CB57D] border border-[#6ACF98]/30" : "bg-[#F7D66C]/20 text-[#B86F16] border border-[#F7D66C]/45"}`}>{status}</span>
            </div>
          ))}
          <div className="pt-2 flex gap-2">
            <div className="flex-1 bg-muted/20 rounded-xl p-2 text-center">
              <p className="text-xs text-muted-foreground">이달 참여자</p>
              <p className="font-bold text-[#4CB57D] font-mono">1,847명</p>
            </div>
            <div className="flex-1 bg-muted/20 rounded-xl p-2 text-center">
              <p className="text-xs text-muted-foreground">수거 쓰레기</p>
              <p className="font-bold text-[#4CB57D] font-mono">2.3톤</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barrier-free */}
      <div className="mx-4 bg-card border border-border rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#17213D]/10 to-[#EDF4FB] p-4 border-b border-border">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#17213D]/10 border border-[#17213D]/15 flex items-center justify-center text-xl shrink-0">♿</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#17213D]/10 text-[#17213D] border border-[#17213D]/15 font-mono">BARRIER-FREE</span>
              </div>
              <h3 className="font-bold text-foreground">배리어프리 비대면 러닝</h3>
              <p className="text-xs text-muted-foreground mt-0.5">장애·장소·조건 없이 누구나 참여 가능</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: "🦽", label: "휠체어 최적화 코스" },
              { icon: "👁️", label: "시각 음성 안내" },
              { icon: "🏠", label: "홈 트레이닝 연동" },
              { icon: "🌐", label: "메타버스 런" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 p-3 bg-[#17213D]/5 border border-[#17213D]/10 rounded-xl text-xs text-[#17213D]">
                <span className="text-base">{icon}</span>{label}
              </div>
            ))}
          </div>
          <div className="mt-3 bg-[#17213D]/5 border border-[#17213D]/15 rounded-xl p-3 text-xs text-[#17213D] text-center">
            현재 전국 1,240명 참여중 · 오늘 74명 신규 참여
          </div>
        </div>
      </div>

      {/* Pet challenge */}
      <div className="mx-4 bg-card border border-border rounded-3xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-[#60AEDD]/10 border border-[#60AEDD]/25 flex items-center justify-center text-xl">🐕</div>
          <div>
            <h3 className="font-bold text-foreground text-sm">반려견 산책 챌린지</h3>
            <p className="text-xs text-muted-foreground">부산 반려견 동반 코스 완주 미션</p>
          </div>
        </div>
        <div className="flex gap-2 mb-3">
          <button className="flex-1 py-2.5 bg-accent text-accent-foreground rounded-xl text-xs font-bold flex items-center justify-center gap-1.5">
            <Camera className="w-4 h-4"/>인증샷 올리기
          </button>
          <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 border border-border rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground">
            <Share2 className="w-4 h-4"/>공유
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {BADGES.slice(0, 3).map(({ icon, label }) => (
            <div key={label} className="bg-[#F7D66C]/20 border border-[#F7D66C]/45 rounded-xl p-2.5 text-center">
              <span className="text-2xl">{icon}</span>
              <p className="text-xs text-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

