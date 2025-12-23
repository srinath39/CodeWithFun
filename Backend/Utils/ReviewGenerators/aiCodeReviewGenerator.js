const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();

const ai = new GoogleGenAI({ apiKey: `${process.env.GOOGLE_GEMINI_API_KEY}` });

const aiCodeReviewGenerator = async (code, description) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `This is the DSA problem Description ${description} ,Analyze its following code and provide a short and consise review of the code, Also provide a list of potential improvements and suggestions for the code` + code,
  });
  return response.text;
};

module.exports = { aiCodeReviewGenerator }