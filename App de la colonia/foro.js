document.addEventListener("DOMContentLoaded", function () {
    mostrarMensajes(); // Asegura que los mensajes se carguen al abrir la página
});

document.getElementById("mensajeForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let usuario = document.getElementById("usuario").value;
    let contenido = document.getElementById("contenido").value;

    if (usuario.trim() === "" || contenido.trim() === "") {
        alert("⚠️ Por favor, completa todos los campos.");
        return;
    }

    let mensaje = {
        usuario: usuario,
        contenido: contenido,
        fecha: new Date().toLocaleString()
    };

    let mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];
    mensajes.push(mensaje);
    localStorage.setItem("mensajes", JSON.stringify(mensajes));

    mostrarMensajes();
    document.getElementById("mensajeForm").reset();
});

function mostrarMensajes() {
    let mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];
    let mensajesDiv = document.getElementById("mensajes");
    mensajesDiv.innerHTML = ""; // Limpia el área antes de agregar los nuevos mensajes

    mensajes.forEach(m => {
        let mensajeHTML = `<p><strong>${m.usuario}</strong>: ${m.contenido} <br><small>${m.fecha}</small></p>`;
        mensajesDiv.innerHTML += mensajeHTML;
    });
}
