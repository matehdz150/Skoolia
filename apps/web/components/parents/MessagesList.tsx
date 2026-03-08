"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronRight, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

import MessagesEmptyState from './MessagesEmptyState';
import {
  messagesService,
  type ParentThread,
} from '@/lib/services/services/messages.service';

function formatDateLabel(isoDate: string) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return '';

  return date.toLocaleString('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function MessagesList() {
  const [items, setItems] = useState<ParentThread[]>([]);
  const [loading, setLoading] = useState(true);

  const loadThreads = useCallback(async () => {
    const threads = await messagesService.listParentThreads();
    setItems(threads);
  }, []);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const threads = await messagesService.listParentThreads();
        if (mounted) {
          setItems(threads);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      void loadThreads();
    }, 5000);

    return () => clearInterval(interval);
  }, [loadThreads, loading]);

  const rendered = useMemo(() => {
    return items.map((it) => {
      const initial = it.schoolName.trim().charAt(0).toUpperCase();
      return {
        ...it,
        initial: initial || 'S',
      };
    });
  }, [items]);

  if (!loading && !rendered.length) {
    return <MessagesEmptyState />;
  }

  return (
    <section className="surface w-full rounded-4xl bg-white p-0 overflow-hidden">
      <div className="px-5 sm:px-6 py-4 sm:py-5">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">Mis Consultas</h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600">Seguimiento de tus dudas con instituciones.</p>
      </div>

      {loading ? (
        <div className="px-5 sm:px-6 py-8 text-sm text-slate-500">Cargando mensajes...</div>
      ) : null}

      <div className="divide-y divide-slate-100/60">
        {rendered.map((it) => (
          <Link
            key={it.schoolId}
            href={`/parents/messages/${it.schoolId}`}
            aria-label={`Abrir conversacion con ${it.schoolName}`}
            className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 hover:bg-slate-50"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-100 font-extrabold text-slate-700">{it.initial}</div>
              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <p className="text-sm sm:text-base font-extrabold text-slate-900">{it.schoolName}</p>
                </div>
                <p className="mt-1 flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  <LinkIcon size={12} className="text-slate-400" /> CONVERSACION ACTIVA
                </p>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">{it.lastMessage}</p>
                <p className="mt-1 text-[10px] sm:text-[11px] font-bold text-slate-400">{formatDateLabel(it.lastMessageAt)}</p>
              </div>
            </div>

            <span className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 flex items-center justify-center">
              <ChevronRight size={16} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
