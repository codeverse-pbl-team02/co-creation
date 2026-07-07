import gangseoMap from "@/imports/gangseo-map.png";
import gwangalliMap from "@/imports/image-2.png";

export function MiniMap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#F8FBFE] ${className}`}>
      <img
        src={gangseoMap}
        alt="부산 강서구 명지동 지도"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <svg
        viewBox="0 0 2048 1260"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="routeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#17213D" floodOpacity="0.18"/>
          </filter>
          <filter id="pinShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#17213D" floodOpacity="0.25"/>
          </filter>
        </defs>

        <path
          d="
            M1048 882
            L735 838
            L779 292
            C783 277 795 270 812 277
            L1139 318
            L1087 838
            L1048 882
            M735 838
            L397 786
            C384 820 383 882 398 939
            C414 997 468 1037 508 1092
            C529 1120 533 1161 520 1210
            M397 786
            C449 807 515 819 584 812
            C564 900 548 988 542 1042
            C535 1099 525 1153 520 1210
          "
          fill="none"
          stroke="#B66A00"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#routeShadow)"
        />
        <path
          d="
            M1048 882
            L735 838
            L779 292
            C783 277 795 270 812 277
            L1139 318
            L1087 838
            L1048 882
            M735 838
            L397 786
            C384 820 383 882 398 939
            C414 997 468 1037 508 1092
            C529 1120 533 1161 520 1210
            M397 786
            C449 807 515 819 584 812
            C564 900 548 988 542 1042
            C535 1099 525 1153 520 1210
          "
          fill="none"
          stroke="#D08412"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g transform="translate(1048 882)" filter="url(#pinShadow)">
          <path
            d="M0 -48 C25 -48 45 -28 45 -3 C45 31 8 54 0 76 C-8 54 -45 31 -45 -3 C-45 -28 -25 -48 0 -48 Z"
            fill="#FF2F86"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          <circle cx="0" cy="-4" r="26" fill="#FFFFFF"/>
          <text x="0" y="3" textAnchor="middle" fontSize="17" fill="#17213D" fontFamily="Noto Sans KR" fontWeight="900">ME</text>
        </g>
      </svg>
    </div>
  );
}



export function GwangalliMap() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#EEF2F7]">
      <img
        src={gwangalliMap}
        alt="광안리 바다 드로잉런 코스 지도"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

