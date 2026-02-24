import {
  Sparkles,
  Crown,
  DollarSign,
  Percent,
  Megaphone,
} from "lucide-react";

export default function BussinessSections() {
  const items = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Freemium",
      desc: "Presencia básica gratuita para todas las escuelas.",
      highlight: false,
    },
    {
      icon: <Crown className="h-6 w-6" />,
      title: "Suscripción Premium",
      desc: "Visibilidad destacada y herramientas de marketing.",
      highlight: true,
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Pago por Lead",
      desc: "Paga solo por el interés real y contactos directos.",
      highlight: false,
    },
    {
      icon: <Percent className="h-6 w-6" />,
      title: "Comisión por Inscripción",
      desc: "Un modelo justo basado en resultados (1%).",
      highlight: false,
    },
    {
      icon: <Megaphone className="h-6 w-6" />,
      title: "Marketing Segmentado",
      desc: "Envío de correos y notificaciones a padres perfilados.",
      highlight: false,
    },
  ];

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

        {/* ===== GRID ===== */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {items.map((item) => (
            <div
              key={item.title}
              className={`
                rounded-[32px] p-10 transition-all duration-300
                ${
                  item.highlight
                    ? "bg-black text-white shadow-xl scale-[1.02]"
                    : "bg-white text-black border border-black/5 shadow-sm hover:shadow-md"
                }
              `}
            >
              <div
                className={`
                  flex h-12 w-12 items-center justify-center rounded-2xl
                  ${
                    item.highlight
                      ? "bg-white/10 text-white"
                      : "bg-indigo-600/10 text-indigo-600"
                  }
                `}
              >
                {item.icon}
              </div>

              <h3 className="mt-8 text-2xl font-extrabold">
                {item.title}
              </h3>

              <p
                className={`mt-4 text-base ${
                  item.highlight ? "text-white/80" : "text-slate-600"
                }`}
              >
                {item.desc}
              </p>

              <button
                className={`
                  mt-10 w-full rounded-2xl py-3 font-semibold transition
                  ${
                    item.highlight
                      ? "bg-white text-black hover:opacity-90"
                      : "bg-black text-white hover:opacity-90"
                  }
                `}
              >
                Más información
              </button>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}