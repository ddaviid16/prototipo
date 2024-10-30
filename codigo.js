//Funcion para Iniciar sesion
//declaramos variables
const User = "1";
const Password = "1";
function InicioDeSesion(){
    const username = document.getElementById("user").value;
    const passwordUser = document.getElementById("password").value;
    const errorMsg = document.getElementById('error-msg');
 if(username === User && passwordUser == Password){
   //si es igual se le rederige a la pagina principal
   errorMsg.textContent = "";//borramos mensaje de error
   alert("inicio de sesion existoso. redirigiendo a la pagina mas vergas");
   window.location.href = "index.html";
 }
 else {
   errorMsg.textContent = "Nombre de usuario o contraseña incorrectos.";
 }
}
