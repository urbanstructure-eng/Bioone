import { useState } from "react";
import { Sparkles, ArrowUpRight, Copy, Check, Terminal, Mail, Info, Palette, ShieldCheck, ShoppingCart } from "lucide-react";
import { Service, AICustomDesign } from "../types";

const SERVICES_DATA: Service[] = [
  {
    id: "material-innov",
    num: "01",
    title: "BIODEGRADABLE MATERIALS",
    description: "Developing pristine compostable substrates using giant bamboo pulp, secondary agricultural hemp, and post-consumer heavy fibers. We engineer raw unbleached cardboards that dissolve gracefully into organic soil.",
    specialty: ["Organic Pulp & Hemp Substrates", "Fully Compostable Fibers", "Naturally Acid-Free Material Bases"],
  },
  {
    id: "luxury-embellish",
    num: "02",
    title: "PREMIUM CRAFTSMANSHIP",
    description: "Elevating brand perception through structural geometry, flawless magnetic locks, child-resistant fiber hinges, and elite debossing. We replace metallic foils with zero-emission soy heat-stamps.",
    specialty: ["Blind Embossing & Hot Soy Foils", "Scent-Locking Barrier Chemistry", "Custom Geometry Modeling"],
  },
  {
    id: "zero-emission",
    num: "03",
    title: "ZERO-EMISSION FUTURE",
    description: "Operating on a closed-loop vision. From renewable manufacturing energy to strict plastic elimination, we configure transport-optimized collapsing layouts that minimize global shipping carbon prints.",
    specialty: ["Carbon-Conscious Offsets", "100% Certified Plastic Reduction", "Collapsible Storage Architectures"],
  },
];

interface CreativeDeskProps {
  onAddCustomDesign?: (design: AICustomDesign) => void;
}

