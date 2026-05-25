import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Candi Tirto Raharjo – Temple Dining & Wedding Venue Jogja",
  description:
    "Candi Tirto Raharjo adalah venue mewah berlatar candi di Jogja. Temple dining, pernikahan sakral, MICE, dan private gathering dengan suasana heritage yang tak terlupakan.",
  keywords: ["candi tirto raharjo","venue jogja","wedding venue jogja","temple dining jogja","MICE venue yogyakarta"],
  openGraph: {
    title: "Candi Tirto Raharjo – Temple Dining & Wedding Venue Jogja",
    description: "Where heritage meets celebration. Temple dining, weddings, MICE & private gatherings in the heart of Jogja.",
    siteName: "Candi Tirto Raharjo",
    locale: "id_ID",
    type: "website",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/assets/logo.png", apple: "/assets/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        {/* Google Fonts – loaded via <link> so no npm install needed */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FoodEstablishment",
              name: "Candi Tirto Raharjo",
              description: "Luxury temple venue for dining, weddings, MICE, and private events in Jogja.",
              telephone: "+6282261618110",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jl. Kasongan No.RT 03, Tirto, Bangunjiwo",
                addressLocality: "Kasihan",
                addressRegion: "Bantul, Daerah Istimewa Yogyakarta",
                postalCode: "55184",
                addressCountry: "ID",
              },
              sameAs: [
                "https://www.instagram.com/canditirtojogya",
                "https://www.tiktok.com/@candi_tirtoraharjo",
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
