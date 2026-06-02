import { useState, useEffect, FormEvent, Dispatch, SetStateAction } from "react";
import { 
  ShoppingCart, 
  Check, 
  Plus, 
  Minus, 
  Trash2, 
  Lock, 
  Sparkles, 
  Mail, 
  AlertCircle, 
  Printer, 
  Clock,
  ArrowRight,
  MapPin,
  FileCheck
} from "lucide-react";
import { UnifiedCartItem } from "../types";
import { useLanguage } from "../translations";

interface ShopItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  dimensions: string;
  weight: string;
}

const EXCLUSIVE_ITEMS: ShopItem[] = [
  {
    id: "obj-01",
    name: "THE ARCHIVAL PACKAGING SAMPLE KIT",
    category: "Luxury Box Series",
    price: 120,
    image: "/src/assets/images/portfolio_ceramic_vase_1779300266749.png",
    description: "A comprehensive tactile collection of 12 distinct hand-pressed cardboard swatch formulas, unbleached organic linen cord ropes, and various blind-embossed test cards to calibrate your flagship brand layouts.",
    dimensions: "240mm x 320mm Master Case",
    weight: "2.4kg Wood Pulp Sample Core",
  },
  {
    id: "obj-02",
    name: "BAMBOO SKINCARE compartment prototype",
    category: "Cosmetics Swatch Series",
    price: 65,
    image: "/src/assets/images/portfolio_art_book_1779300301228.png",
    description: "A trilogy of custom pressure-molded sugarcane and white bamboo core compartment sockets. Designed for cosmetics directors mapping out serum dropper jar layout tolerances.",
    dimensions: "150mm x 150mm Compartment Base",
    weight: "320gsm Embossed Bamboo Board",
  },
  {
    id: "obj-03",
    name: "BIO-DEGRADABLE SOY FOIL SWATCH DECK",
    category: "Organic Finishes Series",
    price: 48,
    image: "/src/assets/images/portfolio_scandi_chair_1779300284599.png",
    description: "An original layout collection of 18 heat-pressed organic vegetable soy foils on unbleached card boards. Includes premium matte copper, forest clay, and deep carbon charcoal colorways.",
    dimensions: "120mm x 180mm Finishes Deck",
    weight: "350gsm Rough Kraft Sheets",
  },
];

interface LocalOrder {
  id: string;
  paypalEmail: string;
  shipping: {
    fullName: string;
    address: string;
    zipCode: string;
    country: string;
  };
  items: { name: string; qty: number; price: number }[];
  subtotal: number;
  shippingCost: number;
  total: number;
  date: string;
  status: string;
}

interface AtelierStoreProps {
  cart: UnifiedCartItem[];
  setCart: Dispatch<SetStateAction<UnifiedCartItem[]>>;
}

