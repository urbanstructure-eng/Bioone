import { useState } from "react";
import { Sliders, RefreshCw, AudioWaveform, HelpCircle, Flame, Eye, Sparkles } from "lucide-react";
import { MaterialParams } from "../types";
import { useLanguage } from "../translations";

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

export default function CardboardCustomizer({}: CardboardCustomizerProps) {
  const { t } = useLanguage();
  return (
    <section 
      id="interactive-bench" 
      className="relative w-full max-w-7xl mx-auto px-6 py-20 md:py-32 z-10 select-none flex items-center min-h-[75vh]"
    >
      {/* Quiet luxury bold sustainability statement stacked on left - matching logo organic green */}
      <div className="max-w-6xl text-left">
        <h2 className="text-[52px] sm:text-7xl md:text-[110px] lg:text-[145px] xl:text-[165px] font-sans font-black tracking-tighter text-[#376332] leading-[0.85] uppercase">
          {t("sustain_goals_1")}<br />
          {t("sustain_goals_2")}<br />
          {t("sustain_goals_3")}
        </h2>
      </div>
    </section>
  );
}
