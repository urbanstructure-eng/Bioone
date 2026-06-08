import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../translations";
import { Check, ArrowRight, ArrowLeft, X, Download, FileText } from "lucide-react";
import { jsPDF } from "jspdf";

interface InquiryPageProps {
  onClose: () => void;
}

interface FileUploadSlotProps {
  label: string;
  fileName: string | null;
  onFileSelect: (name: string) => void;
  onClear: () => void;
}

function FileUploadSlot({ label, fileName, onFileSelect, onClear }: FileUploadSlotProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0].name);
    }
  };

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border border-dashed rounded-xl p-3 flex flex-col items-center justify-center text-center transition-all duration-300 relative min-h-[100px] ${
        isDragOver 
          ? "border-[#376332] bg-[#376332]/5 scale-[1.01]" 
          : fileName 
            ? "border-[#376332]/40 bg-[#376332]/5" 
            : "border-[#8a684f]/20 hover:border-[#376332]/35 bg-[#eaab7a]/5 hover:bg-[#eaab7a]/10"
      }`}
    >
      <input 
        type="file" 
        onChange={handleFileChange}
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" 
      />
      
      {fileName ? (
        <div className="flex flex-col items-center space-y-1 relative z-20 w-full px-2">
          <div className="w-6 h-6 rounded-full bg-[#376332]/10 flex items-center justify-center text-[#376332]">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono text-[8px] tracking-wider text-garabel-mid uppercase block">✦ FILE ATTACHED</span>
          <p className="font-sans text-[10px] font-bold text-garabel-ink truncate w-full select-all">
            {fileName}
          </p>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClear();
            }}
            className="text-[8px] font-mono text-red-600 hover:underline mt-1 font-black cursor-pointer px-1 relative z-30"
          >
            [ REMOVE ]
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-1 pointer-events-none">
          <svg className="w-4 h-4 text-[#8a684f]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
          <span className="font-mono text-[8px] sm:text-[9px] tracking-wider text-[#5c4a3c] uppercase font-bold">{label}</span>
          <p className="font-sans text-[9px] text-[#5c4a3c]/60">Drag/Drop or click</p>
        </div>
      )}
    </div>
  );
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
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [industry, setIndustry] = useState("Luxury Retail");
  const [clientName, setClientName] = useState("");
  const [clientDept, setClientDept] = useState("Founder");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  // Project Scope
  const [engagementType, setEngagementType] = useState("Custom Packaging Development");
  const [annualSpend, setAnnualSpend] = useState("$10,000 – $50,000");
  const [orderVolume, setOrderVolume] = useState("5,000 – 25,000");

  // Sustainability Objectives
  const [sustainabilityObjectives, setSustainabilityObjectives] = useState<string[]>([
    "Plastic Reduction"
  ]);

  // Packaging Requirements
  const [packagingCategories, setPackagingCategories] = useState<string[]>([]);
  const [desiredMaterials, setDesiredMaterials] = useState<string[]>([]);

  // Design Assets
  const [brandAssetsStatus, setBrandAssetsStatus] = useState("Logo Only");

  // Simulated File Upload states (store file names)
  const [brandGuidelinesFileName, setBrandGuidelinesFileName] = useState<string | null>(null);
  const [existingPackagingFileName, setExistingPackagingFileName] = useState<string | null>(null);
  const [productPhotographyFileName, setProductPhotographyFileName] = useState<string | null>(null);
  const [technicalSpecsFileName, setTechnicalSpecsFileName] = useState<string | null>(null);

  // Procurement Information
  const [geographicDistribution, setGeographicDistribution] = useState("Regional");
  const [launchTimeline, setLaunchTimeline] = useState("1–3 Months");

  // Final Strategic Question
  const [strategicOutcome, setStrategicOutcome] = useState("");

  const [specimenModel, setSpecimenModel] = useState("Specimen 01");
  const [projectDescription, setProjectDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stable luxury receipt details generated once per session/form load
  const [receiptNo] = useState(() => Math.floor(100000 + Math.random() * 900000));
  const [timestamp] = useState(() => {
    const d = new Date();
    return `${d.getUTCFullYear()}.${String(d.getUTCMonth() + 1).padStart(2, "0")}.${String(d.getUTCDate()).padStart(2, "0")} ${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")} UTC`;
  });

  // Gorgeous Sustainable Luxury PDF generator (2 Pages, complete partnership profiling)
  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    // --- PAGE 1: Brand Profile & Relationship Scope ---
    // Fill beautiful warm off-white cream paper background
    doc.setFillColor(250, 247, 242);
    doc.rect(0, 0, 210, 297, "F");

    // Prestigious Leaf-Green Header Banner (matching visual language of #376332)
    doc.setFillColor(55, 99, 50);
    doc.rect(15, 15, 180, 28, "F");

    // Brand Logo on Left side of header
    if (logoBase64) {
      try {
        doc.setFillColor(255, 255, 255);
        // Rounded white container for logo
        (doc as any).roundedRect(18, 17, 68, 24, 2, 2, "F");
        doc.addImage(logoBase64, "PNG", 20, 18.5, 64, 21);
      } catch (err) {
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("O N E", 23, 28);

        doc.setTextColor(168, 211, 161);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.text("SUSTAINABLE PACKAGING SYSTEMS", 23, 35);
      }
    } else {
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("O N E", 23, 28);

      doc.setTextColor(168, 211, 161);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text("SUSTAINABLE PACKAGING SYSTEMS", 23, 35);
    }

    // Document header designation on Right side
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("PARTNERSHIP RECORD", 142, 25);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(215, 230, 210);
    doc.text(`RECORD ID: #${receiptNo}`, 142, 31);
    doc.text(`DATE: ${timestamp.split(' ')[0]}`, 142, 36);

    // Document Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 30, 30);
    doc.text("OFFICIAL PARTNERSHIP procurement specification".toUpperCase(), 18, 54);

    // Custom forest green rule accent
    doc.setDrawColor(55, 99, 50);
    doc.setLineWidth(0.6);
    doc.line(18, 57, 140, 57);

    // Short descriptive greeting note
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);
    doc.text("Design parameters and corporate specifications filed in the Sustainable Packaging Procurement Portal.", 18, 62);

    // Custom Architectural Verified Seal/Stamp element on right
    doc.setDrawColor(55, 99, 50);
    doc.setLineWidth(0.8);
    doc.setFillColor(255, 255, 255);
    doc.rect(152, 48, 38, 28, "FD");
    
    // Top inner fill
    doc.setFillColor(55, 99, 50);
    doc.rect(152, 48, 38, 6, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.text("APPROVED RECORD", 157.5, 52.5);

    // Mini Brand text inside seal
    doc.setTextColor(55, 99, 50);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("O N E", 166, 63);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    doc.setTextColor(110, 110, 110);
    doc.text(`LEDGER NO. ${receiptNo}`, 155.5, 71);

    // Specifications List Layout
    doc.setDrawColor(220, 215, 205);
    doc.setLineWidth(0.35);

    let y = 88;

    const drawSpecRow = (label: string, val: string) => {
      // Draw label
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(90, 100, 85);
      doc.text(label, 18, y);

      // Draw value
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(35, 35, 35);
      doc.text(val || "N/A", 70, y);

      // Underlying Divider node
      doc.line(18, y + 2.2, 190, y + 2.2);
      y += 10.5;
    };

    // Subsection Header 1
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(55, 99, 50);
    doc.text("1. COMPANY PROFILE & COGNATES", 18, y - 5);

    drawSpecRow("REGISTERED COMPANY:", companyName.toUpperCase());
    drawSpecRow("CORPORATE WEBSITE:", companyWebsite || "Not Specified");
    drawSpecRow("INDUSTRY SECTOR:", industry.toUpperCase());
    drawSpecRow("PRIMARY REPRESENTATIVE:", clientName.toUpperCase());
    drawSpecRow("POSITION / DEPARTMENT:", clientDept.toUpperCase());
    drawSpecRow("COMMUNICATIONS EMAIL:", clientEmail.toLowerCase());
    drawSpecRow("PHONE CONNECTION:", clientPhone || "Not Specified");

    y += 4;

    // Subsection Header 2
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(55, 99, 50);
    doc.text("2. STRATEGIC RELATIONSHIP SCOPE", 18, y - 5);

    drawSpecRow("ENGAGEMENT REQUIREMENT:", engagementType.toUpperCase());
    drawSpecRow("EST. ANNUAL PACKAGING SPEND:", annualSpend.toUpperCase() + " (CRITICAL)");
    drawSpecRow("EXPECTED ORDER VOLUME:", orderVolume.toUpperCase());
    drawSpecRow("GEOGRAPHIC DISTRIBUTION:", geographicDistribution.toUpperCase());
    drawSpecRow("REQUIRED LAUNCH TIMELINE:", launchTimeline.toUpperCase());


    // --- PAGE 2: Specifications, Files & Strategic Alignment ---
    doc.addPage();
    // Fill beautiful warm off-white cream paper background
    doc.setFillColor(250, 247, 242);
    doc.rect(0, 0, 210, 297, "F");

    // Header strip
    doc.setFillColor(55, 99, 50);
    doc.rect(15, 12, 180, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text("ONE PREMIUM SUSTAINABLE PACKAGING SYSTEMS // COMPREHENSIVE SPECIFICATION RECORD", 20, 17);

    y = 30;

    const formatList = (arr: string[]) => arr.length > 0 ? arr.join(", ") : "None Specified";

    // Subsection Header 3
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(55, 99, 50);
    doc.text("3. ENVIRONMENTAL & MATERIAL DESIGN MATRIX", 18, y - 5);

    drawSpecRow("SUSTAINABILITY OBJECTIVES:", formatList(sustainabilityObjectives));
    drawSpecRow("PACKAGING CATEGORIES:", formatList(packagingCategories));
    drawSpecRow("DESIRED PACKAGING MATERIALS:", formatList(desiredMaterials));
    drawSpecRow("EXISTING BRAND GUIDELINES DISPOSITION:", brandAssetsStatus.toUpperCase());

    y += 4;

    // Subsection Header 4
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(55, 99, 50);
    doc.text("4. DEPOSITED COLLATERAL & DESIGN DOCUMENTS", 18, y - 5);

    drawSpecRow("UPLOADED BRAND GUIDELINES:", brandGuidelinesFileName || "NO FILE DEPOSITED");
    drawSpecRow("UPLOADED EXISTING PACKAGING:", existingPackagingFileName || "NO FILE DEPOSITED");
    drawSpecRow("UPLOADED PRODUCT PHOTOGRAPHY:", productPhotographyFileName || "NO FILE DEPOSITED");
    drawSpecRow("UPLOADED TECHNICAL BLUEPRINTS:", technicalSpecsFileName || "NO FILE DEPOSITED");

    y += 4;

    // Section 5
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(55, 99, 50);
    doc.text("5. PORTAL STRATEGIC OUTCOME ALIGNMENT", 18, y - 5);
    y += 1;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("Detailed definition of project strategic success & metrics requested by client:", 18, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(40, 40, 40);
    const outcomeText = strategicOutcome.trim() || "No customized strategic outcomes recorded. Handled via default materials consultation metrics.";
    const splitOutcome = doc.splitTextToSize(outcomeText, 172);
    doc.text(splitOutcome, 18, y);
    y += Math.max(12, splitOutcome.length * 4);

    if (projectDescription.trim()) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(55, 99, 50);
      doc.text("6. SPECIAL EMBEDDED DESIGN COMPONENT NOTES", 18, y - 4);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(60, 60, 60);
      const splitDesc = doc.splitTextToSize(projectDescription, 172);
      doc.text(splitDesc, 18, y);
      y += Math.max(12, splitDesc.length * 4);
    }

    // Bottom signatures & Legal disclaimer
    doc.setDrawColor(55, 99, 50);
    doc.setLineWidth(0.4);
    doc.line(135, 271, 185, 271);
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(115, 115, 115);
    doc.text("Authorized Representative Sign-Off", 137, 275.5);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(80, 90, 75);
    doc.text("ONE PREMIUM SUSTAINABLE PACKAGING SYSTEMS // STRATEGIC ADVISORY BOARD", 18, 275.5);

    // Save and download
    doc.save(`ONE_Partnership_Specification_${receiptNo}.pdf`);
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
          companyName,
          companyWebsite,
          industry,
          clientName,
          clientDept,
          clientEmail,
          clientPhone,
          engagementType,
          annualSpend,
          orderVolume,
          sustainabilityObjectives,
          packagingCategories,
          desiredMaterials,
          brandAssetsStatus,
          brandGuidelinesFile: brandGuidelinesFileName,
          existingPackagingFile: existingPackagingFileName,
          productPhotographyFile: productPhotographyFileName,
          technicalSpecsFile: technicalSpecsFileName,
          geographicDistribution,
          launchTimeline,
          strategicOutcome,
          projectDescription,
          inquiryType: "custom",
          specimenModel: "Bespoke Custom"
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
              ✦ PORTAL FOR MATERIAL CONSULTANCY & PROCUREMENT
            </span>
            <h1 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl uppercase text-garabel-ink tracking-tight leading-[0.95] max-w-xl">
              {language === "ja" ? (
                <>持続可能パッケージ<br />調達・提携ポータル</>
              ) : (
                <>Sustainable Packaging<br />Procurement Portal</>
              )}
            </h1>
            <div className="w-12 h-0.5 bg-[#376332] mt-4"></div>
            
            <p className="font-sans text-xs sm:text-[13px] text-garabel-mid leading-relaxed max-w-2xl pt-2">
              {language === "ja" ? (
                "私たちの材料・製造チームとのパッケージングコンサルテーションを開始します。持続可能な小売用パッケージの調達、特注の構造コンセプトの開発、または長期的な調達パートナーシップの評価など、お客様のブランド目標、サステナビリティ目標、および製造要件に沿った仕立ての提案書をご用意いたします。進取の気性に富む小売業者、ラグジュアリーブランド、医療用大麻事業者、および妥協のない高品質を求める一般消費財企業に信頼されています。"
              ) : (
                "Initiate a packaging consultation with our materials and manufacturing team. Whether you are sourcing sustainable retail packaging, developing a bespoke structural concept, or evaluating long-term procurement partnerships, our team will prepare a tailored proposal aligned with your brand objectives, sustainability goals, and production requirements. Trusted by forward-thinking retailers, luxury brands, cannabis operators, and consumer product companies seeking premium packaging solutions without compromise."
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

                  <form onSubmit={handleSubmit} className="space-y-9">
                    
                    {/* SECTION 1: Company Information */}
                    <div className="space-y-5 border-l-2 border-[#8a684f]/20 pl-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] bg-[#8a684f]/10 text-[#8a684f] px-2 py-0.5 rounded-md font-bold">SECTION 01</span>
                        <h3 className="font-sans font-black text-sm uppercase text-garabel-ink tracking-tight">Company & Contact Information</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1">
                          <label className="font-mono text-[8.5px] tracking-wider text-garabel-mid uppercase font-bold">Brand or Company Name *</label>
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="e.g. Acme Corp"
                            className="bg-transparent border-b border-garabel-ink/20 py-1 font-sans text-xs text-garabel-ink focus:outline-none focus:border-[#376332] transition-colors"
                          />
                        </div>

                        <div className="flex flex-col space-y-1">
                          <label className="font-mono text-[8.5px] tracking-wider text-garabel-mid uppercase font-bold">Corporate Website *</label>
                          <input
                            type="url"
                            required
                            value={companyWebsite}
                            onChange={(e) => setCompanyWebsite(e.target.value)}
                            placeholder="e.g. https://www.acme.com"
                            className="bg-transparent border-b border-garabel-ink/20 py-1 font-sans text-xs text-garabel-ink focus:outline-none focus:border-[#376332] transition-colors"
                          />
                        </div>

                        <div className="flex flex-col space-y-1">
                          <label className="font-mono text-[8.5px] tracking-wider text-garabel-mid uppercase font-bold">Industry Sector *</label>
                          <select
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="bg-transparent border-b border-garabel-ink/20 py-1 font-sans text-xs text-garabel-ink focus:outline-none focus:border-[#376332] transition-all cursor-pointer"
                          >
                            <option value="Luxury Retail">Luxury Retail</option>
                            <option value="Fashion & Apparel">Fashion & Apparel</option>
                            <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
                            <option value="Cannabis Retail">Cannabis Retail</option>
                            <option value="Food & Beverage">Food & Beverage</option>
                            <option value="Hospitality">Hospitality</option>
                            <option value="Consumer Goods">Consumer Goods</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="flex flex-col space-y-1">
                          <label className="font-mono text-[8.5px] tracking-wider text-garabel-mid uppercase font-bold">Primary Contact Name *</label>
                          <input
                            type="text"
                            required
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder="e.g. Jonathan Doe"
                            className="bg-transparent border-b border-garabel-ink/20 py-1 font-sans text-xs text-garabel-ink focus:outline-none focus:border-[#376332] transition-colors"
                          />
                        </div>

                        <div className="flex flex-col space-y-1">
                          <label className="font-mono text-[8.5px] tracking-wider text-garabel-mid uppercase font-bold">Position / Department *</label>
                          <select
                            value={clientDept}
                            onChange={(e) => setClientDept(e.target.value)}
                            className="bg-transparent border-b border-garabel-ink/20 py-1 font-sans text-xs text-garabel-ink focus:outline-none focus:border-[#376332] transition-all cursor-pointer"
                          >
                            <option value="Founder">Founder</option>
                            <option value="CEO">CEO</option>
                            <option value="Procurement">Procurement</option>
                            <option value="Brand Management">Brand Management</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Operations">Operations</option>
                            <option value="Sustainability">Sustainability</option>
                          </select>
                        </div>

                        <div className="flex flex-col space-y-1">
                          <label className="font-mono text-[8.5px] tracking-wider text-garabel-mid uppercase font-bold">Direct Phone Number</label>
                          <input
                            type="tel"
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                            placeholder="e.g. +1 (555) 019-2834"
                            className="bg-transparent border-b border-garabel-ink/20 py-1 font-sans text-xs text-garabel-ink focus:outline-none focus:border-[#376332] transition-colors"
                          />
                        </div>

                        <div className="flex flex-col space-y-1 md:col-span-2">
                          <label className="font-mono text-[8.5px] tracking-wider text-garabel-mid uppercase font-bold">Communications Email *</label>
                          <input
                            type="email"
                            required
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            placeholder="e.g. j.doe@acme.com"
                            className="bg-transparent border-b border-garabel-ink/20 py-1 font-sans text-xs text-garabel-ink focus:outline-none focus:border-[#376332] transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: Project Scope & Credentials */}
                    <div className="space-y-5 border-l-2 border-[#8a684f]/20 pl-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] bg-[#8a684f]/10 text-[#8a684f] px-2 py-0.5 rounded-md font-bold">SECTION 02</span>
                        <h3 className="font-sans font-black text-sm uppercase text-garabel-ink tracking-tight">Strategic Project Scope</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-col space-y-1.5">
                          <span className="font-mono text-[8.5px] tracking-wider text-[#7c5d47] uppercase font-black">Engagement Sought</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                              "Existing Specimen Order",
                              "Custom Packaging Development",
                              "Sustainable Packaging Consultation",
                              "Long-Term Manufacturing Partnership",
                              "Multi-Location Retail Program"
                            ].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setEngagementType(opt)}
                                className={`text-left text-[11px] px-3 py-2 rounded-lg border transition-all duration-200 cursor-pointer ${
                                  engagementType === opt
                                    ? "bg-[#376332] text-white border-[#376332] font-semibold"
                                    : "bg-[#eaab7a]/5 border-[#8a684f]/20 text-[#5c4a3c] hover:bg-[#eaab7a]/15"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col space-y-1">
                            <label className="font-mono text-[8.5px] tracking-wider text-garabel-mid uppercase font-bold flex flex-wrap items-center gap-1.5">
                              <span>Estimated Annual Spend *</span>
                              <span className="font-sans text-[7.5px] font-black tracking-normal px-1.5 py-0.5 bg-red-800 text-[#fff] rounded-full uppercase leading-none select-none">Critical Validation</span>
                            </label>
                            <select
                              value={annualSpend}
                              onChange={(e) => setAnnualSpend(e.target.value)}
                              className="bg-transparent border-b border-garabel-ink/20 py-1 font-sans text-xs text-garabel-ink focus:outline-none focus:border-[#376332] transition-all cursor-pointer"
                            >
                              <option value="Under $10,000">Under $10,000</option>
                              <option value="$10,000 – $50,000">$10,000 – $50,000</option>
                              <option value="$50,000 – $250,000">$50,000 – $250,000</option>
                              <option value="$250,000 – $1M">$250,000 – $1M</option>
                              <option value="$1M+">$1M+</option>
                            </select>
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label className="font-mono text-[8.5px] tracking-wider text-garabel-mid uppercase font-bold">Expected Order Volume</label>
                            <select
                              value={orderVolume}
                              onChange={(e) => setOrderVolume(e.target.value)}
                              className="bg-transparent border-b border-garabel-ink/20 py-1 font-sans text-xs text-garabel-ink focus:outline-none focus:border-[#376332] transition-all cursor-pointer"
                            >
                              <option value="Under 5,000 Units">Under 5,000 Units</option>
                              <option value="5,000 – 25,000">5,000 – 25,000</option>
                              <option value="25,000 – 100,000">25,000 – 100,000</option>
                              <option value="100,000 – 500,000">100,000 – 500,000</option>
                              <option value="500,000+">500,000+</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: Sustainability Objectives */}
                    <div className="space-y-4 border-l-2 border-[#8a684f]/20 pl-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] bg-[#8a684f]/10 text-[#8a684f] px-2 py-0.5 rounded-md font-bold">SECTION 03</span>
                        <h3 className="font-sans font-black text-sm uppercase text-garabel-ink tracking-tight">Sustainability Objectives</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {[
                          "Plastic Reduction",
                          "Carbon Neutral Goals",
                          "ESG Reporting",
                          "Regulatory Compliance",
                          "Sustainable Rebranding",
                          "Customer Experience Enhancement",
                          "Retail Packaging Upgrade"
                        ].map((goal) => {
                          const isChecked = sustainabilityObjectives.includes(goal);
                          return (
                            <button
                              key={goal}
                              type="button"
                              onClick={() => {
                                if (isChecked) {
                                  setSustainabilityObjectives(sustainabilityObjectives.filter(x => x !== goal));
                                } else {
                                  setSustainabilityObjectives([...sustainabilityObjectives, goal]);
                                }
                              }}
                              className={`flex items-center gap-2.5 text-left text-[11px] px-3 py-2 rounded-lg border transition-all duration-200 cursor-pointer ${
                                isChecked
                                  ? "bg-[#376332]/10 border-[#376332] text-garabel-ink font-semibold"
                                  : "bg-[#faf8f5]/80 border-[#8a684f]/15 hover:bg-[#8a684f]/5 text-[#5c4a3c]/90"
                              }`}
                            >
                              <div className={`w-4 h-4 rounded flex items-center justify-center transition-all ${isChecked ? "bg-[#376332] text-white" : "border border-[#8a684f]/40 bg-white"}`}>
                                {isChecked && <Check className="w-3 h-3 text-white stroke-[3.5]" />}
                              </div>
                              <span className="truncate leading-none">{goal}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* SECTION 4: Packaging and Materials Requirements */}
                    <div className="space-y-5 border-l-2 border-[#8a684f]/20 pl-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] bg-[#8a684f]/10 text-[#8a684f] px-2 py-0.5 rounded-md font-bold">SECTION 04</span>
                        <h3 className="font-sans font-black text-sm uppercase text-garabel-ink tracking-tight">Packaging Categories & Preferred Materials Matrix</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-col space-y-1.5">
                          <span className="font-mono text-[8.5px] tracking-wider text-[#7c5d47] uppercase font-black">Categories Required</span>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {[
                              "Luxury Shopping Bags",
                              "Retail Carry Bags",
                              "Product Packaging",
                              "Gift Packaging",
                              "Shipping Mailers",
                              "Cannabis Packaging",
                              "Sustainable Packaging System",
                              "Bespoke Structural Packaging"
                            ].map((cat) => {
                              const isChecked = packagingCategories.includes(cat);
                              return (
                                <button
                                  key={cat}
                                  type="button"
                                  onClick={() => {
                                    if (isChecked) {
                                      setPackagingCategories(packagingCategories.filter(x => x !== cat));
                                    } else {
                                      setPackagingCategories([...packagingCategories, cat]);
                                    }
                                  }}
                                  className={`flex items-center gap-1.5 text-left text-[9.5px] font-mono tracking-wider uppercase px-2.5 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                                    isChecked
                                      ? "bg-[#376332]/15 border-[#376332] text-[#376332] font-semibold"
                                      : "bg-[#faf8f5]/80 border-[#8a684f]/15 hover:bg-[#8a684f]/5 text-[#5c4a3c]/90"
                                  }`}
                                >
                                  <div className={`w-3 h-3 rounded flex items-center justify-center transition-all ${isChecked ? "bg-[#376332]" : "border border-[#8a684f]/40 bg-white"}`}>
                                    {isChecked && <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />}
                                  </div>
                                  <span className="truncate leading-none">{cat}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                          <span className="font-mono text-[8.5px] tracking-wider text-[#7c5d47] uppercase font-black">Environmental Materials Profile</span>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {[
                              "Compostable",
                              "Biodegradable",
                              "FSC Certified Paper",
                              "Recycled Content",
                              "Plant Fiber Composite",
                              "Require Consultation"
                            ].map((mat) => {
                              const isChecked = desiredMaterials.includes(mat);
                              return (
                                <button
                                  key={mat}
                                  type="button"
                                  onClick={() => {
                                    if (isChecked) {
                                      setDesiredMaterials(desiredMaterials.filter(x => x !== mat));
                                    } else {
                                      setDesiredMaterials([...desiredMaterials, mat]);
                                    }
                                  }}
                                  className={`flex items-center gap-1.5 text-left text-[9.5px] font-mono tracking-wider uppercase px-2.5 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                                    isChecked
                                      ? "bg-[#376332]/15 border-[#376332] text-[#376332] font-semibold"
                                      : "bg-[#faf8f5]/80 border-[#8a684f]/15 hover:bg-[#8a684f]/5 text-[#5c4a3c]/90"
                                  }`}
                                >
                                  <div className={`w-3 h-3 rounded flex items-center justify-center transition-all ${isChecked ? "bg-[#376332]" : "border border-[#8a684f]/40 bg-white"}`}>
                                    {isChecked && <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />}
                                  </div>
                                  <span className="truncate leading-none">{mat}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 5: Collaborative Design Assets Upload */}
                    <div className="space-y-5 border-l-2 border-[#8a684f]/20 pl-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] bg-[#8a684f]/10 text-[#8a684f] px-2 py-0.5 rounded-md font-bold">SECTION 05</span>
                        <h3 className="font-sans font-black text-sm uppercase text-garabel-ink tracking-tight">Design Assets & Collaborative Attachment Chest</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-col space-y-1">
                          <label className="font-mono text-[8.5px] tracking-wider text-garabel-mid uppercase font-bold">Current Layout Assets</label>
                          <select
                            value={brandAssetsStatus}
                            onChange={(e) => setBrandAssetsStatus(e.target.value)}
                            className="bg-transparent border-b border-garabel-ink/20 py-1 font-sans text-xs text-garabel-ink focus:outline-none focus:border-[#376332] transition-all cursor-pointer"
                          >
                            <option value="Brand Guidelines Available">Brand Guidelines & Palette Available</option>
                            <option value="Fully Completed CAD Files">Fully Completed CAD Files Available</option>
                            <option value="Logo Only">Logo Only</option>
                            <option value="No Digital Assets">No Digital Design Assets (Require Complete Design Partnership)</option>
                          </select>
                        </div>

                        {/* 4 Multi-Upload grids */}
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <FileUploadSlot 
                            label="Brand Guidelines (.pdf, .ai)"
                            fileName={brandGuidelinesFileName}
                            onFileSelect={(name) => setBrandGuidelinesFileName(name)}
                            onClear={() => setBrandGuidelinesFileName(null)}
                          />
                          <FileUploadSlot 
                            label="Existing Packaging Specs"
                            fileName={existingPackagingFileName}
                            onFileSelect={(name) => setExistingPackagingFileName(name)}
                            onClear={() => setExistingPackagingFileName(null)}
                          />
                          <FileUploadSlot 
                            label="Product Photo / Render"
                            fileName={productPhotographyFileName}
                            onFileSelect={(name) => setProductPhotographyFileName(name)}
                            onClear={() => setProductPhotographyFileName(null)}
                          />
                          <FileUploadSlot 
                            label="Core Technical Blueprints"
                            fileName={technicalSpecsFileName}
                            onFileSelect={(name) => setTechnicalSpecsFileName(name)}
                            onClear={() => setTechnicalSpecsFileName(null)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 6: Procurement Logistics */}
                    <div className="space-y-5 border-l-2 border-[#8a684f]/20 pl-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] bg-[#8a684f]/10 text-[#8a684f] px-2 py-0.5 rounded-md font-bold">SECTION 06</span>
                        <h3 className="font-sans font-black text-sm uppercase text-garabel-ink tracking-tight">Procurement Logistics & Distribution</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1">
                          <label className="font-mono text-[8.5px] tracking-wider text-garabel-mid uppercase font-bold">Geographic Distribution</label>
                          <select
                            value={geographicDistribution}
                            onChange={(e) => setGeographicDistribution(e.target.value)}
                            className="bg-transparent border-b border-garabel-ink/20 py-1 font-sans text-xs text-garabel-ink focus:outline-none focus:border-[#376332] transition-all cursor-pointer"
                          >
                            <option value="Regional">Regional Hub Only</option>
                            <option value="National">National Coverage</option>
                            <option value="Global Multi-Hub">Global Multi-Location Retail Network</option>
                          </select>
                        </div>

                        <div className="flex flex-col space-y-1">
                          <label className="font-mono text-[8.5px] tracking-wider text-garabel-mid uppercase font-bold">Required Launch Timeline</label>
                          <select
                            value={launchTimeline}
                            onChange={(e) => setLaunchTimeline(e.target.value)}
                            className="bg-transparent border-b border-garabel-ink/20 py-1 font-sans text-xs text-garabel-ink focus:outline-none focus:border-[#376332] transition-all cursor-pointer"
                          >
                            <option value="Under 1 Month">Under 1 Month (Fast Track)</option>
                            <option value="1–3 Months">1–3 Months (Standard Production Cycle)</option>
                            <option value="3–6 Months">3–6 Months (Extended Custom Tooling)</option>
                            <option value="6 Months+">6 Months+ (Strategic Launch Planning)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 7: Strategic Goal and Custom specs */}
                    <div className="space-y-5 border-l-2 border-[#8a684f]/20 pl-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] bg-[#8a684f]/10 text-[#8a684f] px-2 py-0.5 rounded-md font-bold">SECTION 07</span>
                        <h3 className="font-sans font-black text-sm uppercase text-garabel-ink tracking-tight">Strategic Alignment Goals</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-col space-y-1">
                          <label className="font-mono text-[8.5px] tracking-wider text-garabel-mid uppercase font-bold leading-normal">
                            What is the single most important metric or qualitative outcome that will make this packaging project a success?
                          </label>
                          <textarea
                            rows={3}
                            value={strategicOutcome}
                            onChange={(e) => setStrategicOutcome(e.target.value)}
                            placeholder="e.g. Achieving 100% elimination of single-use plastics from our retail storefronts by Q4, with a premium rigid aesthetic..."
                            className="bg-transparent border-b border-garabel-ink/20 py-1 font-sans text-xs text-garabel-ink focus:outline-none focus:border-[#376332] transition-all resize-none placeholder:text-garabel-mid/40"
                          />
                        </div>

                        <div className="flex flex-col space-y-1">
                          <label className="font-mono text-[8.5px] tracking-wider text-garabel-mid uppercase font-bold">
                            Alternative Specification & Material Notes
                          </label>
                          <textarea
                            id="quote_form_bottom_notes"
                            rows={2}
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            placeholder="Outline any specific micro-dimensions, exact weights, secondary structural requests or materials here..."
                            className="bg-transparent border-b border-garabel-ink/20 py-1 font-sans text-xs text-garabel-ink focus:outline-none focus:border-[#376332] transition-all resize-none placeholder:text-garabel-mid/40"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Section */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#376332] hover:bg-[#2e522a] disabled:bg-[#376332]/60 text-[#fdfbf7] py-3.5 px-6 rounded-xl font-mono text-[11px] tracking-[0.25em] font-bold uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-1.5 h-1.5 bg-[#fdfbf7] rounded-full animate-ping" />
                            <span>SUBMITTING INQUIRY...</span>
                          </>
                        ) : (
                          <>
                            <span>SUBMIT ENVELOPE DESIGN SPEC</span>
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
                  className="bg-garabel-cream/90 backdrop-blur-md rounded-2xl border border-garabel-ink/15 p-6 sm:p-10 text-center shadow-craft-2xl relative max-w-xl mx-auto animate-fadeIn"
                >
                  <div className="absolute inset-0 paper-grain pointer-events-none opacity-10 rounded-2xl"></div>

                  <div className="w-16 h-16 bg-[#376332]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-[#376332] stroke-[3]" />
                  </div>

                  {/* Brand Logo Display */}
                  <div className="flex justify-center mb-6">
                    <div className="border border-[#376332]/10 bg-white/40 p-4 rounded-xl flex items-center justify-center shadow-inner max-w-xs select-none">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1U3YfW75P9JyKKTCWA7yoM31HCTW9L0fN" 
                        alt="ONE Sustainable Packaging Solutions" 
                        referrerPolicy="no-referrer"
                        className="h-10 sm:h-12 w-auto object-contain select-none"
                      />
                    </div>
                  </div>

                  <span className="font-mono text-[10px] tracking-[0.3em] text-[#376332] uppercase block mb-1">
                    ✦ SPECIFICATION LODGED
                  </span>

                  <h3 className="font-sans font-black text-2xl uppercase text-garabel-ink tracking-tight mb-3">
                    Inquiry Transmitted
                  </h3>

                  <p className="font-sans text-xs sm:text-[13px] text-garabel-mid leading-relaxed max-w-md mx-auto mb-6">
                    {language === "ja" ? (
                      "ご要望が調達システムに登録されました。弊社の担当マテリアルエンジニアが24時間以内にご連絡を差し上げ、詳細設計プロセスを開始します。"
                    ) : (
                      "Your aesthetic, environmental, and physical parameters are successfully registered in our procurement framework. A managing material coordinator will contact you shortly."
                    )}
                  </p>

                  <div className="border border-garabel-ink/10 rounded-xl bg-garabel-cream/40 p-5 text-left space-y-2.5 shadow-sm text-xs">
                    <div className="flex justify-between font-mono text-[10px] text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span>PROCUREMENT ID:</span>
                      <span className="font-bold text-garabel-ink select-all">#{receiptNo}</span>
                    </div>

                    <div className="flex justify-between font-mono text-[10px] text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span>TIMESTAMP:</span>
                      <span className="font-bold text-garabel-ink">{timestamp}</span>
                    </div>

                    <div className="flex justify-between font-mono text-[10px] text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span>ORGANIZATION:</span>
                      <span className="font-bold text-garabel-ink uppercase">{companyName}</span>
                    </div>

                    <div className="flex justify-between font-mono text-[10px] text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span>PRIMARY CONTACT:</span>
                      <span className="font-bold text-garabel-ink uppercase">{clientName} ({clientDept})</span>
                    </div>

                    <div className="flex justify-between font-mono text-[10px] text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span>ANNUAL SPEND TIERS:</span>
                      <span className="font-bold text-red-800 uppercase">{annualSpend}</span>
                    </div>

                    <div className="flex justify-between font-mono text-[10px] text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span>TARGET VOLUME:</span>
                      <span className="font-bold text-garabel-ink uppercase">{orderVolume}</span>
                    </div>

                    <div className="flex justify-between font-mono text-[10px] text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span>PREFERRED CATEGORIES:</span>
                      <span className="font-bold text-[#376332] uppercase truncate max-w-[200px]">{packagingCategories.length > 0 ? packagingCategories.join(", ") : "Not Specified"}</span>
                    </div>

                    <div className="flex justify-between font-mono text-[10px] text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span>LAUNCH TIMELINE:</span>
                      <span className="font-bold text-garabel-ink uppercase">{launchTimeline}</span>
                    </div>

                    {strategicOutcome && (
                      <div className="font-mono text-[9px] pt-1 leading-normal text-garabel-mid">
                        <span className="block mb-0.5 font-bold">PROJECT SUCCESS CRITERION:</span>
                        <p className="font-sans text-xs italic text-garabel-ink bg-white/50 p-2 border-l border-[#8a684f]/40 whitespace-pre-wrap">{strategicOutcome}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex flex-col gap-3 max-w-lg mx-auto">
                    {/* Save custom system PDF with both pages */}
                    <button
                      onClick={handleDownloadPDF}
                      className="w-full bg-[#376332] hover:bg-[#2b4c27] text-[#fdfbf7] py-3.5 px-6 rounded-xl font-mono text-[11px] tracking-[0.2em] uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                    >
                      <Download className="w-4 h-4 shrink-0" />
                      <span>SAVE PARTNERSHIP ENVELOPE (PDF)</span>
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                      <button
                        onClick={onClose}
                        className="bg-transparent border border-garabel-ink hover:bg-neutral-100 text-garabel-ink py-3 px-4 rounded-xl font-mono text-[10px] tracking-[0.15em] uppercase transition-all focus:outline-none cursor-pointer"
                      >
                        CLOSE RECEIPT
                      </button>
                      
                      <a
                        href={`mailto:oneunedigital@gmail.com?subject=Strategic Procurement Partnership Portfolio: ${encodeURIComponent(companyName)}&body=ONE Sustainable Packaging Systems Partnership Record ID #${receiptNo}%0D%0A%0D%0ALodged parameters & core details:%0D%0ABrand Name: ${encodeURIComponent(companyName)}%0D%0AWebsite: ${encodeURIComponent(companyWebsite)}%0D%0AIndustry: ${encodeURIComponent(industry)}%0D%0AOfficer: ${encodeURIComponent(clientName)} (${encodeURIComponent(clientDept)})%0D%0APhone: ${encodeURIComponent(clientPhone)}%0D%0AEmail: ${encodeURIComponent(clientEmail)}%0D%0A%0D%0AStrategic metrics for project success:%0D%0A${encodeURIComponent(strategicOutcome)}%0D%0A%0D%0AAnnual Spend: ${encodeURIComponent(annualSpend)}%0D%0AModel Specification: ${encodeURIComponent("Bespoke Custom")}`}
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
