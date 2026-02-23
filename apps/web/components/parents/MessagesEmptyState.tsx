"use client";
import Link from "next/link";

export default function MessagesEmptyState() {
  return (
    <div className="flex w-full max-w-4xl items-center justify-center bg-white p-4 sm:p-8 rounded-[32px]">
      <div className="relative flex min-h-[450px] w-full items-center justify-center overflow-hidden rounded-[28px] bg-[#F1F3F5] px-6 py-14 sm:px-12">
        
        {/* ===== DECORACIÓN DE NUBES (FONDO) ===== */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
          {/* Nube Superior Izquierda */}
          <div className="absolute -left-10 top-12">
            <svg width="320" height="200" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="90" cy="120" r="50" fill="white" />
              <circle cx="160" cy="80" r="70" fill="white" />
              <circle cx="240" cy="110" r="60" fill="white" />
              <rect x="90" y="80" width="150" height="90" fill="white" />
              <path d="M40 120 Q 40 170 90 170 L 240 170 Q 300 170 300 110 L 40 110 Z" fill="white" />
            </svg>
          </div>

          {/* Nube Inferior Derecha */}
          <div className="absolute -bottom-10 -right-4">
            <svg width="350" height="220" viewBox="0 0 350 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="110" cy="140" r="60" fill="white" />
              <circle cx="200" cy="110" r="80" fill="white" />
              <circle cx="280" cy="150" r="50" fill="white" />
              <rect x="110" y="110" width="170" height="100" fill="white" />
              <path d="M50 140 Q 50 200 110 200 L 280 200 Q 330 200 330 150 L 50 150 Z" fill="white" />
            </svg>
          </div>
        </div>

        {/* ===== CONTENIDO CENTRAL ===== */}
        <div className="relative z-10 mx-auto flex max-w-md flex-col items-center text-center">
          
          {/* Textos */}
          <h2 className="text-[22px] font-bold text-slate-900">
            Aun no hay mensajes
          </h2>
          <p className="mt-1.5 text-sm text-slate-600">
            Inicia conversaciones con escuelas
          </p>

          {/* Gráfico de Burbujas de Mensaje */}
          <div className="relative mt-10 mb-8 h-32 w-full max-w-[320px]">
            
            {/* Burbuja Superior */}
            <div className="absolute right-2 top-0 flex w-[90%] items-center justify-between rounded-full bg-white p-2.5 shadow-[0_8px_20px_rgb(0,0,0,0.06)]">
              <div className="flex items-center gap-3">
                {/* Avatar Naranja */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF7A1A] shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    <polygon fill="white" points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9 12 2" />
                  </svg>
                </div>
                {/* Líneas de texto */}
                <div className="flex flex-col gap-2">
                  <div className="h-2.5 w-24 rounded-full bg-slate-200" />
                  <div className="h-2.5 w-14 rounded-full bg-slate-200" />
                </div>
              </div>
              {/* Icono pequeño derecho */}
              <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#FF9B54]">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                   <line x1="5" y1="12" x2="19" y2="12" />
                 </svg>
              </div>
            </div>

            {/* Burbuja Inferior (Ligeramente rotada) */}
            <div className="absolute bottom-2 left-2 z-10 flex w-[92%] -rotate-[4deg] items-center justify-between rounded-full bg-white p-2.5 shadow-[0_10px_25px_rgb(0,0,0,0.08)]">
              <div className="flex items-center gap-3">
                {/* Avatar Rosa */}
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#FF99E6] shadow-sm">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#E860C4" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20" stroke="#E860C4" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                {/* Líneas de texto */}
                <div className="flex flex-col gap-2">
                  <div className="h-2.5 w-28 rounded-full bg-slate-200" />
                  <div className="h-2.5 w-16 rounded-full bg-slate-200" />
                </div>
              </div>
              {/* Icono pequeño derecho */}
              <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#FFC554]">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                   <line x1="18" y1="6" x2="6" y2="18" />
                   <line x1="6" y1="6" x2="18" y2="18" />
                 </svg>
              </div>
            </div>
            
          </div>

          {/* Botón CTA */}
          <Link
            href="/search"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-[15px] font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg"
          >
            Explorar escuelas
          </Link>
          
        </div>
      </div>
    </div>
  );
}