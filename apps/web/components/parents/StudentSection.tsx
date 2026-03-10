'use client';
import { useEffect, useState } from 'react';
import StudentConfigForm from './StudentConfigForm';
import StudentCard from './StudentCard';
import StudentEmptyState from './StudentEmptyState';
import { studentService, Student } from '@/lib/services/services/student.service';
import {
  schoolCategoriesService,
  type Category,
} from '@/lib/services/services/schools-categories.service';

export default function StudentSection() {
  const [student, setStudent] = useState<Student | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [me, allCategories] = await Promise.all([
          studentService.getMyStudent(),
          schoolCategoriesService.getAllCategories(),
        ]);
        setStudent(me);
        setCategories(allCategories);
      } catch {
        // Si no está autenticado o hay error, mostramos el formulario de creación
        setStudent(null);
        setCategories([]);
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
        presetInterests={categories}
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
      interests={student.interests?.map((interest) => interest.name) ?? []}
      onEdit={() => setEditing(true)}
      onDelete={handleDelete}
    />
  );
}
