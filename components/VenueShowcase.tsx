"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const venues = [
  { src: "/assets/venue-1.png", label: "Temple Area",    tag: "Heritage" },
  { src: "/assets/venue-2.png", label: "Poolside",       tag: "Kolam" },
  { src: "/assets/venue-3.png", label: "Dining Area",    tag: "Restoran" },
  { src: "/assets/venue-4.png", label: "Garden",         tag: "Taman" },
  { src: "/assets/venue-5.png", label: "Wedding Venue",  tag: "Pernikahan" },
  { src: "/assets/venue-6.png", label: "Private Event",  tag: "Privat" },
  { src: "/assets/venue-7.png", label: "Night Ambience", tag: "Malam" },
  { src: "/assets/venue-8.png", label: "Open Space",     tag: "Outdoor" },
  { src: "/assets/venue-9.png", label: "Heritage View",  tag: "Panorama" },
];

export default function VenueShowcase() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [activeImg, setActiveImg] = useState<string | null>(null);

  return (
    <section id="venue" style={{ background: "#0d0b09", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }} ref={ref}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="font-display" style={{ color: "rgba(184,145,91,0.6)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 16 }}
          >
            Venue Experience
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="font-display" style={{ color: "#F7F2EB", fontSize: "clamp(1.6rem,4vw,2.5rem)", letterSpacing: "0.08em" }}
          >
            Ruang Yang Bercerita
          </motion.h2>
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg,transparent,#B8915B,transparent)", margin: "16px auto 0" }} />
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {venues.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              onClick={() => setActiveImg(v.src)}
              style={{
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                gridRow: (i === 1 || i === 4 || i === 7) ? "span 2" : "span 1",
                minHeight: 200,
              }}
              className="group"
            >
              <img
                src={v.src} alt={v.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
                className="group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(14,12,9,0.85) 0%, transparent 60%)",
                opacity: 0, transition: "opacity 0.4s ease",
              }} className="group-hover:opacity-100" />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem",
                transform: "translateY(100%)", transition: "transform 0.35s ease",
              }} className="group-hover:translate-y-0">
                <p className="font-display" style={{ color: "rgba(184,145,91,0.8)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 4 }}>{v.tag}</p>
                <p className="font-display" style={{ color: "#F7F2EB", fontSize: 12, letterSpacing: "0.12em" }}>{v.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeImg && (
        <div
          onClick={() => setActiveImg(null)}
          style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(10,8,7,0.96)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        >
          <div style={{ position: "relative", maxWidth: 960, width: "100%", padding: "0 1rem" }}>
            <img src={activeImg} alt="Venue" style={{ width: "100%", maxHeight: "85vh", objectFit: "contain", display: "block" }} />
            <button
              onClick={() => setActiveImg(null)}
              style={{ position: "absolute", top: 8, right: 20, background: "none", border: "none", color: "#d6d3d1", fontSize: 24, cursor: "pointer", lineHeight: 1 }}
            >✕</button>
          </div>
        </div>
      )}
    </section>
  );
}
