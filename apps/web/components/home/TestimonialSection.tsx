"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Testimonial = {
  title: string;
  body: string;
  name: string;
  location: string;
  avatarUrl: string;
  rating?: number; // 1-5
};

const testimonials: Testimonial[] = [
  {
    title: "El mejor sistema de\nreservas",
    body:
      "Una experiencia increíble y fácil de reservar. Pagar los tratamientos es muy sencillo: no se necesita efectivo ni tarjetas.",
    name: "Lucy",
    location: "Londres, Reino Unido",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
    rating: 5,
  },
  {
    title: "Es fácil de usar y de\nexplorar",
    body:
      "Los recordatorios de Fresha te hacen la vida mucho más fácil. Además, he descubierto barberías estupendas que no sabía que existían.",
    name: "Dan",
    location: "Nueva York, Estados Unidos",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop",
    rating: 5,
  },
  {
    title: "Es perfecta para\nencontrar barberos",
    body:
      "Llevo dos años utilizando Fresha y es, con diferencia, la mejor plataforma de reservas que he utilizado hasta ahora. ¡Totalmente recomendable!",
    name: "Dale",
    location: "Sídney, Australia",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&auto=format&fit=crop",
    rating: 5,
  },
];

function StarsRow({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-6 w-6",
            i < rating ? "fill-[#FFCD6C] text-[#FFCD6C]" : "text-black/15"
          )}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  title,
  body,
  name,
  location,
  avatarUrl,
  rating,
}: Testimonial) {
  return (
    <div className="rounded-3xl bg-[#f3f3f3] p-10 min-h-[520px] flex flex-col">
      <StarsRow rating={rating} />

      <h3 className="mt-8 text-4xl font-semibold leading-tight text-black whitespace-pre-line">
        {title}
      </h3>

      <p className="mt-6 text-lg leading-relaxed text-black/70 max-w-sm">
        &quot;{body}&quot;
      </p>

      <div className="mt-auto pt-12 flex items-center gap-4">
        <img
          src={avatarUrl}
          alt={name}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div className="leading-tight">
          <p className="text-xl font-semibold text-black">{name}</p>
          <p className="text-lg text-black/45">{location}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="w-full mt-10 z-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}