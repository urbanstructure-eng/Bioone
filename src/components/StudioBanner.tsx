import React, { useState, useEffect } from "react";
import { Compass, Sparkles, Sliders, ChevronDown, Check, Eye, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ClockProps {
  label: string;
  timeZone: string;
}

function LiveClock({ label, timeZone }: ClockProps) {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      try {
        const str = now.toLocaleTimeString("en-US", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setTimeStr(str);
      } catch (e) {
        setTimeStr(now.toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return (
    <div className="flex flex-col items-center md:items-start font-mono text-[9px] tracking-widest text-garabel-mid uppercase leading-tight">
      <span className="opacity-50 text-[7.5px]">{label}</span>
      <span className="font-semibold text-garabel-ink">{timeStr || "--:--:--"}</span>
    </div>
  );
}

export default function StudioBanner() {
  const [activeTab, setActiveTab] = useState<"specs" | "narrative" | "origin">("specs");
  
  // Interactive 3D hover orientation
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    setCoords({
      x: (mouseX / width) * 20, // max 20 degrees rot Y
      y: -(mouseY / height) * 20, // max -20 degrees rot X
    });
  };

  const handleMouseReset = () => {
    setCoords({ x: 0, y: 0 });
    setIsHovering(false);
  };

  const scrollToExplore = () => {
    const secondSection = document.querySelector('[aria-label="Creative Material Lab"]');
    if (secondSection) {
      secondSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <header className="relative w-full min-h-screen flex flex-col items-center justify-center pt-8 pb-16 px-4 sm:px-6 z-10 select-none overflow-hidden">
      
      {/* Immersive radial ambient light centering behind the bag */}
      <div className="absolute w-[80vw] max-w-[900px] aspect-square rounded-full bg-radial from-stone-400/10 via-garabel-sand/5 to-transparent blur-3xl pointer-events-none -z-10 animate-pulse-slow"></div>

      {/* Elegant animated tagline with plain text biodegradable certification in modern sans & mono */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="flex flex-col items-center gap-3.5 mb-[-70px] md:mb-[-130px] relative z-20 px-4 text-center"
      >
        <h2 className="font-sans font-light text-xl sm:text-3xl md:text-4xl lg:text-5xl text-emerald-800 tracking-wide max-w-5xl">
          The Future of Luxury Packaging Is Biodegradable
        </h2>
        <div className="flex items-center gap-2.5 opacity-95 py-1">
          <svg className="w-4.5 h-4.5 text-garabel-ink shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
          </svg>
          <span className="font-mono text-[10.5px] sm:text-[13px] tracking-widest text-garabel-ink font-semibold uppercase leading-none">
            BIODEGRADABLE CERTIFIED // 100% RAW COMPOSTABLE PLANT-CELLULOSE
          </span>
        </div>
      </motion.div>

      {/* Pure 3D Interactive Floating Stage - No Boxes, Just the Bag (Scaled down 30% to 1.02) */}
      <motion.div
        initial={{ opacity: 0, y: 160, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1.02 }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseReset}
        onMouseEnter={() => setIsHovering(true)}
        style={{
          transform: `perspective(1800px) rotateX(${coords.y}deg) rotateY(${coords.x}deg)`,
          transformStyle: "preserve-3d",
          transition: isHovering ? "transform 0.05s ease-out" : "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="relative w-full max-w-[1300px] h-[75vh] md:h-[84vh] flex items-center justify-center cursor-grab active:cursor-grabbing group z-10"
      >
        
        {/* The Luxury Bag itself with continuous cinematic float and interactive 3D perspective tilt */}
        <motion.img
          src="https://lh3.googleusercontent.com/d/1dtROyzNWJyFe1_AGfCEjw1jhSIqUiTDA"
          alt="Atelier Garabel Sustainable Organic Luxury Bag"
          referrerPolicy="no-referrer"
          animate={{
            y: isHovering ? -15 : [0, -28, 0],
            rotate: isHovering ? coords.x * 0.12 : [0, 1.2, 0, -1.2, 0],
          }}
          transition={{
            y: isHovering 
              ? { type: "spring", stiffness: 100 } 
              : { repeat: Infinity, duration: 6, ease: "easeInOut" },
            rotate: isHovering
              ? { type: "spring", stiffness: 100 }
              : { repeat: Infinity, duration: 8, ease: "easeInOut" }
          }}
          className="w-full h-full object-contain select-none filter drop-shadow-[0_40px_90px_rgba(40,36,32,0.22)]"
        />

      </motion.div>

      {/* Luxurious Editorial Scroll-Down Assist Badge */}
      <motion.button
        onClick={scrollToExplore}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-24 sm:bottom-32 md:bottom-36 lg:bottom-40 flex flex-col items-center gap-1 group cursor-pointer focus:outline-none z-30"
      >
        <span className="font-mono text-[10.5px] sm:text-[12px] uppercase tracking-[0.28em] text-garabel-mid group-hover:text-garabel-ink transition-colors duration-300 font-bold">
          Scroll down to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="text-garabel-accent group-hover:text-garabel-ink transition-colors duration-300"
        >
          <ChevronDown className="w-8 h-8 md:w-10 md:h-10 stroke-[1.25]" />
        </motion.div>
      </motion.button>

    </header>
  );
}
