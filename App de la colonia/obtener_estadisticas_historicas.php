<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");

// Conexión a la base de datos
$servidor = "127.0.0.1";
$usuario = "root";
$contraseña = "";
$base_datos = "Safetyapp";

try {
    $conn = new mysqli($servidor, $usuario, $contraseña, $base_datos);
    if ($conn->connect_error) {
        throw new Exception("Error de conexión a la base de datos: " . $conn->connect_error);
    }

    // Consultar estadísticas totales por tipo de delito
    $sql = "SELECT tipo_reporte, COUNT(*) as cantidad 
            FROM reportes 
            GROUP BY tipo_reporte";
    $resultado = $conn->query($sql);

    if (!$resultado) {
        throw new Exception("Error al ejecutar la consulta: " . $conn->error);
    }

    // Organizar datos en formato JSON
    $estadisticas = [];
    while ($fila = $resultado->fetch_assoc()) {
        $tipo = $fila['tipo_reporte'];
        $cantidad = $fila['cantidad'];

        $estadisticas[$tipo] = $cantidad;
    }

    echo json_encode($estadisticas);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}
?>
