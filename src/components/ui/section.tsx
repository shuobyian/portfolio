"use client";

import { motion } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`py-16 sm:py-24 ${className}`}
    >
      <div className="mx-auto max-w-5xl px-6">{children}</div>
    </motion.section>
  );
}
