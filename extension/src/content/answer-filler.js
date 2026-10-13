function answerFiller(answers) {
/**
 * Applies answers returned by the backend to their corresponding
 * Google Forms radio-button questions.
 *
 * Each answer must contain a question ID and a zero-based option
 * index. The question ID is used to retrieve the original DOM
 * element from the `questionElements` Map.
 *
 * @param {Array<{id: number, option: number}>} answers
 * An array of answers returned by the backend.
 * - `id`: The original question ID assigned by questionExtractor().
 * - `option`: The zero-based index of the radio option to select.
 *
 * @returns {{
 *   selected: number,
 *   skipped: number,
 *   errors: Array<{id: number, reason: string, option?: number}>
 * }}
 * A report containing the number of attempted selections,
 * skipped answers, and the reasons for skipped answers.
 *
 * @throws {TypeError}
 * If `answers` is not an array.
 *
 * @remarks
 * - Uses `questionElements` to locate existing question DOM elements.
 * - Supports single-choice radio questions only.
 * - Skips missing questions, invalid option indexes, and disabled options.
 * - Does not submit the form.
 * - The `selected` count records attempted clicks, not verified selections.
 */
    const report = {
        selected: 0,
        skipped: 0,
        errors: []
    };

  if (!Array.isArray(answers)) {
    throw new TypeError(
      `Expected an array of answers, received: $(typeof answers)`
    );
  }

    for (const answer of answers) {
        const { id, option } = answer;

        const questionElement = questionElements.get(id);

        if (!questionElement || !questionElement.isConnected) {
            report.skipped++;
            report.errors.push({
                id,
                reason: "Question element not found in the page"
            });
            continue;
        }

        if (!Number.isInteger(option) || option < 0) {
            report.skipped++;
            report.errors.push({
                id,
                option,
                reason: "Invalid option index"
            });
            continue;
        }

        const radioOptions = Array.from(
            questionElement.querySelectorAll('[role="radio"]')
        );

        if (option >= radioOptions.length) {
            report.skipped++;
            report.errors.push({
                id,
                option,
                reason: `Option out of range; found ${radioOptions.length} radio options`
            });
            continue;
        }

        const target = radioOptions[option];

        if (target.getAttribute("aria-disabled") === "true") {
            report.skipped++;
            report.errors.push({
                id,
                option,
                reason: "Option is disabled"
            });
            continue;
        }

        target.click();
        report.selected++;
    }

    console.log("Answer filler report:", report);
    return report;
}
