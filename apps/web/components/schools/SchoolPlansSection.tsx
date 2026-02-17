import { ArrowUpRight, CreditCard, ShieldCheck, Zap } from "lucide-react";

type Feature = {
	label: string;
	highlight?: boolean;
};

type Plan = {
	id: string;
	name: string;
	tagline: string;
	price: string;
	priceSuffix: string;
	icon: JSX.Element;
	popular?: boolean;
	features: Feature[];
};

const plans: Plan[] = [
	{
		id: "freemium",
		name: "Freemium",
		tagline: "Registro gratuito para generar tráfico constante.",
		price: "$0",
		priceSuffix: "/mes",
		icon: <CreditCard className="h-6 w-6 text-slate-500" />,
		features: [
			{ label: "Listado básico" },
			{ label: "Panel de leads" },
			{ label: "Mensajería estándar" },
			{ label: "Soporte vía ticket" },
		],
	},
	{
		id: "premium",
		name: "Suscripción Premium",
		tagline: "Aparición garantizada en la primera galería y búsquedas top.",
		price: "$1,500",
		priceSuffix: "/mes",
		icon: <Zap className="h-6 w-6 text-amber-400" />,
		popular: true,
		features: [
			{ label: "Posicionamiento Top #1", highlight: true },
			{ label: "Badge verificado oro" },
			{ label: "Analytics en tiempo real" },
			{ label: "Consultor IA ilimitado" },
			{ label: "Soporte 24/7" },
		],
	},
	{
		id: "performance",
		name: "Pago por Resultados",
		tagline: "Paga solo por lo que conviertes. Ideal para escalar.",
		price: "Variable",
		priceSuffix: "/mes",
		icon: <ArrowUpRight className="h-6 w-6 text-indigo-500" />,
		features: [
			{ label: "Lead por interés ($)" },
			{ label: "1% comisión por inscripción" },
			{ label: "Acceso a envíos masivos" },
			{ label: "Integración CRM avanzada" },
		],
	},
];

export default function SchoolPlansSection() {
	return (
		<div className="space-y-6">
			<section className="text-center">
				<h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
					Gestiona el plan de Liceo del Sol
				</h1>
				<p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
					Cada institución en Skoolia puede tener su propio nivel de visibilidad. Elige el que mejor se adapte a tus objetivos de captación.
				</p>
			</section>

			<section className="grid grid-cols-1 gap-4 md:grid-cols-3">
				{plans.map((plan) => (
					<article
						key={plan.id}
						className={`relative flex h-full flex-col rounded-4xl bg-white px-6 py-6 shadow-sm ring-1 ring-black/5 ${
							plan.popular ? "md:-mt-4 md:pb-8" : ""
						}`}
					>
						{plan.popular && (
							<div className="absolute inset-x-8 -top-4 flex justify-center">
								<span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
									Más popular
								</span>
							</div>
						)}
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100">
								{plan.icon}
							</div>
							<div>
								<h2 className="text-base sm:text-lg font-extrabold text-slate-900">
									{plan.name}
								</h2>
								<p className="mt-1 text-[11px] sm:text-xs text-slate-500">
									{plan.tagline}
								</p>
							</div>
						</div>

						<div className="mt-4">
							<p className="text-3xl sm:text-4xl font-extrabold text-slate-900">
								{plan.price}
								<span className="ml-1 align-middle text-xs font-semibold text-slate-400">
									{plan.priceSuffix}
								</span>
							</p>
						</div>

						<ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-700">
							{plan.features.map((f) => (
								<li key={f.label} className="flex items-start gap-2">
									<span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
									<span className={f.highlight ? "font-bold" : ""}>{f.label}</span>
								</li>
							))}
						</ul>

						<div className="mt-6">
							<button className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow hover:bg-indigo-700">
								Seleccionar plan
							</button>
						</div>
					</article>
				))}
			</section>

			<section className="surface mt-2 flex flex-col items-start justify-between gap-4 rounded-4xl bg-white px-6 py-5 sm:flex-row sm:items-center sm:px-8 sm:py-6 shadow-sm ring-1 ring-black/5">
				<div className="flex items-start gap-3">
					<div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
						<ShieldCheck size={18} />
					</div>
					<div>
						<h3 className="text-sm sm:text-base font-extrabold text-slate-900">
							Facturación Centralizada
						</h3>
						<p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-xl">
							Gestionamos todos tus pagos en una sola factura mensual, sin importar cuántas escuelas manejes. Transparente y sencillo.
						</p>
					</div>
				</div>
				<button className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow hover:bg-indigo-700">
					Configurar pagos
				</button>
			</section>
		</div>
	);
}
