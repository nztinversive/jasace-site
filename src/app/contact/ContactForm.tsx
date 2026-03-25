"use client";

export default function ContactForm() {
  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-semibold tracking-wider uppercase text-stone-400 block mb-2">Name</label>
          <input type="text" placeholder="Your full name" className="w-full bg-white border border-stone-200 px-4 py-3.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-terra/50 transition-colors" />
        </div>
        <div>
          <label className="text-xs font-semibold tracking-wider uppercase text-stone-400 block mb-2">Email</label>
          <input type="email" placeholder="you@company.com" className="w-full bg-white border border-stone-200 px-4 py-3.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-terra/50 transition-colors" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-semibold tracking-wider uppercase text-stone-400 block mb-2">Phone</label>
          <input type="tel" placeholder="(555) 000-0000" className="w-full bg-white border border-stone-200 px-4 py-3.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-terra/50 transition-colors" />
        </div>
        <div>
          <label className="text-xs font-semibold tracking-wider uppercase text-stone-400 block mb-2">Project Type</label>
          <select className="w-full bg-white border border-stone-200 px-4 py-3.5 text-sm text-stone-800 focus:outline-none focus:border-terra/50 transition-colors appearance-none cursor-pointer">
            <option>Select a discipline</option>
            <option>Architecture</option>
            <option>Construction</option>
            <option>Engineering</option>
            <option>Integrated (Multiple)</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold tracking-wider uppercase text-stone-400 block mb-2">Message</label>
        <textarea rows={6} placeholder="Tell us about your project, timeline, and any specific requirements..." className="w-full bg-white border border-stone-200 px-4 py-3.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-terra/50 transition-colors resize-none" />
      </div>
      <button type="submit" className="px-8 py-4 bg-stone-900 text-stone-50 text-sm font-semibold tracking-wide hover:bg-terra transition-colors">
        Send Message
      </button>
    </form>
  );
}
