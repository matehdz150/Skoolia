import { BarChart3, Mail, Play, Users } from "lucide-react";

type CampaignStatus = "PROGRAMADA" | "ENVIADA" | "BORRADOR";

type Campaign = {
	id: number;
	name: string;
	segment: string;
	sent: string;
	status: CampaignStatus;
	date: string;
};

const campaigns: Campaign[] = [
	{
		id: 1,
		name: "Open House Febrero",
		segment: "Leads interesados en Primaria",
		sent: "428 contactos",
		status: "ENVIADA",
		date: "31 ENE 2026",
	},
	{
		id: 2,
		name: "Recordatorio Becas 2026",
		segment: "Todos los leads activos",
		sent: "312 contactos",
		status: "PROGRAMADA",
		date: "HOY 6:00 PM",
	},
	{
		id: 3,
		name: "Campaña Primavera",
		segment: "Leads fríos último año",
		sent: "154 contactos",
		status: "BORRADOR",
		date: "—",
	},
];

function statusClasses(status: CampaignStatus) {
	switch (status) {
		case "PROGRAMADA":
			return "bg-amber-50 text-amber-700";
		case "ENVIADA":
			return "bg-emerald-50 text-emerald-700";
		case "BORRADOR":
		default:
			return "bg-slate-100 text-slate-600";
	}
}

export default function SchoolBroadcastsSection() {
	return (
		<section className="surface rounded-4xl bg-white p-0 shadow-sm ring-1 ring-black/5 overflow-hidden">
			<header className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-100/70">
				<div>
					<h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
						Envíos Masivos
					</h2>
					<p className="mt-1 text-xs sm:text-sm text-slate-600">
						Lanza campañas por correo o WhatsApp a tus leads y familias actuales.
					</p>
				</div>
				<div className="flex flex-wrap items-center gap-2">
					<button className="hidden sm:inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100">
						<BarChart3 size={14} className="text-slate-500" />
						<span>Ver reportes</span>
					</button>
					<button className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow hover:bg-indigo-700">
						<span className="text-base leading-none">+</span>
						<span>Nueva campaña</span>
					</button>
				</div>
			</header>

			<div className="hidden border-b border-slate-100/70 bg-slate-50/60 px-5 py-2 text-[11px] font-semibold text-slate-500 sm:grid sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)_140px_120px] sm:px-6">
				<span>Nombre</span>
				<span>Segmento</span>
				<span>Enviados</span>
				<span className="text-right">Estado</span>
			</div>

			<div className="divide-y divide-slate-100/70">
				{campaigns.map((c) => (
					<div
						key={c.id}
						className="flex flex-col gap-3 px-5 py-4 sm:grid sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)_140px_120px] sm:items-center sm:gap-2 sm:px-6 sm:py-4 hover:bg-slate-50"
					>
						<div className="flex items-start gap-3">
							<div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
								<Mail size={16} />
							</div>
							<div>
								<p className="text-sm font-extrabold text-slate-900">
									{c.name}
								</p>
								<p className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
									{c.date}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2 text-xs text-slate-600">
							<Users size={14} className="text-slate-400" />
							<span className="line-clamp-1">{c.segment}</span>
						</div>
						<div className="text-xs font-semibold text-slate-600">
							{c.sent}
						</div>
						<div className="flex items-center justify-between gap-3 sm:justify-end">
							<span
								className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] sm:text-xs font-bold ${statusClasses(
									c.status,
								)}`}
							>
								{c.status}
							</span>
							<button className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50" aria-label="Ejecutar campaña">
								<Play size={14} />
							</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
