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
      animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      }}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{ scale: 0.98 }}
      className="relative flex items-center gap-3 text-white font-medium px-6 py-3 rounded-full text-base shadow-lg overflow-hidden"
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
        backgroundSize: "300% 100%",
      }}
    >
      {children}
    </motion.button>
  );
}