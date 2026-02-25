"use client";

import { LineBackground } from "@/lib/icons/LineBackground";
import { ArrowLeft, ArrowRight, HatGlasses, School } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AuthLandingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT 40% */}
      <div className="lg:basis-[50%] w-full bg-white relative flex flex-col">
        {/* Back Button */}
        <div className="p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-black hover:opacity-70 transition"
          >
            <ArrowLeft size={20} />
          </Link>
        </div>

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="flex-1 flex flex-col px-10 lg:px-20 space-y-0 py-6 z-3"
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold text-center lg:text-left"
          >
            Inicia sesión
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="text-xl font-light"
          >
            Elige una opcion para iniciar sesion
          </motion.p>

          <motion.button
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="w-full border border-black bg-white rounded-2xl p-6 text-left hover:bg-white transition flex justify-between items-center mt-6"
            onClick={()=>router.push('login/parents')}
          >
            <div>
              <div className="flex gap-2">
                <HatGlasses />
                <p className="font-semibold">Skoolia para padres</p>
              </div>
              <p className="text-sm text-gray-600">
                Encuentra la mejor opción para tus hijos
              </p>
            </div>
            <ArrowRight/>
          </motion.button>

          {/* Option 2 */}
          <motion.button
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="w-full border border-black bg-white rounded-2xl p-6 text-left hover:bg-white transition flex justify-between items-center mt-6"
          >
            <div>
              <div className="flex gap-2">
                <School />
                <p className="font-semibold">Skoolia para Escuelas</p>
              </div>
              <p className="text-sm text-gray-600">
                Gestiona el proceso de admisión eficientemente
              </p>
            </div>
            <ArrowRight/>
          </motion.button>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="text-sm text-gray-500 pt-3"
          >
            ¿No tienes cuenta?{" "}
            <Link
              href="/auth/register"
              className="text-[#1973FC] font-semibold hover:underline"
            >
              Crear cuenta
            </Link>
          </motion.p>
        </motion.div>
      </div>

      {/* RIGHT 60% */}
      <div className="lg:basis-[50%] w-full relative bg-gray-200 overflow-hidden">
        {/* Aquí va tu imagen */}
        <div className="absolute inset-0">
          {/* Imagen */}
          <img
            alt="img"
            src="https://plus.unsplash.com/premium_photo-1671070290623-d6f76bdbb3db?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full h-full object-cover z-1"
          />

          {/* Overlay negro 25% */}
          <div className="absolute inset-0 bg-black/25 z-3" />
        </div>

        {/* Overlay content */}
        <div className="absolute bottom-10 left-10 text-white max-w-lg z-4">
          <h2 className="text-4xl font-bold">Conecta con Familias</h2>
          <p className="mt-3 text-xl text-white/80">
            Recibe leads calificados de padres <br />
            interesados en tu institución
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -100, y: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1], // ease-out premium
        }}
        className="absolute -bottom-40 -left-80 w-[500px] h-[500px] bg-[#FFCD6C] rounded-full z-0"
      />
    </div>
  );
}
