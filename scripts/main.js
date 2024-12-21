class Main {

  constructor(){
    if(!localStorage.getItem("currentUser")){
      alert("Primero debes ingresar sesion antes de acceder a la pagina")
      window.location.href = './index.html'
    }
  }

  closeSession() {
    alert("Cerrando sesión, ¡Hasta pronto! 😁");
    localStorage.removeItem("currentUser");
    window.location.href = '../index.html';
  }
}

const mainObj = new Main()