export default function AtelierStore({ cart, setCart }: AtelierStoreProps) {
  const { t } = useLanguage();
  const [paypalEmail, setPaypalEmail] = useState("");
  
  // Minimalist Shipping Form states
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOrder, setSuccessOrder] = useState<LocalOrder | null>(null);
  const [orderHistory, setOrderHistory] = useState<LocalOrder[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Play a beautiful soft hum frequency click for interactive feels
  const playStoreSound = (frequency = 600, duration = 0.05) => {
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
      
      gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context blocked fallback
    }
  };

  useEffect(() => {
    // Load local order history
    const saved = localStorage.getItem("garabel_paypal_orders");
    if (saved) {
      try {
        setOrderHistory(JSON.parse(saved));
      } catch (e) {
        // Fallback
      }
    }
  }, []);

  const addToCart = (item: ShopItem) => {
    const existingIndex = cart.findIndex((i) => i.id === item.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([
        ...cart, 
        { 
          id: item.id, 
          name: item.name, 
          category: item.category, 
          price: item.price, 
          description: item.description, 
          image: item.image,
          quantity: 1 
        }
      ]);
    }
    playStoreSound(800, 0.04);
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
      playStoreSound(delta > 0 ? 900 : 500, 0.03);
    }
  };

  const removeItem = (itemId: string) => {
    setCart(cart.filter((i) => i.id !== itemId));
    playStoreSound(350, 0.06);
  };

  // Luxury pricing calculations
  const subtotal = cart.reduce((acc, current) => acc + current.price * current.quantity, 0);
  const ecoShipping = subtotal > 0 ? 18 : 0; // Flat-rate carbon-neutral dispatch
  const total = subtotal + ecoShipping;

  const handlePayPalCheckout = (e: FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || !paypalEmail || !fullName || !address || !zipCode || !country) return;

    setIsSubmitting(true);
    playStoreSound(700, 0.1);

    // Simulate luxury slower letterpress verification loop (deliberate motion)
    setTimeout(() => {
      const newOrder: LocalOrder = {
        id: "PP-" + Math.floor(100000 + Math.random() * 900000),
        paypalEmail: paypalEmail.trim(),
        shipping: {
          fullName: fullName.trim(),
          address: address.trim(),
          zipCode: zipCode.trim(),
          country: country.trim(),
        },
        items: cart.map((i) => ({
          name: i.name,
          qty: i.quantity,
          price: i.price,
        })),
        subtotal,
        shippingCost: ecoShipping,
        total,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        status: "PAYMENT_INVOICE_DISPATCHED",
      };

      const updatedHistory = [newOrder, ...orderHistory];
      localStorage.setItem("garabel_paypal_orders", JSON.stringify(updatedHistory));
      setOrderHistory(updatedHistory);
      setSuccessOrder(newOrder);
      setCart([]);
      setIsSubmitting(false);
      playStoreSound(1100, 0.18);
    }, 1800);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section 
      id="atelier-objects-store" 
      className="relative w-full max-w-7xl mx-auto px-6 py-12 md:py-24 z-10 border-t border-garabel-ink/10 select-none animate-fadeIn"
    >
      {/* Visual Header Grid layout */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-16">
        <div className="max-w-2xl">
          <span className="block font-mono text-[10px] tracking-widest text-[#376332] uppercase mb-2 md:mb-3 font-bold">
            Sustainable Brand Engineering
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-light tracking-tight text-garabel-ink leading-tight">
            Packaging That Builds Brands.<br />
            <span className="italic font-normal text-garabel-accent">Sustainability That Drives Growth.</span>
          </h2>
        </div>
        <p className="text-xs md:text-sm font-sans font-light text-garabel-mid max-w-sm leading-relaxed pt-2">
          Your packaging is often the first physical interaction customers have with your brand. Make it unforgettable.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* Left Side: Brand Packaging Philosophy & Differentiators */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-6 text-garabel-ink">
            <span className="block font-mono text-[10px] tracking-widest text-[#376332] uppercase border-b border-[#376332]/10 pb-2 font-bold">
              Our Packaging Mission & Philosophy
            </span>
            <p className="font-sans text-sm md:text-base font-light leading-relaxed text-garabel-ink/90">
              We create premium custom biodegradable and zero-emission packaging solutions designed to help brands stand out, strengthen customer loyalty, and reduce environmental impact without compromising quality or aesthetics.
            </p>
            <p className="font-sans text-xs md:text-sm font-light leading-relaxed text-garabel-mid">
              Whether you're an emerging retailer, a growing cannabis brand, a luxury fashion label, or an established e-commerce business, our sustainable packaging helps you deliver a premium experience from the moment your product reaches your customer.
            </p>
          </div>

          <div className="space-y-6">
            <span className="block font-mono text-[10px] tracking-widest text-garabel-accent uppercase border-b border-garabel-accent/10 pb-2 font-bold">
              Why Leading Brands Choose Us
            </span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-lg border border-garabel-ink/5 bg-garabel-cream/50 relative shadow-craft-sm hover:scale-[1.01] transition-transform duration-300">
                <div className="absolute inset-0 paper-grain pointer-events-none opacity-[0.05]"></div>
                <span className="block font-mono text-[10px] text-garabel-accent uppercase tracking-widest font-bold mb-2">01 // VISUAL IMPACT</span>
                <h4 className="font-sans text-sm font-semibold text-garabel-ink mb-2">Elevate Brand Perception</h4>
                <p className="font-sans text-xs font-light text-garabel-mid leading-relaxed">
                  Transform every purchase into a memorable brand experience with beautifully designed custom packaging.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-garabel-ink/5 bg-garabel-cream/50 relative shadow-craft-sm hover:scale-[1.01] transition-transform duration-300">
                <div className="absolute inset-0 paper-grain pointer-events-none opacity-[0.05]"></div>
                <span className="block font-mono text-[10px] text-garabel-accent uppercase tracking-widest font-bold mb-2">02 // ECO ADVANTAGE</span>
                <h4 className="font-sans text-sm font-semibold text-garabel-ink mb-2">Reduce Environmental Impact</h4>
                <p className="font-sans text-xs font-light text-garabel-mid leading-relaxed">
                  Our eco-conscious materials and zero-emission approach help your business move toward a more sustainable future.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-garabel-ink/5 bg-garabel-cream/50 relative shadow-craft-sm hover:scale-[1.01] transition-transform duration-300">
                <div className="absolute inset-0 paper-grain pointer-events-none opacity-[0.05]"></div>
                <span className="block font-mono text-[10px] text-garabel-accent uppercase tracking-widest font-bold mb-2">03 // TAILORED SYSTEM</span>
                <h4 className="font-sans text-sm font-semibold text-garabel-ink mb-2">Custom Designed for Your Brand</h4>
                <p className="font-sans text-xs font-light text-garabel-mid leading-relaxed">
                  From shopping bags and mailers to complete packaging systems, every solution is tailored to reflect your unique identity.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-garabel-ink/5 bg-garabel-cream/50 relative shadow-craft-sm hover:scale-[1.01] transition-transform duration-300">
                <div className="absolute inset-0 paper-grain pointer-events-none opacity-[0.05]"></div>
                <span className="block font-mono text-[10px] text-garabel-accent uppercase tracking-widest font-bold mb-2">04 // HIGHER STANDARDS</span>
                <h4 className="font-sans text-sm font-semibold text-garabel-ink mb-2">Premium Quality Without Compromise</h4>
                <p className="font-sans text-xs font-light text-garabel-mid leading-relaxed">
                  Durable, elegant, and designed to perform while meeting the expectations of modern consumers.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-lg border border-garabel-ink/5 bg-garabel-cream/50 relative shadow-craft-sm hover:scale-[1.01] transition-transform duration-300">
              <div className="absolute inset-0 paper-grain pointer-events-none opacity-[0.05]"></div>
              <span className="block font-mono text-[10px] text-garabel-accent uppercase tracking-widest font-bold mb-2">05 // SCALABILITY</span>
              <h4 className="font-sans text-sm font-semibold text-garabel-ink mb-2">Flexible for Businesses of Any Size</h4>
              <p className="font-sans text-xs font-light text-garabel-mid leading-relaxed">
                Whether you're launching your first store or managing multiple retail locations, we offer scalable solutions that grow with your business.
              </p>
            </div>
          </div>

          {/* Luxury details disclosure */}
          <div className="p-4 rounded border border-garabel-ink/10 bg-garabel-sand bg-opacity-30 font-mono text-[9px] text-garabel-mid leading-relaxed flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-garabel-accent shrink-0 mt-0.5" />
            <span>Atelier Garabel operates an exclusive high-confidentiality brand program. Payment operations do not use tracking metrics. We collect PayPal emails to process secure blueprints and custom orders routed via carbon-neutral dispatch.</span>
          </div>
        </div>

        {/* Right Side: The Shopping Order Card and Checkout Desk */}
        <div className="lg:col-span-5 space-y-6">
          <span className="block font-mono text-[10px] tracking-widest text-garabel-mid uppercase border-b border-garabel-ink/10 pb-2">
            {t("cart_title")}:
          </span>

          {!successOrder ? (
            /* ACTIVE CART OVERVIEW */
            <div className="relative rounded-lg border border-garabel-ink/15 bg-garabel-cream p-6 md:p-8 shadow-craft-lg overflow-hidden">
              <div className="absolute inset-0 paper-grain pointer-events-none opacity-20"></div>
              <div className="absolute inset-0 cardboard-fibres pointer-events-none opacity-[0.08]"></div>
              
              {/* Double border layer */}
              <div className="absolute inset-0 border-double-cut pointer-events-none rounded-lg"></div>

              <div className="relative z-10 space-y-6">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b border-dashed border-garabel-ink/15 pb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-garabel-accent" />
                    <span className="font-mono text-[10px] text-garabel-ink font-bold tracking-widest">
                      {t("order_details").toUpperCase()}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-garabel-mid uppercase px-2 py-0.5 rounded border border-garabel-ink/10 bg-garabel-sand bg-opacity-30">
                    {t("cart_items_count")} {cart.reduce((s, c) => s + c.quantity, 0)}
                  </span>
                </div>

                {/* Item List layout */}
                {cart.length === 0 ? (
                  <div className="py-12 text-center space-y-3">
                    <span className="block font-mono text-[10px] text-garabel-mid tracking-wide uppercase">
                      [ {t("cart_empty")} ]
                    </span>
                    <p className="font-sans text-xs font-light text-garabel-mid/60 leading-relaxed max-w-xs mx-auto">
                      {t("cart_empty_desc")}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[220px] overflow-y-auto custom-scrollbar pr-2">
                    {cart.map((itemObj) => (
                      <div 
                        key={itemObj.id}
                        className="flex items-center justify-between gap-4 font-mono text-[10px] text-garabel-ink border-b border-garabel-ink/5 pb-3"
                      >
                        <div className="flex-grow space-y-1">
                          <span className="block font-sans text-xs font-medium text-garabel-ink leading-tight">
                            {itemObj.name}
                          </span>
                          {itemObj.isCustomAI ? (
                            <span className="text-[7.5px] text-garabel-accent uppercase tracking-wider font-bold block">
                              ✦ BESPOKE AI CUSTOMIZED BLUEPRINT
                            </span>
                          ) : (
                            <span className="block text-[8px] text-garabel-mid tracking-wider">
                              UNIT COST: ${itemObj.price}.00 USD
                            </span>
                          )}
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-1.5 border border-garabel-ink/10 rounded bg-garabel-sand bg-opacity-20 px-1 py-0.5">
                          <button
                            onClick={() => updateQuantity(itemObj.id, -1)}
                            className="p-1 hover:bg-garabel-sand/40 text-garabel-ink/60 hover:text-garabel-ink transition-colors cursor-pointer"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-[9px] font-bold px-1">{itemObj.quantity}</span>
                          <button
                            onClick={() => updateQuantity(itemObj.id, 1)}
                            className="p-1 hover:bg-garabel-sand/40 text-garabel-ink/60 hover:text-garabel-ink transition-colors cursor-pointer"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        <span className="font-semibold text-right min-w-[50px]">
                          ${itemObj.price * itemObj.quantity}.00
                        </span>

                        <button 
                          onClick={() => removeItem(itemObj.id)}
                          className="p-1 hover:text-garabel-accent text-garabel-ink/40 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Subtotal metrics list */}
                <div className="space-y-2 font-mono text-[9px] tracking-wider text-garabel-mid border-t border-dashed border-garabel-ink/15 pt-4">
                  <div className="flex justify-between">
                    <span>{t("cart_subtotal")}</span>
                    <span className="text-garabel-ink font-semibold">${subtotal}.00 USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("eco_transit")}</span>
                    <span className="text-garabel-ink font-semibold">
                      {ecoShipping > 0 ? `$${ecoShipping}.00 USD` : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-garabel-ink/5 pt-2 text-[10px]">
                    <span className="font-bold text-garabel-ink">{t("cart_total")}</span>
                    <span className="text-garabel-ink font-bold">${total}.00 USD</span>
                  </div>
                </div>

                {/* Lock-payment PayPal / Shipping details Form */}
                <div className="pt-3 border-t border-dashed border-garabel-ink/15">
                  <form onSubmit={handlePayPalCheckout} className="space-y-4">
                    
                    {/* Minimalist Eco-Shipping Destination Box (Shipping CTA Feature) */}
                    <div className="p-4 rounded border border-garabel-accent/15 bg-[#faf7f2] space-y-3">
                      <div className="flex items-center gap-1.5 font-mono text-[8.5px] text-garabel-accent font-bold uppercase tracking-wider">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>I. DELIVERY DISPATCH DETAILS</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <input
                            type="text"
                            required
                            disabled={cart.length === 0 || isSubmitting}
                            placeholder="Recipient Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-2.5 py-2 rounded border border-garabel-ink/10 bg-white font-mono text-[10px] text-garabel-ink focus:border-garabel-accent outline-none"
                          />
                        </div>
                        
                        <div>
                          <input
                            type="text"
                            required
                            disabled={cart.length === 0 || isSubmitting}
                            placeholder="Street Address, Suite / Unit"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-2.5 py-2 rounded border border-garabel-ink/10 bg-white font-sans text-xs text-garabel-ink focus:border-garabel-accent outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            required
                            disabled={cart.length === 0 || isSubmitting}
                            placeholder="ZIP / Postal Code"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="w-full px-2.5 py-2 rounded border border-garabel-ink/10 bg-white font-mono text-[10px] text-garabel-ink focus:border-garabel-accent outline-none"
                          />
                          <input
                            type="text"
                            required
                            disabled={cart.length === 0 || isSubmitting}
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full px-2.5 py-2 rounded border border-garabel-ink/10 bg-white font-sans text-xs text-garabel-ink focus:border-garabel-accent outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-mono text-[9px] tracking-widest text-garabel-ink font-bold uppercase">
                        II. PAYPAL REGISTERED EMAIL:
                      </label>
                      <p className="font-sans text-[11px] font-light text-garabel-mid leading-relaxed">
                        To match unbleached quiet luxury, payment is secured via PayPal draft billing. We will forward an itemized invoice to settle via standard direct checkout.
                      </p>
                      
                      <div className="relative flex items-center">
                        <div className="absolute left-3 text-garabel-mid/50">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="email"
                          required
                          disabled={cart.length === 0 || isSubmitting}
                          placeholder="client@paypal.com"
                          value={paypalEmail}
                          onChange={(e) => setPaypalEmail(e.target.value)}
                          className="w-full pl-9 pr-4 py-3 rounded border border-garabel-ink/15 bg-white font-mono text-xs text-garabel-ink focus:border-garabel-accent outline-none transition-colors disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {/* Shipping Checkout CTA dispatch button */}
                    <button
                      type="submit"
                      disabled={cart.length === 0 || isSubmitting || !fullName || !address || !zipCode || !country || !paypalEmail}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded bg-garabel-ink text-garabel-cream font-mono text-[10px] uppercase tracking-widest hover:bg-opacity-95 transition-all cursor-pointer shadow-craft-md disabled:bg-opacity-30 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="w-3.5 h-3.5 animate-spin" />
                          <span>Preparing Archival Bill of Lading...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5 text-garabel-accent" />
                          <span>Dispatch Secure PayPal Shipment Order</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                <div className="flex gap-1.5 items-start font-mono text-[8px] text-garabel-mid opacity-60 leading-normal">
                  <Lock className="w-3 h-3 shrink-0 mt-0.5" />
                  <span>PAYPAL PRIVATE TRANSIT: Upon clicking dispatch, our systems immediately stamp and prepare your tailored invoice blueprint using pure secure standard protocols.</span>
                </div>

              </div>
            </div>
          ) : (
            /* CHECKOUT SUCCESS RECEIPT CARD */
            <div className="relative rounded-lg border border-dashed border-garabel-accent/40 bg-white p-6 md:p-8 shadow-craft-lg overflow-hidden animate-scaleUp">
              <div className="absolute inset-0 paper-grain pointer-events-none opacity-25"></div>
              <div className="absolute inset-x-0 top-0 h-1 bg-garabel-accent"></div>
              
              <div className="relative z-10 space-y-6">
                
                {/* Stamp visual symbol */}
                <div className="flex justify-between items-start border-b border-dashed border-garabel-ink/15 pb-4">
                  <div>
                    <span className="block font-mono text-[9px] text-garabel-accent font-bold tracking-widest">
                      PAYPAL PRO-INVOICE FORWARDED
                    </span>
                    <span className="block font-mono text-[8px] text-garabel-mid tracking-wider">
                      DOC-NUM ID: {successOrder.id}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block font-mono text-[9px] text-green-600 font-bold tracking-widest uppercase">
                      STATUS: DELIVERED
                    </span>
                    <span className="block font-mono text-[8px] text-garabel-mid tracking-wider">
                      {successOrder.date}
                    </span>
                  </div>
                </div>

                {/* Subtitle explaining the invoice has been dispatched */}
                <div className="p-4 rounded border border-green-500/20 bg-green-500/5 font-sans text-xs font-light text-garabel-ink leading-relaxed space-y-2">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase text-green-700 font-bold">
                    <Check className="w-3.5 h-3.5" />
                    <span>PayPal Cargo Shipment Synced</span>
                  </div>
                  <p>
                    A secure stamp request has been forwarded to standard PayPal servers for email <span className="font-mono font-medium text-garabel-accent">{successOrder.paypalEmail}</span>.
                  </p>
                  
                  {/* Shipping Coordinates Display */}
                  <div className="p-2 bg-white/60 rounded border border-stone-150 font-mono text-[8.5px] text-garabel-mid space-y-1 mt-2">
                    <span className="block font-bold text-stone-700">CARGO DISPATCH DESTINATION:</span>
                    <div>RECIPIENT: {successOrder.shipping.fullName.toUpperCase()}</div>
                    <div>ADDRESS: {successOrder.shipping.address.toUpperCase()}</div>
                    <div>ZIP/POST: {successOrder.shipping.zipCode.toUpperCase()} // COUNTRY: {successOrder.shipping.country.toUpperCase()}</div>
                  </div>

                  <p className="text-[10px] text-garabel-mid leading-normal italic">
                    Note: To settle this sensory investment, check your PayPal Inbox or the official PayPal app to execute this draft invoice securely.
                  </p>
                </div>

                {/* Itemized Invoice details */}
                <div className="space-y-2 pr-1">
                  <span className="block font-mono text-[8px] text-garabel-ink font-bold tracking-widest uppercase">
                    ITEMIZED MATERIAL TRANSACTIONS:
                  </span>
                  <div className="space-y-1.5 border-t border-b border-dashed border-garabel-ink/10 py-3 font-mono text-[9.5px] text-garabel-mid">
                    {successOrder.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{it.qty}x {it.name}</span>
                        <span className="text-garabel-ink font-medium">${it.price}.00</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary calculation */}
                <div className="space-y-1.5 font-mono text-[9px] text-garabel-mid">
                  <div className="flex justify-between">
                    <span>SUB-VAL:</span>
                    <span>${successOrder.subtotal}.00 USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DISPATCH CARGO FEE:</span>
                    <span>${successOrder.shippingCost}.00 USD</span>
                  </div>
                  <div className="flex justify-between border-t border-garabel-ink/5 pt-2 text-[10px] text-garabel-ink font-bold">
                    <span>TOTAL INVOICED INVESTMENT:</span>
                    <span>${successOrder.total}.00 USD</span>
                  </div>
                </div>

                {/* Print Receipt and New Order Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handlePrint}
                    className="flex-grow flex items-center justify-center gap-1.5 py-2.5 rounded border border-garabel-ink/15 text-garabel-ink font-mono text-[9px] uppercase tracking-widest hover:bg-garabel-sand transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-garabel-mid" />
                    <span>Print Receipt</span>
                  </button>

                  <button
                    onClick={() => {
                      setSuccessOrder(null);
                      setPaypalEmail("");
                      setFullName("");
                      setAddress("");
                      setZipCode("");
                      setCountry("");
                      playStoreSound(1000, 0.04);
                    }}
                    className="flex-grow flex items-center justify-center gap-1 py-2.5 rounded bg-garabel-ink text-garabel-cream font-mono text-[9px] uppercase tracking-widest hover:bg-opacity-95 transition-colors cursor-pointer"
                  >
                    <span>New Order Card</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Past PayPal orders log box */}
          {orderHistory.length > 0 && (
            <div className="p-4 rounded border border-garabel-ink/10 bg-white bg-opacity-30 space-y-3 shadow-craft-sm">
              <span className="block font-mono text-[8px] text-garabel-mid font-bold tracking-widest uppercase">
                YOUR CHRONOLOGICAL ORDER LEDGER / SECURE HISTORY:
              </span>
              <div className="space-y-2 max-h-[150px] overflow-y-auto custom-scrollbar">
                {orderHistory.map((hist) => (
                  <div 
                    key={hist.id} 
                    className="p-2.5 rounded bg-[#faf7f2] border border-garabel-ink/5 text-[8.5px] font-mono tracking-wider text-garabel-mid space-y-1.5"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <span className="block font-bold text-stone-900 uppercase">
                          {hist.id} // PayPal Dispatch
                        </span>
                        <span className="block opacity-75">
                          DATED: {hist.date} // TGT: {hist.paypalEmail}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block font-bold text-garabel-accent">
                          ${hist.total}.00
                        </span>
                        <span className="block text-[7.5px] text-stone-500 font-semibold uppercase">
                          PENDING CARGO
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-dashed pt-1 opacity-80 flex items-center gap-1">
                      <FileCheck className="w-3 h-3 text-emerald-800 shrink-0" />
                      <span>SHIP TO: {hist.shipping.fullName.toUpperCase()} — {hist.shipping.address.toUpperCase()}, {hist.shipping.country.toUpperCase()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
