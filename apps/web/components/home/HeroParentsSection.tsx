import SearchBar from "../layout/SearchBar";

export default function HeroSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 sm:px-8 pt-16 pb-8 flex flex-col items-center text-center">
      {/* TÍTULO */}
      <h1 className="text-4xl sm:text-6xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-black">
        La plataforma inteligente
        <br />
        <span className="block">Para descubrir escuelas</span>
      </h1>

      {/* SUBTÍTULO */}
      <p className="mt-6 max-w-2xl text-lg sm:text-xl font-light text-neutral-600 leading-relaxed">
        Encontrar la mejor opción educativa para tus hijos nunca fue tan fácil.
        <br />
        Compara, descubre y elige con confianza.
      </p>

      {/* SEARCH */}
      <img
        src="/illustrations/left.svg"
        alt=""
        className="absolute left-0 top-6/16 w-55 md:w-85"
      />
      <img
        src="/illustrations/right.svg"
        alt=""
        className="absolute right-0 top-6/16 w-55 md:w-85"
      />
      <div className="w-full mt-10 md:mt-16 flex justify-center">
        <SearchBar />
      </div>
    </section>
  );
}
