import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { MaterialParams, UnifiedCartItem, AICustomDesign } from "./types";
import StudioBanner from "./components/StudioBanner";
import CardboardCustomizer from "./components/CardboardCustomizer";
import ProjectShowcase from "./components/ProjectShowcase";
import CreativeDesk from "./components/CreativeDesk";
import AtelierStore from "./components/AtelierStore";
import StudioFooter from "./components/StudioFooter";
import CartDrawer from "./components/CartDrawer";
import { FlowArt, FlowSection } from "./components/FlowArt";
import { useLanguage, LANGUAGES } from "./translations";
import InquiryPage from "./components/InquiryPage";

export interface OrganicTheme {
  id: "kraft" | "moss" | "clay" | "linen";
  name: string;
  badge: string;
  bg1: string; // bg-garabel-bg
  bg2: string; // bg-garabel-kraft
  bg3: string; // bg-garabel-sand
  bg4: string; // bg-garabel-cream
  bg5: string; // bg-garabel-light
  ink: string; // garabel-ink
  mid: string; // garabel-mid
  accent: string; // garabel-accent
  ambientColor: string; // visual helper glow
}

export const ORGANIC_THEMES: OrganicTheme[] = [
  {
    id: "kraft",
    name: "Natural Kraft & Bamboo",
    badge: "01 // EARTHY CHIPBOARD",
    bg1: "#e5d9ca",
    bg2: "#dfd0bc",
    bg3: "#efe6d9",
    bg4: "#faf7f2",
    bg5: "#f3eae0",
    ink: "#4e4034",
    mid: "#8a7360",
    accent: "#aa6e54",
    ambientColor: "rgba(139, 90, 43, 0.08)",
  },
  {
    id: "moss",
    name: "Matcha Pine & Moss Lichen",
    badge: "02 // VEGETAL FOREST",
    bg1: "#d0d9cd",
    bg2: "#bfcbb9",
    bg3: "#dfebd9",
    bg4: "#f4f8f3",
    bg5: "#e6ede2",
    ink: "#223521",
    mid: "#4e6a4c",
    accent: "#376332",
    ambientColor: "rgba(74, 122, 68, 0.08)",
  },
  {
    id: "clay",
    name: "Sunned Silt & Pottery Clay",
    badge: "03 // BAKED TERRACOTTA",
    bg1: "#e3cfc3",
    bg2: "#d9bca8",
    bg3: "#ebd8cc",
    bg4: "#faf6f3",
    bg5: "#f3e4db",
    ink: "#482b1b",
    mid: "#83563d",
    accent: "#b5613c",
    ambientColor: "rgba(181, 97, 60, 0.08)",
  },
  {
    id: "linen",
    name: "Alabaster, Linen & Coal",
    badge: "04 // BONE STONE FIBRES",
    bg1: "#eadeca",
    bg2: "#dfd0be",
    bg3: "#ebd9c3",
    bg4: "#fbf9f4",
    bg5: "#f1e5d7",
    ink: "#282622",
    mid: "#696359",
    accent: "#9c7f55",
    ambientColor: "rgba(156, 127, 85, 0.08)",
  },
];

