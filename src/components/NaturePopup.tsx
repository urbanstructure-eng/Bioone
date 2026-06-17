import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Recycle } from "lucide-react";

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
              className="pointer-events-auto w-full max-w-lg aspect-square sm:aspect-auto sm:min-h-[380px] bg-neutral-900 rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 relative flex flex-col justify-center items-center p-8 sm:p-12 text-center select-none group"
              id="nature-popup-modal"
            >
              {/* Fallback Leaf Nature Background Macro Photo */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=85')`,
                }}
              />

              {/* Cinematic Looping Video Background of Leaves Under Sun */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-90 z-0 transition-transform duration-[10000ms] ease-out scale-102 group-hover:scale-108 pointer-events-none"
              >
                <source
                  src="https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-leaves-under-the-sun-33519-large.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Premium cinematic vignette and depth gradient overlay to ensure immaculate white text legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/70 mix-blend-multiply z-0" />
              <div className="absolute inset-0 bg-black/30 mix-blend-overlay z-0" />

              {/* Organic Luxe Paper Grain Texture */}
              <div className="absolute inset-0 paper-grain pointer-events-none opacity-[0.14]" />

              {/* Luxury Accent Corner Borders */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/25 pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/25 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/25 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/25 pointer-events-none" />

              {/* Small Recycle Bio Icon Badge */}
              <div
                className="absolute top-4 right-14 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-white/15 text-white/95 shadow-md backdrop-blur-sm border border-white/10 select-none"
                title="Sustainable Biodegradable Packaging"
              >
                <Recycle className="w-4 h-4 animate-[spin_10s_linear_infinite]" />
              </div>

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
              <div className="relative z-10 flex flex-col justify-center items-center h-full max-w-[420px]">
                {/* Heading */}
                <h3 className="font-sans text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-white mb-5 sm:mb-6 mt-2 leading-[1.25] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
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
