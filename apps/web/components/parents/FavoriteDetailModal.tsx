'use client';
import Image from 'next/image';
import { X, MapPin, Star, Clock, Users, Languages, ClipboardCheck, Heart } from 'lucide-react';
import { JSX, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { messagesService } from '@/lib/services/services/messages.service';
import { coursesService, type Course } from '@/lib/services/services/courses.service';
import { schoolRatingsService } from '@/lib/services/services/rating.service';
import { schoolsService } from '@/lib/services/services/schools.service';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/toast';
import { useAuth } from '@/contexts/AuthContext';

type Item = {
  id?: string;
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

export default function FavoriteDetailModal({
  open,
  onClose,
  item,
  onRatingUpdated,
}: {
  open: boolean;
  onClose: () => void;
  item?: Item;
  onRatingUpdated?: (schoolId: string, averageRating?: number) => void;
}): JSX.Element | null {
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [sending, setSending] = useState(false);
  const [offers, setOffers] = useState<Course[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(false);
  const [loadingMyRating, setLoadingMyRating] = useState(false);
  const [savingRating, setSavingRating] = useState(false);
  const [myRating, setMyRating] = useState(0);
  const [myComment, setMyComment] = useState('');

  useEffect(() => {
    let mounted = true;

    if (!open || !item?.id) {
      setOffers([]);
      return;
    }

    (async () => {
      try {
        setLoadingOffers(true);
        const data = await coursesService.listBySchoolId(item.id as string);
        if (!mounted) return;
        setOffers(data);
      } catch {
        if (!mounted) return;
        setOffers([]);
      } finally {
        if (mounted) setLoadingOffers(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [open, item?.id]);

  useEffect(() => {
    let mounted = true;

    if (!open || !item?.id || user?.role !== 'public') {
      setMyRating(0);
      setMyComment('');
      return;
    }

    (async () => {
      try {
        setLoadingMyRating(true);
        const schoolId = item.id!;
        const mine = await schoolRatingsService.getMine(schoolId);
        if (!mounted) return;

        setMyRating(mine?.rating ?? 0);
        setMyComment(mine?.comment ?? '');
      } catch {
        if (!mounted) return;
        setMyRating(0);
        setMyComment('');
      } finally {
        if (mounted) setLoadingMyRating(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [open, item?.id, user?.role]);

  if (!open || !item) return null;

  const isNumeric = typeof item.price === 'number' || typeof item.monthlyPrice === 'number';
  const numericPrice = typeof item.price === 'number' ? item.price : (typeof item.monthlyPrice === 'number' ? item.monthlyPrice : undefined);
  const priceValue = numericPrice != null
    ? `$${numericPrice.toLocaleString()}`
    : (String(item.price).match(/\$\s?[\d,.]+/)?.[0] ?? String(item.price));
  const priceUnit = numericPrice != null ? 'MXN/mes' : (String(item.price).includes('MXN/mes') ? 'MXN/mes' : '');

  const handleContact = async () => {
    if (!item.id || sending) return;

    try {
      setSending(true);
      await messagesService.sendParentMessage(item.id, 'Hola, me interesa conocer mas informacion de su escuela.');
      onClose();
      router.push(`/parents/messages/${item.id}`);
    } finally {
      setSending(false);
    }
  };

  const refreshAverageRating = async () => {
    if (!item?.id) return;

    const updatedSchool = await schoolsService.getById(item.id);
    onRatingUpdated?.(item.id, updatedSchool.averageRating ?? undefined);
  };

  const handleSaveRating = async () => {
    if (!item?.id || myRating < 1 || myRating > 5 || savingRating) return;

    try {
      setSavingRating(true);
      await schoolRatingsService.upsert({
        schoolId: item.id,
        rating: myRating,
        comment: myComment.trim() || undefined,
      });
      await refreshAverageRating();

      showToast({
        title: 'Calificacion guardada',
        description: 'Gracias por compartir tu experiencia con esta escuela.',
        variant: 'success',
      });
    } catch (error) {
      console.error('No se pudo guardar la calificacion', error);
      showToast({
        title: 'No se pudo guardar la calificacion',
        description: 'Intenta de nuevo en unos segundos.',
        variant: 'error',
      });
    } finally {
      setSavingRating(false);
    }
  };

  const handleDeleteRating = async () => {
    if (!item?.id || savingRating) return;

    try {
      setSavingRating(true);
      await schoolRatingsService.remove(item.id);
      setMyRating(0);
      setMyComment('');
      await refreshAverageRating();

      showToast({
        title: 'Calificacion eliminada',
        description: 'Tu calificacion ya no se muestra para esta escuela.',
        variant: 'info',
      });
    } catch (error) {
      console.error('No se pudo eliminar la calificacion', error);
      showToast({
        title: 'No se pudo eliminar la calificacion',
        description: 'Intenta de nuevo en unos segundos.',
        variant: 'error',
      });
    } finally {
      setSavingRating(false);
    }
  };

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

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-extrabold tracking-widest text-slate-600">TU CALIFICACION</p>

              {user?.role !== 'public' ? (
                <p className="mt-2 text-xs text-slate-600">Inicia sesion como padre para calificar esta escuela.</p>
              ) : loadingMyRating ? (
                <p className="mt-2 text-xs text-slate-500">Cargando tu calificacion...</p>
              ) : (
                <>
                  <div className="mt-3 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setMyRating(value)}
                        className="rounded-md p-1 transition hover:bg-amber-50"
                        aria-label={`Calificar ${value} estrellas`}
                      >
                        <Star
                          className={`h-6 w-6 ${value <= myRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                        />
                      </button>
                    ))}
                  </div>

                  <Textarea
                    value={myComment}
                    onChange={(e) => setMyComment(e.target.value)}
                    placeholder="Comparte un comentario (opcional)"
                    className="mt-3 min-h-20 bg-white"
                  />

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleSaveRating}
                      disabled={savingRating || myRating < 1}
                      className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {savingRating ? 'Guardando...' : 'Guardar calificacion'}
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteRating}
                      disabled={savingRating}
                      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>

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
            <div className="mt-7">
              <p className="text-[10px] sm:text-[11px] font-extrabold tracking-widest text-slate-500">OFERTAS ACADÉMICAS</p>
              <div className="mt-3 space-y-2">
                {loadingOffers ? (
                  <p className="text-xs text-slate-500">Cargando ofertas...</p>
                ) : null}

                {!loadingOffers && offers.map((offer) => (
                  <div key={offer.id} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                    <p className="text-sm font-bold text-slate-900">{offer.name}</p>
                    <p className="mt-1 text-xs text-slate-600">
                      {offer.modality || 'Modalidad por definir'} · ${offer.price.toLocaleString()} MXN
                      {offer.capacity ? ` · ${offer.capacity} cupos` : ''}
                    </p>
                  </div>
                ))}

                {!loadingOffers && offers.length === 0 ? (
                  <p className="text-xs text-slate-500">Esta escuela aún no tiene ofertas académicas publicadas.</p>
                ) : null}
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
                <button
                  className="flex-1 sm:flex-initial w-full sm:w-auto rounded-full bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={handleContact}
                  disabled={!item.id || sending}
                >
                  {sending ? 'Enviando...' : 'Contactar'}
                </button>
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
