"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const trustItems = ["Temple Venue", "Wedding & Celebration", "Dining Experience", "Corporate & MICE"];

const btnBase: React.CSSProperties = {
  border: "none",
  cursor: "pointer",
  fontSize: 11,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  padding: "14px 32px",
  transition: "all 0.3s ease",
  minWidth: 180,
};

export default function Hero() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "linear-gradient(135deg,#0d0b09 0%,#1a1410 40%,#1E1B18 70%,#14120f 100%)",
      }}
    >
      {/* Grid pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03,
        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 80px,rgba(184,145,91,1) 80px,rgba(184,145,91,1) 81px),repeating-linear-gradient(90deg,transparent,transparent 80px,rgba(184,145,91,1) 80px,rgba(184,145,91,1) 81px)",
      }} />

      {/* Warm glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 50% at 50% 55%, rgba(184,145,91,0.07) 0%, transparent 70%)",
      }} />

      {/* Side lines */}
      <div style={{ position: "absolute", left: 32, top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg,transparent,rgba(184,145,91,0.25),transparent)" }} />
      <div style={{ position: "absolute", right: 32, top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg,transparent,rgba(184,145,91,0.25),transparent)" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 900, width: "100%", padding: "6rem 1.5rem 4rem" }}>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 3.0 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 32 }}
        >
          <div style={{ width: 32, height: 1, background: "rgba(184,145,91,0.5)" }} />
          <span className="font-display" style={{ color: "rgba(184,145,91,0.7)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase" }}>
            Jogja Heritage Venue
          </span>
          <div style={{ width: 32, height: 1, background: "rgba(184,145,91,0.5)" }} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 3.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display"
          style={{ color: "#F7F2EB", fontSize: "clamp(2.2rem,6vw,4.5rem)", lineHeight: 1.1, letterSpacing: "0.05em", marginBottom: 24 }}
        >
          Where Heritage <br />
          <span className="shimmer-text">Meets Celebration</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 3.5 }}
          style={{ width: 60, height: 1, background: "linear-gradient(90deg,transparent,#B8915B,transparent)", margin: "0 auto 24px" }}
        />

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 3.6 }}
          className="font-serif"
          style={{ fontStyle: "italic", color: "rgba(247,242,235,0.75)", maxWidth: 620, margin: "0 auto 40px", lineHeight: 1.8, fontSize: "clamp(0.95rem,2vw,1.15rem)" }}
        >
          Temple dining, intimate gatherings, weddings, dan pengalaman tak terlupakan
          di jantung kota Jogja.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.8 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 40 }}
        >
          <button
            onClick={() => go("venue")}
            style={{ ...btnBase, background: "#92400e", color: "#fef3c7" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#b45309"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#92400e"; }}
          >
            EXPLORE VENUE
          </button>
          <button
            onClick={() => go("reservation")}
            style={{ ...btnBase, background: "transparent", color: "#B8915B", border: "1px solid rgba(184,145,91,0.6)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(184,145,91,0.12)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
          >
            BUAT RESERVASI
          </button>
          <button
            onClick={() => go("packages")}
            style={{ ...btnBase, background: "transparent", color: "#a8a29e", border: "1px solid rgba(120,113,108,0.5)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#F7F2EB"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(168,162,158,0.7)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#a8a29e"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(120,113,108,0.5)"; }}
          >
            PAKET ACARA
          </button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 4.1 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "8px 20px" }}
        >
          {trustItems.map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#92400e", flexShrink: 0 }} />
              <span className="font-display" style={{ color: "#78716c", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll caret */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 4.4 }}
        style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", cursor: "pointer" }}
        onClick={() => go("experiences")}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ color: "rgba(184,145,91,0.45)" }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>
    </section>
  );
}
