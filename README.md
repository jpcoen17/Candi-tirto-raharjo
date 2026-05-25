# Candi Tirto Raharjo – Premium Heritage Venue Website

Website mewah untuk **Candi Tirto Raharjo**, venue heritage #1 di Jogja untuk Temple Dining, Wedding, MICE, dan Private Events.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animasi premium ringan)
- **pdfjs-dist** (menu PDF viewer dengan flip animasi)
- **react-intersection-observer** (scroll reveal)
- **Lucide React** (ikon)

## 📁 Struktur Project

```
candi-tirto/
├── app/
│   ├── globals.css       # CSS global + variabel warna
│   ├── layout.tsx        # SEO metadata + JSON-LD
│   └── page.tsx          # Halaman utama
├── components/
│   ├── LoadingScreen.tsx     # Loading screen mewah
│   ├── Navbar.tsx            # Navigasi sticky
│   ├── Hero.tsx              # Hero full-viewport
│   ├── Experiences.tsx       # Signature experience cards
│   ├── About.tsx             # Tentang venue
│   ├── VenueShowcase.tsx     # Galeri masonry + lightbox
│   ├── MenuViewer.tsx        # PDF menu viewer dengan flip
│   ├── Packages.tsx          # Paket acara
│   ├── Testimonials.tsx      # Carousel testimonial
│   ├── Reservation.tsx       # Form reservasi → WhatsApp
│   ├── Location.tsx          # Peta + info lokasi
│   ├── InstagramSection.tsx  # Feed Instagram
│   ├── FAQ.tsx               # Accordion FAQ
│   ├── Footer.tsx            # Footer mewah
│   ├── MobileStickyCTA.tsx   # CTA sticky mobile
│   └── FadeIn.tsx            # Utility animasi
└── public/
    └── assets/
        ├── logo.png         # Logo venue
        ├── menu.pdf         # Menu PDF
        ├── venue-1..9.png   # Foto venue
        └── instagram.png    # Screenshot Instagram
```

## 🎨 Desain

- **Warna**: Stone Black, Heritage Gold, Warm Ivory
- **Font**: Cinzel (display), Cormorant Garamond (serif), Lato (body)
- **Animasi**: Framer Motion ringan – fade, stagger, flip

## 📱 Fitur

1. **Loading Screen** – animasi partikel + shimmer gold
2. **Hero Section** – full viewport dengan trust indicators
3. **Menu PDF Viewer** – flip animation realistis
4. **Form Reservasi** – kirim otomatis ke WhatsApp
5. **Galeri** – masonry + lightbox
6. **Mobile Sticky CTA** – tombol reservasi fixed bawah

## 📞 Kontak

- WhatsApp: +62 822-6161-8110
- Instagram: @canditirtojogya
- TikTok: @candi_tirtoraharjo
- Alamat: Jl. Kasongan No.RT 03, Tirto, Bangunjiwo, Kasihan, Bantul 55184

## 🔧 Environment

Tidak diperlukan environment variables. Website berjalan tanpa backend.

## 📤 Deploy

```bash
npm run build
npm start
```

Atau deploy ke Vercel:
```bash
npx vercel --prod
```
