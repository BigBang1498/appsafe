// Ruta a la carpeta de modelos
const MODEL_URL = 'face-api/dist/models/';

// Función para cargar todos los modelos necesarios
async function loadAllModels() {
  try {
    console.log('Cargando modelos...');
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    console.log('Modelo tinyFaceDetector cargado correctamente');

    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    console.log('Modelo faceLandmark68Net cargado correctamente');

    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    console.log('Modelo faceRecognitionNet cargado correctamente');

    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    console.log('Modelo faceExpressionNet cargado correctamente');

    console.log('Todos los modelos cargados con éxito');
  } catch (error) {
    console.error('Error al cargar uno o más modelos:', error);
  }
}

// Función para iniciar el vídeo desde la cámara
async function startVideo() {
  const video = document.getElementById('inputVideo');
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    video.srcObject = stream;
    console.log('Cámara iniciada correctamente');
  } catch (error) {
    console.error('Error al acceder a la cámara:', error);
  }
}

// Función para realizar detección en tiempo real
async function detectFaces() {
  const video = document.getElementById('inputVideo');
  const reconocimientoSection = document.getElementById('reconocimiento'); // Contenedor principal

  video.addEventListener('loadedmetadata', async () => {
    // Elimina cualquier canvas existente
    const existingCanvas = reconocimientoSection.querySelector('canvas');
    if (existingCanvas) {
      existingCanvas.remove();
    }

    // Crear un nuevo canvas ajustado al tamaño del vídeo
    const canvas = faceapi.createCanvasFromMedia(video);
    reconocimientoSection.appendChild(canvas);

    const displaySize = { width: video.videoWidth, height: video.videoHeight }; // Usa videoWidth y videoHeight en lugar de width y height
    faceapi.matchDimensions(canvas, displaySize);

    console.log('Iniciando detección en tiempo real...');
    setInterval(async () => {
      try {
        const detections = await faceapi.detectAllFaces(
          video,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        // Limpiar y redibujar los resultados en el canvas
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      } catch (error) {
        console.error('Error durante la detección:', error);
      }
    }, 100);
  });
}

// Función principal
(async () => {
  await loadAllModels();
  await startVideo();
  detectFaces();
})();

// Botón de agregar cámara (aún no funcional)
document.getElementById('addCameraButton').addEventListener('click', () => {
  alert('Función para agregar cámaras aún no implementada');
});
