import { useState, useEffect, FormEvent } from "react";
import { Compass, Mail, Check, Bookmark, FileText, ArrowUp } from "lucide-react";
import { motion } from "motion/react";
import { JournalEntry } from "../types";

const LOGO_PARTNERS = [
  {
    name: "Kawahara Seishi", 
    location: "TOKYO", 
    icon: (
      <svg className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M12 3a9 9 0 019 9M3 12a9 9 0 009 9" />
      </svg>
    )
  },
  {
    name: "Kraft & Silt Guild", 
    location: "MUNICH", 
    icon: (
      <svg className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <circle cx={12} cy={12} r={9} />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8M8 12h8" />
      </svg>
    )
  },
  {
    name: "Moss & Soil Assoc.", 
    location: "COPENHAGEN", 
    icon: (
      <svg className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    name: "Villa Erba Atelier", 
    location: "MILAN", 
    icon: (
      <svg className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <rect x={4} y={4} width={16} height={16} rx={2} strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6v6H9z" />
      </svg>
    )
  },
  {
    name: "L'Heure Sauvage", 
    location: "PARIS", 
    icon: (
      <svg className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
      </svg>
    )
  },
  {
    name: "Chateau De Lin", 
    location: "LYON", 
    icon: (
      <svg className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )
  },
  {
    name: "Bamboo Arch Co.", 
    location: "KYOTO", 
    icon: (
      <svg className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    name: "Raw Fibre Labs", 
    location: "BOSTON", 
    icon: (
      <svg className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 22h20L12 2z" />
      </svg>
    )
  }
];

const JOURNAL_DATA: JournalEntry[] = [
  {
    id: "jn-1",
    date: "16 // MAY 2026",
    readTime: "04 MIN",
    title: "Scent-Security of Organic Liners",
    excerpt: "A chemical study on maintaining delicate cosmetic fragrance preservation inside compostable sugarcane pulp cores without utilizing synthetic vinyl membranes.",
  },
  {
    id: "jn-2",
    date: "28 // APR 2026",
    readTime: "07 MIN",
    title: "The Architecture of Raw Cardboard",
    excerpt: "How zero-waste cardboard packaging aesthetics are replacing plastic gloss finishes to cultivate organic trust among elite fashion design houses.",
  },
  {
    id: "jn-3",
    date: "04 // MAR 2026",
    readTime: "05 MIN",
    title: "Soy Foils and Letterpress Depths",
    excerpt: "A design analysis of hot vegetable soy foils and blind debossing alignments on high-density secondary post-consumer fiber boards.",
  },
];

export default function StudioFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [ticketNum, setTicketNum] = useState("");

  useEffect(() => {
    // Generate a beautiful mock ticket number once subscribed
    setTicketNum("TKT-" + Math.floor(100000 + Math.random() * 900000));
  }, []);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    // Persist list locally
    const existing = localStorage.getItem("garabel_subscribers") || "[]";
    const parsed = JSON.parse(existing);
    if (!parsed.includes(email)) {
      parsed.push({ email, timestamp: new Date().toISOString() });
      localStorage.setItem("garabel_subscribers", JSON.stringify(parsed));
    }

    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative w-full max-w-7xl mx-auto px-6 pt-16 pb-12 z-10 border-t border-garabel-ink/10 select-none animate-fadeIn">
      
      {/* Luxurious Editorial Logo Ticker (Brown organic subtle placeholders) */}
      <div className="w-full overflow-hidden py-8 border-b border-garabel-ink/10 mb-14 relative">
        {/* Elegant edge fading using CSS custom properties for theme-cohesive background matching */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" 
          style={{ background: "linear-gradient(to right, var(--color-garabel-bg) 0%, transparent 100%)" }}
        />
        <div 
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" 
          style={{ background: "linear-gradient(to left, var(--color-garabel-bg) 0%, transparent 100%)" }}
        />

        <motion.div 
          className="flex whitespace-nowrap gap-16 md:gap-24 items-center w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 32,
            repeat: Infinity,
          }}
        >
          {/* Duplicated array of luxury organic partners for infinite seamless animation */}
          {[...LOGO_PARTNERS, ...LOGO_PARTNERS].map((partner, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3.5 text-garabel-mid/45 hover:text-garabel-ink/85 transition-colors duration-300"
            >
              <div className="text-garabel-mid/45 hover:text-garabel-accent/60 transition-colors duration-300">
                {partner.icon}
              </div>
              <div className="flex flex-col items-start leading-none gap-0.5">
                <span className="font-sans font-semibold text-[10px] md:text-[11px] uppercase tracking-[0.24em]">
                  {partner.name}
                </span>
                <span className="font-mono text-[7px] tracking-[0.16em] text-garabel-mid/40 font-medium">
                  {partner.location} // IN COLLABORATION
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Journal and Manifesto Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-garabel-ink/10">
        
        {/* Editorial Journal Entries */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <span className="block font-mono text-[10px] tracking-widest text-garabel-accent uppercase mb-2">
              JOURNAL READINGS // EXPLORING THE CRAFT
            </span>
            <h3 className="text-2xl md:text-3xl font-sans font-light tracking-tight text-garabel-ink">
              Boutique literary <span className="italic font-normal text-garabel-mid">journal notes</span>.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {JOURNAL_DATA.map((entry) => (
              <div 
                key={entry.id}
                className="group p-5 rounded border border-garabel-ink/5 bg-garabel-sand bg-opacity-10 hover:bg-opacity-30 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center font-mono text-[8px] text-garabel-mid tracking-widest">
                    <span>{entry.date}</span>
                    <span>{entry.readTime} READ</span>
                  </div>
                  <h4 className="font-sans text-base font-normal text-garabel-ink group-hover:text-garabel-accent transition-colors">
                    {entry.title}
                  </h4>
                  <p className="font-sans text-xs font-light text-garabel-mid leading-relaxed">
                    {entry.excerpt}
                  </p>
                </div>
                <div className="flex justify-start pt-4 border-t border-garabel-ink/5 mt-4">
                  <span className="flex items-center gap-1 font-mono text-[8px] text-garabel-ink tracking-widest uppercase group-hover:translate-x-1 duration-300 transition-transform cursor-pointer">
                    <Bookmark className="w-3 h-3 text-garabel-accent" />
                    <span>Open Essay</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Studio Manifesto + Subscription Section */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
          
          {/* Manifesto Callout Card */}
          <div className="p-6 rounded-lg border border-garabel-ink/10 bg-garabel-sand bg-opacity-30 relative overflow-hidden shadow-craft-sm">
            <div className="absolute inset-0 paper-grain pointer-events-none opacity-10"></div>
            <span className="block font-mono text-[9px] text-garabel-ink font-semibold tracking-widest uppercase mb-3">
              THE MANIFESTO
            </span>
            <blockquote className="font-sans font-light text-xs text-garabel-mid leading-relaxed italic">
              "We believe physical packaging is the sacred sanctuary of luxury artifacts. By respecting organic fibers, giant bamboo cores, unbleached hemp wefts, and absolute geometric ratios, we cultivate profound, quiet respect between brand and client."
            </blockquote>
          </div>

          {/* Email Subscription Coupling */}
          <div className="space-y-4">
            <span className="block font-mono text-[9px] text-garabel-ink font-bold tracking-widest uppercase">
              SUBSCRIBE TO EDITIONS OF THE FUTURE:
            </span>
            <p className="font-sans text-xs font-light text-garabel-mid leading-relaxed">
              We dispatch material samples and print booklets once per lunar season. Highly limited editions; zero marketing clutter.
            </p>

            {subscribed ? (
              <div className="p-4 rounded border border-dashed border-green-500/30 bg-green-500/5 font-mono text-[9px] tracking-wider text-garabel-ink space-y-2">
                <div className="flex items-center gap-1.5 text-green-500 font-semibold uppercase">
                  <Check className="w-3.5 h-3.5" />
                  <span>TRANSMISSION RECORDED // OK</span>
                </div>
                <div className="text-garabel-mid leading-relaxed">
                  You have been coupled with our editions under <span className="text-garabel-ink font-bold font-mono">{ticketNum}</span>. Your tactile pulp sample coupon is pending stamp validation. Thank you.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="director@house.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-3 rounded border border-garabel-ink/15 bg-garabel-cream bg-opacity-50 text-xs font-mono placeholder-garabel-mid/40 outline-none focus:border-garabel-ink/40 transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded bg-garabel-ink text-garabel-cream font-mono text-[10px] uppercase tracking-widest hover:bg-opacity-95 transition-all shadow-craft-sm flex items-center justify-center cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

      {/* Centered Bigger & More Prominent Minimalist Return Arrow and Copyright in Premium Ink Dark Brown Block */}
      <div className="mt-16 -mx-6 -mb-12 px-6 py-12 bg-garabel-ink text-garabel-cream flex flex-col items-center justify-center gap-10 rounded-b-lg relative overflow-hidden">
        {/* Subtle decorative grain to enhance luxury paper feel */}
        <div className="absolute inset-0 paper-grain pointer-events-none opacity-20"></div>
        
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col items-center gap-4 group cursor-pointer focus:outline-none z-30"
          aria-label="Return to top"
        >
          <div className="w-16 h-16 rounded-full border border-garabel-cream/25 group-hover:border-garabel-cream bg-garabel-cream/10 group-hover:bg-garabel-cream/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm">
            <ArrowUp className="w-7 h-7 text-garabel-cream group-hover:-translate-y-1.5 transition-transform duration-300 stroke-[1.5]" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-garabel-cream/80 group-hover:text-white transition-colors duration-300 font-bold">
            Return to top
          </span>
        </button>

        {/* Outermost copyright and designer specs with white/cream reverse theme */}
        <div className="w-full max-w-5xl border-t border-garabel-cream/15 pt-8 flex flex-col items-center justify-center text-center gap-3 text-[9px] font-mono tracking-widest text-garabel-cream/70 z-30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-2 sm:gap-6">
            <span>© 2026 ATELIER GARABEL. COPH / MUNICH / TOKYO. ALL SPEC RIGHTS PERSIST.</span>
            <span className="hidden sm:inline text-garabel-cream/35">•</span>
            <span>COMPOSTABLE CERTIFICATION NO. 299-A</span>
          </div>
          <div className="text-white font-bold uppercase tracking-[0.2em] opacity-95">
            DESIGN BY NATURAL RATIO SYSTEMS
          </div>
        </div>
      </div>
    </footer>
  );
}
