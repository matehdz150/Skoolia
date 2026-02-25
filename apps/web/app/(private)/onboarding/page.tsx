import { OnboardingProvider } from "../../../contexts/OnBoardingContext";
import OnboardingLayout from "./OnboardingLayout";

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <OnboardingLayout />
    </OnboardingProvider>
  );
}
