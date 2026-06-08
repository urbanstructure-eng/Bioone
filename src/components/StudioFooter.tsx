import { useState, useEffect, FormEvent } from "react";
import { Compass, Mail, Check, Bookmark, FileText, ArrowUp } from "lucide-react";
import { motion } from "motion/react";
import { JournalEntry } from "../types";

const LOGO_PARTNERS = [
  {
    name: "Collaborative Brand I",
    logoUrl: "https://lh3.googleusercontent.com/d/1jCDS-sL-foPnzuCz-KvVEQdJ7a7pp_YG"
  },
  {
    name: "Collaborative Brand II",
    logoUrl: "https://lh3.googleusercontent.com/d/1BOJVMmVj36wXQbLEuZICNa7zCIygLy05"
  },
  {
    name: "Collaborative Brand III",
    logoUrl: "https://lh3.googleusercontent.com/d/1ngEVh_QEZ1Tw-gDpO5ME3nMWPpULLCmG"
  },
  {
    name: "Collaborative Brand IV",
    logoUrl: "https://lh3.googleusercontent.com/d/1gZ1u2-Ukj7p2b6jzQSDY7lhdav1zWSjH"
  },
  {
    name: "Collaborative Brand V",
    logoUrl: "https://lh3.googleusercontent.com/d/1Mf-GMGpe7SSoDpgGAZ4XYKCAv5xOZgtq"
  },
  {
    name: "Collaborative Brand VI",
    logoUrl: "https://lh3.googleusercontent.com/d/1DQtEZVL-uSp-Uzv3vd6QOs5W6-cYpkdt"
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

interface StudioFooterProps {
  onOpenInquiry?: () => void;
}

export default function StudioFooter({ onOpenInquiry }: StudioFooterProps) {
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
              className="flex items-center justify-center shrink-0 px-6"
            >
              <img 
                src={partner.logoUrl} 
                referrerPolicy="no-referrer"
                alt={partner.name}
                className="h-9 sm:h-12 w-auto object-contain grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300 mix-blend-multiply filter contrast-125 select-none"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Journal and Manifesto Section */}
      <div className="pb-16 border-b border-garabel-ink/10 select-none">
        
        {/* Editorial Brand Growth & Strategy Column */}
        <div className="w-full space-y-8 animate-fadeIn">
          <div>
            <span className="block font-mono text-[11px] tracking-widest text-[#376332] uppercase mb-2 font-bold">
              Value Manifesto // Strategy
            </span>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-sans font-black tracking-tight text-garabel-ink leading-tight uppercase">
              More Than Packaging.<br />
              <span className="italic font-normal text-garabel-accent">A Competitive Advantage.</span>
            </h3>
          </div>

          <div className="space-y-6 pt-4 text-garabel-ink">
            <p className="font-sans text-base md:text-lg lg:text-xl font-light leading-relaxed text-garabel-ink/90">
              Today's customers expect more from the brands they support. They want quality, authenticity, and environmental responsibility.
            </p>

            <div className="py-6 border-y border-garabel-ink/10 my-6">
              <span className="block font-mono text-[10px] tracking-widest text-garabel-accent uppercase mb-3 font-bold">
                ▲ Our Mission Is Simple
              </span>
              <p className="font-sans text-xl md:text-3xl font-black text-[#376332] tracking-normal leading-relaxed uppercase">
                "Help brands create exceptional customer experiences while eliminating unnecessary waste."
              </p>
            </div>

            <p className="font-sans text-sm md:text-base font-light leading-relaxed text-garabel-mid">
              By combining premium design, sustainable materials, and responsible production, we help businesses turn everyday packaging into a powerful marketing tool that customers remember.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-garabel-ink/5 mt-8">
              <div className="space-y-2">
                <span className="block font-mono text-[10px] tracking-widest text-garabel-mid uppercase font-bold">
                  // THE STANDARD
                </span>
                <h4 className="font-sans text-base font-bold text-garabel-ink uppercase">
                  Create Packaging Customers Want to Carry.
                </h4>
                <p className="font-sans text-xs text-garabel-mid leading-relaxed font-semibold">
                  Premium. Sustainable. Custom. Zero Emissions.
                </p>
              </div>

              <div className="space-y-4">
                <p className="font-sans text-xs sm:text-sm text-garabel-mid leading-relaxed font-light">
                  Build a stronger brand and a cleaner future with packaging designed to make an impact long after the sale is complete.
                </p>

                {onOpenInquiry && (
                  <motion.button 
                    onClick={onOpenInquiry}
                    className="mt-3 w-full inline-flex items-center justify-between gap-4 px-5 py-3.5 bg-[#376332] hover:bg-[#2b4c27] text-white rounded-xl transition-all duration-300 cursor-pointer group border border-[#376332]/10 shadow-lg select-none"
                    animate={{
                      scale: [1, 1.02, 1],
                      boxShadow: [
                        "0 4px 6px -1px rgba(55, 99, 50, 0.15), 0 2px 4px -1px rgba(55, 99, 50, 0.1)",
                        "0 10px 15px -3px rgba(55, 99, 50, 0.3), 0 4px 6px -2px rgba(55, 99, 50, 0.15)",
                        "0 4px 6px -1px rgba(55, 99, 50, 0.15), 0 2px 4px -1px rgba(55, 99, 50, 0.1)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col text-left">
                      <span className="font-mono text-[9px] tracking-widest text-[#a8d3a1] uppercase font-bold">
                        ✦ ONE BRAND SERVICE // DESIGN
                      </span>
                      <span className="font-sans text-sm sm:text-base font-black tracking-wide uppercase text-[#faf7f2] mt-0.5">
                        Get a Custom Quote Today
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#faf7f2]/10 group-hover:bg-[#faf7f2]/20 flex items-center justify-center transition-colors">
                      <span className="text-[#faf7f2] text-sm font-bold group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </motion.button>
                )}
              </div>
            </div>
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
