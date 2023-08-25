document.addEventListener("DOMContentLoaded", function () {
  const chatbotIcon = document.getElementById("chatbot-icon");
  const chatbotWidget = document.getElementById("chatbot-widget");
  const sendButton = document.getElementById("send-button");
  const inputText = document.getElementById("input-text");
  const chatMessages = document.getElementById("chat-messages");

  chatbotIcon.addEventListener("click", function () {
    chatbotWidget.style.display = "block";
  });

  sendButton.addEventListener("click", function () {
    const userMessage = inputText.value;
    const userMessageElement = document.createElement("div");
    userMessageElement.className = "message user-message";
    userMessageElement.textContent = userMessage;
    chatMessages.appendChild(userMessageElement);

    // Здесь можно добавить логику для обработки запроса к боту и получения ответа

    inputText.value = "";
  });
});
