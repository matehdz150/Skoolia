"use client";

import { X, Building2, Sparkles, Lock } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelectType?: (type: "school" | "course") => void;
};

export default function RegisterProjectModal({
  isOpen,
  onClose,
  onSelectType,
}: Props) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSelect = (type: "school" | "course") => {
    onSelectType?.(type);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleBackdropClick}
      aria-modal
      role="dialog"
    >
      <div className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-5 top-5 rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={18} />
        </button>

        <div className="px-8 pt-8 pb-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
              <Lock size={18} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                ¿Qué vas a registrar?
              </h2>
              <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                Selecciona tu tipo de oferta
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleSelect("school")}
              className="flex h-full flex-col items-start rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-violet-400 hover:bg-white hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <Building2 size={20} />
              </div>
              <h3 className="mt-4 text-base font-extrabold text-slate-900 sm:text-lg">
                Escuela o Institución
              </h3>
              <p className="mt-2 text-xs text-slate-600 sm:text-sm">
                Para colegios, guarderías, preparatorias o universidades con
                domicilio físico y oferta académica formal.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleSelect("course")}
              className="flex h-full flex-col items-start rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-white hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Sparkles size={20} />
              </div>
              <h3 className="mt-4 text-base font-extrabold text-slate-900 sm:text-lg">
                Cursos o Academia
              </h3>
              <p className="mt-2 text-xs text-slate-600 sm:text-sm">
                Para clases extracurriculares, deportes, arte, idiomas o talleres,
                ya sean presenciales u online.
              </p>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-slate-500 hover:text-slate-700 sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
