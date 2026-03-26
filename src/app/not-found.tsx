import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-stone-50 bg-grid relative overflow-hidden">
        {/* Decorative corner brackets */}
        <div className="absolute top-24 left-12 w-28 h-28 border-l border-t border-stone-200/60 hidden lg:block" />
        <div className="absolute bottom-24 right-12 w-28 h-28 border-r border-b border-stone-200/60 hidden lg:block" />

        <div className="text-center px-6 relative z-10">
          <div className="font-display text-[120px] sm:text-[180px] lg:text-[240px] font-light leading-none tracking-tighter text-stone-200/50 select-none">
            4<span className="text-terra/20">0</span>4
          </div>
          <div className="-mt-6 sm:-mt-10 space-y-4">
            <h1 className="font-display text-3xl sm:text-4xl font-light tracking-tight text-stone-900">
              Page Not <span className="italic font-medium">Found</span>
            </h1>
            <p className="text-stone-500 text-sm max-w-md mx-auto leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
              Let&apos;s get you back on solid ground.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 mt-8">
            <Link href="/" className="px-8 py-3.5 bg-stone-900 text-stone-50 text-sm font-semibold hover:bg-terra transition-colors">
              Back to Home
            </Link>
            <Link href="/contact" className="px-8 py-3.5 border border-stone-300 text-stone-700 text-sm font-semibold hover:border-terra hover:text-terra transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
