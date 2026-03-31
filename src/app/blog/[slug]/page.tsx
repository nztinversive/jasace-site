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

  // Related posts: same category, excluding current, max 2
  const related = posts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

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

          {/* Breadcrumb */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white/70 transition-colors">Insights</Link>
            <span>/</span>
            <span className="text-white/70 truncate max-w-[200px]">{post.title}</span>
          </div>

          <div className="max-w-4xl mx-auto px-6 lg:px-8 w-full pb-12 relative z-10">
            <div className="flex items-center gap-3 text-xs mb-4">
              <span className="font-semibold text-terra tracking-wider uppercase">{post.category}</span>
              <span className="text-white/30">&middot;</span>
              <span className="text-white/50">{post.date}</span>
              <span className="text-white/30">&middot;</span>
              <span className="text-white/50">{post.readTime}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
              {post.title}
            </h1>
            <div className="text-sm text-white/40 mt-4">By {post.author}</div>
          </div>
        </section>

        {/* Article Body */}
        <article className="py-16 lg:py-24 bg-stone-950">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <p className="text-lg lg:text-xl text-stone-300 leading-relaxed font-medium mb-8">
              {post.excerpt}
            </p>
            <div className="h-px bg-stone-800 mb-8" />
            <div className="space-y-6">
              {post.content.map((paragraph, i) => (
                <p key={i} className="text-stone-400 leading-relaxed">{paragraph}</p>
              ))}
            </div>

            {/* Share + Category */}
            <div className="mt-12 pt-8 border-t border-stone-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-terra tracking-wider uppercase px-3 py-1 border border-terra/20">{post.category}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-stone-400 mr-1">Share</span>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://jasace.com/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 border border-stone-700 flex items-center justify-center text-stone-500 hover:text-terra hover:border-terra/30 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://jasace.com/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 border border-stone-700 flex items-center justify-center text-stone-500 hover:text-terra hover:border-terra/30 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="py-16 lg:py-20 bg-stone-900 border-t border-stone-800">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
              <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-terra mb-8">Related Insights</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {related.map((rp) => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group glass overflow-hidden hover:border-terra/30 transition-colors">
                    <div className="relative h-36 overflow-hidden">
                      <Image src={rp.image} alt={rp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="50vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent" />
                    </div>
                    <div className="p-5">
                      <div className="text-[10px] font-semibold text-terra tracking-wider uppercase mb-1.5">{rp.category}</div>
                      <h4 className="font-display text-lg font-medium tracking-tight group-hover:text-terra transition-colors leading-snug">{rp.title}</h4>
                      <p className="text-xs text-stone-500 mt-2 line-clamp-2">{rp.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Next Post */}
        {nextPost && nextPost.slug !== post.slug && (
          <div className="border-t border-stone-800 bg-stone-950">
            <Link href={`/blog/${nextPost.slug}`} className="max-w-3xl mx-auto px-6 lg:px-8 py-10 block group">
              <span className="text-xs text-stone-500 tracking-wider uppercase">Next Article</span>
              <div className="font-display text-xl lg:text-2xl font-medium text-stone-100 mt-2 group-hover:text-terra transition-colors">{nextPost.title}</div>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
