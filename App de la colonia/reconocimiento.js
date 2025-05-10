// Ruta a la carpeta de modelos
const MODEL_URL = 'face-api/dist/models/';

// Cargar los modelos de Face API
async function loadAllModels() {
  try {
    console.log('Cargando modelos...');
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    console.log('Todos los modelos cargados exitosamente');
  } catch (error) {
    console.error('Error al cargar modelos:', error);
  }
}

// Iniciar video desde la cámara y activar monitoreo
async function startVideo() {
  const video = document.getElementById('inputVideo');
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    console.log('✅ Cámara iniciada correctamente');

    // Activar el sistema de diagnóstico
    monitorCamera();
  } catch (error) {
    console.error('⚠️ Error al acceder a la cámara:', error.message);
    alert("⚠️ Problema detectado: Permiso de cámara denegado. Verifica los ajustes.");
  }
}

// Monitoreo en tiempo real para detectar fallos en la cámara
function monitorCamera() {
  const video = document.getElementById('inputVideo');

  setInterval(() => {
    if (!video.srcObject || video.readyState < 2) {
      console.error("⚠️ Error: La cámara dejó de responder.");
      mostrarNotificacion("⚠️ Problema detectado: La cámara ha dejado de funcionar correctamente.");
    }
  }, 5000); // Verificación cada 5 segundos
}

// Función para mostrar notificaciones emergentes de fallos
function mostrarNotificacion(mensaje) {
  const notificacion = document.createElement('div');
  notificacion.textContent = mensaje;
  notificacion.style.position = "fixed";
  notificacion.style.bottom = "10px";
  notificacion.style.right = "10px";
  notificacion.style.background = "#d9534f";
  notificacion.style.color = "white";
  notificacion.style.padding = "10px";
  notificacion.style.borderRadius = "5px";

  document.body.appendChild(notificacion);
  setTimeout(() => document.body.removeChild(notificacion), 5000);
}

// Detección facial en tiempo real
async function detectFaces() {
  const video = document.getElementById('inputVideo');
  const reconocimientoSection = document.getElementById('reconocimiento');

  video.addEventListener('loadedmetadata', async () => {
    const existingCanvas = reconocimientoSection.querySelector('canvas');
    if (existingCanvas) existingCanvas.remove();

    const canvas = faceapi.createCanvasFromMedia(video);
    reconocimientoSection.appendChild(canvas);
    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvas, displaySize);

    console.log('Iniciando detección en tiempo real...');
    setInterval(async () => {
      try {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      } catch (error) {
        console.error('Error en detección facial:', error);
      }
    }, 100);
  });
}

// Captura de imagen y envío
function capturePhoto() {
  const video = document.getElementById('inputVideo');
  const canvas = document.getElementById('photoCanvas');
  const context = canvas.getContext('2d');

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = canvas.toDataURL('image/png');

  fetch('guardar_multimedia.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ foto: imageData })
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      console.error("Error:", data.error);
    } else {
      console.log('✅ Imagen guardada:', data.message);
    }
  })
  .catch(error => console.error('Error al guardar la imagen:', error));
}

// Grabación de video
let mediaRecorder;
let recordedChunks = [];

function startRecording() {
  const video = document.getElementById('inputVideo');
  
  if (!video.srcObject) {
    console.error("⚠️ Error: No hay una fuente de video disponible.");
    alert("⚠️ La cámara no está activa. Verifica los permisos.");
    return;
  }

  const stream = video.srcObject;
  mediaRecorder = new MediaRecorder(stream);
  recordedChunks = [];

  mediaRecorder.ondataavailable = event => recordedChunks.push(event.data);
  
  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });

    const formData = new FormData();
    formData.append('video', blob);

    fetch('guardar_multimedia.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => console.log('✅ Video guardado:', data))
    .catch(error => console.error('Error al guardar el video:', error));
  };

  mediaRecorder.start();
  document.getElementById('stopRecordingButton').style.display = 'inline-block';
}

function stopRecording() {
  if (mediaRecorder) {
    mediaRecorder.stop();
    document.getElementById('stopRecordingButton').style.display = 'none';
  } else {
    console.error("⚠️ Error: MediaRecorder no está inicializado.");
  }
}

// Cargar modelos y activar el sistema
(async () => {
  await loadAllModels();
  await startVideo();
  detectFaces();
})();
