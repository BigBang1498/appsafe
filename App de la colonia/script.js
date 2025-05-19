function navigateTo(sectionId) {
  alert(`Navegando a: ${sectionId}`);
  // Implementa la lógica de navegación aquí
}
document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById('notificaciones-button');
  const menu = document.getElementById('notificaciones-menu');

  if (boton && menu) {
    boton.addEventListener('click', () => {
      if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block"; // Mostrar el menú
      } else {
        menu.style.display = "none"; // Ocultar el menú
      }
      console.log("Botón de notificaciones presionado"); // Depuración en la consola
    });
  } else {
    console.error("Error: No se encontraron los elementos necesarios.");
  }
});

function cargarNotificaciones() {
  fetch('obtener_notificaciones.php')
    .then(response => response.json())
    .then(data => {
      const lista = document.getElementById('notificaciones-list');
      lista.innerHTML = ''; // Limpiar lista

      data.forEach(notificacion => {
        const item = document.createElement('li');
        item.textContent = notificacion.mensaje;
        lista.appendChild(item);
      });

      // Actualiza el contador de notificaciones
      document.getElementById('notificaciones-count').textContent = data.length;
    })
    .catch(error => console.error("Error al cargar notificaciones:", error));
}

//  Actualizar notificaciones cada 5 segundos
setInterval(cargarNotificaciones, 5000);

// Palabra clave por defecto, pero el usuario puede modificarla
let palabraClave = "ayuda";
let frasesRelacionadas = ["necesito ayuda", "socorro", "auxilio", "emergencia", "llama a alguien"];

document.getElementById("activarMicrofono").addEventListener("click", function() {
    let reconocimiento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    reconocimiento.lang = "es-ES";
    reconocimiento.continuous = false;
    reconocimiento.interimResults = false;

    reconocimiento.onresult = function(event) {
        let textoDetectado = event.results[0][0].transcript.toLowerCase();

        let alertaDetectada = frasesRelacionadas.some(frase => textoDetectado.includes(frase)) || textoDetectado.includes(palabraClave);

        if (alertaDetectada) {
            document.getElementById("mensajeAlerta").style.display = "block";

            setTimeout(() => {
                alert("🚨 ¡Alerta enviada a contactos de emergencia!");
            }, 1000);
        } else {
            alert("No se detectó una frase de emergencia.");
        }
    };

    reconocimiento.onerror = function(event) {
        alert("Error al detectar voz: " + event.error);
    };

    reconocimiento.start();
});

// Función para actualizar la palabra clave personalizada
document.getElementById("guardarPalabraClave").addEventListener("click", function() {
    let nuevaPalabra = document.getElementById("nuevaPalabra").value.trim().toLowerCase();
    if (nuevaPalabra !== "") {
        palabraClave = nuevaPalabra;
        alert(`✅ Nueva palabra clave guardada: "${palabraClave}"`);
    } else {
        alert("⚠️ Ingresa una palabra válida.");
    }
});



