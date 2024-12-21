class crearDeuda {
  constructor() {
    this.newDebtForm = document.getElementById("deudaForm");
    this.newDebtForm.addEventListener("submit", this.createDebt.bind(this));
    const userJson = localStorage.getItem("currentUser");
    if (!userJson) {
      alert("Primero debes iniciar sesión antes de acceder a la página");
      window.location.href = './index.html';
    }

    this.user = JSON.parse(userJson);

    if (!this.user.debts) {
      this.user.debts = [];
    }
  }

  createDebt(event) {
    event.preventDefault();
    const nombre = document.getElementById("deudaNombre").value;
    const monto = document.getElementById("deudaMonto").value;

    const debtObj = {
      nombre,
      monto,
      abono: 0,
      progreso: 0,
    };

    this.user.debts.push(debtObj);
    localStorage.setItem("currentUser", JSON.stringify(this.user));
    this.updateUsers(this.user)

    alert("Deuda creada con exito")
    window.location.href='../pages/deudas.html'
  }

  updateUsers(local){
    const users = JSON.parse(localStorage.getItem("users"))

    const userIndex = users.findIndex((user) => user.username === local.username);

  if (userIndex !== -1) {
    users[userIndex] = local;
  }
    localStorage.setItem("users", JSON.stringify(users));
  }
}

const crearDeudaObj = new crearDeuda
