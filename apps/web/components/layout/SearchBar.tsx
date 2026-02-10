'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaMapMarkerAlt, FaMagic } from "react-icons/fa";

export default function SearchBar() {
    const [activeTab, setActiveTab] = useState<"escuelas" | "cursos">("escuelas");
    const [filters, setFilters] = useState({
        categoria: "",
        edad: "",
        modalidad: "",
        precio: "",
        duracion: "",
    });
    const [query, setQuery] = useState("");
    const [city, setCity] = useState("");
    const router = useRouter();

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const selectBase =
        "flex-1 bg-[#f7f8fa] border border-[#e6e6fa] rounded-lg px-4 py-3 font-semibold text-gray-700 shadow-sm cursor-pointer transition focus:border-[#4f4fff] hover:border-[#b3b3ff] hover:bg-[#f0f3ff]";

    return (
        <div className="w-full flex flex-col items-center gap-4">
            {/* Tabs alineados a la izquierda */}
            <div className="w-full max-w-5xl flex items-center mb-2">
                <div className="flex bg-[#eeeff1] rounded-full p-1 gap-2">
                    <button
                        className={`px-6 py-2 rounded-full font-bold text-sm transition ${
                            activeTab === "escuelas"
                                ? "bg-white text-[#4f4fff] shadow"
                                : "text-gray-400"
                        }`}
                        onClick={() => setActiveTab("escuelas")}
                    >
                        ESCUELAS
                    </button>
                    <button
                        className={`px-6 py-2 rounded-full font-bold text-sm transition ${
                            activeTab === "cursos"
                                ? "bg-white text-[#4f4fff] shadow"
                                : "text-gray-400"
                        }`}
                        onClick={() => setActiveTab("cursos")}
                    >
                        CURSOS
                    </button>
                </div>
            </div>

            {/* Main Search Box */}
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl px-6 sm:px-8 py-6 sm:py-8 flex flex-col gap-4">
                {/* Search Inputs */}
                <div className="flex w-full flex-col md:flex-row gap-3 md:gap-4 mb-2">
                    <div className="flex items-center bg-[#f7f8fa] border border-[#e6e6fa] rounded-lg px-4 py-3 w-full md:w-1/2 shadow-sm">
                        <FaSearch className="text-[#4f4fff] mr-2" />
                        <input
                            className="bg-transparent outline-none w-full text-base text-slate-700"
                            placeholder={
                                activeTab === "escuelas"
                                    ? "Buscar escuela por nombre o palabra clave..."
                                    : "Buscar curso por nombre o palabra clave..."
                            }
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center bg-[#f7f8fa] border border-[#e6e6fa] rounded-lg px-4 py-3 w-full md:w-1/2 shadow-sm">
                        <FaMapMarkerAlt className="text-[#4f4fff] mr-2" />
                        <input
                            className="bg-transparent outline-none w-full text-base text-slate-700"
                            placeholder="Ciudad o zona..."
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    {/* Search Button */}
                    <button
                        onClick={() => {
                            const auth = typeof window !== 'undefined' ? localStorage.getItem('skoolia:auth') : null;
                            if (auth === 'parents') {
                                const params = new URLSearchParams({ q: query, loc: city, tab: activeTab });
                                router.push(`/search?${params.toString()}`);
                            } else {
                                router.push('/?loginPrompt=1');
                            }
                        }}
                        className="flex items-center justify-center bg-[#ff6b1a] hover:bg-[#ff7f3f] text-white font-bold px-8 py-3 rounded-lg transition text-base shadow-md md:ml-2 w-full md:w-auto"
                    >
                        <FaSearch className="mr-2" />
                        Buscar
                    </button>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 w-full gap-3 sm:gap-4">
                    {/* Categoría */}
                    <select
                        name="categoria"
                        value={filters.categoria}
                        onChange={handleFilterChange}
                        className={selectBase}
                    >
                        <option value="">Categoría</option>
                        {activeTab === "escuelas" ? (
                            <>
                                <option value="primaria">Primaria</option>
                                <option value="secundaria">Secundaria</option>
                                <option value="preparatoria">Preparatoria</option>
                                <option value="universidad">Universidad</option>
                                <option value="especial">Especial</option>
                            </>
                        ) : (
                            <>
                                <option value="idiomas">Idiomas</option>
                                <option value="arte">Arte</option>
                                <option value="deporte">Deporte</option>
                                <option value="tecnologia">Tecnología</option>
                                <option value="musica">Música</option>
                            </>
                        )}
                    </select>
                    {/* Edad */}
                    <select
                        name="edad"
                        value={filters.edad}
                        onChange={handleFilterChange}
                        className={selectBase}
                    >
                        <option value="">Edad</option>
                        <option value="3-5">3-5 años</option>
                        <option value="6-11">6-11 años</option>
                        <option value="12-15">12-15 años</option>
                        <option value="16-18">16-18 años</option>
                        <option value="adultos">Adultos</option>
                    </select>
                    {/* Modalidad */}
                    <select
                        name="modalidad"
                        value={filters.modalidad}
                        onChange={handleFilterChange}
                        className={selectBase}
                    >
                        <option value="">Modalidad</option>
                        <option value="presencial">Presencial</option>
                        <option value="en-linea">En línea</option>
                        <option value="hibrido">Híbrido</option>
                    </select>
                    {/* Precio */}
                    <select
                        name="precio"
                        value={filters.precio}
                        onChange={handleFilterChange}
                        className={selectBase}
                    >
                        <option value="">Precio</option>
                        <option value="0-1000">$0 - $1,000</option>
                        <option value="1000-5000">$1,000 - $5,000</option>
                        <option value="5000-10000">$5,000 - $10,000</option>
                        <option value="10000+">$10,000+</option>
                    </select>
                    {/* Duración */}
                    <select
                        name="duracion"
                        value={filters.duracion}
                        onChange={handleFilterChange}
                        className={selectBase}
                    >
                        <option value="">Duración</option>
                        <option value="1-mes">1 mes</option>
                        <option value="3-meses">3 meses</option>
                        <option value="6-meses">6 meses</option>
                        <option value="1-ano">1 año</option>
                        <option value="2-anos">2 años</option>
                    </select>
                </div>
            </div>

            {/* IA Help */}
            <div className="mt-2">
                <button className="flex items-center bg-[#f7f8fa] text-[#4f4fff] font-bold px-6 py-2 rounded-full shadow-sm text-xs tracking-wide border border-[#e6e6fa] transition hover:bg-[#edeaff] hover:text-[#6c4fff]">
                    <FaMagic className="mr-2" />
                    ¿NO SABES QUÉ ELEGIR? DEJA QUE NUESTRA IA TE AYUDE
                </button>
            </div>
        </div>
    );
}