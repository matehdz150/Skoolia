import { Edit2, Percent, TicketPercent, Trash2, TrendingUp } from "lucide-react";

type CouponStatus = "NUEVO" | "ACTIVO" | "EXPIRADO";

type Coupon = {
	id: number;
	name: string;
	code: string;
	status: CouponStatus;
	expires: string;
	usage: string;
	usagePercent: number; // 0-100
};

const coupons: Coupon[] = [
	{
		id: 1,
		name: "Beca 15% Primer Ingreso",
		code: "NUEVO2026",
		status: "NUEVO",
		expires: "Vence: 15 Feb 2026",
		usage: "12/50",
		usagePercent: 24,
	},
	{
		id: 2,
		name: "Inscripción Gratis (Fútbol)",
		code: "GOAL100",
		status: "ACTIVO",
		expires: "Vence: 10 Feb 2026",
		usage: "8/10",
		usagePercent: 80,
	},
	{
		id: 3,
		name: "Pronto Pago Marzo",
		code: "EARLY24",
		status: "ACTIVO",
		expires: "Vence: 01 Mar 2026",
		usage: "45/100",
		usagePercent: 45,
	},
];

function statusClasses(status: CouponStatus) {
	switch (status) {
		case "NUEVO":
			return "bg-emerald-50 text-emerald-700";
		case "ACTIVO":
			return "bg-indigo-50 text-indigo-700";
		case "EXPIRADO":
		default:
			return "bg-slate-100 text-slate-600";
	}
}

export default function SchoolOffersSection() {
	return (
		<div className="space-y-5 sm:space-y-6">
			{/* Header principal */}
			<section className="surface flex flex-col justify-between gap-4 rounded-4xl bg-white px-5 py-5 sm:flex-row sm:items-center sm:px-6 sm:py-6 shadow-sm ring-1 ring-black/5">
				<div className="flex items-start gap-4">
					<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
						<TicketPercent size={20} />
					</div>
					<div>
						<h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
							Ofertas & Promociones
						</h2>
						<p className="mt-1 text-xs sm:text-sm text-slate-600">
							Incentiva a los padres con descuentos exclusivos.
						</p>
					</div>
				</div>
				<button className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow hover:bg-indigo-700">
					<span className="text-base leading-none">+</span>
					<span>Crear cupón</span>
				</button>
			</section>

			{/* KPIs */}
			<section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<div className="surface rounded-3xl bg-white px-5 py-4 sm:px-6 sm:py-5 shadow-sm ring-1 ring-black/5">
					<p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
						Uso de cupones
					</p>
					<p className="mt-3 text-2xl font-extrabold text-slate-900">65</p>
				</div>
				<div className="surface flex items-start justify-between rounded-3xl bg-white px-5 py-4 sm:px-6 sm:py-5 shadow-sm ring-1 ring-black/5">
					<div>
						<p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
							Ahorro generado
						</p>
						<p className="mt-3 text-2xl font-extrabold text-slate-900">$24.5k</p>
					</div>
					<div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
						<TrendingUp size={18} />
					</div>
				</div>
				<div className="surface rounded-3xl bg-white px-5 py-4 sm:px-6 sm:py-5 shadow-sm ring-1 ring-black/5">
					<p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
						Cupones activos
					</p>
					<p className="mt-3 text-2xl font-extrabold text-slate-900">2</p>
				</div>
			</section>

			{/* Lista de cupones */}
			<section className="surface rounded-4xl bg-white p-0 shadow-sm ring-1 ring-black/5 overflow-hidden">
				<header className="px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-100/70">
					<h3 className="text-sm sm:text-base font-extrabold text-slate-900">
						Gestionar Cupones
					</h3>
				</header>
				<div className="divide-y divide-slate-100/70">
					{coupons.map((c) => (
						<div
							key={c.id}
							className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4 hover:bg-slate-50"
						>
							<div className="flex items-center gap-3 sm:gap-4">
								<div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
									<Percent size={16} />
								</div>
								<div>
									<p className="text-sm sm:text-base font-extrabold text-slate-900">
										{c.name}
									</p>
									<div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-bold text-slate-500">
										<span className={`inline-flex items-center rounded-full px-3 py-1 ${statusClasses(c.status)}`}>
											{c.status}
										</span>
										<span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold text-white">
											{c.code}
										</span>
										<span className="text-slate-400">{c.expires}</span>
									</div>
								</div>
							</div>
							<div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
								<div className="w-full max-w-xs">
									<div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
										<span>Uso</span>
										<span>{c.usage}</span>
									</div>
									<div className="mt-1 h-1.5 rounded-full bg-slate-100">
										<div
											className="h-1.5 rounded-full bg-violet-600"
											style={{ width: `${c.usagePercent}%` }}
										/>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<button className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50" aria-label="Editar cupón">
										<Edit2 size={14} />
									</button>
									<button className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50" aria-label="Eliminar cupón">
										<Trash2 size={14} />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
