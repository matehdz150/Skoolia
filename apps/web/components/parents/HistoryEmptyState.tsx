"use client";
import Link from "next/link";

export default function HistoryEmptyState() {
  return (
    <div className="flex w-full max-w-4xl items-center justify-center rounded-[32px] bg-white p-4 sm:p-8">
      <div className="relative flex min-h-[450px] w-full flex-col items-center justify-center overflow-hidden rounded-[24px] bg-[#0055FF] px-6 py-14 shadow-sm sm:px-12">
        
        {/* ===== PAISAJE (MONTAÑAS) ===== */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <svg
            viewBox="0 0 1000 500"
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            {/* Montaña Azul Oscuro (Fondo / Derecha) */}
            <path d="M 400 500 L 700 150 L 1000 500 Z" fill="#0031C4" />
            
            {/* Montaña Azul Medio (Centro) */}
            <path d="M 200 500 L 500 220 L 800 500 Z" fill="#0043E0" />
            
            {/* Montaña Azul Oscuro (Frente / Izquierda) */}
            <path d="M -50 500 L 250 180 L 550 500 Z" fill="#001C99" />
          </svg>
        </div>

        {/* ===== ELEMENTOS DECORATIVOS (NUBES Y GARABATOS) ===== */}
        <div className="pointer-events-none absolute inset-0 z-10">
          
          {/* Garabato Amarillo (Izquierda) */}
          <div className="absolute left-[20%] top-[25%]">
             <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M80 50 C 80 20, 40 20, 40 50 C 40 80, 20 80, 20 50 C 20 30, 60 30, 60 60 C 60 90, 80 90, 80 70"
                stroke="#FFD166"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Garabato Amarillo (Derecha) */}
          <div className="absolute right-[22%] top-[45%]">
            <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 40 C 40 20, 80 40, 50 60 C 20 80, 70 80, 90 60"
                stroke="#FFD166"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Nube Azul Claro (Arriba Derecha) */}
          <div className="absolute right-[25%] top-[25%]">
            <svg width="120" height="70" viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="35" cy="45" r="20" fill="#00A3FF" />
              <circle cx="65" cy="30" r="28" fill="#00A3FF" />
              <circle cx="95" cy="45" r="20" fill="#00A3FF" />
              <rect x="35" y="30" width="60" height="35" fill="#00A3FF" />
            </svg>
          </div>

          {/* Nube Blanca Grande (Abajo Izquierda) */}
          <div className="absolute bottom-16 left-[25%]">
             <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="80" r="30" fill="white" />
              <circle cx="100" cy="50" r="45" fill="white" />
              <circle cx="150" cy="75" r="35" fill="white" />
              <rect x="50" y="50" width="100" height="60" fill="white" />
            </svg>
          </div>
        </div>

        {/* ===== CONTENIDO CENTRAL ===== */}
        <div className="relative z-20 mx-auto flex max-w-sm flex-col items-center text-center">
          <p className="text-[15px] font-semibold tracking-wide text-white leading-snug">
            Comienza a explorar para <br /> generar historial
          </p>
          
          <Link
            href="/search"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-[15px] font-bold text-slate-900 shadow-md transition hover:bg-slate-50"
          >
            Explorar escuelas
          </Link>
        </div>
        
      </div>
    </div>
  );
}