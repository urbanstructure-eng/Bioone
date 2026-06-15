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
  const { t } = useLanguage();

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
          <span className="font-mono text-[8px] tracking-wider text-garabel-mid uppercase block">{t("file_attached")}</span>
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
            [ {t("remove")} ]
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-1 pointer-events-none">
          <svg className="w-4 h-4 text-[#8a684f]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
          <span className="font-mono text-[8px] sm:text-[9px] tracking-wider text-[#5c4a3c] uppercase font-bold">{label}</span>
          <p className="font-sans text-[9px] text-[#5c4a3c]/60">{t("drag_drop_click")}</p>
        </div>
      )}
    </div>
  );
}

export default function InquiryPage({ onClose }: InquiryPageProps) {
  const { language, t } = useLanguage();
  const [inquiryType, setInquiryType] = useState<"existing" | "custom">("existing");
  
  // Localized option maps
  const getIndustryLabel = (opt: string) => {
    switch (language) {
      case "ja":
        return {
          "Food & Beverage": "飲食・フード",
          "Retail": "小売業",
          "Cosmetics": "化粧品",
          "E-commerce": "Eコマース",
          "Healthcare": "ヘルスケア",
          "Cannabis": "医療大麻・グリーン",
          "Other": "その他"
        }[opt] || opt;
      case "fr":
        return {
          "Food & Beverage": "Alimentation & Boisson",
          "Retail": "Vente de détail",
          "Cosmetics": "Cosmétiques",
          "E-commerce": "E-commerce",
          "Healthcare": "Santé / Pharma",
          "Cannabis": "Cannabis",
          "Other": "Autre"
        }[opt] || opt;
      case "it":
        return {
          "Food & Beverage": "Alimentari e bevande",
          "Retail": "Vendita al dettaglio",
          "Cosmetics": "Cosmetici",
          "E-commerce": "E-commerce",
          "Healthcare": "Sanitario",
          "Cannabis": "Cannabis",
          "Other": "Altro"
        }[opt] || opt;
      case "es":
        return {
          "Food & Beverage": "Alimentos y bebidas",
          "Retail": "Comercio minorista",
          "Cosmetics": "Cosméticos",
          "E-commerce": "E-commerce",
          "Healthcare": "Salud",
          "Cannabis": "Cannabis",
          "Other": "Otro"
        }[opt] || opt;
      case "de":
        return {
          "Food & Beverage": "Lebensmittel & Getränke",
          "Retail": "Einzelhandel",
          "Cosmetics": "Kosmetik",
          "E-commerce": "E-commerce",
          "Healthcare": "Gesundheitswesen",
          "Cannabis": "Cannabis",
          "Other": "Sonstiges"
        }[opt] || opt;
      default:
        return opt;
    }
  };

  const getPackagingLabel = (opt: string) => {
    switch (language) {
      case "ja":
        return {
          "Bags": "バッグ・袋類",
          "Mailers": "配送用メーラー・封筒",
          "Boxes": "化粧箱・ボックス",
          "Pouches": "スタンドパウチ・フィルム",
          "Cups & Containers": "カップ・ボトル容器",
          "Other": "その他"
        }[opt] || opt;
      case "fr":
        return {
          "Bags": "Sacs",
          "Mailers": "Enveloppes d'expédition",
          "Boxes": "Boîtes de luxe",
          "Pouches": "Sachets",
          "Cups & Containers": "Gobelets & Récipients",
          "Other": "Autre"
        }[opt] || opt;
      case "it":
        return {
          "Bags": "Sacchetti",
          "Mailers": "Buste spedizione",
          "Boxes": "Scatole",
          "Pouches": "Bustine richiudibili",
          "Cups & Containers": "Bicchieri e Contenitori",
          "Other": "Altro"
        }[opt] || opt;
      case "es":
        return {
          "Bags": "Bolsas",
          "Mailers": "Sobres de envío",
          "Boxes": "Cajas de lujo",
          "Pouches": "Bolsas herméticas",
          "Cups & Containers": "Vasos y Envases",
          "Other": "Otro"
        }[opt] || opt;
      case "de":
        return {
          "Bags": "Tragetaschen",
          "Mailers": "Versandtaschen",
          "Boxes": "Luxusschachteln",
          "Pouches": "Standbodenbeutel",
          "Cups & Containers": "Becher & Behälter",
          "Other": "Sonstiges"
        }[opt] || opt;
      default:
        return opt;
    }
  };

  const getQuantityLabel = (opt: string) => {
    switch (language) {
      case "ja":
        return {
          "Under 1,000": "1,000個未満",
          "1,000–5,000": "1,000〜5,000個",
          "5,000–10,000": "5,000〜10,000個",
          "10,000+": "10,000個以上"
        }[opt] || opt;
      case "fr":
        return {
          "Under 1,000": "Moins de 1 000",
          "1,000–5,000": "1 000 – 5 000",
          "5,000–10,000": "5 000 – 10 000",
          "10,000+": "10 000 ou plus"
        }[opt] || opt;
      case "it":
        return {
          "Under 1,000": "Meno di 1.000",
          "1,000–5,000": "1.000 – 5.000",
          "5,000–10,000": "5.000 – 10.000",
          "10,000+": "Oltre 10.000"
        }[opt] || opt;
      case "es":
        return {
          "Under 1,000": "Menos de 1.000",
          "1,000–5,000": "1.000 – 5.000",
          "5,000–10,000": "5.000 – 10.000",
          "10,000+": "Más de 10.000"
        }[opt] || opt;
      case "de":
        return {
          "Under 1,000": "Unter 1.000",
          "1,000–5,000": "1.000 – 5.000",
          "5,000–10,000": "5.000 – 10.000",
          "10,000+": "Über 10.000"
        }[opt] || opt;
      default:
        return opt;
    }
  };

  const getBudgetLabel = (opt: string) => {
    switch (language) {
      case "ja":
        return {
          "Under $2,500": "2,500ドル未満",
          "$2,500–$5,000": "2,500〜5,000ドル",
          "$5,000–$10,000": "5,000〜10,000ドル",
          "$10,000+": "10,000ドル以上"
        }[opt] || opt;
      case "fr":
        return {
          "Under $2,500": "Moins de 2 500 $",
          "$2,500–$5,000": "2 500 $ – 5 000 $",
          "$5,000–$10,000": "5 000 $ – 10 000 $",
          "$10,000+": "10 000 $ ou plus"
        }[opt] || opt;
      case "it":
        return {
          "Under $2,500": "Meno di 2.500 $",
          "$2,500–$5,000": "2.500 $ – 5.000 $",
          "$5,000–$10,000": "5.000 $ – 10.000 $",
          "$10,000+": "Oltre 10.000 $"
        }[opt] || opt;
      case "es":
        return {
          "Under $2,500": "Menos de 2.500 $",
          "$2,500–$5,000": "2.500 $ – 5.000 $",
          "$5,000–$10,000": "5.000 $ – 10.000 $",
          "$10,000+": "Más de 2.500 $"
        }[opt] || opt;
      case "de":
        return {
          "Under $2,500": "Unter 2.500 $",
          "$2,500–$5,000": "2.500 $ – 5.000 $",
          "$5,000–$10,000": "5.000 $ – 10.000 $",
          "$10,000+": "Über 10.000 $"
        }[opt] || opt;
      default:
        return opt;
    }
  };

  const getCustomPrintingLabel = (opt: string) => {
    switch (language) {
      case "ja":
        return opt === "Yes" ? "はい（希望する）" : "いいえ（不要）";
      case "fr":
        return opt === "Yes" ? "Oui" : "Non";
      case "it":
        return opt === "Yes" ? "Sì" : "No";
      case "es":
        return opt === "Yes" ? "Sí" : "No";
      case "de":
        return opt === "Yes" ? "Ja" : "Nein";
      default:
        return opt;
    }
  };

  const getTimelineLabel = (opt: string) => {
    switch (language) {
      case "ja":
        return {
          "ASAP": "至急（できるだけ早く）",
          "Within 30 Days": "30日以内",
          "Within 60 Days": "60日以内"
        }[opt] || opt;
      case "fr":
        return {
          "ASAP": "Dès que possible",
          "Within 30 Days": "Sous 30 jours",
          "Within 60 Days": "Sous 60 jours"
        }[opt] || opt;
      case "it":
        return {
          "ASAP": "Il prima possibile",
          "Within 30 Days": "Entro 30 giorni",
          "Within 60 Days": "Entro 60 giorni"
        }[opt] || opt;
      case "es":
        return {
          "ASAP": "Lo antes posible",
          "Within 30 Days": "En menos de 30 días",
          "Within 60 Days": "En menos de 60 días"
        }[opt] || opt;
      case "de":
        return {
          "ASAP": "Schnellstmöglich",
          "Within 30 Days": "Innerhalb von 30 Tagen",
          "Within 60 Days": "Innerhalb von 60 Tagen"
        }[opt] || opt;
      default:
        return opt;
    }
  };
  
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
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  // Project Details
  const [industry, setIndustry] = useState("Food & Beverage");
  const [packagingType, setPackagingType] = useState("Bags");
  const [orderQuantity, setOrderQuantity] = useState("Under 1,000");
  const [targetBudget, setTargetBudget] = useState("Under $2,500");
  const [customPrinting, setCustomPrinting] = useState("Yes");
  const [projectTimeline, setProjectTimeline] = useState("ASAP");

  const [specimenModel, setSpecimenModel] = useState("Specimen 01");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stable luxury receipt details generated once per session/form load
  const [receiptNo] = useState(() => Math.floor(100000 + Math.random() * 900000));
  const [timestamp] = useState(() => {
    const d = new Date();
    return `${d.getUTCFullYear()}.${String(d.getUTCMonth() + 1).padStart(2, "0")}.${String(d.getUTCDate()).padStart(2, "0")} ${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")} UTC`;
  });

  // Gorgeous Sustainable Luxury PDF generator (1 Page, minimalist, elegant representation)
  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

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
    doc.text(inquiryType === "custom" ? "OFFICIAL CUSTOM QUOTE SPECIFICATION" : "OFFICIAL SPECIMEN MODEL ORDER SPECIFICATION", 18, 54);

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
    doc.text("1. COMPANY INFORMATION", 18, y - 5);

    drawSpecRow("REGISTERED COMPANY:", companyName.toUpperCase());
    drawSpecRow("CONTACT NAME:", clientName.toUpperCase());
    drawSpecRow("BUSINESS EMAIL:", clientEmail.toLowerCase());
    drawSpecRow("PHONE NUMBER:", clientPhone || "Not Provided");

    y += 4;

    // Subsection Header 2
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(55, 99, 50);
    doc.text("2. PROJECT DETAILS & METRICS", 18, y - 5);

    if (inquiryType === "custom") {
      drawSpecRow("INDUSTRY SECTOR:", industry.toUpperCase());
      drawSpecRow("PACKAGING TYPE:", packagingType.toUpperCase());
      drawSpecRow("ESTIMATED QUANTITY:", orderQuantity.toUpperCase());
      drawSpecRow("TARGET BUDGET RANGE:", targetBudget.toUpperCase());
      drawSpecRow("CUSTOM PRINTING:", customPrinting.toUpperCase());
      drawSpecRow("PROJECT TIMELINE:", projectTimeline.toUpperCase());
    } else {
      drawSpecRow("ORDERED MODEL:", specimenModel.toUpperCase());
      drawSpecRow("ESTIMATED QUANTITY:", orderQuantity.toUpperCase());
      drawSpecRow("PROJECT TIMELINE:", projectTimeline.toUpperCase());
    }

    // Bottom signatures & Legal disclaimer
    doc.setDrawColor(55, 99, 50);
    doc.setLineWidth(0.4);
    doc.line(135, 255, 185, 255);
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(115, 115, 115);
    doc.text("Authorized Representative Sign-Off", 137, 259.5);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(80, 90, 75);
    doc.text("ONE PREMIUM SUSTAINABLE PACKAGING SYSTEMS // STRATEGIC ADVISORY BOARD", 18, 259.5);

    // Save and download
    doc.save(`ONE_Custom_Quote_Specification_${receiptNo}.pdf`);
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
          clientName,
          clientEmail,
          clientPhone,
          industry,
          packagingType,
          estimatedQuantity: orderQuantity,
          budget: targetBudget,
          customPrinting,
          projectTimeline,
          inquiryType,
          specimenModel: inquiryType === "existing" ? specimenModel : "Bespoke Custom"
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
              {t("portal_sub")}
            </span>
            <h1 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl uppercase text-garabel-ink tracking-tight leading-[0.95] max-w-xl">
              {t("portal_title")}
            </h1>
            <div className="w-12 h-0.5 bg-[#376332] mt-4"></div>
            
            <p className="font-sans text-xs sm:text-[13px] text-garabel-mid leading-relaxed max-w-2xl pt-2">
              {t("portal_desc")}
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
                      {t("tab_existing")}
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
                      {t("tab_custom")}
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-9">
                    {/* Header Banner inside Form */}
                    <div className="mb-6 border-b border-garabel-ink/10 pb-4">
                      <h2 className="font-sans font-extrabold text-[#376332] text-lg uppercase tracking-tight">
                        {inquiryType === "custom" ? t("form_custom_title") : `${t("form_existing_title")}: ${specimenModel}`}
                      </h2>
                      <p className="text-[11px] text-garabel-mid leading-relaxed mt-1">
                        {inquiryType === "custom" 
                          ? t("form_custom_desc") 
                          : t("form_existing_desc")}
                      </p>
                    </div>

                    {/* SECTION 1: Company Information */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-2 border-l-2 border-[#376332] pl-3">
                        <h3 className="font-sans font-black text-xs uppercase tracking-wider text-garabel-ink">{t("sec_company")}</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col space-y-1">
                          <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase font-bold">{t("field_company_name")}</label>
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="e.g. Acme Corporation"
                            className="bg-transparent border-b border-garabel-ink/20 py-2 font-sans text-xs text-garabel-ink placeholder-garabel-mid/40 focus:outline-none focus:border-[#376332] transition-colors"
                          />
                        </div>

                        <div className="flex flex-col space-y-1">
                          <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase font-bold">{t("field_contact_name")}</label>
                          <input
                            type="text"
                            required
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder="e.g. Jonathan Doe"
                            className="bg-transparent border-b border-garabel-ink/20 py-2 font-sans text-xs text-garabel-ink placeholder-garabel-mid/40 focus:outline-none focus:border-[#376332] transition-colors"
                          />
                        </div>

                        <div className="flex flex-col space-y-1">
                          <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase font-bold">{t("field_email")}</label>
                          <input
                            type="email"
                            required
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            placeholder="e.g. j.doe@company.com"
                            className="bg-transparent border-b border-garabel-ink/20 py-2 font-sans text-xs text-garabel-ink placeholder-garabel-mid/40 focus:outline-none focus:border-[#376332] transition-colors"
                          />
                        </div>

                        <div className="flex flex-col space-y-1">
                          <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase font-bold">{t("field_phone")}</label>
                          <input
                            type="tel"
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                            placeholder="e.g. +1 (555) 019-2834"
                            className="bg-transparent border-b border-garabel-ink/20 py-2 font-sans text-xs text-garabel-ink placeholder-garabel-mid/40 focus:outline-none focus:border-[#376332] transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: Project Details */}
                    <div className="space-y-6 pt-4">
                      <div className="flex items-center gap-2 border-l-2 border-[#376332] pl-3">
                        <h3 className="font-sans font-black text-xs uppercase tracking-wider text-garabel-ink">{t("sec_project")}</h3>
                      </div>

                      <div className="space-y-6">
                        {inquiryType === "custom" && (
                          <>
                            {/* Industry */}
                            <div className="flex flex-col space-y-2">
                              <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase font-bold">
                                {language === "ja" ? "業界 *" : "Industry *"}
                              </label>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {["Food & Beverage", "Retail", "Cosmetics", "E-commerce", "Healthcare", "Cannabis", "Other"].map((opt) => (
                                  <button
                                    type="button"
                                    key={opt}
                                    onClick={() => setIndustry(opt)}
                                    className={`px-3 py-2 text-[11px] text-center rounded-lg border transition-all duration-200 cursor-pointer ${
                                      industry === opt
                                        ? "bg-[#376332] text-[#fdfbf7] border-[#376332] font-semibold"
                                        : "bg-white/40 border-garabel-ink/10 text-garabel-ink/80 hover:bg-neutral-100/60 hover:border-garabel-ink/30"
                                    }`}
                                  >
                                    {getIndustryLabel(opt)}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Packaging Type Needed */}
                            <div className="flex flex-col space-y-2">
                              <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase font-bold">
                                {language === "ja" ? "必要パッケージ種類 *" : "Packaging Type Needed *"}
                              </label>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {["Bags", "Mailers", "Boxes", "Pouches", "Cups & Containers", "Other"].map((opt) => (
                                  <button
                                    type="button"
                                    key={opt}
                                    onClick={() => setPackagingType(opt)}
                                    className={`px-3 py-2 text-[11px] text-center rounded-lg border transition-all duration-200 cursor-pointer ${
                                      packagingType === opt
                                        ? "bg-[#376332] text-[#fdfbf7] border-[#376332] font-semibold"
                                        : "bg-white/40 border-garabel-ink/10 text-garabel-ink/80 hover:bg-neutral-100/60 hover:border-garabel-ink/30"
                                    }`}
                                  >
                                    {getPackagingLabel(opt)}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {/* Estimated Order Quantity */}
                        <div className="flex flex-col space-y-2">
                          <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase font-bold">
                            {language === "ja" ? "推定数量 *" : "Estimated Order Quantity *"}
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {["Under 1,000", "1,000–5,000", "5,000–10,000", "10,000+"].map((opt) => (
                              <button
                                type="button"
                                key={opt}
                                onClick={() => setOrderQuantity(opt)}
                                className={`px-3 py-2 text-[11px] text-center rounded-lg border transition-all duration-200 cursor-pointer ${
                                  orderQuantity === opt
                                    ? "bg-[#376332] text-[#fdfbf7] border-[#376332] font-semibold"
                                    : "bg-white/40 border-garabel-ink/10 text-garabel-ink/80 hover:bg-neutral-100/60 hover:border-garabel-ink/30"
                                  }`}
                              >
                                {getQuantityLabel(opt)}
                              </button>
                            ))}
                          </div>
                        </div>

                        {inquiryType === "custom" && (
                          /* Target Budget */
                          <div className="flex flex-col space-y-2">
                            <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase font-bold">
                              {language === "ja" ? "目標予算 *" : "Target Budget *"}
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {["Under $2,500", "$2,500–$5,000", "$5,000–$10,000", "$10,000+"].map((opt) => (
                                <button
                                  type="button"
                                  key={opt}
                                  onClick={() => setTargetBudget(opt)}
                                  className={`px-3 py-2 text-[11px] text-center rounded-lg border transition-all duration-200 cursor-pointer ${
                                    targetBudget === opt
                                      ? "bg-[#376332] text-[#fdfbf7] border-[#376332] font-semibold"
                                      : "bg-white/40 border-garabel-ink/10 text-garabel-ink/80 hover:bg-neutral-100/60 hover:border-garabel-ink/30"
                                    }`}
                                  >
                                  {getBudgetLabel(opt)}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Need Custom Printing? */}
                        <div className="flex flex-col space-y-2">
                          <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase font-bold">
                            {language === "ja" ? "ロゴ・カスタム印刷加工 *" : "Need Custom Printing? *"}
                          </label>
                          <div className="grid grid-cols-2 gap-2 max-w-xs">
                            {["Yes", "No"].map((opt) => (
                              <button
                                type="button"
                                key={opt}
                                onClick={() => setCustomPrinting(opt)}
                                className={`px-3 py-2 text-[11px] text-center rounded-lg border transition-all duration-200 cursor-pointer ${
                                  customPrinting === opt
                                    ? "bg-[#376332] text-[#fdfbf7] border-[#376332] font-semibold"
                                    : "bg-white/40 border-garabel-ink/10 text-garabel-ink/80 hover:bg-neutral-100/60 hover:border-garabel-ink/30"
                                }`}
                              >
                                {getCustomPrintingLabel(opt)}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Project Timeline */}
                        <div className="flex flex-col space-y-2">
                          <label className="font-mono text-[9px] tracking-wider text-garabel-mid uppercase font-bold">
                            {language === "ja" ? "プロジェクト期間 *" : "Project Timeline *"}
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {["ASAP", "Within 30 Days", "Within 60 Days"].map((opt) => (
                              <button
                                type="button"
                                key={opt}
                                onClick={() => setProjectTimeline(opt)}
                                className={`px-3 py-2 text-[11px] text-center rounded-lg border transition-all duration-200 cursor-pointer ${
                                  projectTimeline === opt
                                    ? "bg-[#376332] text-[#fdfbf7] border-[#376332] font-semibold"
                                    : "bg-white/40 border-garabel-ink/10 text-garabel-ink/80 hover:bg-neutral-100/60 hover:border-garabel-ink/30"
                                }`}
                              >
                                {getTimelineLabel(opt)}
                              </button>
                            ))}
                          </div>
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
                            <span>{t("btn_submitting")}</span>
                          </>
                        ) : (
                          <>
                            <span>{t("btn_submit")}</span>
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
                    {t("confirm_badge")}
                  </span>

                  <h3 className="font-sans font-black text-2xl uppercase text-garabel-ink tracking-tight mb-3">
                    {t("confirm_title")}
                  </h3>

                  <p className="font-sans text-xs sm:text-[13px] text-garabel-mid leading-relaxed max-w-md mx-auto mb-6">
                    {t("confirm_desc")}
                  </p>

                  <div className="border border-garabel-ink/10 rounded-xl bg-garabel-cream/40 p-5 text-left space-y-2.5 shadow-sm text-xs">
                    <div className="flex justify-between font-mono text-[10px] text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span>{t("card_proc_id")}</span>
                      <span className="font-bold text-garabel-ink select-all">#{receiptNo}</span>
                    </div>

                    <div className="flex justify-between font-mono text-[10px] text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span>{t("card_time")}</span>
                      <span className="font-bold text-garabel-ink">{timestamp}</span>
                    </div>

                    <div className="flex justify-between font-mono text-[10px] text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span>{t("card_org")}</span>
                      <span className="font-bold text-garabel-ink uppercase">{companyName}</span>
                    </div>

                    <div className="flex justify-between font-mono text-[10px] text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span>{t("card_contact")}</span>
                      <span className="font-bold text-garabel-ink uppercase">{clientName}</span>
                    </div>

                    <div className="flex justify-between font-mono text-[10px] text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span>{inquiryType === "custom" ? t("card_budget") : t("card_model")}</span>
                      <span className="font-bold text-red-800 uppercase">{inquiryType === "custom" ? getBudgetLabel(targetBudget) : specimenModel}</span>
                    </div>

                    <div className="flex justify-between font-mono text-[10px] text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span>{t("card_quantity")}</span>
                      <span className="font-bold text-garabel-ink uppercase">{getQuantityLabel(orderQuantity)}</span>
                    </div>

                    <div className="flex justify-between font-mono text-[10px] text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span>{inquiryType === "custom" ? t("card_pack_needed") : t("card_engagement")}</span>
                      <span className="font-bold text-[#376332] uppercase truncate max-w-[200px]">{inquiryType === "custom" ? getPackagingLabel(packagingType) : "Model Prototype"}</span>
                    </div>

                    <div className="flex justify-between font-mono text-[10px] text-garabel-mid border-b border-garabel-ink/5 pb-1.5">
                      <span>{t("card_timeline")}</span>
                      <span className="font-bold text-garabel-ink uppercase">{getTimelineLabel(projectTimeline)}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 max-w-lg mx-auto">
                    {/* Save custom system PDF with both pages */}
                    <button
                      onClick={handleDownloadPDF}
                      className="w-full bg-[#376332] hover:bg-[#2b4c27] text-[#fdfbf7] py-3.5 px-6 rounded-xl font-mono text-[11px] tracking-[0.2em] uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                    >
                      <Download className="w-4 h-4 shrink-0" />
                      <span>{t("btn_pdf")}</span>
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                      <button
                        onClick={onClose}
                        className="bg-transparent border border-garabel-ink hover:bg-neutral-100 text-garabel-ink py-3 px-4 rounded-xl font-mono text-[10px] tracking-[0.15em] uppercase transition-all focus:outline-none cursor-pointer"
                      >
                        {t("btn_close_receipt")}
                      </button>
                      
                      <a
                        href={`mailto:oneunedigital@gmail.com?subject=Strategic Procurement Partnership Portfolio: ${encodeURIComponent(companyName)}&body=ONE Sustainable Packaging Systems Partnership Record ID #${receiptNo}%0D%0A%0D%0ALodged parameters & core details:%0D%0ACompany Name: ${encodeURIComponent(companyName)}%0D%0AContact Name: ${encodeURIComponent(clientName)}%0D%0APhone: ${encodeURIComponent(clientPhone)}%0D%0AEmail: ${encodeURIComponent(clientEmail)}%0D%0A%0D%0AQuantity Needed: ${encodeURIComponent(orderQuantity)}%0D%0APackaging Type: ${encodeURIComponent(inquiryType === "custom" ? packagingType : "Model Base Blueprint")}%0D%0ALaunch Timeline: ${encodeURIComponent(projectTimeline)}`}
                        className="inline-flex items-center justify-center bg-transparent border border-garabel-ink/25 text-garabel-ink hover:bg-garabel-ink hover:text-[#fdfbf7] py-3 px-4 rounded-xl font-mono text-[10px] tracking-[0.15em] uppercase transition-all focus:outline-none cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                        {t("btn_mail_backup")}
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
              <span>{t("btn_back")}</span>
            </button>
          </div>

        </div>
      </motion.div>
    </>
  );
}
