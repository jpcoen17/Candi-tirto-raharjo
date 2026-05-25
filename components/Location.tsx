"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Clock, Car, Phone } from "lucide-react";

const infos = [
  { icon: MapPin,  title: "Lokasi",            lines: ["Jl. Kasongan No.RT 03, Tirto,", "Bangunjiwo, Kec. Kasihan,", "Bantul, D.I. Yogyakarta 55184"] },
  { icon: Clock,   title: "Jam Operasional",   lines: ["Selasa – Minggu", "10:00 – 22:00 WIB", "Senin: Tutup"] },
  { icon: Car,     title: "Akses & Parkir",    lines: ["Parkir kendaraan tersedia", "Dekat Pusat Kerajinan Kasongan", "±20 menit dari Malioboro"] },
  { icon: Phone,   title: "Kontak",            lines: ["+62 822-6161-8110", "@canditirtojogya (IG)", "@candi_tirtoraharjo (TikTok)"] },
];

export default function Location() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="location" style={{ background: "#1E1B18", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }} ref={ref}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            style={{ fontFamily: "'Cinzel',serif", color: "rgba(184,145,91,0.6)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 16 }}
          >Temukan Kami</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Cinzel',serif", color: "#F7F2EB", fontSize: "clamp(1.6rem,4vw,2.5rem)", letterSpacing: "0.08em" }}
          >Lokasi &amp; Informasi</motion.h2>
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg,transparent,#B8915B,transparent)", margin: "16px auto 0" }} />
        </div>

        {/* Two column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>

          {/* Map */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}
            style={{ border: "1px solid rgba(184,145,91,0.2)", overflow: "hidden" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.3!2d110.337!3d-7.849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5784a12f5ccf%3A0x1c2a59c1c8e58e50!2sCandi%20Tirto%20Raharjo!5e0!3m2!1sid!2sid!4v1"
              width="100%" height="380" style={{ border: 0, display: "block" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Candi Tirto Raharjo Map"
            />
          </motion.div>

          {/* Info cards */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
              {infos.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.title} style={{ background: "rgba(26,22,18,0.85)", border: "1px solid rgba(184,145,91,0.18)", padding: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <Icon size={13} color="#B8915B" style={{ flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Cinzel',serif", color: "rgba(184,145,91,0.7)", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase" }}>{info.title}</span>
                    </div>
                    {info.lines.map((line, j) => (
                      <p key={j} style={{ fontFamily: "'Lato',Arial,sans-serif", color: "#78716c", fontSize: 12, lineHeight: 1.8 }}>{line}</p>
                    ))}
                  </div>
                );
              })}
            </div>

            <a href="https://maps.google.com/?q=Candi+Tirto+Raharjo+Jogja" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 0", border: "1px solid rgba(184,145,91,0.4)", color: "#B8915B", textDecoration: "none", fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", transition: "background 0.3s" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(184,145,91,0.1)"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "transparent"}
            >
              <MapPin size={12} /> BUKA DI GOOGLE MAPS
            </a>
          </motion.div>
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 768px) {
          #location > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
