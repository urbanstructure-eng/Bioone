import { useState } from "react";
import { Compass, Calendar, Layers, CornerDownRight, X, ExternalLink, ChevronRight } from "lucide-react";
import { Project } from "../types";

// Refer to generated images directly as string constants
const imgCeramic = "/src/assets/images/portfolio_ceramic_vase_1779300266749.png";
const imgScandi = "/src/assets/images/portfolio_scandi_chair_1779300284599.png";
const imgBook = "/src/assets/images/portfolio_art_book_1779300301228.png";

const PROJECTS_DATA: Project[] = [
  {
    id: "fashion-tote",
    title: "THE RECYCLED HEMP TOTE",
    tagline: "Bespoke organic carry bags designed for high-end fashion houses.",
    category: "Luxury Fashion // Biodegradable Carrier",
    image: imgCeramic,
    year: "2026",
    dimensions: "320mm x 440mm x 120mm",
    paperWeight: "350gsm Raw Hemp Fibre",
    description: "Specially engineered for high-fashion couture dispatches and flagship boutique houses. Developed using unbleached organic hemp and secondary agricultural flax. Replaces standard vinyl handles with custom knot-tied raw linen cord ropes. Printed with non-toxic charcoal vegetable dyes, maintaining a pristine, quiet signature.",
    metrics: ["100% Plastic-Free Build", "Biodegrades within 12 Weeks", "High Tensile Cord Supports"],
  },
  {
    id: "cosmetic-cell",
    title: "ALABASTER SKINCARE CORE",
    tagline: "Rigid compostable compartment liners exhibiting cosmetics bottles.",
    category: "Cosmetics & Skincare // Molded Pulp Vessel",
    image: imgScandi,
    year: "2025",
    dimensions: "180mm x 180mm x 90mm",
    paperWeight: "320gsm Embossed Soufflé",
    description: "A dual-walled precision box constructed from rapid-growth bamboo and sugar cane bagasse. Designed to secure luxury serum bottles without utilizing petroleum foams or chemical colorants. Uses pressure-formed tactile channels and elegant blind-debossed graphics to establish silent prestige.",
    metrics: ["Dissolves Safely in Organic Soil", "+350% Impact Absorption Score", "Naturally Anti-Microbial Core"],
  },
  {
    id: "wellness-canister",
    title: "BOTANICAL FLUTE CANISTER",
    tagline: "Secure post-consumer tubes for wellness, cannabis, & beverage elixirs.",
    category: "Cannabis & Beverage // Fluted Core",
    image: imgBook,
    year: "2026",
    dimensions: "85mm Diameter x 220mm Height",
    paperWeight: "400gsm Heavy Fluted Card",
    description: "Multi-layered protective sleeves engineered for craft botanical wellness tonics, carbonated energy liquids, and premium oil bottles. Developed with a child-resistant twist lid crafted entirely from tightly wound eco-board tubes. Features oil-resistant soy linings to preserve organic contents safely.",
    metrics: ["100% Post-Consumer Tube Spun", "Certified Recyclable Tube", "Scent-Impermeable Soy Liners"],
  },
];

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section 
      id="portfolio-section" 
      className="relative w-full max-w-7xl mx-auto px-6 py-12 md:py-24 z-10 border-t border-garabel-ink/10 select-none animate-fadeIn"
    >
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-16">
        <div className="max-w-xl">
          <span className="block font-mono text-[10px] tracking-widest text-garabel-accent uppercase mb-2 md:mb-3">
            MOCK COLLABORATIONS // SAMPLE LEDGER SERIES 01
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-light tracking-tight text-garabel-ink">
            Crafted with structural <span className="italic font-normal text-garabel-mid">integrity</span>.
          </h2>
        </div>
        <p className="text-xs md:text-sm font-sans font-light text-garabel-mid max-w-sm leading-relaxed">
          We treat physical containers like architectural masterpieces. No plastic laminates, no toxic glues — just pure organic fiber alignments, elite debossing geometry, and zero-compromise environmental weight.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PROJECTS_DATA.map((p) => (
          <div 
            key={p.id}
            onClick={() => setSelectedProject(p)}
            className="group relative rounded-lg border border-garabel-ink/10 bg-garabel-cream/40 overflow-hidden hover:bg-opacity-80 transition-all duration-500 shadow-craft-sm hover:shadow-craft-lg cursor-pointer flex flex-col h-full"
          >
            {/* Double-cut border layout inside for visual framing */}
            <div className="absolute inset-0 border-double-cut pointer-events-none rounded-lg"></div>
            
            {/* Tactile Texture Layers on Card */}
            <div className="absolute inset-0 paper-grain pointer-events-none opacity-15"></div>
            <div className="absolute inset-0 cardboard-fibres pointer-events-none opacity-[0.06]"></div>

            {/* Project Image Frame */}
            <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-garabel-ink/10 bg-garabel-sand bg-opacity-30">
              <div className="absolute inset-0 paper-grain pointer-events-none opacity-20"></div>
              <img 
                src={p.image} 
                alt={p.title} 
                className="w-full h-full object-cover grayscale opacity-[0.92] group-hover:scale-105 duration-1000 ease-out transition-transform"
                referrerPolicy="no-referrer"
              />
              {/* Image Border Cut */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-garabel-ink/10"></div>
            </div>

            {/* Info Frame */}
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <span className="block font-mono text-[9px] tracking-widest text-garabel-mid uppercase mb-2">
                  {p.category}
                </span>
                <h3 className="text-xl font-sans font-normal text-garabel-ink tracking-tight group-hover:text-garabel-accent transition-colors mb-3">
                  {p.title}
                </h3>
                <p className="text-xs font-sans font-light text-garabel-mid leading-relaxed mb-6">
                  {p.tagline}
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-garabel-ink/5 pt-4">
                <span className="font-mono text-[9px] text-garabel-mid tracking-wider uppercase">
                  WEIGHT: {p.paperWeight.split(" ")[0]} // {p.year}
                </span>
                <button className="flex items-center gap-1 font-mono text-[9px] text-garabel-ink tracking-widest uppercase group-hover:translate-x-1 duration-300 transition-transform">
                  <span>BLUEPRINT</span>
                  <ChevronRight className="w-3 h-3 text-garabel-accent" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Detailed Spec Drawer / Modal Backdrop */}
      {selectedProject && (
        <div className="fixed inset-0 bg-garabel-ink/30 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-xl border border-garabel-ink/20 bg-garabel-cream p-6 md:p-10 shadow-craft-lg overflow-y-auto max-h-[90vh] custom-scrollbar animate-scaleUp"
          >
            {/* Cardboard Background on Modal */}
            <div className="absolute inset-0 paper-grain pointer-events-none opacity-25"></div>
            <div className="absolute inset-0 cardboard-fibres pointer-events-none opacity-15"></div>

            {/* Cancel Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full border border-garabel-ink/10 hover:bg-garabel-sand bg-transparent text-garabel-ink/60 hover:text-garabel-ink transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Specifications Details */}
            <div className="relative z-10 space-y-6">
              
              {/* Categories */}
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-garabel-ink/10 bg-garabel-sand bg-opacity-35 font-mono text-[9px] text-garabel-mid tracking-widest uppercase">
                <Layers className="w-3 h-3" />
                <span>MATERIAL LEDGER // CLASS-A SPEC</span>
              </div>

              <h3 className="text-3xl font-sans font-light tracking-tight text-garabel-ink">
                Spec. {selectedProject.title}
              </h3>

              {/* Specs Table */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded border border-dashed border-garabel-ink/15 bg-garabel-light/40 my-4 font-mono text-[9px] tracking-widest text-garabel-mid">
                <div>
                  <span className="block font-bold text-garabel-ink uppercase mb-1">ORIGIN DATE</span>
                  <span>EST. {selectedProject.year}</span>
                </div>
                <div>
                  <span className="block font-bold text-garabel-ink uppercase mb-1">BOUND RATION</span>
                  <span>{selectedProject.dimensions}</span>
                </div>
                <div>
                  <span className="block font-bold text-garabel-ink uppercase mb-1">PAPER WEIGHT</span>
                  <span>{selectedProject.paperWeight}</span>
                </div>
                <div>
                  <span className="block font-bold text-garabel-ink uppercase mb-1">SUBSTRATE</span>
                  <span>PULP CORE SYSTEM</span>
                </div>
              </div>

              {/* Long Description and Narrative */}
              <div className="space-y-4">
                <h4 className="font-mono text-[10px] tracking-widest text-garabel-ink uppercase font-semibold flex items-center gap-2">
                  <CornerDownRight className="w-3.5 h-3.5 text-garabel-accent" />
                  <span>PROJECT SUMMARY BRIEF // LOG NOTE:</span>
                </h4>
                <p className="font-sans text-sm font-light text-garabel-ink/80 leading-relaxed pl-5">
                  {selectedProject.description}
                </p>
              </div>

              {/* Aesthetic metrics / achievements */}
              <div className="space-y-3 pt-4 border-t border-garabel-ink/10">
                <h4 className="font-mono text-[10px] tracking-widest text-garabel-ink font-semibold uppercase">
                  DELIBERATE OUTCOMES RECORDED:
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-[9px] tracking-wider text-garabel-mid">
                  {selectedProject.metrics.map((val, idx) => (
                    <li key={idx} className="flex items-center gap-2 px-3 py-2 rounded bg-garabel-sand bg-opacity-20 border border-garabel-ink/5">
                      <Compass className="w-3 h-3 text-garabel-accent opacity-70" />
                      <span>{val}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer CTA */}
              <div className="pt-6 flex justify-end gap-3">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded border border-garabel-ink/15 text-garabel-ink font-mono text-[10px] uppercase tracking-widest hover:bg-garabel-sand transition-colors cursor-pointer"
                >
                  Close Specification
                </button>
                <a 
                  href="mailto:urbanstructure@gmail.com"
                  className="flex items-center gap-2 px-5 py-2.5 rounded bg-garabel-ink text-garabel-cream font-mono text-[10px] uppercase tracking-widest hover:bg-opacity-90 transition-colors shadow-craft-sm cursor-pointer"
                >
                  <span>Request Replica</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
