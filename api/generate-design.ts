import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req: any, res: any) {
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
    const { brandName, packagingType, ecoMaterial, promptText } = req.body;

    if (!promptText || !brandName) {
      return res.status(400).json({ error: "Brand Name and Design prompt are required." });
    }

    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY environment variable is required to generate custom AI designs." 
      });
    }

    const ai = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    
    const prompt = `
      You are an elite, minimalist sustainable luxury structural designer for high-end boutique house ONE Biodegradable Brand Solutions.
      Create a tailored custom biodegradable packaging design specification.
      
      Client Parameters:
      - Brand Name: "${brandName}"
      - Preferred Packaging Type: "${packagingType}"
      - Selected Core Material Base: "${ecoMaterial}"
      - Creative Ambitions & Vibe: "${promptText}"

      Formulate a cohesive, aesthetic concept following sustainable quiet luxury rules. Keep text response parts poetic, elegant, and professional. Avoid tech-jargon or robotic summaries.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "recommendedSubstrate",
            "suggestedTagline",
            "designAnalysis",
            "colorPalette",
            "aestheticStyleName",
            "prototypeSpecs",
            "estimatedPrice"
          ],
          properties: {
            recommendedSubstrate: {
              type: Type.STRING,
              description: "E.g., 'Alabaster Giant Bamboo Pulp' or '350gsm Rough Virgin Agricultural Hemp Core'"
            },
            suggestedTagline: {
              type: Type.STRING,
              description: "A gorgeous, poetic, luxurious brand tagline suggested for their packaging layout in uppercase"
            },
            designAnalysis: {
              type: Type.STRING,
              description: "A highly refined, 2-3 sentence visual analysis explaining why this layout enforces a quiet luxury sustainable tone"
            },
            colorPalette: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING
              },
              description: "Exactly three color hexadecimal or descriptive CSS code names representing the visual palette scheme, e.g., ['#dfd0bc', '#1e3020', '#fcfaf5']"
            },
            aestheticStyleName: {
              type: Type.STRING,
              description: "E.g., 'Copenhagen Wabi-Sabi Studio', 'Aesop Botanical Slate', 'Alandic Wheat Precision'"
            },
            prototypeSpecs: {
              type: Type.STRING,
              description: "Specific premium features included (e.g., blind embossings, organic soy foils, hidden under-fiber cotton hinges)"
            },
            estimatedPrice: {
              type: Type.INTEGER,
              description: "A custom prototype design order investment price in USD between 120 and 260"
            }
          }
        }
      }
    });

    const dataText = response.text?.trim() || "{}";
    const data = JSON.parse(dataText);
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Vercel Gemini Design Generation error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate design." });
  }
}
