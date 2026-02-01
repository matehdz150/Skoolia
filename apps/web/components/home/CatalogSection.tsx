'use client';
import { useState } from "react";
import CatalogCard from "../layout/CatalogCard";

export default function CatalogSection() {
	const [filter, setFilter] = useState<"popular" | "nearby">("popular");

	const items = [
		{
			imageSrc: undefined,
			tags: ["Bilingüe", "Privada"],
			typeLabel: "ESCUELA",
			title: "Colegio Sierra Nevada",
			location: "Polanco, CDMX",
			price: 12500,
			href: "/catalogo/colegio-sierra-nevada",
		},
		{
			imageSrc:
				"https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1887&auto=format&fit=crop",
			tags: ["STEM", "8-12 AÑOS"],
			typeLabel: "CURSO TECH",
			title: "Academia de Robótica",
			location: "Polanco, CDMX",
			price: 1800,
			href: "/catalogo/academia-robotica",
		},
		{
			imageSrc:
				"https://images.unsplash.com/photo-1442605527737-ed62b335d6aa?q=80&w=1974&auto=format&fit=crop",
			tags: ["NATACIÓN", "FÚTBOL"],
			typeLabel: "DEPORTES",
			title: "Centro Deportivo Elite",
			location: "Polanco, CDMX",
			price: 2200,
			href: "/catalogo/centro-deportivo-elite",
		},
	];

	return (
		<section className="mx-auto max-w-7xl px-6 py-10">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-4xl font-extrabold text-slate-900">
						Recomendado para tu familia
					</h2>
					<p className="mt-2 text-slate-600">
						Basado en lo más buscado en tu zona.
					</p>
				</div>
				<div className="flex gap-3">
					<button
						onClick={() => setFilter("popular")}
						className={`rounded-2xl px-4 py-2 text-sm font-semibold ${
							filter === "popular"
								? "bg-slate-900 text-white"
								: "bg-white text-slate-800 shadow-sm"
						}`}
					>
						Populares
					</button>
					<button
						onClick={() => setFilter("nearby")}
						className={`rounded-2xl px-4 py-2 text-sm font-semibold ${
							filter === "nearby"
								? "bg-slate-900 text-white"
								: "bg-white text-slate-800 shadow-sm"
						}`}
					>
						Cerca de ti
					</button>
				</div>
			</div>

			<div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
				{items.map((it) => (
					<CatalogCard key={it.title} {...it} />
				))}
			</div>
		</section>
	);
}

