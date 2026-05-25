"use client";

const WA_NUMBER = "6282261618110";

export default function MobileStickyCTA() {
  return (
    <div
      className="md:hidden"
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        padding: "12px 16px 16px",
        background: "linear-gradient(180deg, transparent, rgba(15,13,11,0.95) 35%)",
      }}
    >
      <button
        onClick={() => document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" })}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          background: "#92400e", color: "#fef3c7", border: "none", cursor: "pointer",
          borderRadius: 8, padding: "14px 24px", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase",
          boxShadow: "0 4px 24px rgba(184,145,91,0.35)",
          transition: "background 0.3s",
        }}
        onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "#b45309"}
        onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "#92400e"}
      >
        💬 RESERVASI VIA WHATSAPP
      </button>
    </div>
  );
}
