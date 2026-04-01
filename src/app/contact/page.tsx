import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ContactPageClient from "./ContactPageClient";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Jasace. Start a project, ask a question, or visit our office in Las Vegas.",
};

export default function ContactPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <ContactPageClient />
      <Footer />
    </>
  );
}
