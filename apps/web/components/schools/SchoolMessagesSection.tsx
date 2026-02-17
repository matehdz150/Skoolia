import { Mail, MoreVertical, Paperclip, Phone, Send, Smile } from "lucide-react";

const conversations = [
	{
		id: 1,
		name: "Roberto García",
		preview: "¿Tienen becas disponibles...",
		time: "10:45 AM",
		unread: 2,
		active: true,
	},
	{
		id: 2,
		name: "Elena Torres",
		preview: "Muchas gracias por la información.",
		time: "Ayer",
		unread: 0,
		active: false,
	},
	{
		id: 3,
		name: "Alejandro Sanz",
		preview: "Me gustaría agendar una visita.",
		time: "25 Ene",
		unread: 0,
		active: false,
	},
];

const messages = [
	{
		id: 1,
		type: "in" as const,
		text:
			"¡Hola! Muchas gracias por el interés en Liceo del Sol. Soy Andrea del equipo de admisiones. ¿En qué nivel educativo estás interesado?",
		time: "10:40 AM",
	},
	{
		id: 2,
		type: "out" as const,
		text:
			"¿Tienen becas disponibles para el ciclo 2026? Mi hijo entraría a 4to de primaria.",
		time: "10:45 AM",
	},
];

export default function SchoolMessagesSection() {
	return (
		<section className="surface rounded-4xl bg-white p-0 shadow-sm ring-1 ring-black/5 overflow-hidden">
			<div className="grid grid-cols-1 md:grid-cols-[290px_1fr]">
				{/* Lista de conversaciones */}
				<div className="border-b border-slate-100/70 md:border-b-0 md:border-r">
					<header className="px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-100/70">
						<h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
							Mensajes
						</h2>
						<div className="mt-3 rounded-2xl bg-slate-50 px-3 py-2 text-xs text-slate-500 ring-1 ring-slate-100">
							<span>Buscar conversación...</span>
						</div>
					</header>

					<div className="divide-y divide-slate-100/70">
						{conversations.map((c) => (
							<button
								key={c.id}
								type="button"
								className={`flex w-full items-center justify-between px-5 py-4 sm:px-6 sm:py-4 text-left transition-colors ${
									c.active ? "bg-indigo-50/90 border-l-4 border-l-indigo-500" : "hover:bg-slate-50"
								}`}
							>
								<div className="flex items-center gap-3 sm:gap-4">
									<div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-extrabold ${
										c.active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"
									}`}>
										{c.name
											.split(" ")
											.map((p) => p[0])
											.join("")}
									</div>
									<div>
										<p className="text-sm font-extrabold text-slate-900">
											{c.name}
										</p>
										<p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
											{c.preview}
										</p>
										<div className="mt-1 flex items-center gap-2">
											<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
											<span className="text-[10px] font-bold uppercase tracking-wide text-emerald-600">
												EN LÍNEA AHORA
											</span>
										</div>
									</div>
								</div>
								<div className="flex flex-col items-end gap-1 text-[11px] text-slate-400">
									<span>{c.time}</span>
									{c.unread > 0 && (
										<span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
											{c.unread}
										</span>
									)}
								</div>
							</button>
						))}
					</div>
				</div>

				{/* Conversación activa */}
				<div className="flex flex-col">
					<header className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-100/70">
						<div className="flex items-center gap-3 sm:gap-4">
							<div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-xs font-extrabold text-white">
								RG
							</div>
							<div>
								<p className="text-sm sm:text-base font-extrabold text-slate-900">
									Roberto García
								</p>
								<p className="mt-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-emerald-600">
									EN LINEA AHORA
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<button className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 flex items-center justify-center" aria-label="Llamar">
								<Phone size={16} />
							</button>
							<button className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 flex items-center justify-center" aria-label="Enviar correo">
								<Mail size={16} />
							</button>
							<button className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 flex items-center justify-center" aria-label="Más opciones">
								<MoreVertical size={16} />
							</button>
						</div>
					</header>

					<div className="flex-1 px-5 py-4 sm:px-6 sm:py-6 space-y-6 bg-slate-50/40">
						<div className="flex justify-center">
							<span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-slate-500">
								Hoy, 31 de enero
							</span>
						</div>

						{messages.map((m) => (
							<div key={m.id} className={`flex ${m.type === "out" ? "justify-end" : "justify-start"}`}>
								<div
									className={`max-w-xl rounded-3xl px-4 py-3 text-sm sm:text-base shadow-sm ${
										m.type === "out"
											? "bg-violet-600 text-white rounded-br-none"
											: "bg-white text-slate-800 ring-1 ring-slate-200 rounded-bl-none"
									}`}
								>
									{m.text}
									<div className="mt-2 text-[10px] font-semibold opacity-70">
										{m.time}
									</div>
								</div>
							</div>
						))}
					</div>

					<footer className="border-t border-slate-100/70 bg-white px-5 py-4 sm:px-6 sm:py-5">
						<div className="flex items-center gap-2 sm:gap-3 rounded-2xl bg-slate-50 ring-1 ring-slate-200 px-3 sm:px-4 py-2">
							<button
								type="button"
								className="h-8 w-8 rounded-xl bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center"
								aria-label="Emojis"
							>
								<Smile size={16} />
							</button>
							<button
								type="button"
								className="hidden sm:flex h-8 w-8 items-center justify-center rounded-xl bg-white text-slate-700 hover:bg-slate-100"
								aria-label="Adjuntar archivo"
							>
								<Paperclip size={16} />
							</button>
							<input
								className="flex-1 bg-transparent outline-none text-sm sm:text-base placeholder-slate-400"
								placeholder="Escribe un mensaje..."
							/>
							<button
								type="button"
								className="h-9 w-9 rounded-xl bg-violet-600 text-white hover:bg-violet-700 flex items-center justify-center"
								aria-label="Enviar mensaje"
							>
								<Send size={16} />
							</button>
						</div>
					</footer>
				</div>
			</div>
		</section>
	);
}
