const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Retries a Gemini call if it fails due to temporary overload
async function callGeminiWithRetry(payload, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await ai.models.generateContent(payload);
    } catch (err) {
      const isOverloaded =
        err.message?.includes("UNAVAILABLE") ||
        err.message?.includes("high demand");
      if (isOverloaded && attempt < maxRetries - 1) {
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1))); // 1s, 2s, 3s
        continue;
      }
      throw err;
    }
  }
}

const analyzePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No photo provided" });
    }

    const base64Data = req.file.buffer.toString("base64");

    const prompt = `You are helping a food-donation app fill out a listing form from a photo.
Look at the food in this image and respond with ONLY a JSON object in this exact shape:
{"title": "short 3-6 word title", "description": "1-2 sentence description of the food", "quantity": number}
The "quantity" should be your best guess at how many servings or items are shown, as a plain number.`;

    const response = await callGeminiWithRetry({
      model: "gemini-3.5-flash-lite",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: req.file.mimetype,
                data: base64Data,
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    const suggestion = JSON.parse(response.text);
    res.status(200).json(suggestion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { analyzePhoto };
