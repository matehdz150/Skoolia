"use client";
import { useEffect, useMemo, useState } from "react";
import CatalogCard from "../layout/CatalogCard";
import FavoritesEmptyState from "./FavoritesEmptyState";
import FavoriteDetailModal from "./FavoriteDetailModal";
import { favoritesService } from "@/lib/services/services/favorites.service";
import { schoolsService } from "@/lib/services/services/schools.service";

type FavoriteItem = {
  id: string;
  imageUrl: string | null;
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

export default function FavoritesGrid() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [selected, setSelected] = useState<FavoriteItem | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await favoritesService.listForMe();
        if (!mounted) return;
        const mapped: FavoriteItem[] = data.map((s) => ({
          id: s.id,
          imageUrl: s.coverImageUrl,
          title: s.name,
          location: s.city ?? "",
          price: s.monthlyPrice ?? "N/A",
        }));
        setItems(mapped);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const openModal = (item: FavoriteItem) => {
    setSelected(item);
    setOpen(true);
    
    // Enriquecer datos del modal con detalles completos
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
                studentsPerClass: full.maxStudentsPerClass ?? prev.studentsPerClass,
                enrollmentOpen: full.enrollmentOpen ?? prev.enrollmentOpen,
                enrollmentYear: full.enrollmentYear ?? prev.enrollmentYear,
                monthlyPrice: full.monthlyPrice ?? prev.monthlyPrice,
                imageUrl: full.coverImageUrl || full.logoUrl || prev.imageUrl,
                location: full.city || full.address || prev.location,
              }
            : prev
        ));
      } catch (e) {
        console.warn('No se pudo cargar detalle de la escuela', e);
      }
    })();
  };

  const gridContent = useMemo(() => {
    if (loading) {
      return <p className="text-sm text-slate-600">Cargando favoritos…</p>;
    }
    if (!items.length) {
      return <FavoritesEmptyState />;
    }
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map((item) => (
          <CatalogCard
            key={item.id}
            imageSrc={item.imageUrl ?? undefined}
            imageAlt={item.title}
            typeLabel={"INSTITUCIÓN"}
            title={item.title}
            location={item.location}
            priceLabel="MENSUALIDAD"
            price={item.price}
            onCardClick={() => openModal(item)}
            onAction={() => openModal(item)}
            isFavorite={true}
            onFavoriteToggle={async () => {
              await favoritesService.toggle(item.id);
              // optimistically remove from list
              setItems((prev) => prev.filter((x) => x.id !== item.id));
            }}
          />
        ))}
      </div>
    );
  }, [items, loading]);

  return (
    <>
      {gridContent}

      <FavoriteDetailModal
        open={open}
        onClose={() => setOpen(false)}
        item={
          selected && {
            imageUrl: selected.imageUrl ?? undefined,
            badges: [],
            level: "INSTITUCIÓN",
            title: selected.title,
            location: selected.location,
            price: typeof selected.price === "number" ? `$${selected.price.toLocaleString()}` : selected.price,
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
    </>
  );
}
