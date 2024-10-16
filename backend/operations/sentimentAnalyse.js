import vader from "vader-sentiment";

async function sentimentAnalyze(text) {
  try {
    const intensity = await vader.SentimentIntensityAnalyzer.polarity_scores(
      text
    );

    const { pos, neg, neu } = intensity;

    if (neu > pos && neu > neg) {
      return { label: "Neutral", score: neu };
    } else if (pos > neg) {
      return { label: "Positive", score: pos };
    }
    return { label: "Negative", score: neg };
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    throw new Error(`Error analyzing sentiment: ${error.message || error}`);
  }
}

export default sentimentAnalyze;
