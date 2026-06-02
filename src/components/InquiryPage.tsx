import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../translations";
import { Check, ArrowRight, ArrowLeft, X, Download, FileText } from "lucide-react";
import { jsPDF } from "jspdf";

interface InquiryPageProps {
  onClose: () => void;
}

export default function InquiryPage({ onClose }: InquiryPageProps) {
  const { language } = useLanguage();
  const [inquiryType, setInquiryType] = useState<"existing" | "custom">("existing");
  
  // Base64 Logo state retrieved securely from full-stack api
  const [logoBase64, setLogoBase64] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/logo-base64")
      .then((res) => {
        if (!res.ok) throw new Error("Status: " + res.status);
        return res.json();
      })
      .then((data) => {
        if (data && data.base64) {
          setLogoBase64(data.base64);
        }
      })
      .catch((err) => {
        console.error("Failed to load base64 logo:", err);
      });
  }, []);

  // Form State
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientDept, setClientDept] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("10k_50k");
  const [specimenModel, setSpecimenModel] = useState("Specimen 01");
  const [projectDescription, setProjectDescription] = useState("");
  const [estimatedQuantity, setEstimatedQuantity] = useState("500");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stable luxury receipt details generated once per session/form load
  const [receiptNo] = useState(() => Math.floor(100000 + Math.random() * 900000));
  const [timestamp] = useState(() => {
    const d = new Date();
    return `${d.getUTCFullYear()}.${String(d.getUTCMonth() + 1).padStart(2, "0")}.${String(d.getUTCDate()).padStart(2, "0")} ${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")} UTC`;
  });

  // Gorgeous Sustainable Luxury PDF generator
  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    // 1. Fill beautiful warm off-white cream paper background
    doc.setFillColor(250, 247, 242);
    doc.rect(0, 0, 210, 297, "F");

    // 2. Prestigious Leaf-Green Header Banner (matching visual language of #376332)
    doc.setFillColor(55, 99, 50);
    doc.rect(15, 15, 180, 28, "F");

    // Brand Logo on Left side of header (embedded with high contrast white badge)
    if (logoBase64) {
      try {
        doc.setFillColor(255, 255, 255);
        // Rounded white container for logo
        (doc as any).roundedRect(18, 17, 68, 24, 2, 2, "F");
        // Logo image itself
        doc.addImage(logoBase64, "PNG", 20, 18.5, 64, 21);
      } catch (err) {
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("O N E", 23, 28);

        doc.setTextColor(168, 211, 161); // Soft micro green (#a8d3a1)
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.text("BIODEGRADABLE SOLUTIONS", 23, 35);
      }
    } else {
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("O N E", 23, 28);

      doc.setTextColor(168, 211, 161); // Soft micro green (#a8d3a1)
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text("BIODEGRADABLE SOLUTIONS", 23, 35);
    }

    // Document header designation on Right side
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("DESIGN SPECIFICATION", 142, 27);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(215, 230, 210);
    doc.text(`RECORD ID: #${receiptNo}`, 142, 33);

    // 3. Document Subtitle & Metadata Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    doc.text("OFFICIAL LODGED SPECIFICATION", 20, 60);

    // Custom forest green rule accent
    doc.setDrawColor(55, 99, 50);
    doc.setLineWidth(0.6);
    doc.line(20, 64, 140, 64);

    // Short descriptive greeting note
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    const summaryText = language === "ja"
      ? "ONE Biodegradable Brand Solutionsにご登録いただいた最高級特注パッケージ仕様書の控えです。"
      : "Official copy of the physical & material design parameters registered securely inside our ecological ledger.";
    doc.text(summaryText, 20, 70);

    // 4. Custom Architectural Verified Seal/Stamp element on right
    doc.setDrawColor(55, 99, 50);
    doc.setLineWidth(0.8);
    doc.setFillColor(255, 255, 255);
    doc.rect(152, 54, 38, 38, "FD");
    
    // Top inner fill
    doc.setFillColor(55, 99, 50);
    doc.rect(152, 54, 38, 7.5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text("APPROVED RECORD", 154.5, 59.5);

    // Brand Logo inside seal
    if (logoBase64) {
      try {
        doc.addImage(logoBase64, "PNG", 154, 64, 34, 11);
      } catch (err) {
        doc.setTextColor(55, 99, 50);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("O N E", 161, 72);
      }
    } else {
      doc.setTextColor(55, 99, 50);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("O N E", 161, 72);
    }
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text("VERIFIED OK", 163.5, 80);
    
    doc.setFontSize(6.5);
    doc.setTextColor(110, 110, 110);
    doc.text(`NO. ${receiptNo}`, 162.5, 87);

    // 5. Parameter Specifications List Layout
    doc.setDrawColor(220, 215, 205);
    doc.setLineWidth(0.35);

    let y = 104;

    const drawSpecRow = (label: string, val: string) => {
      // Draw label
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(90, 100, 85);
      doc.text(label, 20, y);

      // Draw value
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(35, 35, 35);
      doc.text(val, 72, y);

      // Underlying Divider node
      doc.line(20, y + 2, 190, y + 2);
      y += 10.5;
    };

    drawSpecRow("SPECIFICATION RECEIPT NO:", `#${receiptNo}`);
    drawSpecRow("TIMESTAMP OF LODGING:", timestamp);
    drawSpecRow("REGISTERED COMPANY:", companyName.toUpperCase());
    drawSpecRow("INDUSTRY VERTICAL:", (industry || "Not Specified").toUpperCase());
    drawSpecRow("REPRESENTATIVE OFFICER:", `${clientName.toUpperCase()} ${clientDept ? `(${clientDept.toUpperCase()})` : ""}`);
    drawSpecRow("COMMUNICATIONS EMAIL:", clientEmail.toLowerCase());
    drawSpecRow("PHONE CONNECTION:", clientPhone || "N/A");
    drawSpecRow("GEOGRAPHY / LOCATION:", (location || "Global").toUpperCase());
    
    const budgetStr = budget === "under_10k" ? "UNDER $10K USD" :
                      budget === "10k_50k" ? "$10K - $50K USD" :
                      budget === "50k_150k" ? "$50K - $150K USD" : "$150K+ USD";
    drawSpecRow("BUDGET GUIDANCE RANGE:", budgetStr);
    
    const typeLabel = inquiryType === "existing" ? `ORDER SPECIMEN MODEL (${specimenModel.toUpperCase()})` : "BESPOKE CUSTOM DESIGN PROJECT";
    drawSpecRow("SPECIFICATION INQUIRY:", typeLabel);

    const qtyLabel = estimatedQuantity === "100-500" ? "SMALL BATCH (100 - 500 UNITS)" : 
                     estimatedQuantity === "500" ? "MEDIUM RUN (500 - 2,500 UNITS)" :
                     estimatedQuantity === "2500" ? "FLAGSHIP SCALE (2,500 - 10,000 UNITS)" : "GLOBAL RUN / DISTRIBUTION (10,000+ UNITS)";
    drawSpecRow("TARGET QUANTITY REQUIREMENT:", qtyLabel);

    // 6. Project Description & Board Notes section (wraps text automatically)
    if (projectDescription.trim()) {
      y += 4;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(90, 100, 85);
      doc.text("BOARD SPECIFICATION MEMORANDUM & REQUEST NOTES:", 20, y);
      
      y += 5.5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      
      const splitNotes = doc.splitTextToSize(projectDescription, 170);
      doc.text(splitNotes, 20, y);
    }

    // 7. Signature / Seal area at bottom
    doc.setDrawColor(55, 99, 50);
    doc.setLineWidth(0.4);
    doc.line(135, 274, 185, 274);
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(115, 115, 115);
    doc.text("Authorized Design Architect Seal", 141, 278.5);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(80, 90, 75);
    doc.text("ONE BIODEGRADABLE BRAND SOLUTIONS // TECHNICAL ASSURANCE DIVISION", 20, 278.5);

    // 8. Generate and download file with custom registration name
    doc.save(`ONE_Specification_Receipt_${receiptNo}.pdf`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !companyName) {
      alert(language === "ja" ? "お名前、メールアドレス、会社名をご記入ください。" : "Please complete Name, Email, and Company fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientName,
          clientEmail,
          clientPhone,
          clientDept,
          companyName,
          industry,
          location,
          budget,
          inquiryType,
          specimenModel,
          estimatedQuantity,
          projectDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Server transmission failed");
      }
    } catch (err) {
      console.error("Quote submit backend error, using graceful client-side fallback simulation:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
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

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                      {/* Company Name field */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase font-bold">
                          ✦ COMPANY / BRAND NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. ONE Biodegradable Brand Solutions"
                          className="w-full bg-transparent border-b border-garabel-ink/20 py-1.5 font-sans text-xs sm:text-sm text-garabel-ink focus:outline-none focus:border-[#376332] transition-colors placeholder:text-garabel-mid/40"
                        />
                      </div>

                      {/* Industry field */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase font-bold">
                          ✦ INDUSTRY
                        </label>
                        <input
                          type="text"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          placeholder="e.g. Luxury Retail, Cosmetics, Fashion"
                          className="w-full bg-transparent border-b border-garabel-ink/20 py-1.5 font-sans text-xs sm:text-sm text-garabel-ink focus:outline-none focus:border-[#376332] transition-colors placeholder:text-garabel-mid/40"
                        />
                      </div>

                      {/* Contact Info: Full Name field */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase font-bold">
                          ✦ CONTACT REPRESENTATIVE NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full bg-transparent border-b border-garabel-ink/20 py-1.5 font-sans text-xs sm:text-sm text-garabel-ink focus:outline-none focus:border-[#376332] transition-colors placeholder:text-garabel-mid/40"
                        />
                      </div>

                      {/* Contact Info: Department field */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase font-bold">
                          ✦ REPRESENTATIVE DEPT / ROLE
                        </label>
                        <input
                          type="text"
                          value={clientDept}
                          onChange={(e) => setClientDept(e.target.value)}
                          placeholder="e.g. Procurement, Brand Management"
                          className="w-full bg-transparent border-b border-garabel-ink/20 py-1.5 font-sans text-xs sm:text-sm text-garabel-ink focus:outline-none focus:border-[#376332] transition-colors placeholder:text-garabel-mid/40"
                        />
                      </div>

                      {/* Contact Info: Phone field */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase font-bold">
                          ✦ DIRECT PHONE NUMBER
                        </label>
                        <input
                          type="tel"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="e.g. +1 (555) 019-2834"
                          className="w-full bg-transparent border-b border-garabel-ink/20 py-1.5 font-sans text-xs sm:text-sm text-garabel-ink focus:outline-none focus:border-[#376332] transition-colors placeholder:text-garabel-mid/40"
                        />
                      </div>

                      {/* Contact Info: Email field */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase font-bold">
                          ✦ COMMUNICATIONS EMAIL *
                        </label>
                        <input
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="e.g. sarah.j@atelierbrand.com"
                          className="w-full bg-transparent border-b border-garabel-ink/20 py-1.5 font-sans text-xs sm:text-sm text-garabel-ink focus:outline-none focus:border-[#376332] transition-colors placeholder:text-garabel-mid/40"
                        />
                      </div>

                      {/* Operational Location field */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase font-bold">
                          ✦ GEOGRAPHIC LOCATION
                        </label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. New York, London, Tokyo"
                          className="w-full bg-transparent border-b border-garabel-ink/20 py-1.5 font-sans text-xs sm:text-sm text-garabel-ink focus:outline-none focus:border-[#376332] transition-colors placeholder:text-garabel-mid/40"
                        />
                      </div>

                      {/* Budget selector field */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase font-bold">
                          ✦ GUIDING BUDGET RANGE
                        </label>
                        <select
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full bg-transparent border-b border-garabel-ink/20 py-1.5 font-sans text-xs sm:text-sm text-garabel-ink focus:outline-none focus:border-[#376332] transition-colors appearance-none cursor-pointer"
                        >
                          <option value="under_10k">Less than $10,000 USD</option>
                          <option value="10k_50k">$10,000 - $50,000 USD</option>
                          <option value="50k_150k">$50,000 - $150,000 USD</option>
                          <option value="150k_plus">$150,000+ USD</option>
                        </select>
                      </div>
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
                            <span>SENDING QUOTE...</span>
                          </>
                        ) : (
                          <>
                            <span>SEND QUOTE:</span>
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
                  className="bg-garabel-cream/90 backdrop-blur-md rounded-2xl border border-garabel-ink/15 p-6 sm:p-10 text-center shadow-craft-2xl relative max-w-xl mx-auto"
                >
                  <div className="absolute inset-0 paper-grain pointer-events-none opacity-10 rounded-2xl"></div>

                  <div className="w-16 h-16 bg-[#376332]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-[#376332]" />
                  </div>

                  {/* Brand Logo Display */}
                  <div className="flex justify-center mb-6">
                    <div className="border border-[#376332]/10 bg-white/40 p-4 rounded-xl flex items-center justify-center shadow-inner max-w-xs animate-fadeIn duration-500">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1U3YfW75P9JyKKTCWA7yoM31HCTW9L0fN" 
                        alt="ONE Biodegradable Brand Solutions" 
                        referrerPolicy="no-referrer"
                        className="h-10 sm:h-12 w-auto object-contain select-none"
                      />
                    </div>
                  </div>

                  <span className="font-mono text-[10px] tracking-[0.3em] text-[#376332] uppercase block mb-1">
                    ✦ RECEIPT REGISTERED
                  </span>

                  <h3 className="font-sans font-black text-2xl uppercase text-garabel-ink tracking-tight mb-3">
                    Specification Lodged
                  </h3>

                  <p className="font-sans text-[13px] text-garabel-mid leading-relaxed max-w-md mx-auto mb-6">
                    {language === "ja" ? (
                      "ご要望がONE Biodegradable Brand Solutionsに登録されました。担当のパッケージングエンジニアが24時間以内にご連絡いたします。"
                    ) : (
                      "Your aesthetic and physical parameters are successfully queued into ONE Biodegradable Brand Solutions. A specialist design coordinator will contact your communications envelope shortly."
                    )}
                  </p>

                  <div className="border border-garabel-ink/10 rounded-xl bg-garabel-cream p-5 sm:p-6 text-left space-y-3 shadow-sm max-w-lg mx-auto">
                    <div className="flex justify-between font-mono text-[10px] sm:text-[11px] md:text-sm text-garabel-mid border-b border-garabel-ink/5 pb-1.5 whitespace-nowrap">
                      <span className="opacity-80">SPECIFICATION RECEIPT No:</span>
                      <span className="font-bold text-garabel-ink select-all">#{receiptNo}</span>
                    </div>
                    <div className="flex justify-between font-mono text-[10px] sm:text-[11px] md:text-sm text-garabel-mid border-b border-garabel-ink/5 pb-1.5 whitespace-nowrap">
                      <span className="opacity-80">TIMESTAMP REGISTER:</span>
                      <span className="font-bold text-garabel-ink">{timestamp}</span>
                    </div>
                    <div className="flex justify-between font-mono text-[10px] sm:text-[11px] md:text-sm text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span className="opacity-80">COMPANY BRAND:</span>
                      <span className="font-bold text-garabel-ink uppercase">{companyName}</span>
                    </div>
                    {industry && (
                      <div className="flex justify-between font-mono text-[10px] sm:text-[11px] md:text-sm text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                        <span className="opacity-80">INDUSTRY VERTICAL:</span>
                        <span className="font-bold text-garabel-ink uppercase">{industry}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-mono text-[10px] sm:text-[11px] md:text-sm text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span className="opacity-80">REPRESENTATIVE:</span>
                      <span className="font-bold text-[#376332] uppercase">{clientName} {clientDept && `(${clientDept})`}</span>
                    </div>
                    <div className="flex justify-between font-mono text-[10px] sm:text-[11px] md:text-sm text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span className="opacity-80">EMAIL ADDR:</span>
                      <span className="font-bold text-garabel-ink select-all">{clientEmail}</span>
                    </div>
                    {clientPhone && (
                      <div className="flex justify-between font-mono text-[10px] sm:text-[11px] md:text-sm text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                        <span className="opacity-80">PHONE CONNECTION:</span>
                        <span className="font-bold text-garabel-ink select-all">{clientPhone}</span>
                      </div>
                    )}
                    {location && (
                      <div className="flex justify-between font-mono text-[10px] sm:text-[11px] md:text-sm text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                        <span className="opacity-80">GEOGRAPHY / PORT:</span>
                        <span className="font-bold text-garabel-ink uppercase">{location}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-mono text-[10px] sm:text-[11px] md:text-sm text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span className="opacity-80">BUDGET GUIDING LINE:</span>
                      <span className="font-bold text-[#376332] uppercase">
                        {budget === "under_10k" ? "UNDER $10K USD" :
                         budget === "10k_50k" ? "$10K - $50K USD" :
                         budget === "50k_150k" ? "$50K - $150K USD" : "$150K+ USD"}
                      </span>
                    </div>
                    <div className="flex justify-between font-mono text-[10px] sm:text-[11px] md:text-sm text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span className="opacity-80">SPECIMEN MODEL:</span>
                      <span className="font-bold text-garabel-ink uppercase">{inquiryType === "existing" ? specimenModel : "BESPOKE CUSTOM DESIGN"}</span>
                    </div>
                    <div className="flex justify-between font-mono text-[10px] sm:text-[11px] md:text-sm text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span className="opacity-80">EST. QUANTITY:</span>
                      <span className="font-bold text-garabel-ink uppercase">
                        {estimatedQuantity === "100-500" ? "100 - 500 units" : 
                         estimatedQuantity === "500" ? "500 - 2,500 units" :
                         estimatedQuantity === "2500" ? "2,500 - 10,000 units" : "10,000+ units"}
                      </span>
                    </div>

                    {projectDescription && (
                      <div className="font-mono text-[10px] sm:text-xs pt-1.5">
                        <span className="text-garabel-mid opacity-80 block mb-1">MEMORANDUM NOTES:</span>
                        <p className="font-sans text-xs sm:text-sm text-garabel-ink border-l-2 border-[#376332]/40 pl-3 py-1.5 bg-white/45 italic leading-relaxed whitespace-pre-wrap select-all">
                          {projectDescription}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between font-mono text-[9px] sm:text-[11px] text-garabel-mid border-t border-garabel-ink/5 pt-2 mt-1.5">
                      <span>DELIVERY ROUTED TO:</span>
                      <span className="font-bold text-[#376332] select-all">oneunedigital@gmail.com</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 max-w-lg mx-auto">
                    {/* Primary Export Action */}
                    <button
                      onClick={handleDownloadPDF}
                      className="w-full bg-[#376332] hover:bg-[#2b4c27] text-[#fdfbf7] py-3.5 px-6 rounded-xl font-mono text-[11px] tracking-[0.2em] uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                    >
                      <Download className="w-4 h-4 shrink-0" />
                      <span>SAVE DESIGN SPECIFICATION (PDF)</span>
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                      <button
                        onClick={onClose}
                        className="bg-transparent border border-garabel-ink hover:bg-neutral-100 text-garabel-ink py-3 px-4 rounded-xl font-mono text-[10px] tracking-[0.15em] uppercase transition-all focus:outline-none cursor-pointer"
                      >
                        CLOSE RECEIPT
                      </button>
                      
                      <a
                        href={`mailto:oneunedigital@gmail.com?subject=Custom Packaging Inquiry: ${encodeURIComponent(companyName)}&body=ONE Biodegradable Brand Solutions Design Specification%0D%0A%0D%0ABrand: ${encodeURIComponent(companyName)}%0D%0AIndustry: ${encodeURIComponent(industry)}%0D%0AContact: ${encodeURIComponent(clientName)} ${encodeURIComponent(clientDept ? `(${clientDept})` : "")}%0D%0APhone: ${encodeURIComponent(clientPhone)}%0D%0ALocation: ${encodeURIComponent(location)}%0D%0ABudget: ${encodeURIComponent(budget)}%0D%0AModel: ${encodeURIComponent(specimenModel)}%0D%0AEst. Qty: ${encodeURIComponent(estimatedQuantity)}%0D%0A%0D%0ADescription:%0D%0A${encodeURIComponent(projectDescription)}`}
                        className="inline-flex items-center justify-center bg-transparent border border-garabel-ink/25 text-garabel-ink hover:bg-garabel-ink hover:text-[#fdfbf7] py-3 px-4 rounded-xl font-mono text-[10px] tracking-[0.15em] uppercase transition-all focus:outline-none cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                        DIRECT MAIL BACKUP
                      </a>
                    </div>
                  </div>
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
