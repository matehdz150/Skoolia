"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import { authService } from "@/lib/services/services/auth.service";
import { WaveVector } from "@/lib/icons/WaveVector";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { refreshUser } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    try {
      setLoading(true);
      setError(null);

      await authService.login({
        email,
        password,
      });

      // backend setea cookies httponly
      await refreshUser();
      router.push('/parents')
    } catch (err: unknown) {
      console.error(err);
      setError("Credenciales inválidas.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex flex-col relative overflow-hidden">
      {/* NAVBAR */}
      <div className="pt-6 px-6">
        <Navbar />
      </div>

      {/* CONTENIDO CENTRAL */}
      <div className="flex-1 flex items-center justify-center px-6 pb-20 z-10">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10 px-20 space-y-6">
          <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>

          {/* FORM */}
          <div className="space-y-4">
            <Input
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 rounded-full bg-[#f3f3f3] border-0 px-6 focus-visible:ring-2 focus-visible:ring-[#1973FC]"
            />

            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 rounded-full bg-[#f3f3f3] border-0 px-6 focus-visible:ring-2 focus-visible:ring-[#1973FC]"
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-14 rounded-full bg-linear-to-r from-[#2A6EE8] to-[#1973FC] text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Entrar"}
          </button>

          {/* GOOGLE BUTTON */}
          <button className="w-full h-14 rounded-full bg-[#f3f3f3] flex items-center justify-center gap-3 font-medium hover:bg-[#eaeaea] transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continuar con Google
          </button>

          {/* LINK A REGISTER */}
          <p className="text-center text-sm text-gray-500">
            ¿No tienes cuenta?{" "}
            <Link
              href="/auth/register"
              className="text-[#1973FC] font-semibold hover:underline"
            >
              Crear cuenta
            </Link>
          </p>
        </div>
      </div>

      <WaveVector
        className="absolute bottom-0 left-0 pointer-events-none z-0 w-400"
        strokeWidth={10}
      />
    </div>
  );
}
