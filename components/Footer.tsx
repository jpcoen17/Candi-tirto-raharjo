"use client";

const WA_NUMBER = "6282261618110";
const quickLinks = [
  { label: "Beranda",   id: "hero" }, { label: "Tentang",   id: "about" },
  { label: "Venue",     id: "venue" }, { label: "Menu",      id: "menu" },
  { label: "Paket",     id: "packages" }, { label: "Galeri", id: "gallery" },
  { label: "Reservasi", id: "reservation" }, { label: "Lokasi", id: "location" },
];

export default function Footer() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{ background: "rgba(10,8,7,1)", borderTop: "1px solid rgba(184,145,91,0.15)" }}>

      {/* CTA strip */}
      <div style={{ background: "rgba(184,145,91,0.05)", borderBottom: "1px solid rgba(184,145,91,0.1)", padding: "2.5rem 1.5rem", textAlign: "center" }}>
        <h3 style={{ fontFamily: "'Cinzel',serif", color: "#F7F2EB", fontSize: "clamp(1.2rem,3vw,1.7rem)", letterSpacing: "0.1em", marginBottom: 20 }}>
          Siap Merencanakan Momen Anda?
        </h3>
        <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo Candi Tirto Raharjo, saya ingin informasi reservasi.")}`}
          target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#92400e", color: "#fef3c7", textDecoration: "none", padding: "14px 32px", fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", transition: "background 0.3s" }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "#b45309"}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "#92400e"}
        >💬 HUBUNGI KAMI VIA WHATSAPP</a>
      </div>

      {/* Main grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "3.5rem 1.5rem", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "2.5rem" }}>

        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <img src="/assets/logo.png" alt="Logo" style={{ width: 48, height: 48, objectFit: "contain", flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: "'Cinzel',serif", color: "#B8915B", fontSize: 12, letterSpacing: "0.18em" }}>CANDI TIRTO RAHARJO</div>
              <div style={{ fontFamily: "'Cinzel',serif", color: "#5A534C", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", marginTop: 2 }}>Heritage Venue Jogja</div>
            </div>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "#78716c", fontSize: 13, lineHeight: 1.8, maxWidth: 280 }}>
            #1 MICE Venue with Temple in Jogja. Temple Dining, Wedding, Private Gathering &amp; Corporate Events.
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
            {[{ href: "https://www.instagram.com/canditirtojogya", label: "Instagram" }, { href: "https://www.tiktok.com/@candi_tirtoraharjo", label: "TikTok" }].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                style={{ color: "#78716c", textDecoration: "none", fontSize: 11, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#B8915B"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "#78716c"}
              >{l.label}</a>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div>
          <div style={{ fontFamily: "'Cinzel',serif", color: "rgba(184,145,91,0.6)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 20 }}>Navigasi</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 8px" }}>
            {quickLinks.map(l => (
              <button key={l.id} onClick={() => go(l.id)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#78716c", fontSize: 12, textAlign: "left", padding: 0, fontFamily: "'Lato',Arial,sans-serif", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "#B8915B"}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "#78716c"}
              >{l.label}</button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontFamily: "'Cinzel',serif", color: "rgba(184,145,91,0.6)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 20 }}>Kontak</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "ALAMAT", content: "Jl. Kasongan No.RT 03, Tirto,\nBangunjiwo, Kasihan,\nBantul 55184" },
              { label: "JAM BUKA", content: "Selasa – Minggu\n10:00 – 22:00 WIB" },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontFamily: "'Cinzel',serif", color: "#5A534C", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>{item.label}</div>
                <p style={{ fontFamily: "'Lato',Arial,sans-serif", color: "#78716c", fontSize: 12, lineHeight: 1.8, whiteSpace: "pre-line" }}>{item.content}</p>
              </div>
            ))}
            <div>
              <div style={{ fontFamily: "'Cinzel',serif", color: "#5A534C", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>RESERVASI</div>
              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
                style={{ color: "#B8915B", textDecoration: "none", fontSize: 12, fontFamily: "'Lato',Arial,sans-serif", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#D4A96A"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "#B8915B"}
              >+62 822-6161-8110</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: "1px solid rgba(184,145,91,0.08)", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <p style={{ fontFamily: "'Lato',Arial,sans-serif", color: "#44403c", fontSize: 10 }}>© {new Date().getFullYear()} Candi Tirto Raharjo. All rights reserved.</p>
        <p style={{ fontFamily: "'Lato',Arial,sans-serif", color: "#44403c", fontSize: 10 }}>Heritage Venue · Bantul, Yogyakarta</p>
      </div>

      {/* Mobile stack footer */}
      <style>{`
        @media (max-width: 768px) {
          footer > div:nth-child(2) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
