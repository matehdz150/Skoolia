import { Crown, DollarSign, Megaphone, Percent, Sparkles, Target } from "lucide-react";

export default function BussinessSections() {
	const items = [
		{
			icon: <Sparkles className="h-5 w-5" />,
			title: "Freemium",
			desc: "Presencia básica gratuita para todas las escuelas.",
		},
		{
			icon: <Crown className="h-5 w-5" />,
			title: "Suscripción Premium",
			desc: "Visibilidad destacada y herramientas de marketing.",
		},
		{
			icon: <DollarSign className="h-5 w-5" />,
			title: "Pago por Lead",
			desc: "Paga solo por el interés real y contactos directos.",
		},
		{
			icon: <Percent className="h-5 w-5" />,
			title: "Comisión por Inscripción",
			desc: "Un modelo justo basado en resultados (1%).",
		},
		{
			icon: <Megaphone className="h-5 w-5" />,
			title: "Marketing Segmentado",
			desc: "Envío de correos y notificaciones a padres perfilados.",
		},
	];

	return (
		<section className="w-full py-14 bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
			<div className="mx-auto max-w-7xl px-6">
				{/* Header */}
				<div className="max-w-3xl">
					<span className="text-xs font-bold tracking-widest text-indigo-300 uppercase">
						Modelo de negocio
					</span>
					<h2 className="mt-3 text-[40px] sm:text-[48px] font-extrabold leading-tight text-white">
						Un ecosistema sostenible
						<br /> diseñado para crecer.
					</h2>
					<p className="mt-4 text-white/80">
						Skoolia no solo conecta, sino que optimiza el proceso de inscripción escolar mediante
						un modelo de negocio diversificado y transparente.
					</p>
				</div>

				<div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
					{/* Metrics card */}
					<div className="rounded-[32px] bg-slate-800/60 p-8 shadow-sm">
						<div className="flex items-center gap-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
								<Target className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-extrabold">Metas a 12 Meses</h3>
						</div>

						<div className="mt-8 grid grid-cols-2 gap-x-12 gap-y-6">
							<Metric number="100+" label="ESCUELAS REGISTRADAS" />
							<Metric number="2,000+" label="PADRES ACTIVOS MENSUALES" />
							<Metric number="2% Avg" label="CONVERSIÓN DE LEADS" />
							<Metric number="15%" label="INSTITUCIONES PREMIUM" />
						</div>
					</div>

					{/* Business model items */}
					<div className="flex flex-col gap-6">
						{items.map((it) => (
							<div
								key={it.title}
								className="flex items-center gap-4 rounded-[28px] bg-white/6 px-6 py-5 backdrop-blur-sm border border-white/10"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 text-white">
									{it.icon}
								</div>
								<div>
									<h4 className="text-[16px] font-extrabold">{it.title}</h4>
									<p className="text-[14px] text-white/80">{it.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

function Metric({ number, label }: { number: string; label: string }) {
	return (
		<div>
			<div className="text-2xl font-extrabold">{number}</div>
			<div className="mt-1 text-xs font-bold tracking-widest text-white/70 uppercase">
				{label}
			</div>
		</div>
	);
}

