class Chatia {
  constructor() {
    this.chatBox = document.getElementById("chatBox");
    this.chatInput = document.getElementById("chatInput");
    this.sendBtn = document.getElementById("sendBtn");

    this.chatInput.addEventListener("keyup", this.handleKeyUp.bind(this));
    this.sendBtn.addEventListener("click", this.sendMessage.bind(this));

    const userJson = localStorage.getItem("currentUser");
    if (!userJson) {
      alert("Primero debes iniciar sesión antes de acceder a la página");
      window.location.href = '../index.html';
    }

    this.user = JSON.parse(userJson);

    if (!this.user.messages) {
      this.user.messages = [];
    }

    this.renderMessages();
  }

  closeSession() {
    alert("Cerrando sesión, ¡Hasta pronto! 😁");
    localStorage.removeItem("currentUser");
    window.location.href = '../index.html';
  }

  handleKeyUp(event) {
    if (event.key === "Enter") {
      this.sendMessage(event);
    }
  }

  sendMessage(event) {
    event.preventDefault();

    const message = this.chatInput.value.trim();

    if (message === "") {
      alert("El mensaje no puede estar vacío");
      return;
    }

    const messageObj = {
      from: 'user',
      message: message,
    };

    this.user.messages.push(messageObj);

    localStorage.setItem("currentUser", JSON.stringify(this.user));

    this.addMessageToChat(messageObj, "user");

    //
    this.updateUsers(this.user)

    this.chatInput.value = "";

    setTimeout(() => {
      this.generateBotResponse(message);
    }, 1000);

    this.chatBox.scrollTop = this.chatBox.scrollHeight;
  }

  async generateBotResponse(userMessage) {
    const botResponse = await this.llamarGemini(userMessage);

    const botMessageObj = {
      from: 'bot',
      message: botResponse,
    };

    this.user.messages.push(botMessageObj);

    localStorage.setItem("currentUser", JSON.stringify(this.user));

    this.updateUsers(this.user)

    this.addMessageToChat(botMessageObj, "ia");
    this.chatBox.scrollTop = this.chatBox.scrollHeight;
  }

  addMessageToChat(messageObj, senderClass) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-box-message", senderClass);
    messageElement.innerHTML = `<p>${messageObj.message}</p>`;
    this.chatBox.appendChild(messageElement);
  }

  renderMessages() {
    this.user.messages.forEach((messageObj) => {
      const senderClass = messageObj.from === "user" ? "user" : "ia";
      this.addMessageToChat(messageObj, senderClass);
    });
  }

  updateUsers(local){
    const users = JSON.parse(localStorage.getItem("users"))

    const userIndex = users.findIndex((user) => user.username === local.username);

  if (userIndex !== -1) {
    users[userIndex] = local;
  }
    localStorage.setItem("users", JSON.stringify(users));
  }

  closeSecction(){
    alert("Cerrando sesion, Hasta pronto 😁")
    localStorage.removeItem("currentUser")
    window.location.href = './index.html'
  }

  async llamarGemini(prompt) {
    const API_KEY = 'AIzaSyAZGdDHCZgNfJj2izx8muO2teEmtAT6USM';
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
            ],
          }],
        }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error al llamar a la API de Gemini:', error);
      return "Lo siento, hubo un error al generar la respuesta.";
    }
  }

  
}

const chatiaObj = new Chatia();
