import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { posts, getPostBySlug } from "@/data/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — Jasace Insights`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const currentIndex = posts.findIndex((p) => p.slug === params.slug);
  const nextPost = posts[(currentIndex + 1) % posts.length];

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
          <Image src={post.image} alt={post.title} fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/40 to-stone-900/20" />
          <div className="absolute inset-0 grain" />

          <Link href="/blog" className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group">
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            All Insights
          </Link>

          <div className="max-w-4xl mx-auto px-6 lg:px-8 w-full pb-12 relative z-10">
            <div className="flex items-center gap-3 text-xs mb-4">
              <span className="font-semibold text-terra tracking-wider uppercase">{post.category}</span>
              <span className="text-white/30">&middot;</span>
              <span className="text-white/50">{post.date}</span>
              <span className="text-white/30">&middot;</span>
              <span className="text-white/50">{post.readTime}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight text-balance">
              {post.title}
            </h1>
            <div className="text-sm text-white/40 mt-4">By {post.author}</div>
          </div>
        </section>

        {/* Article Body */}
        <article className="py-16 lg:py-24 bg-stone-50">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <p className="text-lg lg:text-xl text-stone-700 leading-relaxed font-medium mb-8">
              {post.excerpt}
            </p>
            <div className="h-px bg-stone-200 mb-8" />
            <div className="space-y-6">
              {post.content.map((paragraph, i) => (
                <p key={i} className="text-stone-600 leading-relaxed">{paragraph}</p>
              ))}
            </div>

            {/* Tags / Share */}
            <div className="mt-12 pt-8 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-terra tracking-wider uppercase px-3 py-1 border border-terra/20">{post.category}</span>
              <Link href="/contact" className="text-sm font-semibold text-stone-900 hover:text-terra transition-colors">
                Discuss this topic &rarr;
              </Link>
            </div>
          </div>
        </article>

        {/* Next Post */}
        {nextPost && nextPost.slug !== post.slug && (
          <div className="border-t border-stone-200 bg-stone-100">
            <Link href={`/blog/${nextPost.slug}`} className="max-w-3xl mx-auto px-6 lg:px-8 py-10 block group">
              <span className="text-xs text-stone-400 tracking-wider uppercase">Next Article</span>
              <div className="font-display text-xl lg:text-2xl font-medium mt-2 group-hover:text-terra transition-colors">{nextPost.title}</div>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
