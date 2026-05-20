import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MaterialParams, UnifiedCartItem, AICustomDesign } from "./types";
import StudioBanner from "./components/StudioBanner";
import CardboardCustomizer from "./components/CardboardCustomizer";
import ProjectShowcase from "./components/ProjectShowcase";
import CreativeDesk from "./components/CreativeDesk";
import AtelierStore from "./components/AtelierStore";
import StudioFooter from "./components/StudioFooter";
import CartDrawer from "./components/CartDrawer";
import { FlowArt, FlowSection } from "./components/FlowArt";

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
      
      {/* Global Static Top Left Branding Logo (30% larger, fixed in place across cards) */}
      <motion.div 
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-6 md:top-8 md:left-10 z-50 pointer-events-auto cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img
          src="https://lh3.googleusercontent.com/d/1U3YfW75P9JyKKTCWA7yoM31HCTW9L0fN"
          alt="Atelier Garabel"
          referrerPolicy="no-referrer"
          className="h-[52px] sm:h-[62px] w-auto object-contain select-none animate-fadeIn"
        />
      </motion.div>

      {/* Floating Quiet-Luxe Shopping Drawer Pin (Top Right) */}
      <CartDrawer cart={cart} setCart={setCart} />
      
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

      {/* Main Interactive Layers */}
      <div className="relative z-10">
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
      </div>
    </div>
  );
}
