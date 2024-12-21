class crearAhorro {
    constructor() {
      this.newSavingForm = document.getElementById("ahorroForm");
      this.newSavingForm.addEventListener("submit", this.createDebt.bind(this));
      const userJson = localStorage.getItem("currentUser");
      if (!userJson) {
        alert("Primero debes iniciar sesión antes de acceder a la página");
        window.location.href = './index.html';
      }
  
      this.user = JSON.parse(userJson);
  
      if (!this.user.savings) {
        this.user.savings = [];
      }
    }
  
    createDebt(event) {
      event.preventDefault();
      const nombre = document.getElementById("ahorroNombre").value;
      const monto = document.getElementById("ahorroMonto").value;
  
      const savingObj = {
        nombre,
        monto,
        abono: 0,
        progreso: 0,
      };
  
      this.user.savings.push(savingObj);
      localStorage.setItem("currentUser", JSON.stringify(this.user));
      this.updateUsers(this.user)
  
      alert("Ahorro creada con exito")
      window.location.href='../pages/ahorros.html'
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
  
  const crearAhorroObj = new crearAhorro
  