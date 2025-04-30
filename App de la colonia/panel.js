document.addEventListener('DOMContentLoaded', () => {
    cargarUsuarios();
    cargarReportes();
  });
  
  // Función para cargar usuarios registrados
  async function cargarUsuarios() {
    const respuesta = await fetch('obtener_usuarios.php');
    const usuarios = await respuesta.json();
  
    const contenedorUsuarios = document.getElementById('usuarios-container');
    usuarios.forEach(usuario => {
      const div = document.createElement('div');
      div.textContent = `Nombre: ${usuario.nombre} | Correo: ${usuario.correo}`;
      contenedorUsuarios.appendChild(div);
    });
  }

  // Función para cargar reportes registrados
  async function cargarReportes() {
    const tabla = document.getElementById('reportes-table');
    if (!tabla) {
      console.error('❌ No se encontró la tabla con id="reportes-table".');
      return;
    }
  
    const tbody = tabla.querySelector('tbody');
    if (!tbody) {
      console.error('❌ La tabla existe, pero no se encontró <tbody> dentro de ella.');
      return;
    }
  
    try {
      const respuesta = await fetch('obtener_reportes.php');
      const reportes = await respuesta.json();
      console.log('✅ Reportes recibidos:', reportes);
  
      tbody.innerHTML = '';
  
      reportes.forEach(reporte => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${reporte.tipo_reporte}</td>
          <td>${reporte.ubicacion}</td>
        `;
        tbody.appendChild(fila);
      });
    } catch (error) {
      console.error('❌ Error al cargar los reportes:', error);
    }
  }
  
  
  
  
  