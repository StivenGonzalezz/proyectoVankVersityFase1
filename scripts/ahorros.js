class Ahorro {
    constructor() {
      this.main = document.getElementById('debtsContainer');
      const userJson = localStorage.getItem("currentUser");
  
      if (!userJson) {
        alert("Primero debes iniciar sesión antes de acceder a la página");
        window.location.href = './index.html';
      }
  
      this.user = JSON.parse(userJson);
  
      if (!this.user.savings) {
        this.user.saving = [];
      }
  
      this.renderSavings();
    }
  
    renderSavings() {
      this.main.innerHTML = '';
    
      this.user.savings.forEach((savingObj, index) => {
        this.main.innerHTML += `
          <div class="goal-card">
            <div class="goal-title">${savingObj.nombre}</div>
            <div class="progress-bar">
              <div class="progress" style="width: ${savingObj.progreso}%"></div>
            </div>
            <div class="progress-label">${savingObj.progreso}%</div>
            <div class="progress-label">${savingObj.abono}$ / ${savingObj.monto}$</div>
            <div class="button-group">
              <button class="btn eliminar" onclick="ahorroObj.deleteDebt(${index})">Eliminar</button>
              <button class="btn abonar" onclick="ahorroObj.openAbonoForm(${index})">Abonar</button>
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
    
          const saving = this.user.savings[index];
          if (amountToPay > saving.monto - saving.abono) {
            alert("El abono no puede ser mayor al monto restante de la deuda.");
            return;
          }
    
          saving.abono += amountToPay;

          saving.progreso = saving.abono*100/saving.monto
          saving.progreso =Math.round(saving.progreso)
    
          if (saving.abono >= saving.monto) {
            alert("¡Deuda saldada!");
          }
    
          localStorage.setItem("currentUser", JSON.stringify(this.user));
          this.renderSavings();
          this.updateUsers(this.user);
        }
      }
  
    deleteDebt(index) {
      this.user.savings.splice(index, 1);
  
      localStorage.setItem("currentUser", JSON.stringify(this.user));
  
      this.renderSavings();
      this.updateUsers(this.user);
    }
  
    closeSecction() {
      alert("Cerrando sesion, Hasta pronto 😁");
      localStorage.removeItem("currentUser");
      window.location.href = "./index.html";
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
  
  const ahorroObj = new Ahorro();
  