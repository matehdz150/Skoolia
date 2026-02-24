'use client';
import { useEffect, useState } from 'react';
import StudentConfigForm from './StudentConfigForm';
import StudentCard from './StudentCard';
import StudentEmptyState from './StudentEmptyState';
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
    return <StudentEmptyState onAdd={() => setEditing(true)} />;
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
