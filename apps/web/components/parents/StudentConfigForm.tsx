'use client';
import { Save, Wand2, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { studentService, Student } from '@/lib/services/services/student.service';

interface Props {
  mode: 'create' | 'edit';
  initial?: Student;
  presetInterests?: string[];
  onSaved?: (student: Student) => void;
  onCancel?: () => void;
}

export default function StudentConfigForm({ mode, initial, presetInterests = [], onSaved, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? 'Carlos');
  const [age, setAge] = useState(String(initial?.age ?? '12'));
  const [budget, setBudget] = useState(String(initial?.monthlyBudget ?? '12000'));
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isValid = useMemo(() => {
    const parsedAge = parseInt(age, 10);
    const parsedBudget = budget ? parseInt(budget, 10) : undefined;
    return (
      name.trim().length > 0 &&
      Number.isInteger(parsedAge) && parsedAge > 0 &&
      (parsedBudget === undefined || (Number.isInteger(parsedBudget) && parsedBudget >= 0))
    );
  }, [name, age, budget]);

  const handleAgeChange = (value: string) => {
    // allow only digits
    const digits = value.replace(/\D+/g, '');
    setAge(digits);
  };

  const handleBudgetChange = (value: string) => {
    const digits = value.replace(/\D+/g, '');
    setBudget(digits);
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(null);
    setIsSaving(true);
    try {
      const parsedAge = parseInt(age, 10);
      const parsedBudget = budget ? parseInt(budget, 10) : undefined;
      const payload = {
        name: name.trim(),
        age: parsedAge,
        monthlyBudget: parsedBudget,
        // TODO: Map selectedInterests to real UUIDs when categories API is available
        categoryIds: [],
      };
      const saved = mode === 'edit' ? await studentService.update(payload) : await studentService.create(payload);
      setSuccess(mode === 'edit' ? 'Alumno actualizado correctamente.' : 'Alumno guardado correctamente.');
      onSaved?.(saved);
    } catch (err: unknown) {
      const message = (err as { message?: string })?.message ?? 'Error al guardar el alumno';
      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="surface w-full rounded-4xl bg-white p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center">
          <Wand2 className="text-indigo-600 w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">{mode === 'create' ? 'Agregar Hijo' : 'Editar Información'}</h3>
          <p className="text-xs sm:text-sm text-slate-600">Completa la información para personalizar la búsqueda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Carlos"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Edad</label>
          <input
            value={age}
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(e) => handleAgeChange(e.target.value)}
            placeholder="Ej. 12"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Presupuesto Mensual</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">$</span>
            <input
              value={budget}
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={(e) => handleBudgetChange(e.target.value)}
              placeholder="12000"
              className="w-full rounded-xl border border-slate-300 bg-white pl-8 pr-4 py-2.5 text-slate-900 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-3">Intereses (opcional)</label>
          <div className="flex flex-wrap gap-2">
            {presetInterests.map((opt) => {
              const selected = selectedInterests.includes(opt);
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => {
                    setSelectedInterests((prev) =>
                      prev.includes(opt) ? prev.filter((i) => i !== opt) : [...prev, opt]
                    );
                  }}
                  className={
                    'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition ' +
                    (selected
                      ? 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100')
                  }
                >
                  {selected && <Sparkles size={14} className="text-indigo-600" />}
                  {opt}
                </button>
              );
            })}
          </div>
          {selectedInterests.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedInterests([])}
              className="mt-3 text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              Limpiar selección
            </button>
          )}
        </div>
      </div>
      {error && (
        <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          {success}
        </p>
      )}

      <div className="mt-8 flex items-center gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-300 px-6 py-3 text-base font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>
        )}
      
      <button
        disabled={!isValid || isSaving}
        onClick={handleSave}
        className={`${onCancel ? 'flex-1' : 'w-full'} flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
      >
        <Save size={20} /> {isSaving ? 'Guardando…' : mode === 'create' ? 'Crear Perfil' : 'Guardar Cambios'}
      </button>
      </div>
    </section>
  );
}
