"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft, Search, MapPin, SlidersHorizontal, Grid3X3, MoreHorizontal } from "lucide-react";

type Props = {
  q?: string;
  loc?: string;
};

export default function SearchToolbar({ q = "", loc = "México (Todas las zonas)" }: Props) {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-7xl px-6 pt-6">
      <div className="flex items-center gap-3">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100"
        >
          <ChevronLeft className="h-4 w-4" /> Volver
        </button>

        {/* Search input pill */}
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
          <Search className="h-4 w-4 text-slate-500" />
          <input
            className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none"
            defaultValue={q}
            placeholder="Mejores Escuelas"
          />
        </div>

        {/* Location */}
        <div className="hidden md:flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
          <MapPin className="h-4 w-4 text-slate-500" />
          <span>{loc || "México (Todas las zonas)"}</span>
        </div>

        {/* Advanced filters */}
        <button className="hidden sm:flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-700">
          <SlidersHorizontal className="h-4 w-4" />
          Filtros avanzados
        </button>

        {/* View options */}
        <button className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-slate-700 shadow-sm border border-slate-200">
          <Grid3X3 className="h-5 w-5" />
        </button>
        <button className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-slate-700 shadow-sm border border-slate-200">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