export default function App() {
  const { language, setLanguage } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [params, setParams] = useState<MaterialParams>({
    grain: 24,
    warmth: 45,
    fibres: 35,
    shadowDepth: 60,
    crease: 20,
  });

  const [grainMovement, setGrainMovement] = useState(true);
  const [cart, setCart] = useState<UnifiedCartItem[]>([]);
  const [themeId, setThemeId] = useState<"kraft" | "moss" | "clay" | "linen">("kraft");

  // Dynamic injection of custom variables into document root level
  useEffect(() => {
    const active = ORGANIC_THEMES.find((t) => t.id === themeId) || ORGANIC_THEMES[0];
    const root = document.documentElement;
    root.style.setProperty("--color-garabel-bg", active.bg1);
    root.style.setProperty("--color-garabel-kraft", active.bg2);
    root.style.setProperty("--color-garabel-sand", active.bg3);
    root.style.setProperty("--color-garabel-cream", active.bg4);
    root.style.setProperty("--color-garabel-light", active.bg5);
    root.style.setProperty("--color-garabel-ink", active.ink);
    root.style.setProperty("--color-garabel-mid", active.mid);
    root.style.setProperty("--color-garabel-accent", active.accent);
  }, [themeId]);

  const handleAddCustomDesignToCart = (design: AICustomDesign) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === design.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          id: design.id,
          name: `CUSTOM AI DESIGN: ${design.brandName.toUpperCase()}`,
          category: `Generative Luxury Specification`,
          price: design.estimatedPrice,
          description: `Bespoke structure designed under ${design.aestheticStyleName} principles with ${design.recommendedSubstrate} and ${design.prototypeSpecs}.`,
          isCustomAI: true,
          customDetails: design,
          quantity: 1,
        },
      ];
    });

    // Smooth scroll to store section so the client sees checkout item instantly
    setTimeout(() => {
      const storeSection = document.getElementById("atelier-objects-store");
      if (storeSection) {
        storeSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="relative min-h-screen bg-garabel-bg text-garabel-ink overflow-x-hidden transition-colors duration-500 selection:bg-garabel-accent selection:text-garabel-cream">
      
      {/* Global Static Top Left Branding Logo (adjusted size and position on mobile to match layout) */}
      <motion.div 
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-4 md:top-8 md:left-10 z-[110] pointer-events-auto cursor-pointer"
        onClick={() => {
          if (isInquiryOpen) {
            setIsInquiryOpen(false);
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      >
        <img
          src="https://lh3.googleusercontent.com/d/1U3YfW75P9JyKKTCWA7yoM31HCTW9L0fN"
          alt="Atelier Garabel"
          referrerPolicy="no-referrer"
          className="h-[38px] sm:h-[48px] md:h-[62px] w-auto object-contain select-none animate-fadeIn"
        />
      </motion.div>

      {/* Floating Quiet-Luxe Shopping Drawer Pin (Top Right Header Group) */}
      <CartDrawer 
        cart={cart} 
        setCart={setCart} 
        languageSwitcher={
          <div className="select-none flex items-center pr-1 sm:pr-2">
            {/* Desktop full bar */}
            <div className="hidden sm:flex items-center gap-1 px-1 py-1 text-garabel-ink font-mono text-[9.5px] md:text-[10px] tracking-wide bg-transparent">
              <Globe className="w-5.5 h-5.5 md:w-6 md:h-6 text-white drop-shadow-[0_1px_2px_rgba(78,64,52,0.5)] mr-2.5 ml-1" />
              {LANGUAGES.map((lang, idx) => (
                <span key={lang.code} className="relative group flex items-center gap-1.5">
                  <button
                    onClick={() => setLanguage(lang.code)}
                    className={`py-0.5 px-2 transition-all duration-300 cursor-pointer font-bold ${
                      language === lang.code
                        ? "text-[#376332] border-b-2 border-[#376332] scale-105"
                        : "text-garabel-mid hover:text-garabel-ink"
                    }`}
                  >
                    {lang.flag}
                  </button>
                  
                  {/* Premium micro-tooltip */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-garabel-ink text-white text-[8px] font-mono tracking-widest rounded shadow-craft-md pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out whitespace-nowrap z-50">
                    {lang.tooltip}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-bubble -mt-0.5 border-4 border-transparent border-t-garabel-ink"></span>
                  </span>

                  {idx < LANGUAGES.length - 1 && <span className="opacity-30 select-none font-light text-garabel-mid">/</span>}
                </span>
              ))}
            </div>

            {/* Mobile dropdown style */}
            <div className="sm:hidden relative z-50">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-2 bg-garabel-cream/95 backdrop-blur-sm border border-garabel-ink/15 rounded-full text-garabel-ink font-mono text-[11px] font-bold cursor-pointer hover:text-[#376332] transition-all shadow-craft-sm h-11 focus:outline-none"
                id="mobile-lang-btn"
              >
                <div className="absolute inset-0 paper-grain pointer-events-none opacity-10 rounded-full"></div>
                <Globe className="w-4 h-4 text-garabel-mid" />
                <span className="font-bold">{LANGUAGES.find(l => l.code === language)?.flag}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#376332] transition-transform duration-300 ${isLangOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <>
                    {/* Seamless viewport backdrop click dismissal */}
                    <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsLangOpen(false)}></div>
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 py-1.5 w-36 bg-garabel-cream border border-garabel-ink/20 rounded-xl shadow-craft-lg overflow-hidden flex flex-col z-50"
                    >
                      <div className="absolute inset-0 paper-grain pointer-events-none opacity-20"></div>
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLangOpen(false);
                          }}
                          className={`flex items-center justify-between px-4 py-3 text-left font-mono text-[11px] tracking-wider transition-colors cursor-pointer relative z-40 ${
                            language === lang.code
                              ? "text-[#376332] bg-[#376332]/5 font-bold"
                              : "text-garabel-ink hover:bg-garabel-sand/10"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="opacity-60">{lang.flag}</span>
                            <span>{lang.name}</span>
                          </span>
                          {language === lang.code && <Check className="w-3.5 h-3.5 text-[#376332]" />}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        }
      />
      
      {/* 1. Warmth Tint Overlay (Hue Tint Box multiplying paper tones) */}
      <div 
        className="fixed inset-0 pointer-events-none z-40 transition-colors duration-550"
        style={{ 
          backgroundColor: `rgba(139, 90, 43, ${params.warmth / 650})`, 
          mixBlendMode: "multiply"
        }}
      ></div>

      {/* 2. Paper Creases & Folds Layer */}
      <div 
        className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-500 cardboard-crease"
        style={{ 
          opacity: params.crease / 220 
        }}
      ></div>

      {/* 3. Global Recycled Fiber Spot Layers */}
      <div 
        className="fixed inset-0 pointer-events-none z-20 transition-opacity duration-400 cardboard-fibres"
        style={{ 
          opacity: params.fibres / 100 
        }}
      ></div>

      {/* 4. Film Grain / Noise animated movement sheet */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        <div 
          className={`absolute -inset-[100%] paper-grain pointer-events-none ${grainMovement ? "animate-grain-shift" : ""}`}
          style={{ 
            opacity: params.grain / 120 
          }}
        ></div>
      </div>

      {/* Tactile Hanging Label/Circular Tag on the Left Side of Page */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.0, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 top-[38%] -translate-y-1/2 z-40"
      >
        <button
          onClick={() => setIsInquiryOpen(true)}
          className="group relative flex items-center justify-center w-24 h-24 md:w-28 md:h-28 bg-garabel-cream border-2 border-[#376332]/30 rounded-full shadow-craft-xl cursor-pointer hover:border-[#376332] hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300"
          style={{ marginLeft: "-24px" }}
          aria-label="Order or Inquire Spec Project"
        >
          {/* Subtle radiating pulse core to make it immediately eye-catching */}
          <span className="absolute -inset-1.5 rounded-full bg-[#376332]/5 animate-ping duration-1000 group-hover:bg-[#376332]/10 pointer-events-none"></span>

          <div className="absolute inset-0 paper-grain pointer-events-none opacity-25 rounded-full"></div>
          <div className="absolute left-0 -top-8 w-px h-8 bg-[#376332]/40"></div>
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
            className="absolute inset-[4px] rounded-full border border-dashed border-[#4e4034]/25 flex items-center justify-center"
          >
            <svg className="w-full h-full select-none" viewBox="0 0 100 100">
              <path
                id="tagPath"
                fill="none"
                stroke="none"
                d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              />
              <text className="fill-[#376332] font-mono text-[7.5px] font-black tracking-[0.22em] uppercase">
                <textPath href="#tagPath" startOffset="0%">
                  ✦ ORDER SPECIMEN ✦ BESPOKE INQUIRY ✦ ATELIER GARABEL
                </textPath>
              </text>
            </svg>
          </motion.div>
          
          {/* Inner core wax seal style */}
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#376332] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),_0_2px_4px_rgba(55,99,50,0.3)] group-hover:scale-125 transition-transform duration-300 flex items-center justify-center relative">
            <span className="absolute inset-0.5 rounded-full bg-[#faf7f2]/10"></span>
            {/* Minimal visual brand indicator inside stamp */}
            <span className="font-sans font-black text-[#faf7f2] text-[10px] md:text-[11px] select-none tracking-tighter">AG</span>
          </div>

          {/* Hanging tag bottom dynamic knot thread */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-2.5 w-1.5 h-1.5 rounded-full bg-[#376332] border border-garabel-cream shadow pointer-events-none group-hover:translate-y-0.5 transition-transform"></div>

          {/* Premium Tooltip */}
          <span className="absolute left-full ml-5 py-2 px-4 bg-garabel-ink text-[#fdfbf7] text-[10px] font-mono tracking-widest rounded-lg shadow-craft-2xl pointer-events-none opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-250 ease-out whitespace-nowrap z-50 border border-neutral-700/30">
            <span className="text-[#376332] mr-1">✦</span> {language === "ja" ? "仕様のご注文 & 特注相談" : "ORDER SPECIMEN & BESPOKE INQUIRY"}
            <span className="absolute right-full top-1/2 -translate-y-1/2 border-bubble ml-px border-6 border-transparent border-r-garabel-ink"></span>
          </span>
        </button>
      </motion.div>

      {/* Minimalist Inquiry Full-Page View */}
      <AnimatePresence>
        {isInquiryOpen && (
          <InquiryPage onClose={() => setIsInquiryOpen(false)} />
        )}
      </AnimatePresence>

      {/* Main Interactive Layers - slides completely right to reveal the full page drawer */}
      <motion.div 
        animate={{ 
          x: isInquiryOpen ? "100%" : "0%",
          scale: isInquiryOpen ? 0.95 : 1,
          filter: isInquiryOpen ? "brightness(0.5) blur(2px)" : "none",
        }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 origin-right transition-[filter]"
      >
        <FlowArt>
          {/* Section 1: Hero Editorial Masthead */}
          <FlowSection className="bg-garabel-bg" aria-label="Atelier Garabel Entry">
            <StudioBanner />
          </FlowSection>

          {/* Section 2: Interactive Tactile Substrate Calibration Bench */}
          <FlowSection className="bg-garabel-kraft" aria-label="Creative Material Lab">
            <CardboardCustomizer 
              params={params} 
              onChange={setParams}
              grainMovement={grainMovement}
              setGrainMovement={setGrainMovement}
              activeThemeId={themeId}
              onThemeChange={setThemeId}
            />
          </FlowSection>

          {/* Section 3: Curated Collaborations & Sample Ledger */}
          <FlowSection className="bg-garabel-sand" aria-label="Bespoke Portfolio">
            <ProjectShowcase />
          </FlowSection>

          {/* Section 4: Estimator Spec Desk Sheet */}
          <FlowSection className="bg-garabel-cream" aria-label="Interactive Spec Desk">
            <CreativeDesk onAddCustomDesign={handleAddCustomDesignToCart} />
          </FlowSection>

          {/* Section 5: Premium Swatch Remnants dispatch Desk */}
          <FlowSection className="bg-garabel-light" aria-label="Tactile Swatch Shop">
            <AtelierStore cart={cart} setCart={setCart} />
          </FlowSection>

          {/* Section 6: Manifesto Reading & Lunar Subscriptions Box */}
          <FlowSection className="bg-garabel-bg" aria-label="Journal Publications">
            <StudioFooter />
          </FlowSection>
        </FlowArt>
      </motion.div>
    </div>
  );
}
