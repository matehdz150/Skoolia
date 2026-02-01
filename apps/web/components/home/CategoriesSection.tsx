import { ArrowRight, BookOpen, GraduationCap, Rocket, Sparkles, Star, Trophy } from "lucide-react";
import Link from "next/link";

export default function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left feature card */}
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-indigo-600 to-violet-600 px-10 py-12 text-white shadow-sm lg:col-span-2 lg:row-span-2 lg:min-h-[360px]">
          {/* subtle radial glow */}
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/12 backdrop-blur-sm">
              <Star className="h-6 w-6" />
            </div>
          </div>

          <h2 className="mt-8 text-[40px] font-extrabold leading-tight sm:text-[48px]">
            Las Mejores
            <br />
            Escuelas 2026
          </h2>
          <p className="mt-6 max-w-xl text-white/85">
            Selección exclusiva de las instituciones líderes en México.
          </p>

          <Link
            href="/ranking"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-[13px] font-semibold tracking-wide backdrop-blur hover:bg-white/25"
          >
            VER RANKING
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          {/* Decorative gradient blob */}
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        </div>

        {/* Category cards */}
        <CategoryCard
          icon={<GraduationCap className="h-6 w-6" />}
          iconColor="bg-blue-600"
          title="Escuelas"
          description="Preescolar a Universidad"
        />

        <CategoryCard
          icon={<Trophy className="h-6 w-6" />}
          iconColor="bg-orange-600"
          title="Deportes"
          description="Fútbol, Natación y más"
        />

        <CategoryCard
          icon={<BookOpen className="h-6 w-6" />}
          iconColor="bg-emerald-600"
          title="Idiomas"
          description="Inglés, Francés, Chino"
        />

        <CategoryCard
          icon={<Sparkles className="h-6 w-6" />}
          iconColor="bg-pink-600"
          title="Arte"
          description="Pintura, Danza y Teatro"
        />
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 rounded-[40px] bg-gradient-to-br from-slate-900 to-indigo-900 px-8 py-10 text-white">
        <div className="flex items-center justify-between gap-6">
          <div>
            <h3 className="text-[24px] font-extrabold">¿Buscas algo específico?</h3>
            <p className="mt-2 text-white/80">
              Prueba nuestra búsqueda inteligente asistida por IA.
            </p>
          </div>

          {/* circular accent */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600">
            <Rocket className="h-7 w-7" />
          </div>
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
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white ${iconColor}`}>{icon}</div>
        <div>
          <h4 className="text-[18px] font-bold text-black">{title}</h4>
          <p className="mt-1 text-[14px] text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}