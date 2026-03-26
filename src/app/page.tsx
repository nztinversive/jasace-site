import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import PageTransition from "@/components/PageTransition";
import BackToTop from "@/components/BackToTop";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <main>
      <JsonLd />
      <PageTransition />
      <ScrollProgress />
      <BackToTop />
      <Navbar />
      <Hero />
      <Marquee />
      <Clients />
      <Services />
      <About />
      <Portfolio />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
