"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface RotatingTextCircleProps {
  text?: string;
  size?: number;
  className?: string;
}

export function RotatingTextCircle({
  text = "FIVE IRON GOLF • INDOOR SIMULATORS • PREMIUM EXPERIENCE • ",
  size = 200,
  className = "",
}: RotatingTextCircleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook para detectar scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transformar scroll en rotación (360 grados por scroll completo)
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Dividir el texto en caracteres
  const characters = text.split("");
  const totalCharacters = characters.length;

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Círculo base (opcional) */}
      <div
        className="absolute rounded-full"
        style={{ width: size, height: size }}
      />

      {/* Texto rotativo */}
      <motion.div className="absolute inset-0" style={{ rotate }}>
        {characters.map((char, index) => {
          // Calcular ángulo para cada carácter
          const angle = (index / totalCharacters) * 360;
          // Radio del círculo (un poco más pequeño que el contenedor)
          const radius = (size - 40) / 2;

          return (
            <motion.span
              key={index}
              className="absolute text-2xl font-bold text-primary uppercase tracking-wider"
              style={{
                transformOrigin: "center",
                left: "50%",
                top: "50%",
                transform: `
                  translate(-50%, -50%) 
                  rotate(${angle}deg) 
                  translateY(-${radius}px)
                `,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.02 }}
            >
              {char}
            </motion.span>
          );
        })}
      </motion.div>

      {/* Centro del círculo (opcional) */}
      <div className="relative z-10 w-[420px] h-[420px] bg-primary rounded-full flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-6xl">5i</span>
      </div>
    </div>
  );
}
