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
  const isSearch = pathname === '/parents';
  const isOtherSection = pathname?.startsWith('/parents/') && pathname !== '/parents';

  return (
    <div className="sticky top-0 z-50">
      <nav className="w-full px-4 sm:px-6 py-3 bg-white text-black shadow-sm outline-none">
        <div className="flex items-center justify-between">
          {/* Left cluster: Brand + control */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Brand */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-indigo-600 rounded-xl shadow-indigo-200">
                <span className="text-white font-extrabold">s</span>
              </div>
              <span className="font-extrabold text-lg sm:text-xl text-slate-900">Skoolia</span>
            </div>
            {/* Segmented control near brand */}
            <div className="flex rounded-2xl bg-slate-100 p-1 shadow-inner">
              <Link
                href="/parents"
                className={`flex h-8 w-10 sm:h-9 sm:w-12 items-center justify-center rounded-xl transition-colors ${
                  isSearch ? 'bg-white shadow' : 'hover:bg-slate-50'
                } focus:outline-none focus:ring-0`}
                aria-label="Buscar"
              >
                <Search size={18} className={isSearch ? 'text-indigo-600' : 'text-slate-500'} />
              </Link>
              <Link
                href="/parents/favorites"
                className={`ml-1 flex h-8 w-10 sm:h-9 sm:w-12 items-center justify-center rounded-xl transition-colors ${
                  isOtherSection ? 'bg-white shadow' : 'hover:bg-slate-50'
                } focus:outline-none focus:ring-0`}
                aria-label="Favoritos"
              >
                <Heart size={18} className={isOtherSection ? 'text-rose-600' : 'text-rose-500'} />
              </Link>
            </div>
          </div>

          {/* Right: Logout */}
          <button
            onClick={onLogout}
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-100 focus:outline-none focus:ring-0"
            aria-label="Cerrar sesión"
          >
            <LogOut size={18} />
          </button>
        </div>
      </nav>
    </div>
  );
}
