<?php
session_start();
error_reporting(E_ALL);
header("Content-Type: text/html; charset=UTF-8");

// Conexión a la base de datos
$servidor = "localhost";
$usuario = "root";
$contraseña = "";
$base_datos = "Safetyapp";

$conn = new mysqli($servidor, $usuario, $contraseña, $base_datos);

// Verificar la conexión
if ($conn->connect_error) {
    die("<h1>Error de conexión: " . $conn->connect_error . "</h1>");
}

// Validar que los datos estén presentes
if (isset($_POST['nombre']) && isset($_POST['correo']) && isset($_POST['contraseña'])) {
    // Escapar los datos para prevenir inyección SQL
    $nombre = $conn->real_escape_string($_POST['nombre']);
    $correo = $conn->real_escape_string($_POST['correo']);
    $contraseña = password_hash($_POST['contraseña'], PASSWORD_DEFAULT); // Encriptar la contraseña

    // Insertar datos en la base de datos
    $sql = "INSERT INTO usuarios (nombre, correo, contraseña) VALUES ('$nombre', '$correo', '$contraseña')";
    if ($conn->query($sql) === TRUE) {
        echo "<h1>Registro exitoso</h1>";
    } else {
        // Manejo de errores, como correo duplicado (clave única)
        if ($conn->errno === 1062) {
            echo "<h1>Error: El correo ya está registrado.</h1>";
        } else {
            echo "<h1>Error: " . $conn->error . "</h1>";
        }
    }
} else {
    echo "<h1>Por favor, completa todos los campos del formulario.</h1>";
}

$conn->close();
?>


<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registro de Usuario</title>
  <link rel="stylesheet" href="login-register.css">
</head>
<body>
  <h1>Registro de Usuario</h1>
  <form action="register.php" method="POST">
    <label for="nombre">Nombre Completo:</label>
    <input type="text" id="nombre" name="nombre" placeholder="Escribe tu nombre completo" required>

    <label for="correo">Correo Electrónico:</label>
    <input type="email" id="correo" name="correo" placeholder="Ejemplo: correo@dominio.com" required>

    <label for="contraseña">Contraseña:</label>
    <input type="password" id="contraseña" name="contraseña" placeholder="Crea una contraseña segura" required>

    <button type="submit">Registrar</button>
  </form>

  <p>¿Ya tienes cuenta? <a href="login.html">Inicia sesión aquí</a></p>
</body>
</html>


