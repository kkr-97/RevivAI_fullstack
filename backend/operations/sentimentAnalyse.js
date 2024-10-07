import axios from "axios";

async function sentimentAnalyze(text, hgFaceToken) {
  const API_URL =
    "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english";
  const headers = {
    Authorization: `Bearer ${hgFaceToken}`,
  };

  try {
    const response = await axios.post(
      API_URL,
      {
        inputs: text,
      },
      { headers }
    );
    const result = response.data[0][0];
    return result;
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    return null;
  }
}

export default sentimentAnalyze;
