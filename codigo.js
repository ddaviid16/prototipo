// Función para registrar un usuario con código de seguridad
  function registrarUsuario() {
    const username = document.getElementById("signup-user").value;
    const password = document.getElementById("signup-password").value;
    const securityCode = document.getElementById("security-code").value;
  
    if (username && password && securityCode) {
      if (password.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        return;
      }
      const regex = /^[a-zA-Z0-9]+$/;
      if (!regex.test(password)) {
        alert("La contraseña sólo debe contener números y letras.");
        return;
      }
      // Guarda el usuario, contraseña y código de seguridad en el localStorage
      localStorage.setItem(username, JSON.stringify({ password: password, securityCode: securityCode }));
      alert("Cuenta creada con éxito");
      window.location.href = "index.html";
    } else {
      alert("Por favor, completa todos los campos");
    }
  }
  
  // Función para iniciar sesión
  function iniciarSesion() {
    const username = document.getElementById("login-user").value;
    const password = document.getElementById("login-password").value;
    const errorMsg = document.getElementById("error-msg");
  
    // Obtener los datos del usuario
    const storedData = JSON.parse(localStorage.getItem(username));
  
    if (storedData && storedData.password === password) {
      errorMsg.textContent = ""; // Limpia el mensaje de error
      alert("Inicio de sesión exitoso. Redirigiendo a la página principal.");
      localStorage.setItem("user", username); // Guarda el nombre del usuario
      window.location.href = "PaginaMain.html";
    } else {
      errorMsg.textContent = "Nombre de usuario o contraseña incorrectos";
    }
  }
  
  // Función para verificar el usuario en el restablecimiento de contraseña
  function verificarUsuario() {
    const usuario = document.getElementById("reset-usuario").value;
    const msg = document.getElementById("msg");
    const userData = JSON.parse(localStorage.getItem(usuario)); // Recupera los datos del usuario
    const solicitudBtn = document.querySelector('button[onclick="verificarUsuario()"]'); // Selecciona el botón de "Enviar solicitud"
  
    if (usuario.trim() === "") {
      msg.textContent = "Por favor, ingresa un nombre de usuario.";
    } else if (!userData) {
      msg.textContent = "No hay ninguna cuenta registrada con ese usuario.";
    } else {
      // Usuario válido, oculta el botón de solicitud y muestra el campo del código de seguridad
      solicitudBtn.style.display = "none"; // Oculta el botón de "Enviar solicitud"
      document.getElementById("security-code-section").style.display = "block"; // Muestra el campo de código de seguridad
      msg.textContent = "Usuario válido. Ingresa tu código de seguridad.";
  
      // Guardar temporalmente el usuario para verificar el código
      localStorage.setItem("usuarioParaReset", usuario);
    }
  }
  
  // Función para verificar el código de seguridad
  function verificarCodigo() {
    const usuario = localStorage.getItem("usuarioParaReset"); // Recupera el nombre del usuario temporalmente guardado
    const securityCodeInput = document.getElementById("security-code").value;
    const msg = document.getElementById("msg");
  
    // Asegúrate de que el usuario exista en el localStorage
    const userData = JSON.parse(localStorage.getItem(usuario));
  
    // Verificar si el usuario tiene datos almacenados y si el código coincide
    if (userData && securityCodeInput === userData.securityCode) {
      msg.textContent = "Código de seguridad válido. Redirigiendo...";
      setTimeout(() => {
        window.location.href = "NewPassword.html"; // Redirigir a la página de nueva contraseña después de un breve retraso
      }, 1500); // Opcionalmente, un retraso de 1.5 segundos
    } else {
      msg.textContent = "Código de seguridad incorrecto. Inténtalo de nuevo.";
    }
  }
  
  // Función para actualizar la contraseña
  function actualizarContrasena() {
    const usuario = localStorage.getItem("usuarioParaReset");
    const nuevaContrasena = document.getElementById("nueva-contrasena").value;
    const msg = document.getElementById("msg");
  
    if (!usuario) {
      msg.textContent = "No se encontró el usuario.";
      return;
    }
  
    if (nuevaContrasena.trim() === "") {
      msg.textContent = "Por favor, ingresa una nueva contraseña.";
    } else {
      // Actualizar la contraseña dentro del objeto del usuario
      const userData = JSON.parse(localStorage.getItem(usuario));
      userData.password = nuevaContrasena;
      localStorage.setItem(usuario, JSON.stringify(userData));
  
      msg.textContent = "Tu contraseña ha sido restablecida con éxito.";
      setTimeout(() => {
        window.location.href = "Login.html";
      }, 2000);
    }
  }
  
  // Función para cerrar sesión
  function CerrarSesion() {
    const confirmacion = confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmacion) {
    setTimeout(() => {
      window.location.href = "index.html"; // Corregido Location a location
    },1500);
    } else {
      alert("Cancelado. No se ha cerrado sesión");
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const usuario = localStorage.getItem("user");
    console.log(usuario); // Verificar si el usuario está en el localStorage
    if (usuario) {
        document.getElementById("usuario-link").textContent = usuario;
    }
});
  



  
  function mostrarVentanaLogin() {
    document.getElementById("ventanaLogin").style.display = "block";
}

function ocultarVentanaLogin() {
    document.getElementById("ventanaLogin").style.display = "none";
}