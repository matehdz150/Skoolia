"use client";

import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import React from "react";

/**
 * Convierte slug a PascalCase
 * dumbbell → Dumbbell
 * book-open → BookOpen
 */
function slugToPascalCase(slug: string): string {
  return slug
    .split("-")
    .map((word) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
}

interface CategoryIconProps {
  slug: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
  fallbackIcon?: keyof typeof Icons;
}

/**
 * CategoryIcon
 *
 * - Renderiza icono automáticamente desde slug
 * - Si no existe, usa fallback (School por default)
 * - Seguro para producción
 */
export const CategoryIcon: React.FC<CategoryIconProps> = ({
  slug,
  className,
  size = 20,
  strokeWidth = 2,
  fallbackIcon = "School",
}) => {
  const iconName = slugToPascalCase(slug);

  const Icon =
    (Icons[iconName as keyof typeof Icons] as LucideIcon | undefined) ??
    (Icons[fallbackIcon] as LucideIcon | undefined);

  if (!Icon) return null; // protección extrema

  return (
    <Icon
      className={className}
      size={size}
      strokeWidth={strokeWidth}
    />
  );
};