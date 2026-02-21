"use client";

import {
  GraduationCap,
  LogIn,
  PlusCircle,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar(): JSX.Element {
  const { user, logout } = useAuth();
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const audience = searchParams.get("audience") ?? "parents";

  const isAuthRoute = pathname?.startsWith("/auth");

  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const displayName = user?.name ?? user?.email.split("@")[0] ?? "";

  return (
    <div className="sticky top-0 z-50">
      <nav
        className={`w-full max-w-6xl mx-auto px-8 py-4 mt-5 ${
          scrolled
            ? "bg-white/55 backdrop-blur-md shadow-lg border border-white/30"
            : isAuthRoute
              ? "bg-white"
              : "bg-[#f3f3f3]"
        } text-black rounded-4xl flex items-center justify-between transition-all duration-300`}
      >
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-12 h-12 bg-[#1973FC] rounded-xl">
            <GraduationCap size={28} className="text-white" />
          </div>
          <span className="font-extrabold text-2xl text-slate-800">
            Skoolia
          </span>
        </div>

        <div className="flex items-center gap-8">
          {/* LINKS */}
          <ul className="hidden md:flex gap-8 font-semibold text-base">
            <li>
              <Link
                href="/?audience=parents"
                className={`font-extrabold ${
                  pathname === "/" && audience === "parents"
                    ? "text-[#1973FC]"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                PARA PADRES
              </Link>
            </li>
            <li>
              <Link
                href="/?audience=schools"
                className={`font-extrabold ${
                  pathname === "/" && audience === "schools"
                    ? "text-[#1973FC]"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                PARA ESCUELAS
              </Link>
            </li>
          </ul>

          <div className="h-6 w-px bg-gray-200 hidden md:block" />

          {/* ===== RIGHT SIDE ===== */}

          {!user ? (
            // 🔓 NO AUTH
            <div className="flex gap-5">
              <button
                onClick={() => {router.push('/auth/login')}}
                className="px-5 py-2 text-slate-800 rounded-full font-extrabold flex items-center gap-2 hover:text-indigo-600"
              >
                <LogIn size={16} />
                ENTRAR
              </button>

              <button
                onClick={() => {router.push('/auth/register')}}
                className="px-5 py-2 rounded-2xl bg-slate-900 text-white font-bold flex items-center gap-2 hover:bg-indigo-600 transition"
              >
                <PlusCircle size={16} />
                UNIRSE
              </button>
            </div>
          ) : (
            // 🔐 AUTHENTICATED
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                className="flex items-center gap-3 bg-white hover:bg-[#f3f3f3] px-4 py-2 rounded-2xl transition"
              >
                <div className="w-9 h-9 bg-[#FF33FF]/24 rounded-full flex items-center justify-center text-white font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </div>

                <span className="font-medium max-w-35 truncate">
                  {displayName}
                </span>

                <ChevronDown size={18} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-2xl p-2 border">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg text-sm"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>

                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg text-sm"
                  >
                    <User size={16} />
                    Mi perfil
                  </Link>

                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg text-sm text-red-600 w-full text-left"
                  >
                    <LogOut size={16} />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
      />

      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onSwitchToLogin={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />
    </div>
  );
}
