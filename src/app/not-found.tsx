import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 bg-grid flex items-center justify-center">
      <div className="text-center space-y-6 px-6">
        <div className="font-display text-8xl lg:text-9xl font-light text-stone-200 tracking-tight">404</div>
        <h1 className="font-display text-3xl lg:text-4xl font-light tracking-tight -mt-4">
          Page Not <span className="italic font-medium">Found</span>
        </h1>
        <p className="text-stone-500 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4 pt-2">
          <Link href="/" className="px-6 py-3 bg-stone-900 text-stone-50 text-sm font-semibold hover:bg-terra transition-colors">
            Go Home
          </Link>
          <Link href="/contact" className="px-6 py-3 border border-stone-300 text-stone-700 text-sm font-semibold hover:border-terra hover:text-terra transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
