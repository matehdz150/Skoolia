'use client';
import Image from 'next/image';
import { X, MapPin, Star, Clock, Users, Languages, ClipboardCheck, Heart } from 'lucide-react';
import { JSX } from 'react';

type Item = {
  imageUrl?: string;
  badges?: string[];
  level?: string;
  title: string;
  location: string;
  price: string | number;
  description?: string;
  rating?: number;
  schedule?: string; // e.g., "7:30 AM - 2:30 PM"
  studentsPerClass?: number | string; // e.g., 20
  languages?: string; // e.g., "Bilingüe (Cert. Oxford)"
  enrollmentStatus?: string; // e.g., "Abiertas 2026"
  enrollmentOpen?: boolean;
  enrollmentYear?: number;
  monthlyPrice?: number;
};

export default function FavoriteDetailModal({ open, onClose, item }: { open: boolean; onClose: () => void; item?: Item }): JSX.Element | null {
  if (!open || !item) return null;

  const isNumeric = typeof item.price === 'number' || typeof item.monthlyPrice === 'number';
  const numericPrice = typeof item.price === 'number' ? item.price : (typeof item.monthlyPrice === 'number' ? item.monthlyPrice : undefined);
  const priceValue = numericPrice != null
    ? `$${numericPrice.toLocaleString()}`
    : (String(item.price).match(/\$\s?[\d,.]+/)?.[0] ?? String(item.price));
  const priceUnit = numericPrice != null ? 'MXN/mes' : (String(item.price).includes('MXN/mes') ? 'MXN/mes' : '');

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-101 mx-4 w-full max-w-6xl overflow-hidden rounded-2xl sm:rounded-4xl bg-white surface max-h-[90vh]">
        <button
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white text-slate-700 shadow"
          aria-label="Cerrar"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_520px]">
          {/* Left media */}
          <div className="relative h-65 sm:h-80 md:h-[72vh] w-full bg-slate-100">
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority={false}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">Imagen</div>
            )}
          </div>

          {/* Right content */}
          <div className="p-5 sm:p-8 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-extrabold tracking-widest text-indigo-700">
                {item.level ?? 'CURSO EXTRACURRICULAR'}
              </span>
              <span className="text-[11px] font-bold tracking-widest text-slate-400">FUTURE TECH GLOBAL</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-[28px] font-extrabold leading-tight text-slate-900">{item.title}</h2>
            <div className="mt-2 flex items-center gap-3 text-xs sm:text-sm text-slate-600">
              <MapPin className="h-4 w-4" />
              <span>{item.location}</span>
              <Star className="h-4 w-4 text-amber-400" />
              <span>
                {typeof item.rating === 'number' ? item.rating.toFixed(1) : '—'}
                {typeof item.rating === 'number' ? ' (valoración)' : ''}
              </span>
            </div>

            {/* Short description */}
            {item.description ? (
              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                {item.description}
              </p>
            ) : null}

            {/* Info pills grid */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
              <div className="surface flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-indigo-600" />
                  <div>
                    <p className="text-[10px] sm:text-[11px] font-extrabold tracking-widest text-slate-500">HORARIO</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">{item.schedule ?? 'Por definir'}</p>
                  </div>
                </div>
              </div>
              <div className="surface flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-indigo-600" />
                  <div>
                    <p className="text-[10px] sm:text-[11px] font-extrabold tracking-widest text-slate-500">ALUMNOS/SALÓN</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">{item.studentsPerClass ?? 'Por definir'}</p>
                  </div>
                </div>
              </div>
              <div className="surface flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                <div className="flex items-center gap-3">
                  <Languages className="h-4 w-4 text-indigo-600" />
                  <div>
                    <p className="text-[10px] sm:text-[11px] font-extrabold tracking-widest text-slate-500">IDIOMAS</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">{item.languages ?? 'Por definir'}</p>
                  </div>
                </div>
              </div>
              <div className="surface flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                <div className="flex items-center gap-3">
                  <ClipboardCheck className="h-4 w-4 text-indigo-600" />
                  <div>
                    <p className="text-[10px] sm:text-[11px] font-extrabold tracking-widest text-slate-500">INSCRIPCIONES</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      {item.enrollmentStatus
                        ?? (item.enrollmentOpen === true
                              ? `Abiertas${item.enrollmentYear ? ` ${item.enrollmentYear}` : ''}`
                              : item.enrollmentOpen === false
                                ? 'Cerradas'
                                : 'Por definir')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer action */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-[10px] sm:text-[11px] font-extrabold tracking-widest text-slate-500">MENSUALIDAD ESTIMADA</p>
                <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">{priceValue}</p>
                {priceUnit ? (
                  <p className="-mt-1 text-lg sm:text-xl font-extrabold text-slate-900">{priceUnit}</p>
                ) : null}
              </div>
              <div className="flex items-center gap-3">
                <button className="flex-1 sm:flex-initial w-full sm:w-auto rounded-full bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-700">Contactar</button>
                <button className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-white text-slate-700 shadow" aria-label="Guardar">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
