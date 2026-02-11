"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X, User, Building2 } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister?: () => void;
};

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: Props) {
  const [audience, setAudience] = useState<"parents" | "schools">("parents");
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
      aria-modal
      role="dialog"
    >
      <div
        ref={panelRef}
        className="relative w-md max-w-[92vw] rounded-3xl bg-white surface"
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <div className="px-5 pt-8 pb-6">
          <h2 className="text-2xl font-extrabold text-slate-900">¡Hola de nuevo!</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">Accede a tu cuenta</p>

          {/* Audience tabs */}
          <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
            <button
              onClick={() => setAudience("parents")}
              className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition-colors ${
                audience === "parents"
                  ? "bg-white text-indigo-700 shadow"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <User size={16} /> Padre
            </button>
            <button
              onClick={() => setAudience("schools")}
              className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition-colors ${
                audience === "schools"
                  ? "bg-white text-indigo-700 shadow"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Building2 size={16} /> Escuela
            </button>
          </div>

          {/* Form */}
          <form
            className="mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              try {
                localStorage.setItem('skoolia:auth', audience);
              } catch {}
              onClose();
              router.push(audience === "schools" ? "/schools" : "/parents");
            }}
          >
            <label className="block text-xs font-bold text-slate-500">EMAIL</label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 outline-none ring-indigo-500 focus:ring-2"
            />

            <label className="mt-4 block text-xs font-bold text-slate-500">CONTRASEÑA</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 outline-none ring-indigo-500 focus:ring-2"
            />

            <button
              type="submit"
              className="mt-5 w-full rounded-2xl bg-slate-900 px-4 py-2 font-bold text-white transition hover:bg-indigo-700"
            >
              Entrar
            </button>
          </form>

          <div className="mt-3 text-center text-xs text-slate-500">
            ¿No tienes cuenta? {onSwitchToRegister ? (
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="font-bold text-indigo-700 hover:underline"
              >
                Regístrate
              </button>
            ) : (
              <span className="font-bold text-indigo-700">Regístrate</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
