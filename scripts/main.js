class Main {

  constructor(){
    if(!localStorage.getItem("currentUser")){
      alert("Primero debes ingresar sesion antes de acceder a la pagina")
      window.location.href = './index.html'
    }
  }

  closeSecction(){
    alert("Cerrando sesion, Hasta pronto 😁")
    localStorage.removeItem("currentUser")
    window.location.href = './index.html'
  }
}

const mainObj = new Main()