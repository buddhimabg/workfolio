import React from "react";

export function HeroIllustration({
  className = "w-72 h-64",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      <svg
        viewBox="0 0 400 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        <defs>
          <linearGradient
            id="briefcaseGrad"
            x1="50"
            y1="50"
            x2="350"
            y2="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7C3AED" />
            <stop offset="0.5" stopColor="#6D28D9" />
            <stop offset="1" stopColor="#5B21B6" />
          </linearGradient>
          <linearGradient
            id="briefcaseFlap"
            x1="100"
            y1="70"
            x2="300"
            y2="180"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#6D28D9" />
          </linearGradient>
          <linearGradient
            id="goldLock"
            x1="180"
            y1="130"
            x2="220"
            y2="170"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FDE047" />
            <stop offset="1" stopColor="#EAB308" />
          </linearGradient>
          <linearGradient
            id="mugGrad"
            x1="280"
            y1="180"
            x2="340"
            y2="280"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient
            id="plantPot"
            x1="60"
            y1="190"
            x2="120"
            y2="280"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#CBD5E1" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="12"
              stdDeviation="16"
              floodColor="#5B21B6"
              floodOpacity="0.25"
            />
          </filter>
        </defs>

        {/* Soft floor shadow */}
        <ellipse
          cx="200"
          cy="275"
          rx="160"
          ry="25"
          fill="#4C1D95"
          fillOpacity="0.12"
        />

        {/* --- Potted Plant (Left) --- */}
        {/* Pot */}
        <path
          d="M70 210 L110 210 L102 265 L78 265 Z"
          fill="url(#plantPot)"
          filter="url(#softShadow)"
        />
        {/* Pot rim */}
        <rect x="66" y="204" width="48" height="8" rx="4" fill="#E2E8F0" />
        {/* Leaves */}
        <path d="M90 205 Q70 160 55 170 Q75 190 90 205 Z" fill="#22C55E" />
        <path d="M90 205 Q90 140 85 135 Q100 160 90 205 Z" fill="#16A34A" />
        <path d="M90 205 Q110 150 125 160 Q105 185 90 205 Z" fill="#4ADE80" />

        {/* --- 3D Purple Briefcase (Center) --- */}
        <g filter="url(#softShadow)">
          {/* Handle */}
          <path
            d="M165 75 C165 45, 235 45, 235 75"
            stroke="#5B21B6"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M170 75 C170 52, 230 52, 230 75"
            stroke="#8B5CF6"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Main Body */}
          <rect
            x="110"
            y="70"
            width="180"
            height="180"
            rx="28"
            fill="url(#briefcaseGrad)"
          />

          {/* Front Flap */}
          <path
            d="M110 70 L290 70 L290 145 C290 165, 250 185, 200 185 C150 185, 110 165, 110 145 Z"
            fill="url(#briefcaseFlap)"
          />

          {/* Golden Clasp */}
          <rect
            x="188"
            y="145"
            width="24"
            height="28"
            rx="6"
            fill="url(#goldLock)"
          />
          <circle cx="200" cy="155" r="3" fill="#713F12" />
          <rect x="198" y="157" width="4" height="6" rx="1" fill="#713F12" />

          {/* Highlight stitch lines */}
          <path
            d="M125 80 L275 80"
            stroke="#A78BFA"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
        </g>

        {/* --- Coffee Mug with Pens (Right) --- */}
        {/* Pens sticking out */}
        <rect
          x="295"
          y="160"
          width="6"
          height="35"
          rx="3"
          fill="#EC4899"
          transform="rotate(-15 295 160)"
        />
        <rect
          x="310"
          y="155"
          width="6"
          height="40"
          rx="3"
          fill="#3B82F6"
          transform="rotate(5 310 155)"
        />
        <rect
          x="325"
          y="162"
          width="6"
          height="32"
          rx="3"
          fill="#F59E0B"
          transform="rotate(20 325 162)"
        />

        {/* Mug */}
        <g filter="url(#softShadow)">
          {/* Mug handle */}
          <path
            d="M335 210 C355 210, 355 245, 335 245"
            stroke="#FFFFFF"
            strokeWidth="8"
            fill="none"
          />
          {/* Mug cylinder */}
          <rect
            x="285"
            y="195"
            width="55"
            height="65"
            rx="10"
            fill="url(#mugGrad)"
          />
        </g>
      </svg>
    </div>
  );
}

