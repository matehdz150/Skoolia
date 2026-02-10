import SearchBar from "../layout/SearchBar";

export default function HeroSection() {
    return (
        <section className="w-full max-w-6xl mx-auto px-6 sm:px-8 pt-12 sm:pt-16 pb-8 flex flex-col items-center text-center">
            {/* Subtítulo pequeño */}
            <div className="mb-6">
                <span className="inline-block px-6 py-2 rounded-full bg-white text-[#4f4fff] font-bold text-xs tracking-widest shadow-sm uppercase border border-[#e6e6fa]">
                    • ENCUENTRA SU LUGAR EN EL MUNDO
                </span>
            </div>
            {/* Título principal */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl leading-tight md:leading-[1.05] font-extrabold text-slate-900 mb-2">
                La educación <br />
                <span className="text-[#6c4fff] block" style={{ fontWeight: 900 }}>
                    hecha a medida.
                </span>
            </h1>
            {/* SearchBar */}
            <div className="w-full mt-10 md:mt-16">
                <SearchBar />
            </div>
        </section>
    );
}