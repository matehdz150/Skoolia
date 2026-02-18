import { ArrowUpRight, MessageCircle, TrendingUp, Users } from "lucide-react";

const cards = [
	{
		label: "Leads totales",
		value: "428",
		variation: "+18%",
		icon: Users,
		accent: "bg-indigo-50 text-indigo-600",
	},
	{
		label: "Mensajes nuevos",
		value: "12",
		variation: "Hoy",
		icon: MessageCircle,
		accent: "bg-emerald-50 text-emerald-600",
	},
	{
		label: "Engagement",
		value: "74%",
		variation: "+5.2%",
		icon: TrendingUp,
		accent: "bg-amber-50 text-amber-600",
	},
];

export default function SchoolKpiCards() {
	return (
		<section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
			{cards.map((card) => {
				const Icon = card.icon;
				return (
					<div
						key={card.label}
						className="surface flex flex-col justify-between rounded-4xl bg-white px-5 py-4 sm:px-6 sm:py-5 shadow-sm ring-1 ring-black/5"
					>
						<div className="flex items-center justify-between gap-2">
							<div>
								<p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
									{card.label}
								</p>
								<p className="mt-2 text-2xl font-extrabold text-slate-900">
									{card.value}
								</p>
							</div>
							<div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${card.accent}`}>
								<Icon size={20} />
							</div>
						</div>
						<div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-slate-500">
							<span className="inline-flex items-center gap-1 text-emerald-600">
								<ArrowUpRight size={12} />
								{card.variation}
							</span>
							<span>Comparado con la semana pasada</span>
						</div>
					</div>
				);
			})}
		</section>
	);
}
