import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact — Jasace ACE",
  description: "Get in touch with Jasace. Start a project, ask a question, or visit our office in Las Vegas.",
};

export default function ContactPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        {/* Hero — dark with glow */}
        <section className="bg-stone-950 bg-grid-dark grain relative pt-32 pb-16 overflow-hidden">
          <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-terra/[0.04] blur-[100px] pointer-events-none -translate-y-1/2" />
          {/* Wireframe accent */}
          <svg className="absolute top-20 right-20 w-40 h-40 hidden lg:block" viewBox="0 0 160 160" fill="none">
            <circle cx="80" cy="80" r="60" stroke="#B8432F" strokeOpacity="0.06" strokeWidth="0.5" strokeDasharray="4 6">
              <animate attributeName="stroke-dashoffset" values="0;-20" dur="6s" repeatCount="indefinite" />
            </circle>
          </svg>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra">
              <span className="w-8 h-px bg-terra" />
              Contact Us
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight mt-4">
              Let&apos;s Build Something <span className="italic font-medium text-terra">Together</span>
            </h1>
            <p className="text-stone-500 mt-4 max-w-lg leading-relaxed">
              Whether you have a project in mind or just want to explore possibilities, we&apos;d love to hear from you.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-stone-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-dark" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-16">
              {/* Form */}
              <div className="lg:col-span-7 space-y-8">
                <h2 className="font-display text-2xl font-light tracking-tight text-stone-50">
                  Start a <span className="italic font-medium text-terra">Conversation</span>
                </h2>
                <ContactForm />
              </div>

              {/* Contact Info Sidebar */}
              <div className="lg:col-span-5 space-y-10">
                <div>
                  <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-terra mb-6">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-terra mt-0.5 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                      <div>
                        <div className="text-sm font-semibold text-stone-200">Email</div>
                        <div className="text-sm text-stone-500">jason@jasace.com</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-terra mt-0.5 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                      <div>
                        <div className="text-sm font-semibold text-stone-200">Phone</div>
                        <div className="text-sm text-stone-500">(702) 403-5346</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Office */}
                <div>
                  <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-terra mb-6">Our Office</h3>
                  <div className="border border-stone-700/50 p-6 bg-stone-800/30">
                    <div className="text-sm font-semibold text-stone-200">Las Vegas, NV</div>
                    <div className="text-sm text-stone-500 mt-1">Las Vegas, Nevada</div>
                    <div className="text-xs text-stone-600 mt-2">Mon – Fri, 8:00 AM – 6:00 PM PT</div>
                  </div>
                </div>

                {/* Response time */}
                <div className="border border-terra/20 bg-terra/[0.05] p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-stone-200">Quick Response</span>
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed">We typically respond within one business day. For urgent project inquiries, call us directly.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
