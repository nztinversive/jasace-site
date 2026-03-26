import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — Jasace AEC",
  description: "Jasace AEC privacy policy. How we collect, use, and protect your information.",
};

const sections = [
  {
    title: "Information We Collect",
    content: "We collect information you provide directly to us, including your name, email address, phone number, company name, and project details when you fill out our contact forms, subscribe to our newsletter, or otherwise communicate with us. We also automatically collect certain information about your device, including your IP address, browser type, and operating system when you visit our website.",
  },
  {
    title: "How We Use Your Information",
    content: "We use the information we collect to respond to your inquiries and project requests, send you newsletters and updates about our firm (with your consent), improve our website and services, comply with legal obligations, and communicate with you about projects and opportunities relevant to your interests.",
  },
  {
    title: "Information Sharing",
    content: "We do not sell, trade, or otherwise transfer your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and conducting our business, so long as those parties agree to keep this information confidential. We may also release information when we believe release is appropriate to comply with the law or protect our rights.",
  },
  {
    title: "Data Security",
    content: "We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems. All sensitive information you supply is encrypted via Secure Socket Layer (SSL) technology.",
  },
  {
    title: "Cookies",
    content: "Our website uses cookies to enhance your browsing experience. Cookies are small files that a site transfers to your computer through your web browser that enable the site to recognize your browser and capture certain information. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies through your browser settings.",
  },
  {
    title: "Third-Party Links",
    content: "Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites.",
  },
  {
    title: "Your Rights",
    content: "You have the right to request access to the personal data we hold about you, request correction of any inaccurate data, request deletion of your personal data, opt out of marketing communications at any time, and lodge a complaint with a supervisory authority if you believe your data has been mishandled.",
  },
  {
    title: "Changes to This Policy",
    content: "We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the effective date. You are advised to review this policy periodically for any changes.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 bg-stone-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra">
            <span className="w-8 h-px bg-terra" />
            Legal
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-light tracking-tight mt-4 mb-2">Privacy Policy</h1>
          <p className="text-sm text-stone-400 mb-12">Effective Date: January 1, 2025 &middot; Last Updated: March 1, 2025</p>

          <p className="text-stone-600 leading-relaxed mb-10">
            Jasace AEC (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy.
            This policy describes how we collect, use, and safeguard your information when you visit our website or engage with our services.
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
              Questions about this policy? Contact us at{" "}
              <Link href="/contact" className="text-terra hover:underline">jason@jasace.com</Link>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
