import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

type Course = {
	id: number;
	title: string;
	mode: string;
	enrolled: string;
};

const courses: Course[] = [
	{
		id: 1,
		title: "Programa Escolar 1",
		mode: "PRESENCIAL",
		enrolled: "24 inscritos",
	},
	{
		id: 2,
		title: "Programa Escolar 2",
		mode: "PRESENCIAL",
		enrolled: "24 inscritos",
	},
	{
		id: 3,
		title: "Programa Escolar 3",
		mode: "PRESENCIAL",
		enrolled: "24 inscritos",
	},
];

export default function SchoolCoursesSection() {
	return (
		<section className="surface rounded-4xl bg-white p-0 shadow-sm ring-1 ring-black/5 overflow-hidden">
			<header className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
				<div>
					<h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
						Mis Cursos y Programas
					</h2>
					<p className="mt-1 text-xs sm:text-sm text-slate-600">
						Gestiona la oferta educativa de Liceo del Sol.
					</p>
				</div>
				<button className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow hover:bg-indigo-700">
					<span className="text-base leading-none">+</span>
					<span>Añadir Programa</span>
				</button>
			</header>

			<div className="divide-y divide-slate-100/70">
				{courses.map((course) => (
					<div
						key={course.id}
						className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 hover:bg-slate-50"
					>
						<div className="flex items-center gap-4 sm:gap-5">
							<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-xs font-bold text-slate-400">
								IMG
							</div>
							<div>
								<p className="text-sm sm:text-base font-extrabold text-slate-900">
									{course.title}
								</p>
								<p className="mt-1 flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-bold text-slate-400">
									<span>{course.mode}</span>
									<span className="h-1 w-1 rounded-full bg-slate-300" />
									<span className="text-indigo-600">{course.enrolled}</span>
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2 sm:gap-3">
							<button className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
								<Pencil size={16} />
							</button>
							<button className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
								<Trash2 size={16} />
							</button>
							<button className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-slate-50">
								<MoreHorizontal size={16} />
							</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
