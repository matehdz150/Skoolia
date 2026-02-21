"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import { LineBackground } from "@/lib/icons/LineBackground";
import { authService } from "@/lib/services/services/auth.service";

type Role = "public" | "private";

export default function RegisterPage() {
  const { refreshUser } = useAuth();

  const [role, setRole] = useState<Role>("public");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister() {
    try {
      setLoading(true);
      setError(null);

      await authService.register({
        name,
        email,
        password,
        role, // 🔥 aquí ya está controlado por el toggle
      });

      // si tu backend setea cookies httponly
      // ahora pedimos el user real
      await refreshUser();
    } catch (err: any) {
      console.error(err);
      setError("No se pudo crear la cuenta. Intenta nuevamente.");
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
      <div className="flex-1 flex items-center justify-center px-6 pb-20 z-10" >
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10 space-y-6 px-20">
          <h1 className="text-2xl font-bold text-center">Crear cuenta</h1>

          {/* ROLE TOGGLE */}
          <div className="w-full max-w-md mx-auto">
            <div className="flex bg-[#efefef] rounded-full p-1">
              <button
                onClick={() => setRole("public")}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
                  role === "public"
                    ? "bg-white shadow text-black"
                    : "text-gray-500"
                }`}
              >
                Padres
              </button>

              <button
                onClick={() => setRole("private")}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
                  role === "private"
                    ? "bg-white shadow text-black"
                    : "text-gray-500"
                }`}
              >
                Escuela
              </button>
            </div>
          </div>

          {/* FORM */}
          <div className="space-y-4">
            {role === "public" && (
              <Input
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 rounded-full bg-[#f3f3f3] border-0 px-6 focus-visible:ring-2 focus-visible:ring-[#1973FC]"
              />
            )}

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

          {/* REGISTER BUTTON */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full h-14 rounded-full bg-gradient-to-r from-[#2A6EE8] to-[#1973FC] text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Registrarme"}
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
        </div>
      </div>

      <LineBackground
        className="absolute bottom-0 right-0 pointer-events-none z-0 w-300"
        strokeWidth={20}
      />
    </div>
  );
}
