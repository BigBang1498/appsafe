<?php
// Conexión a la base de datos
$servidor = "localhost";
$usuario = "root";
$contraseña = "";
$base_datos = "Safetyapp";

$conn = new mysqli($servidor, $usuario, $contraseña, $base_datos);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener los datos del formulario
$correo = $_POST['correo'];
$contraseña = $_POST['contraseña'];

// Buscar al usuario en la base de datos
$sql = "SELECT * FROM usuarios WHERE correo = '$correo'";
$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {
    $usuario = $resultado->fetch_assoc();
    if (password_verify($contraseña, $usuario['contraseña'])) {
      header("Location: index.html");
    } else {
        echo "Contraseña incorrecta.";
    }
} else {
    echo "No se encontró un usuario con ese correo.";
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
  <link rel="stylesheet" href="login-register.css">
</head>
<body>
  <h1>Login</h1>
  <form action="login.php" method="POST">
    <label for="correo">Correo:</label>
    <input type="email" id="correo" name="correo" required>

    <label for="contraseña">Contraseña:</label>
    <input type="password" id="contraseña" name="contraseña" required>

    <button type="submit">Iniciar Sesión</button>
  </form>

  <p>¿No tienes cuenta? <a href="register.html">Regístrate aquí</a></p>
</body>
</html>

