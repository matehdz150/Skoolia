import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

export default function GradientMagicButton({ children, onClick }: Props) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{ backgroundPosition: "120% 50%" }} // menos recorrido
      transition={{
        duration: 20, // más lento = más fino
        repeat: Infinity,
        ease: "linear",
      }}
      whileHover={{ scale: 1.03 }} // más sutil
      whileTap={{ scale: 0.98 }}
      className="relative flex items-center gap-3 text-white font-medium px-6 py-3 rounded-full text-base shadow-md overflow-hidden cursor-pointer"
      style={{
        backgroundImage: `
          linear-gradient(
            90deg,
            #5227FF,
            #FF9FFC,
            #B19EEF,
            #5227FF
          )
        `,
        backgroundSize: "250% 100%", // menos dramático
      }}
    >
      {children}
    </motion.button>
  );
}