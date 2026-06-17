import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export default function NaturePopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Graceful delayed entry to allow the site's main loading choreography to settle
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Elegant Dark Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] cursor-pointer"
            id="nature-popup-backdrop"
          />

          {/* Centered Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[120] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15, filter: "blur(8px)" }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              className="pointer-events-auto w-full max-w-lg aspect-square sm:aspect-auto sm:min-h-[380px] bg-neutral-900 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 relative flex flex-col justify-center items-center p-8 sm:p-12 text-center select-none group"
              id="nature-popup-modal"
            >
              {/* Premium Top Center Seam Edge Logo */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] flex items-center justify-center pointer-events-none">
                <img
                  src="https://drive.google.com/thumbnail?id=1qS2_qmlMWUQcajrumU5MJMdREokFaDLS&sz=w400"
                  alt="Green Brand Logo"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://drive.google.com/uc?export=view&id=1qS2_qmlMWUQcajrumU5MJMdREokFaDLS";
                  }}
                  className="h-[99px] sm:h-[123px] w-auto object-contain select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                />
              </div>

              {/* Dedicated Overflow-Hidden Mask for Background Elements */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden z-0 pointer-events-none">
                {/* Cinematic Floating Green Leaf Background Video-like Experience */}
                <motion.div
                  animate={{
                    scale: [1.05, 1.18, 1.05],
                    x: [-8, 8, -8],
                    y: [-6, 6, -6],
                    rotate: [0.5, -0.5, 0.5]
                  }}
                  transition={{
                    duration: 22,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=90')`,
                  }}
                />

                {/* Premium cinematic vignette and depth gradient overlay configured to enhance green visibility while retaining legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60 mix-blend-multiply" />
                <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />

                {/* Organic Luxe Paper Grain Texture */}
                <div className="absolute inset-0 paper-grain opacity-[0.14]" />
              </div>

              {/* Luxury Accent Corner Borders */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/25 pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/25 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/25 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/25 pointer-events-none" />

              {/* Minimal Elegant Close Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsVisible(false);
                }}
                className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer shadow-md focus:outline-none focus:ring-1 focus:ring-white/20"
                aria-label="Close nature modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Typography & Message Core */}
              <div className="relative z-10 flex flex-col justify-center items-center h-full max-w-[420px] pt-10 sm:pt-14">
                {/* Heading */}
                <h3 className="font-sans text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-white mb-5 sm:mb-6 mt-6 sm:mt-8 leading-[1.25] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  The future of packaging is sustainable.
                </h3>

                {/* Main Body Description */}
                <p className="font-sans text-sm sm:text-base leading-relaxed text-white/85 font-light tracking-wide mb-5 sm:mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  Turn every package into a zero-emission brand experience with biodegradable packaging that reduces waste, reflects your values, and connects conscious consumers with your mission.
                </p>

                {/* Elegant Separator */}
                <div className="w-12 h-[1px] bg-white/35 mb-5 sm:mb-6" />

                {/* Callout Footer */}
                <p className="font-serif italic text-sm sm:text-base text-white/95 font-medium tracking-wide leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  Packaging that protects the planet, engages customers, and grows your brand.
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
