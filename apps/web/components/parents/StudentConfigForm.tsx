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
    <section className="surface w-full rounded-4xl bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">Configuración del Alumno</h3>
        <Wand2 className="text-indigo-600" />
      </div>
      <p className="mt-1 text-xs sm:text-sm text-slate-600">Define los intereses y presupuesto para mejores resultados.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-bold text-slate-500">NOMBRE</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Carlos"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 outline-none ring-indigo-500 focus:ring-2"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500">EDAD</label>
          <input
            value={age}
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(e) => handleAgeChange(e.target.value)}
            placeholder="Ej. 12"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 outline-none ring-indigo-500 focus:ring-2"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500">PRESUPUESTO MENSUAL</label>
          <input
            value={budget}
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(e) => handleBudgetChange(e.target.value)}
            placeholder="Ej. 12000"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 outline-none ring-indigo-500 focus:ring-2"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500">INTERESES</label>
          <div className="mt-2 flex flex-wrap gap-2">
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

      <div className="mt-4 flex items-center gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center gap-2 rounded-3xl border border-slate-200 px-4 py-3 text-sm sm:text-base font-extrabold text-slate-700 hover:bg-slate-50"
          >
            Cancelar
          </button>
        )}
      
      <button
        disabled={!isValid || isSaving}
        onClick={handleSave}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-3xl bg-orange-500 px-4 py-3 text-sm sm:text-base font-extrabold text-white shadow-orange-200 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Save size={18} /> {isSaving ? 'Guardando…' : 'Guardar Información'}
      </button>
      </div>
    </section>
  );
}
