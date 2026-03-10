"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import type { Course } from "@/lib/services/services/courses.service";

type CourseFormValues = {
	name: string;
	description: string;
	price: string;
	capacity: string;
	modality: string;
	startDate: string;
	endDate: string;
	status: Course["status"];
	isActive: boolean;
};

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (values: {
		name: string;
		description?: string;
		price: number;
		capacity?: number;
		modality?: string;
		startDate?: string;
		endDate?: string;
		status: Course["status"];
		isActive: boolean;
	}) => Promise<void>;
	mode: "create" | "edit";
	initialCourse?: Course | null;
	submitting: boolean;
};

function toDateInput(value?: string | null) {
	if (!value) return "";
	return value.slice(0, 10);
}

function buildInitialValues(course?: Course | null): CourseFormValues {
	return {
		name: course?.name ?? "",
		description: course?.description ?? "",
		price: course ? String(course.price) : "",
		capacity: course?.capacity ? String(course.capacity) : "",
		modality: course?.modality ?? "",
		startDate: toDateInput(course?.startDate),
		endDate: toDateInput(course?.endDate),
		status: course?.status ?? "draft",
		isActive: course?.isActive ?? true,
	};
}

export default function CourseEditorModal({
	isOpen,
	onClose,
	onSubmit,
	mode,
	initialCourse,
	submitting,
}: Props) {
	const [form, setForm] = useState<CourseFormValues>(() => buildInitialValues(initialCourse));
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!isOpen) return;
		setForm(buildInitialValues(initialCourse));
		setError(null);
	}, [initialCourse, isOpen]);

	if (!isOpen) return null;

	const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget && !submitting) onClose();
	};

	const handleSubmit = async () => {
		if (!form.name.trim()) {
			setError("El nombre del programa es obligatorio.");
			return;
		}

		const price = Number(form.price);
		if (Number.isNaN(price) || price <= 0) {
			setError("Ingresa un precio mayor a 0.");
			return;
		}

		const capacity = form.capacity === "" ? undefined : Number(form.capacity);
		if (capacity !== undefined && (Number.isNaN(capacity) || capacity <= 0)) {
			setError("Ingresa una capacidad mayor a 0.");
			return;
		}

		setError(null);

		try {
			await onSubmit({
				name: form.name.trim(),
				description: form.description.trim() || undefined,
				price,
				capacity,
				modality: form.modality.trim() || undefined,
				startDate: form.startDate || undefined,
				endDate: form.endDate || undefined,
				status: form.status,
				isActive: form.isActive,
			});
		} catch {
			setError("No se pudo guardar el programa. Inténtalo de nuevo.");
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
			onClick={handleBackdropClick}
			aria-modal
			role="dialog"
		>
			<div className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl">
				<button
					onClick={onClose}
					aria-label="Cerrar"
					disabled={submitting}
					className="absolute right-5 top-5 rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
				>
					<X size={18} />
				</button>

				<div className="px-8 pt-8 pb-6">
					<div>
						<h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
							{mode === "create" ? "Agregar programa" : "Editar programa"}
						</h2>
						<p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
							Configura la información clave de tu oferta académica.
						</p>
					</div>

					<div className="mt-8 grid gap-4 sm:grid-cols-2">
						<div className="sm:col-span-2">
							<label className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-400">
								Nombre del programa
							</label>
							<input
								value={form.name}
								onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
								placeholder="Ej. Primaria bilingüe"
								className="h-11 w-full rounded-2xl bg-slate-50 px-4 text-sm text-slate-900 outline-none ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500"
							/>
						</div>

						<div className="sm:col-span-2">
							<label className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-400">
								Descripción
							</label>
							<textarea
								value={form.description}
								onChange={(event) =>
									setForm((current) => ({ ...current, description: event.target.value }))
								}
								rows={4}
								placeholder="Describe el programa, beneficios y perfil de ingreso."
								className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500"
							/>
						</div>

						<div>
							<label className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-400">
								Precio
							</label>
							<input
								type="number"
								min="0"
								value={form.price}
								onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
								placeholder="0"
								className="h-11 w-full rounded-2xl bg-slate-50 px-4 text-sm text-slate-900 outline-none ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500"
							/>
						</div>

						<div>
							<label className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-400">
								Capacidad
							</label>
							<input
								type="number"
								min="0"
								value={form.capacity}
								onChange={(event) => setForm((current) => ({ ...current, capacity: event.target.value }))}
								placeholder="30"
								className="h-11 w-full rounded-2xl bg-slate-50 px-4 text-sm text-slate-900 outline-none ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500"
							/>
						</div>

						<div>
							<label className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-400">
								Modalidad
							</label>
							<input
								value={form.modality}
								onChange={(event) => setForm((current) => ({ ...current, modality: event.target.value }))}
								placeholder="Presencial, híbrido, online"
								className="h-11 w-full rounded-2xl bg-slate-50 px-4 text-sm text-slate-900 outline-none ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500"
							/>
						</div>

						<div>
							<label className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-400">
								Estado
							</label>
							<select
								value={form.status}
								onChange={(event) =>
									setForm((current) => ({
										...current,
										status: event.target.value as Course["status"],
									}))
								}
								className="h-11 w-full rounded-2xl bg-slate-50 px-4 text-sm text-slate-900 outline-none ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500"
							>
								<option value="draft">Borrador</option>
								<option value="published">Publicado</option>
								<option value="archived">Archivado</option>
							</select>
						</div>

						<div>
							<label className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-400">
								Inicio
							</label>
							<input
								type="date"
								value={form.startDate}
								onChange={(event) => setForm((current) => ({ ...current, startDate: event.target.value }))}
								className="h-11 w-full rounded-2xl bg-slate-50 px-4 text-sm text-slate-900 outline-none ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500"
							/>
						</div>

						<div>
							<label className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-400">
								Fin
							</label>
							<input
								type="date"
								value={form.endDate}
								onChange={(event) => setForm((current) => ({ ...current, endDate: event.target.value }))}
								className="h-11 w-full rounded-2xl bg-slate-50 px-4 text-sm text-slate-900 outline-none ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500"
							/>
						</div>

						<label className="inline-flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-slate-200 sm:col-span-2">
							<input
								type="checkbox"
								checked={form.isActive}
								onChange={(event) =>
									setForm((current) => ({ ...current, isActive: event.target.checked }))
								}
								className="h-4 w-4 rounded border-slate-300 text-indigo-600"
							/>
							Activo y visible en la operación diaria
						</label>
					</div>

					{error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

					<div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4">
						<button
							type="button"
							onClick={onClose}
							disabled={submitting}
							className="text-xs font-semibold text-slate-500 hover:text-slate-700 disabled:opacity-50 sm:text-sm"
						>
							Cancelar
						</button>
						<button
							type="button"
							onClick={() => void handleSubmit()}
							disabled={submitting}
							className="inline-flex items-center rounded-2xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow hover:bg-indigo-700 disabled:opacity-50 sm:text-sm"
						>
							{submitting ? "Guardando..." : mode === "create" ? "Crear programa" : "Guardar cambios"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}