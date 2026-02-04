import Image from 'next/image';
import { Heart, MapPin, ArrowRight } from 'lucide-react';

type Props = {
  imageUrl?: string;
  badges?: string[];
  topRightIcon?: boolean;
  level?: string; // PRIMARIA / SECUNDARIA
  title: string;
  location: string;
  price: string; // $4,500 MXN/mes
};

export default function InstitutionCard({ imageUrl, badges = [], topRightIcon = true, level, title, location, price }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
      {/* Media */}
      <div className="relative h-48 w-full bg-slate-100">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">Imagen</div>
        )}

        {/* badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          {badges.map((b) => (
            <span key={b} className="rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-slate-700 shadow">
              {b}
            </span>
          ))}
        </div>

        {topRightIcon && (
          <button className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-600 shadow" aria-label="Quitar de favoritos">
            <Heart size={16} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {level && <p className="text-[11px] font-bold tracking-wide text-slate-400">{level}</p>}
        <h4 className="mt-1 text-lg font-extrabold text-slate-900">{title}</h4>
        <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
          <MapPin size={14} className="text-slate-400" /> {location}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-wide text-slate-400">MENSUALIDAD</p>
            <p className="text-sm font-extrabold text-slate-900">{price}</p>
          </div>
          <button className="h-10 w-10 rounded-2xl bg-slate-900 text-white hover:bg-indigo-700 flex items-center justify-center" aria-label="Ver detalle">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
