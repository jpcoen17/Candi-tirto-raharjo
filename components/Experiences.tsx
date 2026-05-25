"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Utensils, Heart, Users, Briefcase, Leaf } from "lucide-react";

const experiences = [
  { icon: Utensils, title: "Temple Dining",      desc: "Menikmati hidangan premium di tengah keagungan arsitektur candi. Suasana malam hangat penuh nuansa budaya.", tag: "Dining" },
  { icon: Heart,    title: "Wedding Ceremony",   desc: "Pernikahan sakral berlatar candi yang megah. Momen tak terlupakan dalam nuansa heritage autentik.", tag: "Wedding" },
  { icon: Users,    title: "Private Gathering",  desc: "Pertemuan eksklusif di lingkungan candi yang tenang. Ideal untuk keluarga atau komunitas.", tag: "Private" },
  { icon: Briefcase,title: "Corporate Event",    desc: "Venue MICE premium dengan fasilitas lengkap. Kesan profesional dibalut nuansa heritage Jawa.", tag: "MICE" },
  { icon: Leaf,     title: "Sanctuary Escape",   desc: "Melarikan diri dari rutinitas. Kolam, taman, dan ketenangan alam yang menyegarkan jiwa.", tag: "Retreat" },
];

export default function Experiences() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="experiences" style={{ background: "#0d0b09", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }} ref={ref}>

        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            style={{ fontFamily: "'Cinzel',serif", color: "rgba(184,145,91,0.6)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 16 }}
          >
            Signature Experience
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Cinzel',serif", color: "#F7F2EB", fontSize: "clamp(1.6rem,4vw,2.5rem)", letterSpacing: "0.08em" }}
          >
            Setiap Momen, Penuh Makna
          </motion.h2>
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg,transparent,#B8915B,transparent)", margin: "16px auto 0" }} />
        </div>

        {/* 5-column grid, wraps on small screens */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
          {experiences.map((exp, i) => {
            const Icon = exp.icon;
            return (
              <motion.div key={exp.title}
                initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.09 }}
                style={{
                  background: "rgba(30,27,24,0.8)",
                  border: "1px solid rgba(184,145,91,0.18)",
                  padding: "1.5rem",
                  display: "flex", flexDirection: "column",
                  transition: "transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
                  cursor: "default",
                }}
                whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(184,145,91,0.13)" }}
              >
                <div style={{ fontFamily: "'Cinzel',serif", color: "rgba(184,145,91,0.5)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>
                  {exp.tag}
                </div>
                <div style={{ color: "rgba(184,145,91,0.55)", marginBottom: 16 }}>
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontFamily: "'Cinzel',serif", color: "#F7F2EB", fontSize: 13, letterSpacing: "0.1em", marginBottom: 12 }}>
                  {exp.title}
                </h3>
                <p style={{ fontFamily: "'Lato',Arial,sans-serif", color: "#a8a29e", fontSize: 12, lineHeight: 1.7 }}>
                  {exp.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
