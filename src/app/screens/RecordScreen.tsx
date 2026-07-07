import { BADGES } from "../data";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis,
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

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Summary card */}
      <div className="mx-4 mt-2 bg-card border border-border rounded-3xl p-5">
        <p className="text-xs text-muted-foreground mb-3 font-mono uppercase tracking-wider">이달의 누적 기록</p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { val: "124.6", unit: "km", label: "총 거리", color: "text-primary" },
            { val: "38", unit: "회", label: "러닝 횟수", color: "text-accent" },
            { val: "8,420", unit: "kcal", label: "소모 칼로리", color: "text-[#B86F16]" },
          ].map(({ val, unit, label, color }) => (
            <div key={label} className="text-center bg-muted/20 rounded-2xl py-3">
              <span className={`text-xl font-black ${color}`} style={{ fontFamily: "'Exo 2',sans-serif" }}>{val}</span>
              <span className="text-xs text-muted-foreground ml-0.5">{unit}</span>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>
        {/* Progress to goal */}
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>월 목표 달성률</span>
            <span className="font-mono text-primary">83% (150km 목표)</span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-5/6 bg-gradient-to-r from-primary to-accent rounded-full"/>
          </div>
        </div>
      </div>

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
        <div className="px-4 flex flex-col gap-3">
          {/* Weekly chart */}
          <div className="bg-card border border-border rounded-3xl p-4">
            <p className="text-sm font-bold text-foreground mb-3">주간 러닝 현황</p>
            <ResponsiveContainer width="100%" height={100}>
              <BarChart data={WEEKLY} barSize={22}>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#7B8796" }} axisLine={false} tickLine={false}/>
                <YAxis hide/>
                <Tooltip contentStyle={{ background:"#FFFFFF", border:"1px solid #DCE3F1", borderRadius:"12px", color:"#17213D", fontSize:11 }} formatter={(v:number)=>[`${v}km`,""]}/>
                <Bar dataKey="km" fill="#60AEDD" radius={[5,5,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Recent runs */}
          {[
            { date: "오늘", name: "광안리 바다 드로잉런", km: "5.2km", time: "38분", icon: "🌊" },
            { date: "2일 전", name: "낙동강 생태공원 산책", km: "7.8km", time: "55분", icon: "🌿" },
            { date: "4일 전", name: "서면 생활권 러닝", km: "3.6km", time: "24분", icon: "🏙️" },
          ].map(({ date, name, km, time, icon }) => (
            <div key={name} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">{icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">{date}</p>
                <p className="font-semibold text-sm text-foreground truncate">{name}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-sm text-primary font-mono">{km}</p>
                <p className="text-xs text-muted-foreground">{time}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "배지" && (
        <div className="px-4">
          <div className="bg-card border border-border rounded-3xl p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-sm text-foreground">획득 배지</span>
              <span className="text-xs font-mono text-primary">3 / 6</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {BADGES.map(({ icon, label, earned }) => (
                <div key={label} className={`flex flex-col items-center p-4 rounded-2xl border text-center transition-all ${earned ? "bg-[#F7D66C]/20 border-[#F7D66C]/50" : "bg-muted/10 border-border opacity-40"}`}>
                  <span className="text-3xl mb-2">{icon}</span>
                  <span className="text-xs text-foreground leading-tight">{label}</span>
                  {earned && <span className="text-xs text-[#D7A72E] mt-1 font-mono">획득!</span>}
                </div>
              ))}
            </div>
            <div className="bg-muted/20 rounded-2xl p-3">
              <p className="text-xs text-muted-foreground font-medium">🎯 다음 배지까지</p>
              <p className="text-sm font-bold text-foreground mt-1">반려견 파트너 — 반려견 동반 산책 3회 남음</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "랭킹" && (
        <div className="px-4 flex flex-col gap-3">
          <div className="bg-card border border-border rounded-3xl p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-sm text-foreground">월간 챌린지 랭킹</span>
              <span className="text-xs font-mono text-muted-foreground">2025년 1월</span>
            </div>
            {[
              { rank: 1, name: "강지훈", sub: "마루와 함께", dist: "312km", badge: "🥇" },
              { rank: 2, name: "박소연", sub: "광안리 러너", dist: "289km", badge: "🥈" },
              { rank: 3, name: "김태양", sub: "초보 도전중", dist: "256km", badge: "🥉" },
              { rank: 24, name: "나 (해피와)", sub: "서면 생활권", dist: "124km", badge: "⚡", isMe: true },
            ].map(({ rank, name, sub, dist, badge, isMe }) => (
              <div key={rank} className={`flex items-center gap-3 p-3 rounded-2xl mb-2 last:mb-0 ${isMe ? "bg-primary/10 border border-primary/30" : "hover:bg-muted/20"}`}>
                <span className="text-xl w-8 text-center">{badge}</span>
                <span className="text-xs text-muted-foreground w-6 font-mono">{rank}</span>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${isMe ? "text-primary" : "text-foreground"}`}>{name}</p>
                  <p className="text-xs text-muted-foreground truncate">{sub}</p>
                </div>
                <span className="text-sm font-mono font-bold text-foreground shrink-0">{dist}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

