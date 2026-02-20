import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Rocket,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import Link from "next/link";

export default function CategoriesSection() {
  return (
    <section className=" w-full  px-6 py-0 bg-[#ff6253]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch lg:min-h-150 py-10 px-10">
        {/* LEFT CARD */}
        <div className="relative overflow-hidden rounded-[32px] bg-white p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-neutral-900">
              Preparando para la escuela.
              <br />
              Enseñando a contar,
              <br />
              leer y pensar.
            </h2>

            <p className="mt-6 text-neutral-600 max-w-md">
              Despierta el amor por el aprendizaje en tu hijo. Agenda tu primera
              cita con nosotros.
            </p>
          </div>

          {/* Decorative line SVG */}
          <img
            src="/illustrations/line.svg"
            alt=""
            className="absolute bottom-25 left-50 w-224 opacity-90 pointer-events-none"
          />

          {/* CTA */}
          <div className="mt-12 flex items-center gap-4">
            <button className="flex-1 bg-[#111827] hover:bg-[#0f172a] text-white font-semibold py-4 rounded-full transition">
              Agendar cita
            </button>

            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#111827] text-white">
              <Star className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative overflow-hidden rounded-[32px]">
          <img
            src="https://plus.unsplash.com/premium_photo-1680807869780-e0876a6f3cd5?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Niños aprendiendo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

type CardProps = {
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  description: string;
};

function CategoryCard({ icon, iconColor, title, description }: CardProps) {
  return (
    <div className="rounded-[32px] border border-black/5 bg-white px-7 py-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white ${iconColor}`}
        >
          {icon}
        </div>
        <div>
          <h4 className="text-[18px] font-bold text-black">{title}</h4>
          <p className="mt-1 text-[14px] text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
