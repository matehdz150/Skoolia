import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth/getServerUser";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (user.role !== "private") {
    redirect("/");
  }

  return <>{children}</>;
}