import AnimatedCounter from "./AnimatedCounter";
import PlatformShowcaseSection from "./PlatformShowcaseSection";

export default function ChallengeInstitutionsSection() {
  return (
    <section className="w-full bg-white py-0">
      <div className="mx-auto max-w-7xl px-6">
        {/* ===== TITLE ===== */}
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-black">
            Resultados comprobados
          </h2>

          <div className="mt-6 h-px w-full bg-black/20" />
        </div>

        {/* ===== STATS GRID ===== */}
        <div className="mt-16 grid grid-cols-1 gap-12 text-center md:grid-cols-3">
          {/* Stat 1 */}
          <div>
            <h3 className="text-6xl font-extrabold text-[#2A6EE8]">
              <AnimatedCounter value={60} suffix="%" />
            </h3>
            <p className="mt-6 text-lg font-semibold text-black">
              Más inscripciones
              <br />
              en el primer año
            </p>
          </div>

          {/* Stat 2 */}
          <div>
            <h3 className="text-6xl font-extrabold text-[#2A6EE8]">
              <AnimatedCounter value={15} suffix="k+" />
            </h3>
            <p className="mt-6 text-lg font-semibold text-black">
              Familias activas en
              <br />
              la plataforma
            </p>
          </div>

          {/* Stat 3 */}
          <div>
            <h3 className="text-6xl font-extrabold text-[#2A6EE8]">
              <AnimatedCounter value={500} suffix="+" />
            </h3>
            <p className="mt-6 text-lg font-semibold text-black">
              Escuelas ya registradas
              <br />
              en la plataforma
            </p>
          </div>
        </div>
      </div>
      <PlatformShowcaseSection />
      {/* Fondo azul */}
      <div className="relative bg-[#2A6EE8] h-312.5 overflow-hidden">
		<div className="h-450 w-[130%] bg-white rounded-full absolute top-[-1200] px-100 left-[-200]"/>
		<img
          src="/illustrations/footerNew.svg"
          alt=""
          className="
                  absolute 
                  left-1/2 
                  -translate-x-1/2 
                  bottom-[-450] 
                  w-[100%] 
                  max-w-none 
                  pointer-events-none 
                  select-none 
                  z-0
                "
        />
      </div>
    </section>
  );
}
