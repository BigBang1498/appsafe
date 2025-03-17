document.getElementById('formReporte').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const tipo = document.getElementById('tipoIncidencia').value;
    const descripcion = document.getElementById('descripcion').value;
    const ubicacion = document.getElementById('ubicacion').value || "No especificada";
  
    const confirmacion = document.getElementById('confirmacion');
    confirmacion.textContent = `Reporte enviado: ${tipo} - "${descripcion}" (Ubicación: ${ubicacion})`;
  
    // Limpia el formulario
    e.target.reset();
  });
  