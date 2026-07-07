export const COURSES = [
  {
    id: 1, name: "광안리 바다 드로잉런", area: "수영구",
    dist: "5.2km", time: "38분", cal: "312kcal",
    diff: "보통", diffColor: "text-[#D7A72E]",
    type: "관광", icon: "🌊",
    color: "from-[#60AEDD] to-[#4A9DCC]",
    cardBg: "from-[#60AEDD]/15 to-[#EDF4FB]",
    border: "border-[#DCE3F1]",
    facilities: ["화장실 4", "음수대 2", "편의점 3"],
    tags: ["바다뷰", "포토스팟", "완주율 94%"],
    rating: 4.9, reviews: 2841,
  },
  {
    id: 2, name: "낙동강 생태공원 산책 코스", area: "강서구",
    dist: "7.8km", time: "55분", cal: "468kcal",
    diff: "쉬움", diffColor: "text-[#4CB57D]",
    type: "공원", icon: "🌿",
    color: "from-[#6ACF98] to-[#60AEDD]",
    cardBg: "from-[#6ACF98]/15 to-[#EDF4FB]",
    border: "border-[#DCE3F1]",
    facilities: ["화장실 6", "운동기구 8", "주차장"],
    tags: ["반려견 OK", "평탄", "생태경관"],
    rating: 4.8, reviews: 1923,
  },
  {
    id: 3, name: "서면 생활권 러닝 루트", area: "부산진구",
    dist: "3.6km", time: "24분", cal: "216kcal",
    diff: "쉬움", diffColor: "text-[#4CB57D]",
    type: "생활권", icon: "🏙️",
    color: "from-[#17213D] to-[#60AEDD]",
    cardBg: "from-[#17213D]/10 to-[#EDF4FB]",
    border: "border-[#DCE3F1]",
    facilities: ["지하철역", "편의점 8", "카페 12"],
    tags: ["출퇴근", "상권연계", "야간 OK"],
    rating: 4.7, reviews: 3102,
  },
  {
    id: 4, name: "해운대 해변 새벽 러닝", area: "해운대구",
    dist: "4.5km", time: "30분", cal: "270kcal",
    diff: "보통", diffColor: "text-[#D7A72E]",
    type: "관광", icon: "🌅",
    color: "from-[#F4A43C] to-[#F7D66C]",
    cardBg: "from-[#F4A43C]/15 to-[#EDF4FB]",
    border: "border-[#DCE3F1]",
    facilities: ["샤워실 2", "음수대 4", "카페 6"],
    tags: ["새벽 추천", "일출 뷰", "포토스팟"],
    rating: 4.9, reviews: 4210,
  },
];

export const POPULARITY = [
  { time: "06시", v: 42 }, { time: "07시", v: 89 },
  { time: "08시", v: 134 }, { time: "09시", v: 78 },
  { time: "18시", v: 156 }, { time: "19시", v: 198 },
  { time: "20시", v: 167 }, { time: "21시", v: 112 },
];

export const WEEKLY = [
  { day: "월", km: 5.2 }, { day: "화", km: 0 }, { day: "수", km: 7.8 },
  { day: "목", km: 3.6 }, { day: "금", km: 0 }, { day: "토", km: 10.2 }, { day: "일", km: 4.5 },
];

export const BADGES = [
  { icon: "🏅", label: "첫 5km", earned: true },
  { icon: "🌊", label: "광안리", earned: true },
  { icon: "🌿", label: "생태러너", earned: true },
  { icon: "🐾", label: "반려견", earned: false },
  { icon: "♻️", label: "플로거", earned: false },
  { icon: "🏆", label: "챔피언", earned: false },
];

export const COUPONS = [
  { name: "바다뷰 카페 파도", type: "카페", discount: "아메리카노 30% 할인", dist: "120m", color: "bg-[#60AEDD]/10 text-[#3B91C1] border-[#60AEDD]/20", icon: "☕" },
  { name: "스포츠 365", type: "스포츠", discount: "러닝화 15% 할인", dist: "340m", color: "bg-[#17213D]/10 text-[#17213D] border-[#17213D]/15", icon: "👟" },
  { name: "낙지볶음 원조집", type: "음식점", discount: "1인 세트 2,000원 할인", dist: "210m", color: "bg-[#F4A43C]/15 text-[#B86F16] border-[#F4A43C]/30", icon: "🍜" },
  { name: "세븐일레븐", type: "편의점", discount: "에너지음료 1+1", dist: "80m", color: "bg-[#6ACF98]/15 text-[#35865E] border-[#6ACF98]/30", icon: "🏪" },
];

