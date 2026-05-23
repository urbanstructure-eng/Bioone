import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../translations";
import { Check, ArrowRight, ArrowLeft, X } from "lucide-react";

interface InquiryPageProps {
  onClose: () => void;
}

export default function InquiryPage({ onClose }: InquiryPageProps) {
  const { language } = useLanguage();
  const [inquiryType, setInquiryType] = useState<"existing" | "custom">("existing");
  
  // Form State
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [specimenModel, setSpecimenModel] = useState("Specimen 01");
  const [projectDescription, setProjectDescription] = useState("");
  const [estimatedQuantity, setEstimatedQuantity] = useState("500");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      alert(language === "ja" ? "お名前とメールアドレスをご記入ください。" : "Please complete Name and Email fields.");
      return;
    }

    setIsSubmitting(true);
    // Simulate quiet luxury loading time
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <>
      {/* Editorial Dimmed Backdrop Overlay (Clicking this or the Close icon closes the drawer) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0f0e0d]/50 backdrop-blur-xs z-[90] cursor-pointer"
      />

      {/* Slide-In Tactile Drawer Panel */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 top-0 bottom-0 h-screen z-[100] w-full bg-garabel-bg text-garabel-ink overflow-y-auto shadow-[20px_0_60px_rgba(0,0,0,0.25)] flex flex-col justify-start pt-20 sm:pt-24 px-6 sm:px-12 pb-16"
      >
        {/* Subtle Paper Texture Layer inside drawer */}
        <div className="absolute inset-0 paper-grain pointer-events-none opacity-20 z-0 select-none"></div>

        {/* Tactile Circular Close Button inside drawer top corner */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-8 sm:right-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-garabel-cream border-2 border-[#376332]/30 flex items-center justify-center hover:border-[#376332] hover:bg-white cursor-pointer transition-all duration-300 transform hover:scale-110 active:scale-95 group z-50 text-[#376332] shadow-craft-md hover:shadow-craft-xl focus:outline-none"
          aria-label="Close Inquiry Drawer"
        >
          <div className="absolute inset-0 paper-grain pointer-events-none opacity-20 rounded-full"></div>
          <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] text-[#376332] group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col space-y-10">
          
          {/* Editorial Brand Specification Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-4"
          >
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-[#376332] uppercase block">
              ✦ OFFICE OF ACQUISITION // SPECIFICATION DESK
            </span>
            <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl uppercase text-garabel-ink tracking-tight leading-[0.95]">
              {language === "ja" ? (
                <>特注・仕様<br />お申し込み</>
              ) : (
                <>Spec & Custom<br />Request Desk</>
              )}
            </h1>
            <div className="w-12 h-0.5 bg-[#376332] mt-4"></div>
            
            <p className="font-sans text-[12px] sm:text-[13px] text-garabel-mid leading-relaxed max-w-md pt-2">
              {language === "ja" ? (
                "アトリエ・ガラベルの既存スペシメンのご注文、またはご希望の仕様に合わせた完全オリジナルの特注プロジェクトの計画をご案内します。お気軽にお問い合わせください。"
              ) : (
                "Initiate order placement for our existing structural specimens or request bespoke material designs. Our artisans and engineers formulate sustainable fiber alignments tailored perfectly to your brand presence."
              )}
            </p>
          </motion.div>

          {/* Form Container */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="bg-garabel-cream/85 backdrop-blur-md rounded-2xl border border-garabel-ink/10 p-5 sm:p-8 shadow-craft-lg relative"
                >
                  <div className="absolute inset-0 paper-grain pointer-events-none opacity-10 rounded-2xl"></div>

                  {/* Micro selector */}
                  <div className="flex border-b border-garabel-ink/10 pb-5 mb-6">
                    <button
                      type="button"
                      onClick={() => setInquiryType("existing")}
                      className={`flex-1 pb-2 font-mono text-[10px] sm:text-[11px] tracking-widest font-bold uppercase transition-all relative ${
                        inquiryType === "existing" ? "text-[#376332] font-black" : "text-garabel-mid hover:text-garabel-ink"
                      }`}
                    >
                      {inquiryType === "existing" && (
                        <motion.div layoutId="typeIndicator" className="absolute bottom-0 inset-x-0 h-[2px] bg-[#376332]" />
                      )}
                      {language === "ja" ? "01 / モデル注文" : "01 / ORDER MODEL"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setInquiryType("custom")}
                      className={`flex-1 pb-2 font-mono text-[10px] sm:text-[11px] tracking-widest font-bold uppercase transition-all relative ${
                        inquiryType === "custom" ? "text-[#376332] font-black" : "text-garabel-mid hover:text-garabel-ink"
                      }`}
                    >
                      {inquiryType === "custom" && (
                        <motion.div layoutId="typeIndicator" className="absolute bottom-0 inset-x-0 h-[2px] bg-[#376332]" />
                      )}
                      {language === "ja" ? "02 / カスタム設計" : "02 / Bespoke CUSTOM"}
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name field */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase">
                        ✦ FULL NAME OR REGISTERED BRAND
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Atelier Garabel Co."
                        className="w-full bg-transparent border-b border-garabel-ink/20 py-1.5 font-sans text-xs sm:text-sm text-garabel-ink focus:outline-none focus:border-[#376332] transition-colors placeholder:text-garabel-mid/40"
                      />
                    </div>

                    {/* Email field */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase">
                        ✦ COMMUNICATIONS EMAIL
                      </label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="e.g. atelier@brand.com"
                        className="w-full bg-transparent border-b border-garabel-ink/20 py-1.5 font-sans text-xs sm:text-sm text-garabel-ink focus:outline-none focus:border-[#376332] transition-colors placeholder:text-garabel-mid/40"
                      />
                    </div>

                    {/* Choice Dependent fields */}
                    {inquiryType === "existing" ? (
                      <div className="flex flex-col space-y-1.5 animate-fadeIn">
                        <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase">
                          ✦ SELECT EXISTING SPECIMEN MODEL
                        </label>
                        <select
                          value={specimenModel}
                          onChange={(e) => setSpecimenModel(e.target.value)}
                          className="w-full bg-transparent border-b border-garabel-ink/20 py-1.5 font-sans text-xs sm:text-sm text-garabel-ink focus:outline-none focus:border-[#376332] transition-colors appearance-none cursor-pointer"
                        >
                          <option value="Specimen 01">Specimen 01 // Slit Tube Box</option>
                          <option value="Specimen 02">Specimen 02 // Hexagonal Shell</option>
                          <option value="Specimen 03">Specimen 03 // Ribbed Hinge Case</option>
                          <option value="Specimen 04">Specimen 04 // Cardboard Cord Carrier</option>
                          <option value="Specimen 05">Specimen 05 // Heavy Linen Specimen Set</option>
                        </select>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-1.5 animate-fadeIn">
                        <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase">
                          ✦ ECO INTEGRATION PRINCIPLES
                        </label>
                        <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[8px] sm:text-[8.5px] tracking-wider">
                          <span className="flex items-center gap-1.5 text-garabel-ink">
                            <Check className="w-3 h-3 text-[#376332]" /> 100% PLASTIC-FREE
                          </span>
                          <span className="flex items-center gap-1.5 text-garabel-ink">
                            <Check className="w-3 h-3 text-[#376332]" /> ORGANIC BIODEGRADABILITY
                          </span>
                          <span className="flex items-center gap-1.5 text-garabel-ink">
                            <Check className="w-3 h-3 text-[#376332]" /> INVISIBLE RFID CHIPS
                          </span>
                          <span className="flex items-center gap-1.5 text-garabel-ink">
                            <Check className="w-3 h-3 text-[#376332]" /> DEBOSSING METALS
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Target Quantities Selection */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase">
                        ✦ TARGET QUANTITY SCOPE
                      </label>
                      <select
                        value={estimatedQuantity}
                        onChange={(e) => setEstimatedQuantity(e.target.value)}
                        className="w-full bg-transparent border-b border-garabel-ink/20 py-1.5 font-sans text-xs sm:text-sm text-garabel-ink focus:outline-none focus:border-[#376332] transition-colors appearance-none cursor-pointer"
                      >
                        <option value="100-500">Small Batch (100 - 500 units)</option>
                        <option value="500">Medium Run (500 - 2,500 units)</option>
                        <option value="2500">Flagship Scale (2,500 - 10,000 units)</option>
                        <option value="10000+">Global Distribution (10,000+ units)</option>
                      </select>
                    </div>

                    {/* Memorandum Message details */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase">
                        ✦ SPECIFICATION MEMORANDUM & REQUEST NOTES
                      </label>
                      <textarea
                        rows={2}
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        placeholder="Outline any dimensional details, weight specifications, design goals or core materials needed..."
                        className="w-full bg-transparent border-b border-garabel-ink/20 py-1.5 font-sans text-xs sm:text-sm text-garabel-ink focus:outline-none focus:border-[#376332] transition-colors resize-none placeholder:text-garabel-mid/40"
                      ></textarea>
                    </div>

                    {/* Submit button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#376332] hover:bg-[#376332]/90 disabled:bg-[#376332]/60 text-[#fdfbf7] py-3 sm:py-3.5 px-6 rounded-xl font-mono text-[10px] tracking-[0.25em] font-bold uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-1.5 h-1.5 bg-[#fdfbf7] rounded-full animate-ping" />
                            <span>REGISTERING MEMORANDUM...</span>
                          </>
                        ) : (
                          <>
                            <span>LODGE REGISTER REQUISITION</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#fdfbf7]" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="bg-garabel-cream/90 backdrop-blur-md rounded-2xl border border-garabel-ink/15 p-6 sm:p-10 text-center shadow-craft-2xl relative"
                >
                  <div className="absolute inset-0 paper-grain pointer-events-none opacity-10 rounded-2xl"></div>

                  <div className="w-14 h-14 bg-[#376332]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Check className="w-6 h-6 text-[#376332]" />
                  </div>

                  <span className="font-mono text-[9px] tracking-[0.3em] text-[#376332] uppercase block mb-1">
                    ✦ RECEIPT REGISTERED
                  </span>

                  <h3 className="font-sans font-black text-xl uppercase text-garabel-ink tracking-tight mb-3">
                    Specification Lodged
                  </h3>

                  <p className="font-sans text-xs text-garabel-mid leading-relaxed max-w-sm mx-auto mb-6">
                    {language === "ja" ? (
                      "ご要望がサーバーアトリエ台帳に登録されました。担当のパッケージングエンジニアが24時間以内にご連絡いたします。"
                    ) : (
                      "Your aesthetic and physical parameters are successfully queued into our Atelier ledger. A specialist design coordinator will contact your communications envelope shortly."
                    )}
                  </p>

                  <div className="border-t border-garabel-ink/10 pt-5 max-w-xs mx-auto space-y-1.5">
                    <div className="flex justify-between font-mono text-[8px] text-garabel-mid">
                      <span>SPEC No:</span>
                      <span className="font-bold text-garabel-ink">#{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between font-mono text-[8px] text-garabel-mid">
                      <span>TIMESTAMP:</span>
                      <span className="font-bold text-garabel-ink">2026.05.23 UTC</span>
                    </div>
                    <div className="flex justify-between font-mono text-[8px] text-garabel-mid">
                      <span>REPRESENTATIVE:</span>
                      <span className="font-bold text-[#376332]">{clientName.toUpperCase()}</span>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="mt-6 bg-garabel-ink hover:bg-neutral-800 text-[#fdfbf7] py-3 px-6 rounded-xl font-mono text-[10px] tracking-[0.2em] uppercase transition-all shadow-md focus:outline-none cursor-pointer"
                  >
                    RETURN TO WORKSHOP
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-3 pb-6 flex justify-center">
            <button
              onClick={onClose}
              className="group flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] font-bold text-garabel-ink uppercase hover:text-[#376332] transition-colors focus:outline-none cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>BACK TO WORKSHOP</span>
            </button>
          </div>

        </div>
      </motion.div>
    </>
  );
}
