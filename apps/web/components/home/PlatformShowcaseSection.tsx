import { ArrowRight } from "lucide-react";
import { BiRightArrow } from "react-icons/bi";

export default function PlatformShowcaseSection() {
  return (
    <section className="relative w-full py-28 overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-5 relative">
        {/* ===== HEADER ===== */}
        <div className="text-center max-w-6xl mx-auto">
          <h2 className="text-5xl font-semibold text-black">
            Una plataforma, infinitas posibilidades
          </h2>

          <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
            Skoolia ayuda a escuelas y centros educativos en México a captar
            leads calificados mediante marketing segmentado y datos en tiempo
            real.
          </p>

          <div className="mt-8">
            <button className="inline-flex items-center gap-2 rounded-2xl bg-[#2A6EE8] px-8 py-4 text-white font-bold shadow-md hover:bg-[#1f5ed1] transition">
              Empezar ahora
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* ===== GRID ===== */}
        <div className="relative z-10 mt-20 grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Row 1 */}
          <div className="aspect-square rounded-3xl bg-[#FF7E1E]" />
          <img
            src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="aspect-square w-full object-cover rounded-3xl"
          />
          <img
            src="https://images.unsplash.com/photo-1588075592405-d3d4f0846961?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="aspect-square w-full object-cover rounded-3xl"
          />

          {/* Row 2 */}
          <img
            src="https://images.unsplash.com/photo-1613896527026-f195d5c818ed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="aspect-square w-full object-cover rounded-3xl"
          />
          <img
            src="https://images.unsplash.com/photo-1534643960519-11ad79bc19df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="aspect-square w-full object-cover rounded-3xl"
          />
          <div className="aspect-square rounded-3xl bg-[#FABCFA]" />

          {/* Row 3 */}
          <div className="aspect-square rounded-3xl bg-[#FFCE04]" />
          <img
            src="https://images.unsplash.com/photo-1584750153892-38414eb8e76a?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="aspect-square w-full object-cover rounded-3xl"
          />
          <img
            src="https://images.unsplash.com/photo-1598981457915-aea220950616?q=80&w=2093&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="aspect-square w-full object-cover rounded-3xl"
          />
        </div>
      </div>
      <img
        src="/illustrations/line-2.svg"
        alt=""
        className="pointer-events-none absolute bottom-0 left-0 w-full z-0"
      />
    </section>
  );
}
