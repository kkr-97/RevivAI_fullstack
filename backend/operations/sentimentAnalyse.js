import vader from "vader-sentiment";

async function sentimentAnalyze(text) {
  try {
    const intensity = await vader.SentimentIntensityAnalyzer.polarity_scores(
      text
    );

    const { pos, neg, neu } = intensity;

    return { positive: pos, negative: neg, neutral: neu };
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    throw new Error(`Error analyzing sentiment: ${error.message || error}`);
  }
}

export default sentimentAnalyze;
