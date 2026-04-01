import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import AboutClient from "./AboutClient";
import AboutPageClient from "./AboutPageClient";

export const metadata = {
  title: "About",
  description: "The story behind Jasace. 10+ years of architecture, construction, and engineering consulting.",
};

export default function AboutPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <AboutPageClient />
      <Footer />
      <AboutClient />
    </>
  );
}
