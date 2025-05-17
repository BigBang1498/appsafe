async function cargarEstadisticas() {
    try {
      const respuesta = await fetch('obtener_estadisticas_historicas.php');
      const estadisticas = await respuesta.json();
  
      if (estadisticas.error) {
        throw new Error(estadisticas.error);
      }
  
      return estadisticas;
    } catch (error) {
      console.error(`Error al cargar estadísticas: ${error.message}`);
      return {};
    }
  }
  
  document.addEventListener('DOMContentLoaded', async () => {
    const estadisticas = await cargarEstadisticas();
  
    if (estadisticas.asalto !== undefined) {
      crearGrafica('graficaAsalto', 'Asaltos', [{año: 'Total', cantidad: estadisticas.asalto}]);
    }
    if (estadisticas.robo !== undefined) {
      crearGrafica('graficaRobo', 'Robos', [{año: 'Total', cantidad: estadisticas.robo}]);
    }
    if (estadisticas.choque !== undefined) {
      crearGrafica('graficaChoque', 'Choques', [{año: 'Total', cantidad: estadisticas.choque}]);
    }
    if (estadisticas.accidente !== undefined) {
      crearGrafica('graficaAccidente', 'Accidentes', [{año: 'Total', cantidad: estadisticas.accidente}]);
    }
  });
  
  async function crearGrafica(canvasId, titulo, datos) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: datos.map(dato => dato.año), // Muestra "Total" en lugar de años
        datasets: [{
          label: titulo,
          data: datos.map(dato => dato.cantidad),
          backgroundColor: '#4CAF50',
          borderColor: '#3E8E41',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad de casos'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Tipo de reporte'
            }
          }
        }
      }
    });
  }
  