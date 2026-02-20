"use client";

import * as React from "react";
import { GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "Maternal",
  "Preescolar",
  "Primaria",
  "Secundaria",
  "Preparatoria",
  "Universidad",
];

export function EducationInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filtered = React.useMemo(() => {
    const v = value.trim().toLowerCase();
    if (!v) return categories;
    return categories.filter((c) =>
      c.toLowerCase().includes(v)
    );
  }, [value]);

  React.useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () =>
      document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full">
      {/* INPUT */}
      <div className="flex items-center w-full px-4 py-3 rounded-xl transition focus-within:bg-neutral-50">
        <GraduationCap className="text-black mr-3" size={26} />
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Nivel educativo, nombre"
          className="bg-transparent outline-none w-full text-base placeholder:text-black/56"
        />
      </div>

      {/* DROPDOWN ANIMADO */}
      <AnimatePresence>
        {open && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full mt-2 z-50"
          >
            <div className="rounded-2xl bg-white/95 backdrop-blur-md p-2 shadow-xl border border-neutral-200">
              <div className="flex flex-col">
                {filtered.map((category, index) => (
                  <motion.button
                    key={category}
                    type="button"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.03,
                      duration: 0.15,
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onChange(category);
                      requestAnimationFrame(() =>
                        inputRef.current?.focus()
                      );
                      setOpen(false);
                    }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 px-3 py-3 text-left rounded-xl hover:bg-neutral-100 transition"
                  >
                    <GraduationCap
                      size={16}
                      className="text-[#1973FC]"
                    />
                    <span className="text-sm text-neutral-900">
                      {category}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}