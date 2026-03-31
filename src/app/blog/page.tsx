import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: "Insights",
  description: "Perspectives on architecture, construction, and engineering from Jason Reese.",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        {/* Hero - dark with glow */}
        <section className="bg-stone-950 bg-grid-dark grain relative pt-32 pb-16 overflow-hidden">
          <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-terra/[0.03] blur-[100px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra">
              <span className="w-8 h-px bg-terra" />
              Insights
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mt-4">
              Thinking About <span className="text-gradient font-bold">BUILDING</span>
            </h1>
            <p className="text-stone-500 mt-4 max-w-lg leading-relaxed">
              Perspectives on architecture, construction, and engineering.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-stone-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-dark" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            {/* Featured Post */}
            <Link href={`/blog/${featured.slug}`} className="group grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
              <div className="aspect-[3/2] relative overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent" />
                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-terra/30" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-terra/30" />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-semibold text-terra tracking-wider uppercase">{featured.category}</span>
                  <span className="text-stone-600">&middot;</span>
                  <span className="text-stone-500">{featured.date}</span>
                  <span className="text-stone-600">&middot;</span>
                  <span className="text-stone-500">{featured.readTime}</span>
                </div>
                <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-tight text-stone-50 group-hover:text-terra transition-colors">{featured.title}</h2>
                <p className="text-stone-400 leading-relaxed">{featured.excerpt}</p>
                <div className="text-sm font-semibold text-terra group-hover:text-terra-light transition-colors inline-flex items-center gap-2">
                  Read Article
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="transform group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </div>
              </div>
            </Link>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent mb-16" />

            {/* Rest of posts */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <div className="aspect-[3/2] relative overflow-hidden mb-5">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-terra group-hover:w-full transition-all duration-500" />
                  </div>
                  <div className="flex items-center gap-3 text-xs mb-3">
                    <span className="font-semibold text-terra tracking-wider uppercase">{post.category}</span>
                    <span className="text-stone-600">&middot;</span>
                    <span className="text-stone-500">{post.readTime}</span>
                  </div>
                  <h3 className="font-display text-xl font-medium tracking-tight text-stone-100 group-hover:text-terra transition-colors">{post.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed mt-2">{post.excerpt}</p>
                  <div className="text-xs text-stone-600 mt-3">{post.date} &middot; By {post.author}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
