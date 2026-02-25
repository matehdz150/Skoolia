"use client";

import { useState } from "react";
import { useOnboarding } from "../../contexts/OnBoardingContext";
import Step1 from "@/components/onboarding/steps/Step1";
import Step2 from "@/components/onboarding/steps/Step2";
import Step3 from "@/components/onboarding/steps/Step3";
import { schoolsService } from "@/lib/services/services/schools.service";
import { schoolCategoriesService } from "@/lib/services/services/schools-categories.service";
import Step4 from "@/components/onboarding/steps/Step4";
import { useRouter } from "next/navigation";

export default function OnboardingLayout() {
  const { state, next, back, setField, validate } = useOnboarding();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);

  const isLastStep = state.step === 4;
  const progress = (state.step / 4) * 100;

  async function handleContinue() {
    // fuerza validación del step actual
    validate();
    if (!state.canContinue) return;
    if (submitting) return;

    try {
      setSubmitting(true);

      // ✅ STEP 1: crear escuela (solo una vez)
      if (state.step === 1) {
        if (!state.data.schoolId) {
          const school = await schoolsService.create({
            name: state.data.schoolName.trim(),
            description: state.data.description?.trim() || undefined,
          });

          // guarda el id para usarlo en step 2 (asignar categorías)
          setField("schoolId", school.id);
        }

        next();
        return;
      }
      if (state.step === 2) {
        const categoryIds = state.data.categories.map((c) => c.id);

        await schoolCategoriesService.assign(categoryIds);

        next();
        return;
      }
      // ✅ STEP 3: actualizar info académica + ciudad
      if (state.step === 3) {
        await schoolsService.update({
          educationalLevel: state.data.educationalLevel,
          institutionType: state.data.institutionType,
          city: state.data.city,
        });

        next();
        return;
      }
      // STEP 4 (FINAL)
      if (isLastStep) {
        await handleSubmit(); // si ya estás recompilando todo aquí
        router.push("/schools");
        return;
      }

      // STEP 2/3: por ahora solo avanza (luego metemos assign categories en step 2)
      if (isLastStep) {
        await handleSubmit();
      } else {
        next();
      }
    } catch (e) {
      console.error("Onboarding error:", e);
      // aquí puedes setear un error UI si quieres
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSubmit() {
    console.log("Enviar al backend:", state.data);
    alert("Onboarding completado 🎉");
  }

  return (
    <div className="min-h-screen flex flex-col justify-between p-8">
      {/* HEADER */}
      <div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-black rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-4 text-sm text-gray-500">Paso {state.step} de 4</p>
      </div>

      {/* STEP CONTENT */}
      <div className="flex-1 flex justify-center">
        {state.step === 1 && <Step1 />}
        {state.step === 2 && <Step2 />}
        {state.step === 3 && <Step3 />}
        {state.step === 4 && <Step4 />}
      </div>

      {/* FOOTER */}
      <div className="flex justify-between mt-8">
        <button
          onClick={back}
          disabled={state.step === 1 || submitting}
          className="px-6 py-2 border rounded disabled:opacity-30"
        >
          Volver
        </button>

        <button
          onClick={handleContinue}
          disabled={!state.canContinue || submitting}
          className="px-6 py-2 bg-black text-white rounded disabled:opacity-30"
        >
          {submitting ? "Guardando..." : isLastStep ? "Finalizar" : "Continuar"}
        </button>
      </div>
    </div>
  );
}
