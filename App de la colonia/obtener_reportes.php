<?php
header("Content-Type: application/json");

// Conexión a la base de datos
$servidor = "localhost";
$usuario = "root";
$contraseña = "";
$base_datos = "Safetyapp";

$conn = new mysqli($servidor, $usuario, $contraseña, $base_datos);

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(["error" => "Error de conexión a la base de datos"]));
}

// Obtener el tipo de incidencia desde la solicitud GET
$tipo = $_GET['tipo'] ?? '';

if ($tipo) {
    $sql = "SELECT * FROM reportes WHERE tipo_reporte = '$tipo'";
} else {
    // Si no se especifica un tipo, devolver todos los reportes
    $sql = "SELECT * FROM reportes";
}

$resultado = $conn->query($sql);

$reportes = [];
while ($fila = $resultado->fetch_assoc()) {
    $reportes[] = $fila;
}

echo json_encode($reportes);
$conn->close();
?>
