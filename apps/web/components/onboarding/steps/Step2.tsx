"use client";

import { useState, useMemo } from "react";
import { useOnboarding } from "@/contexts/OnBoardingContext";
import { Check } from "lucide-react";
import { CategoryIcon } from "@/components/layout/CategoryIcon";
import { Input } from "@/components/ui/input";

const initialCategories = [
  { id: "1", name: "Deportes", slug: "dumbbell" },
  { id: "2", name: "Bilingüe", slug: "languages" },
  { id: "3", name: "Arte", slug: "palette" },
  { id: "4", name: "Tecnología", slug: "cpu" },
  { id: "5", name: "Robótica", slug: "bot" },
  { id: "6", name: "Teatro", slug: "drama" },
];

const moreCategories = [
  { id: "7", name: "Programación", slug: "code" },
  { id: "8", name: "Para niños", slug: "baby" },
  { id: "9", name: "Para hombres", slug: "mars" },
  { id: "10", name: "Música", slug: "music" },
  { id: "11", name: "Ciencias", slug: "flask-conical" },
  { id: "12", name: "Libros", slug: "book-open" },
];

export default function Step2() {
  const { state, toggleCategory } = useOnboarding();

  const [showMore, setShowMore] = useState(false);
  const [search, setSearch] = useState("");

  function isSelected(id: string) {
    return state.data.categories.some((c) => c.id === id);
  }

  const allCategories = showMore
    ? [...initialCategories, ...moreCategories]
    : initialCategories;

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return allCategories;

    return allCategories.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, allCategories]);

  return (
    <div className="max-w-6xl space-y-10">
      <div>
        <p className="text-lg font-light text-neutral-600">
          Configuración de la cuenta
        </p>

        <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight text-black">
          Selecciona las categorías que describen mejor a la escuela
        </h1>
      </div>

      {/* SEARCH (solo cuando expandes) */}
      {showMore && (
        <div className="w-full">
          <Input
            placeholder="Buscar categorias"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl shadow-none border-none bg-[#f3f3f3] py-6"
          />
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => {
          const selected = isSelected(category.id);

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => toggleCategory(category)}
              className={`
                relative
                flex items-center gap-3
                px-6
                h-20
                rounded-2xl
                border
                transition-all
                text-lg
                font-medium
                ${
                  selected
                    ? "border-blue-500 ring-2 ring-blue-500 bg-blue-50"
                    : "border-neutral-300 hover:border-neutral-400"
                }
              `}
            >
              <CategoryIcon
                slug={category.slug}
                className={`w-5 h-5 ${
                  selected ? "text-blue-600" : "text-neutral-700"
                }`}
              />

              {category.name}

              {selected && (
                <div className="absolute top-3 right-3 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  <Check size={14} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* VER MÁS */}
      {!showMore && (
        <button
          type="button"
          onClick={() => setShowMore(true)}
          className="text-blue-600 font-medium hover:underline"
        >
          Ver más...
        </button>
      )}
    </div>
  );
}