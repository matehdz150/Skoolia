export default function SchoolSummaryHeader() {
	return (
		<section className="mb-4">
			<div className="flex flex-wrap items-center gap-2 text-[10px] font-bold tracking-wide text-slate-500">
				<span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-amber-700">
					{/* Aproximación del radio/color según el mock */}
					PLAN PREMIUM
				</span>
				<span className="text-slate-400">Guadalajara</span>
			</div>
			<h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
				Liceo del Sol
			</h1>
		</section>
	);
}