export function ChairIllustration({
  className = "w-36 h-44",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      <svg
        viewBox="0 0 160 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient
            id="chairPurple"
            x1="40"
            y1="20"
            x2="120"
            y2="120"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#6D28D9" />
          </linearGradient>
          <linearGradient
            id="seatPurple"
            x1="30"
            y1="90"
            x2="130"
            y2="120"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7C3AED" />
            <stop offset="1" stopColor="#5B21B6" />
          </linearGradient>
        </defs>

        {/* Floor shadow */}
        <ellipse
          cx="80"
          cy="188"
          rx="50"
          ry="8"
          fill="#5B21B6"
          fillOpacity="0.12"
        />

        {/* Chair Backrest */}
        <rect
          x="52"
          y="15"
          width="56"
          height="75"
          rx="16"
          fill="url(#chairPurple)"
        />
        {/* Headrest */}
        <rect x="62" y="8" width="36" height="16" rx="8" fill="#6D28D9" />

        {/* Armrests */}
        <path
          d="M42 65 L48 85 L35 85"
          stroke="#475569"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M118 65 L112 85 L125 85"
          stroke="#475569"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="32" y="60" width="16" height="6" rx="3" fill="#334155" />
        <rect x="112" y="60" width="16" height="6" rx="3" fill="#334155" />

        {/* Seat Cushion */}
        <rect
          x="42"
          y="90"
          width="76"
          height="20"
          rx="8"
          fill="url(#seatPurple)"
        />

        {/* Central stem */}
        <rect x="76" y="110" width="8" height="45" rx="4" fill="#334155" />

        {/* Wheel base (star base) */}
        <path
          d="M80 155 L40 175"
          stroke="#334155"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M80 155 L120 175"
          stroke="#334155"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M80 155 L80 180"
          stroke="#334155"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Wheels */}
        <circle cx="38" cy="177" r="5" fill="#1E293B" />
        <circle cx="122" cy="177" r="5" fill="#1E293B" />
        <circle cx="80" cy="183" r="5" fill="#1E293B" />
      </svg>
    </div>
  );
}

export function DeskChairIllustration({
  className = "w-28 h-24",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      <svg
        viewBox="0 0 120 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Desk top */}
        <rect x="15" y="55" width="80" height="6" rx="3" fill="#CBD5E1" />
        {/* Desk legs */}
        <rect x="20" y="61" width="4" height="32" rx="2" fill="#94A3B8" />
        <rect x="85" y="61" width="4" height="32" rx="2" fill="#94A3B8" />
        {/* Monitor */}
        <rect x="40" y="32" width="30" height="20" rx="4" fill="#6366F1" />
        <rect x="52" y="52" width="6" height="4" fill="#475569" />
        {/* Desk Lamp */}
        <path
          d="M26 55 L28 42 L34 40"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <polygon points="32,38 38,36 36,44" fill="#F59E0B" />
        {/* Small Purple Chair */}
        <rect x="65" y="44" width="22" height="24" rx="6" fill="#8B5CF6" />
        <rect x="62" y="68" width="28" height="6" rx="3" fill="#6D28D9" />
        <rect x="74" y="74" width="4" height="18" rx="2" fill="#475569" />
        <line
          x1="66"
          y1="92"
          x2="86"
          y2="92"
          stroke="#475569"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function PaperAirplaneIllustration({
  className = "w-12 h-12",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl bg-[#5438DC]/10 p-2.5 ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <path
          d="M21.75 2.25L10.5 13.5M21.75 2.25L14.25 21.75L10.5 13.5M21.75 2.25L2.25 9.75L10.5 13.5"
          stroke="#5438DC"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function StepProfileIcon({
  className = "w-12 h-12",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl bg-[#EDE9FE] text-[#7C3AED] p-3 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-full w-full"
      >
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <circle cx="9" cy="10" r="2.5" />
        <path d="M15 8h2M15 12h2M7 16c0-1.5 1.5-2.5 3-2.5s3 1 3 2.5" />
      </svg>
    </div>
  );
}

export function StepJobIcon({
  className = "w-12 h-12",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl bg-[#FFE4E6] text-[#E11D48] p-3 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-full w-full"
      >
        <circle cx="12" cy="12" r="9" />
        <polygon points="12 8 16 16 8 16" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    </div>
  );
}

export function StepHiredIcon({
  className = "w-12 h-12",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl bg-[#DCFCE7] text-[#16A34A] p-3 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-full w-full"
      >
        <rect x="2" y="6" width="20" height="14" rx="2" />
        <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        <path d="M16 3l2 3M8 3l-2 3" />
      </svg>
    </div>
  );
}
