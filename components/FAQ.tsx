"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Plus } from "lucide-react";

const faqs = [
  { q: "Bagaimana cara melakukan reservasi?",             a: "Anda bisa melakukan reservasi melalui form di website ini, atau langsung menghubungi kami via WhatsApp di +62 822-6161-8110. Tim kami akan segera mengkonfirmasi ketersediaan." },
  { q: "Apakah tersedia paket pernikahan all-inclusive?", a: "Ya, kami menyediakan paket pernikahan lengkap mulai dari dekorasi candi, catering, dokumentasi, hingga wedding organizer. Hubungi kami untuk detail dan penawaran khusus." },
  { q: "Berapa kapasitas maksimal venue?",                a: "Venue kami dapat menampung hingga 200+ tamu untuk event outdoor, dan sekitar 50–100 tamu untuk setting fine dining. Kapasitas dapat disesuaikan dengan konsep acara Anda." },
  { q: "Apakah ada menu vegetarian atau bebas gluten?",   a: "Tim culinary kami dapat menyesuaikan menu untuk kebutuhan diet khusus, termasuk vegetarian, vegan, dan bebas gluten. Informasikan kebutuhan Anda saat reservasi." },
  { q: "Apakah tersedia area parkir?",                   a: "Ya, kami menyediakan area parkir yang luas untuk kendaraan roda dua dan roda empat tanpa biaya tambahan." },
  { q: "Jam berapa venue buka?",                         a: "Candi Tirto Raharjo buka Selasa sampai Minggu, pukul 10:00–22:00 WIB. Hari Senin tutup untuk perawatan." },
  { q: "Apakah tersedia live music atau entertainment?", a: "Untuk paket tertentu seperti private dining, wedding, dan corporate event, kami dapat menyediakan live acoustic, gamelan Jawa, atau entertainment lain sesuai request." },
  { q: "Bagaimana proses pemesanan untuk MICE?",         a: "Hubungi tim kami via WhatsApp untuk konsultasi. Kami akan mengirimkan proposal lengkap termasuk menu, dekorasi, fasilitas teknis, dan estimasi biaya." },
];

export default function FAQ() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section style={{ background: "#1E1B18", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }} ref={ref}>

        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            style={{ fontFamily: "'Cinzel',serif", color: "rgba(184,145,91,0.6)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 16 }}
          >FAQ</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Cinzel',serif", color: "#F7F2EB", fontSize: "clamp(1.6rem,4vw,2.5rem)", letterSpacing: "0.08em" }}
          >Pertanyaan Umum</motion.h2>
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg,transparent,#B8915B,transparent)", margin: "16px auto 0" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {faqs.map((faq, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 + i * 0.05 }}
              style={{ background: "rgba(26,22,18,0.8)", border: "1px solid rgba(184,145,91,0.18)", overflow: "hidden" }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", gap: 16 }}
              >
                <span style={{ fontFamily: "'Lato',Arial,sans-serif", color: "#e7e5e4", fontSize: 13, lineHeight: 1.5, flex: 1 }}>
                  {faq.q}
                </span>
                <div style={{ color: "#B8915B", flexShrink: 0, transform: openIdx === i ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s ease", display: "flex" }}>
                  <Plus size={15} />
                </div>
              </button>

              <motion.div
                initial={false}
                animate={{ height: openIdx === i ? "auto" : 0, opacity: openIdx === i ? 1 : 0 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ padding: "0 24px 20px" }}>
                  <div style={{ height: 1, background: "rgba(184,145,91,0.15)", marginBottom: 16 }} />
                  <p style={{ fontFamily: "'Lato',Arial,sans-serif", color: "#78716c", fontSize: 13, lineHeight: 1.8 }}>{faq.a}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
