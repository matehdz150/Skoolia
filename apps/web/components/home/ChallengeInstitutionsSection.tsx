import { LineChart, Users, CircleDot } from "lucide-react";

export default function ChallengeInstitutionsSection() {
	return (
		<section className="mx-auto max-w-7xl px-6 py-12">
			{/* Eyebrow */}
			<div className="text-center">
				<span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
					El desafío actual
				</span>
				<h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-slate-900">
					Elegir escuela es la decisión más
					<br /> importante, y la más difícil.
				</h2>
			</div>

			{/* Cards */}
			<div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
				{/* Parents card */}
				<div className="relative rounded-[40px] bg-gradient-to-br from-indigo-50 to-indigo-100 p-10 text-slate-900 shadow-sm">
					<div className="flex items-center gap-3">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm">
							<Users className="h-6 w-6" />
						</div>
					</div>

					<h3 className="mt-6 text-2xl font-extrabold">Para los Padres</h3>
					<p className="mt-3 max-w-xl text-slate-700">
						Millones de padres en México consideran cambiar a sus hijos de escuela cada año. Sin embargo,
						la falta de un portal confiable hace que el proceso sea frustrante, basado solo en recomendaciones
						de boca en boca.
					</p>

					<ul className="mt-6 space-y-3 text-[15px] font-semibold text-slate-800">
						{[
							"Información de costos dispersa o inexistente.",
							"Dificultad para comparar programas académicos.",
							"Falta de reseñas reales y verificadas.",
							"Procesos de contacto lentos y manuales.",
						].map((item) => (
							<li key={item} className="flex items-start gap-3">
								<span className="mt-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-indigo-600/20">
									<CircleDot className="h-3 w-3 text-indigo-600" />
								</span>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>

				{/* Institutions card */}
				<div className="relative rounded-[40px] bg-gradient-to-br from-slate-900 to-indigo-900 p-10 text-white shadow-md">
					<div className="flex items-center gap-3">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
							<LineChart className="h-6 w-6" />
						</div>
					</div>

					<h3 className="mt-6 text-2xl font-extrabold">Para las Instituciones</h3>
					<p className="mt-3 max-w-xl text-white/85">
						Las escuelas privadas enfrentan altos costos de adquisición de alumnos y una competencia feroz.
						Sin presencia digital optimizada, pierden visibilidad frente a su público objetivo.
					</p>

					<ul className="mt-6 space-y-3 text-[15px] font-semibold text-white">
						{[
							"Altos costos de publicidad tradicional.",
							"Generación de leads de baja calidad.",
							"Falta de métricas sobre el interés real.",
							"Dificultad para segmentar por ubicación y nivel.",
						].map((item) => (
							<li key={item} className="flex items-start gap-3">
								<span className="mt-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white/20">
									<CircleDot className="h-3 w-3" />
								</span>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}

