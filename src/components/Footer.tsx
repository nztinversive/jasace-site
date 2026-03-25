const footerLinks = {
  Platform: ["Find Projects", "Post a Project", "Pricing", "Enterprise"],
  Company: ["About", "Careers", "Blog", "Press"],
  Resources: ["Help Center", "API Docs", "Community", "Partners"],
  Legal: ["Privacy", "Terms", "Cookies", "Licenses"],
};

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top section */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-stone-800">
          {/* Brand + Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#" className="inline-block">
              <span className="font-display text-2xl font-semibold text-stone-50 tracking-tight">
                <span className="text-terra">J</span>asace
              </span>
            </a>
            <p className="text-sm leading-relaxed max-w-sm">
              Connecting architects, contractors, and engineers with the right projects. Built for the AEC industry.
            </p>
            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-stone-500 mb-3">Stay Updated</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-stone-900 border border-stone-800 px-4 py-3 text-sm text-stone-300 placeholder:text-stone-600 focus:outline-none focus:border-terra/50 transition-colors"
                />
                <button className="px-6 py-3 bg-terra text-stone-50 text-sm font-medium hover:bg-terra-light transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-stone-500 mb-4">{section}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-stone-500 hover:text-stone-300 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-600">
            &copy; {new Date().getFullYear()} Jasace. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {/* Social icons */}
            <a href="#" className="text-stone-600 hover:text-stone-400 transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="text-stone-600 hover:text-stone-400 transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="#" className="text-stone-600 hover:text-stone-400 transition-colors" aria-label="GitHub">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
