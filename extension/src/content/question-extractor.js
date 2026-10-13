const questionElements = new Map();

function questionExtractor() {
  /*
  * Extracts all questions from the Google form and returns them as a arrray of question objects
  *
  * Each question Object contains:
  * id           - The order of the question from the google form
  * text         - The raw text extracted from the question
  * type         - Question type (eg. MCQ, MSQ, NAT, personal).
  * options      - Available answer options.
  * required     - Whether the questions is required
  *
  *This function only populates the 'id' and 'text' feilds.
  *The remaining feilds are determined during the preprocessing stage
  */

  const questions = [];

  questionElements.clear();

  const formItems = document.querySelectorAll('[role="listitem"]');

  formItems.forEach((item, index) => {

    const question = {
      id: index,
      text: item.innerText,
      type: "unknown",
      options: [],
      required: false
    };

    questions.push(question);

    questionElements.set(question.id, item);

  });

  return questions;

}

