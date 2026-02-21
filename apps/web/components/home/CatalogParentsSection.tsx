"use client";

import { useState } from "react";
import CatalogCard from "../layout/CatalogCard";

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function CatalogSection() {
  const [activeFilter, setActiveFilter] = useState<string>("Nivel");

  const filters = ["Nivel", "Categorias", "Ciudades", "Cursos", "Recomendado"];

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
    // ...
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 text-center flex flex-col items-center">
      {/* TITLE */}
      <h2 className="text-5xl md:text-6xl font-bold text-[#2D2C2B]">
        Recomendado para <br /> tu familia
      </h2>

      {/* FILTERS */}
      <div className="flex flex-wrap justify-center gap-4 mt-10 max-w-5xl">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`
                flex items-center gap-3
                px-8 h-12 rounded-full text-lg font-semibold
                transition-all duration-300
                ${
                  isActive
                    ? "bg-[#2D2C2B] text-white"
                    : "bg-[#f3f3f3] text-black hover:bg-gray-200"
                }
              `}
            >
              {isActive && <span className="w-3 h-3 rounded-full bg-white" />}
              {filter}
            </button>
          );
        })}
      </div>
      <section className="w-full max-w-7xl mx-auto px-6 mt-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* CARD 1 */}
          <div className="relative rounded-3xl p-10 flex flex-col items-center justify-end text-center bg-[#FFCE04] overflow-hidden">
            <img
              src="/illustrations/card1.svg"
              alt=""
              className="absolute bottom-10 left-0 w-90"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
        linear-gradient(
          to bottom,
          rgba(100,100,100,0.10) 57%,
          rgba(0,0,0,0.18) 81%,
          rgba(0,0,0,0.28) 100%
        )
      `,
              }}
            />

            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2072&auto=format&fit=crop"
              alt=""
              className="w-52 h-52 rounded-full object-cover z-2"
            />
            <h3 className="text-3xl text-white  font-bold my-4 z-2">
              Primarias
            </h3>

            <p className="text-base max-w-xs z-2 text-white pb-10">
              Encuentra las mejores escuelas de educación primaria para tus
              hijos
            </p>
          </div>

          {/* CARD 2 */}
          <div className="relative rounded-3xl p-10 flex flex-col items-center justify-end text-center bg-[#FF7E1E] h-120">
             <img
              src="/illustrations/card2.svg"
              alt=""
              className="absolute top-0 left-0 w-90"
            />

            <div
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{
                background: `
        linear-gradient(
          to bottom,
          rgba(100,100,100,0.10) 57%,
          rgba(0,0,0,0.18) 81%,
          rgba(0,0,0,0.28) 100%
        )
      `,
              }}
            />
            <h3 className="text-3xl font-bold mb-4 z-2 text-white">Secundarias</h3>

            <p className="text-base max-w-xs z-2 text-white pb-10">
              Encuentra las mejores escuelas de educación secundaria
            </p>
          </div>

          {/* CARD 3 */}
          <div className="relative rounded-3xl p-10 flex flex-col items-center text-center justify-end bg-[#FF33FF]/38 overflow-hidden">
            <img
              src="/illustrations/card3.svg"
              alt=""
              className="absolute bottom-0 left-[-20] w-90"
            />

            <div
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{
                background: `
        linear-gradient(
          to bottom,
          rgba(100,100,100,0.10) 57%,
          rgba(0,0,0,0.18) 81%,
          rgba(0,0,0,0.28) 100%
        )
      `,
              }}
            />

            <h3 className="text-3xl font-bold mb-4 text-white z-2">Preparatorias</h3>

            <p className="text-base max-w-xs text-white z-2 pb-10">
              Encuentra las mejores preparatorias para tus hijos
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
