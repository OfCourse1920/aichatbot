const chatForm = document.getElementById("chat-form");
const chatWindow = document.getElementById("chat-window");
const messages = document.getElementById("messages");

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userInput = document.getElementById("user-input");
  const userMessage = userInput.value;

  if (userMessage.trim()) {
    addMessage(userMessage, "user-message");
    setTimeout(() => {
      addMessage(generateResponse(userMessage), "bot-message");
    }, 1000);
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

function generateResponse(input) {
  // Simple bot response logic
  return "I'm a chatbot! You said: " + input;
}
