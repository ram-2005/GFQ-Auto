console.log("From AI assitant locked and loaded")

async function main() {
  try {
    let data = questionExtractor();
    data = preprocessor(data);

    const result = await sendQuestions(data);

    console.log("Server response :", result);

  } catch (error) {
    console.error("Failed to process questions:", error);
  }
}

main();
