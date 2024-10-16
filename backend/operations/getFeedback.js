import { GoogleGenerativeAI } from "@google/generative-ai";

async function getFeedback(dayType, journalSummary) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `According to the day type and journal summary try to give feedback on the accomplishments of the user, assume yourself as a very best mentor and motivator and make sure the feedback is not more than one line. dayType:${dayType}, journalSummary:${journalSummary}`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Error while getting feedback :", error);
    return null;
  }
}

export default getFeedback;
