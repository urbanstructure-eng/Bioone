import { useState } from "react";
import { Sliders, RefreshCw, AudioWaveform, HelpCircle, Flame, Eye, Sparkles } from "lucide-react";
import { MaterialParams } from "../types";

interface CardboardCustomizerProps {
  params: MaterialParams;
  onChange: (newParams: MaterialParams) => void;
  grainMovement: boolean;
  setGrainMovement: (val: boolean) => void;
  activeThemeId?: "kraft" | "moss" | "clay" | "linen";
  onThemeChange?: (id: "kraft" | "moss" | "clay" | "linen") => void;
}

// Highly elegant, zero-dependency audio click synth
function playClick(frequency = 800, duration = 0.04) {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // Very quick click
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    // pitch slide downwards for realistic tactile weight
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + duration);
    
    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    // Audio context may be blocked initially, fail gracefully
  }
}

export default function CardboardCustomizer({
  params,
  onChange,
  grainMovement,
  setGrainMovement,
  activeThemeId,
  onThemeChange,
}: CardboardCustomizerProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activePreset, setActivePreset] = useState<string>("raw");

  const updateParam = (key: keyof MaterialParams, value: number) => {
    onChange({
      ...params,
      [key]: value,
    });
    if (soundEnabled) {
      // Scale pitch with parameter value for interesting tactile response
      playClick(400 + value * 5, 0.03);
    }
  };

  const applyPreset = (presetName: string) => {
    let newParams: MaterialParams;
    if (presetName === "raw") {
      newParams = { grain: 24, warmth: 45, fibres: 35, shadowDepth: 60, crease: 20 };
      setGrainMovement(true);
    } else if (presetName === "editorial") {
      newParams = { grain: 12, warmth: 15, fibres: 10, shadowDepth: 40, crease: 10 };
      setGrainMovement(false);
    } else if (presetName === "brutalist") {
      newParams = { grain: 45, warmth: 70, fibres: 65, shadowDepth: 90, crease: 60 };
      setGrainMovement(true);
    } else {
      newParams = { grain: 8, warmth: 5, fibres: 5, shadowDepth: 20, crease: 5 };
      setGrainMovement(false);
    }
    setActivePreset(presetName);
    onChange(newParams);
    if (soundEnabled) playClick(1200, 0.1);
  };

  return (
    <section 
      id="interactive-bench" 
      className="relative w-full max-w-7xl mx-auto px-6 py-12 md:py-20 z-10 select-none"
    >
      <div className="relative rounded-xl border border-garabel-ink/10 bg-garabel-cream/70 backdrop-blur-md p-6 md:p-10 shadow-craft-lg overflow-hidden">
        {/* Absolute Background Accent Layers */}
        <div className="absolute inset-0 paper-grain pointer-events-none" style={{ opacity: params.grain / 100 }}></div>
        <div className="absolute inset-0 cardboard-fibres pointer-events-none" style={{ opacity: params.fibres / 100 }}></div>

        {/* Content Section */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
          
          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-garabel-ink/10 bg-garabel-sand/40 font-mono text-[9px] text-garabel-mid tracking-widest uppercase mb-4">
                <Sliders className="w-3" />
                <span>LAB COMPONENT // ATELIER-01</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-sans font-light tracking-tight text-garabel-ink leading-[1.1] mb-6">
                The Tactile <span className="italic font-normal text-garabel-mid">Material Lab</span>
              </h2>
              <p className="text-sm md:text-base text-garabel-mid font-sans font-light leading-relaxed mb-6">
                Our interface is responsive to physical print philosophy. Calibrate the raw cardboard substrate parameters below. Experience how fiber weight, paper warmth, or grain resonance dictate digital density.
              </p>
            </div>

            {/* Swatch & Presets Panels */}
            <div className="space-y-6">
              {/* 1. Botanical Swatch Dyes */}
              {activeThemeId && onThemeChange && (
                <div>
                  <span className="block font-mono text-[10px] tracking-widest text-[#aa6e54] !text-garabel-accent font-bold uppercase mb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-garabel-accent rounded-full animate-ping"></span>
                    <span>SELECT BOTANICAL HUE DYEWAY:</span>
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "kraft", label: "Natural Bamboo Kraft", subtitle: "01 // Clay Warmth", bg: "#e2d5c5", accent: "#aa6e54" },
                      { id: "moss", label: "Matcha Lichen Grass", subtitle: "02 // Forest Sage", bg: "#ccd7c8", accent: "#376332" },
                      { id: "clay", label: "Pottery Silt & Earth", subtitle: "03 // Baked Terracotta", bg: "#dfcabd", accent: "#b5613c" },
                      { id: "linen", label: "Alabaster Linen Coal", subtitle: "04 // Stone Chalk", bg: "#dfd0be", accent: "#9c7f55" },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          onThemeChange(s.id as any);
                          if (soundEnabled) playClick(650, 0.06);
                        }}
                        className={`flex items-center gap-2.5 p-2 rounded text-left border relative transition-all duration-300 cursor-pointer ${
                          activeThemeId === s.id
                            ? "border-garabel-accent bg-[#ffffff] bg-opacity-70 shadow-craft-md ring-1 ring-garabel-accent/15"
                            : "border-garabel-ink/10 bg-garabel-cream/30 hover:bg-garabel-sand/10"
                        }`}
                      >
                        <div className="flex shrink-0 items-center justify-center">
                          <div 
                            className="w-[22px] h-[22px] rounded-full border border-garabel-ink/10 shadow-sm flex items-center justify-center"
                            style={{ backgroundColor: s.bg }}
                          >
                            <div 
                              className="w-[10px] h-[10px] rounded-full"
                              style={{ backgroundColor: s.accent }}
                            />
                          </div>
                        </div>
                        <div className="leading-tight">
                          <span className="block font-sans text-[10px] font-bold text-garabel-ink">{s.label}</span>
                          <span className="block font-mono text-[7px] text-garabel-mid uppercase tracking-wide">{s.subtitle}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Calibration Presets */}
              <div>
                <span className="block font-mono text-[10px] tracking-widest text-garabel-mid uppercase mb-3 text-opacity-80">
                  SELECT EXPERIMENTAL SUBSTRATES:
                </span>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {[
                    { id: "raw", label: "01. NATURAL KRAFT" },
                    { id: "editorial", label: "02. SWISS SOUFFLÉ" },
                    { id: "brutalist", label: "03. RECYCLED INDENT" },
                    { id: "minimal", label: "04. ALABASTER BOARD" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => applyPreset(p.id)}
                      className={`relative p-3 text-left font-mono text-[9px] uppercase tracking-wider rounded border transition-all cursor-pointer ${
                        activePreset === p.id
                          ? "border-garabel-ink bg-garabel-ink text-garabel-cream"
                          : "border-garabel-ink/10 bg-garabel-cream/40 hover:bg-garabel-sand/20 text-garabel-ink"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extras indicators */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-garabel-mid">
                <button
                  onClick={() => {
                    setSoundEnabled(!soundEnabled);
                    playClick(900, 0.05);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-garabel-ink/10 transition-all cursor-pointer ${
                    soundEnabled ? "bg-garabel-accent/15 text-garabel-accent text-opacity-90 font-medium" : "bg-transparent opacity-60"
                  }`}
                >
                  <AudioWaveform className="w-3.5 h-3.5" />
                  <span>ACOUSTIC FEEDBACK: {soundEnabled ? "ON" : "OFF"}</span>
                </button>

                <button
                  onClick={() => {
                    setGrainMovement(!grainMovement);
                    playClick(600, 0.05);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-garabel-ink/10 transition-all cursor-pointer ${
                    grainMovement ? "bg-garabel-accent/15 text-garabel-accent text-opacity-90 font-medium" : "bg-transparent opacity-60"
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>GRAIN RESONANCE: {grainMovement ? "ACTIVE" : "STATIC"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Controls Side */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-garabel-ink/10 pt-10 lg:pt-0 lg:pl-12 xl:pl-16">
            <span className="block font-mono text-[10px] tracking-widest text-garabel-mid uppercase mb-6">
              MATERIAL SPECIFICATION CALIBRATION SHEET:
            </span>

            <div className="space-y-6 md:space-y-8">
              {/* Slider 1: Grain Depth */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase">
                  <span className="text-garabel-ink font-semibold">01 // PAPER GRAIN COARSE</span>
                  <span className="text-garabel-mid">{params.grain}%</span>
                </div>
                <div className="relative group flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={params.grain}
                    onChange={(e) => updateParam("grain", parseInt(e.target.value))}
                    className="w-full h-[3px] bg-garabel-ink/10 rounded-lg appearance-none cursor-ew-resize accent-garabel-ink group-hover:bg-garabel-ink/20 transition-colors"
                  />
                </div>
                <div className="flex justify-between items-center text-[8px] font-mono tracking-widest text-garabel-mid opacity-60">
                  <span>GLOSSY (0.00)</span>
                  <span>UNCOATED RECYCLED (1.00)</span>
                </div>
              </div>

              {/* Slider 2: Tactile Fibres */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase">
                  <span className="text-garabel-ink font-semibold">02 // ORGANIC TEXTILE FIBRES</span>
                  <span className="text-garabel-mid">{params.fibres}%</span>
                </div>
                <div className="relative group flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={params.fibres}
                    onChange={(e) => updateParam("fibres", parseInt(e.target.value))}
                    className="w-full h-[3px] bg-garabel-ink/10 rounded-lg appearance-none cursor-ew-resize accent-garabel-ink group-hover:bg-garabel-ink/20 transition-colors"
                  />
                </div>
                <div className="flex justify-between items-center text-[8px] font-mono tracking-widest text-garabel-mid opacity-60">
                  <span>BLEACHED PULP (0.00)</span>
                  <span>RAW CHIPPED CARDBOARD (1.00)</span>
                </div>
              </div>

              {/* Slider 3: Cardboard Warmth */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase">
                  <span className="text-garabel-ink font-semibold">03 // SUBSTRATE WARMTH TINT</span>
                  <span className="text-garabel-mid">{params.warmth}%</span>
                </div>
                <div className="relative group flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={params.warmth}
                    onChange={(e) => updateParam("warmth", parseInt(e.target.value))}
                    className="w-full h-[3px] bg-garabel-ink/10 rounded-lg appearance-none cursor-ew-resize accent-garabel-ink group-hover:bg-garabel-ink/20 transition-colors"
                  />
                </div>
                <div className="flex justify-between items-center text-[8px] font-mono tracking-widest text-garabel-mid opacity-60">
                  <span>ALABASTER SLATE</span>
                  <span>NATURAL BROWN KRAFT</span>
                </div>
              </div>

              {/* Slider 4: Tactile Depth shadows */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase">
                  <span className="text-garabel-ink font-semibold">04 // INTERFACE DEPTH AMBIENCY</span>
                  <span className="text-garabel-mid">{params.shadowDepth}%</span>
                </div>
                <div className="relative group flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={params.shadowDepth}
                    onChange={(e) => updateParam("shadowDepth", parseInt(e.target.value))}
                    className="w-full h-[3px] bg-garabel-ink/10 rounded-lg appearance-none cursor-ew-resize accent-garabel-ink group-hover:bg-garabel-ink/20 transition-colors"
                  />
                </div>
                <div className="flex justify-between items-center text-[8px] font-mono tracking-widest text-garabel-mid opacity-60">
                  <span>FLAT PRESS</span>
                  <span>3D SHADOW DEPTH</span>
                </div>
              </div>

              {/* Slider 5: Cardboard creases */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase">
                  <span className="text-garabel-ink font-semibold">05 // PAPER SURFACE BENDING</span>
                  <span className="text-garabel-mid">{params.crease}%</span>
                </div>
                <div className="relative group flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={params.crease}
                    onChange={(e) => updateParam("crease", parseInt(e.target.value))}
                    className="w-full h-[3px] bg-garabel-ink/10 rounded-lg appearance-none cursor-ew-resize accent-garabel-ink group-hover:bg-garabel-ink/20 transition-colors"
                  />
                </div>
                <div className="flex justify-between items-center text-[8px] font-mono tracking-widest text-garabel-mid opacity-60">
                  <span>HYPER-STOIC / LINEAR</span>
                  <span>TACTILE CREASES / FOLDS</span>
                </div>
              </div>
            </div>

            {/* Live Cardboard Spec Ticket */}
            <div className="mt-8 p-4 rounded border border-dashed border-garabel-ink/20 bg-garabel-cream bg-opacity-40 font-mono text-[9px] tracking-wider text-garabel-mid flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="block font-bold text-garabel-ink uppercase mb-1">LIVE SUBSTRATE SPECIFICATION RECORD:</span>
                <span>SUBSTRATE: ATELIER-{activePreset.toUpperCase()} // WEIGHT: 340GMS // COMPOSITION: 100% POST-CONSUMER PULP</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-garabel-ink/5 border border-garabel-ink/10">
                <Flame className="w-3.5 h-3.5 text-garabel-accent opacity-80" />
                <span>DYNAMIC CALIBRATION STATUS: LOCKED</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
