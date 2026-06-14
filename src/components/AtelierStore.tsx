import { Dispatch, SetStateAction } from "react";
import { AlertCircle } from "lucide-react";
import { UnifiedCartItem } from "../types";

interface AtelierStoreProps {
  cart?: UnifiedCartItem[];
  setCart?: Dispatch<SetStateAction<UnifiedCartItem[]>>;
}

export default function AtelierStore({ cart, setCart }: AtelierStoreProps) {
  return (
    <section 
      id="atelier-objects-store" 
      className="relative w-full max-w-7xl mx-auto px-6 py-12 md:py-24 z-10 border-t border-garabel-ink/10 select-none animate-fadeIn"
    >
      {/* Visual Header Block layout */}
      <div className="space-y-6 mb-16 md:mb-24">
        <span className="block font-mono text-[11px] tracking-widest text-[#376332] uppercase font-bold">
          ✦ Premium Bio Packaging & Marketing Design Solutions ✦
        </span>
        <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-[68px] lg:text-[88px] xl:text-[96px] font-sans font-black tracking-tighter text-[#376332] leading-[0.85] uppercase">
          Top Design Ideas.<br />
          Elite Marketing Packaging.
        </h2>
        <p className="text-sm md:text-lg font-sans font-light text-garabel-mid max-w-3xl leading-relaxed pt-2">
          Your product container is your brand's ultimate physical ambassador. We engineer premium custom bio-packaging and luxurious structural designs, turning sustainable materials into highly effective marketing tools.
        </p>
      </div>

      {/* Brand Packaging Philosophy & Differentiators - Side-to-Side */}
      <div className="space-y-16">
        
        {/* Section 1: Philosophy Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start border-b border-[#376332]/10 pb-12">
          <div className="lg:col-span-4">
            <span className="block font-mono text-[11px] tracking-widest text-[#376332] uppercase font-bold">
              Our Packaging Mission
            </span>
            <h3 className="text-2xl font-sans font-bold text-garabel-ink uppercase tracking-tight mt-2">
              & Strategy
            </h3>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <p className="font-sans text-lg md:text-2xl font-light leading-relaxed text-garabel-ink/90">
              We create premium custom compostable, carbon-reduced, and circular FSC-certified packaging systems designed to help brands stand out, strengthen customer loyalty, and eliminate waste without compromising luxury, quality, or aesthetics.
            </p>
            <p className="font-sans text-sm md:text-base font-light leading-relaxed text-garabel-mid">
              Whether you're an emerging retailer, a growing cannabis brand, a luxury fashion label, or an established e-commerce business, our sustainable packaging helps you deliver a premium experience from the moment your product reaches your customer.
            </p>
          </div>
        </div>

        {/* Section 2: Why Leading Brands Choose Us */}
        <div className="space-y-8">
          <span className="block font-mono text-[11px] tracking-widest text-[#376332] uppercase font-bold border-b border-[#376332]/10 pb-2">
            Why Leading Brands Choose Us
          </span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2">
            
            {/* Card 01 */}
            <div className="p-6 md:p-8 rounded-lg border border-garabel-ink/5 bg-garabel-cream/50 relative shadow-craft-sm hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between">
              <div className="absolute inset-0 paper-grain pointer-events-none opacity-[0.05]"></div>
              <div>
                <span className="block font-mono text-[10px] text-garabel-accent uppercase tracking-widest font-bold mb-4">01 // VISUAL IMPACT</span>
                <h4 className="font-sans text-lg font-bold text-garabel-ink mb-3 uppercase">Elevate Brand Perception</h4>
                <p className="font-sans text-sm font-light text-garabel-mid leading-relaxed">
                  Transform every purchase into a memorable brand experience with beautifully designed custom packaging.
                </p>
              </div>
            </div>

            {/* Card 02 */}
            <div className="p-6 md:p-8 rounded-lg border border-garabel-ink/5 bg-garabel-cream/50 relative shadow-craft-sm hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between">
              <div className="absolute inset-0 paper-grain pointer-events-none opacity-[0.05]"></div>
              <div>
                <span className="block font-mono text-[10px] text-garabel-accent uppercase tracking-widest font-bold mb-4">02 // ECO ADVANTAGE</span>
                <h4 className="font-sans text-lg font-bold text-garabel-ink mb-3 uppercase">Reduce Environmental Impact</h4>
                <p className="font-sans text-sm font-light text-garabel-mid leading-relaxed">
                  Our eco-conscious materials and zero-emission approach help your business move toward a more sustainable future.
                </p>
              </div>
            </div>

            {/* Card 03 */}
            <div className="p-6 md:p-8 rounded-lg border border-garabel-ink/5 bg-garabel-cream/50 relative shadow-craft-sm hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between">
              <div className="absolute inset-0 paper-grain pointer-events-none opacity-[0.05]"></div>
              <div>
                <span className="block font-mono text-[10px] text-garabel-accent uppercase tracking-widest font-bold mb-4">03 // TAILORED SYSTEM</span>
                <h4 className="font-sans text-lg font-bold text-garabel-ink mb-3 uppercase">Custom Designed For Your Brand</h4>
                <p className="font-sans text-sm font-light text-garabel-mid leading-relaxed">
                  From shopping bags and mailers to complete packaging systems, every solution is tailored to reflect your unique identity.
                </p>
              </div>
            </div>

            {/* Card 04 */}
            <div className="p-6 md:p-8 rounded-lg border border-garabel-ink/5 bg-garabel-cream/50 relative shadow-craft-sm hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between">
              <div className="absolute inset-0 paper-grain pointer-events-none opacity-[0.05]"></div>
              <div>
                <span className="block font-mono text-[10px] text-garabel-accent uppercase tracking-widest font-bold mb-4">04 // HIGHER STANDARDS</span>
                <h4 className="font-sans text-lg font-bold text-garabel-ink mb-3 uppercase">Premium Quality Without Compromise</h4>
                <p className="font-sans text-sm font-light text-garabel-mid leading-relaxed">
                  Durable, elegant, and designed to perform while meeting the expectations of modern consumers.
                </p>
              </div>
            </div>

            {/* Card 05 */}
            <div className="p-6 md:p-8 rounded-lg border border-garabel-ink/5 bg-garabel-cream/50 relative shadow-craft-sm hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between md:col-span-2">
              <div className="absolute inset-0 paper-grain pointer-events-none opacity-[0.05]"></div>
              <div>
                <span className="block font-mono text-[10px] text-garabel-accent uppercase tracking-widest font-bold mb-4">05 // SCALABILITY</span>
                <h4 className="font-sans text-lg font-bold text-[#1a3816] mb-3 uppercase">Flexible For Businesses Of Any Size</h4>
                <p className="font-sans text-sm font-light text-garabel-mid leading-relaxed">
                  Whether you're launching your first store or managing multiple retail locations, we offer scalable solutions that grow with your business.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Luxury details disclosure at the bottom */}
        <div className="p-4 md:p-6 rounded border border-garabel-ink/10 bg-garabel-sand bg-opacity-30 font-mono text-[10px] text-garabel-mid leading-relaxed flex items-center gap-4">
          <AlertCircle className="w-5 h-5 text-garabel-accent shrink-0" />
          <span>ONE Biodegradable Brand Solutions operates an exclusive high-confidentiality brand program. All custom designs and orders are verified with tactile proof copies to guarantee absolute sustainable perfection.</span>
        </div>

      </div>
    </section>
  );
}
