'use client';
import { GraduationCap, LogIn, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ParentsNavbar from './ParentsNavbar';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // If there is a dedicated parents area route, show its navbar
  if (pathname?.startsWith('/parents')) {
    return <ParentsNavbar />;
  }

  return (
    <div className="sticky top-0 z-50">
      <nav
        className={`w-full max-w-6xl mx-auto px-8 py-4 ${
          scrolled
            ? 'bg-white/55 backdrop-blur-md supports-backdrop-filter:bg-white/50 supports-backdrop-filter:backdrop-blur-md shadow-lg border border-white/30'
            : 'bg-white'
        } text-black rounded-4xl flex items-center justify-between transition-all duration-300`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl shadow-indigo-200">
            <GraduationCap size={32} className="text-white" />
          </div>
          <span className="font-extrabold text-2xl text-slate-800">Skoolia</span>
        </div>

        <div className="flex items-center gap-10">
          {/* Links */}
          <div>
            <ul className="flex gap-8 font-semibold text-base">
              <li>
                <Link
                  href="/"
                  className={`font-extrabold ${
                    pathname === '/' ? 'text-indigo-600' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  PARA PADRES
                </Link>
              </li>
              <li>
                <Link
                  href="/schools"
                  className={`font-extrabold ${
                    pathname === '/schools' ? 'text-indigo-600' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  PARA ESCUELAS
                </Link>
              </li>
            </ul>
          </div>

          <div className="h-6 w-px bg-gray-200" />

          {/* Buttons */}
          <div className="flex gap-5">
            <button
              onClick={() => setLoginOpen(true)}
              className="px-5 py-2 text-slate-800 rounded-full font-extrabold flex items-center gap-2 border-none hover:text-indigo-600 cursor-pointer"
            >
              <LogIn size={15} />
              ENTRAR
            </button>
            <button
              onClick={() => setRegisterOpen(true)}
              className="px-5 py-2 rounded-2xl bg-slate-900 text-white font-bold flex items-center gap-2 hover:bg-indigo-600 transition-all duration-200 cursor-pointer transform hover:scale-105"
            >
              <PlusCircle size={15} />
              UNIRSE
            </button>
          </div>
        </div>
      </nav>

      {/* Modals */}
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
