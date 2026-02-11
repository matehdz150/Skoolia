"use client";
import { ArrowLeft, Link as LinkIcon, Phone, MoreVertical, Paperclip, Send } from 'lucide-react';
import Link from 'next/link';

type Message = {
  id: number;
  type: 'in' | 'out';
  text: string;
  time: string;
};

const mockMessages: Message[] = [
  { id: 1, type: 'in', text: '¡Hola! Gracias por contactar a Liceo del Sol. ¿En qué podemos apoyarte hoy?', time: '10:00 AM' },
  { id: 2, type: 'out', text: '¿Cuentan con transporte escolar?', time: '10:05 AM' },
  { id: 3, type: 'in', text: 'Contamos con transporte escolar en las rutas de Polanco, Lomas y Santa Fe. ¿Te gustaría conocer los costos?', time: '10:10 AM' },
];

export default function MessageConversation() {
  return (
    <section className="surface w-full rounded-4xl bg-white p-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-100/60">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/parents/messages" className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 flex items-center justify-center" aria-label="Regresar">
            <ArrowLeft size={16} />
          </Link>
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-100 font-extrabold text-slate-700">L</div>
          <div>
            <p className="text-sm sm:text-base font-extrabold text-slate-900">Liceo del Sol</p>
            <p className="mt-0.5 flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              <LinkIcon size={12} className="text-slate-400" /> GRUPO EDUCATIVO SOL
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 flex items-center justify-center" aria-label="Llamar">
            <Phone size={16} />
          </button>
          <button className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 flex items-center justify-center" aria-label="Más">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="px-5 sm:px-6 py-4 sm:py-5 space-y-6">
        {mockMessages.map((m) => (
          <div key={m.id} className={`flex ${m.type === 'out' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-170 rounded-2xl px-4 py-3 text-sm sm:text-base shadow-sm ${
              m.type === 'out'
                ? 'bg-violet-600 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl'
                : 'bg-slate-50 text-slate-800 ring-1 ring-slate-200 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl'
            }`}>
              {m.text}
            </div>
          </div>
        ))}

        {/* Timestamps aligned with messages for visual reference */}
        <div className="grid grid-cols-2 text-[10px] sm:text-[11px] font-bold text-slate-400">
          <span>10:00 AM</span>
          <span className="text-right">10:05 AM</span>
        </div>
        <div className="text-[10px] sm:text-[11px] font-bold text-slate-400">10:10 AM</div>
      </div>

      {/* Composer */}
      <div className="px-5 sm:px-6 py-4 sm:py-5 border-t border-slate-100/60">
        <div className="flex items-center gap-2 sm:gap-3 rounded-2xl bg-slate-50 ring-1 ring-slate-200 px-3 sm:px-4 py-2">
          <button className="h-8 w-8 rounded-xl bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center" aria-label="Adjuntar">
            <Paperclip size={16} />
          </button>
          <input
            className="flex-1 bg-transparent outline-none text-sm sm:text-base placeholder-slate-400"
            placeholder="Escribe un mensaje..."
          />
          <button className="h-8 w-8 rounded-xl bg-violet-600 text-white hover:bg-violet-700 flex items-center justify-center" aria-label="Enviar">
            <Send size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
