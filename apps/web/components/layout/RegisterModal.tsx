/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X, User, Building2, ArrowRight } from "lucide-react";
import { authService } from "../../lib/services/services/auth.service";
import { ApiError } from "../../lib/services/api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
  onRegisterSuccess?: (data: { email: string }) => void;
};

export default function RegisterModal({
  isOpen,
  onClose,
  onSwitchToLogin,
  onRegisterSuccess
}: Props) {
  const [audience, setAudience] = useState<"parents" | "schools">("parents");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      // 1️⃣ Register (incluye nombre requerido por backend)
      await authService.register({
        name,
        email,
        password,
        role: audience === "schools" ? "private" : "public",
      });

      onRegisterSuccess?.({ email });
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof ApiError) {
        const data = err.data as { message?: string } | undefined;
        setError(
          data?.message ??
            (err.status === 409
              ? "El correo ya existe. Intenta iniciar sesión."
              : err.status === 500
              ? "Error del servidor (500). Intenta más tarde."
              : `Error ${err.status}. No se pudo completar el registro.`),
        );
      } else {
        setError("Ha ocurrido un error inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
      aria-modal
      role="dialog"
    >
      <div className="relative w-md max-w-[92vw] rounded-3xl bg-white shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={18} />
        </button>

        <div className="px-5 pt-8 pb-6">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Únete a Skoolia
          </h2>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Regístrate como {audience === "parents" ? "padre" : "escuela"}
          </p>

          {/* Audience selector */}
          <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
            <button
              type="button"
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
              type="button"
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
          <form className="mt-4" onSubmit={handleSubmit}>
            <label className="block text-xs font-bold text-slate-500">
              NOMBRE
            </label>
            <input
              name="name"
              type="text"
              required
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <label className="block text-xs font-bold text-slate-500">
              EMAIL
            </label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <label className="mt-4 block text-xs font-bold text-slate-500">
              CONTRASEÑA
            </label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-5 w-full rounded-2xl bg-slate-900 px-4 py-2 font-bold text-white transition hover:bg-indigo-700 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Creando cuenta..." : "Registrarme"}
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-3 text-center text-xs text-slate-500">
            ¿Ya tienes cuenta?{" "}
            {onSwitchToLogin && (
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="font-bold text-indigo-700 hover:underline"
              >
                Inicia sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
