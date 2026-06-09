export default async function handler(req: any, res: any) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const logoUrl = "https://lh3.googleusercontent.com/d/1U3YfW75P9JyKKTCWA7yoM31HCTW9L0fN";
    const response = await fetch(logoUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch logo image: status ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = response.headers.get("content-type") || "image/png";
    const base64String = `data:${contentType};base64,${buffer.toString("base64")}`;
    return res.status(200).json({ base64: base64String });
  } catch (err: any) {
    console.error("Vercel logo-base64 endpoint error:", err);
    return res.status(500).json({ error: "Failed to proxy image as base64: " + err.message });
  }
}
