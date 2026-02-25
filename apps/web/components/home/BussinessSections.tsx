import {
  Sparkles,
  Crown,
  DollarSign,
  Percent,
  Megaphone,
} from "lucide-react";

export default function BussinessSections() {
  return (
    <section className="w-full bg-[#f3f3f3] py-28">
      <div className="mx-auto max-w-7xl px-6">

        {/* ===== HEADER ===== */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-6xl font-extrabold text-black">
            Planes flexibles para crecer
          </h2>

          <p className="mt-6 text-lg text-slate-500">
            Un modelo diseñado para adaptarse a cada institución,
            desde presencia básica hasta crecimiento acelerado.
          </p>
        </div>

        {/* ===== PRICING CARDS ===== */}
        <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-2">

          {/* ================== FREEMIUM ================== */}
          <div className="rounded-[40px] bg-white p-12 border border-black/5 shadow-sm">

            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-indigo-600" />
              <span className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                Freemium
              </span>
            </div>

            <div className="mt-10">
              <h3 className="text-6xl font-extrabold text-black">
                $0
                <span className="text-2xl font-semibold text-slate-400"> / mes</span>
              </h3>
            </div>

            <p className="mt-6 text-slate-600">
              Presencia básica gratuita para todas las escuelas.
            </p>

            <ul className="mt-10 space-y-4 text-slate-700">
              <li>• Perfil institucional básico</li>
              <li>• Visibilidad estándar en búsquedas</li>
              <li>• Información pública editable</li>
            </ul>

            <button className="mt-12 w-full rounded-2xl bg-black text-white py-4 font-semibold hover:opacity-90 transition">
              Empezar gratis
            </button>
          </div>

          {/* ================== PREMIUM / CUSTOM ================== */}
          <div className="rounded-[40px] bg-black text-white p-12 shadow-xl relative overflow-hidden">

            <div className="flex items-center gap-3">
              <Crown className="h-6 w-6 text-yellow-400" />
              <span className="text-sm font-semibold uppercase tracking-widest text-white/70">
                Premium & Performance
              </span>
            </div>

            <div className="mt-10">
              <h3 className="text-6xl font-extrabold">
                Custom
              </h3>
            </div>

            <p className="mt-6 text-white/80">
              Modelos avanzados diseñados para maximizar visibilidad,
              generación de leads y resultados medibles.
            </p>

            <ul className="mt-10 space-y-5 text-white/90">

              <li className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 mt-1 text-indigo-400" />
                <span>
                  <strong>Pago por Lead:</strong> Paga solo por el interés real y contactos directos.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Percent className="h-5 w-5 mt-1 text-indigo-400" />
                <span>
                  <strong>Comisión por Inscripción:</strong> Modelo basado en resultados (1%).
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Megaphone className="h-5 w-5 mt-1 text-indigo-400" />
                <span>
                  <strong>Marketing Segmentado:</strong> Correos y notificaciones a padres perfilados.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Crown className="h-5 w-5 mt-1 text-indigo-400" />
                <span>
                  <strong>Suscripción Premium:</strong> Visibilidad destacada y herramientas avanzadas.
                </span>
              </li>

            </ul>

            <button className="mt-12 w-full rounded-2xl bg-white text-black py-4 font-semibold hover:opacity-90 transition">
              Contactar equipo comercial
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}