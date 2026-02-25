import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth/getServerUser";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();

  if (user) {
    redirect("/");
  }

  return <>{children}</>;
}