import { useLanguage } from "../translations";
import { motion } from "motion/react";
import greenLeafBgPhoto from "../assets/images/green_leaf_bg_photo_1779387358759.png";

export default function ProjectShowcase() {
  const { t } = useLanguage();

  return (
    <section 
      id="portfolio-section" 
      className="relative w-full min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden select-none pt-32 sm:pt-40 md:pt-48 pb-20"
    >
      {/* Immersive Green Leaf Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
          src={greenLeafBgPhoto} 
          alt="Lush green leaf background reflecting structural integrity" 
          className="w-full h-full object-cover object-[center_85%] select-none filter brightness-[0.75] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Darker top and bottom elegant organic matte gradients for outstanding nav overlay contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/95"></div>
        <div className="absolute inset-0 bg-emerald-950/25 mix-blend-color"></div>
        <div className="absolute inset-0 paper-grain pointer-events-none opacity-10"></div>
      </div>

      {/* Floating Left-Aligned Typography Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-left px-8 sm:px-16 md:px-24 lg:px-32 max-w-7xl w-full mx-auto"
      >
        <h2 className="text-[52px] sm:text-7xl md:text-[110px] lg:text-[145px] xl:text-[165px] font-sans font-black tracking-tighter text-[#fdfbf7] leading-[0.85] uppercase drop-shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
          Carbon-conscious<br />
          luxury packaging.
        </h2>
        
        <div className="mt-6 sm:mt-8 md:mt-12 space-y-1.5 sm:space-y-2 text-[#fdfbf7] opacity-90 font-sans font-normal text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl uppercase tracking-[0.15em] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          <p>• BPI Certified</p>
          <p>• TÜV Austria OK Compost</p>
          <p>• EN 13432 compliant</p>
        </div>
      </motion.div>
    </section>
  );
}
