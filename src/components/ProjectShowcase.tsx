import { useLanguage } from "../translations";
import { motion } from "motion/react";
import greenLeafBgPhoto from "../assets/images/green_leaf_bg_photo_1779387358759.png";

export default function ProjectShowcase() {
  const { t } = useLanguage();

  return (
    <section 
      id="portfolio-section" 
      className="relative w-full min-h-[85vh] md:min-h-[95vh] flex items-center justify-center overflow-hidden select-none pt-40 sm:pt-48 md:pt-56 pb-24"
    >
      {/* Immersive Green Leaf Background Image - start below navigation space */}
      <div className="absolute inset-x-0 bottom-0 top-32 sm:top-40 md:top-48 lg:top-52 z-0 overflow-hidden bg-black">
        <motion.img 
          animate={{
            scale: [1.12, 1.16, 1.12],
            x: [-18, 15, -18],
            y: [-12, 10, -12],
            rotate: [-1.5, 1.5, -1.5],
          }}
          transition={{
            duration: 28,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          src={greenLeafBgPhoto} 
          alt="Lush green leaf background reflecting structural integrity" 
          className="w-full h-full object-cover object-[center_85%] select-none filter brightness-[0.75] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Elegant organic matte gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/85"></div>
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
        <h2 className="text-4xl xs:text-5xl sm:text-7xl md:text-[110px] lg:text-[145px] xl:text-[165px] font-sans font-black tracking-tighter text-[#fdfbf7] leading-[0.85] uppercase drop-shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
          {t("leaf_title_1")}<br />
          {t("leaf_title_2")}
        </h2>
        
        <div className="mt-6 sm:mt-8 md:mt-12 space-y-1.5 sm:space-y-2 text-[#fdfbf7] opacity-90 font-sans font-normal text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl uppercase tracking-[0.15em] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          <p>• {t("leaf_cert_1")}</p>
          <p>• {t("leaf_cert_2")}</p>
          <p>• {t("leaf_cert_3")}</p>
        </div>
      </motion.div>
    </section>
  );
}
