"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnBoardingContext";
import { Label } from "@/components/ui/label";

export default function Step1() {
  const { state, setField } = useOnboarding();

  return (
    <div className="w-full max-w-3xl space-y-6">
      <p className="text-lg font-light text-neutral-600">
        Configuración de la cuenta
      </p>

      <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight text-black">
        ¿Cómo se llama tu escuela?
      </h1>

      <p className="text-lg sm:text-xl font-light text-neutral-600 max-w-2xl">
        Este es el nombre comercial que verán tus clientes. Más adelante podrás
        añadir la razón social.
      </p>

      <div className="space-y-6">
        {/* 🔹 School Name */}
        <div className="space-y-3">
          <Label className="text-lg font-bold">
            Nombre de la escuela
          </Label>

          <Input
            value={state.data.schoolName}
            onChange={(e) => setField("schoolName", e.target.value)}
            placeholder="Ej. Colegio Sierra Nevada"
            className="
              h-16
              rounded-full
              bg-[#f3f3f3]
              border-0
              text-lg
              px-8
              focus-visible:ring-2
              focus-visible:ring-black
              focus-visible:ring-offset-0
            "
          />

          {state.errors.schoolName && (
            <p className="text-sm text-red-500 px-4">
              {state.errors.schoolName}
            </p>
          )}
        </div>

        {/* 🔹 Website (Optional) */}
        <div className="space-y-3">
          <Label className="text-lg font-bold">
            Página web{" "}
            <span className="font-light text-neutral-500 text-base">
              (Opcional)
            </span>
          </Label>

          <Input
            value={state.data.website}
            onChange={(e) => setField("website", e.target.value)}
            placeholder="Ej. https://colegiosierranevada.edu.mx"
            className="
              h-16
              rounded-full
              bg-[#f3f3f3]
              border-0
              text-lg
              px-8
              focus-visible:ring-2
              focus-visible:ring-black
              focus-visible:ring-offset-0
            "
          />

          {state.errors.website && (
            <p className="text-sm text-red-500 px-4">
              {state.errors.website}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}