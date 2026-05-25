"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, Briefcase, Cake, UtensilsCrossed, Users } from "lucide-react";

const packages = [
  {
    icon: Heart,
    title: "Wedding Ceremony",
    desc: "Pernikahan sakral berlatar candi. Dekorasi premium, catering eksklusif, dan dokumentasi profesional untuk hari istimewa Anda.",
    features: ["Dekorasi Candi Premium", "Catering Eksklusif", "Wedding Organizer", "Dokumentasi"],
    tag: "Most Popular",
    color: "#be185d",
  },
  {
    icon: Briefcase,
    title: "Corporate Gathering",
    desc: "Event korporat berkelas di venue heritage dengan fasilitas MICE lengkap yang menginspirasi.",
    features: ["Meeting Room", "Sound System", "Catering", "Branding Area"],
    tag: "MICE",
    color: "#0369a1",
  },
  {
    icon: Cake,
    title: "Birthday Celebration",
    desc: "Rayakan ulang tahun dalam nuansa heritage yang tak terlupakan dengan paket lengkap.",
    features: ["Dekorasi Tema", "Birthday Cake", "Photo Booth", "Hiburan Live"],
    tag: "Celebration",
    color: "#b45309",
  },
  {
    icon: UtensilsCrossed,
    title: "Private Dining",
    desc: "Makan malam eksklusif di sudut paling romantis venue candi kami. Ideal untuk date atau keluarga.",
    features: ["Meja Privat", "Set Menu Premium", "Candle Light", "Live Musik"],
    tag: "Romantic",
    color: "#7c3aed",
  },
  {
    icon: Users,
    title: "MICE Package",
    desc: "Solusi lengkap untuk seminar, workshop, dan gathering korporasi kapasitas ratusan orang.",
    features: ["Kapasitas 200+", "Proyektor & Layar", "Catering Full Day", "Dokumentasi"],
    tag: "Corporate",
    color: "#065f46",
  },
];

export default function Packages() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const scrollToReservation = () =>
    document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="packages" style={{ background: "#0d0b09", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }} ref={ref}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            style={{ fontFamily: "'Cinzel',Georgia,serif", color: "rgba(184,145,91,0.6)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 16 }}
          >
            Paket &amp; Layanan
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Cinzel',Georgia,serif", color: "#F7F2EB", fontSize: "clamp(1.6rem,4vw,2.5rem)", letterSpacing: "0.08em" }}
          >
            Paket Kami
          </motion.h2>
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg,transparent,#B8915B,transparent)", margin: "16px auto 0" }} />
        </div>

        {/* Cards grid — pure CSS grid, no Tailwind */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.25rem",
        }}>
          {packages.map((pkg, i) => {
            const Icon = pkg.icon;
            return (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.09 }}
                style={{
                  background: "rgba(26,22,18,0.95)",
                  border: "1px solid rgba(184,145,91,0.2)",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
                  cursor: "default",
                }}
                whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(184,145,91,0.12)" }}
              >
                {/* Top row: tag + icon */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                  <span style={{
                    fontFamily: "'Cinzel',Georgia,serif",
                    color: "rgba(184,145,91,0.55)",
                    fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase",
                    border: "1px solid rgba(184,145,91,0.25)",
                    padding: "3px 8px",
                  }}>
                    {pkg.tag}
                  </span>
                  <span style={{ color: "rgba(184,145,91,0.5)" }}>
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ fontFamily: "'Cinzel',Georgia,serif", color: "#F7F2EB", fontSize: 14, letterSpacing: "0.1em", marginBottom: 12 }}>
                  {pkg.title}
                </h3>

                {/* Desc */}
                <p style={{ fontFamily: "'Lato',Arial,sans-serif", color: "#a8a29e", fontSize: 12, lineHeight: 1.7, marginBottom: 20, flex: 1 }}>
                  {pkg.desc}
                </p>

                {/* Features */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                  {pkg.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(184,145,91,0.6)", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Lato',Arial,sans-serif", color: "#78716c", fontSize: 11 }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={scrollToReservation}
                  style={{
                    width: "100%", padding: "12px 0",
                    background: "transparent",
                    border: "1px solid rgba(184,145,91,0.4)",
                    color: "#B8915B", cursor: "pointer",
                    fontFamily: "'Cinzel',Georgia,serif",
                    fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                    transition: "background 0.3s ease, border-color 0.3s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(184,145,91,0.12)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,145,91,0.7)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,145,91,0.4)";
                  }}
                >
                  MINTA PROPOSAL
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
