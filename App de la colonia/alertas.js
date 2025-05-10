document.getElementById('enviar-alerta').addEventListener('click', () => {
  fetch('guardar_alerta.php', { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      alert(data.message); // Muestra el mensaje de alerta
    })
    .catch(error => console.error("Error al enviar alerta:", error));
});
