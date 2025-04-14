<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
// Conexión a la base de datos
$servidor = "localhost"; // Dirección de tu servidor MySQL (XAMPP usa "localhost")
$usuario = "root";       // Usuario por defecto de MySQL en XAMPP
$contraseña = "";        // La contraseña de root está en blanco en XAMPP
$base_datos = "Safetyapp"; // Nombre de la base de datos que creaste en phpMyAdmin

$conn = new mysqli($servidor, $usuario, $contraseña, $base_datos);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener datos enviados desde JS
$data = json_decode(file_get_contents("php://input"));

// Insertar datos en la tabla reportes
$sql = "INSERT INTO reportes (nombre, tipo_reporte, ubicacion) VALUES ('$data->nombre', '$data->tipo', '$data->ubicacion')";

if ($conn->query($sql) === TRUE) {
    echo "Reporte guardado exitosamente";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
