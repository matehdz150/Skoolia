"use client";

import { useOnboarding } from "../../contexts/OnBoardingContext";
import Step1 from "@/components/onboarding/steps/Step1";
import Step2 from "@/components/onboarding/steps/Step2";
import Step3 from "@/components/onboarding/steps/Step3";

export default function OnboardingLayout() {
  const { state, next, back } = useOnboarding();

  const isLastStep = state.step === 4;

  const progress = (state.step / 4) * 100;

  function handleContinue() {
    if (!state.canContinue) return;

    if (isLastStep) {
      handleSubmit();
    } else {
      next();
    }
  }

  async function handleSubmit() {
    console.log("Enviar al backend:", state.data);

    // TODO: aquí va el POST al backend
    // await api.createSchool(state.data)

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

        <p className="mt-4 text-sm text-gray-500">
          Paso {state.step} de 4
        </p>
      </div>

      {/* STEP CONTENT */}
      <div className="flex-1 flex justify-center">
        {state.step === 1 && <Step1 />}
        {state.step === 2 && <Step2 />}
        {state.step === 3 && <Step3 />}
      </div>

      {/* FOOTER */}
      <div className="flex justify-between mt-8">
        <button
          onClick={back}
          disabled={state.step === 1}
          className="px-6 py-2 border rounded disabled:opacity-30"
        >
          Volver
        </button>

        <button
          onClick={handleContinue}
          disabled={!state.canContinue}
          className="px-6 py-2 bg-black text-white rounded disabled:opacity-30"
        >
          {isLastStep ? "Finalizar" : "Continuar"}
        </button>
      </div>
    </div>
  );
}