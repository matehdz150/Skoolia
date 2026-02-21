"use client";

import React, { useEffect, useRef } from "react";

interface WaveVectorProps {
  stroke?: string;
  strokeWidth?: number;
  duration?: number; // segundos
  animate?: boolean;
  className?: string;
}

export function WaveVector({
  stroke = "#FFCD6C",
  strokeWidth = 24,
  duration = 4,
  animate = true,
  className,
}: WaveVectorProps) {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (!animate || !pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    // configuración inicial
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    // forzar reflow
    path.getBoundingClientRect();

    // animación
    path.style.transition = `stroke-dashoffset ${duration}s ease`;
    path.style.strokeDashoffset = "0";
  }, [animate, duration]);

  return (
    <svg
      viewBox="0 0 1504 982"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        ref={pathRef}
        d="M17.7247 936.202C14.7728 838.031 -13.4094 698.663 89.1485 608.92C127.223 575.94 177.032 569.248 208.134 589.613C251.093 617.637 266.306 666.92 286.259 715.217C309.154 775.58 325.666 839.67 342.746 903.486C364.637 975.613 377.095 1065.41 442.33 1103.95C506.605 1140.9 600.063 1078.55 629.058 999.121C664.762 849.963 659.721 597.697 681.037 455.893C689.186 413.357 732.884 373.783 776.134 376.297C814.71 379.166 839.458 409.099 854.958 438.293C895.265 519.258 944.015 661.286 998.197 725.074C1033.15 771.059 1099.08 752.266 1152.91 707.204C1257.58 615.893 1296.59 420.039 1316.18 305.543C1329.58 213.95 1332.07 123.024 1328.69 33.5658C1318.26 -137.166 1283.64 -274.792 1168.23 -264.014C1121.76 -259.811 1060.56 -227.602 1026.26 -181.79C956.819 -95.277 973.242 -4.46379 1012.69 62.8399C1045.9 124.022 1091.42 174.255 1151.01 209.926C1337.76 324.032 1548.25 204.109 1538.49 -52.7264"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeMiterlimit="10"
      />
    </svg>
  );
}