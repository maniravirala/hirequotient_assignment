import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function getGeminiResponse(message , username) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `
  "${message}":
  you are responding instead of ${username}
   This message indicates that the user you're trying to reach is currently busy or away and may not be able to respond immediately. Please craft a short and simple response that acknowledges the situation and provides a general reply. If you're uncertain about what to reply, you can mention that the user is busy and will reply later. Alternatively, if you have a specific response in mind, feel free to reply accordingly. If you find the message inappropriate or irrelevant, you can mention that it's not appropriate. Ensure that your response is relatable and respectful  . and dont be length reply with short answers . and if you know something dont hesitate to answer just answer . give response that i can send to the user. if you are know something just answer dont hesitate to answer. always try to reply as short as possible. dont be lengthy in your response. simple and short response is always better. 
  `;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

export const botMessage = async (req, res) => {
  const { message , username } = req.body;
  const response = await getGeminiResponse(message , username);
  res.status(200).json({ response });
};


