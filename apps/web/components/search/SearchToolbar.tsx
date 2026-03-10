"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, Search, MapPin, SlidersHorizontal, Grid3X3, MoreHorizontal } from "lucide-react";
import { schoolCategoriesService, type Category } from "@/lib/services/services/schools-categories.service";

type Props = {
  q?: string;
  loc?: string;
  level?: string;
  categoryId?: string;
  schedule?: string;
  languages?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "favorites" | "rating" | "recent";
  verified?: boolean;
};

export default function SearchToolbar({
  q = "",
  loc = "México (Todas las zonas)",
  level = "",
  categoryId = "",
  schedule = "",
  languages = "",
  minPrice,
  maxPrice,
  sortBy = "recent",
  verified = false,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState(q);
  const [location, setLocation] = useState(loc);
  const [educationalLevel, setEducationalLevel] = useState(level);
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);
  const [scheduleFilter, setScheduleFilter] = useState(schedule);
  const [languagesFilter, setLanguagesFilter] = useState(languages);
  const [priceMin, setPriceMin] = useState(minPrice != null ? String(minPrice) : "");
  const [priceMax, setPriceMax] = useState(maxPrice != null ? String(maxPrice) : "");
  const [sort, setSort] = useState<"favorites" | "rating" | "recent">(sortBy);
  const [onlyVerified, setOnlyVerified] = useState(verified);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => setQuery(q), [q]);
  useEffect(() => setLocation(loc), [loc]);
  useEffect(() => setEducationalLevel(level), [level]);
  useEffect(() => setSelectedCategoryId(categoryId), [categoryId]);
  useEffect(() => setScheduleFilter(schedule), [schedule]);
  useEffect(() => setLanguagesFilter(languages), [languages]);
  useEffect(() => setPriceMin(minPrice != null ? String(minPrice) : ""), [minPrice]);
  useEffect(() => setPriceMax(maxPrice != null ? String(maxPrice) : ""), [maxPrice]);
  useEffect(() => setSort(sortBy), [sortBy]);
  useEffect(() => setOnlyVerified(verified), [verified]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await schoolCategoriesService.getAllCategories();
        if (!active) return;
        setCategories(data);
      } catch {
        if (!active) return;
        setCategories([]);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const applyFilters = () => {
    const params = new URLSearchParams();
    const normalizedLoc = location.trim();
    const normalizedQuery = query.trim();
    const normalizedLevel = educationalLevel.trim();
    const normalizedSchedule = scheduleFilter.trim();
    const normalizedLanguages = languagesFilter.trim();
    const normalizedMinPrice = priceMin.trim();
    const normalizedMaxPrice = priceMax.trim();

    if (normalizedQuery) params.set("q", normalizedQuery);
    if (normalizedLoc && normalizedLoc !== "México (Todas las zonas)") {
      params.set("loc", normalizedLoc);
    }
    if (normalizedLevel) params.set("level", normalizedLevel);
    if (selectedCategoryId) params.set("categoryId", selectedCategoryId);
    if (normalizedSchedule) params.set("schedule", normalizedSchedule);
    if (normalizedLanguages) params.set("languages", normalizedLanguages);
    if (normalizedMinPrice && !Number.isNaN(Number(normalizedMinPrice))) {
      params.set("minPrice", normalizedMinPrice);
    }
    if (normalizedMaxPrice && !Number.isNaN(Number(normalizedMaxPrice))) {
      params.set("maxPrice", normalizedMaxPrice);
    }
    if (sort !== "recent") params.set("sortBy", sort);
    if (onlyVerified) params.set("verified", "1");
    params.set("tab", "escuelas");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pt-6">
      <div className="flex flex-wrap items-center gap-3">
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") applyFilters();
            }}
            placeholder="Mejores Escuelas"
          />
        </div>

        {/* Location */}
        <div className="hidden md:flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
          <MapPin className="h-4 w-4 text-slate-500" />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") applyFilters();
            }}
            placeholder="México (Todas las zonas)"
            className="w-40 bg-transparent outline-none"
          />
        </div>

        {/* Advanced filters */}
        <button
          onClick={() => setShowAdvanced((prev) => !prev)}
          className="hidden sm:flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros avanzados
        </button>

        <button
          onClick={applyFilters}
          className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
        >
          <Search className="h-4 w-4" />
          Buscar
        </button>

        {/* View options */}
        <button className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-slate-700 shadow-sm border border-slate-200">
          <Grid3X3 className="h-5 w-5" />
        </button>
        <button className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-slate-700 shadow-sm border border-slate-200">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {showAdvanced ? (
        <div className="mt-3 grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Nivel educativo
            <select
              value={educationalLevel}
              onChange={(e) => setEducationalLevel(e.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none"
            >
              <option value="">Todos</option>
              <option value="Maternal">Maternal</option>
              <option value="Preescolar">Preescolar</option>
              <option value="Primaria">Primaria</option>
              <option value="Secundaria">Secundaria</option>
              <option value="Preparatoria">Preparatoria</option>
              <option value="Universidad">Universidad</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Categoría
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none"
            >
              <option value="">Todas</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Horario
            <select
              value={scheduleFilter}
              onChange={(e) => setScheduleFilter(e.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none"
            >
              <option value="">Todos</option>
              <option value="7:30 AM">7:30 AM</option>
              <option value="8:00 AM">8:00 AM</option>
              <option value="8:30 AM">8:30 AM</option>
              <option value="9:00 AM">9:00 AM</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Idioma
            <select
              value={languagesFilter}
              onChange={(e) => setLanguagesFilter(e.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none"
            >
              <option value="">Todos</option>
              <option value="Español">Español</option>
              <option value="Inglés">Inglés</option>
              <option value="Francés">Francés</option>
              <option value="Trilingüe">Trilingüe</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Precio mínimo
            <input
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              placeholder="Ej. 5000"
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Precio máximo
            <input
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              placeholder="Ej. 15000"
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Ordenar por
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "favorites" | "rating" | "recent")}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none"
            >
              <option value="recent">Recientes</option>
              <option value="rating">Mejor calificadas</option>
              <option value="favorites">Más populares</option>
            </select>
          </label>

          <label className="flex items-center gap-2 pt-7 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={onlyVerified}
              onChange={(e) => setOnlyVerified(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            Solo verificadas
          </label>
        </div>
      ) : null}
    </div>
  );
}
