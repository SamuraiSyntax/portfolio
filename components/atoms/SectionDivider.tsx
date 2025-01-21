"use client";

interface SectionDividerProps {
  color: string;
  colorReverse?: string;
  utility?: number;
  utilityReverse?: number;
  reverse?: boolean;
  waveType?: "type1" | "type2" | "type3";
}

export function SectionDivider({
  color,
  colorReverse,
  utility,
  utilityReverse,
  reverse,
  waveType = "type1",
}: SectionDividerProps) {
  const className = `absolute top-2 left-0 w-full text-${
    colorReverse ? colorReverse : color
  }${utility ? `-${utility}` : ""}${
    utilityReverse ? `-${utilityReverse}` : ""
  }`;
  const reverseClass = reverse ? "transform rotate-180" : "-translate-y-full";

  const dropShadowClass = reverse
    ? "drop-shadow-none shadow-none border-none group-hover:drop-shadow-[0_1mm_1mm_rgba(97,59,26,.5)] transition-all duration-300"
    : "drop-shadow-none shadow-none border-none group-hover:drop-shadow-[0_-1mm_1mm_rgba(97,59,26,.5)] transition-all duration-300";

  const wavePaths = {
    type1: "M0,85 C480,70, 960,100, 1440,85 L1440,100 L0,100 Z",
    type2: "M0,90 C480,60, 960,80, 1440,90 L1440,100 L0,100 Z",
    type3: "M0,80 C480,100, 960,50, 1440,80 L1440,100 L0,100 Z",
  };
  return (
    <div className={`${className} ${reverseClass}`}>
      <svg viewBox="0 0 1440 100" className="w-full">
        <path
          fill="currentColor"
          stroke="transparent"
          strokeWidth={0}
          strokeDasharray="0"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0}
          className={`${dropShadowClass}`}
          d={wavePaths[waveType]}
        ></path>
      </svg>
    </div>
  );
}
