import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service — Jasace AEC",
  description: "Jasace AEC terms of service governing use of our website and services.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    content: "By accessing and using the Jasace AEC website (jasace.com), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website. We reserve the right to modify these terms at any time, and such modifications shall be effective immediately upon posting.",
  },
  {
    title: "Services Description",
    content: "Jasace AEC provides architecture, construction management, and engineering consulting services. Information on our website is intended for general informational purposes and does not constitute professional advice. Project-specific recommendations require formal engagement and are subject to separate contractual agreements.",
  },
  {
    title: "Intellectual Property",
    content: "All content on this website, including text, graphics, logos, images, photographs, and software, is the property of Jasace AEC or its content suppliers and is protected by United States and international copyright laws. The compilation of all content on this site is the exclusive property of Jasace AEC. You may not reproduce, distribute, or create derivative works from any content without our express written permission.",
  },
  {
    title: "Project Imagery",
    content: "Photographs and renderings of projects displayed on our website are the property of Jasace AEC unless otherwise credited. These images are provided for portfolio and informational purposes and may not be reproduced without permission. Some images may depict projects completed in collaboration with other firms, and credit is noted where applicable.",
  },
  {
    title: "Limitation of Liability",
    content: "Jasace AEC shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our website or services, even if we have been advised of the possibility of such damages. This limitation applies to damages arising from the use of or reliance on information provided on our website, the cost of substitute services, or any other matter relating to our website.",
  },
  {
    title: "Accuracy of Information",
    content: "While we strive to keep the information on our website accurate and current, we make no warranties or representations about the accuracy, reliability, or completeness of the content. Project details, team information, and service descriptions are subject to change without notice.",
  },
  {
    title: "External Links",
    content: "Our website may contain links to external websites that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites. We encourage you to review the terms and privacy policies of any external site you visit.",
  },
  {
    title: "Governing Law",
    content: "These terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard to conflict of law provisions. Any disputes arising from these terms or your use of our website shall be resolved in the courts of Travis County, Texas.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 bg-stone-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra">
            <span className="w-8 h-px bg-terra" />
            Legal
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-light tracking-tight mt-4 mb-2">Terms of Service</h1>
          <p className="text-sm text-stone-400 mb-12">Effective Date: January 1, 2025 &middot; Last Updated: March 1, 2025</p>

          <p className="text-stone-600 leading-relaxed mb-10">
            These Terms of Service govern your use of the Jasace AEC website and services.
            Please read them carefully before using our site.
          </p>

          <div className="space-y-10">
            {sections.map((s, i) => (
              <div key={i}>
                <h2 className="font-display text-xl font-medium tracking-tight mb-3">{s.title}</h2>
                <p className="text-stone-500 leading-relaxed text-sm">{s.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-stone-200">
            <p className="text-sm text-stone-400">
              Questions about these terms? Contact us at{" "}
              <Link href="/contact" className="text-terra hover:underline">hello@jasace.com</Link>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
