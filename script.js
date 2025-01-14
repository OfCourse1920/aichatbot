// The backend URL (replace with your deployed backend URL)
const SERVER_URL = "https://aichatbot-backend.vercel.app/get-response";

async function sendMessage() {
  const userMessage = document.getElementById("userInput").value;
  const responseContainer = document.getElementById("response");

  // Clear the input field
  document.getElementById("userInput").value = "";

  if (!userMessage) {
    responseContainer.textContent = "Please enter a message!";
    return;
  }

  try {
    // Send user message to backend API
    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Get response data from the backend
    const data = await response.json();
    const chatbotResponse = data.response;

    // Display the chatbot's response
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
    chatBox.innerHTML += `<div><strong>Bot:</strong> ${chatbotResponse}</div>`;

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    console.error("Error occurred:", error);
    responseContainer.textContent = "Oops! Something went wrong. Please try again.";
  }
}
