'use client';
import { useEffect, useState } from 'react';
import StudentConfigForm from './StudentConfigForm';
import StudentCard from './StudentCard';
import { studentService, Student } from '@/lib/services/services/student.service';

const PRESET_INTERESTS = [
  'Arte',
  'Música',
  'Danza',
  'Teatro',
  'Lectura',
  'Escritura',
  'Ajedrez',
  'Ciencia',
  'Tecnología',
  'Robótica',
  'Programación',
  'Matemáticas',
  'Idiomas',
  'Fútbol',
  'Baloncesto',
  'Natación',
  'Atletismo',
];

export default function StudentSection() {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const me = await studentService.getMyStudent();
        setStudent(me);
      } catch {
        // Si no está autenticado o hay error, mostramos el formulario de creación
        setStudent(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async () => {
    await studentService.delete();
    setStudent(null);
    setEditing(false);
  };

  if (loading) {
    return <div className="rounded-3xl bg-white p-6">Cargando…</div>;
  }

  if (editing) {
    return (
      <StudentConfigForm
        mode={student ? 'edit' : 'create'}
        initial={student ?? undefined}
        presetInterests={PRESET_INTERESTS}
        onSaved={(s) => {
          setStudent(s);
          setEditing(false);
        }}
        onCancel={student ? () => setEditing(false) : undefined}
      />
    );
  }

  if (!student) {
    return (
      <section className="surface w-full rounded-4xl bg-white p-8 sm:p-12 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Sin información del hijo</h3>
        <p className="text-slate-600 mb-6 max-w-md">Agrega la información de tu hijo para personalizar la búsqueda de escuelas</p>
        <button
          onClick={() => setEditing(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Agregar Hijo
        </button>
      </section>
    );
  }

  return (
    <StudentCard
      student={student}
      interests={[]}
      onEdit={() => setEditing(true)}
      onDelete={handleDelete}
    />
  );
}
