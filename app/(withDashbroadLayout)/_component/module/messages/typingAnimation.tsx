"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TypingAnimation() {
  return (
    <div className="flex items-center gap-1 bg-default-100 rounded-lg px-3 py-2 w-12 m-3">
      <motion.div
        animate={{ opacity: 1 }}
        className="typing-indicator flex gap-1"
        initial={{ opacity: 0 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 2,
        }}
      >
        <motion.span
          animate={{ y: [0, -4, 0] }}
          className="dot bg-default-400 w-1.5 h-1.5 rounded-full"
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.span
          animate={{ y: [0, -4, 0] }}
          className="dot bg-default-400 w-1.5 h-1.5 rounded-full"
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
        <motion.span
          animate={{ y: [0, -4, 0] }}
          className="dot bg-default-400 w-1.5 h-1.5 rounded-full"
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        />
      </motion.div>
    </div>
  );
}
