const chatForm = document.getElementById("chat-form");
const chatWindow = document.getElementById("chat-window");
const messages = document.getElementById("messages");

// Replace this with your free API endpoint
const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "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"; // Add your OpenAI API key here

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userInput = document.getElementById("user-input");
  const userMessage = userInput.value;

  if (userMessage.trim()) {
    addMessage(userMessage, "user-message");

    // Fetch bot response
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
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // or "gpt-4" depending on availability
      messages: [{ role: "user", content: input }],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch response");
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
