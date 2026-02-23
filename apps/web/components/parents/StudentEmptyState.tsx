"use client";

type Props = {
  onAdd: () => void;
};

export default function StudentEmptyState({ onAdd }: Props) {
  return (
    <div className="flex w-full max-w-4xl items-center justify-center rounded-[32px] bg-white p-4 sm:p-8">
      <div className="relative flex min-h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-[28px] bg-[#F47920] px-6 py-14 shadow-sm sm:px-12">
        
        {/* ===== GARABATOS DE FONDO (SVG) ===== */}
        {/* Garabato Inferior Izquierdo */}
        <div className="pointer-events-none absolute bottom-8 left-8">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 80 Q 40 10 70 30 T 10 90 Q 60 70 90 70"
              stroke="#FFC374"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Garabato Superior Derecho */}
        <div className="pointer-events-none absolute right-12 top-12">
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 20 Q 50 -10 80 20 T 10 60 T 80 80"
              stroke="#FFC374"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* ===== GRÁFICO CENTRAL (ESTRELLA Y DESTELLOS) ===== */}
        <div className="pointer-events-none absolute left-1/2 top-10 flex -translate-x-1/2 flex-col items-center">
          {/* Fondo vertical (Píldora naranja claro) */}
          <div className="relative h-64 w-40 rounded-[40px] bg-gradient-to-b from-[#FFA552] to-transparent opacity-80">
            {/* Estrella Principal */}
            <div className="absolute left-1/2 top-8 -translate-x-1/2">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M50 5 L62 35 L95 38 L70 60 L78 92 L50 75 L22 92 L30 60 L5 38 L38 35 L50 5Z"
                  fill="#FFD166"
                  stroke="#FFD166"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            
            {/* Destello Blanco Pequeño (Abajo Derecha) */}
            <div className="absolute bottom-24 right-6">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            </div>
            {/* Destello Amarillo Pequeño (Abajo más a la derecha) */}
            <div className="absolute bottom-16 right-0">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFD166">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* ===== BURBUJAS DE CHAT FLOTANTES ===== */}
        <div className="pointer-events-none absolute inset-0 z-10">
          
          {/* Burbuja Izquierda 1: "Unetet, abrimos ya" */}
          <div className="absolute left-[12%] top-[35%] flex items-center gap-2.5 rounded-full bg-white px-3 py-2 shadow-lg sm:left-[18%]">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                 <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            </div>
            <span className="pr-2 text-[13px] font-bold text-slate-700">Unetet, abrimos ya</span>
          </div>

          {/* Burbuja Izquierda 2: Indicador de escritura */}
          <div className="absolute left-[20%] top-[48%] flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-lg sm:left-[26%]">
            <div className="h-5 w-5 rounded-full bg-[#FF8A1D]" />
            <div className="flex gap-1 pr-1">
              <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            </div>
          </div>

          {/* Burbuja Derecha 1: "Hola! conocenos!" */}
          <div className="absolute right-[10%] top-[32%] flex items-center gap-2.5 rounded-full bg-white px-3 py-2 shadow-lg sm:right-[15%]">
            <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-[#FF99E6]">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="#E860C4">
                 <circle cx="12" cy="8" r="4" />
                 <path d="M4 20C4 16.6 6.6 14 10 14H14C17.4 14 20 16.6 20 20" stroke="#E860C4" strokeWidth="2" strokeLinecap="round"/>
               </svg>
            </div>
            <span className="pr-2 text-[13px] font-bold text-slate-700">Hola! conocenos!</span>
          </div>

          {/* Burbuja Derecha 2: Indicador de escritura */}
          <div className="absolute right-[18%] top-[45%] flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-lg sm:right-[22%]">
            <div className="flex gap-1 pl-1">
              <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            </div>
            <div className="h-5 w-5 rounded-full bg-[#FFD166]" />
          </div>
        </div>

        {/* ===== CONTENIDO INFERIOR (TEXTOS Y BOTÓN) ===== */}
        <div className="relative z-20 mt-64 flex flex-col items-center text-center">
          <h2 className="text-[22px] font-extrabold text-white sm:text-2xl">
            Agrega un estudiante
          </h2>
          <p className="mt-2 max-w-[250px] text-sm text-white/95 leading-relaxed">
            Para obtener recomendaciones y que escuelas puedan encontrarte
          </p>

          <button
            onClick={onAdd}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#222222] px-8 py-3.5 text-[15px] font-semibold text-white shadow-md transition hover:bg-black"
          >
            Agregar estudiante
          </button>
        </div>

      </div>
    </div>
  );
}