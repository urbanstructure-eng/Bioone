import React from "react";
import { useLanguage } from "../translations";
import { motion } from "motion/react";

interface CreativeDeskProps {
  onAddCustomDesign?: any;
}

export default function CreativeDesk({ onAddCustomDesign }: CreativeDeskProps) {
  const { language } = useLanguage();

  return (
    <div id="services-section" className="relative w-full h-[85vh] md:h-screen overflow-hidden flex items-end justify-end bg-transparent">
      {/* Paper texture overlay elements */}
      <div className="absolute inset-0 paper-grain pointer-events-none opacity-20 z-10 animate-pulse-slow"></div>
      
      {/* The background full page cover photo shifted down to let logo and language navigation be fully legible */}
      <div className="absolute inset-x-0 bottom-0 top-24 sm:top-28 md:top-36 lg:top-40 overflow-hidden z-0 bg-transparent">
        <motion.img
          src="https://lh3.googleusercontent.com/d/1REWtt1T_yXgST80yZVkhGKdRk1T_24CE"
          alt="Atelier Garabel Brand Experience"
          referrerPolicy="no-referrer"
          animate={{
            scale: [1.10, 1.15, 1.10],
            x: [10, -15, 10],
            y: [5, -10, 5],
            rotate: [0.5, -0.5, 0.5],
          }}
          transition={{
            duration: 32,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="w-full h-full object-cover object-bottom select-none"
        />

        {/* Modern gradient for absolute high-contrast typography readability (fading from right-to-left for right-aligned text) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t md:bg-gradient-to-l from-black/90 via-black/50 md:to-transparent"></div>
      </div>

      {/* Main right-justified bold headline container */}
      <div className="relative z-30 max-w-4xl px-8 sm:px-14 md:px-20 text-right pb-16 sm:pb-20 md:pb-24">
        <h2 className="font-sans font-black text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-[#fdfbf7] tracking-tighter leading-[0.88] text-right drop-shadow-[0_12px_40px_rgba(0,0,0,0.55)] animate-fadeIn">
          {language === "en" && (
            <>Help Your Brand<br />Stand Out —<br />Not Pollute</>
          )}
          {language === "fr" && (
            <>Démarquez Votre<br />Marque —<br />Pas La Planète</>
          )}
          {language === "it" && (
            <>Distingui Il Tuo<br />Marchio —<br />Senza Inquinare</>
          )}
          {language === "es" && (
            <>Destaque Su<br />Marca —<br />Sin Contaminar</>
          )}
          {language === "de" && (
            <>Ihre Marke Hervorheben<br />— Ohne Die Umwelt<br />Zu Belasten</>
          )}
          {language === "ja" && (
            <>ブランドを際立たせる<br />環境を汚さない<br />ものづくり</>
          )}
        </h2>


      </div>
    </div>
  );
}
