import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
  // Support CORS if needed or handle POST request
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const data = req.body;
    
    console.log("-----------------------------------------");
    console.log("✦ RECEIVED NEW LUXURY SPECIFICATION QUOTE");
    console.log(`Forwarding directly to: oneunedigital@gmail.com`);
    console.log("-----------------------------------------");
    console.log(`Company Name: ${data.companyName}`);
    console.log(`Representative: ${data.clientName}`);
    console.log(`Email: ${data.clientEmail}`);
    console.log("-----------------------------------------");

    // Dynamic fallback checking of GMail/SMTP environment variables
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpService = process.env.SMTP_SERVICE || "gmail";

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        service: smtpService,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"ONE Biodegradable Brand Solutions" <${smtpUser}>`,
        to: "oneunedigital@gmail.com",
        subject: `New Spec & Custom Inquiry: ${data.companyName || "N/A"}`,
        text: `
ONE Biodegradable Brand Solutions - New Quote Inquiry Received

A brand has lodged a new design specification.

✦ CUSTOMER INFO
Company Name: ${data.companyName || "N/A"}
Website: ${data.companyWebsite || "N/A"}
Industry: ${data.industry || "N/A"}
Representative: ${data.clientName || "N/A"}
Department/Role: ${data.clientDept || "N/A"}
Direct Phone: ${data.clientPhone || "N/A"}
Email Address: ${data.clientEmail || "N/A"}
Location: ${data.location || "N/A"}

✦ SPECIFICATION DETAILS
Inquiry Type: ${data.inquiryType === "existing" ? "Existing Specimen Model" : "Bespoke Custom Design"}
Selected Model: ${data.specimenModel || "N/A"}
Guiding Budget Range: ${data.annualSpend || "N/A"}
Est. Quantity Scope: ${data.orderVolume || "N/A"}
Categories: ${(data.packagingCategories || []).join(", ") || "N/A"}
Preferred Materials: ${(data.desiredMaterials || []).join(", ") || "N/A"}
Launch Timeline: ${data.launchTimeline || "N/A"}

✦ REQUEST NOTES & MEMORANDUM
${data.projectDescription || "No registration notes provided."}

✦ STRATEGIC SUCCESS METRIC
${data.strategicOutcome || "No specific metric provided."}

Timestamp: ${new Date().toUTCString()}
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("✦ SMTP transmission to oneunedigital@gmail.com successful via Vercel Serverless.");
    } else {
      console.log("✦ Note: SMTP_USER and SMTP_PASS are not configured in Vercel environment variables. Sending will complete but only simulation mode will run.");
    }

    return res.status(200).json({ 
      success: true, 
      destination: "oneunedigital@gmail.com",
      smtpConfigured: !!(smtpUser && smtpPass)
    });
  } catch (err: any) {
    console.error("Vercel submit quote serverless function error:", err);
    return res.status(500).json({ error: "Failed to process quote inquiry: " + err.message });
  }
}
