import { ChevronRight, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

type Item = {
  id: number;
  name: string;
  group?: string;
  question: string;
  date: string;
  status: 'RESPONDIDO' | 'PENDIENTE';
  initial: string;
};

const items: Item[] = [
  { id: 1, name: 'Liceo del Sol', group: 'GRUPO EDUCATIVO SOL', question: '¿Cuentan con transporte escolar?', date: '25 ENE 2026', status: 'RESPONDIDO', initial: 'L' },
  { id: 2, name: 'Colegio Oxford', group: 'OXFORD EDUCATION GROUP', question: 'Solicitud de costos para maternal.', date: '23 ENE 2026', status: 'PENDIENTE', initial: 'C' },
];

export default function MessagesList() {
  return (
    <section className="surface w-full rounded-4xl bg-white p-0 overflow-hidden">
      <div className="px-5 sm:px-6 py-4 sm:py-5">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">Mis Consultas</h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600">Seguimiento de tus dudas con instituciones.</p>
      </div>

      <div className="divide-y divide-slate-100/60">
        {items.map((it) => (
          <Link
            key={it.id}
            href={`/parents/messages/${it.id}`}
            aria-label={`Abrir conversación con ${it.name}`}
            className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 hover:bg-slate-50"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-100 font-extrabold text-slate-700">{it.initial}</div>
              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <p className="text-sm sm:text-base font-extrabold text-slate-900">{it.name}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    it.status === 'RESPONDIDO' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>{it.status}</span>
                </div>
                {it.group && (
                  <p className="mt-1 flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    <LinkIcon size={12} className="text-slate-400" /> {it.group}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-slate-600">{it.question}</p>
                <p className="mt-1 text-[10px] sm:text-[11px] font-bold text-slate-400">{it.date}</p>
              </div>
            </div>

            <span className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 flex items-center justify-center">
              <ChevronRight size={16} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
