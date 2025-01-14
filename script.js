const chatForm = document.getElementById("chat-form");
const chatWindow = document.getElementById("chat-window");
const messages = document.getElementById("messages");

const SERVER_URL = "https://aichatbot-backend.vercel.app/get-response";

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userInput = document.getElementById("user-input");
  const userMessage = userInput.value;

  if (userMessage.trim()) {
    addMessage(userMessage, "user-message");

    addMessage("Typing...", "bot-message");
    const typingMessage = messages.lastChild;

    try {
      const botResponse = await fetchChatbotResponse(userMessage);
      typingMessage.textContent = botResponse;
    } catch (error) {
      typingMessage.textContent = "Oops! Something went wrong. Please try again.";
    }
  }

  userInput.value = "";
});

function addMessage(text, className) {
  const messageElement = document.createElement("div");
  messageElement.className = `message ${className}`;
  messageElement.textContent = text;
  messages.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function fetchChatbotResponse(input) {
  const response = await fetch(SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input }),
  });

  if (!response.ok) throw new Error("Failed to fetch response");
  const data = await response.json();
  return data.response.trim();
}
