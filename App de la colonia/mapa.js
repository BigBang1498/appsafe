// Inicializar el mapa
const map = L.map('map').setView([20.675901322563178, -103.3815474685716], 12); // Vista centrada en Guadalajara

// Cargar los mosaicos del mapa (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Dibujar el polígono que delimita Guadalajara
const guadalajaraCoords = [
  [-103.31603293835728, 20.661819167062845],
  [-103.30925213936456, 20.66816368832218],
  [-103.30141184052901, 20.67649047028688],
  [-103.29632624128455, 20.684222073202292],
  [-103.28933354232296, 20.713360727468796],
  [-103.29547864141024, 20.721685028516788],
  [-103.29929284084376, 20.728621596586905],
  [-103.30819263952175, 20.73872859826696],
  [-103.32662793678357, 20.744475415836746],
  [-103.34612273388778, 20.74744782202319],
  [-103.36222713149552, 20.73912493752084],
  [-103.37854342907207, 20.725847007488767],
  [-103.379814828883, 20.71673014251941],
  [-103.38786702768702, 20.707612728870686],
  [-103.39295262693149, 20.697305426905785],
  [-103.39634302642804, 20.687195661756036],
  [-103.40015722586156, 20.678274721298422],
  [-103.39146932715207, 20.666775846939373],
  [-103.3893503274668, 20.652301888419203],
  [-103.37769582919775, 20.641792534346024],
  [-103.36413423121226, 20.636835039772265],
  [-103.34379183423407, 20.64218912693194],
  [-103.32429703712981, 20.646353286645635],
  [-103.30649743977348, 20.652500171136694],
  [-103.29357154169348, 20.65150875496414],
  [-103.27958614377103, 20.652500171136694],
  [-103.27195774490397, 20.66261224671082],
  [-103.26899114534477, 20.67232713638012],
  [-103.26962684525024, 20.677679973291745],
  [-103.27195774490397, 20.689970958496886],
  [-103.27852664392822, 20.702657382698334],
  [-103.28530744292095, 20.708801987846783],
  [-103.28996924222878, 20.713955335569807],
  [-103.31603293835728, 20.661819167062845]
];

// Convertir coordenadas al formato de Leaflet
const guadalajaraPolygonCoords = guadalajaraCoords.map(coord => [coord[1], coord[0]]);

// Agregar el polígono al mapa
const guadalajaraPolygon = L.polygon(guadalajaraPolygonCoords, {
  color: 'blue',
  fillColor: '#3388ff',
  fillOpacity: 0.2
}).addTo(map);
guadalajaraPolygon.bindPopup("Zona delimitada de Guadalajara");

function obtenerCoordenadasAleatorias() {
  const latMin = 20.6368; // Límite inferior de latitud
  const latMax = 20.7474; // Límite superior de latitud
  const lonMin = -103.4001; // Límite izquierdo de longitud
  const lonMax = -103.2893; // Límite derecho de longitud

  const latitud = Math.random() * (latMax - latMin) + latMin;
  const longitud = Math.random() * (lonMax - lonMin) + lonMin;

  return [latitud, longitud];
}


// Filtrar y mostrar incidencias
async function filtrarIncidencias() {
  const tipoSeleccionado = document.getElementById('tipoIncidencia').value;

  // Obtener los reportes desde la base de datos con `fetch()`
  const respuesta = await fetch(`http://localhost/appsafe/App%20de%20la%20colonia/obtener_reportes.php?tipo=${tipoSeleccionado}`);
  const reportes = await respuesta.json();

  // Remover pines existentes antes de agregar nuevos
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Verificar si hay reportes en la base de datos
  if (reportes.length > 0) {
    reportes.forEach(() => {
      const coordenadasAleatorias = obtenerCoordenadasAleatorias();
      const marker = L.marker(coordenadasAleatorias).addTo(map);
      marker.bindPopup(`Incidencia: ${tipoSeleccionado}`);
    });
  } else {
    alert("No hay reportes registrados para esta incidencia.");
  }
}

