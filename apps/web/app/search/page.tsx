/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CatalogCard from "@/components/layout/CatalogCard";
import FavoriteDetailModal from "@/components/parents/FavoriteDetailModal";
import SearchToolbar from "@/components/search/SearchToolbar";
import { schoolsFeedService } from "@/lib/services/services/school-feeed.service";
import { schoolsService } from "@/lib/services/services/schools.service";

type CatalogItem = {
  id: string;
  imageSrc: string;
  tags: string[];
  typeLabel: string;
  title: string;
  location: string;
  price: number | string;
  description?: string;
  rating?: number;
  schedule?: string;
  languages?: string;
  studentsPerClass?: number | string;
  enrollmentOpen?: boolean;
  enrollmentYear?: number;
  monthlyPrice?: number;
};

export default function SearchPage() {
  const sp = useSearchParams();
  const q = sp.get("q") ?? "";
  const loc = sp.get("loc") ?? "";
  const tab = (sp.get("tab") ?? "escuelas").toUpperCase();

  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const normalizedLoc =
          loc && loc !== "México (Todas las zonas)" ? loc : undefined;

        const connection = await schoolsFeedService.list({
          filters: {
            search: q || undefined,
            city: normalizedLoc,
          },
          pagination: { first: 24 },
        });

        if (!active) return;

        const mapped: CatalogItem[] = connection.edges.map(({ node }) => {
          const tags: string[] = [];
          if (node.isVerified) tags.push("VERIFICADA");
          if (node.city) tags.push(node.city);

          return {
            id: node.id,
            imageSrc: node.coverImageUrl || node.logoUrl || "",
            tags,
            typeLabel: "ESCUELA",
            title: node.name,
            location: node.city || node.address || "Ubicación no disponible",
            price: node.monthlyPrice ?? "Por definir",
            description: node.description ?? undefined,
            rating: node.averageRating ?? undefined,
            // Campos adicionales (cuando el backend los exponga en este feed):
            schedule: undefined,
            languages: undefined,
            studentsPerClass: undefined,
            enrollmentOpen: undefined,
            enrollmentYear: undefined,
            monthlyPrice: node.monthlyPrice ?? undefined,
          };
        });

        setItems(mapped);
      } catch (err) {
        console.error(err);
        if (active) setError("No se pudieron cargar las escuelas.");
      } finally {
        if (active) setLoading(false);
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [q, loc]);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<CatalogItem | undefined>();
  const openModal = (item: CatalogItem) => {
    setSelected(item);
    setOpen(true);
    // Enriquecer datos del modal con detalles completos
    // si el backend expone más campos vía REST
    (async () => {
      try {
        const full = await schoolsService.getById(item.id);
        setSelected((prev) => (
          prev && prev.id === item.id
            ? {
                ...prev,
                description: full.description ?? prev.description,
                rating: full.averageRating ?? prev.rating,
                schedule: full.schedule ?? prev.schedule,
                languages: full.languages ?? prev.languages,
                studentsPerClass:
                  full.maxStudentsPerClass ?? prev.studentsPerClass,
                enrollmentOpen:
                  full.enrollmentOpen ?? prev.enrollmentOpen,
                enrollmentYear: full.enrollmentYear ?? prev.enrollmentYear,
                monthlyPrice: full.monthlyPrice ?? prev.monthlyPrice,
                // Prefer cover/logo if present
                imageSrc:
                  full.coverImageUrl || full.logoUrl || prev.imageSrc,
                location:
                  full.city || full.address || prev.location,
              }
            : prev
        ));
      } catch (e) {
        // Silencioso: mantenemos datos del feed
        console.warn('No se pudo cargar detalle de la escuela', e);
      }
    })();
  };

  return (
    <>
      <SearchToolbar q={q} loc={loc || "México (Todas las zonas)"} />
      <section className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-extrabold tracking-widest text-indigo-600">
            <span className="grid h-2 w-2 place-items-center rounded-full bg-indigo-600" /> ENCONTRADOS
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            {loading ? "Cargando escuelas..." : `${items.length} Escuelas disponibles`}
          </h1>
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
            key={it.id}
            {...it}
            onCardClick={() => openModal(it)}
            onAction={() => openModal(it)}
          />
        ))}
      </div>

      <FavoriteDetailModal
        open={open}
        onClose={() => setOpen(false)}
        item={
          selected && {
            imageUrl: selected.imageSrc,
            badges: selected.tags,
            level: selected.typeLabel,
            title: selected.title,
            location: selected.location,
            price: selected.price,
            description: selected.description,
            rating: selected.rating,
            schedule: selected.schedule,
            languages: selected.languages,
            studentsPerClass: selected.studentsPerClass,
            enrollmentOpen: selected.enrollmentOpen,
            enrollmentYear: selected.enrollmentYear,
            monthlyPrice: selected.monthlyPrice,
          }
        }
      />
    </section>
    </>
  );
}
