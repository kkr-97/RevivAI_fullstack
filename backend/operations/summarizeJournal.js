import axios from "axios";

async function summarizeJournal(journalText, hgFaceToken) {
  const API_URL =
    "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6";
  const headers = {
    Authorization: `Bearer ${hgFaceToken}`,
  };

  try {
    const response = await axios.post(
      API_URL,
      {
        inputs: journalText,
      },
      { headers }
    );
    return response.data[0].summary_text;
  } catch (error) {
    console.error("Error summarizing the journal:", error);
    return null;
  }
}

export default summarizeJournal;
