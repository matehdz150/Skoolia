import { ReactNode } from "react";
import ParentsCompactSidebar from "./ParentsCompactSidebar";

type Props = {
  active: "favorites" | "messages" | "info" | "history";
  children: ReactNode;
};

export default function ParentsSectionLayout({ active, children }: Props) {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-8">
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-[96px_1fr]">
        <ParentsCompactSidebar active={active} />
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}
