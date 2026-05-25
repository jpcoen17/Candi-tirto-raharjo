"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Beranda",  href: "hero" },
  { label: "Tentang",  href: "about" },
  { label: "Venue",    href: "venue" },
  { label: "Menu",     href: "menu" },
  { label: "Paket",    href: "packages" },
  { label: "Galeri",   href: "gallery" },
  { label: "Reservasi",href: "reservation" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? "rgba(15,13,11,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(184,145,91,0.15)" : "none",
          transition: "background 0.4s ease, border 0.4s ease",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", height: scrolled ? 64 : 72, display: "flex", alignItems: "center", justifyContent: "space-between", transition: "height 0.4s ease" }}>

          {/* Logo */}
          <button onClick={() => go("hero")} style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer" }}>
            <img src="/assets/logo.png" alt="Logo" style={{ width: 40, height: 40, objectFit: "contain" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span className="font-display" style={{ color: "#B8915B", fontSize: 11, letterSpacing: "0.18em" }}>CANDI TIRTO</span>
              <span className="font-display" style={{ color: "#5A534C", fontSize: 9, letterSpacing: "0.22em" }}>RAHARJO</span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 28 }} className="hidden md:flex">
            {links.map((l) => (
              <button key={l.href} onClick={() => go(l.href)}
                className="nav-link"
                style={{ background: "none", border: "none", cursor: "pointer", color: "#d6d3d1", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "#B8915B"}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "#d6d3d1"}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button onClick={() => go("reservation")}
            className="hidden md:flex"
            style={{ border: "1px solid rgba(184,145,91,0.5)", color: "#B8915B", background: "transparent", cursor: "pointer", padding: "8px 20px", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", transition: "background 0.3s" }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "rgba(184,145,91,0.15)"}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "transparent"}
          >
            RESERVASI
          </button>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", color: "#d6d3d1", padding: 8 }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 40, background: "rgba(15,13,11,0.97)", borderBottom: "1px solid rgba(184,145,91,0.15)", padding: "1.5rem", backdropFilter: "blur(10px)" }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {links.map((l) => (
                <button key={l.href} onClick={() => go(l.href)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#d6d3d1", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", textAlign: "left", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "#B8915B"}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "#d6d3d1"}
                >
                  {l.label}
                </button>
              ))}
              <button onClick={() => go("reservation")}
                style={{ background: "#92400e", color: "#fef3c7", border: "none", cursor: "pointer", padding: "12px 0", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 8 }}
              >
                RESERVASI SEKARANG
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
