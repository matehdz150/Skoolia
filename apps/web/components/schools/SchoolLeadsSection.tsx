"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MessageCircle, User } from "lucide-react";

import { messagesService, type SchoolThread } from "@/lib/services/services/messages.service";

function formatRelativeDate(isoDate: string) {
	const date = new Date(isoDate);
	if (Number.isNaN(date.getTime())) return "";

	const diffMs = date.getTime() - Date.now();
	const formatter = new Intl.RelativeTimeFormat("es-MX", { numeric: "auto" });
	const minutes = Math.round(diffMs / (1000 * 60));
	const hours = Math.round(diffMs / (1000 * 60 * 60));
	const days = Math.round(diffMs / (1000 * 60 * 60 * 24));

	if (Math.abs(minutes) < 60) return formatter.format(minutes, "minute");
	if (Math.abs(hours) < 24) return formatter.format(hours, "hour");
	return formatter.format(days, "day");
}

function getLeadStatus(thread: SchoolThread) {
	if (thread.threadHasUnread) {
		return {
			label: "Nuevo",
			classes: "bg-amber-50 text-amber-700",
			description: `${thread.unreadCount} mensaje${thread.unreadCount === 1 ? "" : "s"} sin leer`,
		};
	}

	const ageInMs = Date.now() - new Date(thread.lastMessageAt).getTime();
	if (thread.lastSenderRole === "public") {
		return {
			label: "Pendiente",
			classes: "bg-amber-50 text-amber-700",
			description: "Esperando respuesta de tu escuela",
		};
	}

	if (ageInMs <= 7 * 24 * 60 * 60 * 1000) {
		return {
			label: "Atendido",
			classes: "bg-emerald-50 text-emerald-700",
			description: "Ya hubo seguimiento reciente",
		};
	}

	return {
		label: "Frío",
		classes: "bg-slate-100 text-slate-600",
		description: "Sin movimiento reciente",
	};
}

export default function SchoolLeadsSection() {
	const [threads, setThreads] = useState<SchoolThread[]>([]);
	const [filter, setFilter] = useState<"today" | "week">("today");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;

		(async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await messagesService.listSchoolThreads();
				if (mounted) setThreads(data);
			} catch (err) {
				if (!mounted) return;
				console.error("No se pudieron cargar los prospectos", err);
				setError("No se pudieron cargar tus prospectos.");
			} finally {
				if (mounted) setLoading(false);
			}
		})();

		return () => {
			mounted = false;
		};
	}, []);

	const filteredThreads = useMemo(() => {
		const now = Date.now();
		const threshold = filter === "today" ? 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;

		return threads.filter((thread) => {
			const date = new Date(thread.lastMessageAt);
			if (Number.isNaN(date.getTime())) return false;
			return now - date.getTime() <= threshold;
		});
	}, [filter, threads]);

	return (
		<section className="surface rounded-4xl bg-white p-0 shadow-sm ring-1 ring-black/5 overflow-hidden">
			<header className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
				<div>
					<h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
						Prospectos
					</h2>
					<p className="mt-1 text-xs sm:text-sm text-slate-600">
						Da seguimiento a familias interesadas y conviértelas en inscripciones.
					</p>
				</div>
				<div className="hidden gap-2 sm:flex">
					<button
						type="button"
						onClick={() => setFilter("today")}
						className={`rounded-2xl px-3 py-2 text-xs font-bold ${
							filter === "today"
								? "bg-slate-100 text-slate-700 hover:bg-slate-200"
								: "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50"
						}`}
					>
						Hoy
					</button>
					<button
						type="button"
						onClick={() => setFilter("week")}
						className={`rounded-2xl px-3 py-2 text-xs font-bold ${
							filter === "week"
								? "bg-slate-100 text-slate-700 hover:bg-slate-200"
								: "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50"
						}`}
					>
						Últimos 7 días
					</button>
				</div>
			</header>

			<div className="divide-y divide-slate-100/70">
				{loading ? (
					<div className="px-5 py-4 text-sm text-slate-500 sm:px-6 sm:py-5">
						Cargando prospectos...
					</div>
				) : null}

				{error ? (
					<div className="px-5 py-4 text-sm text-rose-600 sm:px-6 sm:py-5">
						{error}
					</div>
				) : null}

				{filteredThreads.map((thread) => {
					const status = getLeadStatus(thread);

					return (
						<div
							key={thread.publicUserId}
							className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 hover:bg-slate-50"
						>
							<div className="flex items-center gap-3 sm:gap-4">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-sm font-extrabold text-indigo-700">
									{thread.publicUserName
										.split(" ")
										.map((p) => p[0])
										.join("")}
								</div>
								<div>
									<p className="text-sm sm:text-base font-extrabold text-slate-900">
										{thread.publicUserName}
									</p>
									<p className="mt-0.5 text-[11px] sm:text-xs font-bold uppercase tracking-wide text-slate-400">
										Interacción activa
									</p>
									<p className="mt-1 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-semibold text-slate-500">
										<span className="inline-flex items-center gap-1">
											<User size={12} className="text-slate-400" />
											Mensaje recibido
										</span>
										<span className="h-1 w-1 rounded-full bg-slate-300" />
										<span>{formatRelativeDate(thread.lastMessageAt)}</span>
									</p>
									<p className="mt-1 text-[11px] font-semibold text-slate-500">
										{status.description}
									</p>
									<p className="mt-2 max-w-xl text-xs text-slate-600 sm:text-sm">
										{thread.lastMessage}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] sm:text-xs font-bold ${status.classes}`}>
									{status.label}
								</span>
								<div className="flex items-center gap-1 sm:gap-2">
									<Link
										href={`/schools/messages?thread=${thread.publicUserId}`}
										className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
									>
										<MessageCircle size={16} />
										Ver conversación
									</Link>
								</div>
							</div>
						</div>
					);
				})}

				{!loading && !error && !filteredThreads.length ? (
					<div className="px-5 py-8 text-sm text-slate-500 sm:px-6">
						No hay prospectos en el periodo seleccionado.
					</div>
				) : null}
			</div>
		</section>
	);
}
