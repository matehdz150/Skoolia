"use client";
import Link from "next/link";

export default function CallParentsSections() {
	return (
		<section aria-label="Invitación para padres" className="w-full">
			<div className="max-w-6xl mx-auto px-8">
				<div className="rounded-4xl bg-linear-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl overflow-hidden">
					<div className="px-10 sm:px-16 py-16 sm:py-24 text-center flex flex-col items-center">
						<h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
							<span className="block">Empieza a planear su futuro</span>
							<span className="block text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-violet-400 mt-2">hoy mismo.</span>
						</h2>

						<div className="mt-10">
							<Link
								href="/signup"
								className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-indigo-700 font-bold shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-200"
							>
								Crear mi cuenta gratis
							</Link>
						</div>

						<p className="mt-6 text-sm sm:text-base text-gray-300">
							Únete a más de 5,000 familias en México.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

