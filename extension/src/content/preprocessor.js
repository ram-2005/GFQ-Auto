function preprocessor(questions) {
  /*
  * preprocesses the raw questions extracted from the google form
  * and returns a structured array of question of objects.
  *
  *The preprocessing stage:
  *   - cleans and normalizes the question text.
  *   - Determines whether the questions is required.
  *   - Indentifies the question type.
  *   - Extracts available answer options.
  *   - Classifies questions that contain personal information
  *
  * Thus this structured information can be passed onto the next layer of the AI processing.
  */

  for (const question of questions) {

    const lines = question.text.split("\n").map(line => line.trim());

    question.required = lines.includes("*");
    lines.splice(1,1);

    question.options = lines.splice(1,4);

    question.text = lines[0];

    question.type = classifyQuestion(question);
  }

  return questions

}


function classifyQuestion(question) {
  /*
  * This functions will identifies the pattern of the personal questions and classifies them
  * into personal questions
  */
    const text = String(question.text).toLowerCase();

    if (
        text.includes("name") ||
        text.includes("email") ||
        text.includes("year") ||
        text.includes("department") ||
        text.includes("phone") ||
        text.includes("mobile") ||
        text.includes("register number") ||
        text.includes("registration number") ||
        text.includes("roll number")
    ) {
        return "personal";
    }

    return "quiz";
}
