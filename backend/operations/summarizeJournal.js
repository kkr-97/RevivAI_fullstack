import { GoogleGenerativeAI } from "@google/generative-ai";

async function summarizeJournal(journalText) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Summarize the given journal in a very empathtic way being the first person, place the accomplishments of that day at first and summary should not be more than 2 lines: ${journalText}`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Error summarizing the journal:", error);
    return null;
  }
}

export default summarizeJournal;
