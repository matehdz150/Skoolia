'use client';
import { GraduationCap, LogIn, PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import ParentsNavbar from "./ParentsNavbar";

export default function Navbar(): JSX.Element {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const audience = searchParams.get("audience") ?? "parents";
    const [scrolled, setScrolled] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    useEffect(() => {
        if (searchParams.get('loginPrompt') === '1') {
            setLoginOpen(true);
        }
    }, [searchParams]);
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // Parent area navbar variant
        if (pathname?.startsWith('/parents')) {
            return <ParentsNavbar />;
        }

        return (
            <div className="sticky top-0 z-50">
            <nav className={`w-full max-w-6xl mx-auto px-4 sm:px-8 py-3 sm:py-4 ${scrolled ? 'bg-white/55 backdrop-blur-md supports-backdrop-filter:bg-white/50 supports-backdrop-filter:backdrop-blur-md shadow-lg border border-white/30' : 'bg-white'} text-black rounded-4xl flex flex-wrap items-center justify-between gap-3 sm:gap-6 transition-all duration-300 outline-none`}> 
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-indigo-600 rounded-xl shadow-indigo-200">
                        <GraduationCap size={28} className="text-white sm:hidden" />
                        <GraduationCap size={32} className="hidden sm:block text-white" />
                    </div>
                    <span className="font-extrabold text-xl sm:text-2xl text-slate-800">Skoolia</span>
                </div>

                <div className="flex items-center gap-4 sm:gap-8">
                    {/* Links */}
                    <div className="hidden md:block">
                        <ul className="flex gap-6 lg:gap-8 font-semibold text-sm lg:text-base">
                            <li>
                                <Link
                                    href="/?audience=parents"
                                    className={`font-extrabold ${pathname === "/" && audience === "parents" ? "text-indigo-600" : "text-gray-400 hover:text-black"} focus:outline-none focus:ring-0`}
                                >
                                    PARA PADRES
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/?audience=schools"
                                    className={`font-extrabold ${pathname === "/" && audience === "schools" ? "text-indigo-600" : "text-gray-400 hover:text-black"} focus:outline-none focus:ring-0`}
                                >
                                    PARA ESCUELAS
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="hidden md:block h-6 w-px bg-gray-200" />

                    {/* Botones */}
                    <div className="flex gap-3 sm:gap-5">
                        <button onClick={() => setLoginOpen(true)} className="px-3 sm:px-5 py-2 text-sm sm:text-base text-slate-800 rounded-full font-extrabold flex items-center gap-2 border-none hover:text-indigo-600 cursor-pointer focus:outline-none focus:ring-0">
                            <LogIn size={15} />
                            ENTRAR
                        </button>
                        <button onClick={() => setRegisterOpen(true)} className="px-3 sm:px-5 py-2 rounded-2xl bg-slate-900 text-white text-sm sm:text-base font-bold flex items-center gap-2
                        hover:bg-indigo-600 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-0">
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
                onSwitchToRegister={() => { setLoginOpen(false); setRegisterOpen(true); }}
            />
            <RegisterModal
                isOpen={registerOpen}
                onClose={() => setRegisterOpen(false)}
                onSwitchToLogin={() => { setRegisterOpen(false); setLoginOpen(true); }}
            />
            </div>
        );
}