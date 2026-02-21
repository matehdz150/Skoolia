"use client";

import React, { useEffect, useRef } from "react";

interface LineBackgroundProps {
  stroke?: string;
  strokeWidth?: number;
  className?: string;
  animate?: boolean;
  duration?: number; // segundos
}

export function LineBackground({
  stroke = "#FFCD6C",
  strokeWidth = 24,
  className,
  animate = true,
  duration = 4,
}: LineBackgroundProps) {
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
      viewBox="0 0 1310 706"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        ref={pathRef}
        d="M12.0003 692.805C18.9426 542.885 69.1296 395.488 154.346 274.679C209.848 196.01 353.799 28.1926 442.473 163.048C483.856 225.98 488.129 457.364 503.169 510.864C531.256 610.678 642.239 601.304 717.181 551.639C818.576 484.464 841.428 370.948 868.196 257.401C880.355 205.827 886.513 150.309 869.154 100.288C851.796 50.3061 805.325 8.17536 754.583 12.2821C689.692 17.4796 648.086 99.4185 666.882 164.47C685.678 229.521 748.749 272.581 813.008 283.368C866.838 292.39 923.895 283.09 974.675 303.897C1071.66 343.645 1101.13 463.65 1146.27 550.361C1179.77 614.694 1228.9 677.068 1297.15 693.937"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeMiterlimit="10"
      />
    </svg>
  );
}