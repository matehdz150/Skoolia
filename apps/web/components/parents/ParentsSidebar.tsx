'use client';
import Link from 'next/link';
import { Heart, Info, MessageCircle, History } from 'lucide-react';

type Props = { active?: 'favorites' | 'messages' | 'info' | 'history' };

export default function ParentsSidebar({ active = 'info' }: Props) {
  const Item = ({ icon, label, href, isActive, badge }: { icon: JSX.Element; label: string; href: string; isActive?: boolean; badge?: number }) => (
    <div
      className={`flex items-center justify-between rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-bold ${
        isActive ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-50'
      }`}
    >
      <Link href={href} className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </Link>
      {typeof badge === 'number' && (
        <span className={`min-w-6 rounded-full px-2 text-center text-[10px] sm:text-xs ${isActive ? 'bg-white/20' : 'bg-slate-100 text-slate-600'}`}>{badge}</span>
      )}
    </div>
  );

  return (
    <aside className="flex w-full max-w-80 flex-col gap-3 sm:gap-4">
      <div className="rounded-3xl bg-white p-3 sm:p-4 shadow-sm ring-1 ring-black/5">
        <div className="flex flex-col gap-2">
          <Item icon={<Heart size={18} className="text-rose-500" />} label="Mis Guardados" href="/parents/favorites" isActive={active==='favorites'} badge={4} />
          <Item icon={<MessageCircle size={18} className="text-sky-500" />} label="Mensajes" href="/parents/messages" isActive={active==='messages'} badge={2} />
          <Item icon={<Info size={18} className="text-indigo-100" />} label="Info del Niño" href="/parents/settings" isActive={active==='info'} />
          <Item icon={<History size={18} className="text-slate-400" />} label="Historial" href="/parents/history" isActive={active==='history'} />
        </div>
      </div>

      <div className="rounded-3xl bg-indigo-600 p-4 sm:p-6 text-white shadow-indigo-300">
        <h3 className="text-xs sm:text-sm font-bold opacity-90">Sugerencias IA</h3>
        <p className="mt-2 text-xs sm:text-sm opacity-90">Personalizamos Skoolia según los intereses de Carlos.</p>
        <button className="mt-4 w-full rounded-2xl bg-white/10 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold hover:bg-white/20">Ver recomendaciones</button>
      </div>
    </aside>
  );
}
