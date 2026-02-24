"use client";
import Link from "next/link";

export default function FavoritesEmptyState() {
  return (
    <div className="relative flex min-h-[450px] w-full max-w-4xl items-center justify-center overflow-hidden rounded-[28px] bg-white px-6 py-14 shadow-sm sm:px-12">
      
      {/* ===== DECORACIÓN SVG ===== */}
      <div className="pointer-events-none absolute inset-0">
        <svg
          viewBox="0 0 1000 500"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* -- Forma Naranja (Inferior Izquierda) -- */}
          <path
            d="M -20,220 C 150,150 300,220 380,380 C 400,430 400,520 400,520 L -20,520 Z"
            fill="#FF7A1A"
          />
          {/* Recortes de nubes (Naranja) */}
          <circle cx="210" cy="420" r="55" fill="#FFFFFF" />
          <circle cx="290" cy="460" r="50" fill="#FFFFFF" />
          <circle cx="120" cy="480" r="60" fill="#FFFFFF" />
          <circle cx="360" cy="500" r="40" fill="#FFFFFF" />

          {/* -- Forma Amarilla (Superior Derecha) -- */}
          <path
            d="M 520,-20 C 520,150 650,250 800,280 C 900,300 1020,250 1020,250 L 1020,-20 Z"
            fill="#FFB000"
          />
          {/* Recortes de nubes (Amarillo - Esquina inferior) */}
          <circle cx="750" cy="270" r="65" fill="#FFFFFF" />
          <circle cx="860" cy="250" r="55" fill="#FFFFFF" />
          <circle cx="940" cy="270" r="45" fill="#FFFFFF" />
          {/* Recortes de nubes (Amarillo - Esquina superior izquierda) */}
          <circle cx="530" cy="90" r="45" fill="#FFFFFF" />
          <circle cx="590" cy="110" r="35" fill="#FFFFFF" />
        </svg>
      </div>

      {/* ===== CONTENIDO ===== */}
      <div className="relative z-10 mx-auto max-w-lg text-center">
        <h3 className="text-xl font-bold text-slate-800">
          Aun no hay favoritos
        </h3>

        <h2 className="mt-2 text-[32px] font-extrabold leading-[1.15] tracking-tight text-slate-800 sm:text-[36px]">
          Explora <span className="text-[#FF7A1A]">escuelas y</span>
          <br />
          <span className="text-[#FF7A1A]">encuentra tus favoritos</span>
        </h2>

        <Link
          href="/search"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#2B2B2B] px-8 py-3.5 text-[15px] font-semibold text-white shadow-md transition hover:bg-black"
        >
          Explorar escuelas
        </Link>
      </div>
    </div>
  );
}