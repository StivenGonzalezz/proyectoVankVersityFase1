class Gastos {
    constructor() {
        this.total = 0;
        this.tbody = document.getElementById("gastos-tbody");
        this.totalMonto = document.getElementById("total-monto");
        this.addBtn = document.getElementById("add-gasto-btn");

        this.addBtn.addEventListener("click", () => this.addGasto());
        const userJson = localStorage.getItem("currentUser");
        if (!userJson) {
            alert("Primero debes iniciar sesión antes de acceder a la página");
            window.location.href = './index.html';
        }

        this.user = JSON.parse(userJson);

        if (!this.user.record) {
            this.user.record = [];
        }

        this.loadRecords();
    }

    addGasto() {
        const descripcion = prompt("Ingrese la descripción del gasto o ingreso:");
        if (!descripcion) return;

        const tipo = prompt("Es un ingreso o gasto? (ingreso/gasto):").toLowerCase();
        if (tipo !== "ingreso" && tipo !== "gasto") {
            alert("Debe ingresar 'ingreso' o 'gasto'.");
            return;
        }

        const monto = parseFloat(prompt("Ingrese el monto (solo números):"));
        if (isNaN(monto)) {
            alert("Debe ingresar un número válido.");
            return;
        }

        const recordObj = {
            descripcion,
            tipo,
            monto,
        };

        this.user.record.push(recordObj);
        localStorage.setItem("currentUser", JSON.stringify(this.user));

        this.updateUsers(this.user)

        const adjustedMonto = tipo === "gasto" ? -monto : monto;
        this.total += adjustedMonto;
        this.updateTable(descripcion, tipo, monto);
        this.updateTotal();
    }

    updateTable(descripcion, tipo, monto) {
        const row = document.createElement("tr");

        const descCell = document.createElement("td");
        descCell.textContent = descripcion;
        row.appendChild(descCell);

        const tipoCell = document.createElement("td");
        tipoCell.textContent = tipo;
        row.appendChild(tipoCell);

        const montoCell = document.createElement("td");
        montoCell.textContent = `$${monto.toFixed(2)}`;
        row.appendChild(montoCell);

        const actionCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => this.deleteRow(row, monto, descripcion, tipo));
        actionCell.appendChild(deleteBtn);
        row.appendChild(actionCell);

        this.tbody.appendChild(row);
    }

    deleteRow(row, monto, descripcion, tipo) {
        const adjustedMonto = tipo === "gasto" ? -monto : monto;
        this.total -= adjustedMonto;

        const index = this.user.record.findIndex(record => 
            record.descripcion === descripcion && record.tipo === tipo && record.monto === monto
        );
        if (index !== -1) {
            this.user.record.splice(index, 1);
            localStorage.setItem("currentUser", JSON.stringify(this.user));
        }

        row.remove();
        this.updateTotal();
    }

    updateTotal() {
        this.totalMonto.textContent = `$${this.total.toFixed(2)}`;
    }

    loadRecords() {
        this.user.record.forEach(record => {
            const adjustedMonto = record.tipo === "gasto" ? -record.monto : record.monto;
            this.total += adjustedMonto;
            this.updateTable(record.descripcion, record.tipo, record.monto);
        });
        this.updateTotal();
    }

    closeSecction() {
        alert("Cerrando sesión, Hasta pronto 😁");
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

const gastosObj = new Gastos();
