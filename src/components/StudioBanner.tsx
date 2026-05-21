import React, { useState, useEffect } from "react";
import { Compass, Sparkles, Sliders, ChevronDown, Check, Eye, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../translations";

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
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"specs" | "narrative" | "origin">("specs");
  
  // Interactive 3D hover orientation
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Luxury Slide Deck State (1 to 5) using the same high-end bag
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  const slides: { id: number; img: string; label: string; tagline?: string; isFullPhoto?: boolean; }[] = [
    { id: 1, img: "https://lh3.googleusercontent.com/d/1dtROyzNWJyFe1_AGfCEjw1jhSIqUiTDA", label: "Specimen 01" },
    { id: 2, img: "https://lh3.googleusercontent.com/d/1dtROyzNWJyFe1_AGfCEjw1jhSIqUiTDA", label: "Specimen 02" },
    { id: 3, img: "https://lh3.googleusercontent.com/d/1dtROyzNWJyFe1_AGfCEjw1jhSIqUiTDA", label: "Specimen 03", tagline: "Carbon-conscious luxury packaging.", isFullPhoto: true },
    { id: 4, img: "https://lh3.googleusercontent.com/d/1dtROyzNWJyFe1_AGfCEjw1jhSIqUiTDA", label: "Specimen 04" },
    { id: 5, img: "https://lh3.googleusercontent.com/d/1dtROyzNWJyFe1_AGfCEjw1jhSIqUiTDA", label: "Specimen 05" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const randomDir = Math.random() < 0.5 ? 1 : -1;
      setSlideDirection(randomDir);
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 40000);
    return () => clearInterval(timer);
  }, [currentSlideIndex]);

  const handleSelectSlide = (index: number) => {
    const randomDir = Math.random() < 0.5 ? 1 : -1;
    setSlideDirection(randomDir);
    setCurrentSlideIndex(index);
  };

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
        <h2 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-[88px] uppercase text-[#376332] tracking-tighter leading-[0.88] max-w-6xl">
          {t("hero_title_1")}<br />{t("hero_title_2")}<br />{t("hero_title_3")}
        </h2>
        <p className="font-sans text-[2.3vw] xs:text-[2.1vw] sm:text-[1.8vw] md:text-[1.6vw] lg:text-[1.45vw] xl:text-[18px] tracking-tight text-garabel-ink font-bold max-w-6xl mx-auto whitespace-nowrap leading-none mt-4 md:mt-5">
          {t("hero_certified")}
        </p>
      </motion.div>

      {/* Pure 3D Interactive Floating Stage Wrapper */}
      <div className="relative w-full max-w-[1300px] h-[55vh] sm:h-[60vh] md:h-[68vh] flex items-center justify-center z-10">
        
        {/* Elegant vertical slide index controllers on the side (outside of the 3D tilt stream) */}
        <div className="absolute right-0 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3.5 z-30">
          <span className="font-mono text-[7px] tracking-[0.25em] text-garabel-mid/50 uppercase rotate-90 mb-5 translate-y-[-5px]">
            SERIES
          </span>
          {slides.map((slide, idx) => {
            const isActive = idx === currentSlideIndex;
            return (
              <button
                key={slide.id}
                onClick={() => handleSelectSlide(idx)}
                className="group relative flex items-center justify-end py-1 px-2 focus:outline-none cursor-pointer"
                aria-label={`Go to specimen slide ${slide.id}`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-[10px] md:text-[11px] font-bold tracking-tight transition-all duration-300 ${
                      isActive
                        ? "text-[#376332] scale-110"
                        : "text-garabel-mid/40 hover:text-[#376332]"
                    }`}
                  >
                    {`0${slide.id}`}
                  </span>
                  <div
                    className={`h-[1px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? "w-8 sm:w-12 bg-[#376332]"
                        : "w-2 sm:w-3 bg-garabel-ink/10 group-hover:bg-[#376332]/40"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive 3D tilt stage box */}
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
          className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing group"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlideIndex}
              initial={{ opacity: 0, x: slideDirection * 600, scale: 0.95 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              exit={{ opacity: 0, x: -slideDirection * 600, scale: 0.95 }}
              transition={{
                x: { type: "spring", stiffness: 240, damping: 30, mass: 0.7 },
                opacity: { duration: 0.35 },
                scale: { duration: 0.35 },
              }}
              className="w-full h-full flex flex-col items-center justify-center relative"
            >
              {slides[currentSlideIndex].isFullPhoto ? (
                /* Full photography slide (not the floating rotating animation) */
                <div className="relative w-full h-full rounded-[32px] overflow-hidden border border-garabel-ink/10 shadow-[0_45px_100px_rgba(40,36,32,0.18)]">
                  <div className="absolute inset-0 paper-grain pointer-events-none opacity-20 z-10 animate-pulse-slow"></div>
                  <img
                    src={slides[currentSlideIndex].img}
                    alt={slides[currentSlideIndex].label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none"
                  />
                  {slides[currentSlideIndex].tagline && (
                    <div 
                      className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap"
                    >
                      <span className="font-sans text-[2.3vw] xs:text-[2.1vw] sm:text-[1.8vw] md:text-[1.6vw] lg:text-[1.45vw] xl:text-[20px] tracking-tight text-white font-black uppercase text-center drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
                        {slides[currentSlideIndex].tagline}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                /* Floating animated bag specimen display */
                <>
                  <motion.img
                    src={slides[currentSlideIndex].img}
                    alt={`Atelier Garabel Sustainable Organic luxury Specimen ${currentSlideIndex + 1}`}
                    referrerPolicy="no-referrer"
                    animate={{
                      y: isHovering ? -15 : [0, -20, 0],
                      rotate: isHovering ? coords.x * 0.12 : [0, 1.0, 0, -1.0, 0],
                    }}
                    transition={{
                      y: isHovering 
                        ? { type: "spring", stiffness: 120, damping: 20 } 
                        : { repeat: Infinity, duration: 4.2, ease: "easeInOut" },
                      rotate: isHovering
                        ? { type: "spring", stiffness: 120, damping: 20 }
                        : { repeat: Infinity, duration: 5.5, ease: "easeInOut" }
                    }}
                    className="w-full h-full object-contain select-none filter drop-shadow-[0_45px_100px_rgba(40,36,32,0.18)] max-h-[85%]"
                  />

                  {slides[currentSlideIndex].tagline && (
                    <div 
                      className="absolute bottom-2 md:bottom-8 px-5 py-2.5 rounded-full bg-[#fdfbf7]/90 backdrop-blur-md border border-[#376332]/20 shadow-[0_10px_30px_rgba(55,99,50,0.06)] flex items-center gap-2 pointer-events-none select-none"
                      style={{ transform: "translateZ(40px)" }}
                    >
                      <span className="w-1.5 h-1.5 bg-[#376332] rounded-full animate-ping" />
                      <span className="font-sans font-bold text-xs sm:text-sm tracking-wide text-garabel-ink uppercase">
                        {slides[currentSlideIndex].tagline}
                      </span>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Luxurious Editorial Scroll-Down Assist Badge */}
      <motion.button
        onClick={scrollToExplore}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-5 sm:bottom-8 md:bottom-12 flex flex-col items-center gap-1 group cursor-pointer focus:outline-none z-30"
      >
        <span className="font-mono text-[10.5px] sm:text-[12px] uppercase tracking-[0.28em] text-garabel-mid group-hover:text-garabel-ink transition-colors duration-300 font-bold">
          {t("hero_scroll")}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
          className="text-garabel-accent group-hover:text-garabel-ink transition-colors duration-300"
        >
          <ChevronDown className="w-8 h-8 md:w-10 md:h-10 stroke-[1.25]" />
        </motion.div>
      </motion.button>

    </header>
  );
}
