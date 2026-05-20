import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Pointer } from "lucide-react";

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      
      // If we've scrolled more than 100px and are not yet at the bottom
      if (scrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Check if we are near the bottom of the page
      if (scrollY + winHeight >= docHeight - 100) {
        setIsAtBottom(true);
        setIsVisible(true); // Bring it back to allow quick scroll to top
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAction = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Scroll to second section
      const secondSection = document.querySelector('[aria-label="Creative Material Lab"]');
      if (secondSection) {
        secondSection.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-10 z-50 pointer-events-auto"
        >
          <button
            onClick={handleAction}
            className="group flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer select-none bg-garabel-cream/80 hover:bg-white border border-garabel-ink/10 pl-3.5 pr-4 py-2.5 rounded-full shadow-craft-lg backdrop-blur-sm transition-all duration-300 relative overflow-hidden"
          >
            {/* Fibre detail inside button */}
            <div className="absolute inset-0 paper-grain pointer-events-none opacity-20 rounded-full" />
            
            <div className="flex items-center gap-2 relative z-10">
              {isAtBottom ? (
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="text-garabel-accent"
                >
                  <Pointer className="w-3.5 h-3.5 rotate-180 transform" />
                </motion.div>
              ) : (
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="text-garabel-mid group-hover:text-garabel-accent transition-colors"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </motion.div>
              )}
              
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-[#8a7360] !text-garabel-mid group-hover:text-[#4e4034] !group-hover:text-garabel-ink font-bold transition-colors">
                {isAtBottom ? "Back to Summit" : "Scroll to Explore"}
              </span>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
