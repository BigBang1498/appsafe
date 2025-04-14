<?php
header("Content-Type: application/json");

// Conectar a la base de datos
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
    $resultado = $conn->query($sql);

    $incidencias = [];
    while ($fila = $resultado->fetch_assoc()) {
        $incidencias[] = $fila;
    }

    echo json_encode($incidencias);
} else {
    echo json_encode(["error" => "Debe especificar un tipo de incidencia"]);
}

$conn->close();
?>
