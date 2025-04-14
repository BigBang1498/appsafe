document.getElementById('formReporte').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Obtener los valores del formulario
  const nombre = document.getElementById('nombre').value;
  const tipo = document.getElementById('tipoIncidencia').value;
  const descripcion = document.getElementById('descripcion').value;
  const ubicacion = document.getElementById('ubicacion').value || "No especificada";

  // Mostrar confirmación en la página (opcional)
  const confirmacion = document.getElementById('confirmacion');
  confirmacion.textContent = `Reporte enviado: ${tipo} - "${descripcion}" (Ubicación: ${ubicacion})`;

  // Preparar los datos para enviar al servidor
  const data = { nombre, tipo, ubicacion };

  try {
    // Cambiar la ruta para apuntar al servidor local
    const response = await fetch("http://localhost/appsafe/App%20de%20la%20colonia/guardar_reporte.php", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  });
  

    // Leer la respuesta del servidor
    const result = await response.text();
    console.log(result); // Mostrar confirmación en consola
  } catch (error) {
    console.error("Error:", error); // Manejar errores
  }

  // Limpiar el formulario después de enviar
  e.target.reset();
});
