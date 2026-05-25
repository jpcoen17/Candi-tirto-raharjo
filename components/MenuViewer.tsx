"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export default function MenuViewer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [pages, setPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<"left" | "right">("right");
  const loadedRef = useRef(false);

  const loadPDF = useCallback(async () => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    setLoading(true);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";
      const pdf = await pdfjsLib.getDocument("/assets/menu.pdf").promise;
      const pageImages: string[] = [];
      for (let i = 1; i <= Math.min(pdf.numPages, 30); i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.6 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport }).promise;
        pageImages.push(canvas.toDataURL("image/jpeg", 0.85));
      }
      setPages(pageImages);
    } catch (e) {
      console.error("PDF load error", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (inView) loadPDF();
  }, [inView, loadPDF]);

  const goTo = useCallback(
    (dir: "prev" | "next") => {
      if (isFlipping) return;
      const next = dir === "next" ? currentPage + 1 : currentPage - 1;
      if (next < 0 || next >= pages.length) return;
      setFlipDir(dir === "next" ? "right" : "left");
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(next);
        setIsFlipping(false);
      }, 320);
    },
    [isFlipping, currentPage, pages.length]
  );

  useEffect(() => {
    if (!fullscreen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo("next");
      if (e.key === "ArrowLeft") goTo("prev");
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [fullscreen, goTo]);

  return (
    <section id="menu" className="section-padding" style={{ background: "#1E1B18" }}>
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="font-display text-amber-500/60 uppercase mb-4"
            style={{ fontSize: "10px", letterSpacing: "0.4em" }}
          >
            Culinary Experience
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-stone-100"
            style={{ fontSize: "clamp(1.6rem,4vw,2.5rem)", letterSpacing: "0.08em" }}
          >
            Menu Kami
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="font-serif italic text-stone-400 mt-3"
            style={{ fontSize: "1rem" }}
          >
            Jelajahi pilihan kuliner yang dikurasi dengan penuh perhatian.
          </motion.p>
          <div className="gold-divider mt-4" />
        </div>

        {/* Book viewer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="border border-amber-900/20"
          style={{ background: "rgba(20,18,15,0.9)" }}
        >
          {/* Toolbar */}
          <div
            className="flex items-center justify-between px-5 py-3.5 border-b border-amber-900/15"
          >
            <span
              className="font-display text-amber-500/50 uppercase"
              style={{ fontSize: "9px", letterSpacing: "0.3em" }}
            >
              Menu Buku
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.1).toFixed(1)))}
                className="text-stone-500 hover:text-amber-400 transition-colors p-1"
                title="Perkecil"
              >
                <ZoomOut size={13} />
              </button>
              <span className="text-stone-500 w-8 text-center" style={{ fontSize: "10px" }}>
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(1.8, +(z + 0.1).toFixed(1)))}
                className="text-stone-500 hover:text-amber-400 transition-colors p-1"
                title="Perbesar"
              >
                <ZoomIn size={13} />
              </button>
              <div className="w-px h-4 bg-amber-900/30" />
              <button
                onClick={() => setFullscreen(true)}
                className="text-stone-500 hover:text-amber-400 transition-colors p-1"
                title="Fullscreen"
              >
                <Maximize2 size={13} />
              </button>
            </div>
          </div>

          {/* Page area */}
          <div
            className="flex items-center justify-center"
            style={{ padding: "2rem 1rem", minHeight: "480px" }}
          >
            {loading && (
              <div className="flex flex-col items-center gap-4">
                <div
                  className="rounded-full border-2 animate-spin"
                  style={{
                    width: 32,
                    height: 32,
                    borderColor: "rgba(184,145,91,0.2)",
                    borderTopColor: "#B8915B",
                  }}
                />
                <p
                  className="font-display text-stone-500 uppercase"
                  style={{ fontSize: "10px", letterSpacing: "0.3em" }}
                >
                  Memuat Menu...
                </p>
              </div>
            )}

            {!loading && pages.length > 0 && (
              <div style={{ transform: `scale(${zoom})`, transition: "transform 0.3s ease" }}>
                <motion.div
                  key={currentPage}
                  initial={{
                    rotateY: flipDir === "right" ? -12 : 12,
                    opacity: 0.7,
                    x: flipDir === "right" ? -16 : 16,
                  }}
                  animate={{ rotateY: 0, opacity: 1, x: 0 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  style={{
                    transformStyle: "preserve-3d",
                    boxShadow: "0 24px 80px rgba(0,0,0,0.7), inset -6px 0 16px rgba(0,0,0,0.18)",
                    display: "inline-block",
                    position: "relative",
                  }}
                >
                  <img
                    src={pages[currentPage]}
                    alt={`Menu halaman ${currentPage + 1}`}
                    style={{
                      display: "block",
                      maxHeight: "520px",
                      width: "auto",
                    }}
                  />
                  {/* Page edge shadow */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bottom: 0,
                      width: "12px",
                      background: "linear-gradient(to right, transparent, rgba(0,0,0,0.22))",
                      pointerEvents: "none",
                    }}
                  />
                </motion.div>
              </div>
            )}

            {!loading && pages.length === 0 && (
              <div className="text-center">
                <p className="text-stone-500" style={{ fontSize: "13px" }}>
                  Menu akan dimuat otomatis saat halaman ini terlihat.
                </p>
              </div>
            )}
          </div>

          {/* Navigation bar */}
          <div
            className="flex items-center justify-between px-5 py-4 border-t border-amber-900/15"
          >
            <button
              onClick={() => goTo("prev")}
              disabled={currentPage === 0 || isFlipping || pages.length === 0}
              className="flex items-center gap-1.5 text-stone-400 hover:text-amber-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ fontSize: "11px", letterSpacing: "0.1em" }}
            >
              <ChevronLeft size={14} /> Sebelumnya
            </button>

            <div className="text-center">
              <div className="text-stone-500" style={{ fontSize: "10px" }}>
                {pages.length > 0 ? `${currentPage + 1} / ${pages.length}` : "—"}
              </div>
              {pages.length > 0 && (
                <div
                  className="text-amber-700/40 mt-0.5"
                  style={{ fontSize: "9px", letterSpacing: "0.2em" }}
                >
                  GESER ATAU KLIK NAVIGASI
                </div>
              )}
            </div>

            <button
              onClick={() => goTo("next")}
              disabled={currentPage >= pages.length - 1 || isFlipping || pages.length === 0}
              className="flex items-center gap-1.5 text-stone-400 hover:text-amber-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ fontSize: "11px", letterSpacing: "0.1em" }}
            >
              Berikutnya <ChevronRight size={14} />
            </button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-stone-600 mt-4 uppercase"
          style={{ fontSize: "10px", letterSpacing: "0.2em" }}
        >
          Klik ikon fullscreen untuk pengalaman membaca terbaik
        </motion.p>
      </div>

      {/* ===== FULLSCREEN MODAL ===== */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: "rgba(10,8,7,0.99)" }}
        >
          {/* Modal toolbar */}
          <div
            className="flex items-center justify-between px-6 py-4 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(184,145,91,0.15)" }}
          >
            <span
              className="font-display text-amber-400"
              style={{ fontSize: "11px", letterSpacing: "0.22em" }}
            >
              MENU CANDI TIRTO RAHARJO
            </span>
            <div className="flex items-center gap-5">
              <button
                onClick={() => setZoom((z) => Math.max(0.4, +(z - 0.15).toFixed(2)))}
                className="text-stone-400 hover:text-amber-400 transition-colors"
              >
                <ZoomOut size={16} />
              </button>
              <span className="text-stone-500" style={{ fontSize: "11px" }}>
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.15).toFixed(2)))}
                className="text-stone-400 hover:text-amber-400 transition-colors"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={() => setFullscreen(false)}
                className="text-stone-400 hover:text-amber-400 transition-colors ml-2"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Modal page */}
          <div className="flex-1 flex items-center justify-center overflow-hidden px-4 py-4">
            {pages.length > 0 && (
              <motion.div
                key={`fs-${currentPage}`}
                initial={{ opacity: 0.7, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.28 }}
                style={{ transform: `scale(${zoom})` }}
              >
                <img
                  src={pages[currentPage]}
                  alt={`Menu ${currentPage + 1}`}
                  style={{
                    display: "block",
                    maxHeight: "75vh",
                    width: "auto",
                    boxShadow: "0 20px 80px rgba(0,0,0,0.85)",
                  }}
                />
              </motion.div>
            )}
          </div>

          {/* Modal controls */}
          <div
            className="flex items-center justify-center gap-8 px-6 py-4 flex-shrink-0"
            style={{ borderTop: "1px solid rgba(184,145,91,0.12)" }}
          >
            <button
              onClick={() => goTo("prev")}
              disabled={currentPage === 0}
              className="flex items-center gap-2 px-6 py-2 border border-amber-900/30 text-stone-400 hover:text-amber-400 hover:border-amber-700/50 transition-all disabled:opacity-30"
              style={{ fontSize: "11px", letterSpacing: "0.12em" }}
            >
              <ChevronLeft size={13} /> Sebelumnya
            </button>
            <span className="text-stone-500" style={{ fontSize: "12px" }}>
              {currentPage + 1} / {pages.length}
            </span>
            <button
              onClick={() => goTo("next")}
              disabled={currentPage >= pages.length - 1}
              className="flex items-center gap-2 px-6 py-2 border border-amber-900/30 text-stone-400 hover:text-amber-400 hover:border-amber-700/50 transition-all disabled:opacity-30"
              style={{ fontSize: "11px", letterSpacing: "0.12em" }}
            >
              Berikutnya <ChevronRight size={13} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
