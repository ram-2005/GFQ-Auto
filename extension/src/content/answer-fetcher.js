const SERVER_URL = "https://gfq.hanuram.me"

async function sendQuestions(data){
/**
 * Sends processed questions to the FormsAutomateer backend and
 * retrieves the generated answers.
 *
 * Serializes the supplied question data as JSON and sends it to
 * the `/fetchanswers` endpoint using an HTTP POST request.
 *
 * @async
 * @param {Array<Object>} data
 * An array of processed question objects to send to the backend.
 *
 * @returns {Promise<Object>}
 * A promise that resolves to the parsed JSON response from the server.
 * The response is expected to contain an `answers` array, where each
 * answer identifies a question and its selected option.
 *
 * @throws {Error}
 * If the HTTP request fails, the server returns a non-success status,
 * or the response cannot be parsed as JSON.
 *
 * @example
 * const questions = [
 *   { id: 4, text: "Example question", options: ["A", "B"] }
 * ];
 *
 * const result = await sendQuestions(questions);
 * console.log(result.answers);
 */
  try{
    const response = await fetch(`${SERVER_URL}/fetchanswers`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if(!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    return result;

  }catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
}
