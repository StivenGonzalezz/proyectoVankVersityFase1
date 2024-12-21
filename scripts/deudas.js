class Deudas {
    constructor() {
      this.main = document.getElementById('debtsContainer');
      const userJson = localStorage.getItem("currentUser");
  
      if (!userJson) {
        alert("Primero debes iniciar sesión antes de acceder a la página");
        window.location.href = './index.html';
      }
  
      this.user = JSON.parse(userJson);
  
      if (!this.user.debts) {
        this.user.debts = [];
      }
  
      this.renderDebts();
    }
  
    renderDebts() {
      this.main.innerHTML = '';
    
      this.user.debts.forEach((debtObj, index) => {
        this.main.innerHTML += `
          <div class="goal-card">
            <div class="goal-title">${debtObj.nombre}</div>
            <div class="progress-bar">
              <div class="progress" style="width: ${debtObj.progreso}%"></div>
            </div>
            <div class="progress-label">${debtObj.progreso}%</div>
            <div class="progress-label">${debtObj.abono}$ / ${debtObj.monto}$</div>
            <div class="button-group">
              <button class="btn eliminar" onclick="deudasObj.deleteDebt(${index})">Eliminar</button>
              <button class="btn abonar" onclick="deudasObj.openAbonoForm(${index})">Abonar</button>
            </div>
          </div>
        `;
      });
    }

    openAbonoForm(index) {
        const abono = prompt("¿Cuánto deseas abonar?");
        
        if (abono !== null) {
          const amountToPay = parseFloat(abono);
    
          if (isNaN(amountToPay) || amountToPay <= 0) {
            alert("Por favor ingresa un monto válido.");
            return;
          }
    
          const debt = this.user.debts[index];
          if (amountToPay > debt.monto - debt.abono) {
            alert("El abono no puede ser mayor al monto restante de la deuda.");
            return;
          }
    
          debt.abono += amountToPay;

          debt.progreso = debt.abono*100/debt.monto
          debt.progreso =Math.round(debt.progreso)
    
          if (debt.abono >= debt.monto) {
            alert("¡Deuda saldada!");
          }
    
          localStorage.setItem("currentUser", JSON.stringify(this.user));
          this.renderDebts();
          this.updateUsers(this.user);
        }
      }
  
    deleteDebt(index) {
      this.user.debts.splice(index, 1);
  
      localStorage.setItem("currentUser", JSON.stringify(this.user));
  
      this.renderDebts();
      this.updateUsers(this.user);
    }
  
    closeSession() {
      alert("Cerrando sesión, ¡Hasta pronto! 😁");
      localStorage.removeItem("currentUser");
      window.location.href = '../index.html';
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
  
  const deudasObj = new Deudas();
  