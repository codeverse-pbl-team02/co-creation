import { useEffect, useState, type ReactNode } from "react";
import { Activity, Bell, Zap, Home, Map, BarChart2, Gift, Leaf } from "lucide-react";
import type { Tab } from "./types";
import { HomeScreen, HomeCourseDetailScreen, HomeRunningLiveScreen, HomeRunningCompleteScreen } from "./screens/HomeScreen";
import { CourseScreen } from "./screens/CourseScreen";
import { RecordScreen } from "./screens/RecordScreen";
import { BenefitScreen } from "./screens/BenefitScreen";
import { ESGScreen } from "./screens/ESGScreen";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("홈");
  const [hideScreenTitle, setHideScreenTitle] = useState(false);
  const [homeCourseFlow, setHomeCourseFlow] = useState<null | "detail" | "running" | "completed">(null);

  useEffect(() => {
    if (activeTab !== "코스") setHideScreenTitle(false);
  }, [activeTab]);

  const TAB_CONFIG: { id: Tab; icon: ReactNode; label: string }[] = [
    { id: "홈", icon: <Home className="w-5 h-5"/>, label: "홈" },
    { id: "코스", icon: <Map className="w-5 h-5"/>, label: "코스" },
    { id: "기록", icon: <BarChart2 className="w-5 h-5"/>, label: "기록" },
    { id: "혜택", icon: <Gift className="w-5 h-5"/>, label: "혜택" },
    { id: "ESG", icon: <Leaf className="w-5 h-5"/>, label: "ESG" },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case "홈": return <HomeScreen onStartCourse={() => setHomeCourseFlow("detail")} />;
      case "코스": return <CourseScreen setHideScreenTitle={setHideScreenTitle} />;
      case "기록": return <RecordScreen />;
      case "혜택": return <BenefitScreen />;
      case "ESG": return <ESGScreen />;
    }
  };

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center"
      style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
    >
      {/* Phone shell */}
      <div
        className="relative flex flex-col bg-background overflow-hidden shadow-2xl shadow-black/60"
        style={{
          width: "min(420px, 100vw)",
          height: "100svh",
          maxHeight: "900px",
          borderRadius: "min(44px, 0px)",
        }}
      >
        {/* Notch / Status bar */}
        <div className="shrink-0 bg-background px-6 pt-3 pb-2 flex items-center justify-between border-b border-border/40">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Activity className="w-3.5 h-3.5 text-background"/>
            </div>
            <span className="text-base font-black tracking-tight" style={{ fontFamily:"'Exo 2',sans-serif" }}>
              뛴<span className="text-primary">DAY</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bell className="w-5 h-5 text-muted-foreground"/>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"/>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">K</div>
          </div>
        </div>

        {/* Screen title */}
        {!hideScreenTitle && (
          <div className="shrink-0 px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-foreground" style={{ fontFamily:"'Exo 2',sans-serif" }}>
              {homeCourseFlow ? <>코스 탐색</> : activeTab === "홈" ? <>안녕하세요, 김러너님 👋</> : activeTab === "코스" ? <>코스 탐색</> : activeTab === "기록" ? <>내 기록</> : activeTab === "혜택" ? <>동백전 · 혜택</> : <>ESG 챌린지</>}
            </h1>
            <p className="text-xs text-muted-foreground">
              {homeCourseFlow ? "AI가 최적 코스를 추천해드려요" : activeTab === "홈" ? "서면역 인근 · 맑음 18°C" : activeTab === "코스" ? "AI가 최적 코스를 추천해드려요" : activeTab === "기록" ? "2025년 1월 누적 기록" : activeTab === "혜택" ? "러닝 완주로 적립한 혜택" : "함께 만드는 더 나은 부산"}
            </p>
          </div>
          {activeTab === "홈" && !homeCourseFlow && (
            <button className="flex items-center gap-1.5 px-3 py-2 bg-primary/10 border border-primary/20 rounded-2xl text-xs font-semibold text-primary">
              <Zap className="w-3.5 h-3.5"/>AI 추천
            </button>
          )}
          </div>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {homeCourseFlow ? (
            <>
              {homeCourseFlow === "detail" && (
                <HomeCourseDetailScreen
                  onBack={() => setHomeCourseFlow(null)}
                  onStart={() => setHomeCourseFlow("running")}
                />
              )}
              {homeCourseFlow === "running" && (
                <HomeRunningLiveScreen onDone={() => setHomeCourseFlow("completed")} />
              )}
              {homeCourseFlow === "completed" && (
                <HomeRunningCompleteScreen onClose={() => setHomeCourseFlow(null)} />
              )}
            </>
          ) : renderScreen()}
        </div>

        {/* Bottom Navigation */}
        <div className="shrink-0 border-t border-border bg-card/95 backdrop-blur-md px-2 pt-2 pb-safe">
          <div className="flex items-center">
            {TAB_CONFIG.map(({ id, icon, label }) => (
              <button
                key={id}
                onClick={() => { setActiveTab(id); setHomeCourseFlow(null); }}
                className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-2xl transition-all ${activeTab === id ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                <div className={`transition-all ${activeTab === id ? "scale-110" : "scale-100"}`}>
                  {icon}
                </div>
                <span className={`text-xs font-medium transition-all ${activeTab === id ? "text-primary font-bold" : ""}`}>
                  {label}
                </span>
                {activeTab === id && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary"/>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop context label */}
      <div className="fixed bottom-6 right-6 hidden lg:flex items-center gap-2 px-4 py-2.5 bg-card/80 backdrop-blur-sm border border-border rounded-full text-xs text-muted-foreground shadow-lg">
        <Activity className="w-3.5 h-3.5 text-primary"/>
        뛴DAY — 부산 AI 러닝 플랫폼
      </div>
    </div>
  );
}