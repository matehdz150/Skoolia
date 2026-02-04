import { ChevronRight } from 'lucide-react';

type Item = {
  id: number;
  name: string;
  question: string;
  date: string;
  status: 'RESPONDIDO' | 'PENDIENTE';
  initial: string;
};

const items: Item[] = [
  { id: 1, name: 'Liceo del Sol', question: '¿Cuentan con transporte escolar?', date: '25 ENE 2026', status: 'RESPONDIDO', initial: 'L' },
  { id: 2, name: 'Colegio Oxford', question: 'Solicitud de costos para maternal.', date: '23 ENE 2026', status: 'PENDIENTE', initial: 'C' },
];

export default function MessagesList() {
  return (
    <section className="w-full rounded-4xl bg-white p-0 shadow-sm ring-1 ring-black/5 overflow-hidden">
      <div className="px-6 py-5">
        <h3 className="text-2xl font-extrabold text-slate-900">Mis Consultas</h3>
        <p className="mt-1 text-sm text-slate-600">Seguimiento de tus dudas con instituciones.</p>
      </div>

      <div className="divide-y divide-slate-100">
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-extrabold text-slate-700">{it.initial}</div>
              <div>
                <div className="flex items-center gap-3">
                  <p className="font-extrabold text-slate-900">{it.name}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    it.status === 'RESPONDIDO' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>{it.status}</span>
                </div>
                <p className="text-sm text-slate-600">{it.question}</p>
                <p className="mt-1 text-[11px] font-bold text-slate-400">{it.date}</p>
              </div>
            </div>

            <button className="h-9 w-9 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 flex items-center justify-center" aria-label="Abrir">
              <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
