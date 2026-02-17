"use client";
import { ChevronDown, LineChart, PlusCircle } from "lucide-react";

export default function SchoolsNavbar() {
	return (
		<header className="w-full pt-4 pb-2">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6">
				<button className="inline-flex items-center gap-2 rounded-3xl bg-white px-5 py-3 text-sm font-extrabold text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
					<span>Liceo del Sol</span>
					<ChevronDown size={16} className="text-slate-500" />
				</button>

				<div className="flex items-center gap-3">
					<button className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-xs sm:text-sm font-bold text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
						<LineChart size={16} className="text-slate-500" />
						<span>Ver Analytics</span>
					</button>
					<button className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-[0_14px_32px_rgba(15,23,42,0.45)]">
						<PlusCircle size={16} />
						<span>Registrar Proyecto</span>
					</button>
				</div>
			</div>
		</header>
	);
}
