import { useState } from "react";
import confetti from "canvas-confetti";
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
  const [certifyingType, setCertifyingType] = useState<"plogging" | "barrierfree" | null>(null);
  const [certifyingCourse, setCertifyingCourse] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [trashAmount, setTrashAmount] = useState<number>(0.5);
  const [selectedTrashTypes, setSelectedTrashTypes] = useState<string[]>([]);
  const [barrierFreeType, setBarrierFreeType] = useState<string>("휠체어 최적화 코스");
  const [runDistance, setRunDistance] = useState<number>(3.0);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [isBarrierFreeCertified, setIsBarrierFreeCertified] = useState<boolean>(() => {
    return localStorage.getItem("barrier_free_certified") === "true";
  });

  const handlePloggingCertify = (courseName: string) => {
    setCertifyingType("plogging");
    setCertifyingCourse(courseName);
    setUploadedImage(null);
    setTrashAmount(0.5);
    setSelectedTrashTypes([]);
    setShowSuccess(false);
  };

  const handleBarrierFreeCertify = () => {
    setCertifyingType("barrierfree");
    setCertifyingCourse("강서구 낙동강 배리어프리 비대면 러닝 챌린지");
    setUploadedImage(null);
    setBarrierFreeType("휠체어 최적화 코스");
    setRunDistance(3.0);
    setShowSuccess(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fillMockImage = () => {
    if (certifyingType === "plogging") {
      setUploadedImage("https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=600&q=80");
    } else {
      setUploadedImage("https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80");
    }
  };

  const toggleTrashType = (type: string) => {
    setSelectedTrashTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleSubmitCertification = () => {
    if (!uploadedImage) {
      alert("인증 사진을 업로드하거나 테스트 이미지 채우기를 눌러주세요!");
      return;
    }
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (certifyingType === "barrierfree") {
      setIsBarrierFreeCertified(true);
      localStorage.setItem("barrier_free_certified", "true");
    }

    setShowSuccess(true);
  };

  const closeCertify = () => {
    setCertifyingType(null);
    setCertifyingCourse(null);
    setUploadedImage(null);
    setTrashAmount(0.5);
    setSelectedTrashTypes([]);
    setShowSuccess(false);
  };

  return (
    <div className="flex flex-col gap-4 pb-4 relative min-h-full">
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
              <p className="text-xs text-muted-foreground mt-0.5">아름다운 부산을 달리며 쓰레기도 줍고, 상쾌한 초록빛 지구를 함께 만들어요! 🌊✨</p>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {[
            { name: "🌊 광안리 해안 플로깅", participants: "834명", status: "진행중" },
            { name: "🏖️ 해운대 비치 클린", participants: "612명", status: "진행중" },
            { name: "🗼 부산타워 둘레 플로깅", participants: "401명", status: "D-3" },
          ].map(({ name, participants, status }) => (
            <div key={name} className="flex items-center justify-between py-3 border-b border-border last:border-0 gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold shrink-0 ${status === "진행중" ? "bg-[#6ACF98]/15 text-[#4CB57D] border border-[#6ACF98]/30" : "bg-[#F7D66C]/20 text-[#B86F16] border border-[#F7D66C]/45"}`}>{status}</span>
                  <p className="text-sm text-foreground font-semibold truncate">{name}</p>
                </div>
                <p className="text-xs text-muted-foreground">{participants} 참여중</p>
              </div>
              <button
                onClick={() => {
                  if (status === "진행중") {
                    handlePloggingCertify(name);
                  } else {
                    alert(`"${name}" 챌린지는 아직 진행 예정(D-3) 상태입니다. 시작일 이후에 인증할 수 있습니다.`);
                  }
                }}
                className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                  status === "진행중"
                    ? "bg-[#6ACF98]/20 hover:bg-[#6ACF98]/30 text-[#2B794F] border border-[#6ACF98]/40 shadow-sm active:scale-95 cursor-pointer"
                    : "bg-muted text-muted-foreground border border-border cursor-not-allowed opacity-60"
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                인증하기
              </button>
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

      {/* Barrier-free Card */}
      <div className="mx-4 bg-card border border-border rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#17213D]/10 to-[#EDF4FB] p-4 border-b border-border">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#17213D]/10 border border-[#17213D]/15 flex items-center justify-center text-xl shrink-0">♿</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#17213D]/10 text-[#17213D] border border-[#17213D]/15 font-mono">BARRIER-FREE</span>
              </div>
              <h3 className="font-bold text-foreground">배리어프리 비대면 러닝</h3>
              <p className="text-xs text-muted-foreground mt-0.5">장애도, 장소도, 조건도 상관없어요! 누구나 한계 없이 자유롭게 신나게 달려봐요! ♿🏃‍♀️🌈</p>
            </div>
          </div>
        </div>

        {/* Content containing the nested active challenge */}
        <div className="p-4 space-y-4">
          
          {/* Nested Challenge Box (Warm Color Palette) */}
          <div className="bg-gradient-to-br from-[#F4A43C]/10 to-[#F7D66C]/5 border border-[#F4A43C]/25 rounded-2xl p-4 space-y-3 shadow-sm shadow-[#F4A43C]/5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F4A43C]/25 text-[#B86F16] font-bold">진행 중인 챌린지</span>
              <span className="text-[10px] font-mono text-[#B86F16]/90 font-medium">📅 2026.06.21 ~ 2026.07.31</span>
            </div>
            
            <div className="space-y-1">
              <h4 className="font-extrabold text-foreground text-sm">강서구 낙동강 배리어프리 비대면 러닝 챌린지</h4>
              <p className="text-xs text-muted-foreground">낙동강의 시원한 강바람을 맞으며 함께 달려요!</p>
            </div>

            {/* Icons */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: "🦽", label: "휠체어 최적화 코스" },
                { icon: "👁️", label: "시각 음성 안내" },
                { icon: "🏠", label: "홈 트레이닝 연동" },
                { icon: "🌐", label: "메타버스 런" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 p-2 bg-background border border-[#F4A43C]/15 rounded-xl text-[11px] text-[#B86F16] font-semibold">
                  <span className="text-sm">{icon}</span>{label}
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="text-[11px] text-[#B86F16]/80 text-center py-1 bg-background/60 border border-[#F4A43C]/10 rounded-lg font-medium">
              현재 전국 1,240명 참여중 · 오늘 74명 신규 참여
            </div>

            {/* Action & Badge Section in Nested Challenge */}
            <div className="pt-2.5 flex items-center gap-3 border-t border-[#F4A43C]/20">
              
              {/* Badge Preview */}
              <div 
                onClick={() => {
                  if (isBarrierFreeCertified && confirm("획득한 배지를 초기화하시겠습니까? (다시 테스트 가능)")) {
                    setIsBarrierFreeCertified(false);
                    localStorage.removeItem("barrier_free_certified");
                  }
                }}
                className={`flex flex-col items-center shrink-0 cursor-pointer ${isBarrierFreeCertified ? "hover:scale-105" : ""}`}
                title={isBarrierFreeCertified ? "클릭 시 배지 획득 리셋" : "인증 완료 시 획득 가능"}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border transition-all duration-300 ${
                  isBarrierFreeCertified 
                    ? "bg-[#F7D66C]/35 border-[#F7D66C]/60 shadow-sm" 
                    : "bg-background border-border opacity-40 grayscale"
                }`}>
                  🌈
                </div>
                <span className="text-[9px] font-bold text-foreground mt-1">낙동강 배지</span>
                <span className="text-[8px] text-[#D7A72E] font-mono leading-none">{isBarrierFreeCertified ? "획득!" : "미획득"}</span>
              </div>

              {/* Certify Button (Warm Theme) */}
              <button 
                onClick={handleBarrierFreeCertify}
                className="flex-1 py-3 bg-gradient-to-r from-[#F4A43C] to-[#F7D66C] hover:from-[#F4A43C]/90 hover:to-[#F7D66C]/90 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#F4A43C]/10 border border-[#F4A43C]/20 cursor-pointer active:scale-[0.98]"
              >
                <Camera className="w-4 h-4"/>
                인증하고 배지 받기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pet challenge */}
      <div className="mx-4 bg-card border border-border rounded-3xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-[#60AEDD]/10 border border-[#60AEDD]/25 flex items-center justify-center text-xl">🐕</div>
          <div>
            <h3 className="font-bold text-foreground text-sm">반려견 산책 챌린지</h3>
            <p className="text-xs text-muted-foreground">사랑하는 반려견과 발맞춰 부산의 예쁜 길을 걸으며 꼬리 흔들 완주 미션! 🐕🐾</p>
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

      {/* Certification Modal */}
      {certifyingType && certifyingCourse && (
        <div className="absolute inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md animate-in fade-in slide-in-from-bottom duration-300">
          {/* Header */}
          <div className="shrink-0 px-6 py-4 flex items-center justify-between border-b border-border/40 bg-card">
            <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
              <span className="text-lg">{certifyingType === "plogging" ? "♻️" : "♿"}</span> {certifyingType === "plogging" ? "플로깅 인증하기" : "배리어프리 인증하기"}
            </h2>
            <button onClick={closeCertify} className="p-1 hover:bg-muted rounded-full transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            <div>
              <p className="text-xs text-muted-foreground mb-1">인증 챌린지 코스</p>
              <p className="text-base font-bold text-primary">{certifyingCourse}</p>
              {certifyingType === "barrierfree" && (
                <p className="text-[10px] text-muted-foreground mt-0.5">📅 진행 기간: 2026.06.21 ~ 2026.07.31</p>
              )}
            </div>

            {!showSuccess ? (
              <>
                {/* Photo upload section */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-foreground">인증 사진 등록</span>
                  {uploadedImage ? (
                    <div className="relative rounded-2xl overflow-hidden border border-border aspect-video bg-muted group">
                      <img src={uploadedImage} alt="Uploaded preview" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setUploadedImage(null)}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-primary/40 hover:border-primary/70 rounded-2xl p-6 bg-primary/5 hover:bg-primary/10 cursor-pointer transition-all text-center">
                        <Camera className="w-8 h-8 text-primary mb-2" />
                        <span className="text-xs font-semibold text-foreground">사진 촬영 또는 업로드</span>
                        <span className="text-[10px] text-muted-foreground mt-1">
                          {certifyingType === "plogging" ? "수거한 쓰레기 사진을 올려주세요" : "활동 인증 사진 또는 GPS 캡처를 올려주세요"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                      
                      <button
                        type="button"
                        onClick={fillMockImage}
                        className="py-2 bg-card hover:bg-muted border border-border rounded-xl text-xs font-semibold text-primary transition-colors flex items-center justify-center gap-1"
                      >
                        ✨ 테스트용 사진 자동 채우기
                      </button>
                    </div>
                  )}
                </div>

                {certifyingType === "plogging" ? (
                  <>
                    {/* Trash amount slider */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-foreground">수거한 쓰레기 무게</span>
                        <span className="text-xs font-mono font-bold text-[#4CB57D] bg-[#6ACF98]/15 px-2 py-0.5 rounded-full">
                          {trashAmount.toFixed(1)} kg
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="5.0"
                        step="0.1"
                        value={trashAmount}
                        onChange={(e) => setTrashAmount(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-[#4CB57D]"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>0.1kg</span>
                        <span>2.5kg</span>
                        <span>5.0kg</span>
                      </div>
                    </div>

                    {/* Trash types checkbox list */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-foreground">수거한 쓰레기 종류 (중복 선택)</span>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        {["플라스틱", "일반쓰레기", "담배꽁초", "캔 / 유리 / 페트"].map((type) => {
                          const isSelected = selectedTrashTypes.includes(type);
                          return (
                            <button
                              key={type}
                              onClick={() => toggleTrashType(type)}
                              className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                                isSelected
                                  ? "bg-[#6ACF98]/15 border-[#4CB57D] text-[#2B794F]"
                                  : "bg-card border-border text-muted-foreground hover:bg-muted"
                              }`}
                            >
                              {isSelected ? "✓ " : ""} {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Run Distance Slider for Barrier-free */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-foreground">인증할 완주 거리</span>
                        <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {runDistance.toFixed(1)} km
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1.0"
                        max="10.0"
                        step="0.5"
                        value={runDistance}
                        onChange={(e) => setRunDistance(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>1.0km</span>
                        <span>5.5km</span>
                        <span>10.0km</span>
                      </div>
                    </div>

                    {/* Barrier-free Support type */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-foreground">참여한 배리어프리 유형</span>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        {["휠체어 최적화 코스", "시각 음성 안내", "홈 트레이닝 연동", "메타버스 런"].map((type) => {
                          const isSelected = barrierFreeType === type;
                          return (
                            <button
                              key={type}
                              onClick={() => setBarrierFreeType(type)}
                              className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                                isSelected
                                  ? "bg-primary/15 border-primary text-primary"
                                  : "bg-card border-border text-muted-foreground hover:bg-muted"
                              }`}
                            >
                              {isSelected ? "✓ " : ""} {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                {/* Submit button directly under choices */}
                <div className="pt-2">
                  <button
                    onClick={handleSubmitCertification}
                    disabled={!uploadedImage}
                    className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                      uploadedImage
                        ? "bg-primary hover:bg-primary/95 text-primary-foreground shadow-md active:scale-[0.98] cursor-pointer"
                        : "bg-muted text-muted-foreground border border-border cursor-not-allowed opacity-50"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    인증 완료하기
                  </button>
                </div>
              </>
            ) : (
              /* Success screen inside modal */
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center py-6 text-center space-y-4 animate-in zoom-in-95 duration-300">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                    certifyingType === "plogging" ? "bg-[#6ACF98]/20 border border-[#6ACF98]/50" : "bg-primary/20 border border-primary/50"
                  }`}>
                    {certifyingType === "plogging" ? "🌳" : "🌈"}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-foreground">인증 완료!</h3>
                    <p className={`text-xs font-bold ${certifyingType === "plogging" ? "text-[#4CB57D]" : "text-primary"}`}>
                      {certifyingType === "plogging" ? "초록빛 부산 만들기에 동참해주셨습니다." : "장애 없는 배리어프리 세상을 위한 발걸음!"}
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F7D66C]/20 border border-[#F7D66C]/40 rounded-full mt-2 text-xs font-bold text-[#B86F16] animate-bounce">
                      🏅 [{certifyingType === "plogging" ? "플로거" : "낙동강 배지"}] 배지 획득!
                    </div>
                  </div>

                  <div className={`w-full rounded-2xl p-4 text-left border space-y-2 ${
                    certifyingType === "plogging" ? "bg-[#6ACF98]/10 border-[#6ACF98]/20" : "bg-primary/5 border-primary/10"
                  }`}>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">획득 보상</span>
                      <span className={`font-bold ${certifyingType === "plogging" ? "text-[#4CB57D]" : "text-primary"}`}>
                        {certifyingType === "plogging" ? "+100 그린 마일리지" : "+150 그린 마일리지"}
                      </span>
                    </div>
                    {certifyingType === "plogging" ? (
                      <>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">지구 구하기</span>
                          <span className="font-bold text-[#4CB57D]">-{(trashAmount * 0.22).toFixed(2)}kg CO₂ 절감</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">수거량</span>
                          <span className="font-bold text-foreground">{trashAmount.toFixed(1)}kg</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">종류</span>
                          <span className="font-bold text-foreground truncate max-w-[150px]">
                            {selectedTrashTypes.length > 0 ? selectedTrashTypes.join(", ") : "기타 쓰레기"}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">지구 구하기</span>
                          <span className="font-bold text-primary">-{(runDistance * 0.15).toFixed(2)}kg CO₂ 절감</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">완주 거리</span>
                          <span className="font-bold text-foreground">{runDistance.toFixed(1)}km</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">참여 유형</span>
                          <span className="font-bold text-foreground">{barrierFreeType}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Close/Confirm button directly under results */}
                <div className="pt-2">
                  <button
                    onClick={closeCertify}
                    className="w-full py-3.5 bg-primary text-primary-foreground hover:bg-primary/95 rounded-xl font-bold text-xs shadow-md active:scale-[0.98] cursor-pointer"
                  >
                    확인
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