export default function CreativeDesk({ onAddCustomDesign }: CreativeDeskProps) {
  const [scope, setScope] = useState<"liner" | "rigid" | "carrier">("liner");
  const [theme, setTheme] = useState<"hemp" | "bamboo" | "recycled">("hemp");
  const [focus, setFocus] = useState<"composite" | "carbon" | "plastic">("composite");

  // AI Luxury Branding Customization states
  const [brandName, setBrandName] = useState("Vaso Atelier");
  const [aiStyle, setAiStyle] = useState<"aesop" | "louis" | "frama" | "apple">("aesop");
  const [aiPromptText, setAiPromptText] = useState(
    "Japanese-inspired cosmetic casket with a warm sand hue base, minimal blind embossed botanical outline, and delicate black soy ink typography."
  );

  // Smart options
  const [smartChip, setSmartChip] = useState<boolean>(true);
  const [smallBatch, setSmallBatch] = useState<boolean>(false);
  const [fastFulfillment, setFastFulfillment] = useState<boolean>(true);
  const [carbonNeutral, setCarbonNeutral] = useState<boolean>(true);
  const [reusableHybrid, setReusableHybrid] = useState<boolean>(true);
  const [studioIncluded, setStudioIncluded] = useState<boolean>(true);

  // New Generation States
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [generatedDesign, setGeneratedDesign] = useState<AICustomDesign | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [addedNotify, setAddedNotify] = useState(false);

  // High-end calculated metrics for standard luxury billing blueprint
  const baseVolume = smallBatch ? 100 : (scope === "liner" ? 10000 : scope === "rigid" ? 5000 : 25000);
  const carbonSavedBase = theme === "hemp" ? 84 : theme === "bamboo" ? 92 : 78;
  const carbonSaved = carbonSavedBase + (carbonNeutral ? 6 : 0) + (reusableHybrid ? 2 : 0);
  const substrateSpecs = scope === "liner" ? "320gsm Embossed Soufflé Pulp" : scope === "rigid" ? "420gsm Kraft Coreboard" : "350gsm Raw Hemp Weft";

  const getBriefLetter = () => {
    const scopeStr = scope === "liner" ? "Molded Pulp Skincare Compartment Liners" : scope === "rigid" ? "Rigid Custom Cardboard Boxes (Luxury Magnetic)" : "Embossed Biodegradable Fashion Carriers";
    const themeStr = theme === "hemp" ? "Raw Organic Agricultural Hemp" : theme === "bamboo" ? "Rapid-Growth Giant Bamboo Pulp" : "Recycled Post-Consumer Greymeal Fibers";
    const focusStr = focus === "composite" ? "100% Soil Compostable (Zero Residual Waste)" : focus === "carbon" ? "Zero-Emission Manufacturing offset index" : "100% Certified Plastic-Free Sealant Locks";

    const aiStyleLabel = aiStyle === "aesop" ? "Aesop Natural Minimalist (Teas & Spices Ink)" : aiStyle === "louis" ? "Monogram Embossed Prestige (Gold Wheat Foil)" : aiStyle === "frama" ? "Wabi-Sabi Organic Tone (Charcoal Ash Paint)" : "Apple White Precision (Minimal Sand Tint)";
    const smartChipStr = smartChip ? "EMBEDDED (Under-paper NFC tag & laser embossed QR link)" : "NONE";
    const smallBatchStr = smallBatch ? "YES (Custom Small-batch crafted, starting at 100 units)" : "GLOBAL PRODUCTION SCALE";
    const fastFulfillmentStr = fastFulfillment ? "ACTIVE (Ultra-fast 24h custom regional dispatch)" : "STANDARD (12 Business Days)";
    const carbonNeutralStr = carbonNeutral ? "COMPLIANT (Verified Carbon-Neutral Cargo Courier Network)" : "STANDARD LOGISTICS";
    const reusableHybridStr = reusableHybrid ? "ENABLED (Structure turns into premium countertop vanity shelf organizer)" : "SINGLE USE ONLY";
    const studioIncludedStr = studioIncluded ? "INCLUDED (Complimentary bespoke vector blueprinting, vector drafts, & material sampling)" : "BLUEPRINT MANUAL ONLY";

    return `DEAR ATELIER GARABEL PACKAGING DESK,

I am writing to initiate an official corporate inquiry for a custom sustainable packaging solution under the following luxury parameters:

- MODEL SPECIFICATION: GB-PKG-2026 ${scopeStr}
- SUSTAINABLE FIBER SUBSTRATE: ${themeStr}
- CORE ENVIRONMENTAL FOCUS: ${focusStr}

--- ADVANCED LUXURY SPECIFICATIONS & SOLUTIONS ---
- AI BRANDING STYLE: ${aiStyleLabel}
- QR/NFC SMART CHIPS: ${smartChipStr}
- PRODUCTION STRATEGY: ${smallBatchStr}
- FULFILLMENT VELOCITY: ${fastFulfillmentStr}
- LOGISTICS FOOTPRINT: ${carbonNeutralStr}
- REUSABLE HYBRID ARCHITECTURE: ${reusableHybridStr}
- CREATIVE DESIGN STUDIO: ${studioIncludedStr}

Please evaluate this initial specification sheet during your next workshop review. We look forward to receiving a physical material replica and elite layout swatch.

WARMEST ECO-LUXE REGARDS.`;
  };

  const handleCopyInquiry = () => {
    navigator.clipboard.writeText(generatedDesign 
      ? `BRAND PROTOTYPE ORDER BLUEPRINT:\n${JSON.stringify(generatedDesign, null, 2)}`
      : getBriefLetter()
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Triggers Gemini AI Generative Workshop logic
  const handleGenerateAiDesign = async () => {
    if (!brandName.trim() || !aiPromptText.trim()) {
      setAiError("Please fill in Brand Name and Creative Directions.");
      return;
    }

    setIsAiGenerating(true);
    setAiError(null);
    setGeneratedDesign(null);

    try {
      const scopeLabel = scope === "liner" ? "Molded Pulp Liner" : scope === "rigid" ? "Rigid Luxury Box" : "Embossed Shopping Tote";
      const materialLabel = theme === "hemp" ? "Heavy Agri-Hemp" : theme === "bamboo" ? "Alabaster Bamboo" : "Post-Consumer Fluted Board";

      const res = await fetch("/api/generate-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName: brandName.trim(),
          packagingType: scopeLabel,
          ecoMaterial: materialLabel,
          promptText: aiPromptText.trim()
        }),
      });

      if (!res.ok) {
        throw new Error("Our layout workshop is busy. Please verify your connection details and try again.");
      }

      const data = await res.json();
      
      const designResult: AICustomDesign = {
        ...data,
        id: `AI-PKG-${Math.floor(100000 + Math.random() * 900000)}`,
        brandName: brandName.trim(),
        packagingType: scopeLabel,
        ecoMaterial: materialLabel,
        promptText: aiPromptText.trim()
      };

      setGeneratedDesign(designResult);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Failed to finalize generated luxury design.");
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleAddPrototypeToCart = () => {
    if (generatedDesign && onAddCustomDesign) {
      onAddCustomDesign(generatedDesign);
      setAddedNotify(true);
      setTimeout(() => setAddedNotify(false), 3000);
    }
  };

  return (
    <section 
      id="services-section" 
      className="relative w-full max-w-7xl mx-auto px-6 py-12 md:py-24 z-10 border-t border-garabel-ink/10 select-none animate-fadeIn"
    >
      {/* Structural Headers */}
      <div className="max-w-xl mb-12 md:mb-16">
        <span className="block font-mono text-[10px] tracking-widest text-garabel-accent uppercase mb-2 md:mb-3">
          MANUFACTURING VISION // CORE DESIGN PILLARS
        </span>
        <h2 className="text-3xl md:text-5xl font-sans font-light tracking-tight text-garabel-ink">
          The columns of <span className="italic font-normal text-garabel-mid">quiet craft</span>.
        </h2>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 md:mb-24">
        {SERVICES_DATA.map((s) => (
          <div 
            key={s.id}
            className="group relative rounded-lg border border-garabel-ink/10 bg-garabel-sand bg-opacity-20 p-8 hover:bg-opacity-40 transition-all duration-500 shadow-craft-sm hover:shadow-craft-md flex flex-col justify-between"
          >
            {/* Texture */}
            <div className="absolute inset-0 paper-grain pointer-events-none opacity-10"></div>
            <div className="absolute inset-0 border-double-cut pointer-events-none rounded-lg"></div>

            <div>
              <div className="flex justify-between items-baseline mb-6 border-b border-garabel-ink/10 pb-4">
                <span className="font-mono text-xs text-garabel-accent font-semibold tracking-wider">
                  [{s.num}]
                </span>
                <span className="font-mono text-[9px] text-garabel-mid tracking-widest uppercase">
                  ACTIVE PACKAGING LABORATORY
                </span>
              </div>

              <h3 className="text-2xl font-sans font-light tracking-tight text-garabel-ink mb-4 group-hover:text-garabel-accent transition-colors">
                {s.title}
              </h3>

              <p className="text-xs md:text-sm font-sans font-light text-garabel-mid leading-relaxed mb-8">
                {s.description}
              </p>
            </div>

            <div>
              <span className="block font-mono text-[9px] tracking-widest text-garabel-ink font-semibold uppercase mb-3">
                CORE TECHNICAL REFINEMENTS:
              </span>
              <ul className="space-y-1.5 border-t border-dashed border-garabel-ink/10 pt-3">
                {s.specialty.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 font-mono text-[9px] text-garabel-mid tracking-wide">
                    <span className="w-1.5 h-1.5 bg-garabel-accent opacity-50 rounded-full"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Inquiry Lab Bench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-t border-garabel-ink/10 pt-16 md:pt-24">
        
        {/* Left Bench Selection Pane */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-garabel-ink/10 bg-garabel-sand bg-opacity-30 font-mono text-[9px] text-garabel-mid tracking-widest uppercase mb-4">
              <Terminal className="w-3.5 h-3.5" />
              <span>INTERACTIVE ECO-LUXE ESTIMATION DESK</span>
            </span>
            <h3 className="text-2xl md:text-4xl font-sans font-light tracking-tight text-garabel-ink mb-4">
              Draft your custom <span className="italic font-normal text-garabel-mid">material blueprint</span>.
            </h3>
            <p className="text-xs md:text-sm font-sans font-light text-garabel-mid leading-relaxed max-w-lg">
              Toggle our premium structural specifications representing your brand's environmental and visual ambitions. Experience luxury design with zero compromise.
            </p>
          </div>

          <div className="space-y-6">
            {/* Step 1: Scope */}
            <div className="space-y-3">
              <span className="block font-mono text-[9px] tracking-widest text-garabel-ink font-bold uppercase">
                01 // SELECT RECONSTRUCTED FORMAT (SCOPE):
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "liner", label: "MOLDED CORE COMPARTMENT", sub: "For cosmetics & skincare flacons" },
                  { id: "rigid", label: "RIGID HEAVY BOXCARD", sub: "For luxury fashion & cannabis kits" },
                  { id: "carrier", label: "EMBOSSED SHOPPING TOTE", sub: "For retail & beverage bottles" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setScope(item.id as any)}
                    className={`relative p-4 rounded text-left border cursor-pointer transition-all duration-300 ${
                      scope === item.id
                        ? "border-garabel-ink bg-garabel-ink text-garabel-cream shadow-craft-md animate-pulse-once"
                        : "border-garabel-ink/10 bg-garabel-cream bg-opacity-30 hover:bg-opacity-70 text-garabel-ink"
                    }`}
                  >
                    <div className="absolute inset-x-0 bottom-0 top-0 paper-grain pointer-events-none opacity-[0.06]"></div>
                    <span className="block font-mono text-[9.5px] font-semibold tracking-wider mb-1 leading-tight">{item.label}</span>
                    <span className="block font-sans text-[8px] text-garabel-accent text-opacity-80 leading-normal">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Substrate Theme */}
            <div className="space-y-3">
              <span className="block font-mono text-[9px] tracking-widest text-garabel-ink font-bold uppercase">
                02 // SELECT PREMIUM BIO-SUBSTRATE BASE:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "hemp", label: "HEAVY AGR-HEMP", spec: "350gsm Coarse Fiber" },
                  { id: "bamboo", label: "ALABASTER BAMBOO", spec: "320gsm Light Pulp" },
                  { id: "recycled", label: "POST-CONSUMER FLUTE", spec: "480gsm Fluted Board" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTheme(item.id as any)}
                    className={`relative p-4 rounded text-left border cursor-pointer transition-all duration-300 ${
                      theme === item.id
                        ? "border-garabel-ink bg-garabel-ink text-garabel-cream shadow-craft-md animate-pulse-once"
                        : "border-garabel-ink/10 bg-garabel-cream bg-opacity-30 hover:bg-opacity-70 text-garabel-ink"
                    }`}
                  >
                    <div className="absolute inset-x-0 bottom-0 top-0 paper-grain pointer-events-none opacity-[0.06]"></div>
                    <span className="block font-mono text-[9.5px] font-semibold tracking-wider mb-1 leading-tight">{item.label}</span>
                    <span className="block font-mono text-[8px] text-garabel-mid text-opacity-80 leading-none">{item.spec}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: AI Brand Customizer Section */}
            <div className="space-y-4 pt-4 border-t border-dashed border-garabel-ink/10">
              <div className="flex justify-between items-center">
                <span className="block font-mono text-[9px] tracking-widest text-garabel-ink font-bold uppercase">
                  03 // ✦ ECO-LUXE AI DESIGN GENERATION
                </span>
                <span className="px-2 py-0.5 font-mono text-[8.5px] text-garabel-accent bg-garabel-accent bg-opacity-10 uppercase font-semibold tracking-widest rounded">
                  GEMINI-3.5 POWERED WORKSHOP
                </span>
              </div>
              
              <div className="p-5 rounded-lg border border-garabel-accent/20 bg-[#fcfaf5] shadow-craft-md relative overflow-hidden space-y-4">
                <div className="absolute inset-0 paper-grain pointer-events-none opacity-[0.06]"></div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[8.5px] font-bold text-garabel-ink uppercase tracking-wider">
                      BRAND INITIALS / NAME:
                    </label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="e.g. Vaso Atelier"
                      className="w-full px-3 py-2.5 rounded border border-garabel-ink/15 bg-white font-mono text-[11.5px] text-garabel-ink focus:border-garabel-accent outline-none font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[8.5px] font-bold text-garabel-ink uppercase tracking-wider">
                      DESIGN STYLE DIRECTORY:
                    </label>
                    <select
                      value={aiStyle}
                      onChange={(e) => setAiStyle(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded border border-garabel-ink/15 bg-white font-mono text-[11px] text-garabel-ink focus:border-garabel-accent outline-none"
                    >
                      <option value="aesop">Aesop Botanical Minimalist</option>
                      <option value="louis">Monogram Prestige Luxe</option>
                      <option value="frama">Wabi-Sabi Raw Ash</option>
                      <option value="apple">Precision Modern Slate</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-[8.5px] font-bold text-garabel-ink uppercase tracking-wider">
                    BESPOKE BLUEPRINT VISION ENVELOPE:
                  </label>
                  <textarea
                    value={aiPromptText}
                    onChange={(e) => setAiPromptText(e.target.value)}
                    rows={3}
                    placeholder="Provide specific aesthetic, texture ambitions or geometric focuses (e.g. blind embossed gold motifs, sand slate tone texture)..."
                    className="w-full px-3 py-2 rounded border border-garabel-ink/15 bg-white font-sans text-xs text-garabel-ink focus:border-garabel-accent outline-none resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleGenerateAiDesign}
                  disabled={isAiGenerating || !brandName || !aiPromptText}
                  className="w-full flex items-center justify-center gap-2.5 py-3 rounded bg-garabel-accent text-white font-mono text-[10px] uppercase tracking-widest hover:bg-opacity-95 active:scale-[0.99] transition-all cursor-pointer shadow-craft-md disabled:bg-opacity-30 disabled:cursor-not-allowed"
                >
                  {isAiGenerating ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>CRAFTING AI PACKAGING LAYOUT...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-garabel-cream" />
                      <span>✦ GENERATE CUSTOM DESIGN ATELIER SAMPLE</span>
                    </>
                  )}
                </button>

                {aiError && (
                  <div className="p-3 bg-red-500/5 border border-red-500/20 text-red-800 font-mono text-[9px] uppercase tracking-wider rounded">
                    PROTOTYPE WORKBENCH TIMEOUT: {aiError}
                  </div>
                )}
              </div>
            </div>

            {/* Step 4: Toggle Premium Smart & Eco Customizations */}
            <div className="space-y-3 border-t border-dashed border-garabel-ink/10 pt-5">
              <span className="block font-mono text-[9px] tracking-widest text-garabel-ink font-bold uppercase mb-2">
                04 // CALIBRATE PREMIUM ECO-SMART INTEGRATIONS:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSmallBatch(!smallBatch)}
                  className={`p-3 rounded text-left border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    smallBatch 
                      ? "border-garabel-accent bg-garabel-accent bg-opacity-10 text-garabel-ink" 
                      : "border-garabel-ink/10 bg-transparent text-garabel-mid"
                  }`}
                >
                  <span className="font-mono text-[9px] font-bold tracking-wider">SMALL-BATCH PRESET</span>
                  <span className="font-sans text-[8px] opacity-85 leading-normal mt-1">Starts at 100 boxes instead of 5,000 standard runs.</span>
                  <span className="font-mono text-[7.5px] mt-2 font-bold uppercase tracking-wider text-garabel-accent">
                    {smallBatch ? "● COMPACT ACTIVE (100 UNITS)" : "○ STANDARD LEADING"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSmartChip(!smartChip)}
                  className={`p-3 rounded text-left border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    smartChip 
                      ? "border-garabel-accent bg-garabel-accent bg-opacity-10 text-garabel-ink" 
                      : "border-garabel-ink/10 bg-transparent text-garabel-mid"
                  }`}
                >
                  <span className="font-mono text-[9px] font-bold tracking-wider">QR/NFC SMART CHIP</span>
                  <span className="font-sans text-[8px] opacity-85 leading-normal mt-1">Invisible high-end links pressed under biodegradable pulps.</span>
                  <span className="font-mono text-[7.5px] mt-2 font-bold uppercase tracking-wider text-garabel-accent">
                    {smartChip ? "● CHIP EMBEDDED" : "○ ANALOG FIBER"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setFastFulfillment(!fastFulfillment)}
                  className={`p-3 rounded text-left border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    fastFulfillment 
                      ? "border-garabel-accent bg-garabel-accent bg-opacity-10 text-garabel-ink" 
                      : "border-garabel-ink/10 bg-transparent text-garabel-mid"
                  }`}
                >
                  <span className="font-mono text-[9px] font-bold tracking-wider">FAST 24-48h FULFILLMENT</span>
                  <span className="font-sans text-[8px] opacity-85 leading-normal mt-1">Surgical priority layouting and prototyping in regional hubs.</span>
                  <span className="font-mono text-[7.5px] mt-2 font-bold uppercase tracking-wider text-garabel-accent">
                    {fastFulfillment ? "● 24H VELOCITY ACTIVE" : "○ STANDARD SPEED"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setCarbonNeutral(!carbonNeutral)}
                  className={`p-3 rounded text-left border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    carbonNeutral 
                      ? "border-garabel-accent bg-garabel-accent bg-opacity-10 text-garabel-ink" 
                      : "border-garabel-ink/10 bg-transparent text-garabel-mid"
                  }`}
                >
                  <span className="font-mono text-[9px] font-bold tracking-wider">CARBON-NEUTRAL CARGO</span>
                  <span className="font-sans text-[8px] opacity-85 leading-normal mt-1">Offset courier network using local green-cargo fleets.</span>
                  <span className="font-mono text-[7.5px] mt-2 font-bold uppercase tracking-wider text-garabel-accent">
                    {carbonNeutral ? "● VERIFIED CLIMATE NETU" : "○ STANDARD CARGO"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setReusableHybrid(!reusableHybrid)}
                  className={`p-3 rounded text-left border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    reusableHybrid 
                      ? "border-garabel-accent bg-garabel-accent bg-opacity-10 text-garabel-ink" 
                      : "border-garabel-ink/10 bg-transparent text-garabel-mid"
                  }`}
                >
                  <span className="font-mono text-[9px] font-bold tracking-wider">REUSABLE HYBRID FRAME</span>
                  <span className="font-sans text-[8px] opacity-85 leading-normal mt-1">Cardboard structures convertible to keepsake vanity drawer.</span>
                  <span className="font-mono text-[7.5px] mt-2 font-bold uppercase tracking-wider text-garabel-accent">
                    {reusableHybrid ? "● REUSABLE HARNESS ON" : "○ RECYCLABLE CORE"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setStudioIncluded(!studioIncluded)}
                  className={`p-3 rounded text-left border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    studioIncluded 
                      ? "border-garabel-accent bg-garabel-accent bg-opacity-10 text-garabel-ink" 
                      : "border-garabel-ink/10 bg-transparent text-garabel-mid"
                  }`}
                >
                  <span className="font-mono text-[9px] font-bold tracking-wider">DESIGN STUDIO SERVICES</span>
                  <span className="font-sans text-[8px] opacity-85 leading-normal mt-1">Complimentary packaging layout consulting & master swatches.</span>
                  <span className="font-mono text-[7.5px] mt-2 font-bold uppercase tracking-wider text-garabel-accent">
                    {studioIncluded ? "● STUDIO ACTIVE" : "○ MANUAL WORKSHOP"}
                  </span>
                </button>
              </div>
            </div>

            {/* Local manufacturing note */}
            <div className="p-4 rounded border border-garabel-ink/10 bg-garabel-sand bg-opacity-30 flex items-start gap-3">
              <span className="font-mono text-[9px] text-garabel-accent font-bold mt-0.5 shrink-0">● LOCAL MANUFACTURING:</span>
              <p className="font-sans text-xs font-light text-garabel-mid leading-relaxed">
                Assembled locally directly at regional micro-luxe bureaus in <span className="font-semibold text-garabel-ink font-mono text-[10.5px]">MUNICH</span>, <span className="font-semibold text-garabel-ink font-mono text-[10.5px]">COPENHAGEN</span>, & <span className="font-semibold text-garabel-ink font-mono text-[10.5px]">TOKYO</span> to eliminate continental cargo emission waste.
              </p>
            </div>
          </div>
        </div>

        {/* Right Craft Ticket (Dynamic depending on whether AI custom design is generated) */}
        <div className="lg:col-span-5 relative">
          
          {generatedDesign ? (
            /* ✦ BESPOKE GENERATED AI PROTOTYPE RESULT CARD */
            <div className="relative rounded-lg border-2 border-garabel-accent/40 bg-white p-6 md:p-8 shadow-craft-2xl overflow-hidden animate-scaleUp">
              <div className="absolute inset-0 paper-grain pointer-events-none opacity-20"></div>
              <div className="absolute inset-0 cardboard-fibres pointer-events-none opacity-[0.05]"></div>
              
              {/* Luxury Frame Border */}
              <div className="absolute inset-1.5 border border-garabel-accent/15 pointer-events-none rounded"></div>

              <div className="relative z-10 space-y-5">
                
                {/* Visual Gold Stamp Badge */}
                <div className="flex justify-between items-start border-b border-dashed border-garabel-ink/15 pb-4">
                  <div>
                    <span className="block font-mono text-[8.5px] text-garabel-accent font-bold tracking-widest uppercase">
                      ✦ BESPOKE PROTOTYPE SWATCH
                    </span>
                    <h4 className="font-sans text-xs font-bold text-garabel-ink uppercase tracking-wide mt-1">
                      {generatedDesign.aestheticStyleName}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="block font-mono text-[8px] text-stone-400 tracking-wider">
                      DOC-NUM ID
                    </span>
                    <span className="block font-mono text-[10px] text-garabel-ink font-bold">
                      {generatedDesign.id}
                    </span>
                  </div>
                </div>

                {/* Simulated Visual Layout Card of the Design */}
                <div className="p-5 rounded border border-garabel-ink/10 bg-garabel-sand bg-opacity-15 relative space-y-4">
                  
                  {/* Subtle color palette visual dots */}
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[8px] text-garabel-mid uppercase tracking-widest">
                      Visual Palette Scheme:
                    </span>
                    <div className="flex gap-2">
                      {generatedDesign.colorPalette.map((hex, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <div 
                            className="w-4 h-4 rounded-full border border-garabel-ink/15 shadow-craft-sm"
                            style={{ backgroundColor: hex }}
                          />
                          <span className="font-mono text-[7px] text-garabel-mid uppercase tracking-tight">{hex}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Laser layout display */}
                  <div className="py-4 px-2 border-y border-dashed border-garabel-ink/10 text-center space-y-2">
                    <span className="font-mono text-[9px] text-stone-400 tracking-widest block">
                      — SUGGESTED DESIGN TAGLINE —
                    </span>
                    <p className="font-sans font-light text-base md:text-lg text-garabel-accent tracking-widest leading-normal">
                      "{generatedDesign.suggestedTagline}"
                    </p>
                    <span className="font-mono text-[10px] text-stone-900 font-bold block tracking-wider uppercase mt-1">
                      {generatedDesign.brandName}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="block font-mono text-[8px] text-garabel-mid uppercase tracking-wide">
                      Aesthetic Diagnosis:
                    </span>
                    <p className="font-sans text-xs font-light text-garabel-ink leading-relaxed italic">
                      "{generatedDesign.designAnalysis}"
                    </p>
                  </div>
                </div>

                {/* Specs breakdown list */}
                <div className="space-y-2 text-[9px] font-mono tracking-wider text-garabel-mid bg-stone-50 p-4 rounded border border-stone-200/50">
                  <div className="flex justify-between">
                    <span>RECOMMENDED SUBSTRATE:</span>
                    <span className="text-garabel-ink font-semibold uppercase">{generatedDesign.recommendedSubstrate}</span>
                  </div>
                  <div className="flex justify-between border-t border-stone-200/50 pt-2">
                    <span>CUSTOM CRAFT BLUEPRINT:</span>
                    <span className="text-garabel-ink font-semibold uppercase">{generatedDesign.prototypeSpecs}</span>
                  </div>
                  <div className="flex justify-between border-t border-stone-200/50 pt-2">
                    <span>ECO DEGRADATION RATE:</span>
                    <span className="text-emerald-800 font-bold">100% COMPOSTED IN 90 DAYS</span>
                  </div>
                  <div className="flex justify-between border-t border-stone-200/50 pt-2 text-[10.5px] border-b pb-2">
                    <span className="font-bold text-stone-900">PROTOTYPE SAMPLE PRICE:</span>
                    <span className="text-garabel-accent font-bold">${generatedDesign.estimatedPrice}.00 USD</span>
                  </div>
                </div>

                {/* PayPal Order action button */}
                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={handleAddPrototypeToCart}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded bg-garabel-ink text-garabel-cream font-mono text-[10px] uppercase tracking-widest hover:bg-opacity-95 active:scale-[0.99] transition-all cursor-pointer shadow-craft-lg"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-garabel-accent" />
                    <span>✦ Add Custom Plan to PayPal Order</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGeneratedDesign(null)}
                    className="w-full py-2.5 rounded border border-stone-200 text-stone-500 font-mono text-[9px] uppercase tracking-widest hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    Reset & Recalibrate Canvas
                  </button>
                </div>

                {addedNotify && (
                  <div className="p-3 bg-emerald-50 border border-emerald-500/15 text-emerald-800 font-mono text-[8.5px] tracking-wide text-center uppercase rounded flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Slickly Added to PayPal Active Cart Deck below. Scrolling down...</span>
                  </div>
                )}

                {/* Swatch info dispatch */}
                <div className="flex items-start gap-1 text-[8px] font-mono text-garabel-mid opacity-60 leading-normal border-t pt-3">
                  <Info className="w-3 h-3 text-garabel-accent shrink-0 mt-0.5" />
                  <span>The custom estimated layout is stamped with an active ID that maps to our laser unbleached soy inks and physical pulp press plates during regional manufacturing.</span>
                </div>

              </div>
            </div>
          ) : (
            /* STANDARD BLUEPRINT ESTIMATE TICKET */
            <div className="relative rounded-lg border border-garabel-ink/15 bg-garabel-cream p-6 md:p-8 shadow-craft-lg overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 paper-grain pointer-events-none opacity-20"></div>
              <div className="absolute inset-0 cardboard-fibres pointer-events-none opacity-[0.08]"></div>
              
              <div className="absolute inset-0 border-double-cut pointer-events-none rounded-lg"></div>

              <div className="relative z-10 space-y-6">
                
                <div className="flex justify-between items-start border-b border-dashed border-garabel-ink/15 pb-4">
                  <div>
                    <span className="block font-mono text-[9px] text-garabel-ink font-bold tracking-widest">
                      ATELIER-GARABEL PKG
                    </span>
                    <span className="block font-mono text-[8.5px] text-stone-400 font-semibold uppercase">
                      Estimator Desk
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block font-mono text-[9px] text-garabel-accent font-bold tracking-widest uppercase">
                      ESTIMATE SPEC
                    </span>
                    <span className="block font-mono text-[8px] text-garabel-mid tracking-wider">
                      HUB: REGIONAL PLATES
                    </span>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-[9px] tracking-wider text-garabel-mid border-b border-dashed border-garabel-ink/15 pb-6">
                  <div className="flex justify-between">
                    <span>CARBON DEDUCTION GAIN:</span>
                    <span className="text-garabel-ink font-semibold">-{carbonSaved}% CO2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MINIMUM PRODUCTION VOLUME:</span>
                    <span className="text-garabel-ink font-semibold">{baseVolume.toLocaleString()} UNITS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SUBSTRATE SELECTION:</span>
                    <span className="text-garabel-ink font-semibold">{substrateSpecs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>QR/NFC CHIPS DETECTED:</span>
                    <span className={`font-semibold ${smartChip ? "text-garabel-accent font-bold" : "text-garabel-mid"}`}>
                      {smartChip ? "YES (EMBEDDED)" : "NONE"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>FULFILLMENT VELOCITY:</span>
                    <span className="text-garabel-ink font-semibold">
                      {fastFulfillment ? "24H-48H PRIORITY DISPATCH" : "STANDARD (12 DAYS)"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>HYBRID REUSABLE ENCLOSURE:</span>
                    <span className="text-garabel-ink font-semibold">
                      {reusableHybrid ? "MULTIPLE USE LIFE CYCLE" : "SINGLE WASTE CYCLE"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>CREATIVEblue BluePRINT STUDIO:</span>
                    <span className="text-green-600 font-bold uppercase">
                      {studioIncluded ? "COMPLIMENTARY INC." : "MANUAL EXCELLENCE"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block font-mono text-[9px] text-garabel-ink font-bold tracking-wider">
                    PREVIEW SWATCH ESTIMATE SHEET:
                  </span>
                  <div className="p-3 bg-garabel-sand bg-opacity-30 border border-garabel-ink/5 rounded font-mono text-[8px] text-garabel-mid leading-relaxed break-all select-all h-[110px] overflow-y-auto custom-scrollbar">
                    {getBriefLetter()}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyInquiry}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded bg-garabel-ink text-garabel-cream font-mono text-[10px] uppercase tracking-widest hover:bg-opacity-95 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" />
                        <span>Copied Specification</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Spec. Blueprint</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:urbanstructure@gmail.com?subject=Sustainable%20Packaging%20Inquiry%20Specification&body=${encodeURIComponent(getBriefLetter())}`}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded border border-garabel-ink/15 text-garabel-ink font-mono text-[10px] uppercase tracking-widest hover:bg-garabel-sand transition-colors text-center border-double"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span>Request Swatch Quote Info</span>
                  </a>
                </div>

                <div className="flex items-start gap-1 text-[8px] font-mono text-garabel-mid opacity-60 leading-normal">
                  <Info className="w-3 h-3 text-garabel-accent shrink-0 mt-0.5" />
                  <span>Our structural layout engineers transmit beautiful real samples cardboard boxes to luxury brands within 5 business days. Your inquiry details are secure.</span>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
