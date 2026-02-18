'use client';
import { Pencil, Trash2, UserRound } from 'lucide-react';
import { Student } from '@/lib/services/services/student.service';

interface Props {
  student: Student;
  interests?: string[];
  onEdit: () => void;
  onDelete: () => void;
}

function formatCurrency(value: number | null) {
  if (value == null) return '—';
  try {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(value);
  } catch {
    return `${value} MXN`;
  }
}

export default function StudentCard({ student, interests = [], onEdit, onDelete }: Props) {
  return (
    <section className="surface w-full rounded-4xl bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold text-slate-900">
          <UserRound className="text-indigo-600" /> Alumno
        </h3>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1 rounded-2xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            <Pencil size={16} /> Editar
          </button>
          <button
            onClick={onDelete}
            className="inline-flex items-center gap-1 rounded-2xl bg-red-500 px-3 py-2 text-sm font-bold text-white hover:bg-red-600"
          >
            <Trash2 size={16} /> Eliminar
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-bold text-slate-500">NOMBRE</p>
          <p className="mt-1 text-slate-900 font-semibold">{student.name}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-bold text-slate-500">EDAD</p>
          <p className="mt-1 text-slate-900 font-semibold">{student.age}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-bold text-slate-500">PRESUPUESTO MENSUAL</p>
          <p className="mt-1 text-slate-900 font-semibold">{formatCurrency(student.monthlyBudget)}</p>
        </div>
      </div>

      {interests.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-bold text-slate-500">INTERESES</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {interests.map((i) => (
              <span key={i} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 border border-indigo-100">
                {i}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
