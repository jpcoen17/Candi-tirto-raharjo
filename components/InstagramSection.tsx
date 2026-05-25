"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const photos = [
  { src: "/assets/venue-1.png", alt: "Temple Area" },
  { src: "/assets/venue-2.png", alt: "Poolside" },
  { src: "/assets/venue-3.png", alt: "Dining" },
  { src: "/assets/venue-4.png", alt: "Garden" },
  { src: "/assets/venue-5.png", alt: "Wedding" },
  { src: "/assets/venue-6.png", alt: "Event" },
];

export default function InstagramSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section style={{ background: "#0d0b09", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }} ref={ref}>

        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            style={{ fontFamily: "'Cinzel',serif", color: "rgba(184,145,91,0.6)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 16 }}
          >Instagram</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Cinzel',serif", color: "#F7F2EB", fontSize: "clamp(1.5rem,3.5vw,2.2rem)", letterSpacing: "0.08em" }}
          >Ikuti Perjalanan Kami</motion.h2>
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg,transparent,#B8915B,transparent)", margin: "16px auto 0" }} />
        </div>

        {/* 6-col photo grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8, marginBottom: 32 }}>
          {photos.map((p, i) => (
            <motion.a key={i}
              href="https://www.instagram.com/canditirtojogya"
              target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.07 }}
              style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", display: "block" }}
            >
              <img src={p.src} alt={p.alt}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.1)"}
                onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"}
              />
            </motion.a>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <a href="https://www.instagram.com/canditirtojogya" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 32px", border: "1px solid rgba(184,145,91,0.4)", color: "#B8915B", textDecoration: "none", fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", transition: "background 0.3s" }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(184,145,91,0.1)"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "transparent"}
          >
            ↗ @CANDITIRTOJOGYA · FOLLOW THE JOURNEY
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #__next section [style*="repeat(6"] { grid-template-columns: repeat(3,1fr) !important; }
        }
      `}</style>
    </section>
  );
}
