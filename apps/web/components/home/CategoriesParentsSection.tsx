import { WaveVector } from "@/lib/icons/WaveVector";
import { Star } from "lucide-react";
import Testimonials3Cards from "./TestimonialSection";
import TestimonialsSection from "./TestimonialSection";

export default function CategoriesSection() {
  return (
    <section className="w-full px-6 py-16 relative ">
       <h2 className="text-5xl md:text-6xl font-bold text-[#2D2C2B] text-center">
        Nuestros miembros <br /> ya disfrutan
      </h2>
      <img
              src="/illustrations/membersection.svg"
              alt="svg"
              className="absolute top-[-220] left-[-10]  z-0 h-200"
            />
      <div className="max-w-7xl mx-auto mt-10">
        {/* CONTENEDOR UNIFICADO */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] overflow-hidden rounded-3xl min-h-175">
          {/* LEFT SIDE */}
          <div className="relative bg-[#1973FC] p-12 flex flex-col justify-center">
            <div>
              <h2 className="text-4xl sm:text-4xl font-bold leading-tight text-white no">
                Resultados comprobados
                <br />
                mas de 15,000 familias,
                <br />
                confían en Skoolia.
              </h2>

              <p className="mt-2 text-white max-w-xl text-2xl font-light">
                85% Aumento promedio en consultas
                <br />
                Mas de 500 escuelas registradas.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-6 flex items-center gap-4">
              <button className="flex bg-white hover:bg-[#0f172a] text-black font-semibold py-3 rounded-full transition px-10">
                Unete a Skoolia
              </button>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative bg-[#1973FC] relative ">
            <img
              src="https://plus.unsplash.com/premium_photo-1664051271036-caea6900616e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="fam1"
              className="h-77.75 rounded-2xl absolute top-15 left-20"
            />
            <img
              src="/illustrations/families.svg"
              alt="svg"
              className="absolute top-3/12 left-[-10]  z-10 h-50"
            />
            <img
              src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="fam1"
              className="h-40.75 rounded-2xl absolute top-30 right-20"
            />
            <img
              src="https://plus.unsplash.com/premium_photo-1683887033875-4f520a0ec7e0?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="fam1"
              className="h-70.75 rounded-2xl absolute bottom-5 right-1/3"
            />
          </div>
        </div>
        <div className="z-10 relative">
          <TestimonialsSection/>
        </div>
        <img
              src="/illustrations/line-1.svg"
              alt="svg"
              className="absolute bottom-0 left-0 h-260 z-0"
            />
      </div>
    </section>
  );
}
