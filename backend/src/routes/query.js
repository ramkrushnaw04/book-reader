const { GoogleGenAI } = require("@google/genai")
require("dotenv").config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY  });

console.log(process.env.GOOGLE_API_KEY);

async function query(req, res) {
    const prompt = "You are a helpful dictionary. You will be given a word and you will provide the definition of that word. You will not provide any other information or context. You will only respond with the definition only. If there are multiple meanings then you will list all of them one by one seperated by ','. Do not include any additional text or explanations. Give the meaning of the word: " + req.body.word;
    try {
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: prompt,
        });
        res.json(response.text);
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Failed to generate content" });
    }
  }

module.exports = query