import { GoogleGenerativeAI } from "@google/generative-ai";

async function summarizeJournal(journalText) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Summarize the following journal as if you are the user reflecting on the day. Focus on what was accomplished first, and briefly mention any emotions or key experiences. The summary should be factual, in first person, and no longer than 2 lines: ${journalText}`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Error summarizing the journal:", error);
    return null;
  }
}

export default summarizeJournal;
