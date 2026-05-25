"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MessageCircle, AlertCircle } from "lucide-react";

const WA_NUMBER = "6282261618110";

interface FormData {
  nama: string; whatsapp: string; tanggal: string;
  jam: string; jumlah: string; acara: string; catatan: string;
}

const acaraOptions = ["Dining","Wedding Inquiry","Corporate Event","Birthday","Private Gathering","Romantic Dinner","MICE / Seminar"];
const jamOptions   = ["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"];

const labelStyle: React.CSSProperties = { fontFamily: "'Cinzel',serif", color: "#78716c", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: 6 };
const inputStyle: React.CSSProperties = { background: "rgba(247,242,235,0.06)", border: "1px solid rgba(184,145,91,0.3)", color: "#F7F2EB", borderRadius: 8, padding: "12px 14px", width: "100%", fontFamily: "'Lato',Arial,sans-serif", fontSize: 14, outline: "none", transition: "border-color 0.3s, background 0.3s", appearance: "none" as const };
const errStyle: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4, color: "#f87171", fontSize: 10, marginTop: 4 };

export default function Reservation() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [form, setForm] = useState<FormData>({ nama:"", whatsapp:"", tanggal:"", jam:"", jumlah:"", acara:"", catatan:"" });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const set = (k: keyof FormData, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.nama.trim())     e.nama     = "Nama wajib diisi";
    if (!form.whatsapp.trim()) e.whatsapp = "Nomor WhatsApp wajib diisi";
    if (!form.tanggal)         e.tanggal  = "Tanggal wajib dipilih";
    if (!form.jam)             e.jam      = "Jam wajib dipilih";
    if (!form.jumlah.trim())   e.jumlah   = "Jumlah orang wajib diisi";
    if (!form.acara)           e.acara    = "Jenis acara wajib dipilih";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const msg = `Halo Candi Tirto Raharjo,\n\nSaya ingin melakukan reservasi.\n\nNama: ${form.nama}\nNomor WhatsApp: ${form.whatsapp}\nTanggal: ${form.tanggal}\nJam: ${form.jam} WIB\nJumlah Orang: ${form.jumlah}\nJenis Acara: ${form.acara}\nCatatan Tambahan: ${form.catatan || "-"}\n\nMohon informasi lebih lanjut.\nTerima kasih.`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const focusInput = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "#B8915B";
    e.currentTarget.style.background  = "rgba(247,242,235,0.09)";
  };
  const blurInput = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(184,145,91,0.3)";
    e.currentTarget.style.background  = "rgba(247,242,235,0.06)";
  };

  return (
    <section id="reservation" style={{ background: "#0d0b09", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }} ref={ref}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            style={{ fontFamily: "'Cinzel',serif", color: "rgba(184,145,91,0.6)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 16 }}
          >Reservasi</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Cinzel',serif", color: "#F7F2EB", fontSize: "clamp(1.6rem,4vw,2.5rem)", letterSpacing: "0.08em" }}
          >Rencanakan Kunjungan Anda</motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
            style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "#78716c", fontSize: "1rem", marginTop: 12 }}
          >Isi formulir di bawah dan kami akan segera menghubungi Anda via WhatsApp.</motion.p>
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg,transparent,#B8915B,transparent)", margin: "16px auto 0" }} />
        </div>

        {/* Form card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
          style={{ background: "rgba(26,22,18,0.95)", border: "1px solid rgba(184,145,91,0.22)", borderRadius: 12, padding: "2.5rem" }}
        >
          {/* Grid 2-col */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>

            {/* Nama */}
            <div>
              <label style={labelStyle}>Nama Lengkap *</label>
              <input type="text" style={inputStyle} placeholder="Nama Anda" value={form.nama}
                onChange={e => set("nama", e.target.value)} onFocus={focusInput} onBlur={blurInput} />
              {errors.nama && <div style={errStyle}><AlertCircle size={10} />{errors.nama}</div>}
            </div>

            {/* WA */}
            <div>
              <label style={labelStyle}>Nomor WhatsApp *</label>
              <input type="tel" style={inputStyle} placeholder="08xx-xxxx-xxxx" value={form.whatsapp}
                onChange={e => set("whatsapp", e.target.value)} onFocus={focusInput} onBlur={blurInput} />
              {errors.whatsapp && <div style={errStyle}><AlertCircle size={10} />{errors.whatsapp}</div>}
            </div>

            {/* Tanggal */}
            <div>
              <label style={labelStyle}>Tanggal Reservasi *</label>
              <input type="date" style={{ ...inputStyle, colorScheme: "dark" }} value={form.tanggal}
                min={new Date().toISOString().split("T")[0]}
                onChange={e => set("tanggal", e.target.value)} onFocus={focusInput} onBlur={blurInput} />
              {errors.tanggal && <div style={errStyle}><AlertCircle size={10} />{errors.tanggal}</div>}
            </div>

            {/* Jam */}
            <div>
              <label style={labelStyle}>Jam Reservasi *</label>
              <select style={{ ...inputStyle, cursor: "pointer" }} value={form.jam}
                onChange={e => set("jam", e.target.value)} onFocus={focusInput} onBlur={blurInput}>
                <option value="">Pilih Jam</option>
                {jamOptions.map(j => <option key={j} value={j} style={{ background: "#1E1B18" }}>{j} WIB</option>)}
              </select>
              {errors.jam && <div style={errStyle}><AlertCircle size={10} />{errors.jam}</div>}
            </div>

            {/* Jumlah */}
            <div>
              <label style={labelStyle}>Jumlah Orang *</label>
              <input type="number" style={inputStyle} placeholder="Contoh: 4" min="1" value={form.jumlah}
                onChange={e => set("jumlah", e.target.value)} onFocus={focusInput} onBlur={blurInput} />
              {errors.jumlah && <div style={errStyle}><AlertCircle size={10} />{errors.jumlah}</div>}
            </div>

            {/* Acara */}
            <div>
              <label style={labelStyle}>Jenis Acara *</label>
              <select style={{ ...inputStyle, cursor: "pointer" }} value={form.acara}
                onChange={e => set("acara", e.target.value)} onFocus={focusInput} onBlur={blurInput}>
                <option value="">Pilih Jenis Acara</option>
                {acaraOptions.map(a => <option key={a} value={a} style={{ background: "#1E1B18" }}>{a}</option>)}
              </select>
              {errors.acara && <div style={errStyle}><AlertCircle size={10} />{errors.acara}</div>}
            </div>
          </div>

          {/* Catatan – full width */}
          <div style={{ marginTop: "1.25rem" }}>
            <label style={labelStyle}>Catatan Tambahan</label>
            <textarea style={{ ...inputStyle, resize: "none" }} rows={4}
              placeholder="Permintaan khusus, alergi makanan, detail acara, dll."
              value={form.catatan} onChange={e => set("catatan", e.target.value)}
              onFocus={focusInput} onBlur={blurInput}
            />
          </div>

          {/* Submit */}
          <button onClick={handleSubmit}
            style={{ marginTop: "2rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 0", background: "#92400e", border: "none", color: "#fef3c7", cursor: "pointer", borderRadius: 8, fontFamily: "'Cinzel',serif", fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", transition: "background 0.3s, box-shadow 0.3s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#b45309"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(184,145,91,0.3)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#92400e"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
          >
            <MessageCircle size={16} />
            RESERVASI VIA WHATSAPP
          </button>

          <p style={{ textAlign: "center", color: "#5A534C", fontSize: 10, marginTop: 16, letterSpacing: "0.1em" }}>
            Data Anda akan dikirim langsung ke tim Candi Tirto Raharjo via WhatsApp
          </p>
        </motion.div>

        {/* Direct WA link */}
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
          style={{ textAlign: "center", color: "#5A534C", fontSize: 11, marginTop: 20 }}
        >
          Atau hubungi langsung:{" "}
          <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
            style={{ color: "#B8915B", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#D4A96A"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "#B8915B"}
          >+62 822-6161-8110</a>
        </motion.p>
      </div>

      {/* Mobile: stack form to 1 col */}
      <style>{`
        @media (max-width: 600px) {
          #reservation > div > div:last-child > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
