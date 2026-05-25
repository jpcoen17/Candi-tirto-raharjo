"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  { name: "Anindita & Bagas",         event: "Wedding Ceremony",                  text: "Pernikahan kami di Candi Tirto Raharjo menjadi momen paling tak terlupakan. Suasana candinya luar biasa, pelayanannya sangat profesional, dan makanannya sangat lezat. Semua tamu kami kagum!", stars: 5 },
  { name: "Reza Firmansyah",          event: "Corporate Event – PT Maju Bersama", text: "Venue terbaik untuk MICE di Jogja. Fasilitas lengkap, suasana heritage yang unik membuat tim kami merasa istimewa. Acara gathering kami berjalan sangat lancar.", stars: 5 },
  { name: "Dewi Kartika",             event: "Birthday Celebration",              text: "Ulang tahun ke-30 saya di Candi Tirto sangat berkesan. Dekorasi cantik, makanan enak, dan spot foto yang luar biasa. Semua tamu saya puas!", stars: 5 },
  { name: "Hendra & Sari",            event: "Private Dining",                    text: "Dinner romantis terbaik yang pernah kami nikmati di Jogja. Suasana malam di candi dengan pencahayaan warm, menu premium, dan pelayanan penuh perhatian.", stars: 5 },
  { name: "Tim Marketing Tokopedia",  event: "Product Launch Event",              text: "Lokasi sangat instagramable dan memorable buat tamu undangan kami. Tim pengelola sangat kooperatif dan profesional dalam handling acara besar kami.", stars: 5 },
];

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx(i => (i + 1) % testimonials.length);

  return (
    <section style={{ background: "#1E1B18", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }} ref={ref}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            style={{ fontFamily: "'Cinzel',serif", color: "rgba(184,145,91,0.6)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 16 }}
          >Testimonial</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Cinzel',serif", color: "#F7F2EB", fontSize: "clamp(1.6rem,4vw,2.5rem)", letterSpacing: "0.08em" }}
          >Kata Mereka</motion.h2>
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg,transparent,#B8915B,transparent)", margin: "16px auto 0" }} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
          {/* Card */}
          <div style={{
            position: "relative",
            background: "rgba(26,22,18,0.85)",
            border: "1px solid rgba(184,145,91,0.2)",
            padding: "3rem",
            minHeight: 280,
          }}>
            {/* Corner accents */}
            <div style={{ position: "absolute", top: 0, right: 0, width: 40, height: 40, borderTop: "1px solid rgba(184,145,91,0.2)", borderRight: "1px solid rgba(184,145,91,0.2)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, width: 40, height: 40, borderBottom: "1px solid rgba(184,145,91,0.2)", borderLeft: "1px solid rgba(184,145,91,0.2)" }} />

            <AnimatePresence mode="wait">
              <motion.div key={idx}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                  {Array.from({ length: testimonials[idx].stars }).map((_, i) => (
                    <Star key={i} size={13} fill="#B8915B" color="#B8915B" />
                  ))}
                </div>
                {/* Quote mark */}
                <div style={{ fontFamily: "'Cormorant Garamond',serif", color: "rgba(184,145,91,0.22)", fontSize: "4rem", lineHeight: 1, marginBottom: 4 }}>"</div>
                {/* Text */}
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "#e7e5e4", fontSize: "clamp(1rem,2.5vw,1.15rem)", lineHeight: 1.8, marginBottom: 28 }}>
                  {testimonials[idx].text}
                </p>
                {/* Author */}
                <div>
                  <div style={{ fontFamily: "'Cinzel',serif", color: "#B8915B", fontSize: 13, letterSpacing: "0.1em" }}>{testimonials[idx].name}</div>
                  <div style={{ fontFamily: "'Cinzel',serif", color: "#5A534C", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 4 }}>{testimonials[idx].event}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
            <button onClick={prev} style={{ background: "transparent", border: "1px solid rgba(184,145,91,0.25)", color: "#a8a29e", cursor: "pointer", padding: 8, transition: "all 0.2s", display: "flex", alignItems: "center" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#B8915B"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,145,91,0.6)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#a8a29e"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,145,91,0.25)"; }}
            ><ChevronLeft size={16} /></button>

            {/* Dots */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} style={{
                  background: i === idx ? "#B8915B" : "rgba(90,83,76,0.5)",
                  border: "none", cursor: "pointer", borderRadius: 999,
                  width: i === idx ? 20 : 6, height: 6,
                  transition: "all 0.3s ease", padding: 0,
                }} />
              ))}
            </div>

            <button onClick={next} style={{ background: "transparent", border: "1px solid rgba(184,145,91,0.25)", color: "#a8a29e", cursor: "pointer", padding: 8, transition: "all 0.2s", display: "flex", alignItems: "center" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#B8915B"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,145,91,0.6)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#a8a29e"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,145,91,0.25)"; }}
            ><ChevronRight size={16} /></button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
