import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth/getServerUser";
import { OnboardingProvider } from "../../contexts/OnBoardingContext";
import OnboardingLayout from "./OnboardingLayout";

export default async function OnboardingPage() {
  const user = await getServerUser();

  // 🔐 No autenticado
  if (!user) {
    redirect("/auth/login");
  }

  // 🚫 No es private
  if (user.role !== "private") {
    redirect("/");
  }

  // 🚫 Si ya completó onboarding
  if (!user.onboardingRequired) {
    redirect("/schools");
  }

  return (
    <OnboardingProvider>
      <OnboardingLayout />
    </OnboardingProvider>
  );
}