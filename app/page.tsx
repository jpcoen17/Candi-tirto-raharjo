import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experiences from "@/components/Experiences";
import About from "@/components/About";
import VenueShowcase from "@/components/VenueShowcase";
import MenuViewer from "@/components/MenuViewer";
import Packages from "@/components/Packages";
import Testimonials from "@/components/Testimonials";
import Reservation from "@/components/Reservation";
import Location from "@/components/Location";
import InstagramSection from "@/components/InstagramSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Experiences />
        <About />
        <VenueShowcase />
        <MenuViewer />
        <Packages />
        <Testimonials />
        <Reservation />
        <Location />
        <InstagramSection />
        <FAQ />
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  );
}
