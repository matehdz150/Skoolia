'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Heart, LogOut, Search } from 'lucide-react';
import { JSX } from 'react';

export default function ParentsNavbar(): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const onLogout = () => {
    // TODO: replace with real sign-out
    router.push('/');
  };
  const isFavorites = pathname?.startsWith('/parents/favorites');

  return (
    <div className="sticky top-0 z-50">
      <nav className="w-full px-6 py-3 bg-white text-black shadow-sm outline-none">
        <div className="flex items-center justify-between">
          {/* Left cluster: Brand + control */}
          <div className="flex items-center gap-4">
            {/* Brand */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-xl shadow-indigo-200">
                <span className="text-white font-extrabold">s</span>
              </div>
              <span className="font-extrabold text-xl text-slate-900">Skoolia</span>
            </div>
            {/* Segmented control near brand */}
            <div className="flex rounded-2xl bg-slate-100 p-1 shadow-inner">
              <Link
                href="/parents"
                className={`flex h-9 w-12 items-center justify-center rounded-xl transition-colors ${
                  !isFavorites ? 'bg-white text-indigo-600 shadow' : 'text-slate-500 hover:text-slate-700'
                } focus:outline-none focus:ring-0`}
                aria-label="Buscar"
              >
                <Search size={18} />
              </Link>
              <Link
                href="/parents/favorites"
                className={`ml-1 flex h-9 w-12 items-center justify-center rounded-xl transition-colors ${
                  isFavorites ? 'bg-white text-rose-600 shadow' : 'text-slate-500 hover:text-slate-700'
                } focus:outline-none focus:ring-0`}
                aria-label="Favoritos"
              >
                <Heart size={18} />
              </Link>
            </div>
          </div>

          {/* Right: Logout */}
          <button
            onClick={onLogout}
            className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-100 focus:outline-none focus:ring-0"
            aria-label="Cerrar sesión"
          >
            <LogOut size={18} />
          </button>
        </div>
      </nav>
    </div>
  );
}
