"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { api, ApiError } from "../lib/services/api";

/* =========================
   TYPES
========================= */

export type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
  role: "public" | "private";
  onboardingRequired: boolean;
};

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

/* =========================
   CONTEXT
========================= */

const AuthContext = createContext<AuthContextType | null>(null);

/* =========================
   PROVIDER
========================= */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     LOAD CURRENT USER
  ========================= */

  async function refreshUser() {
    try {
      const data = await api<AuthUser>("/users/me");
      console.log(data, 'context')
      setUser(data);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setUser(null);
      } else {
        console.error("Unexpected auth error:", err);
      }
    } finally {
      setLoading(false);
    }
  }

  /* =========================
     LOGIN
  ========================= */

  async function login(email: string, password: string) {
    await api("/auth/login", {
      method: "POST",
      body: { email, password },
    });

    // 🔥 después de login pedimos el user real
    await refreshUser();
  }

  /* =========================
     LOGOUT
  ========================= */

  async function logout() {
    try {
      await api("/auth/logout", {
        method: "POST",
      });
    } catch {
      // aunque falle, limpiamos estado
    } finally {
      setUser(null);
    }
  }

  /* =========================
     INIT (cuando carga la app)
  ========================= */

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =========================
   HOOK
========================= */

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}