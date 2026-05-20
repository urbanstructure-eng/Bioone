import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingCart, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  Lock, 
  Info,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { UnifiedCartItem } from "../types";

interface CartDrawerProps {
  cart: UnifiedCartItem[];
  setCart: Dispatch<SetStateAction<UnifiedCartItem[]>>;
}

export default function CartDrawer({ cart, setCart }: CartDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled] = useState(true);

  // Play micro-tactile frequency feedback sounds
  const playTactileSound = (frequency = 600, duration = 0.05) => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + duration);
      
      gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio fallback
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        playTactileSound(350, 0.04);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    playTactileSound(isOpen ? 400 : 700, 0.05);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    const existingIndex = cart.findIndex((i) => i.id === itemId);
    if (existingIndex > -1) {
      const updated = [...cart];
      const newQty = updated[existingIndex].quantity + delta;
      if (newQty <= 0) {
        updated.splice(existingIndex, 1);
      } else {
        updated[existingIndex].quantity = newQty;
      }
      setCart(updated);
      playTactileSound(delta > 0 ? 900 : 500, 0.03);
    }
  };

  const removeItem = (itemId: string) => {
    setCart(cart.filter((i) => i.id !== itemId));
    playTactileSound(350, 0.06);
  };

  const clearCart = () => {
    setCart([]);
    playTactileSound(300, 0.1);
  };

  // Pricing calculations
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((acc, current) => acc + current.price * current.quantity, 0);
  const ecoShipping = subtotal > 0 ? 18 : 0;
  const grandTotal = subtotal + ecoShipping;

  const handleCheckoutScroll = () => {
    setIsOpen(false);
    playTactileSound(800, 0.06);
    
    setTimeout(() => {
      const storeSection = document.getElementById("atelier-objects-store");
      if (storeSection) {
        storeSection.scrollIntoView({ behavior: "smooth", block: "start" });
        
        // Highlight the checkout form elements temporarily for UI help
        const inputField = document.querySelector('input[placeholder="Recipient Full Name"]');
        if (inputField) {
          (inputField as HTMLElement).focus();
          inputField.classList.add("ring-2", "ring-garabel-accent");
          setTimeout(() => {
            inputField.classList.remove("ring-2", "ring-garabel-accent");
          }, 1500);
        }
      }
    }, 300);
  };

  return (
    <>
      {/* Floating Static Top Right Cart Trigger Icon Pin */}
      <div className="fixed top-6 right-6 md:top-8 md:right-10 z-50 pointer-events-auto">
        <motion.button
          onClick={toggleDrawer}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="relative flex items-center gap-2 px-4.5 py-3 rounded-full border border-garabel-ink/15 bg-garabel-cream shadow-craft-md cursor-pointer hover:bg-white transition-colors select-none focus:outline-none h-11 md:h-13"
          title="Open Order Details Panel"
        >
          {/* Fiber & grain textures inside container */}
          <div className="absolute inset-0 paper-grain pointer-events-none opacity-20 rounded-full"></div>
          
          <ShoppingCart className="w-4 h-4 md:w-4.5 md:h-4.5 text-garabel-ink" />
          
          <span className="font-mono text-[9px] md:text-[10px] tracking-widest text-garabel-ink font-bold uppercase select-none mr-0.5">
            Order Details
          </span>
          
          {/* High visibility minimal stamp badge */}
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-garabel-accent font-mono text-[9.5px] font-bold text-white shadow-craft-sm select-none"
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Cart Drawer Panel & Overlay backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur Mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              onClick={toggleDrawer}
              className="fixed inset-0 bg-[#352a21] z-50 backdrop-blur-[2px] transition-opacity cursor-pointer"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-garabel-kraft border-l border-garabel-ink/20 shadow-craft-2xl z-50 flex flex-col justify-between overflow-hidden"
            >
              {/* Luxury Textures */}
              <div className="absolute inset-0 paper-grain pointer-events-none opacity-45"></div>
              <div className="absolute inset-0 cardboard-fibres pointer-events-none opacity-30 mix-blend-multiply"></div>

              {/* Drawer Container */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                
                {/* 1. Elegant Header */}
                <div className="p-6 md:p-8 border-b border-dashed border-garabel-ink/15 bg-garabel-cream/75 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute inset-0 paper-grain pointer-events-none opacity-20"></div>
                  <div className="relative z-10 flex justify-between items-center">
                    <div className="space-y-1">
                      <span className="block font-mono text-[8.5px] text-garabel-accent font-bold tracking-widest uppercase">
                        TACTILE ACQUISITION PANEL
                      </span>
                      <h3 className="font-sans text-xl font-light text-garabel-ink tracking-tight">
                        Your <span className="italic font-normal text-garabel-mid">order preview</span>.
                      </h3>
                    </div>
                    
                    <button
                      onClick={toggleDrawer}
                      className="p-2 -mr-2 rounded-full hover:bg-[#ebdcc3]/50 text-garabel-ink/70 hover:text-garabel-ink transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* 2. Middle Scrollable Items list */}
                <div className="flex-grow overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-6">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                      <div className="w-12 h-12 rounded-full border border-dashed border-garabel-ink/20 flex items-center justify-center text-stone-400 bg-white/20">
                        <ShoppingCart className="w-5 h-5 opacity-50" />
                      </div>
                      <div className="space-y-1.5">
                        <span className="block font-mono text-[9.5px] text-garabel-ink font-bold tracking-widest">
                          LEDGER REGISTER VACANT
                        </span>
                        <p className="font-sans text-xs font-light text-garabel-mid max-w-[240px] leading-relaxed mx-auto">
                          Choose packaging specimens, materials, or generate bespoke AI layout custom blueprints to load items on your dispatch card draft.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="flex justify-between items-center pb-2 border-b border-garabel-ink/10">
                        <span className="font-mono text-[8.5px] text-garabel-ink/60 font-bold uppercase tracking-wider">
                          INDEXED ITEMS IN FLIGHT:
                        </span>
                        <button
                          onClick={clearCart}
                          className="font-mono text-[8.5px] text-garabel-accent hover:underline cursor-pointer flex items-center gap-1 uppercase"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Clear Selection</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div 
                            key={item.id}
                            className="p-4 rounded border border-garabel-ink/15 bg-garabel-cream/85 hover:bg-white transition-all duration-300 space-y-3 relative overflow-hidden shadow-craft-sm"
                          >
                            {/* Inner border style details */}
                            <div className="absolute inset-0 border-double-cut pointer-events-none rounded"></div>
                            
                            <div className="relative z-10 flex justify-between items-start gap-4">
                              <div className="space-y-1">
                                <h4 className="font-sans text-xs font-semibold text-garabel-ink leading-tight">
                                  {item.name}
                                </h4>
                                <span className="block font-mono text-[8px] text-garabel-mid uppercase tracking-widest leading-none">
                                  {item.category}
                                </span>
                              </div>
                              <span className="font-mono text-xs font-bold text-garabel-ink shrink-0">
                                ${item.price * item.quantity}.00
                              </span>
                            </div>

                            {item.isCustomAI && item.customDetails && (
                              <div className="relative z-10 p-2 rounded bg-garabel-accent bg-opacity-5 font-sans text-[10px] text-garabel-accent italic border border-garabel-accent/15">
                                <span className="font-mono text-[8px] font-bold not-italic block tracking-wide uppercase mb-0.5">
                                  ✦ Generated Style: {item.customDetails.aestheticStyleName}
                                </span>
                                "{item.description.split("principles with ")[1] || "Bespoke specifications ready."}"
                              </div>
                            )}

                            {/* Controls row */}
                            <div className="relative z-10 flex justify-between items-center pt-2 border-t border-dashed border-garabel-ink/5">
                              <span className="font-mono text-[8px] text-stone-400">
                                VERIFIED SPEC ID: {item.id}
                              </span>

                              <div className="flex items-center gap-3">
                                {/* Less/More Controls */}
                                <div className="flex items-center gap-1 bg-garabel-sand bg-opacity-70 border border-garabel-ink/10 rounded px-1.5 py-0.5">
                                  <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="p-1 hover:bg-stone-200 rounded transition-colors text-garabel-ink cursor-pointer"
                                  >
                                    <Minus className="w-2.5 h-2.5" />
                                  </button>
                                  <span className="font-mono text-[10px] font-bold px-1.5 min-w-[12px] text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="p-1 hover:bg-stone-200 rounded transition-colors text-garabel-ink cursor-pointer"
                                  >
                                    <Plus className="w-2.5 h-2.5" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="p-1.5 text-stone-400 hover:text-garabel-accent transition-colors cursor-pointer"
                                  title="Remove specimen item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Luxury Bottom Pricing & Navigation Actions */}
                {cart.length > 0 && (
                  <div className="p-6 md:p-8 bg-garabel-cream/80 backdrop-blur-sm border-t border-dashed border-garabel-ink/15 space-y-5 relative overflow-hidden">
                    <div className="absolute inset-0 paper-grain pointer-events-none opacity-20"></div>
                    
                    {/* Invoice math summary */}
                    <div className="relative z-10 space-y-2.5 font-mono text-[9px] tracking-wider text-garabel-mid">
                      <div className="flex justify-between">
                        <span>LEDGER SUB-TOTAL:</span>
                        <span className="text-garabel-ink font-semibold">${subtotal}.00 USD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ECO CARGO COURIER DISPATCH:</span>
                        <span className="text-garabel-ink font-semibold">${ecoShipping}.00 USD</span>
                      </div>
                      <div className="flex justify-between border-t border-dashed border-stone-200 pt-2.5 text-[10.5px] text-garabel-ink font-bold">
                        <span>TOTAL SPECIMEN INVESTMENT:</span>
                        <span className="text-garabel-accent font-bold">${grandTotal}.00 USD</span>
                      </div>
                    </div>

                    {/* PayPal Security banner */}
                    <div className="relative z-10 p-3.5 rounded border border-garabel-accent/10 bg-white bg-opacity-65 flex items-start gap-2.5">
                      <Lock className="w-3.5 h-3.5 text-garabel-accent shrink-0 mt-0.5" />
                      <p className="font-sans text-[10px] font-light text-garabel-mid leading-relaxed">
                        Settle your luxury remnants securely. Standard PayPal drafts are forwarded directly to your email for ultimate transactional confidentiality.
                      </p>
                    </div>

                    {/* CTA Flow actions */}
                    <div className="relative z-10 space-y-2.5">
                      <button
                        onClick={handleCheckoutScroll}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded bg-garabel-ink hover:bg-opacity-95 text-garabel-cream font-mono text-[10px] uppercase tracking-widest transition-all cursor-pointer shadow-craft-md font-bold"
                      >
                        <span>Proceed To Secure Checkout Desk</span>
                        <ChevronRight className="w-3.5 h-3.5 text-garabel-accent" />
                      </button>

                      <button
                        onClick={toggleDrawer}
                        className="w-full py-2.5 font-mono text-[8px] text-stone-400 uppercase tracking-widest text-center hover:text-stone-600 transition-colors cursor-pointer"
                      >
                        Keep Curating Remnants
                      </button>
                    </div>

                    {/* Details note */}
                    <div className="relative z-10 flex gap-1.5 items-start font-mono text-[7px] text-garabel-mid opacity-60 leading-normal border-t pt-3">
                      <Info className="w-3.5 h-3.5 text-garabel-accent shrink-0 mt-0.5" />
                      <span>Custom generated parameters are stored locally. Dispatched boxes degrade elegantly into pure agricultural substrate coreboard in composting soil.</span>
                    </div>

                  </div>
                )}

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
