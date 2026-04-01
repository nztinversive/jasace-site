import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ServicesPageClient from "./ServicesPageClient";

export const metadata = {
  title: "Services",
  description: "Architecture, construction, and engineering services from a practice that integrates all three disciplines.",
};

export default function ServicesPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <ServicesPageClient />
      <Footer />
    </>
  );
}
