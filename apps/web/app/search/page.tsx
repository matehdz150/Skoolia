"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import CatalogCard from "@/components/layout/CatalogCard";
import FavoriteDetailModal from "@/components/parents/FavoriteDetailModal";

export default function SearchPage() {
  const sp = useSearchParams();
  const q = sp.get("q") ?? "";
  const loc = sp.get("loc") ?? "";
  const tab = (sp.get("tab") ?? "escuelas").toUpperCase();

  const items = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1887&auto=format&fit=crop",
      tags: ["MONTESSORI", "MATERNAL"],
      typeLabel: "ESCUELA",
      title: "Montessori GDL",
      location: "Zapopan, GDL",
      price: 8200,
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1517048676732-d65bcf865c42?q=80&w=1887&auto=format&fit=crop",
      tags: ["INTERNACIONAL", "EXCELENCIA"],
      typeLabel: "ESCUELA",
      title: "Liceo del Sol",
      location: "Monterrey, NL",
      price: 9500,
    },
  ];

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<typeof items[number] | undefined>();
  const openModal = (item: typeof items[number]) => { setSelected(item); setOpen(true); };

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-extrabold tracking-widest text-indigo-600">ENCONTRADOS</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">{items.length} {tab} disponibles</h1>
          {q || loc ? (
            <p className="mt-1 text-sm text-slate-600">
              Mostrando resultados para {q ? `"${q}"` : "todos"}{loc ? ` en ${loc}` : ""}
            </p>
          ) : null}
        </div>
        <div className="hidden md:block">
          <p className="text-sm text-slate-600">Mostrando resultados para <span className="font-semibold">{q || "Educación"}</span></p>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {items.map((it) => (
          <CatalogCard
            key={it.title}
            {...it}
            onCardClick={() => openModal(it)}
            onAction={() => openModal(it)}
          />
        ))}
      </div>

      <FavoriteDetailModal
        open={open}
        onClose={() => setOpen(false)}
        item={selected && {
          imageUrl: selected.imageSrc,
          badges: selected.tags,
          level: selected.typeLabel,
          title: selected.title,
          location: selected.location,
          price: selected.price,
        }}
      />
    </section>
  );
}
