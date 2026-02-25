import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth/getServerUser";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();
  

  // 🔐 No autenticado
  if (!user) {
    redirect("/auth/login");
  }

  // 🚫 No es cuenta privada
  if (user.role !== "private") {
    redirect("/");
  }

  // 🏫 Onboarding pendiente
  if (user.onboardingRequired) {
    redirect("/onboarding");
  }

  // ✅ Todo correcto
  return <>{children}</>;
}