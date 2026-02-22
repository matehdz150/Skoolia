"use client"
import { WaveVector } from "@/lib/icons/WaveVector";
import SearchBar from "../layout/SearchBar";
import { motion } from "framer-motion";
import { LineBackground } from "@/lib/icons/LineBackground";

export default function HeroSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 sm:px-8 pt-16 pb-8 flex flex-col items-center text-center">
      {/* TÍTULO */}
      <h1 className="text-4xl sm:text-6xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-[#2d2c2b] z-2">
        La plataforma inteligente
        <br />
        <span className="block">Para descubrir escuelas</span>
      </h1>

      {/* SUBTÍTULO */}
      <p className="mt-6 max-w-2xl text-lg sm:text-xl font-light text-[#2d2c2b] leading-relaxed z-2">
        Encontrar la mejor opción educativa para tus hijos nunca fue tan fácil.
        <br />
        Compara, descubre y elige con confianza.
      </p>

      {/* SEARCH */}
      {/* LEFT ILLUSTRATION */}
      <motion.img
        src="/illustrations/left.svg"
        alt=""
        initial={{ opacity: 0, x: -80, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute left-0 top-4/16 w-55 md:w-95"
      />

      {/* RIGHT ILLUSTRATION */}
      <motion.img
        src="/illustrations/right.svg"
        alt=""
        initial={{ opacity: 0, x: 80, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{
          duration: 1,
          delay: 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute right-0 top-3/16 w-155 md:w-125"
      />
      <div className="w-full mt-10 md:mt-16 flex justify-center z-2">
        <SearchBar />
      </div>
    </section>
  );
}
