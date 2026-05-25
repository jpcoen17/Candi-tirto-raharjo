"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";

// Semua halaman menu sudah dikonversi ke JPG — tidak perlu load PDF
const TOTAL_PAGES = 16;
const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return `/assets/menu-pages/page-${n}.jpg`;
});

export default function MenuViewer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [flipping, setFlipping] = useState(false);
  const [dir, setDir] = useState<"left" | "right">("right");

  const goTo = useCallback((direction: "prev" | "next") => {
    if (flipping) return;
    const next = direction === "next" ? current + 1 : current - 1;
    if (next < 0 || next >= TOTAL_PAGES) return;
    setDir(direction === "next" ? "right" : "left");
    setFlipping(true);
    setTimeout(() => {
      setCurrent(next);
      setFlipping(false);
    }, 280);
  }, [flipping, current]);

  // Preload adjacent pages
  const preloadSrcs = [pages[current - 1], pages[current + 1]].filter(Boolean);

  return (
    <section id="menu" style={{ background: "#1E1B18", padding: "6rem 1.5rem" }}>
      {/* Preload adjacent images silently */}
      {preloadSrcs.map(src => (
        <link key={src} rel="preload" as="image" href={src} />
      ))}

      <div style={{ maxWidth: 860, margin: "0 auto" }} ref={ref}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            style={{ fontFamily: "'Cinzel',serif", color: "rgba(184,145,91,0.6)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 16 }}
          >Culinary Experience</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Cinzel',serif", color: "#F7F2EB", fontSize: "clamp(1.6rem,4vw,2.5rem)", letterSpacing: "0.08em" }}
          >Menu Kami</motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
            style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "#78716c", fontSize: "1rem", marginTop: 12 }}
          >Jelajahi pilihan kuliner yang dikurasi dengan penuh perhatian.</motion.p>
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg,transparent,#B8915B,transparent)", margin: "16px auto 0" }} />
        </div>

        {/* Book viewer */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
          style={{ background: "rgba(20,18,15,0.95)", border: "1px solid rgba(184,145,91,0.2)" }}
        >
          {/* Toolbar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: "1px solid rgba(184,145,91,0.12)" }}>
            <span style={{ fontFamily: "'Cinzel',serif", color: "rgba(184,145,91,0.5)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Menu Buku
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={() => setZoom(z => Math.max(0.6, +(z - 0.15).toFixed(2)))}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#78716c", display: "flex", transition: "color 0.2s", padding: 4 }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "#B8915B"}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "#78716c"}
              ><ZoomOut size={13} /></button>
              <span style={{ fontFamily: "'Cinzel',serif", color: "#5A534C", fontSize: 10, minWidth: 32, textAlign: "center" }}>{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(z => Math.min(2, +(z + 0.15).toFixed(2)))}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#78716c", display: "flex", transition: "color 0.2s", padding: 4 }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "#B8915B"}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "#78716c"}
              ><ZoomIn size={13} /></button>
              <div style={{ width: 1, height: 16, background: "rgba(184,145,91,0.2)" }} />
              <button onClick={() => { setFullscreen(true); setZoom(1); }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#78716c", display: "flex", transition: "color 0.2s", padding: 4 }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "#B8915B"}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "#78716c"}
              ><Maximize2 size={13} /></button>
            </div>
          </div>

          {/* Page display */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", minHeight: 480, overflow: "hidden" }}>
            <div style={{ transform: `scale(${zoom})`, transition: "transform 0.3s ease" }}>
              <AnimatePresence mode="wait">
                <motion.div key={current}
                  initial={{ opacity: 0.6, x: dir === "right" ? 30 : -30, rotateY: dir === "right" ? -8 : 8 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  style={{
                    display: "inline-block",
                    boxShadow: "0 24px 80px rgba(0,0,0,0.7), -4px 0 20px rgba(0,0,0,0.3)",
                    position: "relative",
                  }}
                >
                  <img
                    src={pages[current]}
                    alt={`Menu halaman ${current + 1}`}
                    style={{ display: "block", maxHeight: 520, width: "auto", maxWidth: "100%" }}
                    loading="eager"
                  />
                  {/* Page edge shadow */}
                  <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 12, background: "linear-gradient(to right, transparent, rgba(0,0,0,0.25))", pointerEvents: "none" }} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Nav bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderTop: "1px solid rgba(184,145,91,0.12)" }}>
            <button onClick={() => goTo("prev")} disabled={current === 0 || flipping}
              style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: current === 0 ? "not-allowed" : "pointer", color: current === 0 ? "#3a3733" : "#78716c", fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: "0.1em", transition: "color 0.2s", padding: "6px 0" }}
              onMouseEnter={e => { if (current > 0) (e.currentTarget as HTMLButtonElement).style.color = "#B8915B"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = current === 0 ? "#3a3733" : "#78716c"; }}
            ><ChevronLeft size={14} /> Sebelumnya</button>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Cinzel',serif", color: "#5A534C", fontSize: 10 }}>{current + 1} / {TOTAL_PAGES}</div>
              <div style={{ fontFamily: "'Cinzel',serif", color: "rgba(184,145,91,0.35)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 3 }}>
                KLIK NAVIGASI ATAU TEKAN ← →
              </div>
            </div>

            <button onClick={() => goTo("next")} disabled={current >= TOTAL_PAGES - 1 || flipping}
              style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: current >= TOTAL_PAGES - 1 ? "not-allowed" : "pointer", color: current >= TOTAL_PAGES - 1 ? "#3a3733" : "#78716c", fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: "0.1em", transition: "color 0.2s", padding: "6px 0" }}
              onMouseEnter={e => { if (current < TOTAL_PAGES - 1) (e.currentTarget as HTMLButtonElement).style.color = "#B8915B"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = current >= TOTAL_PAGES - 1 ? "#3a3733" : "#78716c"; }}
            >Berikutnya <ChevronRight size={14} /></button>
          </div>
        </motion.div>

        {/* Thumbnail strip */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
          style={{ display: "flex", gap: 6, marginTop: 12, overflowX: "auto", paddingBottom: 4 }}
        >
          {pages.map((src, i) => (
            <button key={i} onClick={() => { setDir(i > current ? "right" : "left"); setCurrent(i); }}
              style={{
                flexShrink: 0, width: 48, height: 64, padding: 0, border: i === current ? "2px solid #B8915B" : "2px solid transparent",
                cursor: "pointer", background: "none", borderRadius: 2, overflow: "hidden",
                opacity: i === current ? 1 : 0.5, transition: "opacity 0.2s, border-color 0.2s",
              }}
            >
              <img src={src} alt={`Hal ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
            </button>
          ))}
        </motion.div>

        <p style={{ textAlign: "center", color: "#44403c", fontSize: 10, fontFamily: "'Cinzel',serif", letterSpacing: "0.2em", marginTop: 12, textTransform: "uppercase" }}>
          Klik fullscreen untuk pengalaman membaca terbaik
        </p>
      </div>

      {/* ===== FULLSCREEN MODAL ===== */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(10,8,7,0.99)", display: "flex", flexDirection: "column" }}
          >
            {/* Modal toolbar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", borderBottom: "1px solid rgba(184,145,91,0.15)", flexShrink: 0 }}>
              <span style={{ fontFamily: "'Cinzel',serif", color: "#B8915B", fontSize: 11, letterSpacing: "0.22em" }}>
                MENU CANDI TIRTO RAHARJO
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <button onClick={() => setZoom(z => Math.max(0.4, +(z - 0.15).toFixed(2)))}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#78716c", display: "flex" }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "#B8915B"}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "#78716c"}
                ><ZoomOut size={16} /></button>
                <span style={{ fontFamily: "'Cinzel',serif", color: "#5A534C", fontSize: 11 }}>{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom(z => Math.min(2.5, +(z + 0.15).toFixed(2)))}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#78716c", display: "flex" }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "#B8915B"}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "#78716c"}
                ><ZoomIn size={16} /></button>
                <button onClick={() => setFullscreen(false)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#78716c", display: "flex", marginLeft: 8 }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "#B8915B"}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "#78716c"}
                ><X size={18} /></button>
              </div>
            </div>

            {/* Modal image */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "1rem" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={`fs-${current}`}
                  src={pages[current]}
                  alt={`Menu ${current + 1}`}
                  initial={{ opacity: 0.6, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ maxHeight: "78vh", width: "auto", objectFit: "contain", display: "block", transform: `scale(${zoom})`, boxShadow: "0 20px 80px rgba(0,0,0,0.85)", transition: "transform 0.3s ease" }}
                />
              </AnimatePresence>
            </div>

            {/* Modal controls */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, padding: "14px 24px", borderTop: "1px solid rgba(184,145,91,0.12)", flexShrink: 0 }}>
              <button onClick={() => goTo("prev")} disabled={current === 0}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 24px", border: "1px solid rgba(184,145,91,0.25)", background: "transparent", color: current === 0 ? "#3a3733" : "#78716c", cursor: current === 0 ? "not-allowed" : "pointer", fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: "0.1em", transition: "all 0.2s" }}
                onMouseEnter={e => { if (current > 0) { (e.currentTarget as HTMLButtonElement).style.color = "#B8915B"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,145,91,0.6)"; }}}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = current === 0 ? "#3a3733" : "#78716c"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,145,91,0.25)"; }}
              ><ChevronLeft size={13} /> Sebelumnya</button>

              <span style={{ fontFamily: "'Cinzel',serif", color: "#5A534C", fontSize: 12 }}>{current + 1} / {TOTAL_PAGES}</span>

              <button onClick={() => goTo("next")} disabled={current >= TOTAL_PAGES - 1}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 24px", border: "1px solid rgba(184,145,91,0.25)", background: "transparent", color: current >= TOTAL_PAGES - 1 ? "#3a3733" : "#78716c", cursor: current >= TOTAL_PAGES - 1 ? "not-allowed" : "pointer", fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: "0.1em", transition: "all 0.2s" }}
                onMouseEnter={e => { if (current < TOTAL_PAGES - 1) { (e.currentTarget as HTMLButtonElement).style.color = "#B8915B"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,145,91,0.6)"; }}}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = current >= TOTAL_PAGES - 1 ? "#3a3733" : "#78716c"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,145,91,0.25)"; }}
              >Berikutnya <ChevronRight size={13} /></button>
            </div>

            {/* Thumbnail strip in modal */}
            <div style={{ display: "flex", gap: 5, padding: "8px 16px 14px", overflowX: "auto", justifyContent: "center", flexShrink: 0 }}>
              {pages.map((src, i) => (
                <button key={i} onClick={() => { setDir(i > current ? "right" : "left"); setCurrent(i); }}
                  style={{ flexShrink: 0, width: 36, height: 48, padding: 0, border: i === current ? "2px solid #B8915B" : "2px solid rgba(184,145,91,0.15)", cursor: "pointer", background: "none", borderRadius: 2, overflow: "hidden", opacity: i === current ? 1 : 0.45, transition: "opacity 0.2s, border-color 0.2s" }}
                >
                  <img src={src} alt={`Hal ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
