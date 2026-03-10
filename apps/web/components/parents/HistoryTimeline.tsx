"use client";

import { useEffect, useMemo, useState } from "react";
import { History, MessageCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

import HistoryEmptyState from "./HistoryEmptyState";
import {
  messagesService,
  type ParentThread,
} from "@/lib/services/services/messages.service";

type GroupedHistory = {
  label: string;
  items: ParentThread[];
};

function formatDayLabel(isoDate: string) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "Sin fecha";

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const current = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (current.getTime() === today.getTime()) return "Hoy";
  if (current.getTime() === yesterday.getTime()) return "Ayer";

  return date.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTimeLabel(isoDate: string) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HistoryTimeline() {
  const [items, setItems] = useState<ParentThread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const threads = await messagesService.listParentThreads();
        if (mounted) setItems(threads);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void load();

    const interval = setInterval(() => {
      void load();
    }, 10000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const grouped = useMemo<GroupedHistory[]>(() => {
    const map = new Map<string, ParentThread[]>();

    for (const item of items) {
      const key = formatDayLabel(item.lastMessageAt);
      const bucket = map.get(key) ?? [];
      bucket.push(item);
      map.set(key, bucket);
    }

    return Array.from(map.entries()).map(([label, groupItems]) => ({
      label,
      items: groupItems,
    }));
  }, [items]);

  if (!loading && items.length === 0) {
    return <HistoryEmptyState />;
  }

  return (
    <section className="surface w-full rounded-4xl bg-white p-0 overflow-hidden">
      <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-100/70">
        <div className="flex items-center gap-2">
          <History size={18} className="text-slate-700" />
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">Historial</h3>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-slate-600">
          Registro de tus conversaciones con escuelas.
        </p>
      </div>

      {loading ? (
        <div className="px-5 sm:px-6 py-8 text-sm text-slate-500">Cargando historial...</div>
      ) : null}

      <div className="divide-y divide-slate-100/60">
        {grouped.map((group) => (
          <div key={group.label} className="px-5 sm:px-6 py-4">
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
              {group.label}
            </p>

            <div className="mt-3 space-y-2">
              {group.items.map((item) => {
                const initial = item.schoolName.trim().charAt(0).toUpperCase() || "E";

                return (
                  <Link
                    key={item.schoolId}
                    href={`/parents/messages/${item.schoolId}`}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 px-3 py-3 hover:bg-slate-50"
                    aria-label={`Abrir historial con ${item.schoolName}`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 font-extrabold text-slate-700">
                        {initial}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-extrabold text-slate-900">{item.schoolName}</p>
                        <p className="mt-0.5 line-clamp-2 text-xs text-slate-600">{item.lastMessage}</p>
                        <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
                          <MessageCircle size={12} />
                          {formatTimeLabel(item.lastMessageAt)}
                        </p>
                      </div>
                    </div>

                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-700">
                      <ChevronRight size={16} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
