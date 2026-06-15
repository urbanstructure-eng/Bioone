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

    // Dynamic fallback checking of SMTP environment variables
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpService = process.env.SMTP_SERVICE;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    // Secure is true for 465, false for other ports
    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;

    let smtpConfigured = false;
    let emailSent = false;
    let dispatchError = null;

    if (smtpUser && smtpPass) {
      smtpConfigured = true;
      try {
        // Build robust transporter config
        const transportConfig: any = smtpService 
          ? {
              service: smtpService,
              auth: {
                user: smtpUser,
                pass: smtpPass,
              },
            }
          : {
              host: smtpHost,
              port: smtpPort,
              secure: smtpSecure,
              auth: {
                user: smtpUser,
                pass: smtpPass,
              },
              // TLS options to handle unauthorized cert issues common on serverless
              tls: {
                rejectUnauthorized: false
              }
            };

        console.log(`✦ Initializing node-mailer with: ${smtpService ? `Service: ${smtpService}` : `Host: ${smtpHost}:${smtpPort} (Secure: ${smtpSecure})`}`);
        const transporter = nodemailer.createTransport(transportConfig);

        const mailOptions = {
          from: `"ONE Biodegradable Brand Solutions" <${smtpUser}>`,
          to: "oneunedigital@gmail.com",
          replyTo: data.clientEmail,
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
Guiding Budget Range: ${data.budget || data.annualSpend || "N/A"}
Est. Quantity Scope: ${data.estimatedQuantity || data.orderVolume || "N/A"}
Packaging Type: ${data.packagingType || "N/A"}
Custom Printing Needed: ${data.customPrinting || "N/A"}
Launch Timeline: ${data.projectTimeline || data.launchTimeline || "N/A"}

✦ REQUEST NOTES & MEMORANDUM
${data.projectDescription || "No registration notes provided."}

✦ STRATEGIC SUCCESS METRIC
${data.strategicOutcome || "No specific metric provided."}

Timestamp: ${new Date().toUTCString()}
          `,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
        console.log("✦ SMTP transmission to oneunedigital@gmail.com successful via Vercel Serverless.");
      } catch (sendErr: any) {
        dispatchError = sendErr.message || String(sendErr);
        console.error("✦ SMTP email transmission failed:", sendErr);
      }
    } else {
      console.log("✦ Note: SMTP_USER and SMTP_PASS are not configured in Vercel environment variables. Running in simulated fallback mode.");
    }

    return res.status(200).json({ 
      success: true, 
      destination: "oneunedigital@gmail.com",
      smtpConfigured,
      emailSent,
      dispatchError
    });
  } catch (err: any) {
    console.error("Vercel submit quote serverless function error:", err);
    return res.status(500).json({ error: "Failed to process quote inquiry: " + err.message });
  }
}
