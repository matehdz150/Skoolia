import { ArrowRight, LineChart, Search, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
export default function HeroInstitutionSection() {
    return (

        <main className="mx-auto max-w-7xl px-6 py-12">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
                {/* Left copy block */}
                <div>
                    <div className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white">
                            <TrendingUp className="h-3.5 w-3.5" />
                        </span>
                        PORTAL PARA INSTITUCIONES
                    </div>

                    <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                        Reduce el costo
                        <br />
                        de
                        <br />
                        <span className="inline-block underline decoration-4 decoration-indigo-600 underline-offset-[14px]">adquisición de</span>
                        <br />
                        <span className="inline-block underline decoration-4 decoration-indigo-600 underline-offset-[14px]">alumnos.</span>
                    </h1>

                    <p className="mt-6 max-w-xl text-slate-600">
                        Skoolia ayuda a escuelas y centros educativos en México a
                        captar leads calificados mediante marketing segmentado y
                        datos en tiempo real.
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/registro"
                            className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-extrabold text-white shadow-md hover:bg-indigo-700"
                        >
                            Registrar mi Escuela
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        <Link
                            href="/planes"
                            className="inline-flex items-center rounded-2xl bg-white px-6 py-4 text-sm font-extrabold text-slate-900 shadow-sm hover:bg-slate-50"
                        >
                            Ver Planes
                        </Link>
                    </div>
                </div>

                {/* Right growth card */}
                <div className="relative">
                    {/* subtle background blob */}
                    <div className="absolute -left-10 top-28 h-40 w-40 rounded-[36px] bg-indigo-500/15 blur-2xl" />

                    <div className="relative rounded-[32px] border border-black/5 bg-white p-8 shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500">CRECIMIENTO MENSUAL</p>
                                <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
                                    +42% Leads
                                </h3>
                            </div>
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700">
                                <TrendingUp className="h-5 w-5" />
                            </span>
                        </div>

                        <ul className="mt-6 space-y-4">
                            <MetricRow
                                icon={<Search className="h-5 w-5" />}
                                title="Visibilidad en Búsquedas"
                                value="88%"
                            />
                            <MetricRow
                                icon={<Users className="h-5 w-5" />}
                                title="Interés de Padres"
                                value="2.4k"
                            />
                            <MetricRow
                                icon={<LineChart className="h-5 w-5" />}
                                title="Tasa de Conversión"
                                value="4.2%"
                            />
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}

type MetricProps = {
    icon: React.ReactNode;
    title: string;
    value: string;
};

function MetricRow({ icon, title, value }: MetricProps) {
    return (
        <li className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
            <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                    {icon}
                </span>
                <span className="text-sm font-semibold text-slate-800">{title}</span>
            </div>
            <span className="text-sm font-extrabold text-slate-900">{value}</span>
        </li>
    );
}

