console.log("From AI assitant locked and loaded")

async function main() {
  try {
    let data = questionExtractor();
    data = preprocessor(data);

    const result = await sendQuestions(data);

    if (!result || !Array.isArray(result.answers)) {
      throw new Error("Server response does not contain answer array");
    }

    const report = answerFiller(result.answers);
    console.log("Filling completed:", report);


  } catch (error) {
    console.error("Failed to process questions:", error);
  }
}

main();
