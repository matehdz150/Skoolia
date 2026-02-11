import Link from "next/link";
import { BarChart2, Plus, Home, BookOpen, Users, MessageCircle, Send, Percent, CreditCard, Settings, LogOut, ChevronDown } from "lucide-react";

export default function SchoolsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm">
            Liceo del Sol
            <ChevronDown className="h-4 w-4 text-slate-600" />
          </button>
          <span className="rounded-2xl bg-yellow-400/20 px-3 py-1 text-[11px] font-bold tracking-widest text-yellow-700 uppercase">Plan Premium</span>
          <span className="text-sm font-medium text-slate-600">Guadalajara</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="#" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm">
            <BarChart2 className="h-4 w-4" /> Ver Analytics
          </Link>
          <Link href="#" className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-slate-800">
            <Plus className="h-4 w-4" /> Registrar Proyecto
          </Link>
        </div>
      </div>

      <h1 className="mt-4 text-2xl font-extrabold text-slate-900">Liceo del Sol</h1>

      {/* Main grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar */}
        <aside className="rounded-4xl bg-white p-4 shadow-sm border border-slate-200 lg:col-span-1">
          <nav className="space-y-1">
            <SidebarItem icon={<Home className="h-4 w-4" />} label="Resumen" active />
            <SidebarItem icon={<BookOpen className="h-4 w-4" />} label="Mis Cursos" />
            <SidebarItem icon={<Users className="h-4 w-4" />} label="Leads & Interés" />
            <SidebarItem icon={<MessageCircle className="h-4 w-4" />} label="Mensajería" badge="3" />
            <SidebarItem icon={<Send className="h-4 w-4" />} label="Envíos Masivos" />
            <SidebarItem icon={<Percent className="h-4 w-4" />} label="Ofertas & Promos" />
            <SidebarItem icon={<CreditCard className="h-4 w-4" />} label="Planes & Pagos" />
            <SidebarItem icon={<Settings className="h-4 w-4" />} label="Configuración" />
          </nav>
          <div className="mt-6 border-t border-slate-200 pt-4">
            <button className="flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50">
              <LogOut className="h-4 w-4" /> Cerrar Sesión
            </button>
          </div>
        </aside>

        {/* Content */}
        <section className="lg:col-span-3">
          {/* KPI cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <KpiCard
              eyebrow="Leads Totales"
              icon={<Users className="h-5 w-5" />}
              value="428"
              change="+18%"
              changeColor="text-indigo-600"
            />
            <KpiCard
              eyebrow="Mensajes Nuevos"
              icon={<MessageCircle className="h-5 w-5" />}
              value="12"
              change="Hoy"
              changeColor="text-emerald-600"
            />
            <KpiCard
              eyebrow="Engagement"
              icon={<Percent className="h-5 w-5" />}
              value="74%"
              change="+5.2%"
              changeColor="text-orange-600"
            />
          </div>

          {/* Recent Activity */}
          <div className="mt-6 rounded-4xl bg-white p-4 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Actividad Reciente</h2>
                <p className="text-sm text-slate-600">Últimos interesados en tu institución.</p>
              </div>
              <Link href="#" className="text-sm font-bold text-indigo-700">Ver todos</Link>
            </div>
            <ul className="mt-4 space-y-4">
              {[
                { name: "Juan Delgado", note: "Interesado en Primaria Bilingüe • Hace 2h" },
                { name: "Maria Perez", note: "Interesado en Primaria Bilingüe • Hace 2h" },
                { name: "Ana Rios", note: "Interesado en Primaria Bilingüe • Hace 2h" },
              ].map((item) => (
                <li key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-100 text-slate-700 font-bold">
                      {getInitials(item.name)}
                    </span>
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">{item.name}</div>
                      <div className="text-xs font-medium text-slate-600">{item.note}</div>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-700">NUEVO LEAD</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

function getInitials(name: string) {
  const parts = name.split(" ");
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
  return initials || "?";
}

function SidebarItem({ icon, label, active, badge }: { icon: React.ReactNode; label: string; active?: boolean; badge?: string }) {
  return (
    <button
      className={`flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-bold ${
        active ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      <span className="flex items-center gap-2">
        <span className="text-current">{icon}</span>
        {label}
      </span>
      {badge ? <span className="grid h-5 w-5 place-items-center rounded-full bg-red-500 text-white text-[11px]">{badge}</span> : null}
    </button>
  );
}

function KpiCard({ eyebrow, icon, value, change, changeColor }: { eyebrow: string; icon: React.ReactNode; value: string; change: string; changeColor: string }) {
  return (
    <div className="rounded-4xl bg-white p-4 shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 text-slate-700">
        <span className="grid h-7 w-7 place-items-center rounded-xl bg-slate-100 text-slate-700">{icon}</span>
        <span className="text-[11px] font-bold tracking-widest uppercase">{eyebrow}</span>
      </div>
      <div className="mt-2 flex items-end justify-between">
        <div className="text-3xl font-extrabold text-slate-900">{value}</div>
        <div className={`text-xs font-bold ${changeColor}`}>{change}</div>
      </div>
    </div>
  );
}
