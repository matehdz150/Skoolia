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
    <section className="surface w-full rounded-4xl bg-white p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center">
            <UserRound className="text-indigo-600 w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">Información del Hijo</h3>
            <p className="text-sm text-slate-600">Datos del estudiante</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="w-10 h-10 rounded-xl border-2 border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:border-indigo-400 hover:text-indigo-600 transition-all"
            title="Editar"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={onDelete}
            className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
            title="Eliminar"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nombre</p>
          <p className="mt-2 text-lg text-slate-900 font-bold">{student.name}</p>
        </div>
        <div className="rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Edad</p>
          <p className="mt-2 text-lg text-slate-900 font-bold">{student.age} años</p>
        </div>
        <div className="rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-emerald-50 p-4">
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Presupuesto</p>
          <p className="mt-2 text-lg text-emerald-900 font-bold">{formatCurrency(student.monthlyBudget)}</p>
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
