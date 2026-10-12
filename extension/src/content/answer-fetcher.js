const SERVER_URL = "https://gfq.hanuram.me"

async function sendQuestions(data){
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
