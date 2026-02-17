import { Mail, Phone, User } from "lucide-react";

type LeadStatus = "NUEVO" | "EN PROCESO" | "GANADO" | "NO INTERESADO";

type Lead = {
	id: number;
	name: string;
	program: string;
	channel: string;
	status: LeadStatus;
	ago: string;
};

const leads: Lead[] = [
	{
		id: 1,
		name: "Juan Delgado",
		program: "Primaria Bilingüe · 4.º",
		channel: "Formulario web",
		status: "NUEVO",
		ago: "Hace 2h",
	},
	{
		id: 2,
		name: "María Pérez",
		program: "Secundaria Intensiva Inglés",
		channel: "Campaña Meta Ads",
		status: "EN PROCESO",
		ago: "Ayer",
	},
	{
		id: 3,
		name: "Carlos López",
		program: "Bachillerato Internacional",
		channel: "Recomendación",
		status: "GANADO",
		ago: "Hace 3 días",
	},
];

function statusClasses(status: LeadStatus) {
	switch (status) {
		case "NUEVO":
			return "bg-emerald-50 text-emerald-700";
		case "EN PROCESO":
			return "bg-amber-50 text-amber-700";
		case "GANADO":
			return "bg-indigo-50 text-indigo-700";
		case "NO INTERESADO":
		default:
			return "bg-slate-100 text-slate-600";
	}
}

export default function SchoolLeadsSection() {
	return (
		<section className="surface rounded-4xl bg-white p-0 shadow-sm ring-1 ring-black/5 overflow-hidden">
			<header className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
				<div>
					<h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
						Leads & Interés
					</h2>
					<p className="mt-1 text-xs sm:text-sm text-slate-600">
						Consulta y da seguimiento a las familias interesadas en tus programas.
					</p>
				</div>
				<div className="hidden gap-2 sm:flex">
					<button className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200">
						Hoy
					</button>
					<button className="rounded-2xl bg-white px-3 py-2 text-xs font-bold text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50">
						Últimos 7 días
					</button>
				</div>
			</header>

			<div className="divide-y divide-slate-100/70">
				{leads.map((lead) => (
					<div
						key={lead.id}
						className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 hover:bg-slate-50"
					>
						<div className="flex items-center gap-3 sm:gap-4">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-sm font-extrabold text-indigo-700">
								{lead.name
									.split(" ")
									.map((p) => p[0])
									.join("")}
							</div>
							<div>
								<p className="text-sm sm:text-base font-extrabold text-slate-900">
									{lead.name}
								</p>
								<p className="mt-0.5 text-[11px] sm:text-xs font-bold uppercase tracking-wide text-slate-400">
									{lead.program}
								</p>
								<p className="mt-1 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-semibold text-slate-500">
									<span className="inline-flex items-center gap-1">
										<User size={12} className="text-slate-400" />
										{lead.channel}
									</span>
									<span className="h-1 w-1 rounded-full bg-slate-300" />
									<span>{lead.ago}</span>
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<span
								className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] sm:text-xs font-bold ${statusClasses(
									lead.status,
								)}`}
							>
								{lead.status}
							</span>
							<div className="flex items-center gap-1 sm:gap-2">
								<button className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
									<Phone size={16} />
								</button>
								<button className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
									<Mail size={16} />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
