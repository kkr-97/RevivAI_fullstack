import { GoogleGenerativeAI } from "@google/generative-ai";

async function getFeedback(dayType, journalSummary) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Based on the user’s type of the mood and moment summary, provide an uplifting and motivating piece of feedback, as if you were their most encouraging mentor. Keep it concise, personalized, and highlight the positive aspects of their achievements, make sure it is not more than 2 lines. dayType: ${dayType}, journalSummary: ${journalSummary}`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Error while getting feedback :", error);
    return null;
  }
}

export default getFeedback;
