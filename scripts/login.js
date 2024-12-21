class login {
  constructor() {
    this.loginForm = document.getElementById("loginForm");
    this.loginForm.addEventListener("submit", this.loginFormSubmit.bind(this));
  }

  loginFormSubmit(event) {
    event.preventDefault();
    const objForm = new FormData(this.loginForm);
    const local = Object.fromEntries(objForm.entries());

    if (localStorage.getItem("users") === null) {
      const array = [];
      localStorage.setItem("users", JSON.stringify(array));
    }
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find((user) => user.username === local.username);

    if (!user) {
      alert("El usuario no existe, porfavor cree una cuenta");
      this.loginForm.username.value = "";
      this.loginForm.password.value = "";
      return;
    }

    if (user.password !== local.password) {
      alert("La clave para el usuario es incorrecta, porfavor verifiquela");
      return;
    }

    if (user.password === local.password) {
      localStorage.setItem("currentUser", JSON.stringify(user))
      window.location.href = "./main.html";
    }
  }
}

const loginObj = new login();   
