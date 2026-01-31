'use client';
import { GraduationCap, LogIn, PlusCircle } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [activeLink, setActiveLink] = useState("padres"); // Cambia según la lógica de tu app

    return (
        <nav className="w-full max-w-6xl mx-auto mt-6 px-8 py-4 bg-white border-b border-black/8 dark:border-white/[.145] text-black rounded-3xl shadow-lg flex items-center justify-between">
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
                            <a
                                href="#"
                                className={`font-extrabold ${activeLink === "padres"
                                        ? "text-indigo-600 cursor-default"
                                        : "text-gray-400 hover:text-black cursor-pointer"
                                    }`}
                                onClick={() => setActiveLink("padres")}
                            >
                                PARA PADRES
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={`font-extrabold ${activeLink === "escuelas"
                                        ? "text-indigo-600 cursor-default"
                                        : "text-gray-400 hover:text-black cursor-pointer"
                                    }`}
                                onClick={() => setActiveLink("escuelas")}
                            >
                                PARA ESCUELAS
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="h-6 w-px bg-gray-200" />

                {/* Botones */}
                <div className="flex gap-5">
                    <button className="px-5 py-2 text-slate-800 rounded-full font-extrabold flex items-center gap-2 border-none hover:text-indigo-600 cursor-pointer">
                        <LogIn size={15} />
                        ENTRAR
                    </button>
                    <button className="px-5 py-2 rounded-2xl bg-slate-900 text-white font-bold flex items-center gap-2
                    hover:bg-indigo-600 transition-all duration-200 cursor-pointer transform hover:scale-105">
                        <PlusCircle size={15} />
                        UNIRSE
                    </button>
                </div>
            </div>
        </nav>
    );
}