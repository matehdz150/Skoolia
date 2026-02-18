"use client";
import { useEffect, useMemo, useState } from "react";
import CatalogCard from "../layout/CatalogCard";
import FavoriteDetailModal from "./FavoriteDetailModal";
import { favoritesService } from "@/lib/services/services/favorites.service";

type FavoriteItem = {
  id: string;
  imageUrl: string | null;
  title: string;
  location: string;
  price: number | string;
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
  };

  const gridContent = useMemo(() => {
    if (loading) {
      return <p className="text-sm text-slate-600">Cargando favoritos…</p>;
    }
    if (!items.length) {
      return <p className="text-sm text-slate-600">Aún no tienes favoritos.</p>;
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
          }
        }
      />
    </>
  );
}
