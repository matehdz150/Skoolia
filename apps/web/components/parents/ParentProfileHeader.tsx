'use client';
import { Settings } from 'lucide-react';

export default function ParentProfileHeader() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6">
      <div className="rounded-4xl bg-white p-5 sm:p-6 shadow-sm ring-1 ring-black/5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-full ring-4 ring-indigo-100">
              <div className="h-full w-full bg-linear-to-br from-indigo-500 to-purple-500" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                ¡Hola, Mariana! <span className="inline-block">👋</span>
              </h2>
              <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 font-bold text-indigo-700 shadow-sm">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-indigo-600" />
                  Carlos · 12 años
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 font-bold text-emerald-700 shadow-sm">
                  Presupuesto: $12,000+
                </span>
              </div>
            </div>
          </div>

          <button className="mt-2 md:mt-0 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm sm:text-base font-bold text-white shadow hover:bg-indigo-700">
            <Settings size={18} /> Editar Perfil
          </button>
        </div>
      </div>
    </section>
  );
}
