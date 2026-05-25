"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const stats = [
  { num: "#1",   label: "MICE Venue\ndi Jogja" },
  { num: "20K+", label: "Pengikut\nInstagram" },
  { num: "∞",    label: "Kenangan\nTak Terlupakan" },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" style={{ background: "#1E1B18", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }} ref={ref}>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>

          {/* Left – Logo box */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div style={{ position: "relative", width: "100%", maxWidth: 380 }}>
              {/* Box */}
              <div style={{ aspectRatio: "1/1", background: "rgba(184,145,91,0.04)", border: "1px solid rgba(184,145,91,0.18)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                {/* Corner accents */}
                {[
                  { top: 0, left: 0, right: "auto", bottom: "auto", transform: "none" },
                  { top: 0, left: "auto", right: 0, bottom: "auto", transform: "rotate(90deg)" },
                  { top: "auto", left: "auto", right: 0, bottom: 0, transform: "rotate(180deg)" },
                  { top: "auto", left: 0, right: "auto", bottom: 0, transform: "rotate(-90deg)" },
                ].map((c, i) => (
                  <div key={i} style={{ position: "absolute", top: c.top, left: c.left, right: c.right, bottom: c.bottom, width: 24, height: 24, borderTop: "1px solid rgba(184,145,91,0.6)", borderLeft: "1px solid rgba(184,145,91,0.6)", transform: c.transform }} />
                ))}
                <img src="/assets/logo.png" alt="Candi Tirto Raharjo" style={{ width: 180, height: 180, objectFit: "contain" }} />
              </div>

              {/* Floating badge */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.4 }}
                style={{ position: "absolute", bottom: -20, right: -20, background: "rgba(20,18,14,0.97)", border: "1px solid rgba(184,145,91,0.28)", padding: "16px 20px" }}
              >
                <div style={{ fontFamily: "'Cinzel',serif", color: "#B8915B", fontSize: "1.8rem" }}>20K+</div>
                <div style={{ fontFamily: "'Cinzel',serif", color: "#5A534C", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 4 }}>Pengikut Instagram</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right – Copy */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.15 }}>
            <p style={{ fontFamily: "'Cinzel',serif", color: "rgba(184,145,91,0.6)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 16 }}>Tentang Kami</p>
            <h2 style={{ fontFamily: "'Cinzel',serif", color: "#F7F2EB", fontSize: "clamp(1.6rem,4vw,2.4rem)", letterSpacing: "0.06em", lineHeight: 1.25, marginBottom: 20 }}>
              Warisan Budaya,{" "}
              <span className="shimmer-text">Perayaan Modern</span>
            </h2>
            <div style={{ width: 60, height: 1, background: "linear-gradient(90deg,transparent,#B8915B,transparent)", marginBottom: 24 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "rgba(247,242,235,0.7)", lineHeight: 1.85, fontSize: "1.05rem" }}>
                Candi Tirto Raharjo adalah perpaduan unik antara keagungan arsitektur candi Jawa dengan keramahan hospitality modern. Terletak di Bangunjiwo, Bantul, kami menghadirkan pengalaman yang melampaui sekadar makan atau perayaan biasa.
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "rgba(247,242,235,0.7)", lineHeight: 1.85, fontSize: "1.05rem" }}>
                Setiap sudut menceritakan kisah — tentang budaya, tentang alam, tentang keindahan yang abadi. Jadikan momen Anda bermakna di venue heritage #1 di Jogja.
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 32 }}>
              {stats.map(s => (
                <div key={s.num} style={{ textAlign: "center", padding: 16, border: "1px solid rgba(184,145,91,0.2)", background: "rgba(26,22,18,0.7)" }}>
                  <div style={{ fontFamily: "'Cinzel',serif", color: "#B8915B", fontSize: "1.4rem" }}>{s.num}</div>
                  <div style={{ fontFamily: "'Cinzel',serif", color: "#5A534C", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4, lineHeight: 1.5, whiteSpace: "pre-line" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile: stack */}
      <style>{`
        @media (max-width: 768px) {
          #about > div > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
