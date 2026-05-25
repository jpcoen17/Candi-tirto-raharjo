"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: 8 + i * 8.5,
  delay: (i * 0.28) % 2,
  duration: 2.5 + (i % 3) * 0.7,
  size: 2.5 + (i % 3),
}));

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Particles */}
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: `${p.x}%`,
                bottom: "15%",
                width: `${p.size}px`,
                height: `${p.size}px`,
                "--duration": `${p.duration}s`,
                "--delay": `${p.delay}s`,
              } as React.CSSProperties}
            />
          ))}

          {/* Ripple rings */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            {[0, 0.9, 1.8].map((d) => (
              <div
                key={d}
                className="ripple"
                style={{
                  position: "absolute",
                  width: 220, height: 220,
                  borderRadius: "50%",
                  border: "1px solid rgba(184,145,91,0.18)",
                  animationDelay: `${d}s`,
                }}
              />
            ))}
          </div>

          {/* Logo + text */}
          <motion.div
            style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {/* Logo via img tag */}
            <img
              src="/assets/logo.png"
              alt="Candi Tirto Raharjo"
              style={{ width: 88, height: 88, objectFit: "contain" }}
            />

            <div style={{ textAlign: "center" }}>
              <h1 className="font-display shimmer-text" style={{ fontSize: "1.4rem", letterSpacing: "0.22em" }}>
                CANDI TIRTO RAHARJO
              </h1>
              <p className="font-display" style={{ color: "rgba(184,145,91,0.55)", fontSize: "9px", letterSpacing: "0.32em", marginTop: "0.5rem", textTransform: "uppercase" }}>
                Temple Dining · Wedding · MICE Venue
              </p>
            </div>

            {/* Progress bar */}
            <div style={{ width: 140, height: 1, background: "rgba(90,83,76,0.4)", overflow: "hidden" }}>
              <motion.div
                style={{ height: 1, background: "#B8915B" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.0, delay: 0.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
