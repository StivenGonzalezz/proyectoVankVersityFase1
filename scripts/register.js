class register {
  constructor() {
    this.registerForm = document.getElementById("registerForm");
    this.registerForm.addEventListener('submit', this.registerFormSubmit.bind(this));
  }

  registerFormSubmit(event) {
    event.preventDefault();
    const objForm = new FormData(this.registerForm);
    const local = Object.fromEntries(objForm.entries());

    if (localStorage.getItem("users") === null) {
      const array = [];
      localStorage.setItem("users", JSON.stringify(array));
    }

    const users = JSON.parse(localStorage.getItem("users"));

    if (users.find((user) => user.username === local.username) !== undefined) {
      alert("El usuario ya existe, elige otro");
    } else {
      users.push(local);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Cuenta creada exitosamente, Ahora puedes iniciar sesion");
      window.location.href = "./index.html";
    }
  }
}

const registerObj = new register();