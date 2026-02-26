import Navbar from "@/components/layout/Navbar";

export default function ParentsRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}