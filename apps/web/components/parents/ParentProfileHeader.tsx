'use client';
import { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';
import { studentService, type Student } from '@/lib/services/services/student.service';

function formatMoney(value: number | null | undefined): string {
  if (typeof value !== 'number') return 'N/A';
  return `$${value.toLocaleString()}`;
}

export default function ParentProfileHeader() {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await studentService.getMyStudent();
        if (!mounted) return;
        setStudent(data);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const childLabel = student
    ? `${student.name} · ${student.age} años`
    : loading
      ? 'Cargando perfil…'
      : 'Sin perfil';

  const budgetLabel = `Presupuesto: ${formatMoney(student?.monthlyBudget)}`;

  return (
    <section className="mx-auto w-full max-w-6xl px-6">
      <div className="surface rounded-4xl bg-white p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-full ring-4 ring-indigo-100">
              <div className="h-full w-full bg-linear-to-br from-indigo-500 to-purple-500" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                ¡Hola! <span className="inline-block">👋</span>
              </h2>
              <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 font-bold text-indigo-700 shadow-sm">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-indigo-600" />
                  {childLabel}
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 font-bold text-emerald-700 shadow-sm">
                  {budgetLabel}
                </span>
              </div>
            </div>
          </div>

          <button className="mt-2 md:mt-0 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm sm:text-base font-bold text-white shadow hover:bg-indigo-700">
            <Settings size={18} /> Editar Perfil
          </button>
        </div>
      </div>
    </section>
  );
}
