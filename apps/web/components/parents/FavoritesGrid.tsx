"use client";
import { useState } from "react";
import CatalogCard from "../layout/CatalogCard";
import FavoriteDetailModal from "./FavoriteDetailModal";

const demo = [
  {
    id: 1,
    imageUrl: '',
    badges: ['Bilingüe', 'Excelencia'],
    level: 'PRIMARIA / SECUNDARIA',
    title: 'Instituto Tecnológico del Norte',
    location: 'Monterrey, NL',
    price: '$4,500 MXN/mes',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1600&auto=format&fit=crop',
    badges: ['STEM', 'SABATINO'],
    level: 'CURSO EXTRACURRICULAR',
    title: 'Academia de Robótica "Future"',
    location: 'CDMX, Polanco',
    price: '$1,200 MXN/mes',
  },
];

export default function FavoritesGrid() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<typeof demo[number] | undefined>();

  const openModal = (item: typeof demo[number]) => {
    setSelected(item);
    setOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {demo.map((item) => (
          <CatalogCard
            key={item.id}
            imageSrc={item.imageUrl}
            imageAlt={item.title}
            tags={item.badges}
            typeLabel={item.level}
            title={item.title}
            location={item.location}
            priceLabel="MENSUALIDAD"
            price={item.price}
            onCardClick={() => openModal(item)}
            onAction={() => openModal(item)}
          />
        ))}
      </div>

      <FavoriteDetailModal open={open} onClose={() => setOpen(false)} item={selected && {
        imageUrl: selected.imageUrl,
        badges: selected.badges,
        level: selected.level,
        title: selected.title,
        location: selected.location,
        price: selected.price,
      }} />
    </>
  );
}
