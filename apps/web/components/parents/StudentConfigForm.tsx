'use client';
import { Save, Wand2 } from 'lucide-react';
import { useState } from 'react';

export default function StudentConfigForm() {
  const [name, setName] = useState('Carlos');
  const [age, setAge] = useState('12');
  const [budget, setBudget] = useState('$12,000+ MXN');
  const [interests, setInterests] = useState('');

  return (
    <section className="w-full rounded-4xl bg-white p-5 sm:p-6 shadow-sm ring-1 ring-black/5">
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
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 outline-none ring-indigo-500 focus:ring-2"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500">EDAD</label>
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 outline-none ring-indigo-500 focus:ring-2"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500">PRESUPUESTO MENSUAL</label>
          <input
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 outline-none ring-indigo-500 focus:ring-2"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500">INTERESES</label>
          <input
            placeholder="Añade un interés (ej: Futbol) y presiona Enter"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 outline-none ring-indigo-500 focus:ring-2"
          />
        </div>
      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-3xl bg-orange-500 px-4 py-3 text-sm sm:text-base font-extrabold text-white shadow-orange-200 hover:bg-orange-600">
        <Save size={18} /> Guardar Información
      </button>
    </section>
  );
}
